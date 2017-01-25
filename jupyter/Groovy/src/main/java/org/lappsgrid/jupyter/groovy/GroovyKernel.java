package org.lappsgrid.jupyter.groovy;

import static com.twosigma.beaker.jupyter.Utils.uuid;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.lappsgrid.jupyter.groovy.handler.AbstractHandler;
import org.lappsgrid.jupyter.groovy.handler.CompleteHandler;
import org.lappsgrid.jupyter.groovy.handler.HistoryHandler;
import org.lappsgrid.jupyter.groovy.handler.IHandler;
import org.lappsgrid.jupyter.groovy.handler.KernelInfoHandler;
import org.lappsgrid.jupyter.groovy.json.Serializer;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.lappsgrid.jupyter.groovy.security.HmacSigner;
import org.lappsgrid.jupyter.groovy.threads.AbstractThread;
import org.lappsgrid.jupyter.groovy.threads.ControlThread;
import org.lappsgrid.jupyter.groovy.threads.HeartbeatThread;
import org.lappsgrid.jupyter.groovy.threads.ShellThread;
import org.lappsgrid.jupyter.groovy.threads.StdinThread;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeromq.ZMQ;

import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.handler.CommCloseHandler;
import com.twosigma.beaker.jupyter.handler.CommInfoHandler;
import com.twosigma.beaker.jupyter.handler.CommOpenHandler;
import com.twosigma.beaker.jupyter.handler.ExecuteRequestHandler;
import com.twosigma.beaker.jupyter.msg.Type;
import com.twosigma.beaker.jupyter.threads.ExecuteResultThread;

/**
 * The entry point for the Jupyter kernel.
 *
 * @author Keith Suderman
 */
public class GroovyKernel {

  private static final Logger logger = LoggerFactory.getLogger(GroovyKernel.class);

  private volatile boolean running = false;
  private static final String DELIM = "<IDS|MSG>";
  /**
   * Used to generate the HMAC signatures for messages
   */
  private HmacSigner hmac;
  /**
   * The UUID for this session.
   */
  private String id;
  /**
   * Information from the connection file from Jupyter.
   */
  private File connectionFile;
  private Config configuration;
  /**
   * Message handlers. All sockets listeners will dispatch to these handlers.
   */
  private Map<Type, AbstractHandler<Message>> handlers;
  private Map<String, AbstractThread> threads = new HashMap<>();
  private Map<String, Comm> comm;
  
  private ZMQ.Socket hearbeatSocket;
  private ZMQ.Socket controlSocket;
  private ZMQ.Socket shellSocket;
  private ZMQ.Socket iopubSocket;
  private ZMQ.Socket stdinSocket;

  public GroovyKernel() {
    id = uuid();
    installHandlers();
    comm = new HashMap<>();
  }

  //TODO close kernel comms 
  public void shutdown() {
    running = false;
  }

  private void installHandlers() {
    handlers = new HashMap<>();
    handlers.put(Type.EXECUTE_REQUEST, new ExecuteRequestHandler(this));
    handlers.put(Type.KERNEL_INFO_REQUEST, new KernelInfoHandler(this));
    handlers.put(Type.COMPLETE_REQUEST, new CompleteHandler(this));
    handlers.put(Type.HISTORY_REQUEST, new HistoryHandler(this));
    handlers.put(Type.COMM_OPEN, new CommOpenHandler(this));
    handlers.put(Type.COMM_INFO_REQUEST, new CommInfoHandler(this));
    handlers.put(Type.COMM_CLOSE, new CommCloseHandler(this));
  }

  public boolean isCommPresent(String hash){
    return comm.containsKey(hash);
  }
  
  public Set<String> getCommHashSet(){
    return comm.keySet();
  }
  
  public void addComm(String hash, Comm commObject){
    if(!isCommPresent(hash)){
      comm.put(hash, commObject);
    }
  }
  
  public Comm getComm(String hash){
    return comm.get(hash);
  }
  
  public void removeComm(String hash){
    if(isCommPresent(hash)){
      comm.remove(hash);
    }
  }
  
  public AbstractThread getThreadByClassName(String className){
    AbstractThread ret = null;
    if(className != null){
      ret = threads.get(className);
    }
    return ret;
  }
  
  /**
   * Sends a Message to the iopub socket.
   * 
   * @throws NoSuchAlgorithmException
   */
  public void publish(Message message) throws NoSuchAlgorithmException {
    send(iopubSocket, message);
  }

  public synchronized void send(Message message) throws NoSuchAlgorithmException {
    send(shellSocket, message);
  }

  public void send(final ZMQ.Socket socket, Message message) throws NoSuchAlgorithmException {
    logger.trace("Sending message: {}", message.asJson());
    // Encode the message parts (blobs) and calculate the signature.
    final List<String> parts = new ArrayList<String>(Arrays.asList(
        Serializer.toJson(message.getHeader()),
        Serializer.toJson(message.getParentHeader()),
        Serializer.toJson(message.getMetadata()),
        Serializer.toJson(message.getContent())));
    String signature = hmac.sign(parts);
    logger.trace("Signature is {}", signature);

    // Now send the message down the wire.
    for (byte[] list : message.getIdentities()) {
      socket.sendMore(list);
    }

    socket.sendMore(DELIM);
    socket.sendMore(signature);

    for (int i = 0; i < 3; i++) {
      socket.sendMore(parts.get(i));
    }

    socket.send(parts.get(3));
    logger.trace("Message sent");
  }

  public String read(ZMQ.Socket socket) {
    return new String(socket.recv());
  }

  public <T> T parse(byte[] bytes, Class<T> theClass) {
    return Serializer.parse(new String(bytes), theClass);
  }

  /**
   * Reads a Jupyter message from a ZMQ socket.
   * <p>
   * Each message consists of at least six blobs of bytes:
   * <ul>
   * <li>zero or more identities</li>
   * <li>'&lt;IDS|MSG&gt;'</li>
   * <li>HMAC signature</li>
   * <li>header</li>
   * <li>parent header</li>
   * <li>metadata</li>
   * <li>content</li>
   * </ul>
   *
   * @param socket
   *          The ZMQ.Socket object to read from.
   * @return a newly initialized Message object.
   */
  public Message readMessage(ZMQ.Socket socket) {
    Message message = new Message();
    try {
      // Read socket identities until we encounter the delimiter
      String identity = read(socket);
      while (!DELIM.equals(identity)) {
        message.getIdentities().add(identity.getBytes());
        identity = read(socket);
      }

      // Read the signature and the four blobs
      String expectedSig = read(socket);
      byte[] header = socket.recv();
      byte[] parent = socket.recv();
      byte[] metadata = socket.recv();
      byte[] content = socket.recv();

      // Make sure that the signatures match before proceeding.
      String actualSig = hmac.signBytes((List<byte[]>) new ArrayList<byte[]>(Arrays.asList(header, parent, metadata, content)));
      if (!expectedSig.equals(actualSig)) {
        logger.error("Message signatures do not match");
        logger.error("Expected: []", expectedSig);
        logger.error("Actual  : []", actualSig);
        throw new RuntimeException("Signatures do not match.");
      }

      // Parse the byte buffers into the appropriate types
      message.setHeader(parse(header, Header.class));
      message.setParentHeader(parse(parent, Header.class));
      message.setMetadata(parse(metadata, LinkedHashMap.class));
      message.setContent(parse(content, LinkedHashMap.class));

    } catch (Exception e) {
      throw new RuntimeException("Invalid hmac exception while converting to HmacSHA256");
    }

    return message;
  }

  public IHandler<Message> getHandler(Type type) {
    return handlers.get(type);
  }

  // A factory "method" for creating sockets.
  private ZMQ.Socket getNewSocket(int type, int port, String connection, ZMQ.Context context) {
    ZMQ.Socket socket = context.socket(type);
    socket.bind(connection + ":" + String.valueOf(port));
    return socket;
  }

  public void run() throws InterruptedException, IOException {
    logger.info("Groovy Jupyter kernel starting.");
    running = true;

    logger.debug("Parsing the connection file.");
    // System.out.println("Path to config file : " +
    // connectionFile.getAbsolutePath());
    configuration = Serializer.parse(new String(Files.readAllBytes(connectionFile.toPath())), Config.class);

    logger.debug("Creating signing hmac with: {}", configuration.getKey());
    hmac = new HmacSigner(configuration.getKey());

    final String connection = configuration.getTransport() + "://" + configuration.getHost();
    final ZMQ.Context context = ZMQ.context(1);

    // Create all the sockets we need to listen to.
    hearbeatSocket = getNewSocket(ZMQ.REP, configuration.getHeartbeat(), connection, context);
    iopubSocket = getNewSocket(ZMQ.PUB, configuration.getIopub(), connection, context);
    controlSocket = getNewSocket(ZMQ.ROUTER, configuration.getControl(), connection, context);
    stdinSocket = getNewSocket(ZMQ.ROUTER, configuration.getStdin(), connection, context);
    shellSocket = getNewSocket(ZMQ.ROUTER, configuration.getShell(), connection, context);

    // Create all the threads that respond to ZMQ messages.

    threads.put(HeartbeatThread.class.getSimpleName(), new HeartbeatThread(hearbeatSocket, this));
    threads.put(ControlThread.class.getSimpleName(),new ControlThread(controlSocket, this));
    threads.put(StdinThread.class.getSimpleName(),new StdinThread(stdinSocket, this));
    threads.put(ShellThread.class.getSimpleName(),new ShellThread(shellSocket, this));
    threads.put(ExecuteResultThread.class.getSimpleName(),new ExecuteResultThread(shellSocket, this));

    // Start all the socket handler threads
    for (AbstractThread thread : threads.values()) {
      thread.start();
    }

    while (running) {
      // Nothing to do but navel gaze until another thread sets
      // running == false
      Thread.sleep(1000);
    }
    
    for (AbstractHandler<Message> handler : handlers.values()) {
      handler.exit();
    }

    // Signal all threads that it is time to stop and then wait for
    // them to finish.
    logger.info("Shutting down");
    for (AbstractThread thread : threads.values()) {
      thread.halt();
    }
    for (AbstractThread thread : threads.values()) {
      thread.join();
    }
    logger.info("Done");
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    if (args.length != 1) {
      System.out.println("Invalid parameters passed to the Groovy kernel.");
      System.out.println("Expected one parameter, found " + String.valueOf(args.length));
      for (String string : args) {
        System.out.println(string);
      }
      System.exit(1);
    }

    File config = new File(args[0]);
    if (!config.exists()) {
      System.out.println("Kernel configuration not found.");
      System.exit(1);
    }

    GroovyKernel kernel = new GroovyKernel();
    kernel.connectionFile = config;
    kernel.run();
  }

  public String getId() {
    return id;
  }
  
}
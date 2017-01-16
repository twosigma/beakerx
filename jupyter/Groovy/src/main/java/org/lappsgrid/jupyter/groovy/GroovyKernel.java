package org.lappsgrid.jupyter.groovy;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.UUID;

import groovy.lang.ExpandoMetaClass;
import groovy.lang.MetaClass;
import org.codehaus.groovy.control.CompilerConfiguration;
import org.lappsgrid.jupyter.groovy.context.DefaultGroovyContext;
import org.lappsgrid.jupyter.groovy.context.GroovyContext;
import org.lappsgrid.jupyter.groovy.handler.CompleteHandler;
import org.lappsgrid.jupyter.groovy.handler.ExecuteHandler;
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

/**
 * The entry point for the Jupyter kernel.
 *
 * @author Keith Suderman
 */
public class GroovyKernel {
    public GroovyKernel() {
        this(new DefaultGroovyContext());
    }

    public GroovyKernel(GroovyContext context) {
        id = uuid();
        this.context = context;
        installHandlers();
    }

    public static String timestamp() {
        // SimpleDateFormat is not thread-safe so we need to create a new one for each
        // timestamp that is generated.
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mmZ");
        df.setTimeZone(UTC);
        return df.format(new Date());
    }

    public static String encode(Object object) {
        return Serializer.toJson(object);
    }

    public static Map decode(String json) {
        return Serializer.parse(json, LinkedHashMap.class);
    }

    public static <T> T decode(byte[] bytes) {
        return ((T) (decode(new String(bytes))));
    }

    public static <T> T decode(String json, Class<T> theClass) {
        return Serializer.parse(json, theClass);
    }

    public void shutdown() {
        running = false;
    }

    public static String uuid() {
        return UUID.randomUUID().toString();
    }

    private void installHandlers() {
    	Map<String, IHandler>  map = new HashMap<String, IHandler> ();
        map.put("execute_request", new ExecuteHandler(this));
        map.put("kernel_info_request", new KernelInfoHandler(this));
        map.put("is_complete_request", new CompleteHandler(this));
        map.put("history_request", new HistoryHandler(this));
        handlers = map;
    }

    /**
     * Sends a Message to the iopub socket.
     * @throws NoSuchAlgorithmException 
     */
    public void publish(Message message) throws NoSuchAlgorithmException {
        send(iopubSocket, message);
    }

    public void send(Message message) throws NoSuchAlgorithmException {
        send(shellSocket, message);
    }

    public void send(final ZMQ.Socket socket, Message message) throws NoSuchAlgorithmException {
        logger.trace("Sending message: {}", message.asJson());
        // Encode the message parts (blobs) and calculate the signature.
        final List<String> parts = new ArrayList<String>(Arrays.asList(encode(message.getHeader()), encode(message.getParentHeader()), encode(message.getMetadata()), encode(message.getContent())));
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

    public <T> T read(ZMQ.Socket socket, Class<T> theClass) {
        return Serializer.parse(read(socket), theClass);
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
     * @param socket The ZMQ.Socket object to read from.
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

    public IHandler getHandler(String type) {
        return ((IHandler) (handlers.get(type)));
    }

 // A factory "method" for creating sockets.
    private ZMQ.Socket getNewSocket(int type, int port, String connection, ZMQ.Context context){
        ZMQ.Socket socket = context.socket(type);
        socket.bind(connection + ":" + String.valueOf(port));
        return socket;
    }
    
    public void run() throws InterruptedException, IOException {
        logger.info("Groovy Jupyter kernel starting.");
        running = true;

        logger.debug("Parsing the connection file.");
        //System.out.println("Path to config file : " + connectionFile.getAbsolutePath());
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
        AbstractThread heartbeat = new HeartbeatThread(hearbeatSocket, this);
        AbstractThread control = new ControlThread(controlSocket, this);
        AbstractThread stdin = new StdinThread(stdinSocket, this);
        AbstractThread shell = new ShellThread(shellSocket, this);

        // Start all the socket handler threads
        List<AbstractThread> threads = new ArrayList<AbstractThread>(Arrays.asList(heartbeat, control, stdin, shell));
        for (Thread thread : threads) {
        	thread.start();
		}

        while (running) {
            // Nothing to do but navel gaze until another thread sets
            // running == false
            Thread.sleep(1000);
        }


        // Signal all threads that it is time to stop and then wait for
        // them to finish.
        logger.info("Shutting down");
        for (AbstractThread thread : threads) {
        	thread.halt();
		}
        for (AbstractThread thread : threads) {
        	thread.join();
		}
        logger.info("Done");
    }

    public static void main(final String[] args) throws InterruptedException, IOException {
        if (args.length != 2) {
        	System.out.println("Invalid parameters passed to the Groovy kernel.");
        	System.out.println("Expected two parameter, found " + String.valueOf(args.length));
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

      String classPath = args[1];


      GroovyKernel kernel = new GroovyKernel(new GroovyContext() {
        @Override
        public CompilerConfiguration getCompilerConfiguration() {
          CompilerConfiguration compilerConfiguration = new CompilerConfiguration();
          compilerConfiguration.setClasspathList(Arrays.asList(classPath));
          return compilerConfiguration;
        }

        @Override
        public MetaClass getMetaClass(Class aClass) {
          MetaClass mc = new ExpandoMetaClass(aClass, false);
          ((ExpandoMetaClass) mc).initialize();
          return mc;
        }
      });
        kernel.connectionFile = config;
        kernel.run();
    }

    public static TimeZone getUTC() {
        return UTC;
    }

    public static String getDELIM() {
        return DELIM;
    }

    public HmacSigner getHmac() {
        return hmac;
    }

    public void setHmac(HmacSigner hmac) {
        this.hmac = hmac;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public File getConnectionFile() {
        return connectionFile;
    }

    public void setConnectionFile(File connectionFile) {
        this.connectionFile = connectionFile;
    }

    public Config getConfiguration() {
        return configuration;
    }

    public void setConfiguration(Config configuration) {
        this.configuration = configuration;
    }

    public Map<String, IHandler> getHandlers() {
        return handlers;
    }

    public void setHandlers(Map<String, IHandler> handlers) {
        this.handlers = handlers;
    }

    public GroovyContext getContext() {
        return context;
    }

    public void setContext(GroovyContext context) {
        this.context = context;
    }

    public ZMQ.Socket getHearbeatSocket() {
        return hearbeatSocket;
    }

    public void setHearbeatSocket(ZMQ.Socket hearbeatSocket) {
        this.hearbeatSocket = hearbeatSocket;
    }

    public ZMQ.Socket getControlSocket() {
        return controlSocket;
    }

    public void setControlSocket(ZMQ.Socket controlSocket) {
        this.controlSocket = controlSocket;
    }

    public ZMQ.Socket getShellSocket() {
        return shellSocket;
    }

    public void setShellSocket(ZMQ.Socket shellSocket) {
        this.shellSocket = shellSocket;
    }

    public ZMQ.Socket getIopubSocket() {
        return iopubSocket;
    }

    public void setIopubSocket(ZMQ.Socket iopubSocket) {
        this.iopubSocket = iopubSocket;
    }

    public ZMQ.Socket getStdinSocket() {
        return stdinSocket;
    }

    public void setStdinSocket(ZMQ.Socket stdinSocket) {
        this.stdinSocket = stdinSocket;
    }

    private static final Logger logger = LoggerFactory.getLogger(GroovyKernel.class);
    /**
     * The timezone to use when generating time stamps.
     */
    private static final TimeZone UTC = TimeZone.getTimeZone("UTC");
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
    private Map<String, IHandler> handlers;
    /**
     * Used to configure the Groovy compiler when code needs to be compiled.
     */
    private GroovyContext context;
    private ZMQ.Socket hearbeatSocket;
    private ZMQ.Socket controlSocket;
    private ZMQ.Socket shellSocket;
    private ZMQ.Socket iopubSocket;
    private ZMQ.Socket stdinSocket;
}

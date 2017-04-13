/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.jupyter.socket;

import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.jupyter.Config;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.KernelSockets;
import com.twosigma.jupyter.SocketCloseAction;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.MessageSerializer;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;
import com.twosigma.jupyter.security.HashedMessageAuthenticationCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeromq.ZFrame;
import org.zeromq.ZMQ;
import org.zeromq.ZMsg;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.SHUTDOWN_REPLY;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.SHUTDOWN_REQUEST;
import static java.util.Arrays.asList;
import static com.twosigma.jupyter.message.MessageSerializer.toJson;

public class KernelSocketsZMQ extends KernelSockets {

  public static final Logger logger = LoggerFactory.getLogger(KernelSocketsZMQ.class);

  public static final String DELIM = "<IDS|MSG>";

  private KernelFunctionality kernel;
  private SocketCloseAction closeAction;
  private HashedMessageAuthenticationCode hmac;
  private ZMQ.Socket hearbeatSocket;
  private ZMQ.Socket controlSocket;
  private ZMQ.Socket shellSocket;
  private ZMQ.Socket iopubSocket;
  private ZMQ.Socket stdinSocket;
  private ZMQ.Poller sockets;
  private ZMQ.Context context;

  private boolean shutdownSystem = false;

  public KernelSocketsZMQ(KernelFunctionality kernel, Config configuration, SocketCloseAction closeAction) {
    this.closeAction = closeAction;
    this.kernel = kernel;
    this.hmac = new HashedMessageAuthenticationCode(configuration.getKey());
    this.context = ZMQ.context(1);
    configureSockets(configuration);
  }

  private void configureSockets(Config configuration) {
    final String connection = configuration.getTransport() + "://" + configuration.getHost();

    hearbeatSocket = getNewSocket(ZMQ.REP, configuration.getHeartbeat(), connection, context);
    iopubSocket = getNewSocket(ZMQ.PUB, configuration.getIopub(), connection, context);
    controlSocket = getNewSocket(ZMQ.ROUTER, configuration.getControl(), connection, context);
    stdinSocket = getNewSocket(ZMQ.ROUTER, configuration.getStdin(), connection, context);
    shellSocket = getNewSocket(ZMQ.ROUTER, configuration.getShell(), connection, context);

    sockets = new ZMQ.Poller(4);
    sockets.register(controlSocket, ZMQ.Poller.POLLIN);
    sockets.register(hearbeatSocket, ZMQ.Poller.POLLIN);
    sockets.register(shellSocket, ZMQ.Poller.POLLIN);
    sockets.register(stdinSocket, ZMQ.Poller.POLLIN);
  }

  public void publish(Message message) {
    send(this.iopubSocket, message);
  }

  public void send(Message message) {
    send(this.shellSocket, message);
  }

  private void send(final ZMQ.Socket socket, Message message) {
    sendMsg(socket, message);
  }

  private synchronized void sendMsg(ZMQ.Socket socket, Message message) {
    String header = toJson(message.getHeader());
    String parent = toJson(message.getParentHeader());
    String meta = toJson(message.getMetadata());
    String content = toJson(message.getContent());
    String digest = hmac.sign(Arrays.asList(header, parent, meta, content));

    ZMsg newZmsg = new ZMsg();
    message.getIdentities().forEach(newZmsg::add);
    newZmsg.add(DELIM);
    newZmsg.add(digest.getBytes());
    newZmsg.add(header.getBytes());
    newZmsg.add(parent.getBytes());
    newZmsg.add(meta.getBytes());
    newZmsg.add(content.getBytes());
    newZmsg.send(socket);
  }

  private Message readMessage(ZMQ.Socket socket) {
    ZMsg zmsg = null;
    Message message = new Message();
    try {
      zmsg = ZMsg.recvMsg(socket);
      ZFrame[] parts = new ZFrame[zmsg.size()];
      zmsg.toArray(parts);
      byte[] uuid = parts[MessageParts.UUID].getData();
      byte[] header = parts[MessageParts.HEADER].getData();
      byte[] parent = parts[MessageParts.PARENT].getData();
      byte[] metadata = parts[MessageParts.METADATA].getData();
      byte[] content = parts[MessageParts.CONTENT].getData();
      byte[] expectedSig = parts[MessageParts.HMAC].getData();

      verifyDelim(parts[MessageParts.DELIM]);
      verifySignatures(expectedSig, header, parent, metadata, content);

      if (uuid != null) {
        message.getIdentities().add(uuid);
      }
      message.setHeader(parse(header, Header.class));
      message.setParentHeader(parse(parent, Header.class));
      message.setMetadata(parse(metadata, LinkedHashMap.class));
      message.setContent(parse(content, LinkedHashMap.class));

    } finally {
      if (zmsg != null) {
        zmsg.destroy();
      }
    }

    return message;
  }

  @Override
  public void run() {
    try {
      while (!this.isInterrupted()) {
        sockets.poll();
        if (isControlMsg()) {
          handleControlMsg();
        }
        if (isHeartbeatMsg()) {
          handleHeartbeat();
        }
        if (isShellMsg()) {
          handleShell();
        }
        if (isStdinMsg()) {
          handleStdIn();
        }
        if (this.isShutdown()) {
          break;
        }
      }
    } finally {
      close();
    }
  }

  private void handleStdIn() {
    byte[] buffer = stdinSocket.recv();
    logger.info("Stdin: {}", new String(buffer));
  }

  private void handleShell() {
    Message message = readMessage(shellSocket);
    Handler<Message> handler = kernel.getHandler(message.type());
    if (handler != null) {
      handler.handle(message);
    }
  }

  private void handleHeartbeat() {
    byte[] buffer = hearbeatSocket.recv(0);
    hearbeatSocket.send(buffer);
  }

  private void handleControlMsg() {
    Message message = readMessage(controlSocket);
    JupyterMessages type = message.getHeader().getTypeEnum();
    if (type.equals(SHUTDOWN_REQUEST)) {
      Message reply = new Message();
      reply.setHeader(new Header(SHUTDOWN_REPLY, message.getHeader().getSession()));
      reply.setParentHeader(message.getHeader());
      reply.setContent(message.getContent());
      send(controlSocket, reply);
      shutdown();
    }
  }

  private ZMQ.Socket getNewSocket(int type, int port, String connection, ZMQ.Context context) {
    ZMQ.Socket socket = context.socket(type);
    socket.bind(connection + ":" + String.valueOf(port));
    return socket;
  }

  private void close() {
    closeAction.close();
    closeSockets();
  }

  private void closeSockets() {
    try {
      if (shellSocket != null) {
        shellSocket.close();
      }
      if (controlSocket != null) {
        controlSocket.close();
      }
      if (iopubSocket != null) {
        iopubSocket.close();
      }
      if (stdinSocket != null) {
        stdinSocket.close();
      }
      if (hearbeatSocket != null) {
        hearbeatSocket.close();
      }
      context.close();
    } catch (Exception e) {
    }
  }

  private void verifySignatures(byte[] expectedSig, byte[] header, byte[] parent, byte[] metadata, byte[] content) {
    String actualSig = hmac.signBytes(new ArrayList<>(asList(header, parent, metadata, content)));
    String expectedSigAsString = new String(expectedSig);
    if (!expectedSigAsString.equals(actualSig)) {
      throw new RuntimeException("Signatures do not match.");
    }
  }

  private String verifyDelim(ZFrame zframe) {
    String delim = new String(zframe.getData(), StandardCharsets.UTF_8);
    if (!DELIM.equals(delim)) {
      throw new RuntimeException("Delimiter <IDS|MSG> not found");
    }
    return delim;
  }

  private boolean isStdinMsg() {
    return sockets.pollin(3);
  }

  private boolean isShellMsg() {
    return sockets.pollin(2);
  }

  private boolean isHeartbeatMsg() {
    return sockets.pollin(1);
  }

  private boolean isControlMsg() {
    return sockets.pollin(0);
  }

  private void shutdown() {
    this.shutdownSystem = true;
  }

  private boolean isShutdown() {
    return this.shutdownSystem;
  }

  private <T> T parse(byte[] bytes, Class<T> theClass) {
    return bytes != null ? MessageSerializer.parse(new String(bytes), theClass) : null;
  }
}

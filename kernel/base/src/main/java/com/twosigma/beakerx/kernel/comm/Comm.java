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
package com.twosigma.beakerx.kernel.comm;

import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.Utils;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.util.Preconditions;
import com.twosigma.beakerx.widget.ChangeItem;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_CLOSE;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_MSG;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_OPEN;
import static com.twosigma.beakerx.util.Preconditions.checkNotNull;
import static java.util.Collections.EMPTY_LIST;
import static java.util.Collections.singletonList;

public class Comm {

  public static final String METHOD = "method";
  public static final String UPDATE = "update";
  public static final String STATE = "state";
  public static final String VERSION = "version";

  public static final String COMM_ID = "comm_id";
  public static final String TARGET_NAME = "target_name";
  public static final String DATA = "data";
  public static final String METADATA = "metadata";
  public static final String TARGET_MODULE = "target_module";
  public static final String COMMS = "comms";
  public static final String BUFFER_PATHS = "buffer_paths";

  private String commId;
  private String targetName;
  private Comm.Data data;
  private HashMap<?, ?> metadata;
  private String targetModule;
  private KernelFunctionality kernel;
  private List<Handler<Message>> msgCallbackList = new ArrayList<>();
  private List<Handler<Message>> closeCallbackList = new ArrayList<>();


  public Comm(String commId, String targetName, Message parentMessage) {
    this(commId, targetName);
    getParentMessageStrategy = () -> parentMessage;
  }

  public Comm(String commId, String targetName) {
    super();
    this.kernel = KernelManager.get();
    this.commId = commId;
    this.targetName = targetName;
    this.data = new Comm.Data(new HashMap<>());
    this.metadata = new HashMap<>();
  }

  public Comm(String commId, TargetNamesEnum targetName) {
    this(commId, targetName.getTargetName());
  }

  public Comm(TargetNamesEnum targetName) {
    this(Utils.commUUID(), targetName.getTargetName());
  }

  public Comm(String targetName) {
    this(Utils.commUUID(), targetName);
  }

  public String getCommId() {
    return commId;
  }

  public String getTargetName() {
    return targetName;
  }

  public Comm.Data getData() {
    return new Comm.Data(new HashMap<>(data.getData()));
  }

  public void setData(HashMap<?, ?> data) {
    this.data = new Comm.Data(data);
  }

  public void setMetaData(HashMap<?, ?> metadata) {
    this.metadata = metadata;
  }

  public String getTargetModule() {
    return targetModule;
  }

  public void setTargetModule(String targetModule) {
    this.targetModule = targetModule;
  }

  public void addMsgCallbackList(Handler<Message>... handlers) {
    this.msgCallbackList.addAll(Arrays.asList(handlers));
  }

  public void clearMsgCallbackList() {
    this.msgCallbackList = new ArrayList<>();
  }

  public List<Handler<Message>> getCloseCallbackList() {
    return closeCallbackList;
  }

  public void addCloseCallbackList(Handler<Message>... handlers) {
    this.closeCallbackList.addAll(Arrays.asList(handlers));
  }

  public void clearCloseCallbackList() {
    this.closeCallbackList = new ArrayList<>();
  }

  public void open() {
    doOpen(getParentMessage(), Buffer.EMPTY);
  }

  public void open(Comm.Buffer buffer) {
    doOpen(getParentMessage(), buffer);
  }

  public void open(Message parentMessage) {
    getParentMessageStrategy = () -> parentMessage;
    doOpen(parentMessage, Buffer.EMPTY);
  }

  private void doOpen(Message parentMessage, Buffer buffer) {
    Preconditions.checkNotNull(parentMessage, "parent message can not be null");
    Message message = new Message(new Header(COMM_OPEN, parentMessage.getHeader().getSession()));
    message.setParentHeader(parentMessage.getHeader());
    HashMap<String, Serializable> map = new HashMap<>();
    map.put(COMM_ID, getCommId());
    map.put(TARGET_NAME, getTargetName());

    HashMap<String, Serializable> state = new HashMap<>();
    state.put(STATE, data.getData());
    state.put(METHOD, (Serializable) data.getData().get(METHOD));
    if (!buffer.isEmpty()) {
      state.put(BUFFER_PATHS, buffer.getBufferPaths());
      message.setBuffers(buffer.getBuffers());
    }
    map.put(DATA, state);
    map.put(METADATA, metadata);

    map.put(TARGET_MODULE, getTargetModule());
    message.setContent(map);
    message.setMetadata(buildMetadata());
    kernel.publish(singletonList(message));
    kernel.addComm(getCommId(), this);
  }

  public void close() {
    Message parentMessage = getParentMessage();

    if (this.getCloseCallbackList() != null && !this.getCloseCallbackList().isEmpty()) {
      for (Handler<Message> handler : getCloseCallbackList()) {
        handler.handle(parentMessage);
      }
    }
    Message message = new Message(new Header(COMM_CLOSE, parentMessage.getHeader().getSession()));
    if (parentMessage != null) {
      message.setParentHeader(parentMessage.getHeader());
    }
    HashMap<String, Serializable> map = new HashMap<>();
    map.put(COMM_ID, getCommId());
    map.put(DATA, new HashMap<>());
    map.put(METADATA, new HashMap<>());
    message.setContent(map);
    message.setMetadata(buildMetadata());

    kernel.removeComm(getCommId());
    kernel.publish(singletonList(message));
  }

  public void send(Comm.Buffer buffer, Comm.Data data) {
    send(COMM_MSG, buffer, data);
  }

  public void send(JupyterMessages type, Comm.Data data) {
    send(type, Buffer.EMPTY, data);
  }

  public void send(JupyterMessages type, Comm.Buffer buffer, Comm.Data data) {
    Message message = createMessage(type, buffer, data);
    kernel.publish(singletonList(message));
  }

  public Message createMessage(JupyterMessages type, Buffer buffer, Comm.Data data, Message parent) {
    HashMap<String, Serializable> map = new HashMap<>(6);
    if (type != JupyterMessages.DISPLAY_DATA) {
      map.put(COMM_ID, getCommId());
    }
    map.put(DATA, data.getData());
    map.put(METADATA, metadata);
    return create(type, buffer, map, parent);
  }

  public Message createMessage(JupyterMessages type, Buffer buffer, Comm.Data data) {
    HashMap<String, Serializable> map = new HashMap<>(6);
    if (type != JupyterMessages.DISPLAY_DATA) {
      map.put(COMM_ID, getCommId());
    }
    map.put(DATA, data.getData());
    map.put(METADATA, metadata);
    return create(type, buffer, map);
  }

  private Message create(JupyterMessages type, Comm.Buffer buffer, Map<String, Serializable> content, Message parent) {
    return messageMessage(type, buffer, content, parent);
  }

  private Message create(JupyterMessages type, Comm.Buffer buffer, Map<String, Serializable> content) {
    return messageMessage(type, buffer, content, getParentMessage());
  }

  public static Message messageMessage(JupyterMessages type, Buffer buffer, Map<String, Serializable> content, Message parentMessage) {
    Message message = new Message(new Header(type, parentMessage.getHeader().getSession()));
    checkNotNull(parentMessage);
    message.setParentHeader(parentMessage.getHeader());
    message.setContent(content);
    message.setMetadata(buildMetadata());
    if (!buffer.isEmpty()) {
      message.setBuffers(buffer.getBuffers());
    }
    return message;
  }

  public void publish(List<Message> list) {
    kernel.publish(list);
  }

  public void sendUpdate(Comm.Buffer buffer) {
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(METHOD, UPDATE);
    HashMap<Object, Object> state = new HashMap<>();
    content.put(STATE, state);
    content.put(BUFFER_PATHS, buffer.getBufferPaths());
    this.send(buffer, new Comm.Data(content));
  }

  public Message createOutputContent(final Map<String, Serializable> content) {
    return this.create(JupyterMessages.STREAM, Buffer.EMPTY, content);
  }

  public void sendUpdate(List<ChangeItem> changes) {
    Message message = createUpdateMessage(changes, new HashMap<>());
    kernel.publish(singletonList(message));
  }

  public void sendUpdate(List<ChangeItem> changes, Message parent) {
    Message message = createUpdateMessage(changes, parent);
    kernel.publish(singletonList(message));
  }

  public Message createUpdateMessage(List<ChangeItem> changes, Message parent) {
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(METHOD, UPDATE);
    HashMap<Object, Object> state = new HashMap<>();
    changes.forEach( x-> state.put(x.getPropertyName(), x.getValue()));
    content.put(STATE, state);
    content.put(BUFFER_PATHS, new HashMap<>());
    return this.createMessage(COMM_MSG, Buffer.EMPTY, new Comm.Data(content), parent);
  }

  public Message createUpdateMessage(List<ChangeItem> changes, HashMap<String, Object> state) {
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(METHOD, UPDATE);
    changes.forEach( x-> state.put(x.getPropertyName(), x.getValue()));
    content.put(STATE, state);
    content.put(BUFFER_PATHS, new HashMap<>());
    return this.createMessage(COMM_MSG, Buffer.EMPTY, new Comm.Data(content));
  }

  public void handleMsg(Message parentMessage) {
    for (Handler<Message> handler : this.msgCallbackList) {
      handler.handle(parentMessage);
    }
  }

  private static HashMap<String, Serializable> buildMetadata() {
    HashMap<String, Serializable> metadata = new HashMap<>();
    metadata.put(VERSION, "2");
    return metadata;
  }

  @Override
  public String toString() {
    return commId + "/" + targetName + "/" + (targetModule != null && !targetModule.isEmpty() ? targetModule : "");
  }

  public Message getParentMessage() {
    return getParentMessageStrategy.getParentMessage();
  }

  private GetParentMessageStrategy getParentMessageStrategy = InternalVariable::getParentHeader;

  interface GetParentMessageStrategy {
    Message getParentMessage();
  }

  public static class Data {

    private HashMap<?, ?> data;

    public Data(HashMap<?, ?> data) {
      this.data = data;
    }

    public HashMap<?, ?> getData() {
      return data;
    }
  }

  public static class Buffer {
    public final static Buffer EMPTY = new Buffer(EMPTY_LIST, new ArrayList<>());

    private List<byte[]> buffers;
    private ArrayList<List<String>> bufferPaths;

    public Buffer(List<byte[]> buffers, ArrayList<List<String>> bufferPaths) {
      this.buffers = buffers;
      this.bufferPaths = bufferPaths;
    }

    public List<byte[]> getBuffers() {
      return buffers;
    }

    public ArrayList<List<String>> getBufferPaths() {
      return bufferPaths;
    }

    public boolean isEmpty() {
      return buffers.isEmpty();
    }
  }
}
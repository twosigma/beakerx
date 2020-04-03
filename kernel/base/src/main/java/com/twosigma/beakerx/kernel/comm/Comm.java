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

import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.ChangeItem;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface Comm {

  String METHOD = "method";
  String UPDATE = "update";
  String STATE = "state";
  String VERSION = "version";

  String COMM_ID = "comm_id";
  String TARGET_NAME = "target_name";
  String DATA = "data";
  String METADATA = "metadata";
  String TARGET_MODULE = "target_module";
  String COMMS = "comms";
  String BUFFER_PATHS = "buffer_paths";


  void addMsgCallbackList(Handler<Message>... handlers);

  void setData(HashMap<?, ?> data);

  void open();

  void open(Buffer buffer);

  void open(Message parentMessage);

  void close();

  String getCommId();

  void send(Buffer buffer, Data data);

  void send(JupyterMessages type, Data data);

  void send(JupyterMessages type, Buffer buffer, Data data);

  void sendUpdate(Buffer buffer);

  void sendUpdate(List<ChangeItem> changes);

  void sendUpdate(List<ChangeItem> changes, Message parent);

  Message createUpdateMessage(List<ChangeItem> changes, Message parent);

  Message createUpdateMessage(List<ChangeItem> changes, HashMap<String, Object> state);

  Message createOutputContent(final Map<String, Serializable> content);

  Message getParentMessage();

  void publish(List<Message> list);

  Message createMessage(JupyterMessages type, Buffer buffer, Data data, Message parent);

  Message createMessage(JupyterMessages type, Buffer buffer, Data data);

  String getTargetName();

  void handleMsg(Message parentMessage);

  String getTargetModule();

  void setTargetModule(String targetModule);

  Data getData();

  Comm createNewComm();

  void sendData(String event, HashMap<String, String> payload);

}

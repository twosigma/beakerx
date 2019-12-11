/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.widget;

import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.DISPLAY_DATA;
import static com.twosigma.beakerx.message.Header.MSG_ID;
import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;

public class Output extends DOMWidget {

  public static final String VIEW_NAME_VALUE = "OutputView";
  public static final String MODEL_NAME_VALUE = "OutputModel";

  public static final String MODEL_MODULE_VALUE = "@jupyter-widgets/output";
  public static final String VIEW_MODULE_VALUE = "@jupyter-widgets/output";
  public static final String OUTPUTS = "outputs";
  public static final String OUTPUT_TYPE = "output_type";
  public static final String NAME = "name";
  public static final String TEXT = "text";
  public static final String STREAM = "stream";
  public static final String STDERR = "stderr";
  public static final String STDOUT = "stdout";

  private List<Map<String, Serializable>> outputs = Collections.synchronizedList(new ArrayList<>());

  public Output() {
    super();
    openComm();
  }

  public Output(Message parentMessage) {
    super(parentMessage);
    openComm(parentMessage);
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

  @Override
  public String getModelModuleValue() {
    return MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return VIEW_MODULE_VALUE;
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(MSG_ID, "");
    content.put(OUTPUTS, new ArrayList<>().toArray());
    return content;
  }

  @Override
  public void stateRequestHandler() {
    super.stateRequestHandler();
    clearOutput();
  }

  @Override
  public void updateValue(Object value) {
    List<Message> list = new ArrayList<>();
    list.add(getComm().createUpdateMessage(asList(new ChangeItem(MSG_ID, "")),new HashMap<>()));
    getComm().publish(list);
  }

  public void sendStdout(String text) {
    send(false, text);
  }

  public void sendStderr(String text) {
    send(true, text);
  }

  public void appendStdout(String text) {
    sendStdout(text + "\n");
  }

  public void appendStderr(String text) {
    sendStderr(text + "\n");
  }

  private synchronized void send(boolean isError, String text) {
    List<Message> list = new ArrayList<>();
    list.add(getComm().createUpdateMessage(asList(new ChangeItem(MSG_ID, getComm().getParentMessage().getHeader().getId())), new HashMap<>()));
    Map<String, Serializable> asMap = addOutput(isError, text);
    list.add(getComm().createOutputContent(asMap));
    getComm().publish(list);
  }

  private void display(HashMap<String, Serializable> content) {
    List<Message> list = new ArrayList<>();
    list.add(getComm().createUpdateMessage(asList(new ChangeItem(MSG_ID, getComm().getParentMessage().getHeader().getId())), new HashMap<>()));
    list.add(getComm().createMessage(DISPLAY_DATA, Comm.Buffer.EMPTY, new Comm.Data(content)));
    getComm().publish(list);
  }

  private Map<String, Serializable> addOutput(boolean isError, String text) {
    Map<String, Serializable> value = createOutput(isError, text);
    outputs.add(value);
    return value;
  }

  public void clearOutput() {
    outputs = Collections.synchronizedList(new ArrayList<>());
    sendUpdate(OUTPUTS, emptyList());
  }

  private Map<String, Serializable> createOutput(boolean isError, String text) {
    Map<String, Serializable> outputs = new HashMap<>();
    outputs.put(OUTPUT_TYPE, STREAM);
    outputs.put(NAME, isError ? STDERR : STDOUT);
    outputs.put(TEXT, text);
    return outputs;
  }

  public void display(MIMEContainer mimeContainer) {
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(mimeContainer.getMime().asString(), (Serializable) mimeContainer.getData());
    display(content);
  }

  public void display(List<MIMEContainer> mimeContainers) {
    mimeContainers.forEach(this::display);
  }

  public void displayWidgets(List<Widget> widgets) {
    widgets.forEach(this::display);
  }

  public void display(Widget widget) {
    widget.beforeDisplay();
    HashMap<String, Serializable> content = new HashMap<>();
    HashMap<String, Serializable> vendor = new HashMap<>();
    vendor.put(MODEL_ID, widget.getComm().getCommId());
    content.put(APPLICATION_VND_JUPYTER_WIDGET_VIEW_JSON, vendor);
    display(content);
  }

  @Override
  public void display() {
    beforeDisplay();
    sendDisplay();
  }

}

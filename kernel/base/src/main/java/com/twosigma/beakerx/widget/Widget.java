/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.comm.TargetNamesEnum;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.table.handlers.StateRequestMsgCallbackHandler;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

import static com.twosigma.beakerx.handler.KernelHandlerWrapper.wrapBusyIdle;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.DISPLAY_DATA;
import static java.util.Arrays.asList;

public abstract class Widget implements CommFunctionality, DisplayableWidget, WidgetItem {

  public static final String APPLICATION_VND_JUPYTER_WIDGET_VIEW_JSON = "application/vnd.jupyter.widget-view+json";
  public static final String MODEL_ID = "model_id";

  public static final String MODEL_MODULE = "_model_module";
  public static final String MODEL_NAME = "_model_name";
  public static final String VIEW_MODULE = "_view_module";
  public static final String VIEW_NAME = "_view_name";
  public static final String VIEW_MODULE_VERSION = "_view_module_version";
  public static final String MODEL_MODULE_VERSION = "_model_module_version";

  public static final String MODEL_MODULE_VALUE = "@jupyter-widgets/controls";
  public static final String VIEW_MODULE_VALUE = "@jupyter-widgets/controls";
  public static final String MODEL_MODULE_VERSION_VALUE = "*";
  public static final String VIEW_MODULE_VERSION_VALUE = "*";

  public static final String VALUE = "value";
  public static final String DISABLED = "disabled";
  public static final String VISIBLE = "visible";
  public static final String DESCRIPTION = "description";
  public static final String MSG_THROTTLE = "msg_throttle";

  public static final String METHOD = "method";
  public static final String DISPLAY = "display_data";

  public static final String INDEX = "index";

  private Comm comm;

  public Widget() {
    comm = new Comm(TargetNamesEnum.JUPYTER_WIDGET);
    getComm().addMsgCallbackList(new StateRequestMsgCallbackHandler(this::stateRequestHandler));
  }

  public void stateRequestHandler(){
  }

  protected void openComm() {
    openComm(Comm.Buffer.EMPTY);
  }

  private void openComm(Comm.Buffer buffer) {
    comm.setData(createState());
    addValueChangeMsgCallback();
    comm.open(buffer);
  }

  protected void openComm(Message parentMessage) {
    comm.setData(createState());
    addValueChangeMsgCallback();
    comm.open(parentMessage);
  }

  public void close() {
    if (this.comm != null) {
      this.comm.close();
    }
  }

  @Override
  public void display() {
    beforeDisplay();
    sendDisplay();
  }

  protected void beforeDisplay() {
  }

  protected void sendDisplay() {
    HashMap<String, Serializable> content = new HashMap<>();
    HashMap<String, Serializable> data = new HashMap<>();
    //These magic numbers needs to be clarified
    data.put("version_major", 2);
    data.put("version_minor", 0);
    data.put(MODEL_ID, getComm().getCommId());
    content.put(METHOD, DISPLAY);
    content.put(APPLICATION_VND_JUPYTER_WIDGET_VIEW_JSON, data);
    getComm().send(DISPLAY_DATA, new Comm.Data(content));
  }

  protected HashMap<String, Object> createState() {
    HashMap<String, Object> result = new HashMap<>();
    result.put(MODEL_MODULE, getModelModuleValue());
    result.put(VIEW_MODULE, getViewModuleValue());
    result.put(VIEW_MODULE_VERSION, getViewModuleVersion());
    result.put(MODEL_MODULE_VERSION, getModelModuleVersion());
    String mn = getModelNameValue();
    if (mn != null && !mn.isEmpty()) {
      result.put(MODEL_NAME, mn);
    }
    String vnv = getViewNameValue();
    if (vnv != null && !vnv.isEmpty()) {
      result.put(VIEW_NAME, vnv);
    }
    result = content(result);
    return result;
  }

  public abstract String getModelNameValue();

  public abstract String getViewNameValue();

  public String getModelModuleValue() {
    return MODEL_MODULE_VALUE;
  }

  public String getViewModuleValue() {
    return VIEW_MODULE_VALUE;
  }

  public String getModelModuleVersion() {
    return MODEL_MODULE_VERSION_VALUE;
  }

  public String getViewModuleVersion() {
    return VIEW_MODULE_VERSION_VALUE;
  }

  protected abstract void addValueChangeMsgCallback();

  protected abstract HashMap<String, Object> content(HashMap<String, Object> content);

  @Override
  public Comm getComm() {
    return this.comm;
  }

  public void sendUpdate(String propertyName, Object value) {
    this.sendUpdate(asList(new ChangeItem(propertyName, value)));
  }

  public void sendUpdate(String propertyName, Object value, Message parent) {
    this.sendUpdate(asList(new ChangeItem(propertyName, value)),parent);
  }

  public void sendUpdate(ChangeItem change) {
    this.sendUpdate(asList(change));
  }

  public void sendUpdate(List<ChangeItem> changes) {
    this.comm.sendUpdate(changes);
  }

  public void sendUpdate(List<ChangeItem> changes, Message parent) {
    this.comm.sendUpdate(changes, parent);
  }

  public void sendUpdate(Comm.Buffer buffer) {
    this.comm.sendUpdate(buffer);
  }

  public void handleCommEventSync(Message message, CommActions action, ActionPerformed handlerAction) {
    wrapBusyIdle(KernelManager.get(), message, () -> CompiledCodeRunner.runCommEvent(message, action, handlerAction));
  }

  public interface ActionPerformed {
    void executeAction(HashMap content, Message message);
  }

  public void activateWidgetInContainer() {
    // should be removed when our widgets will be rewritten to ipywidget style
  }

  public interface WidgetDisplayMethodStrategy {
    void display(Widget widget);
  }

  @Override
  public Widget asWidget() {
    return this;
  }

}
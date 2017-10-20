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
package com.twosigma.beakerx.widgets;

import java.io.Serializable;
import java.util.HashMap;
import static com.twosigma.beakerx.handler.KernelHandlerWrapper.wrapBusyIdle;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.DISPLAY_DATA;
import static com.twosigma.beakerx.widgets.CompiledCodeRunner.runCommEvent;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.comm.TargetNamesEnum;
import com.twosigma.beakerx.message.Message;

public abstract class Widget implements CommFunctionality, DisplayableWidget {

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
  }

  protected void openComm() {
    comm.setData(createContent());
    addValueChangeMsgCallback();
    comm.open();
  }

  public void close() {
    if (this.comm != null) {
      this.comm.close();
    }
  }

  @Override
  public void display() {
    sendDisplay();
  }

  private void sendDisplay() {
    HashMap<String, Serializable> content = new HashMap<>();
    HashMap<String, Serializable> data = new HashMap<>();
    //These magic numbers needs to be clarified
    data.put("version_major", 2);
    data.put("version_minor", 0);
    data.put(MODEL_ID, getComm().getCommId());

    content.put(METHOD, DISPLAY);
    content.put(APPLICATION_VND_JUPYTER_WIDGET_VIEW_JSON, data);
    getComm().setData(content);
    getComm().send(DISPLAY_DATA);
  }

  private HashMap<String, Serializable> createContent() {
    HashMap<String, Serializable> result = new HashMap<>();
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

  protected abstract HashMap<String, Serializable> content(HashMap<String, Serializable> content);

  @Override
  public Comm getComm() {
    return this.comm;
  }

  public void sendUpdate(String propertyName, Object value) {
    this.comm.sendUpdate(propertyName, value);
  }

  public void handleCommEventSync(Message message, CommActions action, ActionPerformed handlerAction) {
    wrapBusyIdle(KernelManager.get(), message, () -> runCommEvent(message, action, handlerAction));
  }

  public interface ActionPerformed {
    void executeAction(HashMap content, Message message);
  }

  public void activateWidgetInContainer() {
    // should be removed when our widgets will be rewritten to ipywidget style
  }

}
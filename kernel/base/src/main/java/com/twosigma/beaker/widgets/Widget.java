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
package com.twosigma.beaker.widgets;

import java.io.Serializable;
import java.util.HashMap;

import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.jupyter.comm.TargetNamesEnum;

public abstract class Widget implements CommFunctionality, DisplayableWidget {

  public static final String MODEL_MODULE = "_model_module";
  public static final String MODEL_NAME = "_model_name";
  public static final String VIEW_MODULE = "_view_module";
  public static final String VIEW_NAME = "_view_name";

  public static final String MODEL_MODULE_VALUE = "jupyter-js-widgets";
  public static final String VIEW_MODULE_VALUE = "jupyter-js-widgets";

  public static final String VALUE = "value";
  public static final String DISABLED = "disabled";
  public static final String VISIBLE = "visible";
  public static final String DESCRIPTION = "description";
  public static final String MSG_THROTTLE = "msg_throttle";

  public static final String METHOD = "method";
  public static final String DISPLAY = "display";

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

  public void beforeDisplay() {
    //nothing to do in jupyter widgets.
    //should be removed in the future.
  }

  @Override
  public void display() {
    beforeDisplay();
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(METHOD, DISPLAY);
    getComm().setData(content);
    getComm().send();
  }

  private HashMap<String, Serializable> createContent() {
    HashMap<String, Serializable> result = new HashMap<>();
    result.put(MODEL_MODULE, getModelModuleValue());
    result.put(VIEW_MODULE, getViewModuleValue());
    result.put(MODEL_NAME, getModelNameValue());
    result.put(VIEW_NAME, getViewNameValue());
    result = content(result);
    return result;
  }
  public abstract String getModelNameValue();

  public abstract String getViewNameValue();

  public String getModelModuleValue(){
    return MODEL_MODULE_VALUE;
  }

  public String getViewModuleValue(){
    return VIEW_MODULE_VALUE;
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

}
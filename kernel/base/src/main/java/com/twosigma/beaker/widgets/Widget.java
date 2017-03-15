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

import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.CommNamesEnum;
import com.twosigma.beaker.jupyter.Utils;

import java.io.Serializable;
import java.util.HashMap;

public abstract class Widget implements CommFunctionality {

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

  private Comm comm;

  private Boolean disabled = false;
  private Boolean visible = true;
  private String description = "";
  private Integer msg_throttle = 3;

  public Widget() {
  }

  public void init() {
    if (comm == null) {
      comm = new Comm(Utils.uuid(), CommNamesEnum.JUPYTER_WIDGET);
      openComm(comm);
    }
  }

  private void openComm(final Comm comm) {
    comm.setData(createContent());
    addValueChangeMsgCallback(comm);
    comm.open();
  }

  public void close() {
    if (this.comm != null) {
      this.comm.close();
    }
  }

  private HashMap<String, Serializable> createContent() {
    HashMap<String, Serializable> result = new HashMap<>();
    result.put(MODEL_MODULE, MODEL_MODULE_VALUE);
    result.put(VIEW_MODULE, VIEW_MODULE_VALUE);

    result.put(DESCRIPTION, this.description);
    result.put(DISABLED, this.disabled);
    result.put(VISIBLE, this.visible);
    result.put(MSG_THROTTLE, this.msg_throttle);
    result = content(result);
    return result;
  }

  protected void addValueChangeMsgCallback(final Comm comm) {
  }

  protected abstract HashMap<String, Serializable> content(HashMap<String, Serializable> content);

  @Override
  public Comm getComm() {
    return this.comm;
  }

  protected void sendUpdate(String propertyName, Object value) {
    this.comm.sendUpdate(propertyName, value);
  }

  public Boolean getDisabled() {
    return disabled;
  }

  public void setDisabled(Boolean disabled) {
    this.disabled = disabled;
    sendUpdate(DISABLED, disabled);
  }

  public Boolean getVisible() {
    return visible;
  }

  public void setVisible(Boolean visible) {
    this.visible = visible;
    sendUpdate(VISIBLE, visible);
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    sendUpdate(DESCRIPTION, description);
    this.description = description;
  }

  public Integer getMsg_throttle() {
    return msg_throttle;
  }

  public void setMsg_throttle(Integer msg_throttle) {
    this.msg_throttle = msg_throttle;
    sendUpdate(MSG_THROTTLE, msg_throttle);
  }

}

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
package com.twosigma.beaker.widgets;

import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.CommNamesEnum;
import com.twosigma.beaker.jupyter.Utils;
import org.lappsgrid.jupyter.groovy.handler.IHandler;
import org.lappsgrid.jupyter.groovy.msg.Message;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

public class IntSlider implements Widget {

  private String _view_name = "IntSliderView";
  private String _model_name = "IntSliderModel";
  private String _model_module = "jupyter-js-widgets";
  private String _view_module = "jupyter-js-widgets";

  private Comm comm;
  private int value;
  private Layout layout;

  public IntSlider() throws NoSuchAlgorithmException {
    comm = new Comm(Utils.uuid(), CommNamesEnum.JUPYTER_WIDGET);
    layout = new Layout();
    openComm(comm);
  }

  @Override
  public Comm getComm() {
    return comm;
  }

  public int getValue() {
    return value;
  }

  public void setValue(int value) throws NoSuchAlgorithmException {
    this.value = value;
    sendValueUpdate(value);
  }

  private void openComm(final Comm comm) throws NoSuchAlgorithmException {
    comm.setData(content());
    addValueChangeMsgCallback(comm);
    comm.open();
  }

  private void addValueChangeMsgCallback(final Comm comm) {
    comm.addMsgCallbackList(new IHandler<Message>() {
      @Override
      public void handle(Message message) throws NoSuchAlgorithmException {
        Map data = (Map) message.getContent().get("data");
        Map sync_data = (Map) data.get("sync_data");
        int value = (int) sync_data.get("value");
        updateValue(value);
      }
    });
  }

  private void updateValue(int value) {
    this.value = value;
  }

  private HashMap<String, Serializable> content() {
    HashMap<String, Serializable> content = new HashMap<>();
    content.put("_model_module", _model_module);
    content.put("_model_name", _model_name);
    content.put("_view_module", _view_module);
    content.put("_view_name", _view_name);
    content.put("_range", false);
    content.put("background_color", null);
    content.put("continuous_update", true);
    content.put("description", "");
    content.put("disabled", false);
    content.put("font_family", "");
    content.put("font_size", "");
    content.put("font_style", "");
    content.put("font_weight", "");
    content.put("layout", "IPY_MODEL_"+layout.getComm().getCommId());
    content.put("max", 100);
    content.put("min", 0);
    content.put("msg_throttle", 3);
    content.put("orientation", "horizontal");
    content.put("readout", true);
    content.put("readout_format", "d");
    content.put("slider_color", null);
    content.put("step", 1);
    content.put("value", value);
    content.put("visible", true);
    return content;
  }

  private void sendValueUpdate(int value) throws NoSuchAlgorithmException {
    HashMap<String, Serializable> content = new HashMap<>();
    content.put("method", "update");
    HashMap<Object, Object> state = new HashMap<>();
    state.put("value", value);
    content.put("state", state);
    getComm().setData(content);
    getComm().send();
  }

}

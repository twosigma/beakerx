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

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

public class Layout implements Widget {

  private String _view_name = "LayoutView";
  private String _model_name = "LayoutModel";
  private String _model_module = "jupyter-js-widgets";
  private String _view_module = "jupyter-js-widgets";

  private Comm comm;

  public Layout() throws NoSuchAlgorithmException {
    comm = new Comm(Utils.uuid(), CommNamesEnum.JUPYTER_WIDGET);
    openComm(comm);
  }

  private void openComm(final Comm comm) throws NoSuchAlgorithmException {
    comm.setData(content());
    comm.open();
  }

  @Override
  public Comm getComm() {
    return this.comm;
  }

  private HashMap<String, Serializable> content() {
    HashMap<String, Serializable> content = new HashMap<>();
    content.put("_model_module", _model_module);
    content.put("_model_name", _model_name);
    content.put("_view_module", _view_module);
    content.put("_view_name", _view_name);
    content.put("align_content", "");
    content.put("align_items", "");
    content.put("align_self", "");
    content.put("border", "");
    content.put("bottom", "");
    content.put("display", "");
    content.put("flex", "");
    content.put("flex_flow", "");
    content.put("height", "");
    content.put("justify_content", "");
    content.put("left", "");
    content.put("margin", "");
    content.put("max_height", "");
    content.put("max_width", "");
    content.put("min_height", "");
    content.put("min_width", "");
    content.put("msg_throttle", 3);
    content.put("overflow", "");
    content.put("overflow_x", "");
    content.put("overflow_y", "");
    content.put("padding", "");
    content.put("right", "");
    content.put("top", "");
    content.put("visibility", "");
    content.put("width", "");

    return content;
  }

}

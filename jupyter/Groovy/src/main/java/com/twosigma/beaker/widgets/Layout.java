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

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

public class Layout extends Widget {

  public static final String IPY_MODEL = "IPY_MODEL_";
  public static final String LAYOUT = "layout";

  private String _view_name = "LayoutView";
  private String _model_name = "LayoutModel";

  public Layout() throws NoSuchAlgorithmException {
    super();
    init();
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    content.put("_model_name", _model_name);
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

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
package com.twosigma.beaker.widgets.internal;

import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.jupyter.comm.CommNamesEnum;
import com.twosigma.beaker.jupyter.Utils;

import java.io.Serializable;
import java.util.HashMap;


public class InternalWidgetUtils {

  public static final String MODEL_MODULE = "_model_module";
  public static final String MODEL_NAME = "_model_name";
  public static final String VIEW_MODULE = "_view_module";
  public static final String VIEW_NAME = "_view_name";

  public static final String MODEL_MODULE_VALUE = "beakerx";
  public static final String VIEW_MODULE_VALUE = "beakerx";

  public static Comm createComm(final InternalWidget widget, final InternalWidgetContent content) {
    Comm comm = new Comm(Utils.uuid(), CommNamesEnum.JUPYTER_WIDGET);
    comm.setData(createContent(widget, content));
    comm.open();
    return comm;
  }

  private static HashMap<String, Serializable> createContent(InternalWidget widget, InternalWidgetContent content) {
    HashMap<String, Serializable> result = new HashMap<>();
    result.put(MODEL_MODULE, MODEL_MODULE_VALUE);
    result.put(VIEW_MODULE, VIEW_MODULE_VALUE);
    result.put("json", SerializeToJson.toJson(widget));
    content.addContent(result);
    return result;
  }

}

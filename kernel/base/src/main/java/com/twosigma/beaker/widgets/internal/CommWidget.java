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

import java.io.Serializable;
import java.util.HashMap;

import com.twosigma.beaker.widgets.CommFunctionality;

public interface CommWidget extends CommFunctionality, DisplayableWidget {

  String METHOD = "method";
  String DISPLAY = "display";

  default void beforeDisplay() {
    //nothing to do in jupyter widgets.
    //should be removed in the future.
  }

  //TODO move to Widget class.
  @Override
  default void display() {
    beforeDisplay();
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(METHOD, DISPLAY);
    getComm().setData(content);
    getComm().send();
  }

  String getModelNameValue();

  String getViewNameValue();
}
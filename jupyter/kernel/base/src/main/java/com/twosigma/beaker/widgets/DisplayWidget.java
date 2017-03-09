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
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
public class DisplayWidget {

  public static final String METHOD = "method";
  public static final String DISPLAY = "display";

  public static void display(final CommFunctionality widget) {
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(METHOD, DISPLAY);
    widget.getComm().setData(content);
    try {
      widget.getComm().send();
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }
}

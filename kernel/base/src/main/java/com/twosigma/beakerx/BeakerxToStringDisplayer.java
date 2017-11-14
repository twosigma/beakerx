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
package com.twosigma.beakerx;

import jupyter.Displayer;
import jupyter.Displayers;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class BeakerxToStringDisplayer  extends Displayer<Object> {

  private static final BeakerxToStringDisplayer INSTANCE = new BeakerxToStringDisplayer();

  BeakerxToStringDisplayer() {
  }

  public static Displayer<Object> get() {
    return INSTANCE;
  }
  public Map<String, String> display(Object obj) {
    Map<String, String> result = new HashMap();
    if(obj.getClass().isArray()) {
      result.put("text/plain", this.displayArray(obj));
    } else {
      result.put("text/plain", obj.toString());
    }

    return result;
  }

  private String displayArray(Object obj) {
    Class<?> type = obj.getClass().getComponentType();
    if(type == Boolean.TYPE) {
      return Arrays.toString((boolean[])obj);
    } else if(type == Byte.TYPE) {
      return Arrays.toString((byte[])obj);
    } else if(type == Short.TYPE) {
      return Arrays.toString((short[])obj);
    } else if(type == Integer.TYPE) {
      return Arrays.toString((int[])obj);
    } else if(type == Long.TYPE) {
      return Arrays.toString((long[])obj);
    } else if(type == Float.TYPE) {
      return Arrays.toString((float[])obj);
    } else if(type == Double.TYPE) {
      return Arrays.toString((double[])obj);
    } else if(type == Character.TYPE) {
      return Arrays.toString((char[])obj);
    } else {
      Object[] arr = (Object[])obj;
      StringBuilder sb = new StringBuilder();
      sb.append("[").append(Displayers.display(arr[0]).get("text/plain"));

      for(int i = 1; i < arr.length; ++i) {
        String asText = Displayers.display(arr[i]).get("text/plain");
        sb.append(", ").append(asText);
      }

      sb.append("]");
      return sb.toString();
    }
  }

}

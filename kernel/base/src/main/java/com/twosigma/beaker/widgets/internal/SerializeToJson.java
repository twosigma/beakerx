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

import com.twosigma.beaker.SerializeToString;

import java.io.PrintWriter;
import java.io.StringWriter;

public class SerializeToJson extends SerializeToString {

  public static String toJson(Object result) {
    if (getMapper() != null && isBeakerChart(result)) {
      try {
        return getMapper().writeValueAsString(result);
      } catch (Exception e) {
        return exceptionToString(e);
      }
    }
    return result != null ? result.toString() : null;
  }

  public static boolean isBeakerChart(Object result){
    boolean ret = false;
    if(result != null){
      for (Class<?> clazz : getSerializerMap().keySet()) {
        ret = clazz.isAssignableFrom(result.getClass());
        if(ret){
          break;
        }
      }
    }
    return ret;
  }

  private static String exceptionToString(Exception e) {
    StringWriter w = new StringWriter();
    PrintWriter printWriter = new PrintWriter(w);
    e.printStackTrace(printWriter);
    printWriter.flush();
    return w.toString();
  }


}
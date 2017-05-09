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

import com.twosigma.beaker.widgets.internal.SerializeToJson;

import java.lang.reflect.Method;
import java.util.Arrays;

public class BeakerxWidget {

  public static final String MODEL_MODULE_VALUE = "beakerx";
  public static final String VIEW_MODULE_VALUE = "beakerx";
  private static final String MODEL = "model";

  public static void beforeDisplay(Widget widget) {
    if (widget.getComm() != null) {
      widget.getComm().sendUpdate(MODEL, SerializeToJson.toJson(widget));
    }
  }

  public static Object runClosure(Object closure, Object... params) throws Exception {
    Class<?> clazz = closure.getClass();
    Method getMaximumNumberOfParameters = clazz.getMethod("getMaximumNumberOfParameters");
    getMaximumNumberOfParameters.setAccessible(true);
    int numberOfParameters = (int) getMaximumNumberOfParameters.invoke(closure);
    Method call;
    Class<Object>[] paramTypes = new Class[numberOfParameters];
    Arrays.fill(paramTypes, Object.class);
    call = clazz.getMethod("call", paramTypes);
    call.setAccessible(true);
    return call.invoke(closure, Arrays.copyOfRange(params, 0, numberOfParameters));
  }

}

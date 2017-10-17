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
package com.twosigma.beakerx.evaluator;

import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.message.Message;

public class InternalVariable {

  private static SimpleEvaluationObject simpleEvaluationObject = null;

  public static Message getParentHeader() {
    SimpleEvaluationObject simpleEvaluationObject = getSimpleEvaluationObject();
    if (simpleEvaluationObject != null && simpleEvaluationObject.getJupyterMessage() != null) {
      return simpleEvaluationObject.getJupyterMessage();
    }
    return null;
  }

  public static SimpleEvaluationObject getSimpleEvaluationObject() {
    return simpleEvaluationObject;
  }

  public static void setValue(SimpleEvaluationObject value) {
    simpleEvaluationObject = value;
  }

}

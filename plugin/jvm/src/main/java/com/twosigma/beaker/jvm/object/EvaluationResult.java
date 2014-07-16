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
package com.twosigma.beaker.jvm.object;

import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class EvaluationResult {

  private final Object value;

  public EvaluationResult(Object value) {
    this.value = value;
  }

  public Object getValue() {
    return this.value;
  }

  public static class Serializer extends JsonSerializer<EvaluationResult> {

    @Override
    public void serialize(
        EvaluationResult evalResult,
        JsonGenerator jgen,
        SerializerProvider sp) throws IOException, JsonProcessingException {

      Object obj = evalResult.getValue();
      SerializeUtils.writeObject(obj, jgen);

    }
  }
}

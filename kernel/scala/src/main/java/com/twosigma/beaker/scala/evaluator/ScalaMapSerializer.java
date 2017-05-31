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
package com.twosigma.beaker.scala.evaluator;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.ObjectSerializer;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

class ScalaMapSerializer implements ObjectSerializer {
  private final BeakerObjectConverter parent;

  public ScalaMapSerializer(BeakerObjectConverter p) {
    parent = p;
  }

  @Override
  public boolean canBeUsed(Object obj, boolean expand) {
    return obj instanceof scala.collection.immutable.Map<?, ?>;
  }

  @Override
  public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
    ScalaEvaluator.logger.debug("generic map");
    // convert this 'on the fly' to a map of objects
    Map<?, ?> m = scala.collection.JavaConversions.mapAsJavaMap((scala.collection.Map<?, ?>) obj);


    Set<?> keys = m.keySet();
    for (Object key : keys) {
      if (key == null || !(key instanceof String)) {
        jgen.writeObject(obj.toString());
        return true;
      }
    }

    jgen.writeStartObject();
    for (Object key : keys) {
      Object val = m.get(key);
      jgen.writeFieldName(key.toString());
      if (!parent.writeObject(val, jgen, false))
        jgen.writeObject(val != null ? (val.toString()) : "null");
    }
    jgen.writeEndObject();
    return true;
  }
}

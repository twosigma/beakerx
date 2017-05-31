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
import scala.collection.Iterable;

import java.io.IOException;
import java.util.Collection;

class ScalaCollectionSerializer implements ObjectSerializer {
  private final BeakerObjectConverter parent;

  public ScalaCollectionSerializer(BeakerObjectConverter p) {
    parent = p;
  }

  @Override
  public boolean canBeUsed(Object obj, boolean expand) {
    return obj instanceof scala.collection.immutable.Seq<?>;
  }

  @Override
  public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
    ScalaEvaluator.logger.debug("collection");
    // convert this 'on the fly' to an array of objects
    Collection<?> c = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) obj);
    jgen.writeStartArray();
    for (Object o : c) {
      if (!parent.writeObject(o, jgen, false))
        jgen.writeObject(o.toString());
    }
    jgen.writeEndArray();
    return true;
  }
}

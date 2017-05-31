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

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.ObjectDeserializer;

import java.util.ArrayList;
import java.util.List;

public class ScalaCollectionDeserializer implements ObjectDeserializer {
  private final BeakerObjectConverter parent;

  public ScalaCollectionDeserializer(BeakerObjectConverter p) {
    parent = p;
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.isArray();
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    List<Object> o = new ArrayList<Object>();
    try {
      ScalaEvaluator.logger.debug("using custom array deserializer");
      for (int i = 0; i < n.size(); i++) {
        o.add(parent.deserialize(n.get(i), mapper));
      }
    } catch (Exception e) {
      ScalaEvaluator.logger.error("exception deserializing Collection {}", e.getMessage());
      o = null;
    }
    if (o != null)
      return scala.collection.JavaConversions.asScalaBuffer(o).toList();
    return null;
  }
}

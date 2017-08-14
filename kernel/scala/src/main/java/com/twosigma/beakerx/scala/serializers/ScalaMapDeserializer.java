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
package com.twosigma.beakerx.scala.serializers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.jvm.serialization.ObjectDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import scala.Predef;
import scala.Tuple2;
import scala.collection.JavaConverters;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class ScalaMapDeserializer implements ObjectDeserializer {

  private final static Logger logger = LoggerFactory.getLogger(ScalaMapDeserializer.class.getName());
  private final BeakerObjectConverter parent;

  public ScalaMapDeserializer(BeakerObjectConverter p) {
    parent = p;
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.isObject() && (!n.has("type") || !parent.isKnownBeakerType(n.get("type").asText()));
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    HashMap<String, Object> o = new HashMap<String, Object>();
    try {
      logger.debug("using custom map deserializer");
      Iterator<Map.Entry<String, JsonNode>> e = n.fields();
      while (e.hasNext()) {
        Map.Entry<String, JsonNode> ee = e.next();
        o.put(ee.getKey(), parent.deserialize(ee.getValue(), mapper));
      }
    } catch (Exception e) {
      logger.error("exception deserializing Map {}", e.getMessage());
      o = null;
    }
    if (o != null)
      return JavaConverters.mapAsScalaMapConverter(o).asScala().toMap(Predef.<Tuple2<String, Object>>conforms());
    return null;
  }

}

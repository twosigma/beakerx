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

package com.twosigma.beakerx.clojure.serializers;

import clojure.lang.PersistentArrayMap;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.jvm.serialization.ObjectDeserializer;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;


public class ClojureMapDeserializer implements ObjectDeserializer {
  private final BeakerObjectConverter parent;

  public ClojureMapDeserializer(BeakerObjectConverter p) {
    parent = p;
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.isObject() && (!n.has("type") || !parent.isKnownBeakerType(n.get("type").asText()));
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    HashMap<String, Object> map = new HashMap<String, Object>();
    Iterator<Map.Entry<String, JsonNode>> entries = n.fields();
    while (entries.hasNext()) {
      try {
        Map.Entry<String, JsonNode> ee = entries.next();
        map.put(ee.getKey(), parent.deserialize(ee.getValue(), mapper));
      } catch (Exception e) {
        LoggerFactory.getLogger(this.getClass().getName()).error(e.getMessage());
      }
    }
    return PersistentArrayMap.create(map);
  }
}

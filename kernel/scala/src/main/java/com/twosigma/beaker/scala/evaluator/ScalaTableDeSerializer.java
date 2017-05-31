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
import com.twosigma.beaker.table.TableDisplay;
import com.twosigma.beaker.table.serializer.TableDisplayDeSerializer;
import scala.Predef;
import scala.Tuple2;
import scala.collection.JavaConverters;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

class ScalaTableDeSerializer implements ObjectDeserializer {
  private final BeakerObjectConverter parent;

  public ScalaTableDeSerializer(BeakerObjectConverter p) {
    parent = p;
    parent.addKnownBeakerType("TableDisplay");
  }

  @SuppressWarnings("unchecked")
  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    org.apache.commons.lang3.tuple.Pair<String, Object> deserializeObject = TableDisplayDeSerializer.getDeserializeObject(parent, n, mapper);
    String subtype = deserializeObject.getLeft();
    if (subtype != null && subtype.equals(TableDisplay.DICTIONARY_SUBTYPE)) {
      return JavaConverters.mapAsScalaMapConverter((Map<String, Object>) deserializeObject.getRight()).asScala().toMap(Predef.<Tuple2<String, Object>>conforms());
    } else if (subtype != null && subtype.equals(TableDisplay.LIST_OF_MAPS_SUBTYPE)) {
      List<Map<String, Object>> rows = (List<Map<String, Object>>) deserializeObject.getRight();
      List<Object> oo = new ArrayList<Object>();
      for (Map<String, Object> row : rows) {
        oo.add(JavaConverters.mapAsScalaMapConverter(row).asScala().toMap(Predef.<Tuple2<String, Object>>conforms()));
      }
      return scala.collection.JavaConversions.collectionAsScalaIterable(oo);
    } else if (subtype != null && subtype.equals(TableDisplay.MATRIX_SUBTYPE)) {
      List<List<?>> matrix = (List<List<?>>) deserializeObject.getRight();
      ArrayList<Object> ll = new ArrayList<Object>();
      for (List<?> ob : matrix) {
        ll.add(scala.collection.JavaConversions.asScalaBuffer(ob).toList());
      }
      return scala.collection.JavaConversions.asScalaBuffer(ll).toList();
    }

    return deserializeObject.getRight();
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("TableDisplay");
  }
}

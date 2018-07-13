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
import clojure.lang.PersistentVector;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.jvm.serialization.ObjectDeserializer;
import com.twosigma.beakerx.table.TableDisplay;
import com.twosigma.beakerx.table.serializer.TableDisplayDeSerializer;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ClojureTableDeserializer implements ObjectDeserializer {
  private final BeakerObjectConverter parent;

  public ClojureTableDeserializer(BeakerObjectConverter p) {
    parent = p;
    parent.addKnownBeakerType("TableDisplay");
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("TableDisplay");
  }

  @Override
  @SuppressWarnings("unchecked")
  public Object deserialize(JsonNode n, ObjectMapper mapper) {

    org.apache.commons.lang3.tuple.Pair<String, Object> deserializeObject = TableDisplayDeSerializer.getDeserializeObject(parent, n, mapper);
    String subtype = deserializeObject.getLeft();
    if (subtype != null && subtype.equals(TableDisplay.DICTIONARY_SUBTYPE)) {
      return PersistentArrayMap.create((Map) deserializeObject.getRight());
    } else if (subtype != null && subtype.equals(TableDisplay.LIST_OF_MAPS_SUBTYPE)) {
      List<Map<String, Object>> rows = (List<Map<String, Object>>) deserializeObject.getRight();
      List<Object> oo = new ArrayList<Object>();
      for (Map<String, Object> row : rows) {
        oo.add(PersistentArrayMap.create(row));
      }
      return PersistentVector.create(oo);
    } else if (subtype != null && subtype.equals(TableDisplay.MATRIX_SUBTYPE)) {
      List<List<?>> matrix = (List<List<?>>) deserializeObject.getRight();
      return PersistentVector.create(matrix);
    }
    return deserializeObject.getRight();
  }
}

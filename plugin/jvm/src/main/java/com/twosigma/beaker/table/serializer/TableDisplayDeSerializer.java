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
package com.twosigma.beaker.table.serializer;

import com.twosigma.beaker.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.ObjectDeserializer;
import com.twosigma.beaker.table.TableDisplay;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TableDisplayDeSerializer implements ObjectDeserializer {
  private final static Logger logger = LoggerFactory.getLogger(TableDisplayDeSerializer.class.getName());
  private final BeakerObjectConverter parent;

  public TableDisplayDeSerializer(BeakerObjectConverter p) {
    parent = p;
    parent.addKnownBeakerType("TableDisplay");
  }

  public static List<Map<String, Object>> getValuesAsRows(BeakerObjectConverter parent, JsonNode n, ObjectMapper mapper) throws IOException {
    List<List<?>> values = TableDisplayDeSerializer.getValues(parent, n, mapper);
    List<String> columns = TableDisplayDeSerializer.getColumns(n, mapper);
    return TableDisplay.getValuesAsRows(values, columns);
  }

  public static List<List<?>> getValuesAsMatrix(BeakerObjectConverter parent, JsonNode n, ObjectMapper mapper) throws IOException {
    List<List<?>> values = TableDisplayDeSerializer.getValues(parent, n, mapper);
    return TableDisplay.getValuesAsMatrix(values);
  }

  public static Map<String, Object> getValuesAsDictionary(BeakerObjectConverter parent, JsonNode n, ObjectMapper mapper) throws IOException {
    List<List<?>> values = TableDisplayDeSerializer.getValues(parent, n, mapper);
    return TableDisplay.getValuesAsDictionary(values);
  }

  @SuppressWarnings("unchecked")
  public static List<List<?>> getValues(BeakerObjectConverter parent, JsonNode n, ObjectMapper mapper) throws IOException {
    List<List<?>> values = null;
    List<String> classes = null;
    if (n.has("types"))
      classes = mapper.readValue(n.get("types"), List.class);
    if (n.has("values")) {
      JsonNode nn = n.get("values");
      values = new ArrayList<List<?>>();
      if (nn.isArray()) {
        for (JsonNode nno : nn) {
          if (nno.isArray()) {
            ArrayList<Object> val = new ArrayList<Object>();
            for (int i = 0; i < nno.size(); i++) {
              JsonNode nnoo = nno.get(i);
              Object obj = parent.deserialize(nnoo, mapper);
              val.add(TableDisplayDeSerializer.getValueForDeserializer(obj, classes != null && classes.size() > i ? classes.get(i) : null));
            }
            values.add(val);
          }
        }
      }
    }
    return values;
  }

  @SuppressWarnings("unchecked")
  public static List<String> getColumns(JsonNode n, ObjectMapper mapper) throws IOException {
    List<String> columns = null;
    if (n.has("columnNames"))
      columns = mapper.readValue(n.get("columnNames"), List.class);
    return columns;
  }

  @SuppressWarnings("unchecked")
  public static List<String> getClasses(JsonNode n, ObjectMapper mapper) throws IOException {
    List<String> classes = null;
    if (n.has("types"))
      classes = mapper.readValue(n.get("types"), List.class);
    return classes;
  }

  public static Object getValueForDeserializer(Object value, String clazz) {
    if (clazz != null) {
      if (BasicObjectSerializer.TYPE_LONG.equals(clazz)) {
        value = Long.parseLong(value.toString());
      } else if (BasicObjectSerializer.TYPE_BIGINT.equals(clazz)) {
        value = new BigInteger(value.toString());
      }
    }
    return value;
  }

  public static Pair<String, Object> getDeserializeObject(BeakerObjectConverter parent, JsonNode n, ObjectMapper mapper) {
    Object o = null;
    String subtype = null;
    try {
      List<List<?>> values = TableDisplayDeSerializer.getValues(parent, n, mapper);
      List<String> columns = TableDisplayDeSerializer.getColumns(n, mapper);
      List<String> classes = TableDisplayDeSerializer.getClasses(n, mapper);

      if (n.has("subtype"))
        subtype = mapper.readValue(n.get("subtype"), String.class);

      if (subtype != null && subtype.equals(TableDisplay.DICTIONARY_SUBTYPE)) {
        o = getValuesAsDictionary(parent, n, mapper);
      } else if (subtype != null && subtype.equals(TableDisplay.LIST_OF_MAPS_SUBTYPE) && columns != null && values != null) {
        o = getValuesAsRows(parent, n, mapper);
      } else if (subtype != null && subtype.equals(TableDisplay.MATRIX_SUBTYPE)) {
        o = getValuesAsMatrix(parent, n, mapper);
      }
      if (o == null) {
        if (n.has("hasIndex") && mapper.readValue(n.get("hasIndex"), String.class).equals("true")
          && columns != null && values != null) {
          columns.remove(0);
          classes.remove(0);
          for (List<?> v : values) {
            v.remove(0);
          }
          o = new TableDisplay(values, columns, classes);
        } else {
          o = new TableDisplay(values, columns, classes);
        }
      }
    } catch (Exception e) {
      logger.error("exception deserializing TableDisplay ", e);
    }
    return new ImmutablePair<String, Object>(subtype, o);
  }

  @SuppressWarnings("unchecked")
  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    return getDeserializeObject(parent, n, mapper).getRight();
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("TableDisplay");
  }
}

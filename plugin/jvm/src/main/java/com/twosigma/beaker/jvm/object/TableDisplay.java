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
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Set;

import com.twosigma.beaker.jvm.serialization.BasicObjectSerializer;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializerProvider;

import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.ObjectDeserializer;

public class TableDisplay {
  private final static Logger logger = Logger.getLogger(TableDisplay.class.getName());
  private final List<List<?>> values;
  private final List<String> columns;
  private final List<String> classes;
  private final String subtype;

  public static final String TABLE_DISPLAY_SUBTYPE = "TableDisplay";
  public static final String LIST_OF_MAPS_SUBTYPE = "ListOfMaps";
  public static final String MATRIX_SUBTYPE = "Matrix";
  public static final String DICTIONARY_SUBTYPE = "Dictionary";
  
  public TableDisplay(List<List<?>> v, List<String> co, List<String> cl) {
    values = v;
    columns = co;
    classes = cl;
    subtype = TABLE_DISPLAY_SUBTYPE;
  }

  public TableDisplay(Collection<Map<?,?>> v, BeakerObjectConverter serializer) {
    values = new ArrayList<List<?>>();
    columns = new ArrayList<String>();
    classes = new ArrayList<String>();
    subtype = LIST_OF_MAPS_SUBTYPE;

    // create columns
    for(Map<?,?> m : v) {
      Set<?> w = m.entrySet();
      for (Object s : w) {
        Entry<?,?> e = (Entry<?, ?>) s;
        String c = e.getKey().toString();
        if (!columns.contains(c)) {
          columns.add(c);
          String n = e.getValue()!=null ? e.getValue().getClass().getName() : "string";
          classes.add(serializer.convertType(n));
        }
      }
    }

    // now build values
    for(Map<?,?> m : v) {
      List<Object> vals = new ArrayList<Object>();
      for (String cn : columns) {
        if (m.containsKey(cn)){
          vals.add(getValueForSerializer( m.get(cn), serializer));
        }
        else
          vals.add(null);
      }
      values.add(vals);
    }
  }

  private Object getValueForSerializer(Object value, BeakerObjectConverter serializer){
    if (value != null) {
      String clazz = serializer.convertType(value.getClass().getName());
      if (BasicObjectSerializer.TYPE_LONG.equals(clazz) ||
          BasicObjectSerializer.TYPE_BIGINT.equals(clazz)){
        return value.toString();
      }
      return value;
    }
    return null;
  }



  
  
  public List<List<?>> getValues() { return values; }
  public List<String> getColumnNames() { return columns; }
  public List<String> getTypes() { return classes; }
  
  public static class Serializer extends JsonSerializer<TableDisplay> {

    @Override
    public void serialize(TableDisplay value,
        JsonGenerator jgen,
        SerializerProvider provider)
        throws IOException, JsonProcessingException {

      synchronized (value) {
        jgen.writeStartObject();
        jgen.writeObjectField("type", "TableDisplay");
        jgen.writeObjectField("columnNames", value.columns);
        jgen.writeObjectField("values", value.values);
        jgen.writeObjectField("types", value.classes);
        jgen.writeObjectField("subtype", value.subtype);
        jgen.writeEndObject();
      }
    }
  }
  
  public static class DeSerializer implements ObjectDeserializer {

    private final BeakerObjectConverter parent;
    
    public DeSerializer(BeakerObjectConverter p) {
      parent = p;
      parent.addKnownBeakerType("TableDisplay");
    }

    @SuppressWarnings("unchecked")
    public static List<Map<String, Object>> getValuesAsRows(BeakerObjectConverter parent, JsonNode n, ObjectMapper mapper) throws IOException {
      List<Map<String, Object>> rows = new ArrayList<Map<String, Object>>();
      String subtype = null;

      List<List<?>> values = TableDisplay.DeSerializer.getValues(parent, n, mapper);
      List<String> columns = TableDisplay.DeSerializer.getColumns(n, mapper);

      if (n.has("subtype"))
        subtype = mapper.readValue(n.get("subtype"), String.class);

      if (subtype != null && subtype.equals(TableDisplay.LIST_OF_MAPS_SUBTYPE) && columns != null && values != null) {

        for (List<?> value : values) {
          Map<String, Object> m = new HashMap<String, Object>();
          for (int c = 0; c < columns.size(); c++) {
            if (value.size() > c)
              m.put(columns.get(c), value.get(c));
          }
          rows.add(m);
        }
      }
      else {
        throw new IllegalArgumentException("Method 'getValuesAsRows' doesn't supported for this table");
      }
      return rows;
    }

    @SuppressWarnings("unchecked")
    public static List<List<?>> getValuesAsMatrix(BeakerObjectConverter parent, JsonNode n, ObjectMapper mapper) throws IOException {
      String subtype = null;
      List<List<?>> values = TableDisplay.DeSerializer.getValues(parent, n, mapper);
      if (n.has("subtype"))
        subtype = mapper.readValue(n.get("subtype"), String.class);

      if (subtype != null && subtype.equals(TableDisplay.MATRIX_SUBTYPE)) {
        return values;
      }
      throw new IllegalArgumentException("Method 'getValuesAsMatrix' doesn't supported for this table");
    }

    @SuppressWarnings("unchecked")
    public static Map<String, Object> getValuesAsDictionary(BeakerObjectConverter parent, JsonNode n, ObjectMapper mapper) throws IOException {
      Map<String, Object> m = new HashMap<String, Object>();
      String subtype = null;

      List<List<?>> values = TableDisplay.DeSerializer.getValues(parent, n, mapper);

      if (n.has("subtype"))
        subtype = mapper.readValue(n.get("subtype"), String.class);

      if (subtype != null && subtype.equals(TableDisplay.DICTIONARY_SUBTYPE)) {
        for (List<?> l : values) {
          if (l.size() != 2)
            continue;
          m.put(l.get(0).toString(), l.get(1));
        }
      } else {
        throw new IllegalArgumentException("Method 'getValuesAsDictionary' doesn't supported for this table");
      }
      return m;
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
                val.add(DeSerializer.getValueForDeserializer(obj, classes != null && classes.size() > i ? classes.get(i) : null));
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
        }else if (BasicObjectSerializer.TYPE_BIGINT.equals(clazz)) {
          value = new BigInteger(value.toString());
        }
      }
      return value;
    }

    public static Pair<String, Object> getDeserializeObject(BeakerObjectConverter parent, JsonNode n, ObjectMapper mapper) {
      Object o = null;
      String subtype = null;
      try {
        List<List<?>> values = DeSerializer.getValues(parent, n, mapper);
        List<String> columns = DeSerializer.getColumns(n, mapper);
        List<String> classes = DeSerializer.getClasses(n, mapper);

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
        logger.log(Level.SEVERE, "exception deserializing TableDisplay ", e);
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
}

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

    private Object getValueForDeserializer(Object value, String clazz) {
      if (clazz != null) {
        if (BasicObjectSerializer.TYPE_LONG.equals(clazz)) {
          value = Long.parseLong(value.toString());
        }else if (BasicObjectSerializer.TYPE_BIGINT.equals(clazz)) {
          value = new BigInteger(value.toString());
        }
      }
      return value;
    }

    @SuppressWarnings("unchecked")
    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
      Object o = null;
      try {
        List<List<?>> vals = null;
        List<String> cols = null;
        List<String> clas = null;
        String subtype = null;
        
        if (n.has("columnNames"))
          cols = mapper.readValue(n.get("columnNames"), List.class);
        if (n.has("types"))
          clas = mapper.readValue(n.get("types"), List.class);
        if (n.has("values")) {
          JsonNode nn = n.get("values");
          vals = new ArrayList<List<?>>();
          if (nn.isArray()) {
            for (JsonNode nno : nn) {
              if (nno.isArray()) {
                ArrayList<Object> val = new ArrayList<Object>();
                for (int i = 0; i < nno.size(); i++) {
                  JsonNode nnoo = nno.get(i);
                  Object obj = parent.deserialize(nnoo, mapper);
                  val.add(getValueForDeserializer(obj, clas != null && clas.size() > i ? clas.get(i) : null));
                }
                vals.add(val);
              }
            }
          }
        }
        if (n.has("subtype"))
          subtype = mapper.readValue(n.get("subtype"), String.class);
        /*
         * unfortunately the other 'side' of this is in the BeakerObjectSerializer
         */
        if (subtype!=null && subtype.equals(TableDisplay.DICTIONARY_SUBTYPE)) {
          Map<String,Object> m = new HashMap<String,Object>();
          for(List<?> l : vals) {
            if (l.size()!=2)
              continue;
            m.put(l.get(0).toString(), l.get(1));
          }
          o = m;
        } else if(subtype!=null && subtype.equals(TableDisplay.LIST_OF_MAPS_SUBTYPE) && cols!=null && vals!=null) {
          List<Map<String,Object>>  oo = new ArrayList<>();
          for(int r=0; r<vals.size(); r++) {
            Map<String,Object> m = new HashMap<>();
            List<?> row = vals.get(r);
            for(int c=0; c<cols.size(); c++) {
              if(row.size()>c)
                m.put(cols.get(c), row.get(c));
            }
            oo.add(m);
          }
          o = oo;
        } else if(subtype!=null && subtype.equals(TableDisplay.MATRIX_SUBTYPE)) {
          o = vals;
        }
        if (o==null) {
          if (n.has("hasIndex") && mapper.readValue(n.get("hasIndex"), String.class).equals("true")) {
            cols.remove(0);
            clas.remove(0);
            for(List<?> v : vals) {
              v.remove(0);
            }
            o = new TableDisplay(vals, cols, clas);
          } else {
            o = new TableDisplay(vals, cols, clas);
          }
        }
      } catch (Exception e) {
        logger.log(Level.SEVERE, "exception deserializing TableDisplay ", e);
      }
      return o;
    }

    @Override
    public boolean canBeUsed(JsonNode n) {
      return n.has("type") && n.get("type").asText().equals("TableDisplay");
    }
  }     
}

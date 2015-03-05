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

import com.twosigma.beaker.BeakerCodeCell;
import com.twosigma.beaker.BeakerProgressUpdate;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.swing.ImageIcon;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;

public class BasicObjectSerializer implements BeakerObjectConverter {

  public static final String TYPE_INTEGER = "integer";
  public static final String TYPE_DOUBLE  = "double";
  public static final String TYPE_STRING  = "string";
  public static final String TYPE_BOOLEAN = "boolean";
  public static final String TYPE_SELECT  = "select";
  
  protected Map<String,String> types;
  private final static Logger logger = Logger.getLogger(BasicObjectSerializer.class.getName());
  protected static List<ObjectDeserializer> supportedTypes;

  protected boolean isListOfMaps(Object o) {
    if (! (o instanceof Collection<?>))
      return false;
    Collection<?> c = (Collection<?>) o;
    if (c.isEmpty())
      return false;
    for (Object obj : c) {
      if (!(obj instanceof Map<?,?>)) {        
        return false;
      }
    }
    return true;
  }
  
  protected boolean isPrimitiveTypeMap(Object o) {
    if (!(o instanceof Map<?,?>))
      return false;
    Map<?,?> m = (Map<?,?>) o;
    
    Set<?> eset = m.entrySet();
    for (Object entry : eset) {
      Entry<?,?> e = (Entry<?, ?>) entry;
      if (e.getKey()!=null && !isPrimitiveType(e.getKey().getClass().getName()))
          return false;
      if (e.getValue()!=null && !isPrimitiveType(e.getValue().getClass().getName()))
        return false;
    }
    return true;
  }
  
  public BasicObjectSerializer() {
    types = new HashMap<String,String>();
    addTypeConversion("java.lang.Boolean", TYPE_BOOLEAN);
    addTypeConversion("java.lang.Byte", TYPE_INTEGER);
    addTypeConversion("java.lang.Character", TYPE_STRING);
    addTypeConversion("java.lang.Double", TYPE_DOUBLE);
    addTypeConversion("java.lang.Enum", TYPE_SELECT);
    addTypeConversion("java.lang.Float", TYPE_DOUBLE);
    addTypeConversion("java.lang.Integer", TYPE_INTEGER); 
    addTypeConversion("java.lang.Long", TYPE_INTEGER);    
    addTypeConversion("java.lang.Short", TYPE_INTEGER);
    addTypeConversion("java.lang.String", TYPE_STRING);
    addTypeConversion("java.lang.StringBuffer", TYPE_STRING);
    addTypeConversion("java.lang.StringBuilder", TYPE_STRING);
    addTypeConversion("java.util.concurrent.atomic.AtomicInteger", TYPE_INTEGER);
    addTypeConversion("java.util.concurrent.atomic.AtomicLong", TYPE_INTEGER);
    addTypeConversion("java.math.BigDecimal", TYPE_INTEGER);
    addTypeConversion("java.math.BigInteger", TYPE_INTEGER);
    
    supportedTypes = new ArrayList<ObjectDeserializer>();
  }
  
  @Override
  public void addTypeConversion(String from, String to) {
    types.put(from,to);
  }

  @Override
  public String convertType(String tn) {
    if (types.containsKey(tn))
      return types.get(tn);
    return "";
  }
  
  @Override
  public boolean isPrimitiveType(String tn) {
    return types.containsKey(tn);
  }

  @Override
  public boolean writeObject(Object obj, JsonGenerator jgen)
      throws IOException, JsonProcessingException  {

    try {
      if (obj == null) {
        jgen.writeObject("null");
      } else if ( (obj instanceof TableDisplay)  ||
                  (obj instanceof EvaluationResult)||
                  (obj instanceof OutputContainer) ||   
                  (obj instanceof BeakerProgressUpdate) ||
                  (obj instanceof UpdatableEvaluationResult) ||
                  (obj instanceof BeakerCodeCell) ||
                  (obj instanceof ImageIcon) ||
                  (obj instanceof BufferedImage) ||
                  (obj instanceof OutputContainer)  ||
                  (obj instanceof BeakerProgressUpdate) ) {
        logger.fine("basic object");
        jgen.writeObject(obj);
      } else if (isPrimitiveType(obj.getClass().getName())) {
        jgen.writeObject(obj);
      } else if (isListOfMaps(obj)) {
        logger.fine("list of maps");
        // convert this 'on the fly' to a datatable
        @SuppressWarnings("unchecked")
        Collection<Map<?, ?>> co = (Collection<Map<?, ?>>) obj;
        TableDisplay t = new TableDisplay(co,this);
        jgen.writeObject(t);
      } else if (obj instanceof Collection<?>) {
        logger.fine("collection");
        // convert this 'on the fly' to an array of objects
        Collection<?> c = (Collection<?>) obj;
        jgen.writeStartArray();
        for(Object o : c) {
          if (!writeObject(o, jgen))
            jgen.writeObject("ERROR: unsupported object "+o.toString());
        }
        jgen.writeEndArray();
      } else if(isPrimitiveTypeMap(obj)) {
        logger.fine("primitive type map");
        
        Map<?,?> m = (Map<?,?>) obj;
        
        List<String> columns = new ArrayList<String>();
        columns.add("Key");
        columns.add("Value");

        List<String> classes = new ArrayList<String>();
        List<List<?>> values = new ArrayList<List<?>>();

        Set<?> eset = m.entrySet();
        for (Object entry : eset) {
          Entry<?,?> e = (Entry<?, ?>) entry;
          if(classes.isEmpty()) {
            classes.add(convertType(e.getKey().getClass().getName()));
            classes.add(convertType(e.getValue().getClass().getName()));
          }
          List<String> l = new ArrayList<String>();
          l.add(e.getKey().toString());
          l.add(e.getValue().toString());
          values.add(l);
        }
        jgen.writeStartObject();
        jgen.writeObjectField("type", "TableDisplay");
        jgen.writeObjectField("columnNames", columns);
        jgen.writeObjectField("values", values);
        jgen.writeObjectField("types", classes);
        jgen.writeEndObject();
      } else if (obj instanceof Map<?,?>) {
        logger.fine("generic map");
        // convert this 'on the fly' to a map of objects
        Map<?,?> m = (Map<?,?>) obj;

        Set<?> kset = m.keySet();
        if (kset.size()==0 || !(kset.iterator().next() instanceof String))
          jgen.writeObject(obj.toString());
        else {
          jgen.writeStartObject();
          for (Object k : kset) {
            jgen.writeFieldName(k.toString());
            if (!writeObject(m.get(k), jgen))
              jgen.writeObject(m.get(k)!=null ? ("ERROR: unsupported object "+m.get(k).toString()) : "null");
          }
          jgen.writeEndObject();
        }
      } else {
        return false;
      }
    } catch (Exception e) {
      logger.log(Level.SEVERE,"exception in serialization",e);
      return false;
    }
    return true;
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    Object obj = null;
    if (n!=null) {
      for (ObjectDeserializer d : supportedTypes) {
        try {
          if (d.canBeUsed(n)) {
            obj = d.deserialize(n, mapper);
            if (obj != null) {
              logger.finest("used custom deserialization");
              break;
            }
          }
        } catch (Exception e) {
          logger.log(Level.SEVERE,"exception in deserialization",e);
          obj = null;
        }
      }
    }
    if (obj==null) {
      logger.finest("using standard deserialization");
      try {
        obj = mapper.readValue(n, Object.class);
      } catch (Exception e) {
        logger.log(Level.SEVERE,"exception in auto deserialization",e);
        obj = null;
      }
    }
    return obj;
  }

  @Override
  public void addTypeDeserializer(ObjectDeserializer o) {
    supportedTypes.add(o);
  }

}

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
package com.twosigma.beaker.jvm.serialization;

import com.twosigma.beaker.BeakerCodeCell;
import com.twosigma.beaker.BeakerProgressUpdate;
import com.twosigma.beaker.jvm.object.OutputCell;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.easyform.EasyForm;
import com.twosigma.beaker.jvm.object.BeakerDashboard;
import com.twosigma.beaker.jvm.object.CyclingOutputContainerLayoutManager;
import com.twosigma.beaker.jvm.object.EvaluationResult;
import com.twosigma.beaker.jvm.object.GridOutputContainerLayoutManager;
import com.twosigma.beaker.jvm.object.OutputContainer;
import com.twosigma.beaker.jvm.object.OutputContainerCell;
import com.twosigma.beaker.jvm.object.TabbedOutputContainerLayoutManager;
import com.twosigma.beaker.table.TableDisplay;
import com.twosigma.beaker.jvm.object.UpdatableEvaluationResult;
import com.twosigma.beaker.jvm.object.DashboardLayoutManager;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class BasicObjectSerializer implements BeakerObjectConverter {

  public static final String TYPE_INTEGER = "integer";
  public static final String TYPE_LONG    = "int64";
  public static final String TYPE_BIGINT  = "bigint";
  public static final String TYPE_DOUBLE  = "double";
  public static final String TYPE_STRING  = "string";
  public static final String TYPE_BOOLEAN = "boolean";
  public static final String TYPE_TIME    = "time";
  public static final String TYPE_SELECT  = "select";

  private final static Logger logger = LoggerFactory.getLogger(BasicObjectSerializer.class.getName());

  protected final Map<String, String>      types;
  protected final List<String>             knownBeakerTypes;
  protected final List<ObjectDeserializer> supportedDeserializers;
  protected final List<ObjectSerializer>   supportedSerializers;

  protected final ThreadLocal<Map<String, String>>      threadTypes;
  protected final ThreadLocal<List<ObjectDeserializer>> threadDeserializers;
  protected final ThreadLocal<List<ObjectSerializer>>   threadSerializers;

  protected boolean isListOfPrimitiveTypeMaps(Object o) {
    if (!(o instanceof Collection<?>))
      return false;
    Collection<?> c = (Collection<?>) o;
    if (c.isEmpty())
      return false;
    for (Object obj : c) {
      if (obj != null && !isPrimitiveTypeMap(obj)) {
        return false;
      }
    }
    return true;
  }

  protected boolean isPrimitiveTypeMap(Object o) {
    if (!(o instanceof Map<?, ?>))
      return false;
    Map<?, ?> m = (Map<?, ?>) o;

    Set<?> eset = m.entrySet();
    for (Object entry : eset) {
      Entry<?, ?> e = (Entry<?, ?>) entry;
      if (e.getValue() != null && !isPrimitiveType(e.getValue().getClass().getName()))
        return false;
    }
    return true;
  }



  protected boolean isPrimitiveTypeListOfList(Object o) {
    if (!(o instanceof Collection<?>))
      return false;
    Collection<?> m = (Collection<?>) o;
    int max = 0;

    for (Object entry : m) {
      if (!(entry instanceof Collection<?>))
        return false;
      Collection<?> e = (Collection<?>) entry;
      for (Object ei : e) {
        if (ei != null && !isPrimitiveType(ei.getClass().getName()))
          return false;
      }
      if (max < e.size())
        max = e.size();
    }
    return max >= 2 && m.size() >= 2;
  }

  public BasicObjectSerializer() {
    types = new HashMap<String, String>();
    threadDeserializers = new ThreadLocal<List<ObjectDeserializer>>();
    threadSerializers = new ThreadLocal<List<ObjectSerializer>>();
    supportedDeserializers = new ArrayList<ObjectDeserializer>();
    supportedSerializers = new ArrayList<ObjectSerializer>();
    threadTypes = new ThreadLocal<Map<String, String>>();
    knownBeakerTypes = new ArrayList<String>();

    addTypeConversion("java.lang.Boolean", TYPE_BOOLEAN);
    addTypeConversion("java.lang.Byte", TYPE_INTEGER);
    addTypeConversion("java.lang.Character", TYPE_STRING);
    addTypeConversion("java.lang.Double", TYPE_DOUBLE);
    addTypeConversion("java.lang.Enum", TYPE_SELECT);
    addTypeConversion("java.lang.Float", TYPE_DOUBLE);
    addTypeConversion("java.lang.Integer", TYPE_INTEGER); 
    addTypeConversion("java.lang.Long", TYPE_LONG);
    addTypeConversion("java.lang.Short", TYPE_INTEGER);
    addTypeConversion("java.lang.String", TYPE_STRING);
    addTypeConversion("java.lang.StringBuffer", TYPE_STRING);
    addTypeConversion("java.lang.StringBuilder", TYPE_STRING);
    addTypeConversion("java.util.Date", TYPE_TIME); 
    addTypeConversion("java.util.concurrent.atomic.AtomicInteger", TYPE_INTEGER);
    addTypeConversion("java.util.concurrent.atomic.AtomicLong", TYPE_INTEGER);
    addTypeConversion("java.math.BigDecimal", TYPE_DOUBLE);
    addTypeConversion("java.math.BigInteger", TYPE_BIGINT);
    addTypeConversion("org.codehaus.groovy.runtime.GStringImpl", TYPE_STRING);

    addTypeSerializer(new PrimitiveTypeSerializer());
    addTypeSerializer(new ListOfPrimitiveTypeMapsSerializer(this));
    addTypeSerializer(new PrimitiveTypeListOfListSerializer());
    addTypeSerializer(new PrimitiveTypeMapSerializer());
    addTypeSerializer(new ArraySerializer(this));
    addTypeSerializer(new CollectionSerializer(this));
    addTypeSerializer(new MapSerializer(this));
  }
  
  @Override
  public String convertType(String tn) {
    if (threadTypes.get()!=null && threadTypes.get().containsKey(tn))
      return threadTypes.get().get(tn);
    if (types.containsKey(tn))
      return types.get(tn);
    return "";
  }
  
  @Override
  public boolean isPrimitiveType(String tn) {
    return types.containsKey(tn) || (threadTypes.get()!=null && threadTypes.get().containsKey(tn));
  }

  @Override
  public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand)
      throws IOException  {

      if (obj == null) {
        jgen.writeNull();
      } else if ((obj instanceof TableDisplay) ||
        (obj instanceof EvaluationResult) ||
        (obj instanceof UpdatableEvaluationResult) ||
        (obj instanceof BeakerCodeCell) ||
        (obj instanceof OutputCell.State) ||
        (obj instanceof ImageIcon) ||
        (obj instanceof Date) ||
        (obj instanceof BeakerDashboard) ||
        (obj instanceof BufferedImage) ||
        (obj instanceof TabbedOutputContainerLayoutManager) ||
        (obj instanceof GridOutputContainerLayoutManager) ||
        (obj instanceof CyclingOutputContainerLayoutManager) ||
        (obj instanceof DashboardLayoutManager) ||
        (obj instanceof OutputContainerCell) ||
        (obj instanceof OutputContainer) ||
        (obj instanceof BeakerProgressUpdate) ||
        (obj instanceof EasyForm) ||
        (obj instanceof Color)) {
        logger.debug("basic object");
        jgen.writeObject(obj);
      } else
        return runThreadSerializers(obj, jgen, expand) || runConfiguredSerializers(obj,
                                                                                   jgen,
                                                                                  expand);
    return true;
  }

  public boolean runThreadSerializers(Object obj, JsonGenerator jgen, boolean expand) throws IOException, JsonProcessingException {
    if (threadSerializers.get() == null)
      return false;
    for (ObjectSerializer s : threadSerializers.get()) {
      try {
        if (s.canBeUsed(obj, expand) && s.writeObject(obj, jgen, expand)) {
          logger.debug("used thread serialization");
          return true;
        }
      } catch (Exception e) {
        logger.error("exception in thread serialization", e);
      }
    }
    return false;
  }
  
  public boolean runConfiguredSerializers(Object obj, JsonGenerator jgen, boolean expand) throws IOException, JsonProcessingException {
    for (ObjectSerializer s : supportedSerializers) {
        if (s.canBeUsed(obj, expand) && s.writeObject(obj, jgen, expand))
          return true;
    }
    return false;
  }
  
  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    if (n==null)
      return null;
    
    Object obj = null;
    
    if(threadDeserializers.get()!=null) {
      for (ObjectDeserializer d : threadDeserializers.get()) {
        try {
          if (d.canBeUsed(n)) {
            obj = d.deserialize(n, mapper);
            if (obj != null) {
              logger.debug("used thread deserialization");
              break;
            }
          }
        } catch (Exception e) {
          logger.error("exception in thread deserialization",e);
          obj = null;
        }
      }
    }
    if (obj!=null)
      return obj;
    for (ObjectDeserializer d : supportedDeserializers) {
      try {
        if (d.canBeUsed(n)) {
          obj = d.deserialize(n, mapper);
          if (obj != null) {
            logger.debug("used custom deserialization");
            break;
          }
        }
      } catch (Exception e) {
        logger.error("exception in deserialization",e);
        obj = null;
      }
    }
    
    if (obj==null) {
      logger.debug("using standard deserialization");
      try {
        obj = mapper.readValue(n, Object.class);
      } catch (Exception e) {
        logger.error("exception in auto deserialization",e);
        obj = null;
      }
    }
    return obj;
  }

  
  /*
   * (non-Javadoc)
   * These implement module behavior modification
   */
  
  @Override
  public void addTypeConversion(String from, String to) {
    types.put(from,to);
  }

  @Override
  public void addTypeDeserializer(ObjectDeserializer o) {
    supportedDeserializers.add(o);
  }

  @Override
  public void addTypeSerializer(ObjectSerializer o) {
    supportedSerializers.add(o);
  }

  @Override
  public void addfTypeDeserializer(ObjectDeserializer o) {
    supportedDeserializers.add(0,o);
  }

  @Override
  public void addfTypeSerializer(ObjectSerializer o) {
    supportedSerializers.add(0,o);
  }

  /*
   * (non-Javadoc)
   * These implement thread specific module behavior modification
   */
  
  @Override
  public void addThreadSpecificTypeConversion(String from, String to) {
    if (threadTypes.get()==null)
      threadTypes.set(new HashMap<String,String>());
    threadTypes.get().put(from, to);    
  }

  @Override
  public void addThreadSpecificTypeDeserializer(ObjectDeserializer o) {
    if (threadDeserializers.get()==null)
      threadDeserializers.set(new ArrayList<ObjectDeserializer>());
    threadDeserializers.get().add(o);
  }

  @Override
  public void addThreadSpecificTypeSerializer(ObjectSerializer o) {
    if (threadSerializers.get()==null)
      threadSerializers.set(new ArrayList<ObjectSerializer>());
    threadSerializers.get().add(o);   
  }

  /*
   * (non-Javadoc)
   * These are the default auto-transforming serializers
   */

  class PrimitiveTypeSerializer implements ObjectSerializer {

    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      return isPrimitiveType(obj.getClass().getName());
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      jgen.writeObject(obj);
      return true;
    }
    
  }
  
  class ListOfPrimitiveTypeMapsSerializer implements ObjectSerializer {
    private final BasicObjectSerializer parent;
    
    public ListOfPrimitiveTypeMapsSerializer(BasicObjectSerializer p) {
      parent = p;
    }
    
    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      return expand && isListOfPrimitiveTypeMaps(obj);
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.debug("list of maps");
      try {
        // convert this 'on the fly' to a datatable
        @SuppressWarnings("unchecked")
        Collection<Map<?, ?>> co = (Collection<Map<?, ?>>) obj;
        TableDisplay t = new TableDisplay(co,parent);
        jgen.writeObject(t);
        return true;
      } catch(Exception e) {
        return false;
      }
    }
  }
  
  class PrimitiveTypeListOfListSerializer implements ObjectSerializer {

    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      return expand && isPrimitiveTypeListOfList(obj);
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.debug("collection of collections");
      
      Collection<?> m = (Collection<?>) obj;
      int max = 0;
              
      for (Object entry : m) {
        Collection<?> e = (Collection<?>) entry;
        if (max < e.size())
          max = e.size();
      }
      List<String> columns = new ArrayList<String>();
      for (int i=0; i<max; i++)
        columns.add("c"+i);
      List<List<?>> values = new ArrayList<List<?>>();
      for (Object entry : m) {
        Collection<?> e = (Collection<?>) entry;
        List<Object> l2 = new ArrayList<Object>(e);
        if (l2.size() < max) {
          for (int i=l2.size(); i<max; i++)
            l2.add(null);
        }
        values.add(l2);
      }
      jgen.writeStartObject();
      jgen.writeObjectField("type", "TableDisplay");
      jgen.writeObjectField("columnNames", columns);
      jgen.writeObjectField("values", values);
      jgen.writeObjectField("subtype", TableDisplay.MATRIX_SUBTYPE);
      jgen.writeEndObject();
      return true;
    }
  }

  class PrimitiveTypeMapSerializer implements ObjectSerializer {
    
    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      return expand && isPrimitiveTypeMap(obj);
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.debug("primitive type map");
      
      Map<?,?> m = (Map<?,?>) obj;
      
      List<String> columns = new ArrayList<String>();
      columns.add("Key");
      columns.add("Value");

      List<List<?>> values = new ArrayList<List<?>>();

      Set<?> eset = m.entrySet();
      for (Object entry : eset) {
        Entry<?,?> e = (Entry<?, ?>) entry;
        List<Object> l = new ArrayList<Object>();
        Object o = e.getKey();
        l.add(null==o?"null":o.toString());
        l.add(e.getValue());
        values.add(l);
      }
      jgen.writeStartObject();
      jgen.writeObjectField("type", "TableDisplay");
      jgen.writeObjectField("columnNames", columns);
      jgen.writeObjectField("values", values);
      jgen.writeObjectField("subtype", TableDisplay.DICTIONARY_SUBTYPE);
      jgen.writeEndObject();
      return true;
    }
  }

  class ArraySerializer implements ObjectSerializer {
    private final BasicObjectSerializer parent;
    
    public ArraySerializer(BasicObjectSerializer p) {
      parent = p;
    }

    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      return obj.getClass().isArray();
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.debug("array");
      // write out an array of objects.
      jgen.writeStartArray();
      final int length = Array.getLength(obj);
      for (int i = 0; i < length; ++i) {
        Object o = Array.get(obj, i);
        if (!parent.writeObject(o, jgen, false)) {
            jgen.writeObject(o.toString());
        }
      }
      jgen.writeEndArray();
      return true;
    }
  }

  class CollectionSerializer implements ObjectSerializer {
    private final BasicObjectSerializer parent;
    
    public CollectionSerializer(BasicObjectSerializer p) {
      parent = p;
    }

    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      return obj instanceof Collection<?>;
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.debug("collection");
      // convert this 'on the fly' to an array of objects
      Collection<?> c = (Collection<?>) obj;
      jgen.writeStartArray();
      for(Object o : c) {
        if (!parent.writeObject(o, jgen, false))
          jgen.writeObject(o.toString());
      }
      jgen.writeEndArray();
      return true;
    }
  }

  class MapSerializer implements ObjectSerializer {
    private final BasicObjectSerializer parent;
    
    public MapSerializer(BasicObjectSerializer p) {
      parent = p;
    }

    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      return obj instanceof Map<?,?>;
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.debug("generic map");
      // convert this 'on the fly' to a map of objects
      Map<?,?> m = (Map<?,?>) obj;

      Set<?> kset = m.keySet();
      if (kset.size()==0 || !(kset.iterator().next() instanceof String))
        jgen.writeObject(obj.toString());
      else {
        jgen.writeStartObject();
        for (Object k : kset) {
          jgen.writeFieldName((null==k)?"null":k.toString());
          if (!parent.writeObject(m.get(k), jgen, false))
            jgen.writeObject(m.get(k)!=null ? (m.get(k).toString()) : "null");
        }
        jgen.writeEndObject();
      }
      return true;
    }
  }

  @Override
  public void addKnownBeakerType(String t) {
    knownBeakerTypes.add(t);
  }

  @Override
  public boolean isKnownBeakerType(String t) {
    return knownBeakerTypes.contains(t);
  }

}

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

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.jvm.serialization.ObjectSerializer;
import com.twosigma.beakerx.table.TableDisplay;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class ScalaPrimitiveTypeMapSerializer implements ObjectSerializer {

  private final static Logger logger = LoggerFactory.getLogger(ScalaPrimitiveTypeMapSerializer.class.getName());
  private final BeakerObjectConverter parent;

  public ScalaPrimitiveTypeMapSerializer(BeakerObjectConverter p) {
    parent = p;
  }

  @Override
  public boolean canBeUsed(Object obj, boolean expand) {
    if (!expand)
      return false;

    if (!(obj instanceof scala.collection.immutable.Map))
      return false;

    Map<?, ?> m = scala.collection.JavaConversions.mapAsJavaMap((scala.collection.Map<?, ?>) obj);
    Set<?> keys = m.keySet();
    for (Object key : keys) {
      if (key != null && !parent.isPrimitiveType(key.getClass().getName()))
        return false;
      Object val = m.get(key);
      if (val != null && !parent.isPrimitiveType(val.getClass().getName()))
        return false;
    }
    return true;
  }

  @Override
  public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
    logger.debug("primitive type map");

    List<String> columns = new ArrayList<String>();
    columns.add("Key");
    columns.add("Value");

    List<List<?>> values = new ArrayList<List<?>>();

    Map<?, ?> m = scala.collection.JavaConversions.mapAsJavaMap((scala.collection.Map<?, ?>) obj);
    Set<?> keys = m.keySet();
    for (Object key : keys) {
      Object val = m.get(key);
      List<Object> l = new ArrayList<Object>();
      l.add(key.toString());
      l.add(val);
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

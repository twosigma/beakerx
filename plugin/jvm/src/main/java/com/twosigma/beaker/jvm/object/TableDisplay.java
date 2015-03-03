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
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class TableDisplay {

  private final List<List<?>> values;
  private final List<String> columns;
  private final List<String> classes;

  public TableDisplay(List<List<?>> v, List<String> co, List<String> cl) {
    values = v;
    columns = co;
    classes = cl;
  }

  public TableDisplay(Collection<Map<?,?>> v, ObjectSerializer serializer) {
    values = new ArrayList<List<?>>();
    columns = new ArrayList<String>();
    classes = new ArrayList<String>();

    // create columns
    for(Map<?,?> m : v) {
      Set<?> w = m.entrySet();
      for (Object s : w) {
        Entry<?,?> e = (Entry<?, ?>) s;
        String c = e.getKey().toString();
        if (!columns.contains(c)) {
          columns.add(c);
          classes.add(serializer.convertType(e.getValue().getClass().getName()));
        }
      }
    }

    // now build values
    for(Map<?,?> m : v) {
      List<Object> vals = new ArrayList<Object>();
      for (String cn : columns) {
        if (m.containsKey(cn))
          vals.add(m.get(cn));
        else
          vals.addAll(null);
      }
      values.add(vals);
    }
  }
  
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
        jgen.writeEndObject();
      }
    }
  }
}

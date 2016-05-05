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
package com.twosigma.beaker.table;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;
import java.util.Set;

import com.twosigma.beaker.jvm.serialization.BasicObjectSerializer;

import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.table.format.TableDisplayStringFormat;

public class TableDisplay {
  public static final String TABLE_DISPLAY_SUBTYPE = "TableDisplay";
  public static final String LIST_OF_MAPS_SUBTYPE = "ListOfMaps";
  public static final String MATRIX_SUBTYPE = "Matrix";
  public static final String DICTIONARY_SUBTYPE = "Dictionary";
  private final static Logger logger = Logger.getLogger(TableDisplay.class.getName());
  private final List<List<?>> values;
  private final List<String> columns;
  private final List<String> classes;
  private final String subtype;

  private TimeUnit stringFormatForTimes;
  private Map<String, TableDisplayStringFormat> stringFormatForType = new HashMap<>();
  private Map<String, TableDisplayStringFormat> stringFormatForColumn = new HashMap<>();

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

  public TimeUnit getStringFormatForTimes() {
    return stringFormatForTimes;
  }

  public void setStringFormatForTimes(TimeUnit stringFormatForTimes) {
    this.stringFormatForTimes = stringFormatForTimes;
  }

  public Map<String, TableDisplayStringFormat> getStringFormatForType() {
    return stringFormatForType;
  }

  public void setStringFormatForType(Class type, TableDisplayStringFormat format) {
    this.stringFormatForType.put(type.getSimpleName(), format);
  }

  public Map<String, TableDisplayStringFormat> getStringFormatForColumn() {
    return stringFormatForColumn;
  }

  public void setStringFormatForColumn(String column, TableDisplayStringFormat format) {
    this.stringFormatForColumn.put(column, format);
  }

  public static List<Map<String, Object>> getValuesAsRows(List<List<?>> values, List<String> columns) {
    List<Map<String, Object>> rows = new ArrayList<Map<String, Object>>();
    if (columns != null && values != null) {

      for (List<?> value : values) {
        Map<String, Object> m = new HashMap<String, Object>();
        for (int c = 0; c < columns.size(); c++) {
          if (value.size() > c)
            m.put(columns.get(c), value.get(c));
        }
        rows.add(m);
      }
    } else {
      throw new IllegalArgumentException("Method 'getValuesAsRows' doesn't supported for this table");
    }
    return rows;
  }

  public static List<List<?>> getValuesAsMatrix(List<List<?>> values) {
    return values;
  }

  public static Map<String, Object> getValuesAsDictionary(List<List<?>> values) {
    Map<String, Object> m = new HashMap<String, Object>();
    for (List<?> l : values) {
      if (l.size() != 2)
        throw new IllegalArgumentException("Method 'getValuesAsDictionary' doesn't supported for this table");
      ;
      m.put(l.get(0).toString(), l.get(1));
    }
    return m;
  }

  public  List<Map<String, Object>> getValuesAsRows(){
    return getValuesAsRows(values, columns);
  }

  public  List<List<?>> getValuesAsMatrix(){
    return getValuesAsMatrix( values);
  }

  public  Map<String, Object> getValuesAsDictionary(){
    return getValuesAsDictionary(values);
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
  public String getSubtype() {
    return subtype;
  }
}

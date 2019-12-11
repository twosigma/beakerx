/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.table;

import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.stream.Stream;

import static com.twosigma.beakerx.table.TableDisplay.LIST_OF_MAPS_SUBTYPE;
import static com.twosigma.beakerx.table.TableDisplay.PAGE_SIZE;

public class TableDisplayMapModel extends TableDisplayModel {

  private Stream<Map<String, Object>> v;
  private Iterator<Map<String, Object>> valuesIterator;
  private BeakerObjectConverter serializer;
  private List<Map<String, Object>> initValues = new ArrayList<>();

  public TableDisplayMapModel(Stream<Map<String, Object>> v, BeakerObjectConverter serializer) {
    this.v = v;
    this.valuesIterator = v.iterator();
    this.serializer = serializer;
    this.values = new ArrayList<>();
    this.columns = new ArrayList<>();
    this.classes = new ArrayList<>();
    this.subtype = LIST_OF_MAPS_SUBTYPE;
    this.initValues = nextValuesPage();
    createColumnNameAndType(initValues, serializer);
  }

  public void initValues() {
    addToValues(buildValues(initValues));
    initValues = null;
  }

  private List<Map<String, Object>> allValues() {
    List<Map<String, Object>> list = new ArrayList<>();
    while (valuesIterator.hasNext()) {
      list.add(valuesIterator.next());
    }
    return list;
  }

  public List<List<?>> takeAllData() {
    List<List<?>> items = buildValues(allValues());
    addToValues(items);
    return values;
  }


  public List<List<?>> takeNextPage() {
    List<List<?>> items = buildValues(nextValuesPage());
    addToValues(items);
    return items;
  }

  private void addToValues(List<List<?>> items) {
    values.addAll(items);
  }

  private List<List<?>> buildValues(List<Map<String, Object>> v) {
    List<List<?>> values = new ArrayList<>();
    for (Map<String, Object> m : v) {
      List<Object> vals = new ArrayList<>();
      for (String cn : columns) {
        if (m.containsKey(cn)) {
          vals.add(getValueForSerializer(m.get(cn), serializer));
        } else
          vals.add(null);
      }
      values.add(vals);
    }
    return values;
  }

  private List<Map<String, Object>> nextValuesPage(Iterator<Map<String, Object>> valuesIterator) {
    List<Map<String, Object>> list = new ArrayList<>();
    int i = 0;
    while (i < PAGE_SIZE && valuesIterator.hasNext()) {
      list.add(valuesIterator.next());
      i++;
    }
    return list;
  }

  private List<Map<String, Object>> nextValuesPage() {
    return nextValuesPage(valuesIterator);
  }


  private void createColumnNameAndType(List<Map<String, Object>> values, BeakerObjectConverter serializer) {
    // create columns
    if (values.size() > 0) {
      // Every column gets inspected at least once, so put every column in
      // a list with null for the initial type
      ArrayList<String> columnOrder = new ArrayList<String>();
      ArrayList<String> columnsToCheck = new ArrayList<String>();
      Map<String, String> typeTracker = new LinkedHashMap<String, String>();

      Map<String, Object> firstRow = values.get(0);
      for (String columnName : firstRow.keySet()) {
        columnOrder.add(columnName);
        columnsToCheck.add(columnName);
        typeTracker.put(columnName, null);
      }

      // Visit each row and track the row's type. If some value is found to
      // contain a string, the column is marked as string based and is no
      // longer typechecked
      List<String> columnsToRemove = new ArrayList<String>();
      for (Map<String, Object> row : values) {
        // Remove any columns requested from prior iteration
        for (String columnToRemove : columnsToRemove) {
          columnsToCheck.remove(columnToRemove);
        }
        columnsToRemove = new ArrayList<String>();

        ListIterator<String> columnCheckIterator = columnsToCheck.listIterator();
        while (columnCheckIterator.hasNext()) {
          String columnToCheck = columnCheckIterator.next();
          String currentType = typeTracker.get(columnToCheck);

          if (currentType == null || !currentType.equals("string")) {
            Object rowItem = row.get(columnToCheck);
            if (rowItem != null) {
              String colType = rowItem.getClass().getName();
              String beakerColType = serializer.convertType(colType);
              typeTracker.put(columnToCheck, beakerColType);

              if (beakerColType.equals("string")) {
                columnsToRemove.add(columnToCheck);
              }
            }
          }
        }
      }

      // Put results of type checking into `columns` and `classes`
      for (String columnName : columnOrder) {
        String columnType = typeTracker.get(columnName);
        columns.add(columnName);
        classes.add(columnType);
      }
    }
  }

}

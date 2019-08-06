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

import com.twosigma.beakerx.jvm.serialization.BasicObjectSerializer;

import java.util.ArrayList;
import java.util.List;

import static com.twosigma.beakerx.table.TableDisplay.TABLE_DISPLAY_SUBTYPE;

public class TableDisplayListModel extends TableDisplayModel {

  private List<List<?>> v;
  private BasicObjectSerializer basicObjectSerializer;

  public TableDisplayListModel(List<List<?>> v, List<String> co, List<String> cl, BasicObjectSerializer basicObjectSerializer) {
    this.v = v;
    this.basicObjectSerializer = basicObjectSerializer;
    values = new ArrayList<>();
    columns = co;
    classes = cl;
    subtype = TABLE_DISPLAY_SUBTYPE;
  }


  @Override
  public List<List<?>> takeNextPage() {
    return values;
  }

  @Override
  public List<List<?>> takeAllData() {
    return values;
  }

  @Override
  public void initValues() {
    addToValues(buildValues());
  }

  private void addToValues(List<List<?>> items) {
    values.addAll(items);
  }

  private List<List<?>> buildValues() {
    List<List<?>> values = new ArrayList<>();
    for (List<?> m : v) {
      List<Object> vals = new ArrayList<>();
      for (Object item : m) {
        vals.add(getValueForSerializer(item, basicObjectSerializer));
      }
      values.add(vals);
    }
    return values;
  }

}

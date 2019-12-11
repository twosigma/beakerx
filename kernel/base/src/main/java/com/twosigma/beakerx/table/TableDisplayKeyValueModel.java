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
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.twosigma.beakerx.table.TableDisplay.DICTIONARY_SUBTYPE;
import static java.util.Arrays.asList;

public class TableDisplayKeyValueModel extends TableDisplayModel {

  private Map<?, ?> v;
  private BasicObjectSerializer basicObjectSerializer;


  public TableDisplayKeyValueModel(Map<?, ?> v, BasicObjectSerializer basicObjectSerializer) {
    this.v = v;
    this.basicObjectSerializer = basicObjectSerializer;
    this.values = new ArrayList<>();
    this.columns = Arrays.asList("Key", "Value");
    this.classes = new ArrayList<>();
    this.subtype = DICTIONARY_SUBTYPE;
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

  public List<List<?>> buildValues() {
    Set<?> w = v.entrySet();
    List<List<?>> values = new ArrayList<>();
    for (Object s : w) {
      Map.Entry<?, ?> e = (Map.Entry<?, ?>) s;
      values.add(asList(e.getKey().toString(), e.getValue()));
    }
    return values;
  }

}

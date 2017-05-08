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

package com.twosigma.beaker.table;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TableDisplayTest {

  @Before
  public void initStubData() {
    KernelManager.register(new KernelTest());
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void createWithListOfMapsParam_hasListOfMapsSubtype() throws Exception {
    //when
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsData());
    //then
    Assertions.assertThat(tableDisplay.getSubtype()).isEqualTo(TableDisplay.LIST_OF_MAPS_SUBTYPE);
    Assertions.assertThat(tableDisplay.getValues().size()).isEqualTo(2);
    Assertions.assertThat(tableDisplay.getColumnNames().size()).isEqualTo(3);
    Assertions.assertThat(tableDisplay.getTypes().size()).isEqualTo(3);
  }

  @Test
  public void createWithListsParams_hasTableDisplaySubtype() throws Exception {
    //when
    TableDisplay tableDisplay =
        new TableDisplay(Arrays.asList(getRowData(), getRowData()), getStringList(), getStringList());
    //then
    Assertions.assertThat(tableDisplay.getSubtype()).isEqualTo(TableDisplay.TABLE_DISPLAY_SUBTYPE);
    Assertions.assertThat(tableDisplay.getValues().size()).isEqualTo(2);
    Assertions.assertThat(tableDisplay.getColumnNames().size()).isEqualTo(3);
    Assertions.assertThat(tableDisplay.getTypes().size()).isEqualTo(3);
  }

  @Test
  public void createTableDisplayForMap_hasDictionarySubtype() throws Exception {
    //when
    TableDisplay tableDisplay = new TableDisplay(getMapData());
    //then
    Assertions.assertThat(tableDisplay.getSubtype()).isEqualTo(TableDisplay.DICTIONARY_SUBTYPE);
    Assertions.assertThat(tableDisplay.getValues().size()).isEqualTo(3);
    Assertions.assertThat(tableDisplay.getColumnNames().size()).isEqualTo(2);
    Assertions.assertThat(tableDisplay.getTypes().size()).isEqualTo(0);
  }

  @Test
  public void createTableDisplay_hasCommIsNotNull() throws Exception {
    //when
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsData());
    //then
    Assertions.assertThat(tableDisplay.getComm()).isNotNull();
  }

  @Test
  public void getValuesAsRowsWithoutParams_returnedListOfMapsIsNotEmpty() throws Exception {
    //given
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsData());
    //when
    List<Map<String, Object>> rows = tableDisplay.getValuesAsRows();
    //then
    Assertions.assertThat(rows.size()).isEqualTo(2);
    Assertions.assertThat(rows.get(0).size()).isEqualTo(3);
  }

  @Test
  public void getValuesAsRowsWithTwoParams_returnedListOfMapsIsNotEmpty() throws Exception {
    //when
    List<Map<String, Object>> rows =
        TableDisplay.getValuesAsRows(Arrays.asList(getRowData(), getRowData()), getStringList());
    //then
    Assertions.assertThat(rows.size()).isEqualTo(2);
    Assertions.assertThat(rows.get(0).size()).isEqualTo(3);
  }

  @Test
  public void getValuesAsMatrixWithoutParams_returnedListOfListIsNotEmpty() throws Exception {
    //given
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsData());
    //when
    List<List<?>> values = tableDisplay.getValuesAsMatrix();
    //then
    Assertions.assertThat(values).isNotEmpty();
  }

  @Test
  public void getValuesAsMatrixWithParam_returnedListOfListIsNotEmpty() throws Exception {
    //when
    List<List<?>> values =
        TableDisplay.getValuesAsMatrix(Arrays.asList(getStringList(), getRowData()));
    //then
    Assertions.assertThat(values).isNotEmpty();
  }

  @Test
  public void getValuesAsDictionaryWithoutParam_returnedMapIsNotEmpty() throws Exception {
    //given
    TableDisplay tableDisplay = new TableDisplay(getMapData());
    //when
    Map<String, Object> dictionary = tableDisplay.getValuesAsDictionary();
    //then
    Assertions.assertThat(dictionary).isNotEmpty();
  }

  @Test
  public void getValuesAsDictionaryWithParam_returnedMapIsNotEmpty() throws Exception {
    //when
    Map<String, Object> dictionary =
        TableDisplay.getValuesAsDictionary(Arrays.asList(Arrays.asList("k1", 1), Arrays.asList("k2", 2)));
    //then
    Assertions.assertThat(dictionary).isNotEmpty();
  }

  private List<Map<?, ?>> getListOfMapsData() {
    List<Map<?, ?>> list = new ArrayList<>();
    List<String> cols = getStringList();
    List<?> row = getRowData();
    list.add(
        new HashMap<String, Object>() {
          {
            put(cols.get(0), row.get(0));
            put(cols.get(1), row.get(1));
            put(cols.get(2), row.get(2));
          }
        });
    list.add(
        new HashMap<String, Object>() {
          {
            put(cols.get(0), row.get(0));
            put(cols.get(1), row.get(1));
            put(cols.get(2), row.get(2));
          }
        });
    return list;
  }

  private Map<?, ?> getMapData(){
    return new HashMap<String, Object>() {
      {
        put("key1", 1);
        put("key2", 2);
        put("key3", 3);
        put("key1", 4);
        put("key2", 5);
      }
    };
  }

  private List<String> getStringList(){
    return Arrays.asList("str1", "str2", "str3");
  }

  private List<?> getRowData(){
    return Arrays.asList(new Float(1.0),  1490970521000L, "value1");
  }
}

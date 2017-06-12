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

public class ObservableTableDisplayTest {

  private TableDisplay tableDisplay;
  private int rowId = 0, colId = 0;

  @Before
  public void setUp(){
    KernelManager.register(new KernelTest());
    tableDisplay = new TableDisplay(getListOfMapsData());
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void setDoubleClickAction_doubleClickActionIsNotNull() throws Exception {
    //when
    tableDisplay.setDoubleClickAction(getClosure(this::sumAllElements));
    //then
    Assertions.assertThat(tableDisplay.hasDoubleClickAction()).isTrue();
    Assertions.assertThat(tableDisplay.getDoubleClickTag()).isNull();
  }

  @Test
  public void addContextMenuItem_contextMenuItemActionIsNotNull() throws Exception {
    //when
    tableDisplay.addContextMenuItem("negate", getClosure(this::negateValue));
    //then
    Assertions.assertThat(tableDisplay.getContextMenuItems()).isNotEmpty();
    Assertions.assertThat(tableDisplay.getContextMenuTags()).isEmpty();
  }

  @Test
  public void fireDoubleClick_shouldExecuteDoubleClickAction() throws Exception {
    //given
    int result = sumAllElements(getRowValues(rowId, tableDisplay), colId);
    tableDisplay.setDoubleClickAction(getClosure(this::sumAllElements));
    //when
    tableDisplay.fireDoubleClick(new ArrayList<Object>(Arrays.asList(rowId, colId)), null);
    //then
    Assertions.assertThat(tableDisplay.getValues().get(rowId).get(colId)).isEqualTo(result);
  }

  @Test
  public void fireContextMenuItem_shouldExecuteDoubleClickAction() throws Exception {
    //given
    int result = negateValue(getRowValues(rowId, tableDisplay), colId);
    tableDisplay.addContextMenuItem("negate", getClosure(this::negateValue));
    //when
    tableDisplay.fireContextMenuClick("negate", new ArrayList<Object>(Arrays.asList(rowId, colId)));
    //then
    Assertions.assertThat(tableDisplay.getValues().get(rowId).get(colId)).isEqualTo(result);
  }

  private ClosureTest getClosure(TableActionTest action){
    return new ClosureTest() {
      @Override
      public Object call(Object row, Object col, Object tableDisplay) {
        List<Integer> rowValues = getRowValues((int)row, (TableDisplay) tableDisplay);
        rowValues.set((int)col, action.execute(rowValues, (int)col));
        return true;
      }
      @Override
      public int getMaximumNumberOfParameters() {
        return 3;
      }
    };
  }

  private interface TableActionTest {
    int execute(List<Integer> rowValues, int colId);
  }

  private List<Integer> getRowValues(int rowId, TableDisplay tableDisplay){
    return (List<Integer>)(List<?>)tableDisplay.getValues().get(rowId);
  }

  private int sumAllElements(List<Integer> rowValues, int colId){
    return rowValues.stream().mapToInt(i -> i).sum();
  }

  private int negateValue(List<Integer> rowValues, int colId){
    return rowValues.get(colId)*(-1);
  }

  public static List<Map<?, ?>> getListOfMapsData() {
    List<Map<?, ?>> list = new ArrayList<>();
    list.add(
        new HashMap<String, Object>() {
          {
            put("col1", 1);
            put("col2", 2);
            put("col3", 3);
          }
        });
    list.add(
        new HashMap<String, Object>() {
          {
            put("col1", 10);
            put("col2", 20);
            put("col3", 30);
          }
        });
    return list;
  }
}

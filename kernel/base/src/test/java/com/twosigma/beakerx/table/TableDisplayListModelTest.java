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

package com.twosigma.beakerx.table;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.jetbrains.annotations.NotNull;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class TableDisplayListModelTest {

  protected KernelTest kernel;
  private TableDisplay tableDisplay;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    tableDisplay = new TableDisplay(
            generateValues(),
            Arrays.asList("col1", "col2", "col3"),
            Arrays.asList("integer", "integer", "integer"));
    tableDisplay.display();
    kernel.clearMessages();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void init() throws Exception {
    //given
    //when
    List<List<?>> lists = tableDisplay.getValues();
    //then
    assertThat(lists.size()).isEqualTo(3);
    assertThat(lists.get(0).get(2)).isEqualTo(3);
  }

  @Test
  public void takeNextPage() throws Exception {
    //given
    //when
    List<List<?>> lists = tableDisplay.takeNextPage();
    //then
    assertThat(lists.size()).isEqualTo(3);
    assertThat(lists.get(1).get(1)).isEqualTo(5);
  }

  @NotNull
  private List<List<?>> generateValues() {
    return new LinkedList<List<?>>() {
      {
        add(Arrays.asList(1, 2, 3));
        add(Arrays.asList(4, 5, 6));
        add(Arrays.asList(7, 8, 9));
      }
    };
  }


}

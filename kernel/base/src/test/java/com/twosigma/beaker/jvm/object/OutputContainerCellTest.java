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

package com.twosigma.beaker.jvm.object;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

public class OutputContainerCellTest {

  private OutputContainerCell container;

  @Before
  public void setUp() throws Exception {
    container = new OutputContainerCell();
  }

  @Test
  public void createOutputContainer_hasFieldsNotNull() throws Exception {
    //then
    Assertions.assertThat(container.getItems()).isNotNull();
    Assertions.assertThat(container.getLabels()).isNotNull();
    Assertions.assertThat(container.getLayoutManager()).isNotNull();
  }

  @Test
  public void createWithItemsParam_hasThoseItems() throws Exception {
    //given
    List<Object> items = Arrays.asList(Boolean.FALSE, Integer.MAX_VALUE);
    //when
    OutputContainerCell container = new OutputContainerCell(items);
    //then
    Assertions.assertThat(container.getItems()).isEqualTo(items);
  }

  @Test
  public void createWithItemsAndLabelsParams_hasThoseItemsAndLabels() throws Exception {
    //given
    List<Object> items = Arrays.asList(Boolean.TRUE, Long.MIN_VALUE);
    List<String> labels = Arrays.asList("lbl1", "lbl2");
    //when
    OutputContainerCell container = new OutputContainerCell(items, labels);
    //then
    Assertions.assertThat(container.getItems()).isEqualTo(items);
    Assertions.assertThat(container.getLabels()).isEqualTo(labels);
  }

}

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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class OutputContainerTest {

  private OutputContainer container;
  private String label = "test_label";

  @Before
  public void setUp() throws Exception {
    container = new OutputContainer();
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
    OutputContainer container = new OutputContainer(items);
    //then
    Assertions.assertThat(container.getItems()).isEqualTo(items);
  }

  @Test
  public void createWithItemsAndLabelsParams_hasThoseItemsAndLabels() throws Exception {
    //given
    List<Object> items = Arrays.asList(Boolean.FALSE, Integer.MAX_VALUE);
    List<String> labels = Arrays.asList("label1", "label2");
    //when
    OutputContainer container = new OutputContainer(items, labels);
    //then
    Assertions.assertThat(container.getItems()).isEqualTo(items);
    Assertions.assertThat(container.getLabels()).isEqualTo(labels);
  }

  @Test
  public void addItem_hasOneItemAndOneLabel() throws Exception {
    //when
    container.addItem(Long.MAX_VALUE);
    //then
    Assertions.assertThat(container.getItems()).isNotEmpty();
    Assertions.assertThat(container.getItems().size()).isEqualTo(1);
    Assertions.assertThat(container.getLabels()).isNotEmpty();
    Assertions.assertThat(container.getLabels().size()).isEqualTo(1);
  }

  @Test
  public void addItemWithIndex_hasItemWithThatIndex() throws Exception {
    //given
    container.addItem(Long.MAX_VALUE);
    //when
    container.addItem(Boolean.TRUE, 0);
    //then
    Assertions.assertThat(container.getItems()).isNotEmpty();
    Assertions.assertThat(container.getItems().get(0)).isEqualTo(true);
  }

  @Test
  public void addItemWithLabel_hasItemAndLabel() throws Exception {
    //when
    container.addItem(Boolean.TRUE, label);
    //then
    Assertions.assertThat(container.getItems().get(0)).isEqualTo(true);
    Assertions.assertThat(container.getLabels().get(0)).isEqualTo(label);
  }

  @Test
  public void addItemAndLabelWithIndex_hasItemAndLabelWithThatIndex() throws Exception {
    //given
    container.addItem(Long.MAX_VALUE);
    //when
    container.addItem(Boolean.TRUE, 0, label);
    //then
    Assertions.assertThat(container.getItems().get(0)).isEqualTo(true);
    Assertions.assertThat(container.getLabels().get(0)).isEqualTo(label);
  }

  @Test
  public void removeItem_hasNotThatItem() throws Exception {
    //given
    container.addItem(Integer.MIN_VALUE);
    container.addItem(Boolean.TRUE, 0);
    //when
    container.removeItem(Boolean.TRUE);
    //then
    Assertions.assertThat(container.getItems().get(0)).isEqualTo(Integer.MIN_VALUE);
  }

  @Test
  public void removeItemByIndex_hasNotThatItem() throws Exception {
    //given
    container.addItem(Integer.MIN_VALUE);
    container.addItem(Boolean.TRUE, 0);
    //when
    container.removeItem(0);
    //then
    Assertions.assertThat(container.getItems().get(0)).isEqualTo(Integer.MIN_VALUE);
  }

  @Test
  public void leftShift_shouldAddItem() throws Exception {
    //given
    container.addItem(Integer.MIN_VALUE);
    //when
    container.leftShift(Boolean.TRUE);
    //then
    Assertions.assertThat(container.getItems().get(1)).isEqualTo(true);
  }

  @Test
  public void visit_shouldVisitAllItems() throws Exception {
    //given
    List<Object> list = new ArrayList<>();
    OutputContainer.CellVisitor visitor = new OutputContainer.CellVisitor() {
      @Override
      public void visit(Object item) {
        list.add(item);
      }
    };
    container.addItem(Integer.MIN_VALUE, 0);
    container.addItem(Boolean.TRUE, 1);
    //when
    container.visit(visitor);
    //then
    Assertions.assertThat(list).isNotEmpty();
    Assertions.assertThat(list.size()).isEqualTo(2);
    Assertions.assertThat(list.get(1)).isEqualTo(true);
  }

}

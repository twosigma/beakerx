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

package com.twosigma.beaker.chart.categoryplot.plotitem;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

public class CategoryBarsTest {

  Integer[] array1, array2;

  @Before
  public void initStubData() {
    array1 = new Integer[] {new Integer(1), new Integer(2)};
    array2 = new Integer[] {new Integer(3), new Integer(4)};
  }

  @Test
  public void createCategoryBarsByEmptyConstructor_hasBaseBaseEqualsZero() {
    //when
    CategoryBars categoryBars = new CategoryBars();
    //then
    Assertions.assertThat(categoryBars.getBase()).isEqualTo(0.0);
  }

  @Test
  public void setValueWithIntegerArrayParam_hasValueIsNotEmpty() {
    //when
    CategoryBars categoryBars = new CategoryBars();
    categoryBars.setValue(array1);
    //then
    Assertions.assertThat(categoryBars.getValue()).isNotEmpty();
  }

  @Test
  public void setValueWithIntegerArrayOfListsParam_hasValueIsNotEmpty() {
    //when
    CategoryBars categoryBars = new CategoryBars();
    categoryBars.setValue(new List[] {Arrays.asList(array1), Arrays.asList(array2)});
    //then
    Assertions.assertThat(categoryBars.getValue()).isNotEmpty();
  }

  @Test
  public void setBaseWithIntegerListParam_hasBasesIsNotEmpty() {
    //when
    CategoryBars categoryBars = new CategoryBars();
    categoryBars.setBase(Arrays.asList(array1));
    //then
    Assertions.assertThat(categoryBars.getBases()).isNotEmpty();
  }

  @Test
  public void setWidthIntegerListParam_hasWidthsIsNotEmpty() {
    //when
    CategoryBars categoryBars = new CategoryBars();
    categoryBars.setWidth(Arrays.asList(array2));
    //then
    Assertions.assertThat(categoryBars.getWidths()).isNotEmpty();
  }
}

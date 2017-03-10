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

import com.twosigma.beaker.chart.xychart.plotitem.StrokeType;
import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.util.Arrays;

public class CategoryStemsTest {

  @Test
  public void createCategoryStemsByEmptyConstructor_hasWidthGreaterThanZero() {
    //when
    CategoryStems categoryStems = new CategoryStems();
    //then
    Assertions.assertThat(categoryStems.getWidth()).isGreaterThan(0);
  }

  @Test
  public void setBaseIntegerListParam_hasBasesListIsNotEmpty() {
    //when
    CategoryStems categoryStems = new CategoryStems();
    categoryStems.setBase(Arrays.asList(new Integer(1), new Integer(2)));
    //then
    Assertions.assertThat(categoryStems.getBases()).isNotEmpty();
  }

  @Test
  public void setStyleWithStrokeTypeListParam_hasStylesListIsNotEmpty() {
    //when
    CategoryStems categoryStems = new CategoryStems();
    categoryStems.setStyle(Arrays.asList(StrokeType.values()));
    //then
    Assertions.assertThat(categoryStems.getStyles()).isNotEmpty();
  }

  @Test
  public void setValueWithIntegerArrayParam_hasValueIsNotEmpty() {
    //when
    CategoryStems categoryStems = new CategoryStems();
    categoryStems.setValue(new Integer[] {new Integer(1), new Integer(2)});
    //then
    Assertions.assertThat(categoryStems.getValue()).isNotEmpty();
  }
}

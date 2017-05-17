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

package com.twosigma.beaker.chart.xychart.plotitem;

import org.assertj.core.api.Assertions;
import org.junit.Test;

public class YAxisTest {

  @Test
  public void createYAxisByEmptyConstructor_hasLabelAndMarginsAreNotNulls() {
    //when
    YAxis yAxis = new YAxis();
    //then
    Assertions.assertThat(yAxis.getLabel()).isNotNull();
    Assertions.assertThat(yAxis.getLowerMargin()).isNotNull();
    Assertions.assertThat(yAxis.getUpperMargin()).isNotNull();
  }

  @Test
  public void createYAxisWithStringParam_hasLabelAndMarginsValues() {
    //when
    YAxis yAxis = new YAxis("string param");
    //then
    Assertions.assertThat(yAxis.getLabel()).isEqualTo("string param");
    Assertions.assertThat(yAxis.getLowerMargin()).isEqualTo(0);
    Assertions.assertThat(yAxis.getUpperMargin()).isEqualTo(0);
  }

  @Test
  public void createYAxisWithTwoDoubleParams_hasLabelIsEmptyAndMarginsValues() {
    //when
    YAxis yAxis = new YAxis(1, 2);
    //then
    Assertions.assertThat(yAxis.getLabel()).isEmpty();
    Assertions.assertThat(yAxis.getLowerMargin()).isEqualTo(1);
    Assertions.assertThat(yAxis.getUpperMargin()).isEqualTo(2);
  }

  @Test
  public void createYAxisWithOneStringAndTwoDoubleParams_hasLabelAndMarginsValues() {
    //when
    YAxis yAxis = new YAxis("string param", 1, 2);
    //then
    Assertions.assertThat(yAxis.getLabel()).isEqualTo("string param");
    Assertions.assertThat(yAxis.getLowerMargin()).isEqualTo(1);
    Assertions.assertThat(yAxis.getUpperMargin()).isEqualTo(2);
  }

  @Test
  public void setBoundsWithTwoDoubleParams_hasBoundsValuesAndHasAutoRangeIsFalse() {
    //given
    YAxis yAxis = new YAxis();
    //when
    yAxis.setBound(1, 2);
    //then
    Assertions.assertThat(yAxis.getAutoRange()).isEqualTo(false);
    Assertions.assertThat(yAxis.getLowerBound()).isEqualTo(1);
    Assertions.assertThat(yAxis.getUpperBound()).isEqualTo(2);
  }

  @Test
  public void clone_shouldCloneYAxis() throws CloneNotSupportedException {
    //given
    YAxis yAxis = new YAxis();
    //when
    yAxis.setLabel("clone");
    YAxis cloneYaxis = (YAxis) yAxis.clone();
    yAxis.setLabel("original");
    //then
    Assertions.assertThat(cloneYaxis.getLabel()).isEqualTo("clone");
    Assertions.assertThat(yAxis.getLabel()).isEqualTo("original");
  }

}

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

package com.twosigma.beakerx.chart.xychart.plotitem;

import com.twosigma.beakerx.chart.Color;
import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.util.Arrays;

public class LineTest {

  @Test
  public void createLineByEmptyConstructor_lineHasStyleIsNull() {
    //when
    Line line = new Line();
    //then
    Assertions.assertThat(line.getStyle()).isNull();
  }

  @Test
  public void createLineWithNumberListParam_lineHasXsAndYsListsAreNotNulls() {
    //when
    Line line = new Line(Arrays.asList(new Integer(10), new Integer(20)));
    //then
    Assertions.assertThat(line.getX()).isNotNull();
    Assertions.assertThat(line.getY()).isNotNull();
  }

  @Test
  public void createLineWithTwoNumberListParams_lineHasXsAndYsListsAreNotNulls() {
    //when
    Line line =
        new Line(
            Arrays.asList(new Integer(10), new Integer(20)),
            Arrays.asList(new Integer(30), new Integer(40)));
    //then
    Assertions.assertThat(line.getX()).isNotNull();
    Assertions.assertThat(line.getY()).isNotNull();
  }

  @Test
  public void setColorWithAwtColorParam_lineHasBeakerColor() {
    //when
    Line line = new Line();
    line.setColor(java.awt.Color.GREEN);
    //then
    Assertions.assertThat(line.getColor() instanceof Color).isTrue();
  }
}

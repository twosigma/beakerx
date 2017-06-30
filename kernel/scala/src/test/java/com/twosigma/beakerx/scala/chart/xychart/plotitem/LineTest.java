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

package com.twosigma.beakerx.scala.chart.xychart.plotitem;

import com.twosigma.beakerx.scala.TestHelper;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class LineTest {

  @Test
  public void createLineWithNumberListParam_lineHasXsYsListsIsNotEmpty() {
    //when
    Line line = new Line(TestHelper.createScalaList(10, 20));
    //then
    Assertions.assertThat(line.getX()).isNotEmpty();
    Assertions.assertThat(line.getY()).isNotEmpty();
  }

  @Test
  public void createLineWithNumberListAndStringParams_lineHasXsYsListsAndDisplayNameIsNotEmpty() {
    String testString = "display_name";
    //when
    Line line = new Line(TestHelper.createScalaList(10, 20), testString);
    //then
    Assertions.assertThat(line.getX()).isNotEmpty();
    Assertions.assertThat(line.getY()).isNotEmpty();
    Assertions.assertThat(line.getDisplayName()).isEqualTo(testString);
  }

  @Test
  public void createLineWithFourParams_lineHasXsYsListsDisplayNameAndWidthIsNotEmpty() {
    String testString = "display_name";
    float testWidth = 0.5f;
    //when
    Line line = new Line(
        testString,
        TestHelper.createScalaList(10, 20),
        TestHelper.createScalaList(30, 40),
        testWidth
    );
    //then
    Assertions.assertThat(line.getX()).isNotEmpty();
    Assertions.assertThat(line.getY()).isNotEmpty();
    Assertions.assertThat(line.getDisplayName()).isEqualTo(testString);
    Assertions.assertThat(line.getWidth()).isEqualTo(testWidth);
  }

}

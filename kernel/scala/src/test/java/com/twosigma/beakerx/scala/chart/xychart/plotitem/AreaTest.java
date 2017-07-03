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

import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.scala.TestHelper;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class AreaTest {

  @Test
  public void createAreaWithTwoListParams_hasXsYsListsIsNotEmpty() {
    //when
    Area area = new Area(
        TestHelper.createScalaList(10, 20),
        TestHelper.createScalaList(30, 40)
    );
    //then
    Assertions.assertThat(area.getX()).isNotEmpty();
    Assertions.assertThat(area.getY()).isNotEmpty();
  }

  @Test
  public void createAreaWithFourParams_hasXsYsColorAndInterpolationIsNotEmpty() {
    Color testColor = Color.GREEN;
    int testInterpolation = 1;
    //when
    Area area = new Area(
        TestHelper.createScalaList(10, 20),
        TestHelper.createScalaList(30, 40),
        testColor,
        testInterpolation
    );
    //then
    Assertions.assertThat(area.getX()).isNotEmpty();
    Assertions.assertThat(area.getY()).isNotEmpty();
    Assertions.assertThat(area.getColor()).isEqualTo(testColor);
    Assertions.assertThat(area.getInterpolation()).isEqualTo(testInterpolation);
  }

  @Test
  public void createAreaWithFourParams_hasXsYsColorAndDisplayNameIsNotEmpty() {
    Color testColor = Color.GREEN;
    String testString = "display_name";
    //when
    Area area = new Area(
        TestHelper.createScalaList(10, 20),
        TestHelper.createScalaList(30, 40),
        testColor,
        testString
    );
    //then
    Assertions.assertThat(area.getX()).isNotEmpty();
    Assertions.assertThat(area.getY()).isNotEmpty();
    Assertions.assertThat(area.getColor()).isEqualTo(testColor);
    Assertions.assertThat(area.getDisplayName()).isEqualTo(testString);
  }

  @Test
  public void createAreaWithListAndStringParams_hasYsListAndDisplayNameIsNotEmpty() {
    String testString = "display_name";
    //when
    Area area = new Area(
        TestHelper.createScalaList(10, 20),
        testString
    );
    //then
    Assertions.assertThat(area.getY()).isNotEmpty();
    Assertions.assertThat(area.getDisplayName()).isEqualTo(testString);
  }

}

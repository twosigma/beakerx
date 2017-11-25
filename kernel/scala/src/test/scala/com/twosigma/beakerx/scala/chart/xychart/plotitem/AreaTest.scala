/*
 * Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.twosigma.beakerx.scala.chart.xychart.plotitem

import com.twosigma.beakerx.chart.Color
import com.twosigma.beakerx.scala.TestHelper
import org.assertj.core.api.Assertions
import org.junit.Test

class AreaTest {
  @Test
  def createAreaWithTwoListParams_hasXsYsListsIsNotEmpty(): Unit = { //when
    val area = new Area(List(10, 20), List(30, 40))
    //then
    Assertions.assertThat[Number](area.getX).isNotEmpty
    Assertions.assertThat[Number](area.getY).isNotEmpty
  }

  @Test
  def createAreaWithFourParams_hasXsYsColorAndInterpolationIsNotEmpty(): Unit = {
    val testColor = Color.GREEN
    val testInterpolation = 1
    val area = new Area(List(10, 20), List(30, 40), testColor, testInterpolation)
    Assertions.assertThat[Number](area.getX).isNotEmpty
    Assertions.assertThat[Number](area.getY).isNotEmpty
    Assertions.assertThat(area.getColor).isEqualTo(testColor)
    Assertions.assertThat(area.getInterpolation).isEqualTo(testInterpolation)
  }

  @Test
  def createAreaWithFourParams_hasXsYsColorAndDisplayNameIsNotEmpty(): Unit = {
    val testColor = Color.GREEN
    val testString = "display_name"
    val area = new Area(List(10, 20), List(30, 40), testColor, testString)
    Assertions.assertThat[Number](area.getX).isNotEmpty
    Assertions.assertThat[Number](area.getY).isNotEmpty
    Assertions.assertThat(area.getColor).isEqualTo(testColor)
    Assertions.assertThat(area.getDisplayName).isEqualTo(testString)
  }

  @Test
  def createAreaWithListAndStringParams_hasYsListAndDisplayNameIsNotEmpty(): Unit = {
    val testString = "display_name"
    val area = new Area(List(10, 20), testString)
    Assertions.assertThat[Number](area.getY).isNotEmpty
    Assertions.assertThat(area.getDisplayName).isEqualTo(testString)
  }

  // Area properties

  @Test
  def interpolation(): Unit = {
    val area = new Area()

    Assertions.assertThat(area.interpolation.isEmpty).isTrue
    area.interpolation = 1
    Assertions.assertThat(area.interpolation.isDefined).isTrue
    Assertions.assertThat(area.interpolation.get).isEqualTo(1)
  }
}
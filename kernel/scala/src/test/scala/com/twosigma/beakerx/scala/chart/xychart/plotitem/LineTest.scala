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

import org.assertj.core.api.Assertions
import org.junit.Test

import scala.collection.JavaConverters._

class LineTest {
  @Test
  def createLineWithNumberList_lineHasXsYsListsIsNotEmpty(): Unit = { //when
    val line = new Line {
      y = Seq(10, 20)
    }
    //then
    Assertions.assertThat[Number](line.getX).isNotEmpty
    Assertions.assertThat[Number](line.getY).isNotEmpty
  }

  @Test
  def createLineWithNumberListAndString_lineHasXsYsListsAndDisplayNameIsNotEmpty(): Unit = {
    val testString = "display_name"
    val line = new Line {
      y = Seq(10, 20)
      displayName = testString
    }
    Assertions.assertThat[Number](line.getX).isNotEmpty
    Assertions.assertThat[Number](line.getY).isNotEmpty
    Assertions.assertThat(line.getDisplayName).isEqualTo(testString)
  }

  @Test
  def createLineWithFourProperties_lineHasXsYsListsDisplayNameAndWidthIsNotEmpty(): Unit = {
    val testString = "display_name"
    val testWidth = 0.5f
    val line = new Line {
      displayName = testString
      x = Seq(10, 20)
      y = Seq(30, 40)
      width = testWidth
    }
    Assertions.assertThat[Number](line.x.asJavaCollection).isNotEmpty
    Assertions.assertThat[Number](line.y.asJavaCollection).isNotEmpty
    Assertions.assertThat(line.getDisplayName).isEqualTo(testString)
    Assertions.assertThat(line.getWidth).isEqualTo(testWidth)
  }

  @Test
  def unsetOptions(): Unit = {
    val line = new Line

    Assertions.assertThat(line.getInterpolation).isNull()
    Assertions.assertThat(line.interpolation).isEqualTo(None)

    Assertions.assertThat(line.getStyle).isNull()
    Assertions.assertThat(line.style).isEqualTo(None)
  }

}
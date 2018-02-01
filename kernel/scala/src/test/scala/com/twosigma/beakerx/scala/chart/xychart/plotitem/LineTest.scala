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

import org.junit.Test
import org.scalatest.Matchers._

class LineTest {
  @Test
  def createLineWithNumberList_lineHasXsYsListsIsNotEmpty(): Unit = { //when
    val line = new Line {
      y = Seq(10, 20)
    }
    //then
    line.getX shouldNot be ('empty)
    line.getY shouldNot be ('empty)
  }

  @Test
  def createLineWithNumberListAndString_lineHasXsYsListsAndDisplayNameIsNotEmpty(): Unit = {
    val testString = "display_name"
    val line = new Line {
      y = Seq(10, 20)
      displayName = testString
    }
    line.getX shouldNot be('empty)
    line.getY shouldNot be('empty)
    line.getDisplayName shouldBe testString
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
    line.getX shouldNot be('empty)
    line.getY shouldNot be('empty)
    line.getDisplayName shouldBe testString
    line.getWidth shouldBe testWidth
  }

  @Test
  def unsetOptions(): Unit = {
    val line = new Line

    line.getInterpolation shouldBe null
    line.interpolation shouldBe None

    line.getStyle shouldBe null
    line.style shouldBe None
  }

}
/*
 * Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.scala.chart

import com.twosigma.beakerx.chart.AbstractChart
import com.twosigma.beakerx.chart.xychart.plotitem.YAxis
import com.twosigma.beakerx.scala.chart.xychart.plotitem.Crosshair
import org.junit.Test
import org.scalatest.Matchers._

class AbstractChartPropertiesTest {
  @Test
  def properties(): Unit = {
    val ac = new AbstractChart with AbstractChartProperties {}

    ac.crosshair shouldBe empty
    val testCrosshair = new Crosshair
    ac.crosshair = testCrosshair
    ac.crosshair should contain(testCrosshair)

    assume(ac.getLogY == false)
    ac.logY shouldBe false
    ac.logY = true
    ac.logY shouldBe true

    assume(ac.getOmitCheckboxes == false)
    ac.omitCheckboxes shouldBe false
    ac.omitCheckboxes = true
    ac.omitCheckboxes shouldBe true

    ac.xLabel shouldBe empty
    ac.xLabel = "label"
    ac.xLabel should contain("label")

    ac.xLowerMargin shouldBe ac.getXLowerMargin
    ac.xLowerMargin = 3.0
    ac.xLowerMargin shouldBe 3.0

    ac.xUpperMargin shouldBe ac.getXUpperMargin
    ac.xUpperMargin = 5.0
    ac.xUpperMargin shouldBe 5.0

    assume(ac.getYAutoRange == true)
    ac.yAutoRange shouldBe true
    ac.yAutoRange = false
    ac.yAutoRange shouldBe false

    assume(ac.getYAutoRangeIncludesZero == false)
    ac.yAutoRangeIncludesZero shouldBe false
    ac.yAutoRangeIncludesZero = true
    ac.yAutoRangeIncludesZero shouldBe true

    ac.yBound shouldBe (ac.getYLowerBound, ac.getYUpperBound)
    ac.yBound = (4, 77)
    ac.yBound shouldBe (4, 77)
    ac.yLowerBound shouldBe 4
    ac.yUpperBound shouldBe 77

    // Y-axis label defaults to empty string
    ac.yLabel shouldBe empty
    ac.yLabel = "yLabel"
    ac.yLabel shouldBe "yLabel"

    assume(ac.getYLogBase == 10)
    ac.yLogBase shouldBe ac.getYLogBase
    ac.yLogBase = Math.E
    ac.yLogBase shouldBe Math.E

    assume(ac.getYLowerMargin == 0)
    ac.yLowerMargin shouldBe ac.getYLowerMargin
    ac.yLowerMargin = 20
    ac.yLowerMargin shouldBe 20

    assume(ac.getYUpperMargin == 0)
    ac.yUpperMargin shouldBe ac.getYUpperMargin
    ac.yUpperMargin = 30
    ac.yUpperMargin shouldBe 30
  }

  @Test
  def yAxes(): Unit = {
    val ac = new AbstractChart with AbstractChartProperties {}

    ac.yAxes should (have length 1)
    val newAxis = new YAxis()
    ac.add(newAxis)
    ac.yAxes should (have length 2)

    assertCompiles("ac.add(Seq(newAxis))")
    assertTypeError("ac.add(Seq(ac))")
    assertTypeError("ac.add(ac)")

    val newAxis2 = new YAxis()
    ac += newAxis2
    ac.yAxes should (have length 3)

    val newAxis3 = new YAxis()
    ac ++= Seq(newAxis3)
    ac.yAxes should (have length 4)
  }
}

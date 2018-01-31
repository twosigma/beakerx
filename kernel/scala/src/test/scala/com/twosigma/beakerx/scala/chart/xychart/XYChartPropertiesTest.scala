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
package com.twosigma.beakerx.scala.chart.xychart

import com.twosigma.beakerx.chart.xychart.XYChart
import com.twosigma.beakerx.chart.xychart.plotitem.YAxis
import com.twosigma.beakerx.scala.chart.xychart.plotitem._
import org.junit.Test
import org.scalatest.Matchers._

import scala.collection.JavaConverters._

class XYChartPropertiesTest {
  @Test
  def gettersAndSetters(): Unit = {
    val chart = new XYChart with XYChartProperties {}

    chart.lodThreshold shouldBe empty
    chart.lodThreshold = 10
    chart.lodThreshold should contain(10)

    assume(chart.getLogX == false)
    chart.logX shouldBe false
    chart.logX = true
    chart.logX shouldBe true

    assume(chart.getXAutoRange == true)
    chart.xAutoRange shouldBe true
    chart.xAutoRange = false
    chart.xAutoRange shouldBe false

    chart.xBound shouldBe (0, 0)
    chart.xBound = (10, 30)
    chart.xBound shouldBe (10, 30)
    chart.xLowerBound shouldBe 10
    chart.xUpperBound shouldBe (30)

    assume(chart.getXLogBase == 10)
    chart.xLogBase shouldBe 10
    chart.xLogBase = 2
    chart.xLogBase shouldBe 2

    chart.xTickLabelsVisible shouldBe true
    chart.xTickLabelsVisible = false
    chart.xTickLabelsVisible shouldBe false

    chart.yAutoRange shouldBe true
    chart.yAutoRange = false
    chart.yAutoRange shouldBe false

    chart.yTickLabelsVisible shouldBe true
    chart.yTickLabelsVisible = false
    chart.yTickLabelsVisible shouldBe false
  }

  @Test
  def addable(): Unit = {
    val chart = new XYChart with XYChartProperties {}

    val constantBand = new ConstantBand
    val constantLine = new ConstantLine
    val rasters = new Rasters {
      x = Seq(0)
      y = Seq(0)
      height = Seq(0)
      width = Seq(0)
    }
    val text = new Text
    val line = new Line {
      x = Seq(0)
      y = Seq(0)
    }

    chart += constantBand
    chart += constantLine
    chart += rasters
    chart += text
    chart += line
    chart += new YAxis()

    chart.getConstantBands should have length 1
    chart.getConstantLines should have length 1
    chart.getRasters should have length 1
    chart.getTexts should have length 1
    chart.getGraphics should have length 1
    chart.getYAxes should have length 2

    // The list form of add that takes a list of items is not mapped to Scala.
    // A type-safe heterogeneous list can't be done with the standard library.
  }
}

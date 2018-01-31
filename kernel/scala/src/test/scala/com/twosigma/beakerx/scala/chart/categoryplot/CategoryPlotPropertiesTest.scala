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
package com.twosigma.beakerx.scala.chart.categoryplot

import com.twosigma.beakerx.KernelTest
import com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryBars
import com.twosigma.beakerx.chart.xychart.plotitem.PlotOrientationType
import com.twosigma.beakerx.kernel.KernelManager
import org.junit.Test
import org.scalatest.Matchers._

class CategoryPlotPropertiesTest {
  @Test
  def accessors(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val plot = new CategoryPlot

    assume(plot.getCategoryMargin != 0)
    plot.categoryMargin shouldBe plot.getCategoryMargin
    plot.categoryMargin = 0
    plot.categoryMargin shouldBe 0

    plot.categoryNames shouldBe empty
    plot.categoryNames = Array("one", "two", "three")
    plot.categoryNames shouldBe Seq("one", "two", "three")

    assume(plot.getCategoryNamesLabelAngle == 0)
    plot.categoryNamesLabelAngle shouldBe 0
    plot.categoryNamesLabelAngle = Math.PI / 2
    plot.categoryNamesLabelAngle shouldBe Math.PI / 2

    assume(plot.getOrientation == PlotOrientationType.VERTICAL)
    plot.orientation shouldBe PlotOrientationType.VERTICAL
    plot.orientation = PlotOrientationType.HORIZONTAL
    plot.orientation shouldBe PlotOrientationType.HORIZONTAL
  }

  @Test
  def add(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val plot = new CategoryPlot

    val cg = new CategoryBars

    plot.getCategoryGraphics shouldBe empty
    plot += cg
    plot.getCategoryGraphics should have length(1)
  }
}

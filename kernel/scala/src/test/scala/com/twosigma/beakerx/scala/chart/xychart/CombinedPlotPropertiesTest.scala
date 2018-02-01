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
package com.twosigma.beakerx.scala.chart.xychart

import com.twosigma.beakerx.KernelTest
import com.twosigma.beakerx.chart.xychart.XYChart
import com.twosigma.beakerx.kernel.KernelManager
import org.junit.Test
import org.scalatest.Matchers._

class CombinedPlotPropertiesTest {
  @Test
  def gettersAndSetters(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val plot = new CombinedPlot

    plot.initHeight shouldBe plot.getInitHeight
    plot.initWidth shouldBe plot.getInitWidth

    plot.initHeight = 88
    plot.initWidth = 666
    plot.initHeight shouldBe 88
    plot.initWidth shouldBe 666

    plot.title shouldBe empty
    plot.title = "Title"
    plot.title should contain("Title")

    plot.xLabel shouldBe empty
    plot.xLabel = "Label"
    plot.xLabel should contain("Label")

    assume(plot.xTickLabelsVisible)
    plot.xTickLabelsVisible shouldBe plot.isxTickLabelsVisible()
    plot.xTickLabelsVisible = false
    plot.xTickLabelsVisible shouldBe false

    assume(plot.yTickLabelsVisible)
    plot.yTickLabelsVisible shouldBe plot.isyTickLabelsVisible()
    plot.yTickLabelsVisible = false
    plot.yTickLabelsVisible shouldBe false

    plot.weights shouldBe empty
    plot.subplots shouldBe empty
    val aChart = new XYChart {}
    plot.add(aChart, 3)
    plot.subplots shouldBe Seq(aChart)
    plot.weights shouldBe Seq(3)
  }
}
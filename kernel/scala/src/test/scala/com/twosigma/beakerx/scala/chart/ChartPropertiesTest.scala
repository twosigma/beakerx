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

import com.twosigma.beakerx.chart.legend.{LegendLayout, LegendPosition}
import org.junit.Test
import org.scalatest.Matchers._

class ChartPropertiesTest {
  @Test
  def gettersAndSetters(): Unit = {
    val chart = new Chart

    chart.customStyles shouldBe empty
    chart.customStyles = Array("style1", "style2")
    chart.customStyles shouldBe Seq("style1", "style2")

    chart.elementStyles shouldBe empty

    chart.gridLineStyle shouldBe empty
    chart.gridLineStyle = "style"
    chart.gridLineStyle should contain("style")

    chart.elementStyles shouldNot be(empty)

    chart.initHeight shouldBe chart.getInitHeight
    chart.initHeight = 1234
    chart.initHeight shouldBe 1234

    chart.initWidth shouldBe chart.getInitWidth
    chart.initWidth = 4321
    chart.initWidth shouldBe 4321

    chart.labelStyle shouldBe empty
    chart.labelStyle = "labelStyle"
    chart.labelStyle should contain("labelStyle")

    chart.labelXStyle shouldBe empty
    chart.labelXStyle = "labelXStyle"
    chart.labelXStyle should contain("labelXStyle")

    chart.labelYStyle shouldBe empty
    chart.labelYStyle = "labelYStyle"
    chart.labelYStyle should contain("labelYStyle")

    assume(chart.getLegendLayout != LegendLayout.HORIZONTAL)
    chart.legendLayout shouldBe chart.getLegendLayout
    chart.legendLayout = LegendLayout.HORIZONTAL
    chart.legendLayout shouldBe LegendLayout.HORIZONTAL

    assume(chart.getLegendPosition != LegendPosition.TOP_LEFT)
    chart.legendPosition shouldBe chart.getLegendPosition
    chart.legendPosition = LegendPosition.TOP_LEFT
    chart.legendPosition shouldBe LegendPosition.TOP_LEFT

    chart.showLegend shouldBe empty
    chart.showLegend = false
    chart.showLegend should contain(false)

    chart.title shouldBe empty
    chart.title = "chart title"
    chart.title should contain("chart title")

    chart.titleStyle shouldBe empty
    chart.titleStyle = "title style"
    chart.titleStyle should contain("title style")

    assume(chart.getUseToolTip == true)
    chart.useToolTip shouldBe chart.getUseToolTip
    chart.useToolTip = false
    chart.useToolTip shouldBe false
  }
}
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
import org.junit.Test
import org.scalatest.Matchers._

class BarsPropertiesTest {
  @Test def outlineColor(): Unit = {
    val bars = new Bars

    bars.outlineColor shouldBe empty
    bars.outlineColor = Color.ORANGE
    bars.outlineColor should contain(Color.ORANGE)

    bars.outlineColors shouldBe empty
    bars.outlineColor = Array(Color.RED, Color.GREEN, Color.BLUE)
    bars.outlineColors shouldBe Seq(Color.RED, Color.GREEN, Color.BLUE)

    assertTypeError("bars.outlineColor = Array(bars)")
  }

  @Test def width(): Unit = {
    val bars = new Bars

    bars.width shouldBe empty
    bars.width = 3
    bars.width should contain(3)

    bars.widths shouldBe empty
    bars.width = Array(1.2, 2.3, 3.4)
    bars.widths shouldBe Seq(1.2, 2.3, 3.4)

    assertTypeError("bars.width = Seq(true)")
  }
}
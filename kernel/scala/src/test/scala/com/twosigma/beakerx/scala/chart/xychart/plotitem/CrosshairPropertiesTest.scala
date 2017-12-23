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
import com.twosigma.beakerx.chart.xychart.plotitem.StrokeType
import org.junit.Test
import org.scalatest.Matchers._

class CrosshairPropertiesTest {
  @Test def color(): Unit = {
    val crosshair = new Crosshair()

    crosshair.color shouldBe empty
    crosshair.color = Color.green
    crosshair.color should contain(Color.green)
  }

  @Test def width(): Unit = {
    val crosshair = new Crosshair()

    crosshair.width shouldBe empty
    crosshair.width = 4.2f
    crosshair.width should contain(4.2f)
  }

  @Test def style(): Unit = {
    val crosshair = new Crosshair()

    crosshair.style shouldBe empty
    crosshair.style = StrokeType.DASH
    crosshair.style should contain(StrokeType.DASH)
  }
}

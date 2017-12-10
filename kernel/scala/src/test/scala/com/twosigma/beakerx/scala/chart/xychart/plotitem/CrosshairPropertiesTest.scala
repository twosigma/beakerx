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
import org.assertj.core.api.Assertions._
import org.junit.Test

class CrosshairPropertiesTest {
  @Test def color(): Unit = {
    val crosshair = new Crosshair()

    assertThat(crosshair.color.isDefined).isFalse
    crosshair.color = Color.green
    assertThat(crosshair.color.get).isEqualTo(Color.green)
  }

  @Test def width(): Unit = {
    val crosshair = new Crosshair()

    assertThat(crosshair.width.isDefined).isFalse
    crosshair.width = 4.2f
    assertThat(crosshair.width.get).isEqualTo(4.2f)
  }

  @Test def style(): Unit = {
    val crosshair = new Crosshair()

    assertThat(crosshair.style.isDefined).isFalse
    crosshair.style = StrokeType.DASH
    assertThat(crosshair.style.get).isEqualTo(StrokeType.DASH)
  }
}

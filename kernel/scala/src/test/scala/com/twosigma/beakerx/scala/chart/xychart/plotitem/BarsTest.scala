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
import org.assertj.core.api.Assertions
import org.junit.Test

class BarsTest {
  @Test
  @throws[Exception]
  def widthsEmpty(): Unit = {
    val bars = new Bars()

    Assertions.assertThat(bars.widths.isEmpty).isTrue
  }

  @Test
  @throws[Exception]
  def widths(): Unit = {
    val bars = new Bars()

    bars.width = List(1, 2, 3)
    Assertions.assertThat[Number](bars.getWidths).containsExactly(1, 2, 3)
    bars.width = Array(1.0, 3.0)
    Assertions.assertThat[Number](bars.getWidths).containsExactly(1.0, 3.0)
  }

  @Test
  @throws[Exception]
  def widthEmpty(): Unit = {
    val bars = new Bars()

    Assertions.assertThat(bars.width.isDefined).isFalse
  }

  @Test
  @throws[Exception]
  def width(): Unit = {
    val bars = new Bars()

    bars.width = 2.5
    Assertions.assertThat(bars.width.get).isEqualTo(2.5f)
  }

  @Test
  @throws[Exception]
  def outlineColor(): Unit = {
    val bars = new Bars()

    Assertions.assertThat(bars.outlineColor.isDefined).isFalse
    bars.outlineColor = Color.RED
    Assertions.assertThat(bars.outlineColor.get).isEqualTo(Color.RED)
  }

  @Test
  @throws[Exception]
  def outlineColors(): Unit = {
    val bars = new Bars()

    Assertions.assertThat(bars.outlineColors.isEmpty).isTrue
    bars.outlineColor = Seq(Color.RED, Color.GREEN)
    Assertions.assertThat(bars.outlineColors.toArray).containsExactly(Color.RED, Color.GREEN)
  }
}
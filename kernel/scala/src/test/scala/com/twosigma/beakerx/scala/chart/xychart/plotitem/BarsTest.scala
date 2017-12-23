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

class BarsTest {
  @Test
  @throws[Exception]
  def widthsEmpty(): Unit = {
    val bars = new Bars()

    bars.widths shouldBe empty
  }

  @Test
  @throws[Exception]
  def widths(): Unit = {
    val bars = new Bars()

    bars.width = List(1, 2, 3)
    bars.widths should equal (Seq(1, 2, 3))
    bars.width = Array(1.0, 3.0)
    bars.widths should equal (Seq(1, 3))
  }

  @Test
  @throws[Exception]
  def widthEmpty(): Unit = {
    val bars = new Bars()

    bars.width shouldBe empty
  }

  @Test
  @throws[Exception]
  def width(): Unit = {
    val bars = new Bars()

    bars.width = 2.5
    bars.width should contain(2.5)
  }

  @Test
  @throws[Exception]
  def outlineColor(): Unit = {
    val bars = new Bars()

    bars.outlineColor shouldBe empty
    bars.outlineColor = Color.RED
    bars.outlineColor should contain(Color.RED)
  }

  @Test
  @throws[Exception]
  def outlineColors(): Unit = {
    val bars = new Bars()

    bars.outlineColors shouldBe empty
    bars.outlineColor = Seq(Color.RED, Color.GREEN)
    bars.outlineColors shouldBe Seq(Color.RED, Color.GREEN)
  }
}
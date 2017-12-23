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
package com.twosigma.beakerx.scala.chart.categoryplot.plotitem

import com.twosigma.beakerx.chart.Color
import org.junit.Test
import org.scalatest.Matchers._

class CategoryBarsPropertiesTest {

  @Test
  def drawOutline(): Unit = {
    val categoryBars = new CategoryBars

    categoryBars.drawOutline shouldBe false
    categoryBars.drawOutline = true
    categoryBars.drawOutline shouldBe true

    categoryBars.drawOutlines shouldBe empty

    categoryBars.drawOutline = Seq(true, false, true)
    categoryBars.drawOutlines shouldBe Seq(true, false, true)
  }

  @Test
  def fill(): Unit = {
    val categoryBars = new CategoryBars

    categoryBars.fill shouldBe empty
    categoryBars.fill = false
    categoryBars.fill should contain(false)

    categoryBars.fills shouldBe empty
    categoryBars.fill = Seq(true, false, true)
    categoryBars.fills shouldBe Seq(true, false, true)
  }

  @Test
  def outlineColor(): Unit = {
    val categoryBars = new CategoryBars

    categoryBars.outlineColor shouldBe empty
    categoryBars.outlineColor = Color.blue
    categoryBars.outlineColor should contain(Color.blue)

    categoryBars.outlineColors shouldBe empty
    categoryBars.outlineColor = Array(Color.red, Color.green, Color.blue)
    categoryBars.outlineColors shouldBe Seq(Color.red, Color.green, Color.blue)
  }

  @Test
  def width(): Unit = {
    val categoryBars = new CategoryBars

    categoryBars.width shouldBe empty
    categoryBars.width = 22
    categoryBars.width should contain(22)

    categoryBars.widths shouldBe empty
    categoryBars.width = Array(2, 4, 6)
    categoryBars.widths shouldBe Seq(2, 4, 6)

    categoryBars.width = 1 to 3
    categoryBars.widths shouldBe Seq(1, 2, 3)
  }
}

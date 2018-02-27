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

class CategoryAreaPropertiesTest {
  @Test
  def drawOutline(): Unit = {
    val categoryArea = new CategoryArea

    categoryArea.drawOutline shouldBe false
    categoryArea.drawOutline = true
    categoryArea.drawOutline shouldBe true

    categoryArea.drawOutlines shouldBe empty

    categoryArea.drawOutline = Seq(true, false, true)
    categoryArea.drawOutlines shouldBe Seq(true, false, true)
  }

  @Test
  def fill(): Unit = {
    val categoryArea = new CategoryArea

    categoryArea.fill shouldBe empty
    categoryArea.fill = false
    categoryArea.fill should contain(false)

    categoryArea.fills shouldBe empty
    categoryArea.fill = Seq(true, false, true)
    categoryArea.fills shouldBe Seq(true, false, true)
  }

  @Test
  def outlineColor(): Unit = {
    val categoryArea = new CategoryArea

    categoryArea.outlineColor shouldBe empty
    categoryArea.outlineColor = Color.blue
    categoryArea.outlineColor should contain(Color.blue)

    categoryArea.outlineColors shouldBe empty
    categoryArea.outlineColor = Array(Color.red, Color.green, Color.blue)
    categoryArea.outlineColors shouldBe Seq(Color.red, Color.green, Color.blue)

    assertTypeError("categoryArea.outlineColor = Array(categoryArea)")
  }

  @Test
  def width(): Unit = {
    val categoryArea = new CategoryArea

    categoryArea.width shouldBe empty
    categoryArea.width = 22
    categoryArea.width should contain(22)

    categoryArea.widths shouldBe empty
    categoryArea.width = Array(2, 4, 6)
    categoryArea.widths shouldBe Seq(2, 4, 6)

    categoryArea.width = 1 to 3
    categoryArea.widths shouldBe Seq(1, 2, 3)
  }
}

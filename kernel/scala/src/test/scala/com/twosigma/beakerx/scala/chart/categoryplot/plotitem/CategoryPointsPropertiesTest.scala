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
import com.twosigma.beakerx.chart.xychart.plotitem.ShapeType
import org.junit.Test
import org.scalatest.Matchers._

class CategoryPointsPropertiesTest {
  @Test
  def fill(): Unit = {
    val catPoints = new CategoryPoints

    catPoints.fill shouldBe empty
    catPoints.fill = true
    catPoints.fill should contain(true)

    catPoints.fills shouldBe empty
    catPoints.fill = Array(true, false, true)
    catPoints.fills shouldEqual Seq(true, false, true)
  }

  @Test
  def outlineColor(): Unit = {
    val catPoints = new CategoryPoints

    catPoints.outlineColor shouldBe empty
    catPoints.outlineColor = Color.blue
    catPoints.outlineColor should contain(Color.blue)

    catPoints.outlineColors shouldBe empty
    catPoints.outlineColor = Array(Color.red, Color.green, Color.blue)
    catPoints.outlineColors shouldEqual Seq(Color.red, Color.green, Color.blue)

    assertTypeError("catPoints.outlineColor = Array(catPoints)")
  }

  @Test
  def shape(): Unit = {
    val catPoints = new CategoryPoints

    catPoints.shape shouldBe catPoints.getShape
    catPoints.shape = ShapeType.CIRCLE
    catPoints.shape shouldBe ShapeType.CIRCLE

    catPoints.shapes shouldBe empty
    catPoints.shape = Array(ShapeType.DIAMOND, ShapeType.SQUARE, ShapeType.TRIANGLE)
    catPoints.shapes shouldEqual Seq(ShapeType.DIAMOND, ShapeType.SQUARE, ShapeType.TRIANGLE)
  }

  @Test
  def sizes(): Unit = {
    val catPoints = new CategoryPoints

    catPoints.size shouldBe catPoints.getSize
    catPoints.size = 22
    catPoints.size shouldEqual  22

    catPoints.sizes shouldBe empty
    catPoints.size = Array(2, 4, 6)
    catPoints.sizes shouldBe Seq(2, 4, 6)

    catPoints.size = 1 to 3
    catPoints.sizes shouldBe Seq(1, 2, 3)
  }

}

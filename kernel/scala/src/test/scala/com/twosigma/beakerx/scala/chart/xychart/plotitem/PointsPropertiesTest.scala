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
import com.twosigma.beakerx.chart.xychart.plotitem.ShapeType
import org.junit.Test
import org.scalatest.Matchers._

class PointsPropertiesTest {
  @Test
  def shape(): Unit = {
    val points = new Points

    points.shape shouldBe points.getShape
    points.shape = ShapeType.CIRCLE
    points.shape shouldBe ShapeType.CIRCLE

    points.shapes shouldBe empty
    points.shape = Array(ShapeType.DIAMOND, ShapeType.SQUARE, ShapeType.TRIANGLE)
    points.shapes shouldEqual Seq(ShapeType.DIAMOND, ShapeType.SQUARE, ShapeType.TRIANGLE)
  }

  @Test
  def fill(): Unit = {
    val points = new Points

    points.fill shouldBe empty
    points.fill = true
    points.fill should contain(true)

    points.fills shouldBe empty
    points.fill = Array(true, false, true)
    points.fills shouldEqual Seq(true, false, true)
  }

  @Test
  def size(): Unit = {
    val points = new Points

    points.size shouldBe points.getSize
    points.size = 22
    points.size shouldEqual  22

    points.sizes shouldBe empty
    points.size = Array(2, 4, 6)
    points.sizes shouldBe Seq(2, 4, 6)

    points.size = 1 to 3
    points.sizes shouldBe Seq(1, 2, 3)
  }

  @Test
  def outlineColor(): Unit = {
    val points = new Points

    points.outlineColor shouldBe empty
    points.outlineColor = Color.blue
    points.outlineColor should contain(Color.blue)

    points.outlineColors shouldBe empty
    points.outlineColor = Array(Color.red, Color.green, Color.blue)
    points.outlineColors shouldEqual Seq(Color.red, Color.green, Color.blue)

    assertTypeError("points.outlineColor = Array(points)")
  }
}

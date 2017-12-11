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
import org.assertj.core.api.Assertions
import org.junit.Test

import scala.collection.JavaConverters._

class CategoryPointsPropertiesTest {
  @Test
  def fill(): Unit = {
    val catPoints = new CategoryPoints

    Assertions.assertThat(catPoints.fill.isEmpty).isTrue
    catPoints.fill = true
    Assertions.assertThat(catPoints.fill).isEqualTo(Some(true))

    Assertions.assertThat(catPoints.fills.isEmpty).isTrue
    catPoints.fill = Array(true, false, true)
    Assertions.assertThat[Boolean](catPoints.fills.asJava).containsExactly(true, false, true)
  }

  @Test
  def outlineColor(): Unit = {
    val catPoints = new CategoryPoints

    Assertions.assertThat(catPoints.outlineColor.isDefined).isFalse
    catPoints.outlineColor = Color.blue
    Assertions.assertThat(catPoints.outlineColor.get).isEqualTo(Color.blue)

    Assertions.assertThat(catPoints.outlineColors.isEmpty).isTrue
    catPoints.outlineColor = Array(Color.red, Color.green, Color.blue)
    Assertions.assertThat[Object](catPoints.outlineColors.asJava).containsExactly(Color.red, Color.green, Color.blue)
  }

  @Test
  def shape(): Unit = {
    val catPoints = new CategoryPoints

    Assertions.assertThat(catPoints.shape).isEqualTo(catPoints.getShape)
    catPoints.shape = ShapeType.CIRCLE
    Assertions.assertThat(catPoints.shape).isEqualTo(ShapeType.CIRCLE)

    Assertions.assertThat[ShapeType](catPoints.shapes.asJava).isEmpty()
    catPoints.shape = Array(ShapeType.DIAMOND, ShapeType.SQUARE, ShapeType.TRIANGLE)
    Assertions.assertThat[ShapeType](catPoints.shapes.asJava).containsExactly(ShapeType.DIAMOND, ShapeType.SQUARE, ShapeType.TRIANGLE)
  }

  @Test
  def sizes(): Unit = {
    val catPoints = new CategoryPoints

    Assertions.assertThat(catPoints.size).isEqualTo(catPoints.getSize)
    catPoints.size = 22
    Assertions.assertThat(catPoints.size).isEqualTo(22.0f)

    Assertions.assertThat(catPoints.sizes.isEmpty).isTrue
    catPoints.size = Array(2, 4, 6)
    Assertions.assertThat[Number](catPoints.sizes.asJava).containsExactly(2, 4, 6)

    catPoints.size = 1 to 3
    Assertions.assertThat[Number](catPoints.sizes.asJava).containsExactly(1, 2, 3)
  }

}

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
import org.assertj.core.api.Assertions
import org.junit.Test

import scala.collection.JavaConverters._

class CategoryAreaPropertiesTest {
  @Test
  def drawOutline(): Unit = {
    val categoryArea = new CategoryArea

    Assertions.assertThat(categoryArea.drawOutline).isFalse
    categoryArea.drawOutline = true
    Assertions.assertThat(categoryArea.drawOutline).isTrue

    Assertions.assertThat(categoryArea.drawOutlines.isEmpty).isTrue

    categoryArea.drawOutline = Seq(true, false, true)
    Assertions.assertThat[Boolean](categoryArea.drawOutlines.asJava).containsExactly(true, false, true)
  }

  @Test
  def fill(): Unit = {
    val categoryArea = new CategoryArea

    Assertions.assertThat(categoryArea.fill.isDefined).isFalse
    categoryArea.fill = false
    Assertions.assertThat(categoryArea.fill.get).isFalse

    Assertions.assertThat(categoryArea.fills.isEmpty).isTrue
    categoryArea.fill = Seq(true, false, true)
    Assertions.assertThat[Boolean](categoryArea.fills.asJava).containsExactly(true, false, true)
  }

  @Test
  def outlineColor(): Unit = {
    val categoryArea = new CategoryArea

    Assertions.assertThat(categoryArea.outlineColor.isDefined).isFalse
    categoryArea.outlineColor = Color.blue
    Assertions.assertThat(categoryArea.outlineColor.get).isEqualTo(Color.blue)

    Assertions.assertThat(categoryArea.outlineColors.isEmpty).isTrue
    categoryArea.outlineColor = Array(Color.red, Color.green, Color.blue)
    Assertions.assertThat[Object](categoryArea.outlineColors.asJava).containsExactly(Color.red, Color.green, Color.blue)
  }

  @Test
  def width(): Unit = {
    val categoryArea = new CategoryArea

    Assertions.assertThat(categoryArea.width.isDefined).isFalse
    categoryArea.width = 22
    Assertions.assertThat(categoryArea.width.get).isEqualTo(22.0f)

    Assertions.assertThat(categoryArea.widths.isEmpty).isTrue
    categoryArea.width = Array(2, 4, 6)
    Assertions.assertThat[Number](categoryArea.widths.asJava).containsExactly(2, 4, 6)

    categoryArea.width = 1 to 3
    Assertions.assertThat[Number](categoryArea.widths.asJava).containsExactly(1, 2, 3)
  }
}

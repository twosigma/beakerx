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

class CategoryBarsPropertiesTest {

  @Test
  def drawOutline(): Unit = {
    val categoryBars = new CategoryBars

    Assertions.assertThat(categoryBars.drawOutline).isFalse
    categoryBars.drawOutline = true
    Assertions.assertThat(categoryBars.drawOutline).isTrue

    Assertions.assertThat(categoryBars.drawOutlines.isEmpty).isTrue

    categoryBars.drawOutline = Seq(true, false, true)
    Assertions.assertThat[Boolean](categoryBars.drawOutlines.asJava).containsExactly(true, false, true)
  }

  @Test
  def fill(): Unit = {
    val categoryBars = new CategoryBars

    Assertions.assertThat(categoryBars.fill.isDefined).isFalse
    categoryBars.fill = false
    Assertions.assertThat(categoryBars.fill.get).isFalse

    Assertions.assertThat(categoryBars.fills.isEmpty).isTrue
    categoryBars.fill = Seq(true, false, true)
    Assertions.assertThat[Boolean](categoryBars.fills.asJava).containsExactly(true, false, true)
  }

  @Test
  def outlineColor(): Unit = {
    val categoryBars = new CategoryBars

    Assertions.assertThat(categoryBars.outlineColor.isDefined).isFalse
    categoryBars.outlineColor = Color.blue
    Assertions.assertThat(categoryBars.outlineColor.get).isEqualTo(Color.blue)

    Assertions.assertThat(categoryBars.outlineColors.isEmpty).isTrue
    categoryBars.outlineColor = Array(Color.red, Color.green, Color.blue)
    Assertions.assertThat[Object](categoryBars.outlineColors.asJava).containsExactly(Color.red, Color.green, Color.blue)
  }

  @Test
  def width(): Unit = {
    val categoryBars = new CategoryBars

    Assertions.assertThat(categoryBars.width.isDefined).isFalse
    categoryBars.width = 22
    Assertions.assertThat(categoryBars.width.get).isEqualTo(22.0f)

    Assertions.assertThat(categoryBars.widths.isEmpty).isTrue
    categoryBars.width = Array(2, 4, 6)
    Assertions.assertThat[Number](categoryBars.widths.asJava).containsExactly(2, 4, 6)

    categoryBars.width = 1 to 3
    Assertions.assertThat[Number](categoryBars.widths.asJava).containsExactly(1, 2, 3)
  }
}

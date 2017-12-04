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

import com.twosigma.beakerx.chart.xychart.plotitem.StrokeType
import org.assertj.core.api.Assertions
import org.junit.Test

import scala.collection.JavaConverters._

class CategoryLinesPropertiesTest {
  @Test
  def style(): Unit = {
    import StrokeType._

    val lines = new CategoryLines

    Assertions.assertThat(lines.style).isEqualTo(lines.getStyle)

    Assertions.assertThat(lines.styles.isEmpty).isTrue

    lines.style = LONGDASH
    Assertions.assertThat(lines.style).isEqualTo(LONGDASH)

    lines.style = Array(DASH, DOT, SOLID)
    Assertions.assertThat[StrokeType](lines.styles.asJava).containsExactly(DASH, DOT, SOLID)
  }

  @Test
  def width(): Unit = {
    val lines = new CategoryLines

    Assertions.assertThat(lines.width).isEqualTo(lines.getWidth)
    lines.width = 21
    Assertions.assertThat(lines.width).isEqualTo(21.0f)
  }
}
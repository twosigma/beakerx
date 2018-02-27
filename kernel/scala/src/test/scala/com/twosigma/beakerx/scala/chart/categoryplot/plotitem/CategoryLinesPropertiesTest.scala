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
import org.junit.Test
import org.scalatest.Matchers._

class CategoryLinesPropertiesTest {
  @Test
  def style(): Unit = {
    import StrokeType._

    val lines = new CategoryLines

    lines.style shouldBe lines.getStyle
    lines.styles shouldBe empty

    lines.style = LONGDASH
    lines.style shouldBe LONGDASH

    lines.style = Array(DASH, DOT, SOLID)
    lines.styles shouldBe Seq(DASH, DOT, SOLID)
  }

  @Test
  def width(): Unit = {
    val lines = new CategoryLines

    lines.width shouldBe lines.getWidth
    lines.width = 21
    lines.width shouldBe 21
  }
}
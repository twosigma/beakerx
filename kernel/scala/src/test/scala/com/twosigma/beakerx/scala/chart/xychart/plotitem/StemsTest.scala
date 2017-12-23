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

import com.twosigma.beakerx.chart.xychart.plotitem.StrokeType
import org.junit.Test
import org.scalatest.Matchers._

class StemsTest {
  @Test
  @throws[Exception]
  def style(): Unit = {
    val stems = new Stems()

    stems.style should (not be null and be(stems.getStyle))
    stems.style = StrokeType.DOT
    stems.style shouldBe StrokeType.DOT
  }

  @Test
  @throws[Exception]
  def styles(): Unit = {
    val stems = new Stems()

    stems.styles shouldBe empty
    stems.style = Array(StrokeType.DOT, StrokeType.DASH)
    stems.styles shouldBe Seq(StrokeType.DOT, StrokeType.DASH)
  }

  @Test
  @throws[Exception]
  def width(): Unit = {
    val stems = new Stems()

    stems.width should (not be null and be(stems.getWidth))
    stems.width = 42
    stems.width shouldBe 42
  }
}
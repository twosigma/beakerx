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

class CategoryStemsPropertiesTest {
  @Test
  def style(): Unit = {
    import StrokeType._

    val stems = new CategoryStems

    stems.style shouldBe stems.getStyle
    stems.styles shouldBe empty

    stems.style = LONGDASH

    stems.style shouldBe LONGDASH

    stems.style = Array(DASH, DOT, SOLID)
    stems.styles shouldBe Seq(DASH, DOT, SOLID)
  }
}
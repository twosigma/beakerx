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

import com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryGraphics
import org.junit.Test
import org.scalatest.Matchers._

class CategoryGraphicsPropertiesTest {
  @Test
  @throws[Exception]
  def value_assignment(): Unit = {
    val cg = new CategoryGraphics with CategoryGraphicsProperties {}

    cg.value = Array(1, 2, 3)
    cg.value shouldBe Seq(Seq(1, 2, 3))
    cg.value = Seq(1, 3, 6, 7)
    cg.value shouldBe Seq(Seq(1, 3, 6, 7))
    cg.value = 1 to 3
    cg.value shouldBe Seq(Seq(1, 2, 3))
    cg.value = Seq(1 to 3, 2 to 4, 3 to 5)
    cg.value shouldBe Seq(Seq(1, 2, 3), Seq(2, 3, 4), Seq(3, 4, 5))
    cg.value = Seq(Array(1.0), Array(2.0), Array(3.0))
    cg.value shouldBe Seq(Seq(1), Seq(2), Seq(3))
    cg.value = Array(1 to 3, 2 to 4, 3 to 5)
    cg.value shouldBe Seq(Seq(1, 2, 3), Seq(2, 3, 4), Seq(3, 4, 5))
  }
}

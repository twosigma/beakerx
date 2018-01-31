/*
 * Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import org.junit.Test
import org.scalatest.Matchers._

class YAxisPropertiesTest {
  @Test
  def properties(): Unit = {
    val y = new YAxis

    assume(y.getAutoRange == true)
    y.autoRange shouldBe true
    y.autoRange = false
    y.autoRange shouldBe false

    assume(y.getAutoRangeIncludesZero == false)
    y.autoRangeIncludesZero shouldBe false
    y.autoRangeIncludesZero = true
    y.autoRangeIncludesZero shouldBe true

    y.label shouldBe ""
    y.label = "label"
    y.label shouldBe "label"

    assume(y.getLog == false)
    y.log shouldBe false
    y.log = true
    y.log shouldBe true

    assume(y.getLogBase == 10)
    y.logBase shouldBe 10
    y.logBase = 2
    y.logBase shouldBe 2

    y.bound shouldBe (0, 0)
    y.bound = (10, 100)
    y.bound shouldBe (10, 100)
    y.lowerBound shouldBe 10
    y.upperBound shouldBe 100

    assume(y.getLowerMargin == 0)
    y.lowerMargin shouldBe 0
    y.lowerMargin = 10
    y.lowerMargin shouldBe 10

    assume(y.getUpperMargin == 0)
    y.upperMargin shouldBe 0
    y.upperMargin = 20
    y.upperMargin shouldBe 20
  }

  @Test
  def wrapper(): Unit = {
    val rawY = new com.twosigma.beakerx.chart.xychart.plotitem.YAxis()
    val y = new YAxisWrapper(rawY)

    assume(rawY.getAutoRange == true)
    y.autoRange shouldBe true
    y.autoRange = false
    y.autoRange shouldBe false

    assume(rawY.getAutoRangeIncludesZero == false)
    y.autoRangeIncludesZero shouldBe false
    y.autoRangeIncludesZero = true
    y.autoRangeIncludesZero shouldBe true

    y.label shouldBe ""
    y.label = "label"
    y.label shouldBe "label"

    assume(rawY.getLog == false)
    y.log shouldBe false
    y.log = true
    y.log shouldBe true

    assume(rawY.getLogBase == 10)
    y.logBase shouldBe 10
    y.logBase = 2
    y.logBase shouldBe 2

    y.bound shouldBe (0, 0)
    y.bound = (10, 100)
    y.bound shouldBe (10, 100)
    y.lowerBound shouldBe 10
    y.upperBound shouldBe 100

    assume(rawY.getLowerMargin == 0)
    y.lowerMargin shouldBe 0
    y.lowerMargin = 10
    y.lowerMargin shouldBe 10

    assume(rawY.getUpperMargin == 0)
    y.upperMargin shouldBe 0
    y.upperMargin = 20
    y.upperMargin shouldBe 20
  }
}

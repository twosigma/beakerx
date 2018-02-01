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

import java.time.Instant

import com.twosigma.beakerx.chart.Color
import org.junit.Test
import org.scalatest.Matchers._

class ConstantBandPropertiesTest {
  @Test
  def color(): Unit = {
    val cb = new ConstantBand

    cb.color shouldBe empty
    cb.color = Color.YELLOW
    cb.color should contain(Color.YELLOW)
  }

  @Test
  def x(): Unit = {
    val cb = new ConstantBand

    cb.x shouldBe empty
    cb.x = Array(1, 2, 3)
    cb.x shouldBe Seq(1, 2, 3)
    cb.x = 1 to 3
    cb.x shouldBe Seq(1, 2, 3)
    val instant = Instant.now()
    cb.x = Array(instant)
    cb.x shouldBe Seq(instant.toEpochMilli)

    assertTypeError("cb.x = Seq(true, false, false)")
  }

  @Test
  def y(): Unit = {
    val cb = new ConstantBand

    cb.y shouldBe empty
    cb.y = Array(1, 2, 3)
    cb.y shouldBe Seq(1, 2, 3)
    cb.y = Seq(1.0, 2.0, 3.0)
    cb.y shouldBe Seq(1, 2, 3)
    cb.y = 1 to 3
    cb.y shouldBe Seq(1, 2, 3)
  }
}
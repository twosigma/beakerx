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
import java.util

import com.twosigma.beakerx.chart.xychart.plotitem.XYGraphics
import com.twosigma.beakerx.chart.{Color, Filter}
import org.junit.Test
import org.scalatest.Matchers._

class XYGraphicsPropertiesTest {
  class XYGTest extends XYGraphics with XYGraphicsProperties {
    override protected def getPossibleFilters: util.EnumSet[Filter] = ???
  }

  @Test
  def color(): Unit = {
    val xyg = new XYGTest

    xyg.color shouldBe empty
    xyg.color = Color.RED
    xyg.color should contain(Color.RED)
    xyg.colors shouldBe empty
    xyg.color = Array(Color.RED, Color.GREEN, Color.BLUE)
    xyg.colors shouldBe Seq(Color.RED, Color.GREEN, Color.BLUE)
  }

  @Test
  def displayName(): Unit = {
    val xyg = new XYGTest

    xyg.displayName = "name"
    xyg.displayName shouldBe "name"
  }

  @Test
  def toolTip(): Unit = {
    val xyg = new XYGTest

    xyg.toolTip shouldBe empty
    xyg.toolTip = Array("good", "bad", "ugly")
    xyg.toolTip shouldBe Seq("good", "bad", "ugly")
  }

  @Test
  def x(): Unit = {
    val xyg = new XYGTest

    xyg.x shouldBe empty
    xyg.x = 1 to 3
    xyg.x shouldBe Seq(1, 2, 3)
    xyg.x = Seq(1, 2, 3)
    xyg.x shouldBe Seq(1, 2, 3)
    xyg.x = Array(1, 2, 3)
    xyg.x shouldBe Seq(1, 2, 3)
    val instant = Instant.now()
    xyg.x = Array(instant)
    xyg.x shouldBe Seq(instant.toEpochMilli)
  }

  @Test
  def y(): Unit = {
    val xyg = new XYGTest

    xyg.y shouldBe empty
    xyg.y = Array(1, 2, 3)
    xyg.y shouldBe Seq(1, 2, 3)
    xyg.y = Seq(1.0, 2.0, 3.0)
    xyg.y shouldBe Seq(1, 2, 3)
    xyg.y = 1 to 3
    xyg.y shouldBe Seq(1, 2, 3)
  }
}

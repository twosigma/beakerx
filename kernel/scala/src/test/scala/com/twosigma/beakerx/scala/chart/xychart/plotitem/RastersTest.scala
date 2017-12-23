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

import org.junit.Test
import org.scalatest.Matchers._

class RastersTest {
  @Test
  @throws[Exception]
  def height(): Unit = {
    val rasters = new Rasters()

    rasters.height shouldBe empty
    rasters.height = 1 to 3
    rasters.height shouldBe Seq(1, 2, 3)
  }

  @Test
  @throws[Exception]
  def width(): Unit = {
    val rasters = new Rasters()

    rasters.width shouldBe empty
    rasters.width = 1 to 3
    rasters.width shouldBe Seq(1, 2, 3)
  }

  @Test
  @throws[Exception]
  def opacity(): Unit = {
    val rasters = new Rasters()

    // opacity requires width to be set
    rasters.width = Array.fill(3)(100)
    assume(rasters.width.nonEmpty)
    rasters.opacity should have length 3
    rasters.opacity = 1 to 3
    rasters.opacity shouldBe Seq(1, 2, 3)
  }

  @Test
  @throws[Exception]
  def dataString(): Unit = {
    val data = new Array[Byte](100)
    scala.util.Random.nextBytes(data)

    val rasters = new Rasters()
    rasters.dataString = data

    rasters.dataString shouldBe data
  }

}
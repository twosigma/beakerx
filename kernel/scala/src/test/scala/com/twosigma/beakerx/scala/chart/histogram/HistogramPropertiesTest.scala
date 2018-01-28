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
package com.twosigma.beakerx.scala.chart.histogram

import com.twosigma.beakerx.KernelTest
import com.twosigma.beakerx.chart.Color
import com.twosigma.beakerx.kernel.KernelManager
import org.junit.Test
import org.scalatest.Matchers._

class HistogramPropertiesTest {
  @Test
  def gettersAndSetters(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val histogram = new Histogram

    histogram.binCount shouldBe 0
    histogram.binCount = 10
    histogram.binCount shouldBe 10

    histogram.color shouldBe empty
    histogram.color = Color.GREEN
    histogram.color should contain(Color.GREEN)
    histogram.colors shouldBe empty
    histogram.color = Array(Color.RED, Color.GREEN, Color.BLUE)
    histogram.colors shouldBe Seq(Color.RED, Color.GREEN, Color.BLUE)

    histogram.cumulative shouldBe false
    histogram.cumulative = true
    histogram.cumulative shouldBe true

    histogram.displayMode shouldBe Histogram.DisplayMode.OVERLAP
    histogram.displayMode = Histogram.DisplayMode.SIDE_BY_SIDE
    histogram.displayMode shouldBe Histogram.DisplayMode.SIDE_BY_SIDE

    histogram.log shouldBe false
    histogram.log = true
    histogram.log shouldBe true

    histogram.names shouldBe empty
    histogram.names = Array("first", "second", "third")
    histogram.names shouldBe Seq("first", "second", "third")

    histogram.normed shouldBe false
    histogram.normed = true
    histogram.normed shouldBe true

    histogram.rangeMin shouldBe empty
    histogram.rangeMin = 10
    histogram.rangeMin should contain(10)

    histogram.rangeMax shouldBe empty
    histogram.rangeMax = 20
    histogram.rangeMax should contain(20)

    histogram.rightClose shouldBe false
    histogram.rightClose = true
    histogram.rightClose shouldBe true
  }

  @Test
  def data(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val histogram = new Histogram

    histogram.data shouldBe empty
    histogram.listData shouldBe empty

    histogram.data = 1 to 10
    histogram.data shouldBe (1 to 10)

    histogram.data = Array(1 to 3, 10 to 30, 100 to 300)
    histogram.listData should have length 3
    histogram.listData(0) shouldBe (1 to 3)
    histogram.listData(1) shouldBe (10 to 30)
    histogram.listData(2) shouldBe (100 to 300)
  }
}

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
package com.twosigma.beakerx.scala.chart.heatmap

import com.twosigma.beakerx.KernelTest
import com.twosigma.beakerx.chart.GradientColor
import com.twosigma.beakerx.kernel.KernelManager
import org.junit.Test
import org.scalatest.Matchers._

class HeatMapPropertiesTest {
  @Test
  def color(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val hm = new HeatMap

    assume(hm.getColor == GradientColor.BROWN_RED_YELLOW)
    hm.color shouldBe hm.getColor
    hm.color = GradientColor.WHITE_BLUE
    hm.color shouldBe GradientColor.WHITE_BLUE
  }

  @Test
  def data(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val hm = new HeatMap

    hm.data shouldBe empty
    hm.data = Array((1 to 10).toArray, (11 to 20).toArray, (21 to 30).toArray)
    hm.data should have length 3
    hm.data(0) shouldBe (1 to 10)
    hm.data(1) shouldBe (11 to 20)
    hm.data(2) shouldBe (21 to 30)

    assertCompiles("hm.data = Array(Seq(1, 2, 3), Seq(4, 5, 6))")

    assertTypeError("hm.data = Array(1, 2, 3)")
    assertTypeError("hm.data = Array(Seq(hm))")
  }
}

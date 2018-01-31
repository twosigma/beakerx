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
package com.twosigma.beakerx.scala.chart.xychart

import com.twosigma.beakerx.KernelTest
import com.twosigma.beakerx.kernel.KernelManager
import org.junit.Test
import org.scalatest.Matchers._

class TimePlotPropertiesTest {
  @Test
  def xbound(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val plot = new TimePlot()

    val d0 = java.util.Date.from(java.time.Instant.parse("1963-11-22T18:30:00Z"))
    val d1 = java.util.Date.from(java.time.Instant.parse("1974-08-09T16:00:00Z"))

    plot.xBound = (d0, d1)
    plot.xLowerBound shouldBe d0.getTime
    plot.xUpperBound shouldBe d1.getTime
  }
}

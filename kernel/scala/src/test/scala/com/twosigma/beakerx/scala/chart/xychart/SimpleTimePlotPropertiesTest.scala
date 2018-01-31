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
import com.twosigma.beakerx.chart.Color
import com.twosigma.beakerx.kernel.KernelManager
import org.junit.Test
import org.scalatest.Matchers._

class SimpleTimePlotPropertiesTest {
  @Test
  def gettersAndSetters(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val plot = new SimpleTimePlot

    plot.colors shouldBe empty
    plot.colors = Array(Color.RED, Color.GREEN, Color.BLUE)
    plot.colors shouldBe Seq(Color.RED, Color.GREEN, Color.BLUE)

    plot.columns shouldBe empty
    plot.columns = Array("this", "that", "other")
    plot.columns should be(Seq("this", "that", "other"))

    assume(plot.isDisplayLines == true)
    plot.displayLines shouldBe true
    plot.displayLines = false
    plot.displayLines shouldBe false

    plot.displayNames shouldBe empty
    plot.displayNames = Array("one", "two", "three")
    plot.displayNames should be(Seq("one", "two", "three"))

    assume(plot.isDisplayPoints == false)
    plot.displayPoints shouldBe false
    plot.displayPoints = true
    plot.displayPoints shouldBe true

    assume(plot.getTimeColumn equals "time")
    plot.timeColumn shouldBe "time"
    plot.timeColumn = "Doric"
    plot.timeColumn shouldBe "Doric"
  }

  @Test
  def data(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val plot = new SimpleTimePlot

    plot.data shouldBe empty

    val d1 = Map("this" -> 3.0, "that" -> 4.0)
    val d2 = Map("this" -> 88.0, "that" -> 42.0)

    plot.data = Array(d1, d2)
    plot.data.map(_("this")) shouldBe Seq(3.0, 88.0)
    plot.data.map(_("that")) shouldBe Seq(4.0, 42.0)
  }
}

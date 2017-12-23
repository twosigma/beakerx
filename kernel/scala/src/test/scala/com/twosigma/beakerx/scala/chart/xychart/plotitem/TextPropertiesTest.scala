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

import com.twosigma.beakerx.chart.Color
import org.junit.Test
import org.scalatest.Matchers._

class TextPropertiesTest {

  @Test
  def color(): Unit = {
    val text = new Text()

    text.color shouldBe empty

    text.color = Color.blue
    text.color should contain(Color.blue)
  }

  @Test
  def pointerAngle(): Unit = {
    val text = new Text()

    text.pointerAngle shouldBe text.getPointerAngle
    text.pointerAngle = 4.2
    text.pointerAngle shouldBe 4.2
  }

  @Test
  def showPointer(): Unit = {
    val text = new Text()

    text.showPointer shouldBe true
    text.showPointer = false
    text.showPointer shouldBe false
  }

  @Test
  def size(): Unit = {
    val text = new Text()

    text.size shouldBe text.getSize
    text.size = 22
    text.size shouldBe 22
  }

  @Test
  def text(): Unit = {
    val text = new Text()

    text.text shouldBe empty
    text.text = "Hello, world!"
    text.text shouldBe "Hello, world!"
  }

  @Test
  def x(): Unit = {
    val text = new Text()

    text.x shouldBe text.getX
    text.x = 33
    text.x shouldBe 33
  }

  @Test
  def y() : Unit = {
    val text = new Text()

    text.y shouldBe text.getY
    text.y = 11
    text.y shouldBe 11
  }
}

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
import org.assertj.core.api.Assertions._
import org.junit.Test

class TextPropertiesTest {

  @Test
  def color(): Unit = {
    val text = new Text()

    assertThat(text.color.isEmpty).isTrue

    text.color = Color.blue
    assertThat(text.color.get).isEqualTo(Color.blue)
  }

  @Test
  def pointerAngle(): Unit = {
    val text = new Text()

    assertThat(text.pointerAngle).isEqualTo(text.getPointerAngle)
    text.pointerAngle = 4.2
    assertThat(text.pointerAngle).isEqualTo(4.2)
  }

  @Test
  def showPointer(): Unit = {
    val text = new Text()

    assertThat(text.showPointer).isTrue
    text.showPointer = false
    assertThat(text.showPointer).isFalse
  }

  @Test
  def size(): Unit = {
    val text = new Text()

    assertThat(text.size).isEqualTo(text.getSize)
    text.size = 22
    assertThat(text.size).isEqualTo(22)
  }

  @Test
  def text(): Unit = {
    val text = new Text()

    assertThat(text.text).isEmpty()
    text.text = "Hello, world!"
    assertThat(text.text).isEqualTo("Hello, world!")
  }

  @Test
  def x(): Unit = {
    val text = new Text()

    assertThat(text.x).isEqualTo(text.getX)
    text.x = 33
    assertThat(text.x).isEqualTo(33)
  }

  @Test
  def y() : Unit = {
    val text = new Text()

    assertThat(text.y).isEqualTo(text.getY)
    text.y = 11
    assertThat(text.y).isEqualTo(11)
  }
}

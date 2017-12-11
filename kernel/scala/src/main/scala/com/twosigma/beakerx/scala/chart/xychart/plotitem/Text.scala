/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.twosigma.beakerx.scala.chart.xychart.plotitem

import java.time.{Instant, LocalDate, LocalDateTime}
import java.util.Date

import com.twosigma.beakerx.chart.Color

class Text extends com.twosigma.beakerx.chart.xychart.plotitem.Text with TextProperties

trait TextProperties {
  this: com.twosigma.beakerx.chart.xychart.plotitem.Text =>

  def color: Option[Color] = Option(getColor)
  def color_=(color: Color): Unit = setColor(color)
  // def color_=(color: java.awt.Color) = setColor(color)

  def pointerAngle: Double = getPointerAngle
  def pointerAngle_=(angle: Double): Unit = setPointerAngle(angle)

  def showPointer: Boolean = getShowPointer
  def showPointer_=(show: Boolean): Unit = setShowPointer(show)

  def size: Int = getSize
  def size_=(size: Int): Unit = setSize(size)

  def text: String = getText
  def text_=(text: String): Unit = setText(text)

  def x: Number = getX
  def x_=(x: Number): Unit = setX(x)
  def x_=(x: Date): Unit = setX(x)
  def x_=(x: LocalDate): Unit = setX(x)
  def x_=(x: LocalDateTime): Unit = setX(x)
  def x_=(x: Instant): Unit = setX(x)

  def y: Number = getY
  def y_=(y: Number): Unit = setY(y)
}
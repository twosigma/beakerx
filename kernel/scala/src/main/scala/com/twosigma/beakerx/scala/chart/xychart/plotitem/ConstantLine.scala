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
 *  WITHOUT WARRANTIES OR CONDITIONS OF AnyVal KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beakerx.scala.chart.xychart.plotitem

import java.time.{Instant, LocalDate, LocalDateTime}
import java.util.Date

import com.twosigma.beakerx.chart.Color
import com.twosigma.beakerx.chart.xychart.plotitem.StrokeType
import com.twosigma.beakerx.scala.chart.GraphicsProperties

class ConstantLine extends com.twosigma.beakerx.chart.xychart.plotitem.ConstantLine with ConstantLineProperties {

  def this(x: Any) {
    this()
    super.setX(x.asInstanceOf[Number])
  }

  def this(x: Any, y: Any) {
    this(x)
    super.setY(y.asInstanceOf[Number])
  }

  def this(x: Any, y: Any, style: StrokeType, color: Color) {
    this(x, y)
    super.setStyle(style)
    super.setColor(color)
  }

  def this(x: Any, y: Any, color: Color, width: Float, showLabel: Boolean) {
    this(x, y)
    super.setColor(color)
    super.setWidth(width)
    super.setShowLabel(showLabel)
  }
}

trait ConstantLineProperties extends GraphicsProperties {
  this: com.twosigma.beakerx.chart.xychart.plotitem.ConstantLine =>

  def color: Option[Color] = Option(getColor)
  def color_=(c: Color): Unit = setColor(c)
  def color_=(c: java.awt.Color): Unit = setColor(c)

  def showLabel: Boolean = getShowLabel
  def showLabel_=(showLabel: Boolean): Unit = setShowLabel(showLabel)

  def style: Option[StrokeType] = Option(getStyle)
  def style_=(style: StrokeType): Unit = setStyle(style)

  def width: Float = getWidth
  def width_=(width: Float): Unit = setWidth(width)

  def x: Option[Number] = Option(getX)
  def x_=(x: Number): Unit = setX(x)
  def x_=(x: Date): Unit = setX(x)
  def x_=(x: LocalDate): Unit = setX(x)
  def x_=(x: LocalDateTime): Unit = setX(x)
  def x_=(x: Instant): Unit = setX(x)

  def y: Option[Number] = Option(getY)
  def y_=(y: Number): Unit = setY(y)
}
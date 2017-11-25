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

import com.twosigma.beakerx.chart.Color
import com.twosigma.beakerx.scala.JavaAdapter._

import scala.collection.JavaConverters._

class Bars extends com.twosigma.beakerx.chart.xychart.plotitem.Bars with BarsProperties {

  def this(x: Seq[Int], y: Seq[Int]) {
    this()
    super.setX(x.map(x => x.asInstanceOf[AnyRef]).asJava)
    super.setY(y.map(x => x.asInstanceOf[Number]).asJava)
  }

  def this(x: Seq[Int], y: Seq[Int], colors: Seq[Color], outLineColor: Color, width: Number) {
    this(x, y)
    super.setColor(colors.map(x => x.asInstanceOf[AnyRef]).asJava)
    super.setOutlineColor(outLineColor)
    super.setWidth(width)
  }

  def this(x: Seq[Int], y: Seq[Int], color: Color, outLineColor: Color, width: Number) {
    this(x, y)
    super.setColor(color)
    super.setOutlineColor(outLineColor)
    super.setWidth(width)
  }

  def this(displayName: String, x: Seq[Int], y: Seq[Int], width: Number) {
    this(x, y)
    super.setDisplayName(displayName)
    super.setWidth(width)
  }
}

trait BarsProperties extends BasedXYGraphicsProperties {
  this: com.twosigma.beakerx.chart.xychart.plotitem.Bars =>

  def outlineColor = Option(getOutlineColor)
  def outlineColor_=(color: Color) = setOutlineColor(color)
  def outlineColor_=(color: java.awt.Color) = setOutlineColor(color)
  // TODO: Use type constraint
  def outlineColor_=[T <: AnyRef](colors: Seq[T]) = setOutlineColor(colors.map(identity[Object]).asJava)
  def outlineColors = getNullableList(getOutlineColors)

  def width = Option(getWidth)
  def width_=(width: Number) = setWidth(width)
  def width_=[T](widths: Seq[T])(implicit ev: T => Number) = setWidth(widths.map(ev).asJava)
  def widths = getNullableList(getWidths)
}
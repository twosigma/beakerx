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
import com.twosigma.beakerx.chart.xychart.plotitem.StrokeType
import com.twosigma.beakerx.scala.JavaAdapter._

class Crosshair extends com.twosigma.beakerx.chart.xychart.plotitem.Crosshair with CrosshairProperties {

  def this(color: Color, width: Float, style: StrokeType) {
    this()
    this.setColor(color)
    this.setWidth(width)
    this.setStyle(style)
  }

}

trait CrosshairProperties {
  this: com.twosigma.beakerx.chart.xychart.plotitem.Crosshair with CrosshairProperties =>
  def color: Option[Color] = Option(getColor)
  def color_=(color: Color): Unit = setColor(color)
  def color_=(color: java.awt.Color): Unit = setColor(color)

  def style: Option[StrokeType] = Option(getStyle)
  def style_=(style: StrokeType): Unit = setStyle(style)

  def width: Option[Float] = safeOption(getWidth)
  def width_=(width: Float): Unit = setWidth(width)
}

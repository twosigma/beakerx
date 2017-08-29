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

import com.twosigma.beakerx.chart.Color
import com.twosigma.beakerx.chart.xychart.plotitem.StrokeType

class ConstantLine extends com.twosigma.beakerx.chart.xychart.plotitem.ConstantLine {

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

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

package com.twosigma.beaker.scala.chart.xychart.plotitem

import com.twosigma.beaker.chart.Color
import scala.collection.JavaConverters._

class Bars extends com.twosigma.beaker.chart.xychart.plotitem.Bars {

  def this(x: List[Int], y: List[Int]) {
    this()
    super.setX(x.map(x => x.asInstanceOf[AnyRef]).asJava)
    super.setY(y.map(x => x.asInstanceOf[Number]).asJava)
  }

  def this(x: List[Int], y: List[Int], colors: List[Color], outLineColor: Color, width: Number) {
    this(x, y)
    super.setColor(colors.map(x => x.asInstanceOf[AnyRef]).asJava)
    super.setOutlineColor(outLineColor)
    super.setWidth(width)
  }

  def this(x: List[Int], y: List[Int], color: Color, outLineColor: Color, width: Number) {
    this(x, y)
    super.setColor(color)
    super.setOutlineColor(outLineColor)
    super.setWidth(width)
  }

  def this(displayName: String, x: List[Int], y: List[Int], width: Number) {
    this(x, y)
    super.setDisplayName(displayName)
    super.setWidth(width)
  }
}

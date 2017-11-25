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

import java.util

import com.twosigma.beakerx.chart.Color
import com.twosigma.beakerx.chart.xychart.plotitem.StrokeType
import com.twosigma.beakerx.scala.JavaAdapter._

import scala.collection.JavaConverters._

class Stems extends com.twosigma.beakerx.chart.xychart.plotitem.Stems with StemsProperties {

  def this(y: Seq[Double], colors: Seq[Color], style: StrokeType, width: Float) {
    this()
    super.setY(y.map(x => x.asInstanceOf[Number]).asJava)
    val toList: util.List[Object] = colors.map(x => x.asInstanceOf[Object]).asJava
    super.setColor(toList)
    super.setStyle(style)
    super.setWidth(width)
  }

  def this(y: Seq[Double], colors: Seq[Color], styles: Seq[StrokeType], width: Float) {
    this()
    super.setY(y.map(x => x.asInstanceOf[Number]).asJava)
    val toList: util.List[Object] = colors.map(x => x.asInstanceOf[Object]).asJava
    super.setColor(toList)
    super.setStyle(styles.asJava)
    super.setWidth(width)
  }
}

trait StemsProperties extends BasedXYGraphicsProperties {
  this: com.twosigma.beakerx.chart.xychart.plotitem.Stems =>

  def style = getStyle
  def style_=(stroke: StrokeType) = setStyle(stroke)
  def style_=(strokes: Seq[StrokeType]) = setStyle(strokes.asJava)
  def styles = getNullableList(getStyles)

  def width = getWidth
  def width_=(width: Float) = setWidth(width)
}
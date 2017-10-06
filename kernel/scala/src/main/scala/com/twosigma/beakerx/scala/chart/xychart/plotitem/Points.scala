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
import com.twosigma.beakerx.chart.xychart.plotitem.ShapeType

import scala.collection.JavaConverters._

class Points extends com.twosigma.beakerx.chart.xychart.plotitem.Points {

  def this(y: Seq[_]) {
    this()
    super.setY(y.map(x => x.asInstanceOf[Number]).asJava)
  }

  def this(y: Seq[_], shape: ShapeType) {
    this(y)
    super.setShape(shape)
  }

  def this(y: Seq[_], size: Number, color: Color) {
    this(y)
    super.setSize(size)
    super.setColor(color)
  }

  def this(y: Seq[_], size: Seq[_], color: Color) {
    this(y)
    super.setSize(size.map(x => x.isInstanceOf[Number]).asJava)
    super.setColor(color)
  }

  def this(y: Seq[_], size: Number, color: Seq[Color]) {
    this(y)
    super.setColor(color.asJava)
    super.setSize(size)
  }

  def this(y: Seq[_], size: Number, shape: ShapeType) {
    this(y, shape)
    super.setSize(size)
  }

  def this(y: Seq[_], size: Number, color: Color, outlineColor: Color) {
    this(y)
    super.setSize(size)
    super.setColor(color)
    super.setOutlineColor(outlineColor)
  }

  def this(y: Seq[_], size: Number, color: Color, outlineColors: Seq[Color]) {
    this(y)
    super.setSize(size)
    super.setColor(color)
    super.setOutlineColor(outlineColors.asJava)
  }

  def this(y: Seq[_], size: Number, color: Color, fill: Seq[Boolean], outlineColor: Color) {
    this(y, size, color, outlineColor)
    super.setFill(fill.asJava)
  }

  def this(x: Seq[_], y: Seq[_]) {
    this(y)
    super.setX(x.map(x => x.asInstanceOf[AnyRef]).asJava)
  }

  def this(x: Seq[_], y: Seq[_], size: Number, tooltip: Seq[String]) {
    this(x, y)
    super.setSize(size)
    super.setToolTip(tooltip.asJava)
  }

  def this(x: Seq[_], y: Seq[_], size: Number, displayName: String) {
    this(x, y)
    super.setSize(size)
    super.setDisplayName(displayName)
  }

}

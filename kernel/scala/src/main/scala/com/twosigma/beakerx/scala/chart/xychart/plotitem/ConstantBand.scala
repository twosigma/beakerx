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
import com.twosigma.beakerx.scala.JavaAdapter
import com.twosigma.beakerx.scala.JavaAdapter.getNullableList
import com.twosigma.beakerx.scala.chart.GraphicsProperties

import scala.collection.JavaConverters._

class ConstantBand extends com.twosigma.beakerx.chart.xychart.plotitem.ConstantBand with ConstantBandProperties

trait ConstantBandProperties extends GraphicsProperties {
  this: com.twosigma.beakerx.chart.xychart.plotitem.ConstantBand =>

  def color: Option[Color] = Option(getColor)
  def color_=(color: Color): Unit = setColor(color)
  def color_=(color: java.awt.Color): Unit = setColor(color)

  // TODO: use type constraint (Number, Date, LocalDate, LocalDateTime, Instant)
  def setX[T](xs: Seq[T]): Unit = setX(xs.map(_.asInstanceOf[Object]).asJava)
  def x: Seq[Number] = getNullableList(getX)
  def x_=[T](xs: Seq[T]): Unit = setX(xs)

  def setY[T](ys: Seq[T])(implicit conv: T => Number): Unit = setY((ys map (y => y: Number)).asJava)
  def y: Seq[Number] = getNullableList(getY)
  def y_=[T](ys: Seq[T])(implicit conv: T => Number): Unit = setY(ys)
}
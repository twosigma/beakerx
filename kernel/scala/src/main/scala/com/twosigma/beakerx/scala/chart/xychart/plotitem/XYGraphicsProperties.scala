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
import com.twosigma.beakerx.chart.xychart.plotitem.XYGraphics
import com.twosigma.beakerx.scala.JavaAdapter._
import com.twosigma.beakerx.scala.chart.GraphicsProperties

import scala.collection.JavaConverters._

trait XYGraphicsProperties extends GraphicsProperties { this: XYGraphics =>
  def color: Option[Color] = Option(getColor)
  def colors: Option[Iterable[Color]] = Option(getColors).map(_.asScala)
  def color_=(c: Color): Unit = setColor(c)
  def color_=(c: java.awt.Color): Unit = setColor(c)
  // TODO: use type constraint (Color, java.awt.Color)
  def setColor(cs: Seq[Object]): Unit = setColor(cs.asJava)
  def color_=(cs: Seq[Object]): Unit = setColor(cs)

  def displayName: String = getDisplayName
  def displayName_=(s: String): Unit = setDisplayName(s)

  def setToolTip(t: Seq[String]): Unit = setToolTip(t.asJava)
  def toolTip = getToolTips.asScala
  def toolTip_=(t: Seq[String]) = setToolTip(t)

  // TODO: use type constraint (Number, Date, LocalDate, LocalDateTime, Instant)
  def setX[T](xs: Seq[T]): Unit = setX(xs.map(_.asInstanceOf[Object]).asJava)
  def x: Iterable[Number] = getX.asScala
  def x_=[T](xs: Seq[T]) = setX(xs)

  def setY[T](ys: Seq[T])(implicit conv: T => Number): Unit = setY(ys.map(x => x: Number).asJava)
  def y: Iterable[Number] = getY.asScala
  def y_=[T](ys: Seq[T])(implicit conv: T => Number) = setY(ys)
}

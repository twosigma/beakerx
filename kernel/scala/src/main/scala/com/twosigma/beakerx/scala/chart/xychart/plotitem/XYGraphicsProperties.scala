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

trait XYGraphicsProperties extends GraphicsProperties {
  this: XYGraphics =>

  def color: Option[Color] = Option(getColor)
  def colors: Seq[Color] = getNullableList(()=> getColors)
  def color_=(c: Color): Unit = setColor(c)
  def color_=(c: java.awt.Color): Unit = setColor(c)
  def color_=[T <: AnyRef : BeakerColor](cs: Seq[T]): Unit = setColor(cs.toObjects.asJava)

  def displayName: String = getDisplayName
  def displayName_=(s: String): Unit = setDisplayName(s)

  def toolTip = getNullableList(()=> getToolTips)
  def toolTip_=(t: Seq[String]): Unit = setToolTip(t.asJava)

  def x: Seq[Number] = getX.asScala
  def x_=[T : BeakerXAxis](xs: Seq[T]): Unit = setX(xs.map(BeakerXAxis[T].toObject).asJava)

  def y: Seq[Number] = getY.asScala
  def y_=[T : NumberView](ys: Seq[T]) = setY(ys.toNumbers.asJava)
}

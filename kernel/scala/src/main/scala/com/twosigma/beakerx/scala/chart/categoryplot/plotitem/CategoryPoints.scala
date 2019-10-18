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

package com.twosigma.beakerx.scala.chart.categoryplot.plotitem

import com.twosigma.beakerx.chart.Color
import com.twosigma.beakerx.chart.xychart.plotitem.ShapeType
import com.twosigma.beakerx.scala.JavaAdapter._

import scala.collection.JavaConverters._

class CategoryPoints extends com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryPoints with CategoryPointsProperties

trait CategoryPointsProperties extends CategoryGraphicsProperties {
  this: com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryPoints =>

  def fill: Option[Boolean] = safeOption(getFill)
  def fill_=(b: Boolean): Unit = setFill(b)
  def fills: Seq[Boolean] = getNullableList(()=>getFills).map(_.booleanValue)
  def fill_=(fills: Seq[Boolean]) = setFill(fills.map(Boolean.box).asJava)

  def outlineColor: Option[Color] = Option(getOutlineColor)
  def outlineColors: Seq[Object] = getNullableList(()=>getOutlineColors)
  def outlineColor_=(outlineColor: Color): Unit = setOutlineColor(outlineColor)
  def outlineColor_=(outlineColor: java.awt.Color): Unit = setOutlineColor(outlineColor)
  def outlineColor_=[T <: AnyRef : BeakerColor](outlineColors: Seq[T]): Unit = setOutlineColor(outlineColors.toObjects.asJava)

  def shape: ShapeType = getShape
  def shapes: Seq[ShapeType] = getNullableList(()=> getShapes)
  def shape_=(s: ShapeType) = setShape(s)
  def shape_=(ss: Seq[ShapeType]) = setShape(ss.asJava)

  def size: Float = getSize
  def sizes: Seq[Number] = getNullableList(()=>getSizes)
  def size_=(s: Number): Unit = setSize(s)
  def size_=[T : NumberView](ss: Seq[T]): Unit = setSize(ss.toNumbers.asJava)
}

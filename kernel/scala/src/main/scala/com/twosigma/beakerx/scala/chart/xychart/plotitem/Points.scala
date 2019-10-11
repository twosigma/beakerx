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
import com.twosigma.beakerx.chart.xychart.plotitem.ShapeType
import com.twosigma.beakerx.scala.JavaAdapter._

import scala.collection.JavaConverters._

class Points extends com.twosigma.beakerx.chart.xychart.plotitem.Points with PointsProperties

trait PointsProperties extends XYGraphicsProperties {
  this: com.twosigma.beakerx.chart.xychart.plotitem.Points =>

  def fill: Option[Boolean] = safeOption(getFill)
  def fills = getNullableList(()=> getFills)
  def fill_=(fill: Boolean) = setFill(fill)
  def fill_=(fills: Seq[Boolean]) = setFill(fills.map(Boolean.box).asJava)

  def outlineColor = Option(getOutlineColor)
  def outlineColors = getNullableList(()=> getOutlineColors)
  def outlineColor_=(c: Color) = setOutlineColor(c)
  def outlineColor_=(c: java.awt.Color) = setOutlineColor(c)
  def outlineColor_=[T <: AnyRef : BeakerColor](cs: Seq[T]) = setOutlineColor(cs.toObjects.asJava)

  def shape = getShape
  def shapes: Seq[ShapeType] = getNullableList(()=> getShapes)
  def shape_=(s: ShapeType) = setShape(s)
  def shape_=(ss: Seq[ShapeType]) = setShape(ss.asJava)

  def size = getSize
  def sizes: Seq[Number] = getNullableList(()=> getSizes)
  def size_=(s: Number) = setSize(s)
  def size_=[T : NumberView](ss: Seq[T]): Unit = setSize(ss.toNumbers.asJava)
}
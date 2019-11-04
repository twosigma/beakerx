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
import com.twosigma.beakerx.chart.xychart.plotitem.LabelPositionType
import com.twosigma.beakerx.scala.JavaAdapter._
import com.twosigma.beakerx.scala.chart.xychart.plotitem.BasedCategoryGraphicsProperties

import scala.collection.JavaConverters._
import scala.language.higherKinds

class CategoryArea extends com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryArea with CategoryAreaProperties

trait CategoryAreaProperties extends BasedCategoryGraphicsProperties {
  this: com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryArea =>

  def drawOutline: Boolean = getDrawOutline
  def drawOutlines: Seq[Boolean] = getNullableList(() => getDrawOutlines).map(_.booleanValue)
  def drawOutline_=(outline: Boolean): Unit = setDrawOutline(outline)
  def drawOutline_=(outlines: Seq[Boolean]): Unit = setDrawOutline(outlines.map(Boolean.box).asJava)

  def fill: Option[Boolean] = safeOption(getFill)
  def fills: Seq[Boolean] = getNullableList(() => getFills).map(_.booleanValue)
  def fill_=(fill: Boolean): Unit = setFill(fill)
  def fill_=(fills: Seq[Boolean]): Unit = setFill(fills.map(Boolean.box).asJava)

  def labelPosition: LabelPositionType = getLabelPosition
  def labelPosition_=(position: LabelPositionType): Unit = setLabelPosition(position)

  def outlineColor: Option[Color] = Option(getOutlineColor)
  def outlineColors: Seq[Object] = getNullableList(() =>getOutlineColors)
  def outlineColor_=(outlineColor: Color): Unit = setOutlineColor(outlineColor)
  def outlineColor_=(outlineColor: java.awt.Color): Unit = setOutlineColor(outlineColor)
  def outlineColor_=[T <: AnyRef : BeakerColor](outlineColors: Seq[T]): Unit =
    setOutlineColor(outlineColors.toObjects.asJava)

  def width: Option[Number] = Option(getWidth)
  def widths: Seq[Number] = getNullableList(() => getWidths)
  def width_=(width: Number): Unit = setWidth(width)
  def width_=[T : NumberView](widths: Seq[T]): Unit = setWidth(widths.toNumbers.asJava)
}

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
import com.twosigma.beakerx.scala.JavaAdapter._
import com.twosigma.beakerx.scala.chart.GraphicsProperties

import scala.collection.JavaConverters._
import scala.language.higherKinds
import scala.reflect.ClassTag

trait CategoryGraphicsProperties extends GraphicsProperties {
  this: com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryGraphics =>

  def centerSeries: Boolean = getCenterSeries
  def centerSeries_=(center: Boolean): Unit = setCenterSeries(center)

  def color: Option[Color] = Option(getColor)
  def color_=(color: Color): Unit = setColor(color)
  def color_=(color: java.awt.Color): Unit = setColor(color)
  def color_=[T <: AnyRef : BeakerColor](colors: Seq[T]): Unit = setColor(colors.toObjects.asJava)
  def colors: Seq[Color] = getNullableList(()=> getColors) map {
    case color: Color => color
  }

  // TODO: itemLabel

  def seriesNames: Seq[String] = getSeriesNames.asScala
  def seriesNames_=(names: Seq[String]): Unit = setSeriesNames(names.asJava)

  def showItemLabel: Boolean = getShowItemLabel
  def showItemLabel_=(show: Boolean): Unit = setShowItemLabel(show)

  def useToolTip: Boolean = getUseToolTip
  def useToolTip_=(useToolTip: Boolean): Unit = setUseToolTip(useToolTip)

  def value: Array[Array[Number]] = getValue
  def value_=[T : NumberView](value: Seq[T]): Unit = {
    val numbers: Array[Number] = value.toNumbers.toArray
    setValue(numbers.toArray[Object])
  }
  def value_=[T : ClassTag : NumberView, Inner[_] : HasSeq[T]#Conversion](value: Seq[Inner[T]]): Unit = {
    val arrays: Array[java.util.List[Number]] = value.map(inner =>
      (inner: Seq[T]).toNumbers.asJava
    ).toArray
    setValue(arrays.toArray[Object])
  }
}

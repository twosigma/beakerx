/*
 * Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.scala.chart.histogram

import com.twosigma.beakerx.chart.Color
import com.twosigma.beakerx.chart.histogram.Histogram.DisplayMode
import com.twosigma.beakerx.scala.JavaAdapter._
import com.twosigma.beakerx.scala.chart.AbstractChartProperties

import scala.collection.JavaConverters._
import scala.language.higherKinds

class Histogram extends com.twosigma.beakerx.chart.histogram.Histogram with HistogramProperties

trait HistogramProperties extends AbstractChartProperties {
  this: com.twosigma.beakerx.chart.histogram.Histogram =>

  def binCount: Int = getBinCount
  def binCount_=(count: Int): Unit = setBinCount(count)

  def color: Option[Color] = Option(getColor)
  def colors: Seq[Color] = getNullableList(()=> getColors)
  def color_=(color: Color): Unit = setColor(color)
  def color_=(color: java.awt.Color): Unit = setColor(color)
  def color_=[T <: Object : BeakerColor](colors: Seq[T]): Unit = setColor(colors.toObjects.asJava)

  def cumulative: Boolean = getCumulative
  def cumulative_=(cum: Boolean): Unit = setCumulative(cum)

  def data: Seq[Number] = getNullableList(()=>getData)
  def listData: Seq[Seq[Number]] = getNullableList(()=>getListData).map(_.asScala)
  def data_=[T : NumberView](data: Seq[T]):Unit = setData(data.toNumbers.asJava)
  def data_=[T : NumberView, Inner[_] : HasSeq[T]#Conversion](data: Seq[Inner[T]]): Unit = {
    val javaData = data.map(_.toSeq.toNumbers.asJava).asJava
    setData(javaData)
  }

  def displayMode: DisplayMode = getDisplayMode
  def displayMode_=(dm: DisplayMode): Unit = setDisplayMode(dm)

  def log: Boolean = getLog
  def log_=(log: Boolean): Unit = setLog(log)

  def names: Seq[String] = getNullableList(()=>getNames)
  def names_=(names: Seq[String]): Unit = setNames(names.asJava)

  def normed: Boolean = getNormed
  def normed_=(normed: Boolean) = setNormed(normed)

  def rangeMin: Option[Int] = safeOption(getRangeMin)
  def rangeMin_=(min: Int): Unit = setRangeMin(min)

  def rangeMax: Option[Int] = safeOption(getRangeMax)
  def rangeMax_=(max: Int): Unit = setRangeMax(max)

  def rightClose: Boolean = getRightClose
  def rightClose_=(close: Boolean): Unit = setRightClose(close)
}

object Histogram {
  // Scala won't inherit nested Java enums
  import com.twosigma.beakerx.chart.histogram.Histogram.{DisplayMode => DM}
  type DisplayMode = DM
  object DisplayMode {
    val OVERLAP = DM.OVERLAP
    val STACK = DM.STACK
    val SIDE_BY_SIDE = DM.SIDE_BY_SIDE
  }
}

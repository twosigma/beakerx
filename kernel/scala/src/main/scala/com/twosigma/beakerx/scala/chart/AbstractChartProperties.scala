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

package com.twosigma.beakerx.scala.chart

import com.twosigma.beakerx.chart.AbstractChart
import com.twosigma.beakerx.chart.xychart.plotitem.{Crosshair, YAxis}
import com.twosigma.beakerx.scala.chart.xychart.plotitem.{YAxisProperties, YAxisWrapper}

import scala.collection.JavaConverters._

trait AbstractChartProperties extends ChartProperties {
  this: com.twosigma.beakerx.chart.AbstractChart =>

  def autoZoom: Boolean = getAutoZoom
  def autoZoom_=(b: Boolean): Unit = setAutoZoom(b)

  def crosshair: Option[Crosshair] = Option(getCrosshair)
  def crosshair_=(crosshair: Crosshair): Unit = setCrosshair(crosshair)

  def logY: Boolean = getLogY
  def logY_=(logY: Boolean): Unit = setLogY(logY)

  def omitCheckboxes: Boolean = getOmitCheckboxes
  def omitCheckboxes_=(omit: Boolean): Unit = setOmitCheckboxes(omit)

  def xLabel: Option[String] = Option(getXLabel)
  def xLabel_=(label: String): Unit = setXLabel(label)

  def xLowerMargin: Double = getXLowerMargin
  def xLowerMargin_=(margin: Double): Unit = setXLowerMargin(margin)

  def xUpperMargin: Double = getXUpperMargin
  def xUpperMargin_=(margin: Double): Unit = setXUpperMargin(margin)

  def yAutoRange: Boolean = getYAutoRange
  def yAutoRange_=(b: Boolean): Unit = setyAutoRange(b)

  def yAutoRangeIncludesZero: Boolean = getYAutoRangeIncludesZero
  def yAutoRangeIncludesZero_=(b: Boolean): Unit = setYAutoRangeIncludesZero(b)

  def yBound: (Double, Double) = (getYLowerBound, getYUpperBound)
  def yBound_=(bounds: (Double, Double)): Unit = setYBound(bounds._1, bounds._2)
  def yLowerBound: Double = getYLowerBound
  def yUpperBound: Double = getYUpperBound

  def yLabel: String = getYLabel
  def yLabel_=(label: String): Unit = setYLabel(label)

  def yLogBase: Double = getYLogBase
  def yLogBase_=(base: Double): Unit = setYLogBase(base)

  def yLowerMargin: Double = getYLowerMargin
  def yLowerMargin_=(margin: Double): AbstractChart = setYLowerMargin(margin)

  def yUpperMargin: Double = getYUpperMargin
  def yUpperMargin_=(margin: Double): Unit = setYUpperMargin(margin)

  def yAxes: Seq[YAxisProperties] = getYAxes.asScala.map(yAxis => new YAxisWrapper(yAxis))

  def +=(axis: YAxis): Unit = add(axis)
}

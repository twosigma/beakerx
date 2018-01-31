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

package com.twosigma.beakerx.scala.chart.xychart

import com.twosigma.beakerx.chart.xychart
import com.twosigma.beakerx.chart.xychart.XYChart
import com.twosigma.beakerx.scala.chart.ChartDetailsProperties

import scala.collection.JavaConverters._

class CombinedPlot extends com.twosigma.beakerx.chart.xychart.CombinedPlot with CombinedPlotProperties

trait CombinedPlotProperties extends ChartDetailsProperties {
  this: com.twosigma.beakerx.chart.xychart.CombinedPlot =>

  def initHeight: Integer = getInitHeight
  def initHeight_=(height: Int): Unit = setInitHeight(height)

  def initWidth: Integer = getInitWidth
  def initWidth_=(width: Int): Unit = setInitWidth(width)

  def subplots: Seq[XYChart] = getSubplots.asScala

  def title: Option[String] = Option(getTitle)
  def title_=(t: String): xychart.CombinedPlot = setTitle(t)

  def weights: Seq[Int] = getWeights.asScala.map(_.toInt)

  def xLabel: Option[String] = Option(getXLabel)
  def xLabel_=(label: String): Unit = setXLabel(label)

  def xTickLabelsVisible: Boolean = isxTickLabelsVisible
  def xTickLabelsVisible_=(xTickLabelsVisible: Boolean): Unit = setxTickLabelsVisible(xTickLabelsVisible)

  def yTickLabelsVisible: Boolean = isyTickLabelsVisible
  def yTickLabelsVisible_=(yTickLabelsVisible: Boolean): Unit = setyTickLabelsVisible(yTickLabelsVisible)
}
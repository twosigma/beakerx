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

package com.twosigma.beakerx.scala.chart.categoryplot

import com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryGraphics
import com.twosigma.beakerx.chart.xychart.plotitem.PlotOrientationType
import com.twosigma.beakerx.scala.chart.AbstractChartProperties

import scala.collection.JavaConverters._

class CategoryPlot extends com.twosigma.beakerx.chart.categoryplot.CategoryPlot with CategoryPlotProperties

trait CategoryPlotProperties extends AbstractChartProperties {
  this: com.twosigma.beakerx.chart.categoryplot.CategoryPlot =>

  def categoryMargin: Double = getCategoryMargin
  def categoryMargin_=(margin: Double): Unit = setCategoryMargin(margin)

  def categoryNames: Seq[String] = getCategoryNames.asScala
  def categoryNames_=(names: Seq[String]): Unit = setCategoryNames(names.asJava)

  def categoryNamesLabelAngle: Double = getCategoryNamesLabelAngle
  def categoryNamesLabelAngle_=(angle: Double): Unit = setCategoryNamesLabelAngle(angle)

  def orientation: PlotOrientationType = getOrientation
  def orientation_=(orientation: PlotOrientationType): Unit = setOrientation(orientation)

  def +=(cg: CategoryGraphics): Unit = add(cg)
}

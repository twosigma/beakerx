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

package com.twosigma.beaker.scala.chart.xychart

import com.twosigma.beaker.chart.legend.{LegendLayout, LegendPosition}
import com.twosigma.beaker.chart.xychart.XYChart
import com.twosigma.beaker.scala.chart.xychart.plotitem.Crosshair

import scala.collection.JavaConverters._

class Plot extends com.twosigma.beaker.chart.xychart.Plot {

  def this(title: String) {
    this()
    super.setTitle(title)
  }

  def this(title: String, initHeight: Int) {
    this(title)
    super.setInitHeight(initHeight)
  }

  def this(crosshair: Crosshair, omitCheckboxes: Boolean, legendLayout: LegendLayout, legendPosition: LegendPosition) {
    this()
    super.setCrosshair(crosshair)
    super.setOmitCheckboxes(omitCheckboxes)
    super.setLegendLayout(legendLayout)
    super.setLegendPosition(legendPosition)
  }

  def this(title: String, xLabel: String, yLabel: String, logX: Boolean, xLogBase: Double, logY: Boolean, yLogBase: Double) {
    this(title)
    super.setXLabel(xLabel)
    super.setYLabel(yLabel)
    super.setLogX(logX)
    super.setXLogBase(xLogBase)
    super.setLogY(logY)
    super.setYLogBase(yLogBase)
  }

  def this(title: String, labelStyle: String, gridLineStyle: String, titleStyle: String) {
    this(title)
    super.setLabelStyle(labelStyle)
    super.setGridLineStyle(gridLineStyle)
    super.setTitleStyle(title)
  }

  def add(items: List[Object]): XYChart = {
    add(items.asJava)
  }
}

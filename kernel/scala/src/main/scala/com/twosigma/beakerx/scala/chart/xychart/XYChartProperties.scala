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

package com.twosigma.beakerx.scala.chart.xychart

import com.twosigma.beakerx.chart.xychart.plotitem._
import com.twosigma.beakerx.scala.JavaAdapter._
import com.twosigma.beakerx.scala.chart.AbstractChartProperties

import scala.collection.JavaConverters._

trait XYChartProperties extends AbstractChartProperties {
  this: com.twosigma.beakerx.chart.xychart.XYChart =>

  def lodThreshold: Option[Int] = safeOption(getLodThreshold)
  def lodThreshold_=(lod: Int): Unit = setLodThreshold(lod)

  def logX: Boolean = getLogX
  def logX_=(b: Boolean): Unit = setLogX(b)

  def xAutoRange: Boolean = getXAutoRange
  def xAutoRange_=(b: Boolean): Unit = setXAutoRange(b)

  def xBound: (Double, Double) = (getXLowerBound, getXUpperBound)
  def xBound_=(bounds: (Double, Double)): Unit = setXBound(bounds._1, bounds._2)
  def xLowerBound: Double = getXLowerBound
  def xUpperBound: Double = getXUpperBound

  def xLogBase: Double = getXLogBase
  def xLogBase_=(base: Double): Unit = setXLogBase(base)

  def xTickLabelsVisible: Boolean = isxTickLabelsVisible()
  def xTickLabelsVisible_=(vis: Boolean): Unit = setxTickLabelsVisible(vis)

  def yTickLabelsVisible: Boolean = isyTickLabelsVisible()
  def yTickLabelsVisible_=(vis: Boolean): Unit = setyTickLabelsVisible(vis)

  def +=(cb: ConstantBand): Unit = add(cb)
  def +=(cl: ConstantLine): Unit = add(cl)
  def +=(r: Rasters): Unit = add(r)
  def +=(t: Text): Unit = add(t)
  def +=(xyg: XYGraphics): Unit = add(xyg)
}

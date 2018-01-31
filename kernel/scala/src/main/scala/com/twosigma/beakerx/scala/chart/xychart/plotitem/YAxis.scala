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

package com.twosigma.beakerx.scala.chart.xychart.plotitem

class YAxis extends com.twosigma.beakerx.chart.xychart.plotitem.YAxis with YAxisProperties {
  val target = this
}

class YAxisWrapper(val target: com.twosigma.beakerx.chart.xychart.plotitem.YAxis) extends YAxisProperties

trait YAxisProperties {
  val target: com.twosigma.beakerx.chart.xychart.plotitem.YAxis

  def autoRange: Boolean = target.getAutoRange
  def autoRange_=(b: Boolean): Unit = target.setAutoRange(b)

  def autoRangeIncludesZero: Boolean = target.getAutoRangeIncludesZero
  def autoRangeIncludesZero_=(b: Boolean): Unit = target.setAutoRangeIncludesZero(b)

  def label: String = target.getLabel
  def label_=(label: String): Unit = target.setLabel(label)

  def log: Boolean = target.getLog
  def log_=(b: Boolean): Unit = target.setLog(b)

  def logBase: Double = target.getLogBase
  def logBase_=(base: Double): Unit = target.setLogBase(base)

  def bound: (Double, Double) = (target.getLowerBound, target.getUpperBound)
  def bound_=(bounds: (Double, Double)): Unit = target.setBound(bounds._1, bounds._2)
  def lowerBound: Double = target.getLowerBound
  def upperBound: Double = target.getUpperBound

  def lowerMargin: Double = target.getLowerMargin
  def lowerMargin_=(margin: Double): Unit = target.setLowerMargin(margin)

  def upperMargin: Double = target.getUpperMargin
  def upperMargin_=(margin: Double): Unit = target.setUpperMargin(margin)
}

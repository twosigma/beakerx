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

package com.twosigma.beakerx.scala.chart.treemap

import com.twosigma.beakerx.chart.treemap.util.{ColorProvider, IToolTipBuilder}
import com.twosigma.beakerx.chart.treemap.{Mode, ValueAccessor}
import com.twosigma.beakerx.scala.JavaAdapter._
import com.twosigma.beakerx.scala.chart.ChartProperties
import net.sf.jtreemap.swing.TreeMapNode

class TreeMap extends com.twosigma.beakerx.chart.treemap.TreeMap with TreeMapProperties

trait TreeMapProperties extends ChartProperties {
  this: com.twosigma.beakerx.chart.treemap.TreeMap =>

  // colorProvider is always initialized
  def colorProvider: ColorProvider = getColorProvider
  def colorProvider_=(cp: ColorProvider): Unit = setColorProvider(cp)

  def mode: Option[Mode] = Option(getMode)
  def mode_=(mode: Mode): Unit = setMode(mode)

  def ratio: Option[Double] = safeOption(getRatio)
  def ratio_=(r: Double): Unit = setRatio(r)

  def root: Option[TreeMapNode] = Option(getRoot)
  def root_=(root: TreeMapNode): Unit = setRoot(root)

  def round: Option[Boolean] = safeOption(getRound)
  def round_=(round: Boolean): Unit = setRound(round)

  def sticky: Option[Boolean] = safeOption(getSticky)
  def sticky_=(sticky: Boolean): Unit = setSticky(sticky)

  def toolTipBuilder: Option[IToolTipBuilder] = Option(getToolTipBuilder)
  def toolTipBuilder_=(ttBuilder: IToolTipBuilder): Unit = setToolTipBuilder(ttBuilder)

  def valueAccessor: Option[ValueAccessor] = Option(getValueAccessor)
  def valueAccessor_=(va: ValueAccessor): Unit = setValueAccessor(va)
}
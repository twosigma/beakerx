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

import com.twosigma.beakerx.chart
import com.twosigma.beakerx.chart.legend.{LegendLayout, LegendPosition}
import com.twosigma.beakerx.scala.JavaAdapter._

import scala.collection.JavaConverters._

class Chart extends com.twosigma.beakerx.chart.Chart with ChartProperties

trait ChartProperties extends ChartDetailsProperties {
  this: com.twosigma.beakerx.chart.Chart =>

  def customStyles: Seq[String] = getCustomStyles.asScala
  def customStyles_=(styles: Seq[String]): Unit = setCustomStyles(styles.asJava)

  def elementStyles: Map[String, String] = getElementStyles.asScala.toMap

  def gridLineStyle: Option[String] = Option(getGridLineStyle)
  def gridLineStyle_=(style: String): Unit = setGridLineStyle(style)

  def initHeight: Int = getInitHeight
  def initHeight_=(height: Int): Unit = setInitHeight(height)

  def initWidth: Int = getInitWidth
  def initWidth_=(width: Int): Unit = setInitWidth(width)

  def labelStyle: Option[String] = Option(getLabelStyle)
  def labelStyle_=(style: String): Unit = setLabelStyle(style)
  def labelXStyle: Option[String] = Option(getLabelXStyle)
  def labelXStyle_=(style: String): Unit = setLabelXStyle(style)
  def labelYStyle: Option[String] = Option(getLabelYStyle)
  def labelYStyle_=(style: String): Unit = setLabelYStyle(style)

  def legendLayout: LegendLayout = getLegendLayout
  def legendLayout_=(layout: LegendLayout): Unit = setLegendLayout(layout)

  def legendPosition: LegendPosition = getLegendPosition
  def legendPosition_=(position: LegendPosition): Unit = setLegendPosition(position)

  def showLegend: Option[Boolean] = safeOption(getShowLegend)
  def showLegend_=(show: Boolean): chart.Chart = setShowLegend(show)

  def title: Option[String] = Option(getTitle)
  def title_=(t: String): Unit = setTitle(t)
  def titleStyle: Option[String] = Option(getTitleStyle)
  def titleStyle_=(style: String): Unit = setTitleStyle(style)

  def useToolTip: Boolean = getUseToolTip
  def useToolTip_=(b: Boolean): Unit = setUseToolTip(b)
}

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

package com.twosigma.beakerx.scala.chart.heatmap

import com.twosigma.beakerx.chart.GradientColor
import com.twosigma.beakerx.scala.JavaAdapter._
import com.twosigma.beakerx.scala.chart.AbstractChartProperties

import scala.language.higherKinds
import scala.reflect.ClassTag

class HeatMap extends com.twosigma.beakerx.chart.heatmap.HeatMap with HeatMapProperties

trait HeatMapProperties extends AbstractChartProperties {
  this: com.twosigma.beakerx.chart.heatmap.HeatMap =>

  def color: GradientColor = getColor
  def color_=(gc: GradientColor): Unit = setColor(gc)

  def data: Array[Array[Number]] = Option(getData).getOrElse(Array.empty)
  def data_=[T : NumberView : ClassTag, Inner[_]: HasSeq[T]#Conversion](data: Seq[Inner[T]]): Unit = {
    val innerNumberArray = data.map(_.toSeq.toNumbers.toArray)
    val outerArray = innerNumberArray.toArray
    setData(outerArray)
  }
}

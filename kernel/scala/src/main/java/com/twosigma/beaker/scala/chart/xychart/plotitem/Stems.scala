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

package com.twosigma.beaker.scala.chart.xychart.plotitem

import scala.collection.JavaConverters._

import com.twosigma.beaker.chart.Color
import com.twosigma.beaker.chart.xychart.plotitem.StrokeType

class Stems extends com.twosigma.beaker.chart.xychart.plotitem.Stems {

  def this(y: List[Double], colors: List[Color], style: StrokeType, width: Float) {
    this()
    super.setY(y.map(x => x.asInstanceOf[Number]).asJava)
    super.setColor(colors.asJava)
    super.setStyle(style)
    super.setWidth(width)
  }

  def this(y: List[Double], colors: List[Color], styles: List[StrokeType], width: Float) {
    this()
    super.setY(y.map(x => x.asInstanceOf[Number]).asJava)
    super.setColor(colors.asJava)
    super.setStyle(styles.asJava)
    super.setWidth(width)
  }
}

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

package com.twosigma.beakerx.scala.chart.xychart.plotitem

import scala.collection.JavaConverters._


class Line(var xs: Seq[AnyVal], var ys: Seq[AnyVal]) extends com.twosigma.beakerx.chart.xychart.plotitem.Line(xs.map(x => x.asInstanceOf[AnyRef]).asJava, ys.map(x => x.asInstanceOf[Number]).asJava) {

  def this(ys: Seq[AnyVal]) {
    this(List(), ys)
    super.setY(ys.map(x => x.asInstanceOf[Number]).asJava)
  }

  def this(ys: Seq[AnyVal], displayName: String) {
    this(ys)
    super.setDisplayName(displayName)
  }

  def this(displayName: String, xs: Seq[AnyVal], ys: Seq[AnyVal], width: Float) {
    this(xs, ys)
    super.setDisplayName(displayName)
    super.setWidth(width)
  }

}

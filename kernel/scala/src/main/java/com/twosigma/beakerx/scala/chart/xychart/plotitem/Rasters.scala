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

class Rasters(y: Seq[AnyVal], height: Seq[AnyVal], width: Seq[AnyVal]) extends com.twosigma.beakerx.chart.xychart.plotitem.Rasters {

  super.setY(y.map(x => x.asInstanceOf[Number]).asJava)
  super.setHeight(height.map(x => x.asInstanceOf[Number]).asJava)
  super.setWidth(width.map(x => x.asInstanceOf[Number]).asJava)

  def this(x: Seq[AnyVal], y: Seq[AnyVal], height: Seq[AnyVal], width: Seq[AnyVal], opacity: Seq[AnyVal]) {
    this(y, height, width)
    super.setX(x.map(x => x.asInstanceOf[AnyRef]).asJava)
    super.setOpacity(opacity.map(x => x.asInstanceOf[Number]).asJava)
  }

  def this(x: Seq[AnyVal], y: Seq[AnyVal], height: Seq[AnyVal], width: Seq[AnyVal], opacity: Seq[AnyVal], dataString: Array[Byte]) {
    this(x, y, height, width, opacity)
    super.setDataString(dataString)
  }

  def this(x: Seq[AnyVal], y: Seq[AnyVal], height: Seq[AnyVal], width: Seq[AnyVal], opacity: Seq[AnyVal], fileUrl: String) {
    this(x, y, height, width, opacity)
    super.setFileUrl(fileUrl)
  }
}

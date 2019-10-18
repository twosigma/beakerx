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

import com.twosigma.beakerx.scala.JavaAdapter._

import scala.collection.JavaConverters._

class Rasters extends com.twosigma.beakerx.chart.xychart.plotitem.Rasters with RastersProperties

trait RastersProperties extends XYGraphicsProperties {
  this: com.twosigma.beakerx.chart.xychart.plotitem.Rasters =>

  def dataString: Array[Byte] = getDataString
  def dataString_=(data: Seq[Byte]): Unit = setDataString(data.toArray)

  def filePath: String = getFilePath
  def filePath_=(path: String): Unit = setFilePath(path)

  def fileUrl: String = getFileUrl
  def fileUrl_=(url: String): Unit = setFileUrl(url)

  def height: Seq[Number] = getNullableList(()=> getHeight)
  def height_=[T : NumberView](heights: Seq[T]): Unit = setHeight(heights.toNumbers.asJava)

  def opacity: Seq[Number] = getOpacity.asScala
  def opacity_=[T : NumberView](opacities: Seq[T]): Unit = setOpacity(opacities.toNumbers.asJava)

  def position: String = getPosition
  def postion_=(position: String): Unit = setPosition(position)

  def width: Seq[Number] = getNullableList(()=> getWidth)
  def width_=[T : NumberView](widths: Seq[T]): Unit = setWidth(widths.toNumbers.asJava)
}
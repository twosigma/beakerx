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

package com.twosigma.beakerx.scala.chart.xychart

import java.util

import com.twosigma.beakerx.scala.JavaAdapter.{BeakerColor, _}

import scala.collection.JavaConverters._

class SimpleTimePlot extends
  com.twosigma.beakerx.chart.xychart.SimpleTimePlot(null, null) with SimpleTimePlotProperties

trait SimpleTimePlotProperties extends TimePlotProperties {
  this: com.twosigma.beakerx.chart.xychart.SimpleTimePlot =>

  // TODO: SimpleTimePlot has some non-trivial type for colors.  Do we care?
  def colors: Seq[Object] = getNullableList(()=>getColors)
  def colors_=[C <: AnyRef : BeakerColor](colors: Seq[C]): Unit = setColors(colors.toObjects.asJava)

  def columns: Seq[String] = getNullableList(()=>getColumns)
  def columns_=(columns: Seq[String]): Unit = setColumns(columns.asJava)

  // NOTE: in practice, the objects are actually Numbers or Dates, but
  // we would need to use something like Shapeless to express that.
  def data: Seq[Map[String, Object]] = getNullableList(()=>getData).map(_.asScala.toMap)
  def data_=(data: Seq[Map[String, Any]]): Unit = {
    val maps = data.map(_.mapValues(_.asInstanceOf[Object]).asJava)
    val list = maps.asJava
    setData(list)
  }

  def displayLines: Boolean = isDisplayLines
  def displayLines_=(d: Boolean): Unit = setDisplayLines(d)

  def displayNames: Seq[String] = getNullableList(()=>getDisplayNames)
  def displayNames_=(ns: Seq[String]): Unit = setDisplayNames(ns.asJava)

  def displayPoints: Boolean = isDisplayPoints
  def displayPoints_=(d: Boolean): Unit = setDisplayPoints(d)

  def timeColumn: String = getTimeColumn
  def timeColumn_=(col: String): Unit = setTimeColumn(col)
}

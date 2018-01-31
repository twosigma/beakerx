/*
 * Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

import com.twosigma.beakerx.chart.Graphics

import scala.collection.JavaConverters._

trait GraphicsProperties { this: Graphics =>
  def visible: Boolean = getVisible
  def visible_=(v: Boolean): Unit = setVisible(v)

  def yAxis: Option[String] = Option(getYAxis)
  def yAxis_=(s: String): Unit = setYAxis(s)

  def keyTags: Map[String, String] = getKeyTags.asScala.toMap
}
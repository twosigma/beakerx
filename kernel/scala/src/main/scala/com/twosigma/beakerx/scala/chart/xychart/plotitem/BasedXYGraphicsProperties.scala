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

package com.twosigma.beakerx.scala.chart.xychart.plotitem

import com.twosigma.beakerx.scala.JavaAdapter.getNullableList

import scala.collection.JavaConverters._

trait BasedXYGraphicsProperties extends XYGraphicsProperties {
  this: com.twosigma.beakerx.chart.xychart.plotitem.BasedXYGraphics =>

  def base: Number = getBase
  def bases: Seq[Number] = getNullableList(getBases)
  // TODO: use type constraint
  def setBase[T](bs: Seq[T])(implicit conv: T => Number): Unit = setBase(bs.map(conv).asJava)
  def base_=(base: Number): Unit = setBase(base)
  // TODO: use type constraint
  def base_=[T](bases: Seq[T])(implicit conv: T => Number): Unit = setBase(bases)
}

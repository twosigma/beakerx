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

import com.twosigma.beakerx.scala.JavaAdapter._
import scala.collection.JavaConverters._

class GradientColor[T <: AnyRef : BeakerColor](colors: Seq[T]) extends
  com.twosigma.beakerx.chart.GradientColor(colors.toObjects.asJava)

object GradientColor {
  def apply[T <: AnyRef : BeakerColor](colors: T*) = new GradientColor(colors)

val GREEN_YELLOW_WHITE = com.twosigma.beakerx.chart.GradientColor.GREEN_YELLOW_WHITE
val BROWN_RED_YELLOW = com.twosigma.beakerx.chart.GradientColor.BROWN_RED_YELLOW
val WHITE_BLUE = com.twosigma.beakerx.chart.GradientColor.WHITE_BLUE
}

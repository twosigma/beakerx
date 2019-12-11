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

package com.twosigma.beakerx.scala.chart.categoryplot.plotitem

import com.twosigma.beakerx.chart.xychart.plotitem.StrokeType
import com.twosigma.beakerx.scala.JavaAdapter._
import com.twosigma.beakerx.scala.chart.xychart.plotitem.BasedCategoryGraphicsProperties

import scala.collection.JavaConverters._

class CategoryStems extends com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryStems with CategoryStemsProperties

trait CategoryStemsProperties extends BasedCategoryGraphicsProperties {
  this: com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryStems =>

  def style: StrokeType = getStyle
  def styles: Seq[StrokeType] = getNullableList(()=> getStyles)
  def style_=(s: StrokeType): Unit = setStyle(s)
  def style_=(ss: Seq[StrokeType]): Unit = setStyle(ss.asJava)
}

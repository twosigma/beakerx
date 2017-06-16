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

import scala.collection.JavaConverters._

class SimpleTimePlot(data: util.List[util.Map[String, AnyRef]], columns: util.List[String]) extends com.twosigma.beakerx.chart.xychart.SimpleTimePlot(data, columns) {

  def this(data: util.List[util.Map[String, AnyRef]], columns: List[String], yLabel: String, displayNames: List[String]) {
    this(data, columns.asJava)
    super.setYLabel(yLabel)
    super.setDisplayNames(displayNames.asJava)
  }

}

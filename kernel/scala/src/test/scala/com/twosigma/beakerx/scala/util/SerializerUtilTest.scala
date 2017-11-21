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
package com.twosigma.beakerx.scala.util

import com.twosigma.beakerx.scala.chart.xychart.plotitem.Points
import com.twosigma.beakerx.util.SerializerUtil
import org.junit.Assert._
import org.junit.Test

class SerializerUtilTest {
  @Test
  @throws[Exception]
  def getTypeName(): Unit = {
    val points = new Points
    val anonymousPoints = new Points {}

    assertEquals("Points", SerializerUtil.getTypeName(points))
    assertEquals("Points", SerializerUtil.getTypeName(anonymousPoints))
  }
}
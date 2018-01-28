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

import com.twosigma.beakerx.chart.categoryplot.plotitem.BasedCategoryGraphics
import org.junit.Test
import org.scalatest.Matchers._

import scala.collection.JavaConverters._

class BasedCategoryGraphicsPropertiesTest {
  @Test
  def basesEmpty(): Unit = {
    val bcg = new BasedCategoryGraphics with BasedCategoryGraphicsProperties {}

    bcg.base shouldEqual 0
    bcg.bases shouldBe empty
  }

  @Test
  def basesLoaded(): Unit = {
    val bcg = new BasedCategoryGraphics with BasedCategoryGraphicsProperties {}

    bcg.base = 17
    bcg.base shouldEqual 17

    bcg.base = Seq(1, 2, 3)
    bcg.bases shouldEqual Seq(1, 2, 3)

    bcg.base = Seq(Seq(1, 2, 3), Seq(4, 5, 6), Seq(7, 8, 9))
    bcg.bases shouldEqual Seq(List(1, 2, 3).asJava, List(4, 5, 6).asJava, List(7, 8, 9).asJava)

    bcg.base = Seq(1 to 3, 4 to 6, 7 to 9)
    bcg.bases shouldEqual Seq(List(1, 2, 3).asJava, List(4, 5, 6).asJava, List(7, 8, 9).asJava)

    bcg.base = Seq(Array(1, 2, 3), Array(4, 5, 6), Array(7, 8, 9))
    bcg.bases shouldEqual Seq(List(1, 2, 3).asJava, List(4, 5, 6).asJava, List(7, 8, 9).asJava)

    assertTypeError("""bcg.base = Seq("1", "2", "3")""")
  }

  @Test
  def basesMixed(): Unit = {
    val bcg = new BasedCategoryGraphics with BasedCategoryGraphicsProperties {}

    bcg.base = Seq[BasedCategoryGraphicsProperties.CategoryBasesType](Seq(1, 2, 3), 4, Seq(7, 8, 9))
    bcg.bases shouldEqual Seq(List(1, 2, 3).asJava, 4, Seq(7, 8, 9).asJava)

    bcg.base = Seq[BasedCategoryGraphicsProperties.CategoryBasesType](1 to 3, 4, 7 to 9)
    bcg.bases shouldEqual Seq(List(1, 2, 3).asJava, 4, Seq(7, 8, 9).asJava)

    bcg.base = Seq[BasedCategoryGraphicsProperties.CategoryBasesType](Array(1, 2, 3), 4, Array(7, 8, 9))
    bcg.bases shouldEqual Seq(List(1, 2, 3).asJava, 4, Seq(7, 8, 9).asJava)
  }
}

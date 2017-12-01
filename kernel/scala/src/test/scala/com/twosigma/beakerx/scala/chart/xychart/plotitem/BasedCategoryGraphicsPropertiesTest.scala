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
import org.assertj.core.api.Assertions
import org.junit.Test
import java.util.Arrays.{asList => javaList}

import scala.collection.JavaConverters._

class BasedCategoryGraphicsPropertiesTest {
  @Test
  def basesEmpty(): Unit = {
    val bcg = new BasedCategoryGraphics with BasedCategoryGraphicsProperties {}

    Assertions.assertThat(bcg.base).isEqualTo(0.0d)
    Assertions.assertThat(bcg.bases.isEmpty).isTrue
  }

  @Test
  def basesLoaded(): Unit = {
    val bcg = new BasedCategoryGraphics with BasedCategoryGraphicsProperties {}

    bcg.base = 17
    Assertions.assertThat(bcg.base).isEqualTo(17.0f)

    bcg.base = Seq(1, 2, 3)
    Assertions.assertThat(bcg.bases.isEmpty).isFalse
    Assertions.assertThat[Any](bcg.bases.asJava).containsExactly(1, 2, 3)

    bcg.base = Seq(Seq(1, 2, 3), Seq(4, 5, 6), Seq(7, 8, 9))
    Assertions.assertThat[Any](bcg.bases.asJava).containsExactly(javaList(1, 2, 3), javaList(4, 5, 6), javaList(7, 8, 9))

    bcg.base = Seq(1 to 3, 4 to 6, 7 to 9)
    Assertions.assertThat[Any](bcg.bases.asJava).containsExactly(javaList(1, 2, 3), javaList(4, 5, 6), javaList(7, 8, 9))

    bcg.base = Seq(Array(1, 2, 3), Array(4, 5, 6), Array(7, 8, 9))
    Assertions.assertThat[Any](bcg.bases.asJava).containsExactly(javaList(1, 2, 3), javaList(4, 5, 6), javaList(7, 8, 9))
  }

  @Test
  def basesMixed(): Unit = {
    val bcg = new BasedCategoryGraphics with BasedCategoryGraphicsProperties {}

    bcg.base = Seq[BasedCategoryGraphicsProperties.CategoryBasesType](Seq(1, 2, 3), 4, Seq(7, 8, 9))
    Assertions.assertThat[Any](bcg.bases.asJava).containsExactly(javaList(1, 2, 3), 4, javaList(7, 8, 9))

    bcg.base = Seq[BasedCategoryGraphicsProperties.CategoryBasesType](1 to 3, 4, 7 to 9)
    Assertions.assertThat[Any](bcg.bases.asJava).containsExactly(javaList(1, 2, 3), 4, javaList(7, 8, 9))

    bcg.base = Seq[BasedCategoryGraphicsProperties.CategoryBasesType](Array(1, 2, 3), 4, Array(7, 8, 9))
    Assertions.assertThat[Any](bcg.bases.asJava).containsExactly(javaList(1, 2, 3), 4, javaList(7, 8, 9))
  }
}

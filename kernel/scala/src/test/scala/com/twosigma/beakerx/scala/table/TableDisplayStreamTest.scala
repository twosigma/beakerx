/*
 * Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.scala.table

import com.twosigma.beakerx.KernelTest
import com.twosigma.beakerx.scala.TestScalaEvaluator
import com.twosigma.beakerx.table.TableDisplayLoadingMode
import org.junit.Test
import org.scalatest.Matchers._

import scala.util.Random

class TableDisplayStreamTest {

  @Test
  def infiniteStream(): Unit = {
    val scalaEvaluator = TestScalaEvaluator.evaluator
    val importSeo = KernelTest.createSeo("")

    TableDisplay.setLoadingMode(TableDisplayLoadingMode.ENDLESS)
    val random = new Random()
    var index = 0
    val s1: Stream[Map[String, Any]] = Stream.continually {
      index+=1
      Map(
        "str1" -> index,
        "str2" -> random.nextFloat(),
        "str3" -> random.nextDouble())
    }
    val tableDisplay = new TableDisplay(s1)
    tableDisplay should not be null
  }
}
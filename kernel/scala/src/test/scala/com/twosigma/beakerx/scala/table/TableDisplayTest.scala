/*
 *  Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.scala.table

import com.twosigma.beakerx.KernelTest
import com.twosigma.beakerx.scala.TestScalaEvaluator
import com.twosigma.beakerx.scala.fileloader.CSV
import org.junit.{Before, Test}
import org.scalatest.Matchers._

class TableDisplayTest  {

  @Before
  @throws[Exception]
  def setUp(): Unit = {
    val scalaEvaluator = TestScalaEvaluator.evaluator
    val seo = KernelTest.createSeo("")
  }

  @Test
  def creatingTableDisplayFromCSVShouldPreserveOrder(): Unit = {
    val tableDisplay = new TableDisplay(new CSV().readFile("src/test/resources/interest-rates-small.csv"))
    val list = tableDisplay.getValues()
    list.head(0) shouldEqual 8.17
    list.head(1) shouldEqual 8.5632
    list.head(10) shouldEqual 0.4186
  }

}

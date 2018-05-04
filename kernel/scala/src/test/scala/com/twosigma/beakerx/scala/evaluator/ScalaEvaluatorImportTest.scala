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
package com.twosigma.beakerx.scala.evaluator

import com.twosigma.beakerx.jvm.`object`.SimpleEvaluationObject
import com.twosigma.beakerx.scala.TestScalaEvaluator
import org.junit.Test
import org.scalatest.Matchers._

// Test case taken from Scala
class ScalaEvaluatorImportTest {
  @Test
  def importHandling(): Unit = {
    val importCode = """
      |// import in various ways
      |import java.util.Date
      |import scala.util._
      |import scala.reflect.runtime.{universe => ru}
      |import ru.TypeTag
      """.stripMargin

    val classCode = """
      |// should be able to define this class with the imports above
      |class C[T](date: Date, rand: Random, typeTag: TypeTag[T])
      """.stripMargin

    val scalaEvaluator = TestScalaEvaluator.evaluator
    val importSeo = new SimpleEvaluationObject(importCode)
    val importEvaluate = scalaEvaluator.evaluate(importSeo, importCode)
    importEvaluate.isError shouldBe false

    val classSeo = new SimpleEvaluationObject(classCode)
    val classEvaluate = scalaEvaluator.evaluate(classSeo, classCode)
    classEvaluate.isError shouldBe false
  }
}
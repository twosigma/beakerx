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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.EvaluatorBaseTest;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import org.junit.AfterClass;
import org.junit.BeforeClass;

public class GroovyBaseEvaluatorTest extends EvaluatorBaseTest {

  private static BaseEvaluator evaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    evaluator = TestGroovyEvaluator.groovyEvaluator();
  }

  @AfterClass
  public static void tearDown() throws Exception {
    evaluator.exit();
  }

  @Override
  protected BaseEvaluator createNewEvaluator(){
    return TestGroovyEvaluator.groovyEvaluator();
  }

  @Override
  protected BaseEvaluator createNewEvaluator(TempFolderFactory tempFolderFactory) {
    return TestGroovyEvaluator.groovyEvaluator(tempFolderFactory);
  }

  @Override
  public BaseEvaluator evaluator() {
    return evaluator;
  }

  protected String codeForDivide16By2() {
    return "16/2";
  }

  protected String codeForDivisionByZero() {
    return "1/0";
  }

  protected String codeForHello() {
    return "\"Hello\"";
  }

  protected String codeForPrintln() {
    return "println(\"Hello\")";
  }

}

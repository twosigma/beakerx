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

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.junit.BeforeClass;
import org.junit.Test;

import java.math.BigDecimal;

import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.ERROR;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyEvaluatorArithmeticTest {

  private static GroovyEvaluator groovyEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
  }

  @Test
  public void shouldCreateFinishedResult() throws Exception {
    //given
    String code = "16/2";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    groovyEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat(seo.getPayload()).isEqualTo(new BigDecimal(8));
  }

  @Test
  public void shouldCreateErrorResultWithArithmeticExceptionWhenDivisionByZero() throws Exception {
    //given
    String code = "1/0";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    groovyEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(ERROR);
    assertThat((String) seo.getPayload()).contains("java.lang.ArithmeticException: Division by zero");
  }
}

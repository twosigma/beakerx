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
package com.twosigma.beakerx.evaluator;

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.junit.Test;

import java.nio.file.Files;

import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.ERROR;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static org.assertj.core.api.Assertions.assertThat;

public abstract class EvaluatorBaseTest {

  public abstract BaseEvaluator evaluator();

  protected abstract BaseEvaluator createNewEvaluator();

  @Test
  public void shouldDivide16By2() throws Exception {
    //given
    String code = codeForDivide16By2();
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    evaluator().evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat(seo.getPayload().toString()).isEqualTo("8");
  }

  protected String codeForDivide16By2() {
    return "16/2";
  }

  @Test
  public void shouldCreateErrorResultWithArithmeticExceptionWhenDivisionByZero() throws Exception {
    //given
    String code = codeForDivisionByZero();
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    evaluator().evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(ERROR);
    assertThat((String) seo.getPayload()).contains("java.lang.ArithmeticException");
  }

  protected String codeForDivisionByZero() {
    return "1/0";
  }

  @Test
  public void returnHelloString() throws Exception {
    //given
    String code = codeForHello();
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    evaluator().evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat((String) seo.getPayload()).contains("Hello");
  }

  protected String codeForHello() {
    return "\"Hello\"";
  }

  @Test
  public void returnPrintln() throws Exception {
    //given
    String code = codeForPrintln();
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    evaluator().evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat((String) seo.getPayload()).isNull();
  }

  protected String codeForPrintln() {
    return "println(\"Hello\")";
  }

  @Test
  public void shouldCreateTempFolder() throws Exception {
    //given
    //when
    BaseEvaluator groovyEvaluator = createNewEvaluator();
    //then
    assertThat(Files.exists(groovyEvaluator.getTempFolder())).isTrue();
    groovyEvaluator.exit();
  }

  @Test
  public void shouldRemoveTempFolder() throws Exception {
    //given
    BaseEvaluator groovyEvaluator = createNewEvaluator();
    //when
    groovyEvaluator.exit();
    //then
    assertThat(Files.exists(groovyEvaluator.getTempFolder())).isFalse();
  }

}

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

package com.twosigma.beakerx.javash.evaluator;

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.chart.xychart.Plot;
import com.twosigma.beakerx.javash.kernel.JavaKernelMock;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.assertj.core.api.Assertions;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.KERNEL_PARAMETERS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.ERROR;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;

public class JavaEvaluatorTest {

  private static JavaEvaluator javaEvaluator;

  @BeforeClass
  public static void setUp() throws Exception {
    javaEvaluator = new JavaEvaluator("id", "sid", cellExecutor(), getTestTempFolderFactory(), KERNEL_PARAMETERS);
    JavaKernelMock kernel = new JavaKernelMock("id", javaEvaluator);
    KernelManager.register(kernel);
  }

  @AfterClass
  public static void tearDown() throws Exception {
    KernelManager.register(null);
    javaEvaluator.exit();
  }

  @Test
  public void evaluatePlot_shouldCreatePlotObject() throws Exception {
    //given
    String code = "import com.twosigma.beakerx.chart.xychart.*;\n" +
            "Plot plot = new Plot(); plot.setTitle(\"test title\");\n" +
            "return plot;";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    javaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
    Assertions.assertThat(seo.getPayload() instanceof Plot).isTrue();
    Assertions.assertThat(((Plot) seo.getPayload()).getTitle()).isEqualTo("test title");
  }

  @Test
  public void evaluateDivisionByZero_shouldReturnArithmeticException() throws Exception {
    //given
    String code = "return 16/0;";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    javaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(ERROR);
    Assertions.assertThat((String) seo.getPayload()).contains("java.lang.ArithmeticException");
  }

  @Test
  public void singleImport() throws Exception {
    //given
    String code = "import java.util.Date;";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    javaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
  }

  @Test
  public void onlyPackage() throws Exception {
    //given
    String code = "package beaker.test;";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    javaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
  }

  @Test
  public void noCode() throws Exception {
    //given
    String code = "";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    javaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
  }

  @Test
  public void evaluateStreamInMultipleLines() throws Exception {
    //given
    String code = "import java.util.stream.Stream;\n" +
            "return Stream.of(1, 2, 3, 4).map(i -> { \n" +
            "    return i * 10;\n" +
            "});";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    javaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
  }

  @Test
  public void evaluateStreamInOneLine() throws Exception {
    //given
    String code = "import java.util.stream.Stream;\n" +
            "return Stream.of(1, 2, 3, 4).map(i -> { return i * 10;});";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    javaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
  }

  @Test
  public void evaluateVoid() throws Exception {
    //given
    String code = "System.out.println(\"Hello\");";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    javaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
  }

  @Test
  public void evaluateIfStatement() throws Exception {
    //given
    String code = "" +
            "if (true){\n" +
            "    return \"AAA\";\n" +
            "}else {\n" +
            "    return \"BBB\";\n" +
            "}";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    javaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
    Assertions.assertThat((String) seo.getPayload()).isEqualTo("AAA");
  }


}

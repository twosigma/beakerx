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
import com.twosigma.beakerx.evaluator.TestBeakerCellExecutor;
import com.twosigma.beakerx.javash.kernel.JavaKernelMock;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.ERROR;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;

public class JavaEvaluatorTest {

  private JavaEvaluator javaEvaluator;

  @Before
  public void setUp() throws Exception {
    javaEvaluator = new JavaEvaluator("id", "sid", TestBeakerCellExecutor.cellExecutor());
    JavaKernelMock kernel = new JavaKernelMock("id", javaEvaluator);
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
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
    Assertions.assertThat(((Plot)seo.getPayload()).getTitle()).isEqualTo("test title");
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
    Assertions.assertThat((String)seo.getPayload()).contains("java.lang.ArithmeticException");
  }

}

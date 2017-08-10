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
package com.twosigma.beakerx.kotlin.evaluator;

import com.twosigma.ExecuteCodeCallbackTest;
import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;

import com.twosigma.beakerx.evaluator.TestBeakerCellExecutor;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kotlin.kernel.KotlinKernelMock;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import com.twosigma.beakerx.chart.xychart.Plot;

import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.ERROR;

public class KotlinEvaluatorTest {

  private KotlinEvaluator evaluator;

  @Before
  public void setUp() throws Exception {
    evaluator = new KotlinEvaluator("id", "sid", TestBeakerCellExecutor.cellExecutor());
    KotlinKernelMock kernel = new KotlinKernelMock("id", evaluator);
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void javaImports_shouldBeAdjustedForKotlin() throws Exception {
    //given
    Map<String, Object> paramMap = new HashMap<>();
    // This import tests both "static" removal and "object" escaping.
    List<String> imports = Arrays.asList(
        "import static com.twosigma.beakerx.kotlin.evaluator.object.ImportTestHelper.staticMethod");
    paramMap.put(IMPORTS, imports);
    KernelParameters kernelParameters = new KernelParameters(paramMap);
    //when
    evaluator.setShellOptions(kernelParameters);
    String code = "val x = staticMethod()";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    evaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
  }

  @Test
  public void evaluatePlot_shouldCreatePlotObject() throws Exception {
    //given
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put(IMPORTS, Arrays.asList("import com.twosigma.beakerx.chart.xychart.*"));
    evaluator.setShellOptions(new KernelParameters(paramMap));
    String code = "val plot = Plot()\n" +
                "plot.setTitle(\"test title\");\n" +
                "plot.display();";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    evaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
//    Assertions.assertThat(seo.getPayload() instanceof Plot).isTrue();
//    Assertions.assertThat(((Plot) seo.getPayload()).getTitle()).isEqualTo("test title");
  }

  @Test
  public void evaluateDivisionByZero_shouldReturnArithmeticException() throws Exception {
    //given
    String code = "16/0";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    evaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(ERROR);
    Assertions.assertThat((String) seo.getPayload()).contains("java.lang.ArithmeticException");
  }

}

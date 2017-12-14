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

package com.twosigma.beakerx.scala.evaluator;

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.chart.xychart.Plot;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.scala.TestScalaEvaluator;
import com.twosigma.beakerx.scala.kernel.ScalaKernelMock;

import com.twosigma.beakerx.widgets.DisplayableWidget;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.KernelExecutionTest.DEMO_JAR;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.ERROR;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;

public class ScalaEvaluatorTest {

  private static ScalaEvaluator scalaEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    scalaEvaluator = TestScalaEvaluator.evaluator();
  }

  @Before
  public void setUp() throws Exception {
    ScalaKernelMock kernel = new ScalaKernelMock("id", scalaEvaluator);
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @AfterClass
  public static void tearDownClass() throws Exception {
    scalaEvaluator.exit();
  }

  @Test
  public void evaluatePlot_shouldCreatePlotObject() throws Exception {
    //given
    String code = "import com.twosigma.beakerx.chart.xychart.Plot;\n" +
            "val plot = new Plot();\n" +
            "plot.setTitle(\"test title\");";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    scalaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat(seo.getPayload() instanceof Plot).isTrue();
    assertThat(((Plot) seo.getPayload()).getTitle()).isEqualTo("test title");
  }

  @Test
  public void javaImports_shouldBeAdjustedForScala() throws Exception {
    //given
    Map<String, Object> paramMap = new HashMap<>();
    // This import tests both "static" removal and "object" escaping.
    List<String> imports = Arrays.asList(
            "import static com.twosigma.beakerx.scala.evaluator.object.ImportTestHelper.staticMethod");
    paramMap.put(IMPORTS, imports);
    EvaluatorParameters kernelParameters = new EvaluatorParameters(paramMap);
    //when
    scalaEvaluator.setShellOptions(kernelParameters);
    String code = "val x = staticMethod()";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    scalaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
  }

  @Test
  public void incompleteInput_shouldBeDetected() throws Exception {
    //given
    String code = "1 to 10 map { i => i * 2";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    scalaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(ERROR);
    assertThat((String) seo.getPayload()).contains("incomplete");
  }

  @Test
  public void displayTable() throws Exception {
    //given
    String code = "val table = new TableDisplay(new CsvPlotReader().readFile(\"src/test/resources/tableRowsTest.csv\"))\n" +
            "table";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    scalaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getPayload() instanceof DisplayableWidget).isTrue();
  }

  @Test
  public void newShellAndTheSameClassLoaderWhenAddJars() throws Exception {
    //given
    ScalaEvaluatorGlue shell = scalaEvaluator.getShell();
    ClassLoader classLoader = scalaEvaluator.getClassLoader();
    //when
    scalaEvaluator.addJarsToClasspath(singletonList(new PathToJar(DEMO_JAR)));
    //then
    assertThat(scalaEvaluator.getShell()).isNotEqualTo(shell);
    assertThat(scalaEvaluator.getClassLoader()).isEqualTo(classLoader);
  }
}


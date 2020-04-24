/*
 *  Copyright 2020 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.java11.evaluator;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Arrays;

import static com.twosigma.beakerx.KernelTest.createSeo;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.KERNEL_PARAMETERS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static org.assertj.core.api.Assertions.assertThat;

public class JavaEvaluatorTest {
  private static JavaEvaluator javaEvaluator;

  @BeforeClass
  public static void setUp() throws Exception {
    javaEvaluator = new JavaEvaluator("id",
            "sid",
            cellExecutor(),
            getTestTempFolderFactory(),
            KERNEL_PARAMETERS,
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
  }

  @AfterClass
  public static void tearDown() throws Exception {
    javaEvaluator.exit();
  }


  @Test
  public void testMultipleCells() throws Exception {
    //given
    String code = "var a = 1+1;";
    SimpleEvaluationObject seo = createSeo(code);
    javaEvaluator.evaluate(seo, code);
    //when
    String code2 = "a+a";
    SimpleEvaluationObject seo2 = createSeo(code2);
    TryResult evaluate2 = javaEvaluator.evaluate(seo2, code2);
    //then
    assertThat(evaluate2.result()).isEqualTo(4);
  }

  @Test
  public void testMultipleLines() throws Exception {
    //given
    String code = "import java.util.ArrayList;\n" +
            "var a = new ArrayList();\n" +
            "a.add(1);\n" +
            "a;";
    SimpleEvaluationObject seo = createSeo(code);
    //when
    TryResult evaluate = javaEvaluator.evaluate(seo, code);
    //then
    assertThat(evaluate.result()).isEqualTo(Arrays.asList(1));
  }

  @Test
  public void testMultipleLinesErrorInSecondLine() throws Exception {
    //given
    String code = "import java.util.ArrayList;\n" +
            "var a = ne ArrayList();\n" +
            "a.add(1);\n" +
            "a;";
    SimpleEvaluationObject seo = createSeo(code);
    //when
    TryResult evaluate = javaEvaluator.evaluate(seo, code);
    //then
    assertThat(evaluate.error()).contains("var a = ne ArrayList();");
  }
}
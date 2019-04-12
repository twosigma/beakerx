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
package com.twosigma.beakerx.javash.autocomplete;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.javash.evaluator.JavaEvaluator;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.twosigma.beakerx.evaluator.EvaluatorTest.KERNEL_PARAMETERS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static org.assertj.core.api.Assertions.assertThat;

public class JavaEvaluatorAutocompleteClassNameExpressionTest {

  private static BaseEvaluator evaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    evaluator = new JavaEvaluator("id",
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
    evaluator.exit();
  }

  private BaseEvaluator evaluator() {
    return evaluator;
  }

  @Test
  public void autocompleteToClassWithPackage() throws Exception {
    String code = "SimpleDateFor f = new java.text.SimpleDateFor";
    //when
    AutocompleteResult autocomplete = evaluator().autocomplete(code, code.length());
    //then
    assertThat(autocomplete.getMatches()).isNotEmpty();
    assertThat(autocomplete.getStartIndex()).isEqualTo(code.length() - 13);
  }

  @Test
  public void autocompleteToClassWithoutPackage() throws Exception {
    String code = "Integer f = new Integ";
    //when
    AutocompleteResult autocomplete = evaluator().autocomplete(code, code.length());
    //then
    assertThat(autocomplete.getMatches().size()).isGreaterThan(0);
    assertThat(autocomplete.getMatches()).contains("Integer");
    assertThat(autocomplete.getStartIndex()).isEqualTo(code.length() - 5);
  }

  @Test
  public void autocompleteToIntegerClassWithPackage() throws Exception {
    String code = "Integer f = new java.lang.Inte";
    //when
    AutocompleteResult autocomplete = evaluator().autocomplete(code, code.length());
    //then
    assertThat(autocomplete.getMatches()).isNotEmpty();
    assertThat(autocomplete.getStartIndex()).isEqualTo(code.length() - 4);
  }

  @Test
  public void autocompleteCreateNewIntegerWithPackage() throws Exception {
    String code = "new java.lang.Inte";
    //when
    AutocompleteResult autocomplete = evaluator().autocomplete(code, code.length());
    //then
    assertThat(autocomplete.getMatches()).isNotEmpty();
    assertThat(autocomplete.getStartIndex()).isEqualTo(code.length() - 4);
  }
}

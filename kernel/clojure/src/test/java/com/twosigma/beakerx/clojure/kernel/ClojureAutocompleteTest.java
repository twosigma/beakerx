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

package com.twosigma.beakerx.clojure.kernel;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.clojure.evaluator.ClojureEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.kernel.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.twosigma.beakerx.evaluator.EvaluatorTest.KERNEL_PARAMETERS;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;

public class ClojureAutocompleteTest {
  private static ClojureEvaluator clojureEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    clojureEvaluator = new ClojureEvaluator(
            "id",
            "sid",
            cellExecutor(),
            EvaluatorTest.getTestTempFolderFactory(),
            KERNEL_PARAMETERS,
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock()
    );
  }

  @Before
  public void setUp() throws Exception {
    ClojureKernelMock kernel = new ClojureKernelMock("id", clojureEvaluator);
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    clojureEvaluator.exit();
    KernelManager.register(null);
  }

  @Test
  public void autocomplete_autocompleteResultNotEmpty() throws Exception {
    //when
    AutocompleteResult autocomplete = clojureEvaluator.autocomplete("def", 3);
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
    Assertions.assertThat(autocomplete.getStartIndex()).isEqualTo(0);
  }

}

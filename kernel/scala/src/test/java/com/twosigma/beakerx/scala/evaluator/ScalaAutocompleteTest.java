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

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.jupyter.KernelManager;
import com.twosigma.beakerx.scala.ScalaKernelMock;
import com.twosigma.jupyter.KernelParameters;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.jupyter.comm.KernelControlSetShellHandler.CLASSPATH;
import static com.twosigma.beakerx.jupyter.comm.KernelControlSetShellHandler.IMPORTS;

public class ScalaAutocompleteTest {
  private static ScalaEvaluator scalaEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    scalaEvaluator = new ScalaEvaluator(null);
    scalaEvaluator.initialize("id", "sid");
    scalaEvaluator.setShellOptions(kernelParameters());
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

  @Test
  public void autocomplete_autocompleteResultNotEmpty() throws Exception {
    //when
    AutocompleteResult autocomplete = scalaEvaluator.autocomplete("val numbers = Li", 16);
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
    Assertions.assertThat(autocomplete.getStartIndex()).isEqualTo(14);
  }

  @Test
  public void autocomplete_multiLineOffsetCorrect() throws Exception {
    //when
    AutocompleteResult autocomplete = scalaEvaluator.autocomplete("val x = 3\nval numbers = Li", 26);
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
    Assertions.assertThat(autocomplete.getStartIndex()).isEqualTo(24);
  }

  private static KernelParameters kernelParameters() {
    Map<String, Object> params = new HashMap<>();
    params.put(IMPORTS, new ArrayList<>());
    params.put(CLASSPATH, new ArrayList<>());
    return new KernelParameters(params);
  }

}

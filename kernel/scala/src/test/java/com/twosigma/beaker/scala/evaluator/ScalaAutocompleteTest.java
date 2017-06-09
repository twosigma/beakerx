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

package com.twosigma.beaker.scala.evaluator;

import com.twosigma.beaker.autocomplete.AutocompleteResult;
import com.twosigma.beaker.scala.ScalaEvaluatorSetupTest;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class ScalaAutocompleteTest extends ScalaEvaluatorSetupTest {

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


}

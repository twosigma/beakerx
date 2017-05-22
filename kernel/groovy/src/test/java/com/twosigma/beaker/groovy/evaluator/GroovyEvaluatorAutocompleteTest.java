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
package com.twosigma.beaker.groovy.evaluator;

import com.twosigma.beaker.autocomplete.AutocompleteResult;
import org.assertj.core.api.Assertions;
import org.junit.BeforeClass;
import org.junit.Test;

public class GroovyEvaluatorAutocompleteTest {

  private static GroovyEvaluator groovyEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    groovyEvaluator = new GroovyEvaluator("shellId1", "sessionId1");
  }

  //@Test https://github.com/twosigma/beaker-notebook-private/issues/115
  public void shouldReturnAutocompleteForPrintln() throws Exception {
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(
                    "System.out.printl",17);
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
    Assertions.assertThat(autocomplete.getStartIndex()).isEqualTo(11);
  }

  @Test
  public void shouldReturnAutocompleteForPrintlnWithComment() throws Exception {
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(
            "//comment\n" +
            "System.out.printl",27);
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
    Assertions.assertThat(autocomplete.getStartIndex()).isEqualTo(21);
  }
}
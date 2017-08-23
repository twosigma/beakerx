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
package com.twosigma.beakerx.groovy.evaluator.autocomplete;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.groovy.evaluator.GroovyEvaluator;
import org.junit.BeforeClass;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class GroovyEvaluatorAutocompleteImportTest {

  private static GroovyEvaluator groovyEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
  }

  @Test
  public void autocompleteForImport_autocompleteIsNotEmpty() throws Exception {
    String code = "import java.awt.C";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    assertThat(autocomplete.getMatches()).isNotEmpty();
    assertThat(autocomplete.getStartIndex()).isEqualTo(code.length() - 1);
  }

  @Test
  public void shouldImportBoolean() throws Exception {
    String code = "import java.lang.Boo";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    assertThat(autocomplete.getMatches()).contains("Boolean");
    assertThat(autocomplete.getStartIndex()).isEqualTo(code.length() - 3);
  }

  @Test
  public void shouldAutocompleteToJavaIo() throws Exception {
    String code = "import java.io.";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    assertThat(autocomplete.getMatches()).isNotEmpty();

    assertThat(autocomplete.getStartIndex()).isEqualTo(code.length());
  }

}

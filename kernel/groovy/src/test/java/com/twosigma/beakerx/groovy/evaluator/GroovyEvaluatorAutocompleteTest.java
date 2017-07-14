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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import org.assertj.core.api.Assertions;
import org.junit.BeforeClass;
import org.junit.Test;

public class GroovyEvaluatorAutocompleteTest {

  private static GroovyEvaluator groovyEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
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

  @Test
  public void shouldReturnResultEqualToImport() throws Exception {
    String code = "im";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualToIgnoringCase("import");
  }

  @Test
  public void shouldReturnResultEqualToToString() throws Exception {
    String code = "def v = 'str'\nv.toS";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualToIgnoringCase("toString()");
  }

  @Test
  public void shouldReturnResultEqualToParamInt() throws Exception {
    String code = "def paramInt = 10\n" +
        "println par";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualToIgnoringCase("paramInt");
  }

  @Test
  public void shouldReturnResultEqualToParamDouble() throws Exception {
    String code = "def paramDouble = 10.0\n" +
        "println par";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualToIgnoringCase("paramDouble");
  }

  @Test
  public void shouldReturnResultEqualToParamString() throws Exception {
    String code = "def paramString = 'str'\n" +
        "println \"test ${par\n";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualToIgnoringCase("paramString");
  }

  @Test
  public void shouldReturnResultEqualToParamArray() throws Exception {
    String code = "def paramArray = [1, 3, 5]\n" +
        "println par";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualToIgnoringCase("paramArray");
  }

  @Test
  public void shouldReturnResultEqualToParamMap() throws Exception {
    String code = "def paramMap = ['abc':1, 'def':2, 'xyz':3]\n" +
        "println par";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualToIgnoringCase("paramMap");
  }

  @Test
  public void shouldReturnResultEqualToBLUE() throws Exception {
    String code = "import static java.awt.Color.BLUE\n" +
        "println BL";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualToIgnoringCase("BLUE");
  }

  @Test
  public void autocompleteForImport_autocompleteIsNotEmpty() throws Exception {
    String code = "import java.awt.C";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
  }

  @Test
  public void autocompleteForClass_shouldReturnResultEqualToCoordinates() throws Exception {
    String code = "class Coordinates {\n" +
        "double latitude\n" +
        "double longitude }\n" +
        "def coordinates = new Coordinates(latitude: 43.23, longitude: 3.67)\n" +
        "this.class.co";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualToIgnoringCase("coordinates");
  }

}
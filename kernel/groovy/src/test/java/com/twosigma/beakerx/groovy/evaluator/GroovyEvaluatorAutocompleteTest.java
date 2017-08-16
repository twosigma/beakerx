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

  @Test
  public void shouldReturnPrintlnForFirstLine() throws Exception {
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(
            "System.out.printl\n" +
                    "System.out.print\n" +
                    "System.out.prin\n" +
                    "System.out.pri\n", 17);
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
    Assertions.assertThat(autocomplete.getStartIndex()).isEqualTo(11);
  }

  @Test
  public void shouldReturnPrintlnForSecondLine() throws Exception {
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(
            "System.out.printl\n" +
                    "System.out.print\n" +
                    "System.out.prin\n" +
                    "System.out.pri\n", 34);
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
    Assertions.assertThat(autocomplete.getStartIndex()).isEqualTo(29);
  }

  @Test
  public void shouldReturnAutocompleteForPrintlnWithComment() throws Exception {
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(
            "//comment\n" +
                    "System.out.printl\n" +
                    "System.out.printl", 27);
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
    Assertions.assertThat(autocomplete.getStartIndex()).isEqualTo(21);
  }

  @Test
  public void autocompleteMatchesForSystemAfterDot() throws Exception {
    String code = "System.";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
  }

  @Test
  public void autocompleteMatchesForSystemOutAfterDot() throws Exception {
    String code = "System.out.";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
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
            "println \"test ${par";
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

  @Test
  public void shouldReturnResultEqualToPackage() throws Exception {
    String code = "pack";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
  }

  @Test
  public void shouldReturnImplements() throws Exception {
    String code = "class Coordinates implemen";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualTo("implements");
  }

  @Test
  public void shouldReturnExtends() throws Exception {
    String code = "class Coordinates exten";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualTo("extends");
  }

  @Test
  public void shouldReturnClass() throws Exception {
    String code = "cla";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualTo("class");
  }

  @Test
  public void shouldImportBoolean() throws Exception {
    String code = "import java.lang.Boo";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualTo("Boolean");
  }

  @Test
  public void shouldAutocompleteToSystem() throws Exception {
    String code = "Syste";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches().get(0)).isEqualTo("System");
  }

  @Test
  public void shouldAutocompleteToJavaIo() throws Exception {
    String code = "import java.io.";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
  }

  @Test
  public void shouldAutocompleteToB() throws Exception {
    String code = "import java.awt.Color\n" +
            "println Color.B";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
  }


  @Test
  public void shouldAutocompleteWithAsterisk() throws Exception {
    String code = "import java.awt.*\n" +
            "println Color.B";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
  }

  @Test
  public void autocompleteShouldNotMatchForEmptyString() throws Exception {
    String code = "";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isEmpty();
  }

  @Test
  public void defaultImportsAutocompleteToRED() throws Exception {
    String code = "def colors = [ Color.RE";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
  }

  @Test
  public void autocompleteMatchesForColorAfterDot() throws Exception {
    String code = "Color.";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
  }


  @Test
  public void autocompleteWithMagicCommands() throws Exception {
    String code = "%classpath add jar demoResources/BeakerXClasspathTest.jar\n" +
                  "System.";
    //when
    AutocompleteResult autocomplete = groovyEvaluator.autocomplete(code, code.length());
    //then
    Assertions.assertThat(autocomplete.getMatches()).isNotEmpty();
  }


}
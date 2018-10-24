/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.evaluator;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.AutocompleteService;
import com.twosigma.beakerx.autocomplete.AutocompleteServiceBeakerx;
import org.junit.Test;

import java.util.ArrayList;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

public class AutocompleteServiceImplTest {

  private AutocompleteService sut = new AutocompleteServiceBeakerx() {
    @Override
    protected AutocompleteResult doAutocomplete(String txt, int cur) {
      return new AutocompleteResult(new ArrayList<>(), 0);
    }
  };


  @Test
  public void shouldAutocompleteToTwoClasspath() {
    //given
    String txt = "%";
    //when
    AutocompleteResult actual = sut.find(txt, txt.length());
    //then
    assertThat(actual.getMatches()).contains("%classpath");
    assertThat(actual.getMatches()).contains("%%classpath");
    assertThat(actual.getStartIndex()).isEqualTo(0);
  }

  @Test
  public void shouldAutocompleteToClasspath() {
    //given
    String txt = "%classp";
    //when
    AutocompleteResult result = sut.find(txt, txt.length());
    //then
    assertThat(result.getMatches()).contains("%classpath");
    assertThat(result.getStartIndex()).isEqualTo(0);
  }

  @Test
  public void shouldNotFindAutocompleteWhenGivenWholeWord() {
    //given
    String txt = "%classpath";
    //when
    AutocompleteResult result = sut.find(txt, txt.length());
    //then
    assertThat(result.getMatches()).isEmpty();
  }

  @Test
  public void shouldAutocompleteToAdd() {
    //given
    String txt = "%classpath ";
    //when
    AutocompleteResult result = sut.find(txt, txt.length());
    //then
    assertThat(result).isEqualTo(new AutocompleteResult(asList("add"), txt.length()));
  }

  @Test
  public void shouldShowAdd() {
    //given
    String ad = "ad";
    String txt = "%classpath " + ad;
    //when
    AutocompleteResult result = sut.find(txt, txt.length());
    //then
    assertThat(result).isEqualTo(new AutocompleteResult(asList("add"), txt.length() - ad.length()));
  }

  @Test
  public void shouldShowAllOptionsForAdd() {
    //given
    String txt = "%classpath add ";
    //when
    AutocompleteResult actual = sut.find(txt, txt.length());
    //then
    assertThat(actual.getMatches()).contains("jar");
    assertThat(actual.getMatches()).contains("mvn");
    assertThat(actual.getMatches()).contains("dynamic");
    assertThat(actual.getStartIndex()).isEqualTo(txt.length());
  }

  @Test
  public void shouldReturnNothingWhenLastOptionEndsCommand() {
    //given
    String txt = "%classpath add dynamic";
    //when
    AutocompleteResult result = sut.find(txt, txt.length());
    //then
    assertThat(result.getMatches()).isEmpty();
  }

  @Test
  public void shouldReturnNothingWhenSpaceAfterLastOptionWhichEndsCommand() {
    //given
    String txt = "%classpath add mvn ";
    //when
    AutocompleteResult result = sut.find(txt, txt.length());
    //then
    assertThat(result.getMatches()).isEmpty();
  }

  @Test
  public void shouldListFiles() {
    //given
    String txt = "%classpath add jar ";
    //when
    AutocompleteResult actual = sut.find(txt, txt.length());
    //then
    assertThat(actual.getMatches()).isNotEmpty();
  }

  @Test
  public void shouldListFilesWithDir() {
    //given
    String txt = "%classpath add jar ../";
    //when
    AutocompleteResult actual = sut.find(txt, txt.length());
    //then
    assertThat(actual.getMatches()).isNotEmpty();
  }
}
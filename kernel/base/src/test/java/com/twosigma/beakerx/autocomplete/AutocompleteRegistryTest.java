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

package com.twosigma.beakerx.autocomplete;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

public class AutocompleteRegistryTest {

  private int type = 1;
  private String[] keys = new String[]{ "System", "out", "print"};
  private AutocompleteCandidate aParent;
  AutocompleteRegistry autocompleteRegistry;

  @Before
  public void setUp() throws Exception {
    autocompleteRegistry = new AutocompleteRegistry(2);
    aParent = new AutocompleteCandidate(type, "System");
    AutocompleteCandidate aChild = new AutocompleteCandidate(type, "out");
    aChild.addChildrens(
        Arrays.asList(
            new AutocompleteCandidate(type, "println(adouble)"),
            new AutocompleteCandidate(type, "println(afloat)"),
            new AutocompleteCandidate(type, "println(along)")));
    aParent.addChildren(aChild);
  }

  @Test
  public void searchCandidates_shouldFindThreeElements(){
    //given
    autocompleteRegistry.addCandidate(aParent);
    AutocompleteCandidate aSearch = new AutocompleteCandidate(type, keys);
    //when
    List<String> ret = autocompleteRegistry.searchCandidates(Arrays.asList(aSearch));
    //then
    Assertions.assertThat(ret).isNotEmpty();
    Assertions.assertThat(ret.size()).isEqualTo(3);
  }

  @Test
  public void clearForType_dontFindCandidates(){
    //given
    autocompleteRegistry.addCandidate(aParent);
    AutocompleteCandidate aSearch = new AutocompleteCandidate(type, keys);
    //when
    autocompleteRegistry.clearForType(type);
    //then
    List<String> ret = autocompleteRegistry.searchCandidates(Arrays.asList(aSearch));
    Assertions.assertThat(ret).isEmpty();
  }

}

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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AutocompleteCandidateTest {

  private String[] keys = new String[]{ "System", "out", "print"};
  private AutocompleteCandidate autocompleteCandidate;

  @Before
  public void setUp() throws Exception {
    autocompleteCandidate = new AutocompleteCandidate(1, "key");
  }

  @Test
  public void createWithTypeAndKey_hasTypeAndKey(){
    //when
    AutocompleteCandidate aCandidate = new AutocompleteCandidate(1, "key");
    //then
    Assertions.assertThat(aCandidate.getType()).isEqualTo(1);
    Assertions.assertThat(aCandidate.getKey()).isEqualTo("key");
  }

  @Test
  public void createWithTypeAndKey_hasChildrenIsNull(){
    //when
    AutocompleteCandidate aCandidate = new AutocompleteCandidate(1, "key");
    //then
    Assertions.assertThat(aCandidate.getChildrens()).isNull();
  }

  @Test
  public void createWithTypeAndKeys_hasTypeAndKeyAndChildrens(){
    //when
    AutocompleteCandidate aCandidate = new AutocompleteCandidate(1, keys);
    //then
    Assertions.assertThat(aCandidate.getType()).isEqualTo(1);
    Assertions.assertThat(aCandidate.getKey()).isEqualTo("System");
    Assertions.assertThat(aCandidate.getChildrens()).isNotEmpty();
  }

  @Test
  public void createWithMaxNumKeysIsTwo_hasOneElementOfChildrens(){
    //when
    AutocompleteCandidate aCandidate = new AutocompleteCandidate(1, keys, 2);
    //then
    Assertions.assertThat(aCandidate.getChildrens()).isNotEmpty();
    AutocompleteCandidate child = aCandidate.getChildrens().get(0);
    Assertions.assertThat(child.getChildrens()).isNull();
  }

  @Test
  public void addTwoChildrens_hasTwoChildrens(){
    //given
    AutocompleteCandidate children1 = new AutocompleteCandidate(1, "ch1");
    AutocompleteCandidate children2 = new AutocompleteCandidate(1, "ch2");
    //when
    autocompleteCandidate.addChildrens(Arrays.asList(children1, children2));
    //then
    Assertions.assertThat(autocompleteCandidate.getChildrens()).isNotEmpty();
    Assertions.assertThat(autocompleteCandidate.getChildrens().size()).isEqualTo(2);
  }

  @Test
  public void addOneChild_hasOneElementOfChildrens(){
    //given
    AutocompleteCandidate aChild = new AutocompleteCandidate(1, "child");
    //when
    autocompleteCandidate.addChildren(aChild);
    //then
    Assertions.assertThat(autocompleteCandidate.getChildrens()).isNotEmpty();
    Assertions.assertThat(autocompleteCandidate.getChildrens().size()).isEqualTo(1);
  }

  @Test
  public void searchCandidates_shouldFindThreeElements(){
    List<String> ret = new ArrayList<>();
    //given
    AutocompleteCandidate aParent = new AutocompleteCandidate(1, "System");
    AutocompleteCandidate aChild = new AutocompleteCandidate(1, "out");
    aChild.addChildrens(
        Arrays.asList(
            new AutocompleteCandidate(1, "println(adouble)"),
            new AutocompleteCandidate(1, "println(afloat)"),
            new AutocompleteCandidate(1, "println(along)")));
    aParent.addChildren(aChild);
    AutocompleteCandidate aSearch = new AutocompleteCandidate(1, keys);
    //when
    aParent.searchCandidates(ret, aSearch);
    //then
    Assertions.assertThat(ret).isNotEmpty();
    Assertions.assertThat(ret.size()).isEqualTo(3);
  }


  @Test
  public void findLeaf_shouldFindOneElement(){
    //given
    AutocompleteCandidate aParent = new AutocompleteCandidate(1, keys);
    //when
    AutocompleteCandidate leaf = aParent.findLeaf();
    //then
    Assertions.assertThat(leaf).isNotNull();
    Assertions.assertThat(leaf.getKey()).isEqualTo("print");
  }

  @Test
  public void clone_shouldCloneAutocompleteCandidate(){
    //given
    AutocompleteCandidate aParent = new AutocompleteCandidate(1, keys);
    //when
    AutocompleteCandidate clone = aParent.clone();
    //then
    Assertions.assertThat(clone).isNotNull();
    Assertions.assertThat(clone.getKey()).isEqualTo(aParent.getKey());
    Assertions.assertThat(clone.getType()).isEqualTo(aParent.getType());
    Assertions.assertThat(clone.getChildrens().size()).isEqualTo(aParent.getChildrens().size());
    Assertions.assertThat(clone).isNotEqualTo(aParent);
  }
}

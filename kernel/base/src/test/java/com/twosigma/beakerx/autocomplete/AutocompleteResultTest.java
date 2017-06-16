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
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

public class AutocompleteResultTest {

  public List<String> matches = Arrays.asList("a", "b");
  public int startIndex = 1;

  @Test
  public void createWithMatchesAndStartIndex_hasMatchesAndStartIndex(){
    //when
    AutocompleteResult aResult = new AutocompleteResult(matches, startIndex);
    //then
    Assertions.assertThat(aResult.getMatches()).isNotEmpty();
    Assertions.assertThat(aResult.getMatches().size()).isEqualTo(2);
    Assertions.assertThat(aResult.getStartIndex()).isEqualTo(startIndex);
  }

}

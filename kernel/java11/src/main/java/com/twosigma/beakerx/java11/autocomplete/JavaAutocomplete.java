/*
 *  Copyright 2020 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.java11.autocomplete;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import jdk.jshell.SourceCodeAnalysis;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class JavaAutocomplete {


  public JavaAutocomplete() {
  }

  public AutocompleteResult find(String code, int cur, SourceCodeAnalysis sourceCodeAnalysis) {
    int[] anchor = new int[]{-1};
    List<SourceCodeAnalysis.Suggestion> suggestions = sourceCodeAnalysis.completionSuggestions(code, cur, anchor);
    if (suggestions.isEmpty()) {
      return new AutocompleteResult(new ArrayList<>(), 0);
    }
    List<String> matches = suggestions.stream()
            .filter(SourceCodeAnalysis.Suggestion::matchesType)
            .map(SourceCodeAnalysis.Suggestion::continuation)
            .distinct()
            .collect(Collectors.toList());
    return new AutocompleteResult(matches, anchor[0]);
  }
}

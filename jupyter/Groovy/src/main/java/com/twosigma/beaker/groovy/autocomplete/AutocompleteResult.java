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
package com.twosigma.beaker.groovy.autocomplete;

import org.antlr.v4.runtime.ParserRuleContext;

import java.util.List;

public class AutocompleteResult {

  private List<String> matches;
  private int startIndex;

  public AutocompleteResult(List<String> matches, int startIndex) {
    this.matches = matches;
    this.startIndex = startIndex;
  }

  public List<String> getMatches() {
    return matches;
  }

  public int getStartIndex() {
    return startIndex;
  }

  public static int getStartIndex(ParserRuleContext ctx) {
    return ctx.getStop().getStartIndex();
  }
}

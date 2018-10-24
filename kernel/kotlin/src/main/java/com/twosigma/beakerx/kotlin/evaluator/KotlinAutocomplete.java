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
package com.twosigma.beakerx.kotlin.evaluator;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.AutocompleteServiceBeakerx;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;

import java.util.ArrayList;
import java.util.List;

public class KotlinAutocomplete extends AutocompleteServiceBeakerx {

  public KotlinAutocomplete(MagicCommandAutocompletePatterns magicCommandAutocompletePatterns) {
    super(magicCommandAutocompletePatterns);
  }

  @Override
  protected AutocompleteResult doAutocomplete(String txt, int cur) {
    List<String> ret = new ArrayList<>();
    //TODO
    return new AutocompleteResult(ret, -1);
  }
}

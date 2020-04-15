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
import com.twosigma.beakerx.autocomplete.AutocompleteServiceBeakerx;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.kernel.Imports;

import java.util.ArrayList;


public class JavaAutocomplete extends AutocompleteServiceBeakerx {

  private final Imports imports;
  private JavaClasspathScanner cps;
  private ClassLoader classLoader;

  public JavaAutocomplete(JavaClasspathScanner _cps, ClassLoader classLoader, Imports imports, MagicCommandAutocompletePatterns autocompletePatterns) {
    super(autocompletePatterns);
    cps = _cps;
    this.classLoader = classLoader;
    this.imports = imports;
  }

  @Override
  protected AutocompleteResult doAutocomplete(String txt, int cur) {
    return new AutocompleteResult(new ArrayList<>(), 0);
  }
}

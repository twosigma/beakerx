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
package com.twosigma.beakerx.clojure.autocomplete;

import clojure.lang.Var;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.AutocompleteServiceBeakerx;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static com.twosigma.beakerx.clojure.evaluator.ClojureEvaluator.beaker_clojure_ns;

public class ClojureAutocomplete extends AutocompleteServiceBeakerx {


  private Var clojureLoadString;
  private String shellId;

  public ClojureAutocomplete(Var clojureLoadString, String shellId, MagicCommandAutocompletePatterns autocompletePatterns) {
    super(autocompletePatterns);
    this.clojureLoadString = clojureLoadString;
    this.shellId = shellId;
  }

  @Override
  protected AutocompleteResult doAutocomplete(String txt, int cur) {
    return autocomplete(txt, cur, clojureLoadString, shellId);
  }

  private AutocompleteResult autocomplete(String code, int caretPosition, Var clojureLoadString, String shellId) {
    int i = caretPosition;
    while (i > 0) {
      char c = code.charAt(i - 1);
      if (!Character.isUnicodeIdentifierStart(c) || "[]{}()/\\".indexOf(c) >= 0) {
        break;
      } else {
        i--;
      }
    }

    String _code = code.substring(i, caretPosition);

    String apropos = "(repl_%1$s/apropos \"%2$s\")";

    Object o = clojureLoadString.invoke(String.format(apropos, shellId, _code));
    List<String> result = new ArrayList<String>();

    for (Object s : ((Collection) o)) {

      String whole = s.toString();
      int d = whole.indexOf('/');

      if (d > 0) {
        String woNS = whole.substring(d + 1);
        String ns = whole.substring(0, d);
        result.add(woNS);
        String currenClojureNS = String.format("%1$s_%2$s", beaker_clojure_ns, shellId);
        if (!currenClojureNS.equals(ns) && !"clojure.core".equals(ns)) result.add(whole);
      } else {
        result.add(whole);
      }

    }
    return new AutocompleteResult(result, i);
  }

}

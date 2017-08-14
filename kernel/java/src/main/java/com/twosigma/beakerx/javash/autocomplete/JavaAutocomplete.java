/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.javash.autocomplete;

import java.util.ArrayList;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.ClasspathScanner;

import static com.twosigma.beakerx.javash.evaluator.JavaEvaluator.WRAPPER_CLASS_NAME;

public class JavaAutocomplete {

  public JavaAutocomplete(ClasspathScanner c) {
    // TODO
  }

  public void addImport(String st) {
    // TODO
  }

  public AutocompleteResult doAutocomplete(String code, int caretPosition) {

    // this is a code sniplet...
    String[] codev = code.split("\n");
    int insert = 0;
    while (insert < codev.length) {
      if (!codev[insert].contains("package") && !codev[insert].contains("import") && !codev[insert].trim().isEmpty())
        break;
      insert++;
    }

    final String CODE_TO_INSERT = "public class " + WRAPPER_CLASS_NAME + " { public static void beakerRun() { \n";

    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < insert; i++) {
      sb.append(codev[i]);
      sb.append('\n');
    }

    if (caretPosition >= sb.length()) {
      caretPosition += CODE_TO_INSERT.length();
    }
    sb.append(CODE_TO_INSERT);
    for (int i = insert; i < codev.length; i++) {
      sb.append(codev[i]);
      sb.append('\n');
    }

    return new AutocompleteResult(new ArrayList<>(), caretPosition);
  }

}

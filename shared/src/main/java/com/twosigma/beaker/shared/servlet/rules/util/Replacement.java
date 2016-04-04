/*
 *  Copyright 2016 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.shared.servlet.rules.util;

public class Replacement {
  private String target;
  private String replacement;
  private boolean regex;

  public Replacement(String target, String replacement) {
    this(target, replacement, false);
  }

  public Replacement(String target, String replacement, boolean regex) {
    this.target = target;
    this.replacement = replacement;
    this.regex = regex;
  }

  public String getTarget() {
    return target;
  }

  public String getReplacement() {
    return replacement;
  }

  public boolean isRegex() {
    return regex;
  }
}

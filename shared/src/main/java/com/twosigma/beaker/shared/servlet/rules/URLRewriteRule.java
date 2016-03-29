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
package com.twosigma.beaker.shared.servlet.rules;

import org.apache.commons.lang3.tuple.Pair;

import java.util.Collections;
import java.util.List;

public class URLRewriteRule {

  protected static final String EMPTY_STRING = "";
  protected static final String SLASH = "/";
  protected static final String BEAKER = "beaker";
  protected static final String SLASH_BEAKER = SLASH.concat(BEAKER);

  private List<Pair<String, String>> replacements = Collections.emptyList();

  public String apply(final String url, final String path) {
      String result;
      result = this.modify(url);
      result = this.replace(result, path);
      result = this.concat(result);
      return result;
  }

  protected String modify(String url) {
    return url;
  }

  protected String concat(String url) {
    return url;
  }

  protected String replace(String url, String path) {
    String result = url;
    for (Pair pair : getReplacements()) {
      result = result.replace(((String) pair.getKey()), ((String) pair.getValue()));
    }
    return result;
  }

  public boolean satisfy(final String path) {
    return true;
  }

  public List<Pair<String, String>> getReplacements() {
    return replacements;
  }

  public void setReplacements(List<Pair<String, String>> replacements) {
    this.replacements = replacements;
  }
}

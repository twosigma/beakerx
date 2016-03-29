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

import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;

import java.util.LinkedList;
import java.util.List;

public class RootSlashRule extends URLRewriteRule {

  private String startPage;

  public RootSlashRule(String corePort, String serverPort, String startPage) {
    this.startPage = startPage;
    List<Pair<String, String>> replacements = new LinkedList<>();
    replacements.add(new ImmutablePair<>(corePort, serverPort));
    setReplacements(replacements);
  }

  @Override
  protected String modify(String url) {
    String result = url;
    if (result.endsWith(SLASH)) {
      result = result.substring(0, result.length() - 1);
    }
    return result;
  }

  @Override
  protected String concat(String url) {
    return url.concat(this.startPage);
  }

  @Override
  public boolean satisfy(final String path) {
    return SLASH.equals(path);
  }
}

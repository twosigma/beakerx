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

import com.twosigma.beaker.shared.servlet.rules.util.Replacement;

import java.util.LinkedList;
import java.util.List;

import static com.twosigma.beaker.shared.servlet.rules.util.UrlUtils.getPath;

public class SlashBeakerRule extends ProxyRuleImpl {

  private String startPage;

  public SlashBeakerRule(String corePort, String serverPort, String startPage) {
    this.startPage = startPage;
    List<Replacement> replacements = new LinkedList<>();
    replacements.add(new Replacement(corePort, serverPort));
    setReplacements(replacements);
  }

  @Override
  protected String replace(String url) {
    return super.replace(url).replace(getPath(url), startPage);
  }

  @Override
  public boolean satisfy(final String path) {
    return SLASH_BEAKER.equals(path);
  }
}
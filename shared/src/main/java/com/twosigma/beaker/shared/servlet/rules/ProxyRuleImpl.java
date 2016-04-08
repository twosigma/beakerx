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
import org.eclipse.jetty.client.api.Request;

import java.util.Collections;
import java.util.List;

import static java.util.Arrays.asList;

public class ProxyRuleImpl implements ProxyRule {

  protected static final String EMPTY_STRING = "";
  protected static final String SLASH = "/";
  protected static final String BEAKER = "beaker";
  protected static final String SLASH_BEAKER = SLASH.concat(BEAKER);

  private List<Replacement> replacements = Collections.emptyList();
  private List<String> pathRegexes;
  private boolean finalRule = true;

  public ProxyRuleImpl() {
  }

  public ProxyRuleImpl(String pathRegex, Replacement... replacements) {
    this(Collections.singletonList(pathRegex), replacements);
  }

  public ProxyRuleImpl(List<String> pathRegexes, Replacement... replacements) {
    this.pathRegexes = pathRegexes;
    this.replacements = asList(replacements);
  }

  @Override
  public boolean satisfy(String path) {
    if (pathRegexes != null) {
      for (String pathRegex : pathRegexes) {
        if (path.matches(pathRegex)) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  public String rewriteTarget(final String url, String path) {
    return this.concat(this.replace(this.modify(url)));
  }

  @Override
  public void setHeaders(Request proxyRequest, String pathInfo) {
  }

  protected String modify(String url) {
    return url;
  }

  protected String concat(String url) {
    return url;
  }

  protected String replace(String url) {
    String result = url;
    for (Replacement replacement : getReplacements()) {
      result = replacement.isRegex()
          ? result.replaceAll(replacement.getTarget(), getReplacement(replacement))
          : result.replace(replacement.getTarget(), getReplacement(replacement));
    }
    return result;
  }

  private String getReplacement(Replacement replacement) {
    final String replacementTemplate = replacement.getReplacement();
    return prepareReplacement(replacementTemplate);
  }

  protected String prepareReplacement(String replacementTemplate) {
    return replacementTemplate;
  }

  public List<Replacement> getReplacements() {
    return replacements;
  }

  public void setReplacements(List<Replacement> replacements) {
    this.replacements = replacements;
  }

  protected void rewriteHeader(org.eclipse.jetty.client.api.Request request, String header, String value) {
    request.header(header, null);
    request.header(header, value);
  }

  public boolean isFinal() {
    return finalRule;
  }

  public ProxyRuleImpl setFinal(boolean newFinal) {
    this.finalRule = newFinal;
    return this;
  }
}

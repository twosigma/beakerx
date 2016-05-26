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

import javax.servlet.http.HttpServletRequest;

import static org.apache.commons.lang3.StringUtils.isNoneBlank;

public class EraseHashAndBeakerRule extends ProxyRuleImpl {

  private String replaceTemplate;
  private String replacement;

  public EraseHashAndBeakerRule(String hash) {
    if (isNoneBlank(hash)) {
      replaceTemplate = SLASH + hash + SLASH_BEAKER;
      replacement = EMPTY_STRING;
    } else { // in embed mode hash is blank
      replaceTemplate = SLASH_BEAKER + SLASH;
      replacement = SLASH;
    }
  }

  @Override
  protected String replace(String url) {
    return url.replace(replaceTemplate, replacement);
  }

  @Override
  public boolean satisfy(final HttpServletRequest request) {
    return request.getPathInfo().contains(replaceTemplate);
  }
}

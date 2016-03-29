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

public class MainPageRule extends URLRewriteRule {

  private static final String SLASH_BEAKER_SLASH = "/beaker/";
  private String mainPage;

  public MainPageRule(String mainPage) {
    this.mainPage = mainPage;
  }

  @Override
  protected String replace(String url, String path) {
    return url.replace(path, this.mainPage);
  }

  @Override
  public boolean satisfy(final String path) {
    return SLASH_BEAKER_SLASH.equals(path);
  }
}

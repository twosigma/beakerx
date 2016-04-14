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

import org.eclipse.jetty.client.api.Request;
import org.eclipse.jetty.client.api.Response;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.net.HttpCookie;

import static com.twosigma.beaker.shared.servlet.rules.util.UrlUtils.getPath;

public class MainPageRule extends ProxyRuleImpl {

  private static final String SLASH_BEAKER_SLASH = "/beaker/";
  private String mainPage;
  private String authToken;

  public MainPageRule(String mainPage, String authToken) {
    this.mainPage = mainPage;
    this.authToken = authToken;
  }

  @Override
  protected String replace(String url) {
    return url.replace(getPath(url), this.mainPage);
  }

  @Override
  public boolean satisfy(final String path) {
    return SLASH_BEAKER_SLASH.equals(path);
  }

  @Override
  public void configureResponse(HttpServletResponse response) {
    Cookie xsrfTokenCookie = new Cookie("XSRF-TOKEN", this.authToken);
    xsrfTokenCookie.setPath("/");
    response.addCookie(xsrfTokenCookie);
  }
}

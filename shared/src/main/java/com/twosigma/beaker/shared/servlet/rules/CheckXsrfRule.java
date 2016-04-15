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

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import static java.lang.String.format;

public class CheckXsrfRule extends ProxyRuleImpl {
  private String authToken;

  public CheckXsrfRule(String authToken) {
    this.authToken = authToken;
  }

  @Override
  public boolean satisfy(HttpServletRequest request) {
    String path = request.getPathInfo();
    if (path.startsWith("/static")) { // shouldn't verify XSRF token for static resources requests
      return false;
    }
    return super.satisfy(request);
  }

  @Override
  public String rewriteTarget(String url, HttpServletRequest request) {
    checkXsrf(request);
    return super.rewriteTarget(url, request);
  }

  private void checkXsrf(HttpServletRequest request) {
    for (Cookie cookie : request.getCookies()) {
      if (XSRF_TOKEN_COOKIE_NAME.equals(cookie.getName())) {
        if(!this.authToken.equals(cookie.getValue())) {
          throw new RuntimeException(format("Ivalid auth token %s", cookie.getValue()));
        }
        return;
      }
    }
  }
}

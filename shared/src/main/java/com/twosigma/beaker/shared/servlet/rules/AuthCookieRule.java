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

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AuthCookieRule extends ProxyRuleImpl {
  private static final String BEAKER_AUTH_COOKIE_NAME = "BeakerAuth";
  private String authCookie;

  public AuthCookieRule(String authCookie) {
    this.authCookie = authCookie;
  }

  @Override
  public boolean satisfy(HttpServletRequest request) {
    String pathInfo = request.getPathInfo();
    if (pathInfo.startsWith("/static") || pathInfo.startsWith("/login")) {
      return false;
    }

    return !hasValidAuthCookie(request);
  }

  @Override
  public boolean configureResponse(HttpServletResponse response) {
    response.setStatus(403);
    return true;
  }

  private boolean hasValidAuthCookie(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (isBeakerAuthCookie(cookie) && isValidAuthCookieValue(cookie)) {
          return true;
        }
      }
    }
    return false;
  }

  private boolean isValidAuthCookieValue(Cookie cookie) {
    return StringUtils.equals(this.authCookie, cookie.getValue());
  }

  private boolean isBeakerAuthCookie(Cookie cookie) {
    return BEAKER_AUTH_COOKIE_NAME.equals(cookie.getName());
  }
}

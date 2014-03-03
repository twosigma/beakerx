/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
package com.twosigma.beaker.shared.rest.filter;

import com.google.inject.Singleton;
import com.twosigma.beaker.shared.Platform;
import java.io.IOException;
import java.security.Principal;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * A filter that only allow the user that started the daemon to access it
 */
@Singleton
public class OwnerFilter
        implements Filter {

  public static final String USER = Platform.getUser();

  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
          throws IOException, ServletException {
    HttpServletRequest request = (HttpServletRequest) req;
    HttpServletResponse response = (HttpServletResponse) res;

    Principal userPrincipal = request.getUserPrincipal();

    if (userPrincipal != null && USER.equals(userPrincipal.getName())) {
      filterChain.doFilter(request, response);
      return;
    }

    // Invalid user
    System.out.println("returning 401");
    response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    response.setContentLength(0);
  }

  @Override
  public void init(FilterConfig arg0) throws ServletException {
  }

  @Override
  public void destroy() {
  }
}

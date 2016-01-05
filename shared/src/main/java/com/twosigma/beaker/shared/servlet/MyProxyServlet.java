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
package com.twosigma.beaker.shared.servlet;

import org.eclipse.jetty.proxy.ProxyServlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

public class MyProxyServlet extends ProxyServlet.Transparent {

  private String _hash = "";

  @Override
  public void init() throws ServletException {
    this._hash = this.getInitParameter("hash");
    super.init();
  }

  @Override
  protected String rewriteTarget(final HttpServletRequest request) {
    String result = super.rewriteTarget(request);
    if (result != null) {
      String path = request.getPathInfo();
      if ("/beaker".equals(path) || "/".equals(path)) {
        result = result.replace(path, "").concat("/beaker/");
      } else if ("/beaker/".equals(path)) {
        result = result.replace(path, "").concat("/rest/util/getMainPage");
      } else if (existsHashInPath(path)) {
        result = result.replace("/" + this._hash + "/beaker", "");
      }
    }
    return result;
  }

  private boolean existsHashInPath(String path) {
    if (path != null) {
      for (String part : path.split("/")) {
        if (this._hash.equals(part)) {
          return true;
        }
      }
    }
    return false;
  }

}

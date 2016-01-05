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
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MyProxyServlet extends ProxyServlet.Transparent {

  private static Map<String, Integer> plugins = new ConcurrentHashMap<>();

  private String _hash = "";

  @Override
  public void init() throws ServletException {
    this._hash = this.getInitParameter("hash");
    super.init();
  }

  @Override
  protected String rewriteTarget(final HttpServletRequest request) {
    //XXX TODO rewrite completely
    String result = super.rewriteTarget(request);
    if (result != null) {
      String path = request.getPathInfo();
      if ("/beaker".equals(path) || "/".equals(path)) {
        result = result.replace(path, "").concat("/beaker/");
      } else if ("/beaker/".equals(path)) {
        result = result.replace(path, "").concat("/rest/util/getMainPage");
      } else {
        String[] parts = path.split("/");
        for (int i = 0; i < parts.length; i++) {
          if (this._hash.equals(parts[i])) {
            if (i < parts.length - 1) {
              if ("beaker".equals(parts[i + 1])) {
                result = result.replace("/" + this._hash + "/beaker", "");
                break;
              } else {
                for (String pluginId : plugins.keySet()) {
                  if (parts[i + 1].startsWith(pluginId.toLowerCase())) {
                    //TODO pass port here
                    result = result.replace("8802", String.valueOf(plugins.get(pluginId)));
                    result = result.replace("/" + this._hash + "/" + parts[i + 1], "");
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
    return result;
  }

  public static void addPlugin(String pluginId, int port) {
    plugins.put(pluginId, port);
  }

}

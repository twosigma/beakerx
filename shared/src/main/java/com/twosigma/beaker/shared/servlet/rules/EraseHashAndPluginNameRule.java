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

import com.twosigma.beaker.shared.servlet.BeakerProxyServlet;

//TODO rewrite this rule. The rule for new plugin has to be applied after plugin is added in PluginServiceRest
public class EraseHashAndPluginNameRule extends URLRewriteRule {

  private final String hash;
  private final String corePort;
  private final BeakerProxyServlet proxyServlet;

  public EraseHashAndPluginNameRule(BeakerProxyServlet servlet,
                                    String hash,
                                    String corePort) {
    this.proxyServlet = servlet;
    this.hash = hash;
    this.corePort = corePort;
  }

  @Override
  protected String replace(String url, String path) {
    for (String pluginId : this.proxyServlet.getPlugins().keySet()) {
      if (path.contains(SLASH + this.hash + SLASH + pluginId.toLowerCase())) {
        String result = url.replace(this.corePort,
            String.valueOf(this.proxyServlet.getPlugins().get(pluginId).getPort()));
        result = result
            .replaceAll(this.hash + SLASH + pluginId.toLowerCase() + ".\\d*" + SLASH, EMPTY_STRING);
        return result;
      }
    }
    return url;
  }

  @Override
  public boolean satisfy(final String path) {
    for (String pluginId : this.proxyServlet.getPlugins().keySet()) {
      if (path.contains(SLASH + this.hash + SLASH + pluginId.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
}

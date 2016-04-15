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
import com.twosigma.beaker.shared.servlet.rules.util.UrlUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

import static com.twosigma.beaker.shared.servlet.rules.util.UrlUtils.replacePort;

//TODO rewrite this rule. The rule for new plugin has to be applied after plugin is added in PluginServiceRest
public class EraseHashAndPluginNameRule extends ProxyRuleImpl {

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
  protected String replace(String url) {
    Map<String, BeakerProxyServlet.PluginConfig> plugins = this.proxyServlet.getPlugins();
    for (BeakerProxyServlet.PluginConfig config : plugins.values()) {
      if (url.contains(SLASH + this.hash + SLASH + config.getBaseUrl())) {
//        String result = url.replace(this.corePort, String.valueOf(config.getPort()));
        String result = replacePort(url, config.getPort());
        result = result.replace(this.hash + SLASH + config.getBaseUrl() + SLASH, EMPTY_STRING);
        return result;
      }
    }
    return url;
  }

  @Override
  public boolean satisfy(final HttpServletRequest request) {
    for (BeakerProxyServlet.PluginConfig config : this.proxyServlet.getPlugins().values()) {
      if (request.getPathInfo().contains(SLASH + this.hash + SLASH + config.getBaseUrl())) {
        return true;
      }
    }
    return false;
  }
}

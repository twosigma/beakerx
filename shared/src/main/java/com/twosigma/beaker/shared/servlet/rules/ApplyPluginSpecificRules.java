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
import org.eclipse.jetty.client.api.Request;

import static java.lang.String.format;

public class ApplyPluginSpecificRules extends ProxyRuleImpl {

  private final String hash;
  private final String corePort;
  private final BeakerProxyServlet proxyServlet;

  public ApplyPluginSpecificRules(BeakerProxyServlet servlet, String hash, String corePort) {
    this.proxyServlet = servlet;
    this.hash = hash;
    this.corePort = corePort;
  }

  @Override
  public String rewriteTarget(String url, String path) {
    for (BeakerProxyServlet.PluginConfig pluginConfig : proxyServlet.getPlugins().values()) {
      if (pluginSatisfy(path, pluginConfig)) {
        return rewriteForPlugin(url, path, pluginConfig);
      }
    }
    return url;
  }

  @Override
  public void setHeaders(Request proxyRequest, String pathInfo) {
    for (BeakerProxyServlet.PluginConfig pluginConfig : this.proxyServlet.getPlugins().values()) {
      if (pluginSatisfy(pathInfo, pluginConfig)) {
        addHeadersForPlugin(proxyRequest, pathInfo, pluginConfig);
        return;
      }
    }
  }

  @Override
  public boolean satisfy(final String path) {
    for (BeakerProxyServlet.PluginConfig config : this.proxyServlet.getPlugins().values()) {
      if (pluginSatisfy(path, config)) {
        return true;
      }
    }
    return false;
  }

  private void addHeadersForPlugin(Request proxyRequest, String pathInfo, BeakerProxyServlet.PluginConfig pluginConfig) {
    for (PluginProxyRule pluginProxyRule : pluginConfig.getRules()) {
      if (pluginProxyRule.satisfy(pathInfo)) {
        pluginProxyRule.setHeaders(proxyRequest, pathInfo);
        if (pluginProxyRule.isFinal()) {
          return;
        }
      }
    }
  }

  private String rewriteForPlugin(String url, String path, BeakerProxyServlet.PluginConfig pluginConfig) {
    for (ProxyRuleImpl rule : pluginConfig.getRules()) {
      if (rule.satisfy(path)) {
        url = rule.rewriteTarget(url, path);
        if (rule.isFinal()) {
          break;
        }
      }
    }
    return url;
  }

  private boolean pluginSatisfy(String path, BeakerProxyServlet.PluginConfig config) {
    return path.contains(SLASH + this.hash + SLASH + config.getBaseUrl());
  }
}

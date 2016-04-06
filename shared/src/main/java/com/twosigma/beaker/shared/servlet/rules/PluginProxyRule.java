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
import com.twosigma.beaker.shared.servlet.rules.util.Replacement;

import java.util.List;

import static java.lang.String.valueOf;

public class PluginProxyRule extends ProxyRuleImpl {
  private BeakerProxyServlet.PluginConfig pluginConfig;
  private List<String> pathRegexes;

  public PluginProxyRule(Replacement... replacements) {
    this(null, replacements);
  }

  public PluginProxyRule(List<String> pathRegexes, Replacement... replacements) {
    super(replacements);
    this.pathRegexes = pathRegexes;
  }

  @Override
  public boolean satisfy(String path) {
    if (pathRegexes != null) {
      for (String pathRegex : pathRegexes) {
        if (path.matches(pathRegex)) {
          return true;
        }
      }
      return false;
    }
    return super.satisfy(path);
  }

  @Override
  protected String prepareReplacement(String replacementTemplate) {
    return super.prepareReplacement(replacementTemplate)
        .replace("%(port)s", valueOf(pluginConfig.getPort()));
  }

  public BeakerProxyServlet.PluginConfig getPluginConfig() {
    return pluginConfig;
  }

  public void setPluginConfig(BeakerProxyServlet.PluginConfig pluginConfig) {
    this.pluginConfig = pluginConfig;
  }
}

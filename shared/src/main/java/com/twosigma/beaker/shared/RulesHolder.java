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
package com.twosigma.beaker.shared;

import com.twosigma.beaker.shared.servlet.rules.ProxyRuleImpl;
import org.eclipse.jetty.client.api.Request;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class RulesHolder {
  private List<ProxyRuleImpl> rules = new LinkedList<>();

  public String rewriteTarget(HttpServletRequest request, String result) {
    for (ProxyRuleImpl rule : getRulesForRequest(request)) {
      result = rule.rewriteTarget(result, request.getPathInfo());
      if (rule.isFinal()) {
        break;
      }
    }
    return result;
  }

  public void addHeaders(HttpServletRequest clientRequest, Request proxyRequest) {
    for (ProxyRuleImpl rule : getRulesForRequest(clientRequest)) {
      rule.setHeaders(proxyRequest, clientRequest.getPathInfo());
      if (rule.isFinal()) {
        break;
      }
    }
  }

  public void configureResponse(HttpServletRequest request, HttpServletResponse response) {
    for (ProxyRuleImpl proxyRule : getRulesForRequest(request)) {
      proxyRule.configureResponse(response);
      if(proxyRule.isFinal()) {
        return;
      }
    }
  }

  public void add(ProxyRuleImpl rule) {
    this.rules.add(rule);
  }

  private List<ProxyRuleImpl> getRulesForRequest(HttpServletRequest clientRequest) {
    return rules.stream().filter(r -> r.satisfy(clientRequest.getPathInfo())).collect(Collectors.toList());
  }
}

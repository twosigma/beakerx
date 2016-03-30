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

import com.twosigma.beaker.shared.servlet.rules.EraseHashAndBeakerRule;
import com.twosigma.beaker.shared.servlet.rules.EraseHashAndPluginNameRule;
import com.twosigma.beaker.shared.servlet.rules.MainPageRule;
import com.twosigma.beaker.shared.servlet.rules.RootSlashRule;
import com.twosigma.beaker.shared.servlet.rules.SlashBeakerRule;
import com.twosigma.beaker.shared.servlet.rules.URLRewriteRule;
import org.apache.commons.codec.binary.Base64;
import org.eclipse.jetty.client.api.Request;
import org.eclipse.jetty.client.api.Response;
import org.eclipse.jetty.http.HttpHeader;
import org.eclipse.jetty.proxy.ProxyServlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class BeakerProxyServlet extends ProxyServlet.Transparent {

  private static Map<String, PluginConfig> plugins = new ConcurrentHashMap<>();
  private List<URLRewriteRule> rules = new LinkedList<>();
  private final Base64 encoder = new Base64();

  private String _hash = "";
  private boolean _preserveHost;
  private String corePort;
  private boolean publicServer;
  private boolean requirePassword;
  private String authCookie;
  private String authCookieRule;
  private String startPage;
  private String corePassword;
  private String proxyPort;

  public BeakerProxyServlet() {
  }

  @Override
  public void init() throws ServletException {
    this._hash = this.getInitParameter("hash");
    this.corePort = this.getInitParameter("corePort");
    this.proxyPort = this.getInitParameter("proxyPort");
    ServletConfig config = this.getServletConfig();
    this._preserveHost = Boolean.parseBoolean(config.getInitParameter("preserveHost"));
    this.publicServer = Boolean.parseBoolean(config.getInitParameter("publicServer"));
    this.requirePassword = Boolean.parseBoolean(config.getInitParameter("requirePassword"));
    this.authCookie = config.getInitParameter("authCookie");
    this.corePassword = config.getInitParameter("corePassword");
    super.init();
    if (this.publicServer) {
      this.authCookieRule = "if ($http_cookie !~ \"BeakerAuth=" + this.authCookie + "\") {return 403;}";
      this.startPage = "/login/login.html";
    } else if (this.requirePassword) {
      this.authCookieRule = "if ($http_cookie !~ \"BeakerAuth=" + this.authCookie + "\") {return 403;}";
      this.startPage = "/login/login.html";
    } else {
      this.authCookieRule = "";
      this.startPage = "/beaker/";
    }
    initRewriteRules();
  }

  private void initRewriteRules() {
    rules.add(new SlashBeakerRule(this.corePort, this.proxyPort, this.startPage));
    rules.add(new RootSlashRule(this.corePort, this.proxyPort, this.startPage));
    rules.add(new MainPageRule("/rest/util/getMainPage"));
    rules.add(new EraseHashAndBeakerRule(this._hash));
    //TODO rewrite this rule. The rule for new plugin has to be applied after plugin is added in PluginServiceRest
    rules.add(new EraseHashAndPluginNameRule(this, this._hash, this.corePort));
  }

  @Override
  protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    super.service(request, response);
  }

  @Override
  protected void addProxyHeaders(HttpServletRequest clientRequest, Request proxyRequest) {
    super.addProxyHeaders(clientRequest, proxyRequest);
    for (PluginConfig config : plugins.values()) {
      if (clientRequest.getPathInfo().contains(config.getBaseUrl())) {
        proxyRequest.header(HttpHeader.AUTHORIZATION.toString(), "Basic " + this.getAuth(config.getPassword()));
        return;
      }
    }
    proxyRequest.header(HttpHeader.AUTHORIZATION.toString(), "Basic " + this.getCoreAuth());
  }

  @Override
  protected void onServerResponseHeaders(HttpServletRequest clientRequest, HttpServletResponse proxyResponse, Response serverResponse) {
    super.onServerResponseHeaders(clientRequest, proxyResponse, serverResponse);
  }

  private String getCoreAuth() {
    return this.getAuth(this.corePassword);
  }

  private String getAuth(String password) {
    return encoder.encodeBase64String(("beaker:" + password).getBytes());
  }

  /*
    This is the place where ProxyServlet applies rules which were in nginx.conf
   */
  @Override
  protected String rewriteTarget(final HttpServletRequest request) {
    String result = super.rewriteTarget(request);
    String path = request.getPathInfo();

    for (URLRewriteRule rule : rules) {
      if (rule.satisfy(path)) {
        result = rule.apply(result, path);
        break;
      }
    }

    return result;
  }

  public static void addPlugin(String pluginId, int port, String password, String baseUrl) {
    plugins.put(pluginId, new PluginConfig(port, password, baseUrl));
  }

  public static class PluginConfig {

    private final int port;
    private final String password;
    private final String baseUrl;

    public PluginConfig(int port, String password, String baseUrl) {
      this.port = port;
      this.password = password;
      this.baseUrl = baseUrl;
    }

    public int getPort() {
      return port;
    }

    public String getPassword() {
      return password;
    }

    public String getBaseUrl() {
      return baseUrl;
    }
  }

  public Map<String, PluginConfig> getPlugins() {
    return plugins;
  }
}

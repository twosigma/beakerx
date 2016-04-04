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

import com.twosigma.beaker.shared.RulesHolder;
import com.twosigma.beaker.shared.servlet.rules.ApplyPluginSpecificRules;
import com.twosigma.beaker.shared.servlet.rules.EraseHashAndBeakerRule;
import com.twosigma.beaker.shared.servlet.rules.EraseHashAndPluginNameRule;
import com.twosigma.beaker.shared.servlet.rules.MainPageRule;
import com.twosigma.beaker.shared.servlet.rules.PluginProxyRule;
import com.twosigma.beaker.shared.servlet.rules.RootSlashRule;
import com.twosigma.beaker.shared.servlet.rules.SlashBeakerRule;
import org.eclipse.jetty.client.api.Request;
import org.eclipse.jetty.client.api.Response;
import org.eclipse.jetty.http.HttpField;
import org.eclipse.jetty.http.HttpHeader;
import org.eclipse.jetty.proxy.ProxyServlet;
import org.eclipse.jetty.websocket.api.WebSocketBehavior;
import org.eclipse.jetty.websocket.api.WebSocketPolicy;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static org.apache.commons.codec.binary.Base64.encodeBase64String;

public class BeakerProxyServlet extends ProxyServlet.Transparent {

  private static Map<String, PluginConfig> plugins = new ConcurrentHashMap<>();
  private WebSocketServletFactory factory;
  private RulesHolder rulesHolder;
  private String _hash = "";
  private String corePort;
  private String startPage;
  private String corePassword;
  private String proxyPort;

  public BeakerProxyServlet() {
  }

  public static void addPlugin(String pluginId, int port, String password, String baseUrl, List<PluginProxyRule> pluginSpecificRules) {
    plugins.put(pluginId, new PluginConfig(port, password, baseUrl, pluginSpecificRules));
  }

  @Override
  public void init() throws ServletException {
    this._hash = this.getInitParameter("hash");
    this.corePort = this.getInitParameter("corePort");
    this.proxyPort = this.getInitParameter("proxyPort");
    ServletConfig config = this.getServletConfig();
    boolean publicServer = Boolean.parseBoolean(config.getInitParameter("publicServer"));
    boolean requirePassword = Boolean.parseBoolean(config.getInitParameter("requirePassword"));
    this.corePassword = config.getInitParameter("corePassword");
    this.rulesHolder = new RulesHolder();
    super.init();
    if (publicServer) {
      this.startPage = "/login/login.html";
    } else if (requirePassword) {
      this.startPage = "/login/login.html";
    } else {
      this.startPage = "/beaker/";
    }
    initWebSockets();
    initRewriteRules();
  }

  public String getAuthHeaderString(String path) {
    return "Basic " + encodeAuth(getPassword(path));
  }

  public Map<String, PluginConfig> getPlugins() {
    return plugins;
  }

  @Override
  protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if(isWebsocketRequest(request, response)) {
      if(proxifyWebsocketRequest(request, response)) {
        return;
      }
    }
    super.service(request, response);
  }

  @Override
  protected void addProxyHeaders(HttpServletRequest clientRequest, Request proxyRequest) {
    rulesHolder.addHeaders(clientRequest, proxyRequest);
    proxyRequest.header(HttpHeader.AUTHORIZATION.toString(), getAuthHeaderString(clientRequest.getPathInfo()));
  }

  @Override
  protected void onServerResponseHeaders(HttpServletRequest clientRequest, HttpServletResponse proxyResponse, Response serverResponse) {
    for (HttpField field : serverResponse.getHeaders()) {
      String headerName = field.getName();
      proxyResponse.addHeader(headerName, field.getValue());
    }
  }

  /*
    This is the place where ProxyServlet applies rules which were in nginx.conf
   */
  @Override
  protected String rewriteTarget(final HttpServletRequest request) {
    String result = super.rewriteTarget(request);
    return rulesHolder.rewriteTarget(request, result);
  }

  private void initWebSockets() throws ServletException {
    try {

      factory = WebSocketServletFactory.Loader.create(createWebSocketPolicy());
      factory.register(ProxyWebSocket.class);
      factory.setCreator((req, resp) -> new ProxyWebSocket(req, rulesHolder, getAuthHeaderString(req.getHttpServletRequest().getPathInfo())));
      ServletContext ctx = this.getServletContext();
      factory.init(ctx);
      ctx.setAttribute(WebSocketServletFactory.class.getName(), factory);
    } catch (Exception var4) {
      throw new ServletException(var4);
    }
  }

  private WebSocketPolicy createWebSocketPolicy() {
    WebSocketPolicy webSocketPolicy = new WebSocketPolicy(WebSocketBehavior.SERVER);
    String max = this.getInitParameter("maxIdleTime");
    if(max != null) {
      webSocketPolicy.setIdleTimeout(Long.parseLong(max));
    }

    max = this.getInitParameter("maxTextMessageSize");
    if(max != null) {
      webSocketPolicy.setMaxTextMessageSize(Integer.parseInt(max));
    }

    max = this.getInitParameter("maxBinaryMessageSize");
    if(max != null) {
      webSocketPolicy.setMaxBinaryMessageSize(Integer.parseInt(max));
    }

    max = this.getInitParameter("inputBufferSize");
    if(max != null) {
      webSocketPolicy.setInputBufferSize(Integer.parseInt(max));
    }
    return webSocketPolicy;
  }

  private void initRewriteRules() {
    rulesHolder.add(new SlashBeakerRule(this.corePort, this.proxyPort, this.startPage));
    rulesHolder.add(new RootSlashRule(this.corePort, this.proxyPort, this.startPage));
    rulesHolder.add(new MainPageRule("/rest/util/getMainPage"));
    rulesHolder.add(new EraseHashAndBeakerRule(this._hash));
    //TODO rewrite this rule. The rule for new plugin has to be applied after plugin is added in PluginServiceRest
    rulesHolder.add(new EraseHashAndPluginNameRule(this, this._hash, this.corePort).setFinal(false));
    rulesHolder.add(new ApplyPluginSpecificRules(this, this._hash, this.corePort));
  }

  private boolean proxifyWebsocketRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
    return this.factory.acceptWebSocket(request, response) || response.isCommitted();
  }

  private boolean isWebsocketRequest(HttpServletRequest request, HttpServletResponse response) {
    return this.factory.isUpgradeRequest(request, response);
  }

  private String getPassword(String path) {
    for (PluginConfig config : plugins.values()) {
      if (path.contains(config.getBaseUrl())) {
        return config.getPassword();
      }
    }
    return this.corePassword;
  }

  private String encodeAuth(String password) {
    return encodeBase64String(("beaker:" + password).getBytes());
  }

  public static class PluginConfig {

    private final int port;
    private final String password;
    private final String baseUrl;
    private final List<PluginProxyRule> rules;

    public PluginConfig(int port, String password, String baseUrl, List<PluginProxyRule> rules) {
      this.port = port;
      this.password = password;
      this.baseUrl = baseUrl;
      this.rules = rules;
      for (PluginProxyRule rule : rules) {
        rule.setPluginConfig(this);
      }
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

    public List<PluginProxyRule> getRules() {
      return rules;
    }
  }
}

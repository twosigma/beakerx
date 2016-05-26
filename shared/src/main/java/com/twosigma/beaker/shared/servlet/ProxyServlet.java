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
import com.twosigma.beaker.shared.servlet.rules.AuthCookieRule;
import com.twosigma.beaker.shared.servlet.rules.CheckXsrfRule;
import com.twosigma.beaker.shared.servlet.rules.CometdProxyRule;
import com.twosigma.beaker.shared.servlet.rules.EraseHashAndBeakerRule;
import com.twosigma.beaker.shared.servlet.rules.EraseHashAndPluginNameRule;
import com.twosigma.beaker.shared.servlet.rules.MainPageRule;
import com.twosigma.beaker.shared.servlet.rules.PluginProxyRule;
import com.twosigma.beaker.shared.servlet.rules.ProxyRuleImpl;
import com.twosigma.beaker.shared.servlet.rules.WebSocketRule;
import com.twosigma.beaker.shared.servlet.rules.util.Replacement;
import org.apache.commons.lang3.StringUtils;
import org.eclipse.jetty.client.api.Request;
import org.eclipse.jetty.client.api.Response;
import org.eclipse.jetty.http.HttpField;
import org.eclipse.jetty.http.HttpHeader;
import org.eclipse.jetty.websocket.api.WebSocketBehavior;
import org.eclipse.jetty.websocket.api.WebSocketPolicy;
import org.eclipse.jetty.websocket.client.WebSocketClient;
import org.eclipse.jetty.websocket.servlet.ServletUpgradeRequest;
import org.eclipse.jetty.websocket.servlet.ServletUpgradeResponse;
import org.eclipse.jetty.websocket.servlet.WebSocketCreator;
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

public class ProxyServlet extends org.eclipse.jetty.proxy.ProxyServlet.Transparent {

  private static final int MAX_TEXT_MESSAGE_SIZE = 1024 * 1024 * 16;
  private static Map<String, PluginConfig> plugins = new ConcurrentHashMap<>();
  private WebSocketServletFactory factory;
  private RulesHolder rulesHolder;
  private String hash = "";
  private String corePort;
  private String startPage;
  private String corePassword;
  private String authToken;
  private String authCookie;

  public ProxyServlet() {
  }

  public static void addPlugin(String pluginId, int port, String password, String baseUrl, List<PluginProxyRule> pluginSpecificRules) {
    plugins.put(pluginId, new PluginConfig(port, password, baseUrl, pluginSpecificRules));
  }

  @Override
  public void init() throws ServletException {
    ServletConfig config = this.getServletConfig();
    boolean publicServer = Boolean.parseBoolean(config.getInitParameter("publicServer"));
    boolean requirePassword = Boolean.parseBoolean(config.getInitParameter("requirePassword"));
    this.hash = this.getInitParameter("hash");
    this.corePort = this.getInitParameter("corePort");
    this.corePassword = config.getInitParameter("corePassword");
    this.authToken = config.getInitParameter("authToken");
    this.authCookie = config.getInitParameter("authCookie");
    this.rulesHolder = new RulesHolder();
    this.startPage = getStartPage(publicServer, requirePassword);
    initWebSockets();
    initRewriteRules(requirePassword, publicServer);
    super.init();
  }

  public Map<String, PluginConfig> getPlugins() {
    return plugins;
  }

  @Override
  protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if(isWebsocketRequest(request, response) && proxifyWebsocketRequest(request, response)) {
      return;
    }
    if(checkCommonRedirects(request, response)) {
      return;
    }
    if (rulesHolder.configureResponse(request, response)) {
      return;
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

  @Override
  protected String rewriteTarget(final HttpServletRequest request) {
    String result = super.rewriteTarget(request);
    return rulesHolder.rewriteTarget(request, result);
  }

  private String getStartPage(boolean publicServer, boolean requirePassword) {
    String startPage;
    if (publicServer) {
      startPage = "/static/login.html";
    } else if (requirePassword) {
      startPage = "/static/login.html";
    } else {
      startPage = "/beaker/";
    }
    return startPage;
  }

  private String getAuthHeaderString(String path) {
    return "Basic " + encodeAuth(getPassword(path));
  }

  private boolean checkCommonRedirects(HttpServletRequest request, HttpServletResponse response) {
    boolean redirect = false;
    String path = request.getPathInfo();
    if (path.equals("/") || path.equals("/beaker")) {
      response.setHeader("Location", this.startPage);
      redirect = true;
    }
    if (path.equals("/version")) {
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Location", "/" + (StringUtils.isEmpty(this.hash) ? "" : this.hash + "/") + "beaker/rest/util/version");
      redirect = true;
    }
    if (redirect) {
      response.setStatus(301);
      return true;
    }
    return false;
  }

  private void initWebSockets() throws ServletException {
    try {

      factory = WebSocketServletFactory.Loader.create(createWebSocketPolicy());
      factory.register(ProxyWebSocket.class);
      final WebSocketClient webSocketClient = createWebSocketClient();
      factory.setCreator(new WebSocketCreator() {
        @Override
        public Object createWebSocket(ServletUpgradeRequest request, ServletUpgradeResponse response) {
          return new ProxyWebSocket(request, rulesHolder, getAuthHeaderString(request.getHttpServletRequest().getPathInfo()), webSocketClient);
        }
      });
      ServletContext ctx = this.getServletContext();
      factory.init(ctx);
      ctx.setAttribute(WebSocketServletFactory.class.getName(), factory);
    } catch (Exception var4) {
      throw new ServletException(var4);
    }
  }

  private WebSocketClient createWebSocketClient() {
    try {
      WebSocketClient client = new WebSocketClient();
      client.getPolicy().setMaxTextMessageSize(1024 * 1024 * 16);
      client.start();
      return client;
    } catch (Exception e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  private WebSocketPolicy createWebSocketPolicy() {
    WebSocketPolicy webSocketPolicy = new WebSocketPolicy(WebSocketBehavior.SERVER);
    webSocketPolicy.setMaxTextMessageSize(MAX_TEXT_MESSAGE_SIZE);
    webSocketPolicy.setMaxBinaryMessageSize(MAX_TEXT_MESSAGE_SIZE);
    String max = this.getInitParameter("maxIdleTime");
    if(max != null) {
      webSocketPolicy.setIdleTimeout(Long.parseLong(max));
    }

    max = this.getInitParameter("inputBufferSize");
    if(max != null) {
      webSocketPolicy.setInputBufferSize(Integer.parseInt(max));
    }
    return webSocketPolicy;
  }

  private void initRewriteRules(boolean requirePassword, boolean publicServer) {
    rulesHolder.add(new CometdProxyRule(this.authToken, this.hash, this.corePort).setFinal(false));
    rulesHolder.add(new ProxyRuleImpl("/loginrest/.*", new Replacement("/loginrest/", "/rest/login/")));
    rulesHolder.add(new ProxyRuleImpl("/login/login.html", new Replacement("/login/", "/static/")).setFinal(false));
    rulesHolder.add(new WebSocketRule().setFinal(false));
    if (publicServer || requirePassword) {
      rulesHolder.add(new AuthCookieRule(this.authCookie));
    }
    rulesHolder.add(new MainPageRule("/rest/util/getMainPage", this.authToken));
    rulesHolder.add(new CheckXsrfRule(authToken).setFinal(false));
    rulesHolder.add(new EraseHashAndBeakerRule(this.hash));
    rulesHolder.add(new EraseHashAndPluginNameRule(this, this.hash, this.corePort).setFinal(false));
    rulesHolder.add(new ApplyPluginSpecificRules(this, this.hash, this.corePort));
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

    PluginConfig(int port, String password, String baseUrl, List<PluginProxyRule> rules) {
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

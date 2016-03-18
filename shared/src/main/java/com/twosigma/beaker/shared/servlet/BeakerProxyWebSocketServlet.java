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
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class BeakerProxyWebSocketServlet extends ProxyServlet.Transparent {

  private WebSocketServletFactory factory;
  private static Map<String, Integer> plugins = new ConcurrentHashMap<>();

  protected static final Set<String> MY_HOP_HEADERS;

  private String _hash = "";
  private boolean _preserveHost;

  static {
    MY_HOP_HEADERS = new HashSet<>(HOP_HEADERS);
    MY_HOP_HEADERS.removeAll(
        Arrays.asList(
            HttpHeader.CONNECTION.toString().toLowerCase(),
            HttpHeader.KEEP_ALIVE.toString().toLowerCase(),
            HttpHeader.UPGRADE.toString().toLowerCase()));
  }

  public BeakerProxyWebSocketServlet() {
  }

  public void configure(WebSocketServletFactory factory) {
    factory.register(BeakerWebSocket.class);
  }

  @Override
  public void init() throws ServletException {
    this._hash = this.getInitParameter("hash");
    ServletConfig config = this.getServletConfig();
    this._preserveHost = Boolean.parseBoolean(config.getInitParameter("preserveHost"));
    initWebSockets();
    super.init();
  }

  private void initWebSockets() throws ServletException {
    try {
      WebSocketPolicy x = new WebSocketPolicy(WebSocketBehavior.SERVER);
      String max = this.getInitParameter("maxIdleTime");
      if(max != null) {
        x.setIdleTimeout(Long.parseLong(max));
      }

      max = this.getInitParameter("maxTextMessageSize");
      if(max != null) {
        x.setMaxTextMessageSize(Integer.parseInt(max));
      }

      max = this.getInitParameter("maxBinaryMessageSize");
      if(max != null) {
        x.setMaxBinaryMessageSize(Integer.parseInt(max));
      }

      max = this.getInitParameter("inputBufferSize");
      if(max != null) {
        x.setInputBufferSize(Integer.parseInt(max));
      }

      this.factory = WebSocketServletFactory.Loader.create(x);
      this.configure(this.factory);
      ServletContext ctx = this.getServletContext();
      this.factory.init(ctx);
      ctx.setAttribute(WebSocketServletFactory.class.getName(), this.factory);
    } catch (Exception var4) {
      throw new ServletException(var4);
    }
  }

  @Override
  protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//    if(this.factory.isUpgradeRequest(request, response)) {
//      if(this.factory.acceptWebSocket(request, response)) {
//        return;
//      }
//
//      if(response.isCommitted()) {
//        return;
//      }
//    }
    super.service(request, response);
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

  @Override
  protected void copyRequestHeaders(HttpServletRequest clientRequest, Request proxyRequest) {
    proxyRequest.getHeaders().clear();
    Set headersToRemove = this.findConnectionHeaders(clientRequest);
    if ("websocket".equals(clientRequest.getHeader("Upgrade"))) {
      headersToRemove.clear();
    }
    Enumeration headerNames = clientRequest.getHeaderNames();

    while(true) {
      String headerName;
      String lowerHeaderName;
      do {
        do {
          do {
            if(!headerNames.hasMoreElements()) {
              if(this.getHostHeader() != null) {
                proxyRequest.header(HttpHeader.HOST, this.getHostHeader());
              }

              return;
            }

            headerName = (String)headerNames.nextElement();
            lowerHeaderName = headerName.toLowerCase(Locale.ENGLISH);
          } while(HttpHeader.HOST.is(headerName) && !this._preserveHost);
        } while(MY_HOP_HEADERS.contains(lowerHeaderName));
      } while(headersToRemove != null && headersToRemove.contains(lowerHeaderName));

      Enumeration headerValues = clientRequest.getHeaders(headerName);

      while(headerValues.hasMoreElements()) {
        String headerValue = (String)headerValues.nextElement();
        if(headerValue != null) {
          proxyRequest.header(headerName, headerValue);
        }
      }
    }
  }

  @Override
  protected void onServerResponseHeaders(HttpServletRequest clientRequest, HttpServletResponse proxyResponse, Response serverResponse) {
    Iterator builder = serverResponse.getHeaders().iterator();

    String headerName;
    String headerValue;
    while(builder.hasNext()) {
      HttpField field = (HttpField)builder.next();
      headerName = field.getName();
      String headerValues = headerName.toLowerCase(Locale.ENGLISH);
      if(!HOP_HEADERS.contains(headerValues)) {
        headerValue = this.filterServerResponseHeader(clientRequest, serverResponse, headerName, field.getValue());
        if(headerValue != null && headerValue.trim().length() != 0) {
          proxyResponse.addHeader(headerName, headerValue);
        }
      }
    }

    if(this._log.isDebugEnabled()) {
      StringBuilder builder1 = new StringBuilder(System.lineSeparator());
      builder1.append(clientRequest.getProtocol()).append(" ").append(proxyResponse.getStatus()).append(" ").append(serverResponse.getReason()).append(System.lineSeparator());
      Iterator field1 = proxyResponse.getHeaderNames().iterator();

      while(field1.hasNext()) {
        headerName = (String)field1.next();
        builder1.append(headerName).append(": ");
        Iterator headerValues1 = proxyResponse.getHeaders(headerName).iterator();

        while(headerValues1.hasNext()) {
          headerValue = (String)headerValues1.next();
          if(headerValue != null) {
            builder1.append(headerValue);
          }

          if(headerValues1.hasNext()) {
            builder1.append(",");
          }
        }

        builder1.append(System.lineSeparator());
      }

      this._log.debug("{} proxying to downstream:{}{}{}{}{}", new Object[]{Integer.valueOf(this.getRequestId(clientRequest)), System.lineSeparator(), serverResponse, System.lineSeparator(), serverResponse.getHeaders().toString().trim(), System.lineSeparator(), builder1});
    }

  }

  public void destroy() {
    this.factory.cleanup();
  }

}

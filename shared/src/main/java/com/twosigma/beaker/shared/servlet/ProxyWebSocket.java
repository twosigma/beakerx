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
import org.eclipse.jetty.http.HttpHeader;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;
import org.eclipse.jetty.websocket.client.ClientUpgradeRequest;
import org.eclipse.jetty.websocket.client.WebSocketClient;
import org.eclipse.jetty.websocket.common.WebSocketSession;
import org.eclipse.jetty.websocket.servlet.ServletUpgradeRequest;

import java.io.IOException;
import java.net.URI;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

class ProxyWebSocket extends WebSocketAdapter {

  private static final int INTERNAL_SERVER_ERROR_STATUSCODE = 1011;
  private static final int REMOTE_CONNECTION_WAIT_SECONDS = 30;

  private final CountDownLatch remoteSessionSync = new CountDownLatch(1);
  private Session clientSession;
  private Session remoteSession;
  private ServletUpgradeRequest request;
  private RulesHolder rulesHolder;
  private String authString;

  ProxyWebSocket(ServletUpgradeRequest request, RulesHolder rulesHolder, String authString) {
    this.request = request;
    this.rulesHolder = rulesHolder;
    this.authString = authString;
  }

  @Override
  public void onWebSocketConnect(Session sess) {
    super.onWebSocketConnect(sess);
    this.clientSession = sess;

    if (sess instanceof WebSocketSession) {
      final WebSocketClient client = new WebSocketClient();
      String requestURI = request.getRequestURI().toString();
      final String target = rulesHolder.rewriteTarget(request.getHttpServletRequest(), requestURI);

      try {
        client.start();
        final ClientUpgradeRequest remoteRequest = new ClientUpgradeRequest();
        remoteRequest.setCookies(request.getCookies());
        remoteRequest.setHeader(HttpHeader.AUTHORIZATION.toString(), this.authString);
        client.connect(new RemoteWebSocket(), new URI(target), remoteRequest);
      } catch (Exception e) {
        clientSession.close(INTERNAL_SERVER_ERROR_STATUSCODE, e.toString());
      }
    }
  }

  @Override
  public void onWebSocketText(String message) {
    super.onWebSocketText(message);
    try {
      getRemoteSession().getRemote().sendString(message);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void onWebSocketClose(int statusCode, String reason) {
    super.onWebSocketClose(statusCode, reason);
    getRemoteSession().close(statusCode, reason);
  }

  @Override
  public void onWebSocketError(Throwable cause) {
    super.onWebSocketError(cause);
    closeWithError(cause);
  }

  private void closeWithError(Throwable cause) {
    getRemoteSession().close(INTERNAL_SERVER_ERROR_STATUSCODE, cause.toString());
  }

  private Session getRemoteSession() {
    try {
      remoteSessionSync.await(REMOTE_CONNECTION_WAIT_SECONDS, TimeUnit.SECONDS);
      return remoteSession;
    } catch (InterruptedException e) {
      clientSession.close(INTERNAL_SERVER_ERROR_STATUSCODE, e.toString());
      throw new RuntimeException("Failed to acquire remote host websocket connection", e);
    }
  }

  private class RemoteWebSocket extends WebSocketAdapter {

    @Override
    public void onWebSocketConnect(Session sess) {
      super.onWebSocketConnect(sess);
      remoteSession = sess;
      remoteSessionSync.countDown();
    }

    @Override
    public void onWebSocketText(String message) {
      super.onWebSocketText(message);
      try {
        clientSession.getRemote().sendString(message);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    @Override
    public void onWebSocketClose(int statusCode, String reason) {
      super.onWebSocketClose(statusCode, reason);
      clientSession.close(statusCode, reason);
    }

    @Override
    public void onWebSocketError(Throwable cause) {
      super.onWebSocketError(cause);
      clientSession.close(INTERNAL_SERVER_ERROR_STATUSCODE, cause.toString());
    }
  }
}
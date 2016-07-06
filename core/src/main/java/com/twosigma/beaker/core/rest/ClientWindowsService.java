/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.core.rest;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.cometd.annotation.Listener;
import org.cometd.annotation.Service;
import org.cometd.bayeux.Channel;
import org.cometd.bayeux.Message;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerMessage;
import org.cometd.bayeux.server.ServerSession;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("unused")
@Service
@Singleton
public class ClientWindowsService implements ServerSession.RemoveListener {
  private static final String WINDOWS_UPDATE = "/windows/update";
  private BayeuxServer bayeux;
  private LocalSession localSession;
  private Map<String, NotebookInfo> infoMap = new HashMap<>();

  @Inject
  public ClientWindowsService(BayeuxServer bayeuxServer) {
    this.bayeux = bayeuxServer;
    this.localSession = bayeuxServer.newLocalSession(getClass().getCanonicalName());
    this.localSession.handshake();
  }

  @Listener("/service/windows/report")
  public void processOpenedNotebook(ServerSession session, ServerMessage msg) throws IOException {
    NotebookInfo notebookInfo = infoMap.get(session.getId());
    if (notebookInfo == null) {
      session.addListener(this);
      notebookInfo = new NotebookInfo();
      infoMap.put(session.getId(), notebookInfo);
    }

    notebookInfo.setWindowId(String.valueOf(msg.getDataAsMap().get("windowId")));
    notebookInfo.setSessionId(String.valueOf(msg.getDataAsMap().get("sessionId")));

    notifyFrontend();
  }

  @Listener("/service/windows/closed")
  public void processClosedNotebook(ServerSession session, ServerMessage msg) {
    infoMap.remove(session.getId());
    notifyFrontend();
  }

  @Listener("/service/windows/check")
  public void check(ServerSession session, ServerMessage msg) throws IOException {
    notifyFrontend();
  }

  @Listener(Channel.META_SUBSCRIBE)
  public void processSubscription(ServerSession remote, ServerMessage message) {
    String channel = (String) message.get(Message.SUBSCRIPTION_FIELD);
    if (channel.equals(WINDOWS_UPDATE)) {
      notifyFrontend();
    }
  }

  private void notifyFrontend() {
    HashMap<String, Object> data = new HashMap<>();
    data.put("windows", infoMap);
    getUpdateChannel().publish(localSession, data, null);
  }

  private ServerChannel getUpdateChannel() {
    return bayeux.createChannelIfAbsent(WINDOWS_UPDATE).getReference();
  }

  @Override
  public void removed(ServerSession session, boolean timeout) {
    infoMap.remove(session.getId());
    notifyFrontend();
  }

  @JsonAutoDetect
  private class NotebookInfo {
    private String windowId;
    private String sessionId;

    public void setWindowId(String windowId) {
      this.windowId = windowId;
    }

    public String getWindowId() {
      return windowId;
    }

    public String getSessionId() {
      return sessionId;
    }

    public void setSessionId(String sessionId) {
      this.sessionId = sessionId;
    }
  }
}

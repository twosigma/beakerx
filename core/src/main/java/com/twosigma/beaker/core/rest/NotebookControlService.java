/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
import com.twosigma.beaker.shared.NotebookControlReply;

import java.io.IOException;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.SynchronousQueue;

import org.codehaus.jackson.map.ObjectMapper;
import org.cometd.annotation.Listener;
import org.cometd.annotation.Service;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerMessage;
import org.cometd.bayeux.server.ServerSession;


@Service
@Singleton
public class NotebookControlService {

  private BayeuxServer bayeux;
  private LocalSession localSession;
  private ObjectMapper mapper = new ObjectMapper();
  private String channelName = "/notebookctrl";
  private Map<String, SynchronousQueue<NotebookControlReply>> handoff = new HashMap<>();

  @Inject
  public NotebookControlService(BayeuxServer bayeuxServer) {
    this.bayeux = bayeuxServer;
    this.localSession = bayeuxServer.newLocalSession(getClass().getCanonicalName());
    this.localSession.handshake();
  }

  private ServerChannel getChannel(String session) {
    return bayeux.getChannel(channelName + "/" + session);
  }

  // XXX garbage collect when sessions are closed
  private SynchronousQueue<NotebookControlReply> getHandoff(String session) {
    SynchronousQueue<NotebookControlReply> result = handoff.get(session);
    if (null == result) {
      result = new SynchronousQueue<NotebookControlReply>();
      handoff.put(session, result);
    }
    return result;
  }

  @Listener("/service/notebookctrl/receive")
  public void receive(ServerSession session, ServerMessage msg)
    throws IOException, InterruptedException
  {
    try {
      NotebookControlReply reply = this.mapper.readValue(String.valueOf(msg.getData()), NotebookControlReply.class);
      getHandoff(reply.getSession()).put(reply);
    } catch (Exception e) { e.printStackTrace(); }
  }

  
  public Object evaluate(String session, String filter) throws InterruptedException {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("method", "evaluate");
    data.put("numargs", 1);
    data.put("arg0", filter);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return null;
    }
    channel.publish(this.localSession, data, null);
    NotebookControlReply reply = getHandoff(session).take(); // blocks
    return reply.getValue();
  }

  public Object evaluateCode(String session, String evaluator, String code) throws InterruptedException {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("method", "evaluateCode");
    data.put("numargs", 2);
    data.put("arg0", evaluator);
    data.put("arg1", code);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return null;
    }
    channel.publish(this.localSession, data, null);
    NotebookControlReply reply = getHandoff(session).take(); // blocks
    return reply.getValue();
  }

  public Object showStatus(String session, String msg) throws InterruptedException {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("method", "showStatus");
    data.put("numargs", 1);
    data.put("arg0", msg);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return null;
    }
    channel.publish(this.localSession, data, null);
    NotebookControlReply reply = getHandoff(session).take(); // blocks
    return reply.getValue();
  }

  public Object clrStatus(String session, String msg) throws InterruptedException {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("method", "clrStatus");
    data.put("numargs", 1);
    data.put("arg0", msg);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return null;
    }
    channel.publish(this.localSession, data, null);
    NotebookControlReply reply = getHandoff(session).take(); // blocks
    return reply.getValue();
  }

  public Object showTransientStatus(String session, String msg) throws InterruptedException {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("method", "showTransientStatus");
    data.put("numargs", 1);
    data.put("arg0", msg);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return null;
    }
    channel.publish(this.localSession, data, null);
    NotebookControlReply reply = getHandoff(session).take(); // blocks
    return reply.getValue();
  }

  public Object getEvaluators(String session) throws InterruptedException {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("method", "getEvaluators");
    data.put("numargs", 0);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return null;
    }
    channel.publish(this.localSession, data, null);
    NotebookControlReply reply = getHandoff(session).take(); // blocks
    return reply.getValue();
  }

  public Object getCodeCells(String session, String filter) throws InterruptedException {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("method", "getCodeCells");
    data.put("numargs", 1);
    data.put("arg0", filter);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return null;
    }
    try {
    channel.publish(this.localSession, data, null);
    NotebookControlReply reply = getHandoff(session).take(); // blocks
    return reply.getValue();
    } catch (Exception e) { e.printStackTrace(); }
    return null;
  }

  public Object setCodeCellBody(String session, String name, String body) throws InterruptedException {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("method", "setCodeCellBody");
    data.put("numargs", 2);
    data.put("arg0", name);
    data.put("arg1", body);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return null;
    }
    channel.publish(this.localSession, data, null);
    NotebookControlReply reply = getHandoff(session).take(); // blocks
    return reply.getValue();
  }

  public Object setCodeCellEvaluator(String session, String name, String evaluator) throws InterruptedException {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("method", "setCodeCellEvaluator");
    data.put("numargs", 2);
    data.put("arg0", name);
    data.put("arg1", evaluator);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return null;
    }
    channel.publish(this.localSession, data, null);
    NotebookControlReply reply = getHandoff(session).take(); // blocks
    return reply.getValue();
  }

  public Object setCodeCellTags(String session, String name, String tags) throws InterruptedException {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("method", "setCodeCellTags");
    data.put("numargs", 2);
    data.put("arg0", name);
    data.put("arg1", tags);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return null;
    }
    channel.publish(this.localSession, data, null);
    NotebookControlReply reply = getHandoff(session).take(); // blocks
    return reply.getValue();
  }
}

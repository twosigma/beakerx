/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.SynchronousQueue;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.ObjectMapper;
import org.cometd.annotation.Listener;
import org.cometd.annotation.Service;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerMessage;
import org.cometd.bayeux.server.ServerSession;

/**
 * The NamespaceService is the service manager for the notebook
 * namespace.  For now, the namespace is kept in the notebook model in
 * the browser, and we hit the browser for all get/set actions.  The
 * key to this is get method, which requests the value with cometd and
 * then blocks until the value is delivered by another thread.
 */
@Service
@Singleton
public class NamespaceService {

  private BayeuxServer bayeux;
  private LocalSession localSession;
  private ObjectMapper mapper = new ObjectMapper();
  private String channelName = "/namespace";
  private Map<String, SynchronousQueue<Binding>> handoff = new HashMap<>();

  @Inject
  public NamespaceService(BayeuxServer bayeuxServer) {
    this.bayeux = bayeuxServer;
    this.localSession = bayeuxServer.newLocalSession(getClass().getCanonicalName());
    this.localSession.handshake();
  }

  private ServerChannel getChannel(String session) {
    return bayeux.getChannel(channelName + "/" + session);
  }

  // XXX garbage collect when sessions are closed
  private SynchronousQueue<Binding> getHandoff(String session) {
    SynchronousQueue<Binding> result = handoff.get(session);
    if (null == result) {
      result = new SynchronousQueue<Binding>();
      handoff.put(session, result);
    }
    return result;
  }

  public Binding get(String session, String name)
    throws RuntimeException, InterruptedException
  {
    System.err.println("XXX get session=" + session + " name=" + name);
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("name", name);
    getChannel(session).publish(this.localSession, data, null);
    Binding pair = getHandoff(session).take(); // blocks
    System.err.println("XXX got it");
    if (!pair.name.equals(name))
      throw new RuntimeException("name mismatch.  received " + pair.name + ", expected " + name);
    // no reason to return the session XXX
    return pair;
  }

  // should be an option to block until it completes on client XXX
  public void set(String session, String name, Object value) {
    System.err.println("XXX set session=" + session + " name=" + name);
    Map<String, Object> data = new HashMap<String, Object>(2);
    data.put("name", name);
    data.put("value", value);
    getChannel(session).publish(this.localSession, data, null);
  }

  @Listener("/service/namespace/receive")
  public void receive(ServerSession session, ServerMessage msg)
    throws IOException, InterruptedException
  {
    System.err.println("XXX receive");
    Binding pair = this.mapper.readValue(String.valueOf(msg.getData()), Binding.class);
    getHandoff(pair.getSession()).put(pair);
  }

  // rename from Pair to Binding XXX
  @JsonAutoDetect
  public static class Binding {

    private String name;
    private String session;
    private Object value;
    private Boolean defined;

    public String getName() {
      return this.name;
    }
    public String getSession() {
      return this.session;
    }
    public Object getValue() {
      return this.value;
    }
    public Boolean getDefined() {
      return this.defined;
    }
    public void setName(String s) {
      this.name = s;
    }
    public void setSession(String s) {
      this.session = s;
    }
    public void setValue(Object o) {
      this.value = o;
    }
    public void setDefined(Boolean b) {
      this.defined = b;
    }
    public Binding() {
    }
    public Binding(String session, String name, Object value, Boolean defined) {
      this.session = session;
      this.name = name;
      this.value = value;
      this.defined = defined;
    }
  }
}

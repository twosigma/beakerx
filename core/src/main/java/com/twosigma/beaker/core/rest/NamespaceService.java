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
import com.twosigma.beaker.shared.NamespaceBinding;
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
  private Map<String, SynchronousQueue<NamespaceBinding>> handoff = new HashMap<>();

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
  private SynchronousQueue<NamespaceBinding> getHandoff(String session) {
    SynchronousQueue<NamespaceBinding> result = handoff.get(session);
    if (null == result) {
      result = new SynchronousQueue<NamespaceBinding>();
      handoff.put(session, result);
    }
    return result;
  }

  public NamespaceBinding get(String session, String name)
    throws RuntimeException, InterruptedException
  {
    System.err.println("XXX get session=" + session + " name=" + name);
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("name", name);
    // if session does not exist, should just fail and avoid NPE XXX
    ServerChannel channel = getChannel(session);
    if (null == channel) {
	System.err.println("channel not found for session " + session);
	return null;
    }
    channel.publish(this.localSession, data, null);
    NamespaceBinding binding = getHandoff(session).take(); // blocks
    System.err.println("XXX got it");
    if (!binding.name.equals(name)) {
      throw new RuntimeException("Namespace get, name mismatch.  Received " + binding.name + ", expected " + name);
    }
    // no reason to return the session XXX
    return binding;
  }

  // sync means wait until write completes before returning.
  public void set(String session, String name, Object value, Boolean unset, Boolean sync)
    throws RuntimeException, InterruptedException
  {
    System.err.println("XXX set session=" + session + " name=" + name + " sync=" + sync);
    Map<String, Object> data = new HashMap<String, Object>(2);
    data.put("name", name);
    if (!unset) {
      data.put("value", value);
    }
    data.put("sync", sync);
    // if session does not exist, should just fail and avoid NPE XXX
    ServerChannel channel = getChannel(session);
    if (null == channel) {
	System.err.println("channel not found for session " + session);
	return;
    }
    channel.publish(this.localSession, data, null);
    if (sync) {
      NamespaceBinding binding = getHandoff(session).take(); // blocks
      if (!binding.name.equals(name)) {
        throw new RuntimeException("Namespace set, name mismatch.  Received " + binding.name + ", expected " + name);
      }
    }
  }

  @Listener("/service/namespace/receive")
  public void receive(ServerSession session, ServerMessage msg)
    throws IOException, InterruptedException
  {
    System.err.println("XXX receive");
    NamespaceBinding binding = this.mapper.readValue(String.valueOf(msg.getData()), NamespaceBinding.class);
    getHandoff(binding.getSession()).put(binding);
  }
}

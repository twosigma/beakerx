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
import com.twosigma.beaker.shared.NamespaceBinding;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.SynchronousQueue;

import com.twosigma.beaker.shared.module.BkWebSocketListener;
import com.twosigma.beaker.shared.module.BkWebSocketTransport;
import org.codehaus.jackson.map.ObjectMapper;
import org.cometd.annotation.Listener;
import org.cometd.annotation.Service;
import org.cometd.bayeux.Transport;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerMessage;
import org.cometd.bayeux.server.ServerSession;
import org.cometd.websocket.server.WebSocketTransport;

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
  private BkWebSocketTransport bkWebSocketTransport;
  private Map<String, BkWebSocketListener> sessionListeners = new HashMap<>();

  @Inject
  public NamespaceService(BayeuxServer bayeuxServer) {
    this.bayeux = bayeuxServer;
    this.localSession = bayeuxServer.newLocalSession(getClass().getCanonicalName());
    this.localSession.handshake();
    Transport transport = this.bayeux.getTransport(WebSocketTransport.NAME);
    if (transport instanceof BkWebSocketTransport) {
      bkWebSocketTransport = (BkWebSocketTransport) transport;
    }
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

  private void addSocketListener(String session) {
    if (bkWebSocketTransport != null) {
      if(sessionListeners.get(session) == null) {
        BkWebSocketListener listener = new BkWebSocketListener() {
          @Override
          public void onClose(int code, String message) {
            try {
              getHandoff(session).put(new NamespaceBinding(session, message));
            } catch (InterruptedException e) {
              throw new RuntimeException(e);
            }
          }
        };
        bkWebSocketTransport.addListener(listener);
        sessionListeners.put(session, listener);
      }
    }
  }

  public NamespaceBinding get(String session, String name)
    throws RuntimeException, InterruptedException
  {
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("name", name);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("NamespaceService.get(): channel not found for session " + session);
      return null;
    }
    addSocketListener(session);
    channel.publish(this.localSession, data, null);
    NamespaceBinding binding = getHandoff(session).take(); // blocks
    if (binding.getError() != null) {
      throw new RuntimeException(binding.getError());
    } else if (!binding.getName().equals(name)) {
      throw new RuntimeException("Namespace get, name mismatch.  Received " +
                                 binding.getName() + ", expected " + name);
    }
    return binding;
  }

  // sync means wait until write completes before returning.
  public void set(String session, String name, Object value, Boolean unset, Boolean sync)
    throws RuntimeException, InterruptedException
  {
    Map<String, Object> data = new HashMap<String, Object>(2);
    data.put("name", name);
    if (!unset) {
      data.put("value", value);
    }
    data.put("sync", sync);
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("NamespaceService.set(): channel not found for session " + session);
      return;
    }
    addSocketListener(session);
    channel.publish(this.localSession, data, null);
    if (sync) {
      NamespaceBinding binding = getHandoff(session).take(); // blocks
      if (binding.getError() != null) {
        throw new RuntimeException(binding.getError());
      } else if (!binding.getName().equals(name)) {
        throw new RuntimeException("Namespace set, name mismatch.  Received " +
                                   binding.getName() + ", expected " + name);
      }
    }
  }

  @Listener("/service/namespace/receive")
  public void receive(ServerSession session, ServerMessage msg)
    throws IOException, InterruptedException
  {
    NamespaceBinding binding = this.mapper.readValue(String.valueOf(msg.getData()), NamespaceBinding.class);
    getHandoff(binding.getSession()).put(binding);
  }
}

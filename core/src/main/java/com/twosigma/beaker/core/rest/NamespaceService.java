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
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.LinkedBlockingDeque;
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
 * The NamespaceService is the server manager for the notebook namespace.
 * The master values are kept in the notebook model in the browser.
 * For now, we hit the browser for all get/set actions.
 */
@Service
@Singleton
public class NamespaceService {

  private BayeuxServer bayeux;
  private LocalSession localSession;
  private ObjectMapper mapper = new ObjectMapper();
  private Map<String, Object> namespace = new HashMap<String, Object>();

  @Inject
  public NamespaceService(BayeuxServer bayeuxServer) {
    this.bayeux = bayeuxServer;
    this.localSession = bayeuxServer.newLocalSession(getClass().getCanonicalName());
    this.localSession.handshake();
  }

  public Object get(String name) {
    return namespace.get(name);
  }

  public void put(String name, Object value) {
    namespace.put(name, value);
  }

  @Listener("/service/namespace/get")
  public void namespaceGet(ServerSession session, ServerMessage msg) {
    // get a variable's value
    // void??
  }

  @Listener("/service/namespace/put")
  public void namespacePut(ServerSession session, ServerMessage msg)
          throws IOException {
    String line = String.valueOf(msg.getData());
    // serverPut(outputLine);
  }
}

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
package com.twosigma.beaker.jvm.updater;

import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.google.common.collect.HashBiMap;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.BayeuxServer.SubscriptionListener;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerSession;

@Singleton
public class UpdateManager implements SubscriptionListener {

  private static final Pattern PATTERN = Pattern.compile("^/object_update/((\\w|-)+)$");

  private final HashBiMap<String, Object> _idToObject;
  private final LocalSession _localSession;

  @Inject
  private UpdateManager(BayeuxServer bayeuxServer) {
    bayeuxServer.addListener(this);
    _localSession = bayeuxServer.newLocalSession(this.getClass().getCanonicalName());
    _localSession.handshake();
    _idToObject = HashBiMap.<String, Object>create();
  }

  public String register(Object obj) {
    if (_idToObject.containsValue(obj)) {
      return _idToObject.inverse().get(obj);
    }
    String id = UUID.randomUUID().toString();
    _idToObject.put(id, obj);
    return id;
  }

  private String getId(ServerChannel channel) {
    Matcher matcher = PATTERN.matcher(channel.getId());
    if (!matcher.matches()) {
      return null;
    }
    return matcher.group(1);
  }

  @Override
  public void subscribed(ServerSession session, ServerChannel channel) {
    String id = getId(channel);
    if (id == null) {
      return;
    }
    if (_idToObject.containsKey(id)) {
      Object obj = _idToObject.get(id);
      Updater updater = UpdaterFactory.getUpdater(session, _localSession, channel.getId(), obj);
      updater.deliverUpdate(obj);
    } else {
      System.out.println("Client is trying to subscribe to nonexisting object " + id);
    }
  }

  @Override
  public void unsubscribed(ServerSession session, ServerChannel channel) {
    String id = getId(channel);
    if (id == null) {
      return;
    }
    _idToObject.remove(id);
  }
}

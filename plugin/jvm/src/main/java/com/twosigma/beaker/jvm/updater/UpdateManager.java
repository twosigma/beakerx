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
package com.twosigma.beaker.jvm.updater;

import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.HashMap;

import com.google.common.collect.HashBiMap;
import com.google.inject.Singleton;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.BayeuxServer.SubscriptionListener;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerMessage;
import org.cometd.bayeux.server.ServerSession;

@Singleton
public class UpdateManager implements SubscriptionListener {

  private static final Pattern PATTERN = Pattern.compile("^/object_update/((\\w|-)+)$");

  private class agingData {
    Object payload;
    long time;
    String id;
    Updater updater;
  };

  private final HashBiMap<String, Object> idToObject;
  private final HashMap<String, agingData> agingIdToObject;
  private final HashMap<String, Updater> updaters;
  private final LocalSession localSession;
  private final List<UpdaterFactory> updaterFactories;

  public UpdateManager(BayeuxServer bayeuxServer) {
    bayeuxServer.addListener(this);
    localSession = bayeuxServer.newLocalSession(this.getClass().getCanonicalName());
    localSession.handshake();
    idToObject = HashBiMap.<String, Object>create();
    agingIdToObject = new HashMap<String, agingData>();
    updaters = new  HashMap<String, Updater>();
    updaterFactories = new ArrayList<>();
  }

  public void addUpdaterFactory(UpdaterFactory updaterFactory) {
    this.updaterFactories.add(updaterFactory);
  }

  public String register(Object obj) {
    if (idToObject.containsValue(obj)) {
      return idToObject.inverse().get(obj);
    }
    // check if it is an 'old' object
    for (agingData v : agingIdToObject.values()) {
      if(v.payload.equals(obj)) {
        agingIdToObject.remove(v.id);
        idToObject.put(v.id, v.payload);
        if(v.updater!=null)
          updaters.put(v.id, v.updater);
        return v.id;
      }
    }

    String id = UUID.randomUUID().toString();
    this.idToObject.put(id, obj);
    return id;
  }

  public void unregister(String id) {
    if (idToObject.containsKey(id)) {
      idToObject.remove(id);
      return;
    }
    if (agingIdToObject.containsKey(id)) {
      agingIdToObject.remove(id);
    }
  }

  private String getId(ServerChannel channel) {
    Matcher matcher = PATTERN.matcher(channel.getId());
    if (!matcher.matches()) {
      return null;
    }
    return matcher.group(1);
  }

  @Override
  public void subscribed(ServerSession session, ServerChannel channel, ServerMessage message) {
    String id = getId(channel);
    if (id == null) {
      return;
    }
    if (this.idToObject.containsKey(id)) {
      Object obj = this.idToObject.get(id);
      Updater updater;
      if ( updaters.containsKey(id))
        updater = updaters.get(id);
      else {
        updater = getUpdater(session, this.localSession, channel.getId(), obj);
        updaters.put(id,updater);
      }
      updater.deliverUpdate(obj);
    } else if(agingIdToObject.containsKey(id)) {
      idToObject.put(id, agingIdToObject.get(id).payload);
      if(agingIdToObject.get(id).updater != null)
        updaters.put(id, agingIdToObject.get(id).updater);
      agingIdToObject.remove(id);
      Object obj = this.idToObject.get(id);
      Updater updater;
      if ( updaters.containsKey(id))
        updater = updaters.get(id);
      else {
        updater = getUpdater(session, this.localSession, channel.getId(), obj);
        updaters.put(id,updater);
      }
      updater.deliverUpdate(obj);
    } else {
      System.out.println("Client is trying to subscribe to nonexisting object " + id);
    }
  }

  @Override
  public void unsubscribed(ServerSession session, ServerChannel channel, ServerMessage message) {
    String id = getId(channel);
    if (id == null) {
      return;
    }

    if(this.idToObject.containsKey(id)) {
      agingData d = new agingData();
      d.payload = idToObject.get(id);
      d.id = id;
      d.time = System.currentTimeMillis();
      d.updater = updaters.get(id);
      agingIdToObject.put(id,d);
      idToObject.remove(id);
      updaters.remove(id);
    }
    // now age objects
    long ctime =  System.currentTimeMillis() - 1000+60; // 1 minute
    Set<String> keys = new HashSet<String>(agingIdToObject.keySet());
    for (String id2 :  keys) {
      if( agingIdToObject.get(id2).time<ctime) {
        agingIdToObject.remove(id2);
      }
    }
  }

  private Updater getUpdater(ServerSession session, LocalSession localSession, String channelId, Object updatingObject) {
    for (UpdaterFactory uf : this.updaterFactories) {
      if (uf.isApplicable(updatingObject)) {
        return uf.createUpdater(session, localSession, channelId, updatingObject);
      }
    }
    return null;
  }
}

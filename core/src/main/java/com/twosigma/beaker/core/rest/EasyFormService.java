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
import org.cometd.annotation.Service;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerChannel;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Singleton
public class EasyFormService {

  private BayeuxServer bayeux;
  private LocalSession localSession;
  private final static String CHANNEL_NAME = "/easyform";
  private Map<String, Map<String, String>> easyFormValues = new ConcurrentHashMap<>();
  private final static String SET_VALUE_EVENT = "easyformsetevent";
  private final static String SET_ENABLED_EVENT = "easyformsetenabled";

  @Inject
  public EasyFormService(final BayeuxServer bayeuxServer) {
    this.bayeux = bayeuxServer;
    this.localSession = bayeuxServer.newLocalSession(getClass().getCanonicalName());
    this.localSession.handshake();
  }

  private ServerChannel getChannel(final String session) {
    return bayeux.getChannel(CHANNEL_NAME + "/" + session);
  }

  public Object get(final String session, final String name) throws Exception {
    if (easyFormValues.containsKey(session)) {
      Map<String, String> easyFormValuesForSession = easyFormValues.get(session);
      if (easyFormValuesForSession.containsKey(name)) {
        return easyFormValuesForSession.get(name);
      } else {
        throw new Exception(
            String.format("In session: %s there is no value with name: %s.", session, name));
      }
    } else {
      throw new Exception(String.format("No map for session: %s.", session));
    }
  }

  public void set(final String session, final String name,
                  final String value,
                  final Boolean publish) throws InterruptedException {
    if (!easyFormValues.containsKey(session)) {
      easyFormValues.put(session, new ConcurrentHashMap<String, String>());
    }
    if (easyFormValues.get(session) != null) {
      easyFormValues.get(session).put(name, value);
    }
    if (publish != null && Boolean.TRUE.equals(publish)) {
      ServerChannel channel = getChannel(session);
      if (null == channel) {
        System.err.println("channel not found for session " + session);
        return;
      }
      Map<String, Object> data = new HashMap<String, Object>(1);
      data.put("session", session);
      data.put("name", name);
      data.put("value", value);
      data.put("event", SET_VALUE_EVENT);
      channel.publish(this.localSession, data, null);
    }
  }

  public void setEnabled(final String session, final String label, final Boolean enabled) {
    ServerChannel channel = getChannel(session);
    if (null == channel) {
      System.err.println("channel not found for session " + session);
      return;
    }
    Map<String, Object> data = new HashMap<String, Object>(1);
    data.put("session", session);
    data.put("label", label);
    data.put("enabled", enabled);
    data.put("event", SET_ENABLED_EVENT);
    channel.publish(this.localSession, data, null);
  }
}

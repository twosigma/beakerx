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

import java.util.Observable;
import java.util.Observer;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerSession;

public class ObservableUpdaterFactory implements UpdaterFactory {

  @Override
  public boolean isApplicable(Object o) {
    return o instanceof Observable;
  }

  @Override
  public Updater createUpdater(
      ServerSession session,
      LocalSession localSession,
      String channelId,
      Object updateSource) {

    ObservableUpdater result =
        new ObservableUpdater(session, localSession, channelId);
    ((Observable) updateSource).addObserver(result);

    return result;
  }

  private static class ObservableUpdater extends Updater
    implements Observer, Runnable {

    private final ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
    private Object updateObject = null;

    ObservableUpdater(
        ServerSession session,
        LocalSession localSession,
        String channelId) {
      super(session, localSession, channelId);
    }

    @Override
    public synchronized void update(Observable o, Object arg) {
      if (this.updateObject == null) {
        this.updateObject = o;
        this.executor.schedule(this, 500, TimeUnit.MILLISECONDS);
      }
    }

    @Override
    public synchronized void run() {
      if (this.updateObject != null) {
        deliverUpdate(this.updateObject);
        this.updateObject = null;
      }
    }
  }

}

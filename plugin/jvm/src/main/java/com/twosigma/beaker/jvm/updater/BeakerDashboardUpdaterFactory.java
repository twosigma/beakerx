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

import com.twosigma.beaker.jvm.object.BeakerDashboard;
import com.twosigma.beaker.jvm.updater.UpdaterFactory;
import java.util.Observable;
import java.util.Observer;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerSession;


public class BeakerDashboardUpdaterFactory implements UpdaterFactory {

  @Override
  public boolean isApplicable(Object o) {
    return o instanceof BeakerDashboard;
  }

  @Override
  public Updater createUpdater(
      ServerSession session,
      LocalSession localSession,
      String channelId,
      Object updateSource) {
      BeakerDashboardUpdater result = new BeakerDashboardUpdater(session, localSession, channelId);
      ((BeakerDashboard) updateSource).addObserver(result);
      return result;
  }

  private static class BeakerDashboardUpdater extends Updater implements Observer, Runnable {
      private BeakerDashboard obj;
      private final ScheduledExecutorService _executor = Executors.newSingleThreadScheduledExecutor();

      BeakerDashboardUpdater(
        ServerSession session,
        LocalSession localSession,
        String channelId) {
      super(session, localSession, channelId);
    }

    @Override
    public synchronized void run() {
        if (obj != null) {
            try {
                deliverUpdate(obj);
                obj = null;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void update(Observable o, Object arg) {
        if (obj == null) {
            obj = (BeakerDashboard) o;
            _executor.schedule(this, 500, TimeUnit.MILLISECONDS);
        }
    }
  }
}

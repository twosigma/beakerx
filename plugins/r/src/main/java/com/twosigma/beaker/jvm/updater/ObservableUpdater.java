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

import java.util.Observable;
import java.util.Observer;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerSession;

public class ObservableUpdater
    extends AbstractUpdater
    implements Observer, Runnable
{
    private ScheduledExecutorService _executor = Executors.newSingleThreadScheduledExecutor();
    private Object _updateObject = null;
    @Override
    public synchronized void update(Observable o, Object arg) {
        if (_updateObject == null) {
            _updateObject = o;
             // XXX what is this and does it limit our latency?
            _executor.schedule(this, 500, TimeUnit.MILLISECONDS);
        }
    }
    @Override
    public synchronized void run() {
        if (_updateObject != null) {
            try {
                deliverUpdate(_updateObject);
            } catch (Exception e) {
                e.printStackTrace();
            }
            _updateObject = null;
        }
    }
    public Updater getInstance(ServerSession session, LocalSession localSession, String channelId, Object updatingObject) {
        ObservableUpdater result = new ObservableUpdater();
        result.initialize(session, localSession, channelId, updatingObject);
        ((Observable) updatingObject).addObserver(result);
        return result;
    }
    public boolean isApplicable(Object o) {
        return o instanceof Observable;
    }
}

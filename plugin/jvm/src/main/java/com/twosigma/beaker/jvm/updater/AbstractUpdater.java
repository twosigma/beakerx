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

import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerSession;

public abstract class AbstractUpdater
    implements Updater
{
    private ServerSession _session;
    private LocalSession _localSession;
    private String _channelId;
    private Object _updatingObject;

    public void initialize(ServerSession session, LocalSession localSession, String channelId, Object updatingObject) {
        _session = session;
        _localSession = localSession;
        _channelId = channelId;
        _updatingObject = updatingObject;
    }
    protected Object getUpdateingObject() {
        return _updatingObject;
    }
    public void deliverUpdate(Object update) {
        _session.deliver(_localSession, _channelId, update, null);
    }
}

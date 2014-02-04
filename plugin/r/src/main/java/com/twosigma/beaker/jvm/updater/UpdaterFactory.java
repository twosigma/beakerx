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

import java.util.ArrayList;
import java.util.List;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerSession;

public class UpdaterFactory
{
    private static final List<Updater> _updaters;
    static {
        _updaters = new ArrayList<Updater>();
        _updaters.add(new ObservableUpdater());
    }
    public static Updater getUpdater(ServerSession session, LocalSession localSession, String channelId, Object updatingObject) {
        for (Updater u : _updaters) {
            if (u.isApplicable(updatingObject)) {
                return u.getInstance(session, localSession, channelId, updatingObject);
            }
        }
        return null;
    }
}

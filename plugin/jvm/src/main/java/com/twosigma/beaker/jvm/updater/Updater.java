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

import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerSession;

public abstract class Updater {

  private final ServerSession session;
  private final LocalSession localSession;
  private final String channelId;

  public Updater(
      ServerSession session,
      LocalSession localSession,
      String channelId) {
    this.session = session;
    this.localSession = localSession;
    this.channelId = channelId;
  }

  final protected void deliverUpdate(Object update) {
    try{
      this.session.deliver(this.localSession, this.channelId, update, null);
    }catch (Exception e){
      deliverError(e);
    }
  }

  private void deliverError(Exception e) {
    SimpleEvaluationObject error = SimpleEvaluationObject.createError(ExceptionUtils.getStackTrace(e));
    this.session.deliver(this.localSession, this.channelId, error, null);
  }
}

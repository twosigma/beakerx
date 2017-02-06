/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.groovy;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class NamespaceClient {
  
  private static Map<String,NamespaceClient> nsClients = new ConcurrentHashMap<String,NamespaceClient>();
  private static String currentSession;
  
  private SimpleEvaluationObject currentCeo = null;
  
  public SimpleEvaluationObject getOutputObj() {
    return currentCeo;
  }

  public synchronized void setOutputObj(SimpleEvaluationObject input) {
    currentCeo = input;
  }
  
  public synchronized static NamespaceClient getBeaker() {
    if (currentSession!=null){
      return nsClients.get(currentSession);
    }
    return null;
  }
  
  public synchronized static NamespaceClient getBeaker(String session) {
    currentSession = session;
    if (!nsClients.containsKey(session)) {
      nsClients.put(session, new NamespaceClient());
    }
    return nsClients.get(currentSession);
  }
 
  public synchronized static void delBeaker(String sessionId) {
    nsClients.remove(sessionId);
    currentSession = null;
  }
  
}
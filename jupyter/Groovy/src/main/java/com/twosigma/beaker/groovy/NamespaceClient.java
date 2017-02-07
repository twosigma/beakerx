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

import java.io.IOException;
import java.io.Serializable;
import java.io.StringWriter;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import org.lappsgrid.jupyter.groovy.handler.IHandler;
import org.lappsgrid.jupyter.groovy.msg.Message;

import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.CommNamesEnum;

public class NamespaceClient {
  
  private static Map<String,NamespaceClient> nsClients = new ConcurrentHashMap<String,NamespaceClient>();
  private static String currentSession;
  
  private ObjectMapper objectMapper;
  private BeakerObjectConverter objectSerializer;
  private SimpleEvaluationObject currentCeo = null;
  private Comm autotranslationComm = null;
  
  public NamespaceClient() {
    objectMapper = new ObjectMapper();
    objectSerializer = new BasicObjectSerializer();
  }
  
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
  
  public Object set(String name, Object value) throws IOException {
    try {
      Comm c = getAutotranslationComm();
      HashMap<String, Serializable> data = new HashMap<>();
      data.put("name", name);
      data.put("value", getJson(value));
      data.put("sync", true);
      c.setData(data);
      c.send();
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
    return value;
  }
  
  
  protected String getJson(Object value) throws IOException{
    StringWriter sw = new StringWriter();
    JsonGenerator jgen = objectMapper.getFactory().createGenerator(sw);
    objectSerializer.writeObject(value, jgen, true);
    jgen.flush();
    sw.flush();
    return sw.toString();
  }
  

  public Object setFast(String name, Object value) {
    return "setFast:" + name + "/" +value;
  }

  public Object unset(String name) {
    return "unset:" + name;
  }

  //TODO : Not Implemented
  public Object get(final String name) {
    final ObjectHolder<Object> ret = new ObjectHolder<Object>();
    try {
      Comm c = getAutotranslationComm();
      HashMap<String, Serializable> data = new HashMap<>();
      data.put("name", name);
      //data.put("value", value.toString());
      //data.put("sync", true);
      c.setData(data);
      c.addMsgCallbackList(new IHandler<Message>() {
        
        public void handle(Message message) throws NoSuchAlgorithmException{
          ret.setValue(message.getContent());
        }
        
      });
      c.send();
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
    return ret.getValue();
  }

  protected Comm getAutotranslationComm() throws NoSuchAlgorithmException{
    if(autotranslationComm == null){
      autotranslationComm = new Comm(CommNamesEnum.BEAKER_AUTOTRANSLATION);
      autotranslationComm.open();
    }
    return autotranslationComm;
  }
  
  private class ObjectHolder<T>{
    
    private T value;

    public T getValue() {
      return value;
    }

    public void setValue(T value) {
      this.value = value;
    }
    
  }
  
}
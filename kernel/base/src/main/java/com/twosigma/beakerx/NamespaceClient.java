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
package com.twosigma.beakerx;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.comm.TargetNamesEnum;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.table.TableDisplayToJson;
import java.io.IOException;
import java.io.Serializable;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.SynchronousQueue;

import static com.fasterxml.jackson.databind.SerializationFeature.WRITE_ENUMS_USING_TO_STRING;

public class NamespaceClient {
  
  private static Map<String,NamespaceClient> nsClients = new ConcurrentHashMap<>();
  private static String currentSession;
  private static Map<String, SynchronousQueue<Object>> messagePool = new HashMap<>();
  private ObjectMapper objectMapper;
  private BeakerObjectConverter objectSerializer;
  private SimpleEvaluationObject currentCeo = null;
  private Comm autotranslationComm = null;
  private Comm codeCellsComm = null;

  public NamespaceClient() {
    SimpleModule module = TableDisplayToJson.tableDisplayModule();
    objectMapper = new ObjectMapper();
    objectMapper.enable(WRITE_ENUMS_USING_TO_STRING);
    objectMapper.registerModule(module);
    objectSerializer = new BasicObjectSerializer();
  }

  public synchronized void showProgressUpdate(String message, int progress) {
    SimpleEvaluationObject seo = InternalVariable.getSimpleEvaluationObject();
    seo.structuredUpdate(message, progress);
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

  public synchronized Object set(String name, Object value) throws IOException {
    Comm c = getAutotranslationComm();
    HashMap<String, Serializable> data = new HashMap<>();
    data.put("name", name);
    data.put("value", getJson(value));
    data.put("sync", true);
    c.setData(data);
    c.send();
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

  //TODO : Not Implemented
  public Object setFast(String name, Object value) {
    throw new RuntimeException("This option is not implemented now") ;
  }

  //TODO : Not Implemented
  public Object unset(String name) {
    throw new RuntimeException("This option is not implemented now") ;
  }

  //TODO : Not Implemented
  public synchronized Object get(final String name) {
    throw new RuntimeException("This option is not implemented now") ;
  }

  public static SynchronousQueue<Object> getMessageQueue(String channel) {
    SynchronousQueue<Object> result = messagePool.get(channel);
    if (result == null) {
      result = new SynchronousQueue<Object>();
      messagePool.put(channel, result);
    }
    return result;
  }

  protected Comm getAutotranslationComm() {
    if(autotranslationComm == null){
      autotranslationComm = new Comm(TargetNamesEnum.BEAKER_AUTOTRANSLATION);
      autotranslationComm.open();
    }
    return autotranslationComm;
  }

  protected Comm getCodeCellsComm() {
    if(codeCellsComm == null){
      codeCellsComm = new Comm(TargetNamesEnum.BEAKER_GETCODECELLS);
      codeCellsComm.open();
    }
    return codeCellsComm;
  }
  
  protected Comm getTagRunComm() {
    if(codeCellsComm == null){
      codeCellsComm = new Comm(TargetNamesEnum.BEAKER_TAG_RUN);
      codeCellsComm.open();
    }
    return codeCellsComm;
  }
  

  public List<CodeCell> getCodeCells(String tagFilter) throws IOException, InterruptedException {
    // first send message to get cells
    Comm c = getCodeCellsComm();
    HashMap<String, Serializable> data = new HashMap<>();
    data.put("name", "CodeCells");
    data.put("value", getJson(tagFilter));
    c.setData(data);
    c.send();
    // block
    Object cells = getMessageQueue("CodeCells").take();
    return (List<CodeCell>)cells;
  }

  public synchronized void runByTag(String tag) {
    Comm c = getTagRunComm();
    HashMap<String, Serializable> data = new HashMap<>();
    HashMap<String, Serializable> state = new HashMap<>();
    state.put("runByTag", tag);
    data.put("state", state);
    data.put("buffer_paths", new HashMap<>());
    c.setData(data);
    c.send();
  }

}
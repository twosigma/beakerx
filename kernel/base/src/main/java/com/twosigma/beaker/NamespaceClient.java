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
package com.twosigma.beaker;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beaker.evaluator.InternalVariable;
import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.jupyter.comm.TargetNamesEnum;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;

import java.io.IOException;
import java.io.Serializable;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.SynchronousQueue;

public class NamespaceClient {

  private static Map<String, NamespaceClient> nsClients = new ConcurrentHashMap<>();
  private static String currentSession;
  private static Map<String, SynchronousQueue<Object>> messagePool = new HashMap<>();

  private ObjectMapper objectMapper;
  private BeakerObjectConverter objectSerializer;
  private SimpleEvaluationObject currentCeo = null;
  private Comm autotranslationComm = null;
  private Comm codeCellsComm = null;

  Map<String, String> beakerData = new HashMap<>();

  public NamespaceClient() {
    objectMapper = new ObjectMapper();
    objectSerializer = new BasicObjectSerializer();
  }

  public BeakerObjectConverter getObjectSerializer() {
    return objectSerializer;
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
    if (currentSession != null) {
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

  public synchronized Object get(final String name) {
    return clientJsonMapper.fromJson(beakerData.get(name));
  }

  public synchronized Object set(String name, Object value) throws IOException {
    beakerData.put(name, clientJsonMapper.getJson(value));

    Comm c = getAutotranslationComm();
    HashMap<String, Serializable> data = new HashMap<>();
    data.put("name", name);
    data.put("value", clientJsonMapper.getJson(value));
    data.put("sync", true);
    c.setData(data);
    c.send();
    return value;
  }

  public void setClientJsonMapper(ClientJsonMapper clientJsonMapper) {
    this.clientJsonMapper = clientJsonMapper;
  }

  private ClientJsonMapper clientJsonMapper = new ClientJsonMapper() {
    @Override
    public String getJson(Object value) {
      StringWriter sw = new StringWriter();
      JsonGenerator jgen = null;
      try {
        jgen = objectMapper.getFactory().createGenerator(sw);
        objectSerializer.writeObject(value, jgen, true);
        jgen.flush();
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
      sw.flush();
      return sw.toString();
    }

    @Override
    public Object fromJson(String value) {
      try {
        return objectMapper.readValue(value, Object.class);
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    }
  };

  //TODO : Not Implemented
  public Object setFast(String name, Object value) {
    throw new RuntimeException("This option is not implemented now");
  }

  //TODO : Not Implemented
  public Object unset(String name) {
    throw new RuntimeException("This option is not implemented now");
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
    if (autotranslationComm == null) {
      autotranslationComm = new Comm(TargetNamesEnum.BEAKER_AUTOTRANSLATION);
      autotranslationComm.open();
    }
    return autotranslationComm;
  }

  protected Comm getCodeCellsComm() {
    if (codeCellsComm == null) {
      codeCellsComm = new Comm(TargetNamesEnum.BEAKER_GETCODECELLS);
      codeCellsComm.open();
    }
    return codeCellsComm;
  }

  protected Comm getTagRunComm() {
    if (codeCellsComm == null) {
      codeCellsComm = new Comm(TargetNamesEnum.BEAKER_TAG_RUN);
      codeCellsComm.open();
    }
    return codeCellsComm;
  }


  public List<BeakerCodeCell> getCodeCells(String tagFilter) throws IOException, InterruptedException {
    // first send message to get cells
    Comm c = getCodeCellsComm();
    HashMap<String, Serializable> data = new HashMap<>();
    data.put("name", "CodeCells");
    data.put("value", clientJsonMapper.getJson(tagFilter));
    c.setData(data);
    c.send();
    // block
    Object cells = getMessageQueue("CodeCells").take();
    return (List<BeakerCodeCell>) cells;
  }

  public synchronized void runByTag(String tag) {
    Comm c = getTagRunComm();
    HashMap<String, Serializable> data = new HashMap<>();
    data.put("runByTag", tag);
    c.setData(data);
    c.send();
  }

  private class ObjectHolder<T> {

    private T value;

    public T getValue() {
      return value;
    }

    public void setValue(T value) {
      this.value = value;
    }

  }

  public interface ClientJsonMapper {
    String getJson(Object value);
    Object fromJson(String value);
  }

}
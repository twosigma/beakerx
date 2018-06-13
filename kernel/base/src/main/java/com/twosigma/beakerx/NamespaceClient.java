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
import java.util.concurrent.SynchronousQueue;

import static com.fasterxml.jackson.databind.SerializationFeature.WRITE_ENUMS_USING_TO_STRING;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_MSG;
import static com.twosigma.beakerx.util.Preconditions.checkNotNull;

public class NamespaceClient implements BeakerxClient {

  private static Map<String, SynchronousQueue<Object>> messagePool = new HashMap<>();
  private ObjectMapper objectMapper;
  private BeakerObjectConverter objectSerializer;
  private Comm autotranslationComm = null;
  private Comm codeCellsComm = null;
  private Comm tagRunComm = null;
  private String session;
  private AutotranslationService autotranslationService;

  public NamespaceClient(String session, AutotranslationService autotranslationService) {
    this.session = checkNotNull(session);
    this.autotranslationService = autotranslationService;
    SimpleModule module = TableDisplayToJson.tableDisplayModule();
    objectMapper = new ObjectMapper();
    objectMapper.enable(WRITE_ENUMS_USING_TO_STRING);
    objectMapper.registerModule(module);
    objectSerializer = new BasicObjectSerializer();
  }

  @Override
  public synchronized void showProgressUpdate(String message, int progress) {
    SimpleEvaluationObject seo = InternalVariable.getSimpleEvaluationObject();
    seo.structuredUpdate(message, progress);
  }

  @Override
  public synchronized void delBeaker() {
    //clear autotranslation
  }

  @Override
  public synchronized Object set(String name, Object value) {
    try {
      Comm c = getAutotranslationComm();
      HashMap<String, Serializable> data = new HashMap<>();
      HashMap<String, Serializable> state = new HashMap<>();
      state.put("name", name);
      state.put("value", getJson(value));
      state.put("sync", true);
      data.put("state", state);
      data.put("buffer_paths", new HashMap<>());
      c.send(COMM_MSG, Comm.Buffer.EMPTY, new Comm.Data(data));
      return value;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private String getJson(Object value) throws IOException {
    StringWriter sw = new StringWriter();
    JsonGenerator jgen = objectMapper.getFactory().createGenerator(sw);
    objectSerializer.writeObject(value, jgen, true);
    jgen.flush();
    sw.flush();
    return sw.toString();
  }

  //TODO : Not Implemented
  public Object setFast(String name, Object value) {
    throw new RuntimeException("This option is not implemented now");
  }

  //TODO : Not Implemented
  public Object unset(String name) {
    throw new RuntimeException("This option is not implemented now");
  }

  //TODO : Not Implemented
  @Override
  public synchronized Object get(final String name) {
    throw new RuntimeException("This option is not implemented now");
  }

  @Override
  public SynchronousQueue<Object> getMessageQueue(String channel) {
    SynchronousQueue<Object> result = messagePool.get(channel);
    if (result == null) {
      result = new SynchronousQueue<Object>();
      messagePool.put(channel, result);
    }
    return result;
  }

  private Comm getAutotranslationComm() {
    if (autotranslationComm == null) {
      autotranslationComm = new Comm(TargetNamesEnum.BEAKER_AUTOTRANSLATION);
      autotranslationComm.open();
    }
    return autotranslationComm;
  }

  private Comm getCodeCellsComm() {
    if (codeCellsComm == null) {
      codeCellsComm = new Comm(TargetNamesEnum.BEAKER_GETCODECELLS);
      codeCellsComm.open();
    }
    return codeCellsComm;
  }

  private Comm getTagRunComm() {
    if (tagRunComm == null) {
      tagRunComm = new Comm(TargetNamesEnum.BEAKER_TAG_RUN);
      tagRunComm.open();
    }
    return tagRunComm;
  }

  @Override
  public List<CodeCell> getCodeCells(String tagFilter) {
    // first send message to get cells
    try {
      Comm c = getCodeCellsComm();
      HashMap<String, Serializable> data = new HashMap<>();
      HashMap<String, Serializable> state = new HashMap<>();
      state.put("name", "CodeCells");
      state.put("value", getJson(tagFilter));
      data.put("state", state);
      data.put("buffer_paths", new HashMap<>());
      c.send(COMM_MSG, Comm.Buffer.EMPTY, new Comm.Data(data));
      // block
      Object cells = getMessageQueue("CodeCells").take();
      return (List<CodeCell>) cells;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public synchronized void runByTag(String tag) {
    Comm c = getTagRunComm();
    HashMap<String, Serializable> data = new HashMap<>();
    HashMap<String, Serializable> state = new HashMap<>();
    state.put("runByTag", tag);
    data.put("state", state);
    data.put("buffer_paths", new HashMap<>());
    c.send(COMM_MSG, Comm.Buffer.EMPTY, new Comm.Data(data));
  }

}
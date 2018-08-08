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

import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.ConfigurationFile;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.comm.TargetNamesEnum;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.SynchronousQueue;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_MSG;

public class NamespaceClient implements BeakerXClient {

  public static final String NAMESPACE_CLIENT = NamespaceClient.class.getSimpleName() + ".getBeakerX()";

  private static Map<String, SynchronousQueue<Object>> messagePool = new HashMap<>();
  private Comm codeCellsComm = null;
  private Comm tagRunComm = null;
  private AutotranslationService autotranslationService;
  private BeakerXJsonSerializer beakerXJsonSerializer;
  private CommRepository commRepository;

  public NamespaceClient(AutotranslationService autotranslationService, BeakerXJsonSerializer beakerXJsonSerializer, CommRepository commRepository) {
    this.autotranslationService = autotranslationService;
    this.beakerXJsonSerializer = beakerXJsonSerializer;
    this.commRepository = commRepository;
  }

  public static BeakerXClient getBeakerX() {
    return BeakerXClientManager.get();
  }

  @Override
  public void showProgressUpdate(String message, int progress) {
    SimpleEvaluationObject seo = InternalVariable.getSimpleEvaluationObject();
    seo.structuredUpdate(message, progress);
  }

  @Override
  public void delBeaker() {
    autotranslationService.close();
  }

  @Override
  public Object get(final String name) {
    String json = autotranslationService.get(name);
    if ("undefined".equals(json)) {
      throw new RuntimeException("name '" + name + "' is not defined on the beakerx object");
    }
    return beakerXJsonSerializer.fromJson(json);
  }

  @Override
  public String update(String name, Object value) {
    try {
      String json = getJson(value);
      autotranslationService.update(name, json);
      return json;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public Object set(String name, Object value) {
    String json = update(name, value);
    try {
      Comm c = commRepository.getOrCreateAutotranslationComm();
      HashMap<String, Serializable> data = new HashMap<>();
      HashMap<String, Serializable> state = new HashMap<>();
      state.put("name", name);
      state.put("value", json);
      state.put("sync", true);
      data.put("state", state);
      data.put("buffer_paths", new HashMap<>());
      c.send(COMM_MSG, Comm.Buffer.EMPTY, new Comm.Data(data));
      return value;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private String getJson(Object value) {
    return beakerXJsonSerializer.toJson(value);
  }

  //TODO : Not Implemented
  public Object setFast(String name, Object value) {
    throw new RuntimeException("This option is not implemented now");
  }

  //TODO : Not Implemented
  public Object unset(String name) {
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
      data.put("url", KernelManager.get().getBeakerXServer().getURL() + CODE_CELL_PATH);
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
  public void runByTag(String tag) {
    Comm c = getTagRunComm();
    HashMap<String, Serializable> data = new HashMap<>();
    HashMap<String, Serializable> state = new HashMap<>();
    state.put("runByTag", tag);
    data.put("state", state);
    data.put("buffer_paths", new HashMap<>());
    c.send(COMM_MSG, Comm.Buffer.EMPTY, new Comm.Data(data));
  }

  @Override
  public String getContext() {
    return this.autotranslationService.getContextAsString();
  }

  public static NamespaceClient create(String id, ConfigurationFile configurationFile, CommRepository commRepository) {
    return create(id, configurationFile, new DefaultBeakerXJsonSerializer(), commRepository);
  }

  public static NamespaceClient create(String id,
                                       ConfigurationFile configurationFile,
                                       BeakerXJsonSerializer serializer,
                                       CommRepository commRepository) {
    if (configurationFile.getContext().isPresent()) {
      return new NamespaceClient(AutotranslationServiceImpl.createAsSubkernel(configurationFile.getContext().get()), serializer, commRepository);
    } else {
      return new NamespaceClient(AutotranslationServiceImpl.createAsMainKernel(id), serializer, commRepository);
    }
  }
}
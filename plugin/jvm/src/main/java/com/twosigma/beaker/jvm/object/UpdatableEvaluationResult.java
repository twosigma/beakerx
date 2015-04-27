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
package com.twosigma.beaker.jvm.object;

import java.io.IOException;
import java.util.Observable;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializerProvider;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.ObjectDeserializer;
import com.twosigma.beaker.jvm.updater.UpdateManager;

public class UpdatableEvaluationResult extends Observable {
  private final static Logger logger = Logger.getLogger(UpdatableEvaluationResult.class.getName());
  private Object value;

  public UpdatableEvaluationResult(Object value) {
    this.value = value;
  }

  public Object getValue() {
    return this.value;
  }

  public void setValue(Object o) {
    value = o;
    setChanged();
    notifyObservers();
  }
  
  public static class Serializer extends JsonSerializer<UpdatableEvaluationResult> {
    private final Provider<UpdateManager> updateManagerProvider;
    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    private Serializer(Provider<UpdateManager> ump, Provider<BeakerObjectConverter> osp) {
      this.updateManagerProvider = ump;
      objectSerializerProvider = osp;
    }

    private BeakerObjectConverter getObjectSerializer() {
      return objectSerializerProvider.get();
    }

    private UpdateManager getUpdateManager() {
      return this.updateManagerProvider.get();
    }

    @Override
    public void serialize(
        UpdatableEvaluationResult v,
        JsonGenerator jgen,
        SerializerProvider sp) throws IOException, JsonProcessingException {
      synchronized (v) {
        String id = getUpdateManager().register(v);
        jgen.writeStartObject();
        jgen.writeStringField("update_id", id);
        jgen.writeStringField("type", "UpdatableEvaluationResult");
        jgen.writeFieldName("payload");
        Object obj = v.getValue();
        if (!getObjectSerializer().writeObject(obj, jgen, true))
          jgen.writeObject(obj.toString());
        jgen.writeEndObject();
      }
    }
  }
  
  public static class DeSerializer implements ObjectDeserializer {

    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    private DeSerializer(Provider<BeakerObjectConverter> osp) {
      objectSerializerProvider = osp;
    }

    private BeakerObjectConverter getObjectSerializer() {
      return objectSerializerProvider.get();
    }

    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
      UpdatableEvaluationResult o = null;
      try {
        Object payload=null;
        
        if (n.has("payload"))
          payload = getObjectSerializer().deserialize(n.get("payload"), mapper);
        
        o = new UpdatableEvaluationResult(payload);
      } catch (Exception e) {
        logger.log(Level.SEVERE, "exception deserializing UpdatableEvaluationResult ", e);
      }
      return o;
    }

    @Override
    public boolean canBeUsed(JsonNode n) {
      return n.has("type") && n.get("type").asText().equals("UpdatableEvaluationResult");
    }
  }     
}

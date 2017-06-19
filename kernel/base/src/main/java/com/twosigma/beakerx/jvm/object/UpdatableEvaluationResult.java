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
package com.twosigma.beakerx.jvm.object;

import java.io.IOException;
import java.util.Observable;

import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.jvm.serialization.ObjectDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UpdatableEvaluationResult extends Observable {
  private final static Logger logger = LoggerFactory.getLogger(UpdatableEvaluationResult.class.getName());
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

    @Override
    public void serialize(
        UpdatableEvaluationResult v,
        JsonGenerator jgen,
        SerializerProvider sp) throws IOException, JsonProcessingException {
      synchronized (v) {
        jgen.writeStartObject();
        jgen.writeStringField("type", "UpdatableEvaluationResult");
        jgen.writeFieldName("payload");
        Object obj = v.getValue();
        jgen.writeObject(obj!=null ? obj : "null");
        jgen.writeEndObject();
      }
    }
  }
  
  public static class DeSerializer implements ObjectDeserializer {

    private final BeakerObjectConverter parent;

    public DeSerializer(BeakerObjectConverter p) {
      parent = p;
      parent.addKnownBeakerType("UpdatableEvaluationResult");
    }

    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
      UpdatableEvaluationResult o = null;
      try {
        Object payload=null;
        
        if (n.has("payload"))
          payload = parent.deserialize(n.get("payload"), mapper);
        
        o = new UpdatableEvaluationResult(payload);
      } catch (Exception e) {
        logger.error("exception deserializing UpdatableEvaluationResult ", e);
      }
      return o;
    }

    @Override
    public boolean canBeUsed(JsonNode n) {
      return n.has("type") && n.get("type").asText().equals("UpdatableEvaluationResult");
    }
  }     
}

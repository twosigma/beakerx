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

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.jvm.updater.UpdateManager;

public class UpdatableEvaluationResult extends Observable {

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
    private final Provider<ObjectSerializer> objectSerializerProvider;

    @Inject
    private Serializer(Provider<UpdateManager> ump, Provider<ObjectSerializer> osp) {
      this.updateManagerProvider = ump;
      objectSerializerProvider = osp;
    }

    private ObjectSerializer getObjectSerializer() {
      return objectSerializerProvider.get();
    }

    private UpdateManager getUpdateManager() {
      return this.updateManagerProvider.get();
    }

    @Override
    public void serialize(
        UpdatableEvaluationResult evalResult,
        JsonGenerator jgen,
        SerializerProvider sp) throws IOException, JsonProcessingException {
      synchronized (evalResult) {
        String id = getUpdateManager().register(evalResult);
        jgen.writeStartObject();
        jgen.writeObjectField("update_id", id);
        jgen.writeStringField("type", "UpdatableEvaluationResult");
        jgen.writeFieldName("payload");
        Object obj = evalResult.getValue();
        if (!getObjectSerializer().writeObject(obj, jgen))
          jgen.writeObject(obj.toString());
        jgen.writeEndObject();
      }
    }
  }
}

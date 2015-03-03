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
import java.util.List;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import com.google.inject.Inject;
import com.google.inject.Provider;

public class OutputContainer {

  private final List<Object> items;

  public OutputContainer(List<Object> items) {
    this.items = items;
  }

  public static class Serializer extends JsonSerializer<OutputContainer> {

    private final Provider<ObjectSerializer> objectSerializerProvider;

    @Inject
    public Serializer(Provider<ObjectSerializer> osp) {
      objectSerializerProvider = osp;
    }

    private ObjectSerializer getObjectSerializer() {
      return objectSerializerProvider.get();
    }

    @Override
    public void serialize(OutputContainer value,
        JsonGenerator jgen,
        SerializerProvider provider)
        throws IOException, JsonProcessingException {

      synchronized (value) {
        jgen.writeStartObject();
        jgen.writeObjectField("type", "OutputContainer");
        jgen.writeArrayFieldStart("items");
        for (Object obj : value.items)
          if (!getObjectSerializer().writeObject(obj, jgen))
            jgen.writeObject(obj.toString());
        jgen.writeEndArray();
        jgen.writeEndObject();
      }
    }
  }
}

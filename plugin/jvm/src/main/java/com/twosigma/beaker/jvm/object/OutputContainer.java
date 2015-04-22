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
import java.util.ArrayList;
import java.util.List;
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

public class OutputContainer {
  private final static Logger logger = Logger.getLogger(OutputContainer.class.getName());
  private final List<Object> items;

  public OutputContainer(List<Object> items) {
    this.items = items;
  }

  public static class Serializer extends JsonSerializer<OutputContainer> {

    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    public Serializer(Provider<BeakerObjectConverter> osp) {
      objectSerializerProvider = osp;
    }

    private BeakerObjectConverter getObjectSerializer() {
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
        if (value.items != null) {
          for (Object obj : value.items)
            if (!getObjectSerializer().writeObject(obj, jgen))
              jgen.writeObject("ERROR: unsupported object"+obj.toString());
        }
        jgen.writeEndArray();
        jgen.writeEndObject();
      }
    }
  }
  
  public static class DeSerializer implements ObjectDeserializer {
    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    public DeSerializer(Provider<BeakerObjectConverter> osp) {
      objectSerializerProvider = osp;
    }

    private BeakerObjectConverter getObjectSerializer() {
      return objectSerializerProvider.get();
    }

    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
      Object o = null;
      try {
        List<Object> vals = null;
        
        if (n.has("items")) {
          JsonNode nn = n.get("items");
          if (nn.isArray()) {
            vals = new ArrayList<Object>();
            for (JsonNode no : nn) {
              vals.add(getObjectSerializer().deserialize(no, mapper));
            }
          }
        }
        o = new OutputContainer(vals);
      } catch (Exception e) {
        logger.log(Level.SEVERE, "exception deserializing OutputContainer ", e);
      }
      return o;
    }

    @Override
    public boolean canBeUsed(JsonNode n) {
      return n.has("type") && n.get("type").asText().equals("OutputContainer");
    }
  }     
}

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
package com.twosigma.beakerx.jvm.serialization;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beakerx.shared.NamespaceBinding;

/*
 * This class is used to deserialize the root object when reading from the notebook namespace
 */
public class NamespaceBindingDeserializer extends JsonDeserializer<NamespaceBinding> {

  private final Provider<BeakerObjectConverter> objectSerializerProvider;

  @Inject
  public NamespaceBindingDeserializer(Provider<BeakerObjectConverter> osp) {
    objectSerializerProvider = osp;
  }

  @Override
  public NamespaceBinding deserialize(JsonParser jp, DeserializationContext ctxt) 
      throws IOException, JsonProcessingException {
    ObjectMapper mapper = (ObjectMapper)jp.getCodec();
    JsonNode node = mapper.readTree(jp);
    String name = node.get("name").asText();
    String session = node.get("session").asText();
    Boolean defined = node.get("defined").asBoolean();
    JsonNode o = node.get("value");

    Object obj = objectSerializerProvider.get().deserialize(o, mapper);
    return new NamespaceBinding(name,session,obj,defined);
  }
}
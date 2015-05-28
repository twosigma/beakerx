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
package com.twosigma.beaker.jvm.serialization;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;
import org.codehaus.jackson.map.ObjectMapper;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.BeakerCodeCell;

/*
 * This class is used to deserialize the above fake root object when reading the notebook code cells
 */
public class BeakerCodeCellListDeserializer extends JsonDeserializer<BeakerCodeCellList> {

  private final Provider<BeakerObjectConverter> objectSerializerProvider;

  @Inject
  public BeakerCodeCellListDeserializer(Provider<BeakerObjectConverter> osp) {
    objectSerializerProvider = osp;
  }

  @Override
  public BeakerCodeCellList deserialize(JsonParser jp, DeserializationContext ctxt) 
      throws IOException, JsonProcessingException {
    ObjectMapper mapper = (ObjectMapper)jp.getCodec();
    JsonNode node = mapper.readTree(jp);
    
    List<BeakerCodeCell> l = new ArrayList<BeakerCodeCell>();
    if (node.isArray()) {
      for (JsonNode o : node) {
        Object obj = objectSerializerProvider.get().deserialize(o, mapper);
        if (obj instanceof BeakerCodeCell)
          l.add((BeakerCodeCell) obj);
      }
    }
    
    BeakerCodeCellList r = new BeakerCodeCellList();
    r.theList = l;
    return r;
  }
}
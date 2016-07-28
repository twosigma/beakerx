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

import com.twosigma.beaker.jvm.object.OutputContainer;
import com.twosigma.beaker.jvm.object.OutputContainerLayoutManager;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

public class OutputContainerDeserializer implements ObjectDeserializer {
  protected final BeakerObjectConverter parent;

  public OutputContainerDeserializer(BeakerObjectConverter p) {
    parent = p;
    addKnownBeakerType();
  }

  protected void addKnownBeakerType(){
    parent.addKnownBeakerType("OutputContainer");
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    Object o = null;
    try {
      List<Object> items = null;
      List<String> labels = null;

      if (n.has("items")) {
        JsonNode nn = n.get("items");
        if (nn.isArray()) {
          items = new ArrayList<>();
          for (JsonNode no : nn) {
            items.add(parent.deserialize(no, mapper));
          }
        }
      }
      if (n.has("labels")) {
        JsonNode nn = n.get("labels");
        if (nn.isArray()) {
          labels = new ArrayList<>();
          for (JsonNode no : nn) {
            labels.add(no.asText());
          }
        }
      }

      o = createOutputContainer(items, labels);
      if (n.has("layout")) {
        Object layout = parent.deserialize(n.get("layout"), mapper);
        ((OutputContainer)o).setLayoutManager((OutputContainerLayoutManager) layout);
      }
    } catch (Exception e) {
      OutputContainer.LOGGER.error("exception deserializing OutputContainer ", e);
    }
    return o;
  }

  protected OutputContainer createOutputContainer(List<Object> items, List<String> labels){
    return  new OutputContainer(items, labels);
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("OutputContainer");
  }
}
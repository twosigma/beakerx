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
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

public abstract class BasicOutputContainerDeserializer<T extends OutputContainer> implements ObjectDeserializer {
  protected final BeakerObjectConverter parent;

  public BasicOutputContainerDeserializer(BeakerObjectConverter p) {
    parent = p;
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    T o = null;
    try {
      List<Object> items = null;

      if (n.has("items")) {
        JsonNode nn = n.get("items");
        if (nn.isArray()) {
          items = new ArrayList<>();
          for (JsonNode no : nn) {
            items.add(parent.deserialize(no, mapper));
          }
        }
      }

      List<String> labels = null;
      if (n.has("labels")) {
        JsonNode nn = n.get("labels");
        if (nn.isArray()) {
          labels = new ArrayList<>();
          for (JsonNode no : nn) {
            labels.add((String) parent.deserialize(no, mapper));
          }
        }
      }
      o = createObject();

      if (items != null && labels != null && items.size() == labels.size()) {
        for (int i = 0; i < items.size(); i++) {
          Object item = items.get(i);
          o.addItem(item, labels.get(i));
        }
      }


    } catch (Exception e) {
      OutputContainer.LOGGER.log(Level.SEVERE, "exception deserializing OutputContainer ", e);
    }
    return o;
  }


  protected abstract T createObject ();
}

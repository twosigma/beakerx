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

public abstract class OutputContainerLayoutManagerDeserializer<T extends OutputContainerLayoutManager> implements ObjectDeserializer {
  protected final BeakerObjectConverter parent;

  public OutputContainerLayoutManagerDeserializer(BeakerObjectConverter p) {
    parent = p;
    addKnownBeakerType();
  }


  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    T layout = null;
    try {
      layout = createOutputContainerLayoutManager(n);
      if (n.has("borderDisplayed")) {
        layout.setBorderDisplayed( n.get("borderDisplayed").asBoolean());
      }
    } catch (Exception e) {
      OutputContainer.LOGGER.error("exception deserializing OutputContainerLayoutManager ", e);
    }
    return layout;
  }

  protected abstract T createOutputContainerLayoutManager(JsonNode n);

  protected abstract void addKnownBeakerType();

}
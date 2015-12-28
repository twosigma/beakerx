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

import com.twosigma.beaker.jvm.object.CyclingOutputContainerLayoutManager;
import org.codehaus.jackson.JsonNode;

public class CyclingOutputContainerLayoutManagerDeserializer extends OutputContainerLayoutManagerDeserializer<CyclingOutputContainerLayoutManager> {

  public CyclingOutputContainerLayoutManagerDeserializer(BeakerObjectConverter p) {
    super(p);
  }

  @Override
  protected CyclingOutputContainerLayoutManager createOutputContainerLayoutManager(JsonNode n) {
    CyclingOutputContainerLayoutManager layout = new CyclingOutputContainerLayoutManager();
    if (n.has("period")) {
      layout.setPeriod(n.get("period").asLong());
    }

    return layout;
  }

  @Override
  protected void addKnownBeakerType() {
    parent.addKnownBeakerType("CyclingOutputContainerLayoutManager");
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("CyclingOutputContainerLayoutManager");
  }
}
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

import com.twosigma.beaker.jvm.object.DashboardLayoutManager;
import org.codehaus.jackson.JsonNode;

public class DashboardLayoutManagerDeserializer extends OutputContainerLayoutManagerDeserializer<DashboardLayoutManager> {

  public DashboardLayoutManagerDeserializer(BeakerObjectConverter p) {
    super(p);
  }

  @Override
  protected DashboardLayoutManager createOutputContainerLayoutManager(JsonNode n) {
    DashboardLayoutManager layout = new DashboardLayoutManager(n.get("columns").asInt());

    if (n.has("paddingTop")) {
      layout.setPaddingTop(n.get("paddingTop").asInt());
    }
    if (n.has("paddingBottom")) {
      layout.setPaddingBottom(n.get("paddingBottom").asInt());
    }
    if (n.has("paddingLeft")) {
      layout.setPaddingLeft(n.get("paddingLeft").asInt());
    }
    if (n.has("paddingRight")) {
      layout.setPaddingRight(n.get("paddingRight").asInt());
    }

    return layout;
  }

  @Override
  protected void addKnownBeakerType() {
    parent.addKnownBeakerType("DashboardLayoutManager");
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("DashboardLayoutManager");
  }
}
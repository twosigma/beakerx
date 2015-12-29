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
import com.twosigma.beaker.jvm.object.OutputContainerCell;
import org.codehaus.jackson.JsonNode;

import java.util.List;

public class OutputContainerCellDeserializer extends OutputContainerDeserializer {

  public OutputContainerCellDeserializer(BeakerObjectConverter p) {
    super(p);
  }

  @Override
  protected OutputContainer createOutputContainer(List<Object> items, List<String> labels) {
    return new OutputContainerCell(items, labels);
  }


  @Override
  protected void addKnownBeakerType(){
    parent.addKnownBeakerType("OutputContainerCell");
  }


  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("OutputContainerCell");
  }
}
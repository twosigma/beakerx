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

package com.twosigma.beaker.chart.serializer;

import net.sf.jtreemap.swing.TreeMapNode;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;
import java.util.Map;


public class TreeMapNodeSerializer extends JsonSerializer<TreeMapNode> {
  @Override
  @SuppressWarnings("unchecked")
  public void serialize(TreeMapNode treeMapNode,
                        JsonGenerator jgen,
                        SerializerProvider provider) throws
                                                     IOException,
                                                     JsonProcessingException {
    jgen.writeStartObject();

    jgen.writeObjectField("type", treeMapNode.getClass().getSimpleName());
    jgen.writeObjectField("weight", treeMapNode.getWeight());

    if (treeMapNode.getValue() != null) {
      jgen.writeObjectField("value", treeMapNode.getDoubleValue());
      jgen.writeObjectField("labelValue", treeMapNode.getLabelValue());

      Object userObject = treeMapNode.getUserObject();
      Map<String, Object> values = (Map<String, Object>) userObject;
      jgen.writeObjectField("label", values.get("label"));
      jgen.writeObjectField("color", values.get("color"));
      jgen.writeObjectField("tooltip", values.get("tooltip"));
    }

    if (treeMapNode.getChildren() != null)
      jgen.writeObjectField("children", treeMapNode.getChildren());

    jgen.writeEndObject();
  }
}

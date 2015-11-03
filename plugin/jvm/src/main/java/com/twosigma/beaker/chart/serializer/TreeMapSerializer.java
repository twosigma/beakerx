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

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.treemap.util.IToolTipBuilder;
import com.twosigma.beaker.chart.treemap.TreeMap;
import net.sf.jtreemap.swing.TreeMapNode;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

public class TreeMapSerializer extends ChartSerializer<TreeMap> {

  protected String toHex(Color col) {
    return  "RGB(" + col.getRed() + "," + col.getGreen() + "," + col.getBlue() + ")";
  }

  @Override
  public void serialize(final TreeMap treeMap,
                        JsonGenerator jgen,
                        SerializerProvider provider) throws
                                                     IOException,
                                                     JsonProcessingException {

    TreeMapNode root = treeMap.getRoot();

    process(root, new Visitor<TreeMapNode>() {
      @Override
      public void visit(TreeMapNode node) {
        Object userObject = node.getUserObject();
        Map<String, Object> values;
        if (userObject instanceof Map) {
          values = (Map<String, Object>) userObject;
          if (node.isLeaf()) {
            Color color = treeMap.getColorProvider().getColor(node);
            values.put("color", toHex(color));
            IToolTipBuilder toolTipBuilder = treeMap.getToolTipBuilder();
            if (toolTipBuilder != null) {
              values.put("tooltip", toolTipBuilder.getToolTip(node));
            } else {
              values.put("tooltip", values.get("label"));
            }
          }
          node.setUserObject(values);
        }else{
          values = new HashMap<>();
          values.put("label", userObject);
          IToolTipBuilder toolTipBuilder = treeMap.getToolTipBuilder();
          if (toolTipBuilder != null) {
            values.put("tooltip", toolTipBuilder.getToolTip(node));
          } else {
            values.put("tooltip", userObject);
          }
        }
        if (node.isLeaf()) {
          Color color = treeMap.getColorProvider().getColor(node);
          values.put("color", toHex(color));
        }

        node.setUserObject(values);

      }
    });

    jgen.writeStartObject();

    serialize(treeMap, jgen);

    if (root != null)
      jgen.writeObjectField("graphics_list", root);

    if (treeMap.getMode() != null)
      jgen.writeObjectField("mode", treeMap.getMode().getJsName());
    if (treeMap.getSticky() != null)
      jgen.writeObjectField("sticky", treeMap.getSticky());
    if (treeMap.getRatio() != null)
      jgen.writeObjectField("ratio", treeMap.getRatio());
    if (treeMap.getRound() != null)
      jgen.writeObjectField("round", treeMap.getRound());

    jgen.writeObjectField("valueAccessor", treeMap.getValueAccessor());

    jgen.writeEndObject();
  }

  private void process(TreeMapNode node, Visitor<TreeMapNode> visitor) {
    visitor.visit(node);
    Vector<TreeMapNode> children = node.getChildren();
    if (children != null) {
      for (TreeMapNode child : children) {
        process(child, visitor);
      }
    }
  }

  interface Visitor<T> {
    void visit(T object);
  }
}

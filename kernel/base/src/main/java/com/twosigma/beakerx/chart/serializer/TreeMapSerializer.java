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

package com.twosigma.beakerx.chart.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.treemap.TreeMap;
import com.twosigma.beakerx.chart.treemap.util.IToolTipBuilder;
import net.sf.jtreemap.swing.TreeMapNode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.chart.serializer.AbstractChartSerializer.NUMBER_OF_POINTS_TO_DISPLAY;
import static com.twosigma.beakerx.chart.serializer.AbstractChartSerializer.ROWS_LIMIT_ITEMS;
import static com.twosigma.beakerx.chart.serializer.AbstractChartSerializer.TOO_MANY_ROWS;
import static com.twosigma.beakerx.chart.serializer.AbstractChartSerializer.TOTAL_NUMBER_OF_POINTS;
import static com.twosigma.beakerx.chart.treemap.TreeMap.ROWS_LIMIT;

public class TreeMapSerializer extends ChartSerializer<TreeMap> {

  public static final String TOOLTIP = "tooltip";
  public static final String GRAPHICS_LIST = "graphics_list";
  public static final String MODE = "mode";
  public static final String STICKY = "sticky";
  public static final String RATIO = "ratio";
  public static final String ROUND = "round";
  public static final String VALUE_ACCESSOR = "valueAccessor";

  private final TreeMapReducer treeMapReducer = new TreeMapReducer(ROWS_LIMIT);

  protected String toHex(Color col) {
    return "#" + Integer.toHexString(col.getRGB()).substring(2);
  }

  @Override
  public void serialize(final TreeMap treeMap,
                        JsonGenerator jgen,
                        SerializerProvider provider) throws IOException {

    TreeMapNode root = treeMap.getRoot();
    int numberOfNodes = TreeMapNodeCounter.countAllNodes(root);
    jgen.writeStartObject();
    jgen.writeObjectField(TOTAL_NUMBER_OF_POINTS, numberOfNodes);
    boolean tooManyRows = numberOfNodes > ROWS_LIMIT;
    jgen.writeBooleanField(TOO_MANY_ROWS, tooManyRows);
    if (tooManyRows) {
      root = treeMapReducer.limitTreeMap(root);
      jgen.writeObjectField(ROWS_LIMIT_ITEMS, ROWS_LIMIT);
      jgen.writeObjectField(NUMBER_OF_POINTS_TO_DISPLAY, TreeMapNodeCounter.countAllNodes(root));
    }
    process(root, node -> setUserObject(treeMap, node));

    serialize(treeMap, jgen);

    if (root != null)
      jgen.writeObjectField(GRAPHICS_LIST, root);

    if (treeMap.getMode() != null)
      jgen.writeObjectField(MODE, treeMap.getMode().getJsName());
    if (treeMap.getSticky() != null)
      jgen.writeObjectField(STICKY, treeMap.getSticky());
    if (treeMap.getRatio() != null)
      jgen.writeObjectField(RATIO, treeMap.getRatio());
    if (treeMap.getRound() != null)
      jgen.writeObjectField(ROUND, treeMap.getRound());

    jgen.writeObjectField(VALUE_ACCESSOR, treeMap.getValueAccessor());

    jgen.writeEndObject();
  }

  private void setUserObject(TreeMap treeMap, TreeMapNode node) {
    Object userObject = node.getUserObject();
    Map<String, Object> values;
    if (userObject instanceof Map) {
      values = (Map<String, Object>) userObject;
      if (node.isLeaf()) {
        Color color = treeMap.getColorProvider().getColor(node);
        values.put("color", toHex(color));
        IToolTipBuilder toolTipBuilder = treeMap.getToolTipBuilder();
        if (toolTipBuilder != null) {
          values.put(TOOLTIP, toolTipBuilder.getToolTip(node));
        } else {
          values.put(TOOLTIP, values.get("label"));
        }
      }
      node.setUserObject(values);
    } else {
      values = new HashMap<>();
      values.put("label", userObject);
      IToolTipBuilder toolTipBuilder = treeMap.getToolTipBuilder();
      if (toolTipBuilder != null) {
        values.put(TOOLTIP, toolTipBuilder.getToolTip(node));
      } else {
        values.put(TOOLTIP, userObject);
      }
    }
    if (node.isLeaf()) {
      Color color = treeMap.getColorProvider().getColor(node);
      values.put("color", toHex(color));
    }

    node.setUserObject(values);
  }

  private void process(TreeMapNode node, Visitor<TreeMapNode> visitor) {
    visitor.visit(node);
    Iterable<TreeMapNode> children = node.getChildren();
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

/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import net.sf.jtreemap.swing.TreeMapNode;

import java.util.Map;

public class TreeMapNodeCounter {

  public static final String IS_LEAF = "isLeaf";

  public static int countAllNodes(TreeMapNode node) {
    return count(node, 0, (object, count1) -> count1 + 1);
  }

  public static int countReducedLeaves(TreeMapNode node) {
    return count(node, 0, (object, count) -> {
      Map<String, Object> userObject = (Map<String, Object>)object.getUserObject();
      Boolean isLeaf = (Boolean)userObject.get(IS_LEAF);
      if (isLeaf) {
        return count + 1;
      }
      return count;
    });
  }

  private static int count(TreeMapNode node, int count, Visitor visitor) {
    count = visitor.visit(node, count);
    Iterable<TreeMapNode> children = node.getChildren();
    if (children != null) {
      for (TreeMapNode child : children) {
        count = count(child, count, visitor);
      }
    }
    return count;
  }

  interface Visitor {
    int visit(TreeMapNode object, int count);
  }
}

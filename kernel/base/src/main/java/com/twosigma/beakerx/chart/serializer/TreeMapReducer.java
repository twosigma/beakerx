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

import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class TreeMapReducer {

  private int limit;

  public TreeMapReducer(int limit) {
    this.limit = limit;
  }

  public TreeMapNode limitTreeMap(TreeMapNode root) {
    Queue<TreeLayer> treeLayers = createTreeLayers(root);
    Map<TreeMapNode, TreeMapNode> mapper = reduceTreeMapChildren(treeLayers);
    return mapper.get(root);
  }

  private Queue<TreeLayer> createTreeLayers(TreeMapNode root) {
    Queue<TreeLayer> treeLayers = new LinkedList<>();
    TreeLayer treeLayer = new TreeLayer();
    treeLayer.addNodeLayer(new NodeLayer(root, root.getChildren()));
    treeLayers.add(treeLayer);
    createNextTreeLayer(treeLayer, treeLayers);
    return treeLayers;
  }

  private void createNextTreeLayer(TreeLayer treeLayer, Queue<TreeLayer> treeLayers) {
    TreeLayer newTreeLayer = createTreeLayer(treeLayer.getNodeLayers());
    if (!newTreeLayer.getNodeLayers().isEmpty()) {
      treeLayers.add(newTreeLayer);
      createNextTreeLayer(newTreeLayer, treeLayers);
    }
  }

  private TreeLayer createTreeLayer(List<NodeLayer> nodeLayers) {
    TreeLayer newTreeLayer = new TreeLayer();
    for (NodeLayer rtl : nodeLayers) {
      List<TreeMapNode> children = rtl.getChildren();
      if (children != null) {
        for (TreeMapNode child : children) {
          NodeLayer nodeLayer = new NodeLayer(child, child.getChildren());
          newTreeLayer.addNodeLayer(nodeLayer);
        }
      }
    }
    return newTreeLayer;
  }

  private Map<TreeMapNode, TreeMapNode> reduceTreeMapChildren(Queue<TreeLayer> treeLayers) {
    Map<TreeMapNode, TreeMapNode> mapper = new HashMap<>();
    TreeCounter treeCounter = new TreeCounter();
    for (TreeLayer tl : treeLayers) {
      boolean numberOfNodesChanged = true;
      while (numberOfNodesChanged && treeCounter.getCount() < limit) {
        numberOfNodesChanged = tl.addChildToNodeLayers(treeCounter, mapper);
      }
    }
    return mapper;
  }

  private class TreeCounter {
    private int count = 1;

    public void increase() {
      this.count++;
    }

    public int getCount() {
      return count;
    }
  }


  private class TreeLayer {
    private List<NodeLayer> nodeLayers;

    TreeLayer() {
      this.nodeLayers = new LinkedList<>();
    }

    List<NodeLayer> getNodeLayers() {
      return nodeLayers;
    }

    boolean addChildToNodeLayers(TreeCounter treeCounter, Map<TreeMapNode, TreeMapNode> mapper) {
      boolean atLeastOneChildAdded = false;
      for (NodeLayer nl : getNodeLayers()) {
        if (treeCounter.getCount() < limit) {
          atLeastOneChildAdded = nl.addChild(treeCounter, mapper) || atLeastOneChildAdded;
        }
      }
      return atLeastOneChildAdded;
    }

    void addNodeLayer(NodeLayer nodeLayer) {
      this.nodeLayers.add(nodeLayer);
    }
  }

  private class NodeLayer {

    private final Iterator<TreeMapNode> iter;
    private TreeMapNode node;
    private List<TreeMapNode> children;

    NodeLayer(TreeMapNode node, List<TreeMapNode> children) {
      this.node = node;
      this.children = children;
      this.iter = (this.children == null) ? Collections.emptyIterator() : children.iterator();
    }

    public TreeMapNode getNode() {
      return node;
    }

    public List<TreeMapNode> getChildren() {
      return children;
    }

    boolean addChild(TreeCounter treeCounter, Map<TreeMapNode, TreeMapNode> mapper) {
      if (iter.hasNext()) {
        if (!mapper.containsKey(node)) {
          TreeMapNode clonedNode = (TreeMapNode) node.clone();
          mapper.put(node, clonedNode);
        }
        TreeMapNode child = iter.next();
        TreeMapNode clone = (TreeMapNode) child.clone();
        mapper.get(node).add(clone);
        mapper.put(child, clone);
        treeCounter.increase();
        return true;
      }
      return false;
    }
  }

}

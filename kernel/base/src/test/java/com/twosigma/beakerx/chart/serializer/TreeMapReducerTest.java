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

import net.sf.jtreemap.swing.DefaultValue;
import net.sf.jtreemap.swing.TreeMapNode;
import org.jetbrains.annotations.NotNull;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

public class TreeMapReducerTest {

  public static final int LIMIT = 1000;
  private TreeMapReducer sut;

  @Before
  public void setUp() throws Exception {
    sut = new TreeMapReducer(LIMIT);
  }

  @Test
  public void shouldNotLimitTree() {
    //given
    TreeMapNode root = createTree(250, 150, 100, 100);
    //when
    TreeMapNode limitedRoot = sut.limitTreeMap(root);
    //then
    assertThat(TreeMapNodeCounter.countAllNodes(limitedRoot)).isEqualTo(601);
  }

  @Test
  public void shouldLimitTree() {
    //given
    TreeMapNode root = createTree(100, 500, 200, 600);
    //when
    TreeMapNode limitedRoot = sut.limitTreeMap(root);
    //then
    assertThat(TreeMapNodeCounter.countAllNodes(limitedRoot)).isEqualTo(LIMIT);
    List<TreeMapNode> children1 = getLastLayerChildrenForChild(0, limitedRoot);
    assertThat(children1.size()).isEqualTo(349);
    List<TreeMapNode> children2 = getLastLayerChildrenForChild(1, limitedRoot);
    assertThat(children2.size()).isEqualTo(348);
  }

  private List<TreeMapNode> getLastLayerChildrenForChild(int childIndex, TreeMapNode limitedRoot) {
    List<TreeMapNode> children = limitedRoot.getChildren();
    List<TreeMapNode> childrenBranch1 = children.get(childIndex).getChildren();
    return childrenBranch1.get(childrenBranch1.size() - 1).getChildren();
  }

  @NotNull
  private TreeMapNode createTree(int i, int i2, int i3, int i4) {
    TreeMapNode root = new TreeMapNode("root");
    TreeMapNode nodeX = new TreeMapNode("branch1");
    TreeMapNode nodeY = new TreeMapNode("branch2");
    IntStream.range(1, i).forEach(it -> nodeX.add(new TreeMapNode(it + "", it * 2, new DefaultValue(it))));
    TreeMapNode nodeX1 = new TreeMapNode("branch11");
    IntStream.range(1, i2).forEach(it -> nodeX1.add(new TreeMapNode(it + "", it * 2, new DefaultValue(it))));
    nodeX.add(nodeX1);
    IntStream.range(1, i3).forEach(it -> nodeY.add(new TreeMapNode(it + "", it * 2, new DefaultValue(it))));
    TreeMapNode nodeY1 = new TreeMapNode("branch21");
    IntStream.range(1, i4).forEach(it -> nodeY1.add(new TreeMapNode(it + "", it * 2, new DefaultValue(it))));
    nodeY.add(nodeY1);
    root.add(nodeX);
    root.add(nodeY);
    return root;
  }

}
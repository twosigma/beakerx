/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.chart.treemap;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.chart.treemap.util.IToolTipBuilder;
import com.twosigma.beaker.jupyter.KernelManager;
import net.sf.jtreemap.swing.TreeMapNode;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class TreeMapTest {

  TreeMap treeMap;

  @BeforeClass
  public static void setUpClass() throws Exception {
    KernelManager.register(new KernelTest());
  }

  @Before
  public void setUp() throws Exception {
    treeMap = new TreeMap();
  }

  @Test
  public void
  createTreeMapByDefaultConstructor_hasColorProviderNotNullShowLegendIsFalseRootIsNull() {
    //then
    assertThat(treeMap.getColorProvider()).isNotNull();
    assertThat(treeMap.getShowLegend()).isFalse();
    assertThat(treeMap.getRoot()).isNull();
  }

  @Test
  public void
  createTreeMapWithTreeMapNodeParam_hasColorProviderNotNullShowLegendIsFalseRootInNotNull() {
    //when
    TreeMap treeMap = new TreeMap(new TreeMapNode("label"));
    //then
    assertThat(treeMap.getColorProvider()).isNotNull();
    assertThat(treeMap.getShowLegend()).isFalse();
    assertThat(treeMap.getRoot()).isNotNull();
  }

  @Test
  public void createTreeMapByDefaultConstructor_hasModeAndStickyAndRoundAndRatioAreNulls() {
    //then
    assertThat(treeMap.getMode()).isNull();
    assertThat(treeMap.getRatio()).isNull();
    assertThat(treeMap.getSticky()).isNull();
    assertThat(treeMap.getRound()).isNull();
  }

  @Test
  public void setToolTipBuilder_hasToolTipBuilder() {
    //when
    treeMap.setToolTipBuilder(new IToolTipBuilder() {
      @Override
      public String getToolTip(TreeMapNode node) {
        return "tooltip";
      }
    });
    //then
    assertThat(treeMap.getToolTipBuilder()).isNotNull();
  }

}

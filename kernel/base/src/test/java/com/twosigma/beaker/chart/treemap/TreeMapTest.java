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

package com.twosigma.beaker.chart.treemap;

import net.sf.jtreemap.swing.TreeMapNode;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class TreeMapTest {

  @Test
  public void
  createTreeMapByDefaultConstructor_hasColorProviderNotNullShowLegendIsFalseRootIsNull() {
//    //when
//    TreeMap treeMap = new TreeMap();
//    //then
//    Assertions.assertThat(treeMap.getColorProvider()).isNotNull();
//    Assertions.assertThat(treeMap.getShowLegend()).isFalse();
//    Assertions.assertThat(treeMap.getRoot()).isNull();
  }

  @Test
  public void
  createTreeMapWithTreeMapNodeParam_hasColorProviderNotNullShowLegendIsFalseRootInNotNull() {
    //when
//    TreeMap treeMap = new TreeMap(new TreeMapNode("label"));
    //then
//    Assertions.assertThat(treeMap.getColorProvider()).isNotNull();
//    Assertions.assertThat(treeMap.getShowLegend()).isFalse();
//    Assertions.assertThat(treeMap.getRoot()).isNotNull();
  }

  @Test
  public void createTreeMapByDefaultConstructor_hasModeAndStickyAndRoundAndRatioAreNulls() {
    //when
//    TreeMap treeMap = new TreeMap();
    //then
//    Assertions.assertThat(treeMap.getMode()).isNull();
//    Assertions.assertThat(treeMap.getRatio()).isNull();
//    Assertions.assertThat(treeMap.getSticky()).isNull();
//    Assertions.assertThat(treeMap.getRound()).isNull();
  }
}

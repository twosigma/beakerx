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

package com.twosigma.beaker.chart.heatmap;

import com.twosigma.beaker.jupyter.GroovyKernelManager;
import com.twosigma.beaker.widgets.GroovyKernelTest;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class HeatMapTest {

  @Before
  public void setUp() throws Exception {
    GroovyKernelManager.register(new GroovyKernelTest());
  }

  @After
  public void tearDown() throws Exception {
    GroovyKernelManager.register(null);
  }

  @Test
  public void createHeatMapByEmptyConstructor_hasLegendPositionAndLayoutAreNotNulls() {
    //when
    HeatMap heatMap = new HeatMap();
    //then
    Assertions.assertThat(heatMap.getLegendPosition()).isNotNull();
    Assertions.assertThat(heatMap.getLegendLayout()).isNotNull();
  }

  @Test
  public void setDataWith2DIntegerArrayParam_hasDataIsNotEmpty() {
    //when
    HeatMap heatMap = new HeatMap();
    heatMap.setData(
        new Integer[][] {
          new Integer[] {new Integer(1), new Integer(2)},
          new Integer[] {new Integer(3), new Integer(4)}
        });
    //then
    Assertions.assertThat(heatMap.getData()).isNotEmpty();
  }
}

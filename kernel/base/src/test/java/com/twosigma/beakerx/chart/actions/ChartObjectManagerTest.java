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

package com.twosigma.beakerx.chart.actions;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.chart.Chart;
import com.twosigma.beakerx.chart.xychart.Plot;
import com.twosigma.beakerx.jupyter.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ChartObjectManagerTest {

  private ChartObjectManager chartObjectManager;
  protected KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    chartObjectManager = new ChartObjectManager();
    kernel = new KernelTest();
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void registerChart_containsThatChart() {
    Chart chart = new Plot();
    //when
    chartObjectManager.registerChart("id1", chart);
    //then
    Assertions.assertThat(chartObjectManager.getChart("id1")).isEqualTo(chart);
  }

}

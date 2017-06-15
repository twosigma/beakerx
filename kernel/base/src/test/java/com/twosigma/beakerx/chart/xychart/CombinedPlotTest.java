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

package com.twosigma.beakerx.chart.xychart;

import com.twosigma.beakerx.jupyter.KernelManager;
import com.twosigma.beakerx.KernelTest;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.LinkedHashMap;

import static com.twosigma.beakerx.widgets.TestWidgetUtils.findValueForProperty;
import static org.assertj.core.api.Assertions.assertThat;

public class CombinedPlotTest {

  private CombinedPlot combinedPlot;
  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    combinedPlot = new CombinedPlot();
    combinedPlot.display();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void shouldSendCommMsgWhenAddPlotByLeftShift() throws Exception {
    //given
    Plot plot = new Plot();
    //when
    combinedPlot.leftShift(plot);
    //then
    verifyModel();
  }

  private void verifyModel() {
    LinkedHashMap model = findValueForProperty(kernel, XYChart.MODEL, LinkedHashMap.class);
    assertThat(model).isNotNull();
  }

  @Test
  public void addTwoPlotsToCombinedPlot_hasSubplotsSizeIsTwoAndWeightListSizeIsTwo() {
    //when
    combinedPlot.add(new Plot());
    combinedPlot.add(new Plot());
    //then
    assertThat(combinedPlot.getSubplots().size()).isEqualTo(2);
    assertThat(combinedPlot.getWeights().size()).isEqualTo(2);
  }

  @Test
  public void addTwoPlotsAndWeightsToCombinedPlot_hasSubplotsSizeIsTwoAndWeightListSizeIsTwo() {
    //when
    combinedPlot.add(new Plot(), 3);
    combinedPlot.add(new Plot(), 3);
    //then
    assertThat(combinedPlot.getSubplots().size()).isEqualTo(2);
    assertThat(combinedPlot.getWeights().size()).isEqualTo(2);
  }

  @Test
  public void leftShiftWithPlot_shouldAddPlotToFirstPosition() {
    Plot plot = new Plot();
    //when
    combinedPlot.add(new Plot(), 1);
    combinedPlot.leftShift(plot);
    //then
    assertThat(combinedPlot.getSubplots().get(1)).isEqualTo(plot);
  }

  @Test
  public void leftShiftWithListParam_shouldAddPlotToFirstPosition() {
    Plot plot = new Plot();
    //when
    combinedPlot.add(new Plot(), 1);
    combinedPlot.leftShift(Arrays.asList(plot, 3));
    //then
    assertThat(combinedPlot.getSubplots().get(1)).isEqualTo(plot);
  }

}

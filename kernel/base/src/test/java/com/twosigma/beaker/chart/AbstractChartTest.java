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

package com.twosigma.beaker.chart;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.chart.xychart.plotitem.Crosshair;
import com.twosigma.beaker.chart.xychart.plotitem.YAxis;
import com.twosigma.beaker.jupyter.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Arrays;

public class AbstractChartTest {

  private AbstractChart chart;

  @BeforeClass
  public static void setUpClass() throws Exception {
    KernelManager.register(new KernelTest());
  }

  @Before
  public void setUp() throws Exception {
    chart = new Plot();
    KernelManager.register(new KernelTest());
  }

  @AfterClass
  public static void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void addWithList_hasYAxesNotEmpty() {
    YAxis yAxis = new YAxis("test");
    //when
    chart.add(Arrays.asList(yAxis));
    //then
    Assertions.assertThat(chart.getYAxes()).isNotEmpty();
    Assertions.assertThat(chart.getYAxes().get(1).getLabel()).isEqualTo("test");
  }

  @Test
  public void setOmitCheckboxesByTrue_OmitCheckboxesIsTrue() {
    //when
    chart.setOmitCheckboxes(true);
    //then
    Assertions.assertThat(chart.getOmitCheckboxes()).isTrue();
  }

  @Test
  public void setYAutoRangeIncludesZeroByTrue_YAutoRangeIncludesZeroIsTrue() {
    //when
    chart.setYAutoRangeIncludesZero(true);
    //then
    Assertions.assertThat(chart.getYAutoRangeIncludesZero()).isTrue();
  }

  @Test
  public void setYBoundWithList_hasYLoweAndUpperBounds() {
    //when
    chart.setYBound(Arrays.asList(1.0d, 10.0d));
    //then
    Assertions.assertThat(chart.getYLowerBound()).isEqualTo(1.0d);
    Assertions.assertThat(chart.getYUpperBound()).isEqualTo(10.0d);
  }

  @Test
  public void setYBoundWithTwoParams_hasYLoweAndUpperBounds() {
    //when
    chart.setYBound(1.0d, 10.0d);
    //then
    Assertions.assertThat(chart.getYLowerBound()).isEqualTo(1.0d);
    Assertions.assertThat(chart.getYUpperBound()).isEqualTo(10.0d);
  }

  @Test
  public void setYLogBaseWithDoubleParam_hasYLogBase() {
    //when
    chart.setYLogBase(5.0d);
    //then
    Assertions.assertThat(chart.getYLogBase()).isEqualTo(5.0d);
  }

  @Test
  public void setXLabel_hasXLabel() {
    //when
    chart.setXLabel("testX");
    //then
    Assertions.assertThat(chart.getXLabel()).isEqualTo("testX");
  }

  @Test
  public void setxLabel_hasXLabel() {
    //when
    chart.setxLabel("test_x");
    //then
    Assertions.assertThat(chart.getXLabel()).isEqualTo("test_x");
  }

  @Test
  public void setyLabel_hasYLabel() {
    //when
    chart.setyLabel("test_y");
    //then
    Assertions.assertThat(chart.getYLabel()).isEqualTo("test_y");
  }

  @Test
  public void setYLabel_hasYLabel() {
    //when
    chart.setYLabel("testY");
    //then
    Assertions.assertThat(chart.getYLabel()).isEqualTo("testY");
  }

  @Test
  public void setXLowerMarginWithDoubleParam_hasXLowerMargin() {
    //when
    chart.setXLowerMargin(3.0d);
    //then
    Assertions.assertThat(chart.getXLowerMargin()).isEqualTo(3.0d);
  }

  @Test
  public void setxLowerMarginWithDoubleParam_hasXLowerMargin() {
    //when
    chart.setxLowerMargin(3.5d);
    //then
    Assertions.assertThat(chart.getXLowerMargin()).isEqualTo(3.5d);
  }

  @Test
  public void setXUpperMarginWithDoubleParam_hasXUpperMargin() {
    //when
    chart.setXUpperMargin(7.0d);
    //then
    Assertions.assertThat(chart.getXUpperMargin()).isEqualTo(7.0d);
  }

  @Test
  public void setxUpperMarginWithDoubleParam_hasXUpperMargin() {
    //when
    chart.setxUpperMargin(7.5d);
    //then
    Assertions.assertThat(chart.getXUpperMargin()).isEqualTo(7.5d);
  }

  @Test
  public void setyAutoRangeByTrue_YAutoRangeIsTrue() {
    //when
    chart.setyAutoRange(true);
    //then
    Assertions.assertThat(chart.getYAutoRange()).isTrue();
  }

  @Test
  public void setyAutoRangeIncludesZeroByTrue_YAutoRangeIncludesZeroIsTrue() {
    //when
    chart.setyAutoRangeIncludesZero(true);
    //then
    Assertions.assertThat(chart.getYAutoRangeIncludesZero()).isTrue();
  }

  @Test
  public void setyBoundWithList_hasYLoweAndUpperBounds() {
    //when
    chart.setyBound(Arrays.asList(1.0d, 10.0d));
    //then
    Assertions.assertThat(chart.getYLowerBound()).isEqualTo(1.0d);
    Assertions.assertThat(chart.getYUpperBound()).isEqualTo(10.0d);
  }

  @Test
  public void setyLogBaseWithDoubleParam_hasYLogBase() {
    //when
    chart.setyLogBase(5.0d);
    //then
    Assertions.assertThat(chart.getYLogBase()).isEqualTo(5.0d);
  }

  @Test
  public void setyLowerMarginWithDoubleParam_hasYLowerMargin() {
    //when
    chart.setyLowerMargin(0.3d);
    //then
    Assertions.assertThat(chart.getYLowerMargin()).isEqualTo(0.3d);
  }

  @Test
  public void setyUpperMarginWithDoubleParam_hasYUpperMargin() {
    //when
    chart.setyUpperMargin(0.7d);
    //then
    Assertions.assertThat(chart.getYUpperMargin()).isEqualTo(0.7d);
  }

  @Test
  public void leftShiftWithYAxisParam_shouldAddYAxis() {
    //when
    chart.leftShift(new YAxis("test yAxis"));
    //then
    Assertions.assertThat(chart.getYAxes().get(1).getLabel()).isEqualTo("test yAxis");
  }

  @Test
  public void leftShiftWithListParam_shouldAddYAxes() {
    //when
    chart.leftShift(Arrays.asList(new YAxis("axis1"), new YAxis("axis2")));
    //then
    Assertions.assertThat(chart.getYAxes().get(1).getLabel()).isEqualTo("axis1");
  }

  @Test
  public void setCrosshair_hasCrosshair() {
    //when
    chart.setCrosshair(new Crosshair());
    //then
    Assertions.assertThat(chart.getCrosshair()).isNotNull();
  }

}

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

package com.twosigma.beaker.chart;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.chart.actions.CategoryGraphicsActionObject;
import com.twosigma.beaker.chart.xychart.XYChart;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.widgets.chart.BeakerxPlot;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.LinkedHashMap;

import static com.twosigma.beaker.chart.serializer.ChartSerializer.CHART_TITLE;
import static com.twosigma.beaker.widgets.TestWidgetUtils.findValueForProperty;

public abstract class ChartTest<T extends Chart> {

  protected KernelTest kernel;
  private Chart chart;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    chart = createWidget();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  public abstract T createWidget();

  @Test
  public void shouldSendCommMsgWhenTitleChange() throws Exception {
    //given
    String title = "title1";
    //when
    chart.setTitle(title);
    //then
    LinkedHashMap model = findValueForProperty(kernel, XYChart.MODEL, LinkedHashMap.class);
    Assertions.assertThat(model.get(CHART_TITLE)).isEqualTo(title);
  }

  @Test
  public void createChartByEmptyConstructor_ChartHasInitHeightWidth() {
    //when
    //then
    Assertions.assertThat(chart.getInitHeight()).isGreaterThan(0);
    Assertions.assertThat(chart.getInitWidth()).isGreaterThan(0);
  }

  @Test
  public void setCustomStyles_hasCustomStyles() {
    //when
    chart.setCustomStyles(Arrays.asList("style1", "style2"));
    //then
    Assertions.assertThat(chart.getCustomStyles()).isNotEmpty();
  }

  @Test
  public void setGridLineStyle_hasGridLineStyle() {
    //when
    chart.setGridLineStyle("grid_style");
    //then
    Assertions.assertThat(chart.getGridLineStyle()).isEqualTo("grid_style");
  }

  @Test
  public void setInitHeight_hasInitHeight() {
    //when
    chart.setInitHeight(5);
    //then
    Assertions.assertThat(chart.getInitHeight()).isEqualTo(5);
  }

  @Test
  public void setInitWidth_hasInitWidth() {
    //when
    chart.setInitWidth(10);
    //then
    Assertions.assertThat(chart.getInitWidth()).isEqualTo(10);
  }

  @Test
  public void setLabelYStyle_hasLabelYStyle() {
    //when
    chart.setLabelYStyle("labely_style");
    //then
    Assertions.assertThat(chart.getLabelYStyle()).isEqualTo("labely_style");
  }

  @Test
  public void setLabelXStyle_hasLabelXStyle() {
    //when
    chart.setLabelXStyle("labelx_style");
    //then
    Assertions.assertThat(chart.getLabelXStyle()).isEqualTo("labelx_style");
  }

  @Test
  public void setLabelStyle_hasLabelStyle() {
    //when
    chart.setLabelStyle("label_style");
    //then
    Assertions.assertThat(chart.getLabelStyle()).isEqualTo("label_style");
  }

  @Test
  public void setTitleStyle_hasTitleStyle() {
    //when
    chart.setTitleStyle("style");
    //then
    Assertions.assertThat(chart.getTitleStyle()).isEqualTo("style");
  }

  @Test
  public void setTitle_hasTitle() {
    //when
    chart.setTitle("test");
    //then
    Assertions.assertThat(chart.getTitle()).isEqualTo("test");
  }

  @Test
  public void setDetails_hasDetails() {
    CategoryGraphicsActionObject aObject = new CategoryGraphicsActionObject();
    //when
    chart.setDetails(aObject);
    //then
    Assertions.assertThat(chart.getDetails()).isEqualTo(aObject);
  }

  @Test
  public void defaultChart_hasModelAndViewNameValues() {
    //when
    //then
    Assertions.assertThat(chart.getModelNameValue()).isEqualTo(BeakerxPlot.MODEL_NAME_VALUE);
    Assertions.assertThat(chart.getViewNameValue()).isEqualTo(BeakerxPlot.VIEW_NAME_VALUE);
  }

}

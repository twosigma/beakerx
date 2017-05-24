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
package com.twosigma.beaker.chart.xychart;

import com.twosigma.beaker.chart.ChartTest;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantBand;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantLine;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.Rasters;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
import org.junit.Test;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;

import static com.twosigma.beaker.widgets.TestWidgetUtils.findValueForProperty;
import static org.assertj.core.api.Assertions.assertThat;

public abstract class XYChartTest extends ChartTest {

  @Test
  public void shouldSendCommMsgWhenAddRastersByLeftShift() throws Exception {
    //given
    XYChart xyChart = widget();
    Rasters raster = new Rasters();
    List<Number> value = Collections.singletonList(1);
    raster.setY(value);
    raster.setWidth(value);
    raster.setHeight(value);
    //when
    xyChart.leftShift(raster);
    //then
    verifyModel();
  }

  @Test
  public void shouldSendCommMsgWhenAddXYGraphicsByLeftShift() throws Exception {
    //given
    XYChart xyChart = widget();
    Line graphics = new Line();
    graphics.setX(Collections.singletonList(1));
    graphics.setY(Collections.singletonList(1));
    //when
    xyChart.leftShift(graphics);
    //then
    verifyModel();
  }

  @Test
  public void shouldSendCommMsgWhenAddConstantLineByLeftShift() throws Exception {
    //given
    XYChart xyChart = widget();
    //when
    xyChart.leftShift(new ConstantLine());
    //then
    verifyModel();
  }

  @Test
  public void shouldSendCommMsgWhenAddConstantBandByLeftShift() throws Exception {
    //given
    XYChart xyChart = widget();
    //when
    xyChart.leftShift(new ConstantBand());
    //then
    verifyModel();
  }

  @Test
  public void shouldSendCommMsgWhenAddTextByLeftShift() throws Exception {
    //given
    XYChart xyChart = widget();
    //when
    xyChart.leftShift(new Text());
    //then
    verifyModel();
  }

  private void verifyModel() {
    LinkedHashMap model = findValueForProperty(kernel, XYChart.MODEL, LinkedHashMap.class);
    assertThat(model).isNotNull();
  }

  private XYChart widget() {
    XYChart widget = createWidget();
    return widget;
  }

  public abstract XYChart createWidget();

}
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

import com.twosigma.beaker.chart.AbstractChartTest;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantBand;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantLine;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.Rasters;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
import org.junit.Test;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;

import static com.twosigma.beaker.chart.serializer.XYChartSerializer.CONSTANT_BANDS;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.CONSTANT_LINES;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.GRAPHICS_LIST;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.LOD_THRESHOLD;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.LOG_X;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.RASTERS;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.TEXTS;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.X_AUTO_RANGE;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.X_LOG_BASE;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.X_LOWER_BOUND;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.X_TICK_LABELS_VISIBLE;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.X_UPPER_BOUND;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.Y_TICK_LABELS_VISIBLE;
import static org.assertj.core.api.Assertions.assertThat;

public abstract class XYChartTest<T extends XYChart> extends AbstractChartTest<XYChart> {


  @Test
  public void shouldSendCommMsgWhenYTickLabelsVisibleChange() throws Exception {
    //given
    XYChart xyChart = createWidget();
    //when
    xyChart.setyTickLabelsVisible(true);
    //then
    assertThat(xyChart.isyTickLabelsVisible()).isEqualTo(true);
    LinkedHashMap model = getModel();
    assertThat(model.get(Y_TICK_LABELS_VISIBLE)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenXTickLabelsVisibleChange() throws Exception {
    //given
    XYChart xyChart = createWidget();
    //when
    xyChart.setxTickLabelsVisible(true);
    //then
    assertThat(xyChart.isxTickLabelsVisible()).isEqualTo(true);
    LinkedHashMap model = getModel();
    assertThat(model.get(X_TICK_LABELS_VISIBLE)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenLodThresholdChange() throws Exception {
    //given
    XYChart xyChart = createWidget();
    //when
    xyChart.setLodThreshold(3);
    //then
    assertThat(xyChart.getLodThreshold()).isEqualTo(3);
    LinkedHashMap model = getModel();
    assertThat(model.get(LOD_THRESHOLD)).isEqualTo(3);
  }

  @Test
  public void shouldSendCommMsgWhenXLogBaseChange() throws Exception {
    //given
    XYChart xyChart = createWidget();
    //when
    xyChart.setXLogBase(11.1);
    //then
    assertThat(xyChart.getXLogBase()).isEqualTo(11.1);
    LinkedHashMap model = getModel();
    assertThat(model.get(X_LOG_BASE)).isEqualTo(11.1);
  }

  @Test
  public void shouldSendCommMsgWhenLogXChange() throws Exception {
    //given
    XYChart xyChart = createWidget();
    //when
    xyChart.setLogX(true);
    //then
    assertThat(xyChart.getLogX()).isTrue();
    LinkedHashMap model = getModel();
    assertThat(model.get(LOG_X)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenXAutoRangeChange() throws Exception {
    //given
    XYChart xyChart = createWidget();
    //when
    xyChart.setXAutoRange(true);
    //then
    assertThat(xyChart.getXAutoRange()).isTrue();
    LinkedHashMap model = getModel();
    assertThat(model.get(X_AUTO_RANGE)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenXBoundChange() throws Exception {
    //given
    XYChart xyChart = createWidget();
    //when
    xyChart.setXBound(11.0, 20.0);
    //then
    assertThat(xyChart.getXUpperBound()).isEqualTo(20.0);
    assertThat(xyChart.getXLowerBound()).isEqualTo(11.0);
    LinkedHashMap model = getModel();
    assertThat(model.get(X_UPPER_BOUND)).isEqualTo(20.0);
    assertThat(model.get(X_LOWER_BOUND)).isEqualTo(11.0);
  }


  @Test
  public void shouldSendCommMsgWhenAddRastersByLeftShift() throws Exception {
    //given
    XYChart xyChart = createWidget();
    Rasters raster = new Rasters();
    List<Number> value = Collections.singletonList(1);
    raster.setY(value);
    raster.setWidth(value);
    raster.setHeight(value);
    //when
    xyChart.leftShift(raster);
    //then
    assertThat(getValueAsArray(RASTERS)).isNotEmpty();
  }

  @Test
  public void shouldSendCommMsgWhenAddXYGraphicsByLeftShift() throws Exception {
    //given
    XYChart xyChart = createWidget();
    Line graphics = new Line();
    graphics.setX(Collections.singletonList(1));
    graphics.setY(Collections.singletonList(1));
    //when
    xyChart.leftShift(graphics);
    //then
    assertThat(getValueAsArray(GRAPHICS_LIST)).isNotEmpty();
  }

  @Test
  public void shouldSendCommMsgWhenAddConstantLineByLeftShift() throws Exception {
    //given
    XYChart xyChart = createWidget();
    //when
    xyChart.leftShift(new ConstantLine());
    //then
    assertThat(getValueAsArray(CONSTANT_LINES)).isNotEmpty();
  }

  @Test
  public void shouldSendCommMsgWhenAddConstantBandByLeftShift() throws Exception {
    //given
    XYChart xyChart = createWidget();
    //when
    xyChart.leftShift(new ConstantBand());
    //then
    assertThat(getValueAsArray(CONSTANT_BANDS)).isNotEmpty();
  }

  @Test
  public void shouldSendCommMsgWhenAddTextByLeftShift() throws Exception {
    //given
    XYChart xyChart = createWidget();
    Text text = new Text();
    //when
    xyChart.leftShift(text);
    //then
    assertThat(xyChart.getTexts().get(0)).isEqualTo(text);
    assertThat(getValueAsArray(TEXTS)).isNotEmpty();
  }


  @Override
  public abstract T createWidget();
}
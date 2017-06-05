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

package com.twosigma.beaker.chart.histogram;

import com.twosigma.beaker.chart.AbstractChart;
import com.twosigma.beaker.chart.AbstractChartTest;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.serializer.HistogramSerializer;
import org.junit.Before;
import org.junit.Test;

import java.util.LinkedHashMap;
import java.util.List;

import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.LOG_Y;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.BIN_COUNT;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.COLOR;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.COLORS;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.CUMULATIVE;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.DISPLAY_MODE;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.GRAPHICS_LIST;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.LOG;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.NAMES;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.NORMED;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

public class HistogramTest extends AbstractChartTest<Histogram> {

  private List<Integer> list1, list2;
  private Histogram histogram;

  @Before
  public void init() throws Exception {
    list1 = asList(1, 2);
    list2 = asList(3, 4);
  }

  @Test
  public void createHistogramByEmptyConstructor_hasDisplayModeIsNotNull() {
    //given
    histogram = createWidget();
    //then
    assertThat(histogram.getDisplayMode()).isNotNull();
  }

  @Test
  public void shouldSendCommMsgWhenBinCountChange() {
    //given
    histogram = createWidget();
    //when
    histogram.setBinCount(11);
    //then
    assertThat(histogram.getBinCount()).isEqualTo(11);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(BIN_COUNT)).isEqualTo(11);
  }

  @Test
  public void shouldSendCommMsgWhenNamesChange() {
    //given
    histogram = createWidget();
    //when
    histogram.setNames(asList("name123"));
    //then
    assertThat(histogram.getNames()).isEqualTo(asList("name123"));
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(HistogramSerializer.NAMES)).isNotNull();
  }

  @Test
  public void shouldSendCommMsgWhenDisplayModeChange() {
    //given
    histogram = createWidget();
    Histogram.DisplayMode overlap = Histogram.DisplayMode.OVERLAP;
    //when
    histogram.setDisplayMode(overlap);
    //then
    assertThat(histogram.getDisplayMode()).isEqualTo(overlap);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(DISPLAY_MODE)).isNotNull();
  }

  @Test
  public void shouldSendCommMsgWhenCumulativeChange() {
    //given
    histogram = createWidget();
    //when
    histogram.setCumulative(true);
    //then
    assertThat(histogram.getCumulative()).isEqualTo(true);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(CUMULATIVE)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenNormedChange() {
    //given
    histogram = createWidget();
    //when
    histogram.setNormed(true);
    //then
    assertThat(histogram.getNormed()).isEqualTo(true);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(NORMED)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenLogChange() {
    //given
    histogram = createWidget();
    //when
    histogram.setLog(true);
    //then
    assertThat(histogram.getLog()).isEqualTo(true);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(LOG)).isEqualTo(true);
  }

  @Test
  public void setDataWithListOfIntegerListsParam_hasListDataIsNotEmpty() {
    //given
    histogram = createWidget();
    //when
    histogram.setData(asList(list1, list2));
    //then
    assertThat(histogram.getListData()).isNotEmpty();
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(GRAPHICS_LIST)).isNotNull();
  }

  @Test
  public void setDataWithIntegerListParam_hasDataIsNotEmpty() {
    //given
    histogram = createWidget();
    //when
    histogram.setData(list1);
    //then
    assertThat(histogram.getData()).isNotEmpty();
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(GRAPHICS_LIST)).isNotNull();
  }

  @Test
  public void setColorWithAwtColorParam_colorHasBeakerColorType() {
    //given
    histogram = createWidget();
    //when
    histogram.setColor(java.awt.Color.GREEN);
    //then
    assertThat(histogram.getColor() instanceof Color).isTrue();
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(COLOR)).isNotNull();
  }

  @Test
  public void setColorWithAwtColorListParam_hasBeakerColorsIsNotEmpty() {
    //given
    histogram = createWidget();
    //when
    histogram.setColor(asList(java.awt.Color.GREEN, java.awt.Color.BLUE));
    //then
    assertThat(histogram.getColors()).isNotEmpty();
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    List<String> actual = (List<String>)model.get(COLORS);
    assertThat(actual.get(0)).startsWith("#");
  }

  @Test(expected = IllegalArgumentException.class)
  public void setColorWithStringParam_throwIllegalArgumentException() {
    //given
    histogram = createWidget();
    //when
    histogram.setColor("blue");
  }

  @Override
  public Histogram createWidget() {
    return new Histogram();
  }

  @Test
  public void shouldSendCommMsgWhenLogYChange() {
    //given
    AbstractChart chart =createWidget();
    //when
    chart.setLogY(true);
    //then
    assertThat(chart.getLogY()).isEqualTo(true);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(HistogramSerializer.LOG)).isEqualTo(true);
  }
}

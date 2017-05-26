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

import com.twosigma.beaker.chart.AbstractChartTest;
import com.twosigma.beaker.chart.Color;
import org.junit.Before;
import org.junit.Test;

import java.util.LinkedHashMap;
import java.util.List;

import static com.twosigma.beaker.chart.serializer.HistogramSerializer.COLOR;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.COLORS;
import static com.twosigma.beaker.chart.serializer.HistogramSerializer.GRAPHICS_LIST;
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
  public void setDataWithListOfIntegerListsParam_hasListDataIsNotEmpty() {
    //given
    histogram = createWidget();
    //when
    histogram.setData(asList(list1, list2));
    //then
    assertThat(histogram.getListData()).isNotEmpty();
    LinkedHashMap model = getModel();
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
    LinkedHashMap model = getModel();
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
    LinkedHashMap model = getModel();
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
    LinkedHashMap model = getModel();
    assertThat(model.get(COLORS)).isNotNull();
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
}

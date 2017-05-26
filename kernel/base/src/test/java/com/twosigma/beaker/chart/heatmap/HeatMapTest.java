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

import com.twosigma.beaker.chart.AbstractChartTest;
import com.twosigma.beaker.chart.GradientColor;
import org.junit.Test;

import java.util.LinkedHashMap;

import static com.twosigma.beaker.chart.serializer.HeatMapSerializer.COLOR;
import static com.twosigma.beaker.chart.serializer.HeatMapSerializer.GRAPHICS_LIST;
import static org.assertj.core.api.Assertions.assertThat;

public class HeatMapTest extends AbstractChartTest<HeatMap> {

  @Test
  public void createHeatMapByEmptyConstructor_hasLegendPositionAndLayoutAreNotNulls() {
    //when
    HeatMap heatMap = createWidget();
    //then
    assertThat(heatMap.getLegendPosition()).isNotNull();
    assertThat(heatMap.getLegendLayout()).isNotNull();
  }

  @Test
  public void shouldSendCommMsgWhenColorChange() {
    //given
    HeatMap heatMap = createWidget();
    GradientColor brownRedYellow = GradientColor.BROWN_RED_YELLOW;
    //when
    heatMap.setColor(brownRedYellow);
    //then
    assertThat(heatMap.getColor()).isEqualTo(brownRedYellow);
    LinkedHashMap model = getModel();
    assertThat(model.get(COLOR)).isNotNull();
  }

  @Test
  public void shouldSendCommMsgWhenDataChange() {
    //given
    Integer[][] data = {
            new Integer[]{1, 2},
            new Integer[]{3, 4}
    };
    HeatMap heatMap = createWidget();
    //when
    heatMap.setData(data);
    //then
    assertThat(heatMap.getData()).isNotEmpty();
    assertThat(getValueAsArray(GRAPHICS_LIST)).isNotEmpty();
  }

  @Override
  public HeatMap createWidget() {
    HeatMap heatMap = new HeatMap();
    kernel.clearSentMessages();
    kernel.clearPublishedMessages();
    return heatMap;
  }
}

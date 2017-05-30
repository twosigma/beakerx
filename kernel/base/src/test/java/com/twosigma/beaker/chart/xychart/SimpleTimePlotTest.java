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

package com.twosigma.beaker.chart.xychart;

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.Points;
import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SimpleTimePlotTest extends XYChartTest<SimpleTimePlot>{

  Map<String, Object> parameters;
  List<Map<String, Object>> rates;
  List<String> columns;


  @Test
  public void callConstructorWithDataAndColumns_shouldCreateSimpleTimePlot() {
    SimpleTimePlot simpleTimePlot =
        new SimpleTimePlot(rates, Arrays.asList("m3", "time", "num"));
    //then
    Assertions.assertThat(simpleTimePlot).isNotNull();
  }

  @Test
  public void callConstructorWithParamsAndDataAndColumns_shouldCreateSimpleTimePlot() {
    //when
    SimpleTimePlot simpleTimePlot =
        new SimpleTimePlot(parameters, rates, Arrays.asList("m3", "time", "num"));
    //then
    Assertions.assertThat(simpleTimePlot).isNotNull();
  }

  @Test
  public void setTwoColorsForThreeColumns_twoOfThreeGraphicsHasBaseColor() {
    //given
    SimpleTimePlot simpleTimePlot = createWidget();
    //when
    simpleTimePlot.setColors(Arrays.asList(Color.BLUE, Color.GREEN));
    //to call reinitialize()
    simpleTimePlot.setColumns(Arrays.asList("m3", "time", "num"));
    //then
    Assertions.assertThat(simpleTimePlot.getGraphics().get(0).getColor()).isEqualTo(Color.BLUE);
    Assertions.assertThat(simpleTimePlot.getGraphics().get(1).getColor()).isEqualTo(Color.GREEN);
    Assertions.assertThat(simpleTimePlot.getGraphics().get(2).getColor()).isNull();
  }

  @Test
  public void setTwoColorsByArrayAndAwtColor_twoGraphicsHasBaseColor() {
    //given
    SimpleTimePlot simpleTimePlot = createWidget();
    //when
    simpleTimePlot.setColors(Arrays.asList(Arrays.asList(0, 0, 255), java.awt.Color.BLACK));
    //to call reinitialize()
    simpleTimePlot.setColumns(Arrays.asList("m3", "num"));
    //then
    Assertions.assertThat(simpleTimePlot.getGraphics().get(0).getColor()).isEqualTo(Color.BLUE);
    Assertions.assertThat(simpleTimePlot.getGraphics().get(1).getColor()).isEqualTo(Color.BLACK);
  }

  @Test
  public void setTwoColorsByStrings_twoGraphicsHasBaseColor() {
    //given
    SimpleTimePlot simpleTimePlot = createWidget();
    //when
    simpleTimePlot.setColors(Arrays.asList("#00FF00", "RED"));
    //to call reinitialize()
    simpleTimePlot.setData(rates);
    //then
    Assertions.assertThat(simpleTimePlot.getGraphics().get(0).getColor()).isEqualTo(Color.GREEN);
    Assertions.assertThat(simpleTimePlot.getGraphics().get(1).getColor()).isEqualTo(Color.RED);
  }

  @Test
  public void setDataWithDate_simpleTimePlotIsNotNull() {
    //given
    SimpleTimePlot simpleTimePlot = createWidget();
    List<Map<String, Object>> data = new ArrayList<>();
    data.add(
        new HashMap<String, Object>() {
          {
            put(columns.get(0), new Float(8.25));
            put(columns.get(2), new Date());
            put(columns.get(3), 123);
          }
        });
    //when
    simpleTimePlot.setData(data);
    //then
    Assertions.assertThat(simpleTimePlot).isNotNull();
  }

  @Test
  public void setDisplayPointsByTrueAndLinesByFalse_hasOnlyPointsGraphics() {
    //given
    SimpleTimePlot simpleTimePlot = createWidget();
    //when
    simpleTimePlot.setDisplayLines(false);
    simpleTimePlot.setDisplayPoints(true);
    //then
    Assertions.assertThat(simpleTimePlot.getGraphics().get(0)).isInstanceOf(Points.class);
    Assertions.assertThat(simpleTimePlot.getGraphics().get(1)).isInstanceOf(Points.class);
    Assertions.assertThat(simpleTimePlot.getGraphics().get(2)).isInstanceOf(Points.class);
  }

  @Test
  public void setTimeColumn_hasTimeColumn() {
    //given
    SimpleTimePlot simpleTimePlot = createWidget();
    //when
    simpleTimePlot.setTimeColumn(columns.get(0));
    //then
    Assertions.assertThat(simpleTimePlot.getTimeColumn()).isEqualTo(columns.get(0));
  }

  @Test
  public void setDisplayNames_hasDisplayNames() {
    //given
    SimpleTimePlot simpleTimePlot = createWidget();
    //when
    simpleTimePlot.setDisplayNames(Arrays.asList("name1", "name2", "name3", "name4"));
    //then
    Assertions.assertThat(simpleTimePlot.getDisplayNames().get(0)).isEqualTo("name1");
  }

  @Test
  public void setDisplayNameForLines_linesHasDisplayName() {
    //given
    SimpleTimePlot simpleTimePlot = createWidget();
    //when
    simpleTimePlot.setDisplayNames(Arrays.asList("name1", "name2", "name3", "name4"));
    //to call reinitialize()
    simpleTimePlot.setDisplayLines(true);
    simpleTimePlot.setDisplayPoints(false);
    //then
    Assertions.assertThat(simpleTimePlot.getGraphics().get(0)).isInstanceOf(Line.class);
    Assertions.assertThat(simpleTimePlot.getGraphics().get(0).getDisplayName())
        .isEqualTo("name1");
    Assertions.assertThat(simpleTimePlot.getGraphics().get(1).getDisplayName())
        .isEqualTo("name2");
  }

  @Test(expected = IllegalArgumentException.class)
  public void createInstanceWithStringValues_throwIllegalArgumentException() {
    createDataForSimpleTimePlot();
    new SimpleTimePlot(rates, Arrays.asList("m3", "str", "time", "num"));
  }

  private void createDataForSimpleTimePlot() {
    columns = Arrays.asList("m3", "name", "time", "num");
    rates = new ArrayList<>();
    rates.add(
        new HashMap<String, Object>() {
          {
            put(columns.get(0), new Float(8.25));
            put(columns.get(1), "one");
            put(columns.get(2), new Long(633733200000L));
            put(columns.get(3), 123);
          }
        });
    rates.add(
        new HashMap<String, Object>() {
          {
            put(columns.get(0), new Float(9.0));
            put(columns.get(1), "two");
            put(columns.get(2), new Long(605733200000L));
            put(columns.get(3), 345);
          }
        });
    parameters =
        new HashMap<String, Object>() {
          {
            put("displayPoints", Boolean.TRUE);
            put("anyParam", Boolean.TRUE);
          }
        };
  }

  @Override
  public SimpleTimePlot createWidget() {
    createDataForSimpleTimePlot();
    SimpleTimePlot simpleTimePlot = new SimpleTimePlot(rates, Arrays.asList("m3", "time", "num"));
    kernel.clearMessages();
    return simpleTimePlot;
  }
}

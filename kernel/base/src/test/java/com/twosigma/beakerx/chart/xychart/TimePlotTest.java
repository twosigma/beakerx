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

import org.junit.Before;
import org.junit.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

public class TimePlotTest extends XYChartTest<TimePlot> {

  private Date lowerBound, upperBound;

  @Before
  public void initStubData() throws ParseException {
    SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    lowerBound = sdf.parse("01-01-2000");
    upperBound = sdf.parse("05-05-2005");
  }

  @Test
  public void setXBoundWithTwoDatesParams_shouldSetXBoundParams() {
    //when
    TimePlot timePlot = createWidget();
    timePlot.setXBound(lowerBound, upperBound);
    //then
    assertThat(timePlot.getXLowerBound()).isGreaterThan(0);
    assertThat(timePlot.getXUpperBound()).isGreaterThan(0);
    assertThat(timePlot.getXAutoRange()).isFalse();
  }

  @Test
  public void setXBoundWithListParam_shouldSetXBoundParams() {
    //when
    TimePlot timePlot = createWidget();
    timePlot.setXBound(Arrays.asList(lowerBound, upperBound));
    //then
    assertThat(timePlot.getXLowerBound()).isGreaterThan(0);
    assertThat(timePlot.getXUpperBound()).isGreaterThan(0);
    assertThat(timePlot.getXAutoRange()).isFalse();
  }

  @Override
  public TimePlot createWidget() {
    TimePlot timePlot = new TimePlot();
    timePlot.display();
    kernel.clearMessages();
    return timePlot;
  }
}

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

import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.KernelTest;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

public class TimePlotTest {

  Date lowerBound, upperBound;

  @Before
  public void initStubData() throws ParseException {
    KernelManager.register(new KernelTest());
    SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    lowerBound = sdf.parse("01-01-2000");
    upperBound = sdf.parse("05-05-2005");
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void setXBoundWithTwoDatesParams_shouldSetXBoundParams() {
    //when
    TimePlot timePlot = new TimePlot();
    timePlot.setXBound(lowerBound, upperBound);
    //then
    Assertions.assertThat(timePlot.getXLowerBound()).isGreaterThan(0);
    Assertions.assertThat(timePlot.getXUpperBound()).isGreaterThan(0);
    Assertions.assertThat(timePlot.getXAutoRange()).isFalse();
  }

  @Test
  public void setXBoundWithListParam_shouldSetXBoundParams() {
    //when
    TimePlot timePlot = new TimePlot();
    timePlot.setXBound(Arrays.asList(lowerBound, upperBound));
    //then
    Assertions.assertThat(timePlot.getXLowerBound()).isGreaterThan(0);
    Assertions.assertThat(timePlot.getXUpperBound()).isGreaterThan(0);
    Assertions.assertThat(timePlot.getXAutoRange()).isFalse();
  }
}

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

import com.twosigma.beaker.chart.xychart.plotitem.Area;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.jupyter.GroovyKernelManager;
import com.twosigma.beaker.widgets.GroovyKernelTest;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

public class PlotTest {

  Line line;
  Area area;

  @Before
  public void initStubData() {
    GroovyKernelManager.register(new GroovyKernelTest());
    line = new Line();
    line.setX(Arrays.asList(1, 2, 3));
    line.setY(Arrays.asList(2, 3, 4));
    area = new Area();
    area.setX(Arrays.asList(1, 2, 3));
    area.setY(Arrays.asList(2, 3, 4));
  }

  @After
  public void tearDown() throws Exception {
    GroovyKernelManager.register(null);
  }

  @Test
  public void createPlotByEmptyConstructor_plotHasGraphicsListIsEmpty() {
    //when
    Plot plot = new Plot();
    //then
    Assertions.assertThat(plot.getGraphics().size()).isEqualTo(0);
  }

  @Test
  public void addLineToPlot_plotHasGraphicsListSizeIsOne() {
    Plot plot = new Plot();
    //when
    plot.add(line);
    //then
    Assertions.assertThat(plot.getGraphics().size()).isEqualTo(1);
  }

  @Test
  public void addAreaToPlot_plotHasGraphicsListSizeIsOne() {
    Plot plot = new Plot();
    //when
    plot.add(area);
    //then
    Assertions.assertThat(plot.getGraphics().size()).isEqualTo(1);
  }

  @Test
  public void addLineAndAreaToPlot_plotHasGraphicsListSizeIsTwo() {
    Plot plot = new Plot();
    //when
    plot.add(line);
    plot.add(area);
    //then
    Assertions.assertThat(plot.getGraphics().size()).isEqualTo(2);
  }
}

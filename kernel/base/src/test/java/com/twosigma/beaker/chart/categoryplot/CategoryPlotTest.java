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

package com.twosigma.beaker.chart.categoryplot;

import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryBars;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryGraphics;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryLines;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryPoints;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryStems;
import com.twosigma.beaker.chart.xychart.plotitem.PlotOrientationType;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.KernelTest;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

public class CategoryPlotTest {

  Integer[] array1, array2;
  CategoryGraphics categoryBars, categoryLines, categoryPoints, categoryStems;

  @Before
  public void initStubData() {
    array1 = new Integer[] {new Integer(1), new Integer(2)};
    array2 = new Integer[] {new Integer(3), new Integer(4)};
    categoryBars = new CategoryBars();
    categoryBars.setValue(new List[] {Arrays.asList(array1), Arrays.asList(array2)});
    categoryLines = new CategoryLines();
    categoryLines.setValue(new List[] {Arrays.asList(array1), Arrays.asList(array2)});
    categoryPoints = new CategoryPoints();
    categoryPoints.setValue(new List[] {Arrays.asList(array1), Arrays.asList(array2)});
    categoryStems = new CategoryStems();
    categoryStems.setValue(new List[] {Arrays.asList(array1), Arrays.asList(array2)});
    KernelManager.register(new KernelTest());
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void createCategoryPlotByEmptyConstructor_hasVerticalOrientation() {
    //when
    CategoryPlot categoryPlot = new CategoryPlot();
    //then
    Assertions.assertThat(categoryPlot.getOrientation()).isEqualTo(PlotOrientationType.VERTICAL);
  }

  @Test
  public void addWithListOfCategoryBarsPointsAndStemsParam_hasCategoryGraphicsListSizeIsThree() {
    //when
    CategoryPlot categoryPlot = new CategoryPlot();
    categoryPlot.add(Arrays.asList(categoryBars, categoryPoints, categoryStems));
    //then
    Assertions.assertThat(categoryPlot.getGraphics().size()).isEqualTo(3);
  }

  @Test
  public void addWithCategoryLinesParam_hasCategoryGraphicsListSizeIsOne() {
    //when
    CategoryPlot categoryPlot = new CategoryPlot();
    categoryPlot.add(categoryLines);
    //then
    Assertions.assertThat(categoryPlot.getGraphics().size()).isEqualTo(1);
  }

  @Test
  public void
      threeCallsLeftShiftWithCategoryBarsPointsAndStemsParam_hasCategoryGraphicsListSizeIsThree() {
    //when
    CategoryPlot categoryPlot = new CategoryPlot();
    categoryPlot.leftShift(categoryBars).leftShift(categoryPoints).leftShift(categoryStems);
    //then
    Assertions.assertThat(categoryPlot.getGraphics().size()).isEqualTo(3);
  }

  @Test
  public void leftShiftWithCategoryLinesParam_hasCategoryGraphicsListSizeIsOne() {
    //when
    CategoryPlot categoryPlot = new CategoryPlot();
    categoryPlot.leftShift(categoryLines);
    //then
    Assertions.assertThat(categoryPlot.getGraphics().size()).isEqualTo(1);
  }
}

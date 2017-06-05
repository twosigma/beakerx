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

import com.twosigma.beaker.chart.AbstractChartTest;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryBars;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryGraphics;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryLines;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryPoints;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryStems;
import com.twosigma.beaker.chart.serializer.CategoryPlotSerializer;
import com.twosigma.beaker.chart.xychart.plotitem.PlotOrientationType;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

import static com.twosigma.beaker.chart.serializer.CategoryPlotSerializer.CATEGORY_MARGIN;
import static com.twosigma.beaker.chart.serializer.CategoryPlotSerializer.CATEGORY_NAMES;
import static com.twosigma.beaker.chart.serializer.CategoryPlotSerializer.CATEGORY_NAMES_LABEL_ANGLE;
import static com.twosigma.beaker.chart.serializer.CategoryPlotSerializer.GRAPHICS_LIST;
import static com.twosigma.beaker.chart.serializer.CategoryPlotSerializer.ORIENTATION;
import static org.assertj.core.api.Assertions.assertThat;

public class CategoryPlotTest extends AbstractChartTest<CategoryPlot> {

  Integer[] array1, array2;
  CategoryGraphics categoryBars, categoryLines, categoryPoints, categoryStems;

  @Before
  public void initStubData() {
    array1 = new Integer[]{new Integer(1), new Integer(2)};
    array2 = new Integer[]{new Integer(3), new Integer(4)};
    categoryBars = new CategoryBars();
    categoryBars.setValue(new List[]{Arrays.asList(array1), Arrays.asList(array2)});
    categoryLines = new CategoryLines();
    categoryLines.setValue(new List[]{Arrays.asList(array1), Arrays.asList(array2)});
    categoryPoints = new CategoryPoints();
    categoryPoints.setValue(new List[]{Arrays.asList(array1), Arrays.asList(array2)});
    categoryStems = new CategoryStems();
    categoryStems.setValue(new List[]{Arrays.asList(array1), Arrays.asList(array2)});
  }

  @Test
  public void shouldSendCommMsgWhenCategoryNamesLabelAngleChange() throws Exception {
    //given
    CategoryPlot plot = createWidget();
    //when
    plot.setCategoryNamesLabelAngle(22.2);
    //then
    assertThat(plot.getCategoryNamesLabelAngle()).isEqualTo(22.2);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(CATEGORY_NAMES_LABEL_ANGLE)).isEqualTo(22.2);
  }

  @Test
  public void shouldSendCommMsgWhenCategoryMarginChange() throws Exception {
    //given
    CategoryPlot plot = createWidget();
    //when
    plot.setCategoryMargin(11.1);
    //then
    assertThat(plot.getCategoryMargin()).isEqualTo(11.1);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(CATEGORY_MARGIN)).isEqualTo(11.1);
  }

  @Test
  public void shouldSendCommMsgWhenOrientationChange() throws Exception {
    //given
    CategoryPlot plot = createWidget();
    //when
    plot.setOrientation(PlotOrientationType.HORIZONTAL);
    //then
    assertThat(plot.getOrientation()).isEqualTo(PlotOrientationType.HORIZONTAL);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(ORIENTATION)).isEqualTo(PlotOrientationType.HORIZONTAL.toString());
  }

  @Test
  public void shouldSendCommMsgWhenAddCategoryNamesByLeftShift() throws Exception {
    //given
    CategoryPlot plot = createWidget();
    List<String> names = Arrays.asList("name1");
    //when
    plot.setCategoryNames(names);
    //then
    assertThat(plot.getCategoryNames()).isEqualTo(names);
    List valueAsArray = getValueAsArray(CATEGORY_NAMES);
    assertThat(valueAsArray).isNotEmpty();
  }

  @Test
  public void shouldSendCommMsgWhenAddCategoryBarsByLeftShift() throws Exception {
    //given
    CategoryPlot plot = createWidget();
    CategoryBars graphics = new CategoryBars();
    //when
    plot.leftShift(graphics);
    //then
    assertThat(plot.getGraphics().get(0)).isEqualTo(graphics);
    List valueAsArray = getValueAsArray(CategoryPlotSerializer.GRAPHICS_LIST);
    assertThat(valueAsArray).isNotEmpty();
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
  public void threeCallsLeftShiftWithCategoryBarsPointsAndStemsParam_hasCategoryGraphicsListSizeIsThree() {
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

  @Override
  public CategoryPlot createWidget() {
    return new CategoryPlot();
  }
}

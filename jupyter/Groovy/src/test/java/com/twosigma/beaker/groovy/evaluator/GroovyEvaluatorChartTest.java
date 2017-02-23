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

package com.twosigma.beaker.groovy.evaluator;

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryBars;
import com.twosigma.beaker.chart.heatmap.HeatMap;
import com.twosigma.beaker.chart.histogram.Histogram;
import com.twosigma.beaker.chart.legend.LegendLayout;
import com.twosigma.beaker.chart.legend.LegendPosition;
import com.twosigma.beaker.chart.xychart.CombinedPlot;
import com.twosigma.beaker.chart.xychart.NanoPlot;
import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.chart.xychart.SimpleTimePlot;
import com.twosigma.beaker.chart.xychart.TimePlot;
import com.twosigma.beaker.chart.xychart.plotitem.Area;
import com.twosigma.beaker.chart.xychart.plotitem.Bars;
import com.twosigma.beaker.chart.xychart.plotitem.LabelPositionType;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.PlotOrientationType;
import com.twosigma.beaker.chart.xychart.plotitem.Points;
import com.twosigma.beaker.chart.xychart.plotitem.ShapeType;
import com.twosigma.beaker.chart.xychart.plotitem.Stems;
import com.twosigma.beaker.chart.xychart.plotitem.StrokeType;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class GroovyEvaluatorChartTest extends GroovyEvaluatorTest {

  @Test
  public void parsePlotWithTitleScript_returnPlotObjectWithTitle() {
    //when
    Object result = parseClassFromScript("def plot = new Plot(title: \"Setting line properties\")");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getTitle()).isEqualTo("Setting line properties");
  }

  @Test
  public void parsePlotWithLineScript_returnPlotObjectWithLine() {
    //when
    Object result =
        parseClassFromScript(
            "def plot = new Plot()\n"
                + "def ys = [0, 1, 6, 5, 2, 8]\n"
                + "plot << new Line(y: ys)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics()).isNotEmpty();
    Assertions.assertThat(plot.getGraphics().get(0) instanceof Line).isTrue();
  }

  @Test
  public void parsePlotWithRedColorLineScript_returnPlotObjectWithRedLine() {
    //when
    Object result =
        parseClassFromScript(
            "def plot = new Plot()\n"
                + "def ys = [0, 1, 6, 5, 2, 8]\n"
                + "plot << new Line(y: ys, color: Color.red)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics()).isNotEmpty();
    Assertions.assertThat(plot.getGraphics().get(0).getColor()).isEqualTo(Color.RED);
  }

  @Test
  public void parsePlotWithStemsScript_returnPlotObjectWithStems() {
    //when
    Object result =
        parseClassFromScript(
            "def plot = new Plot();\n"
                + "def y1 = [1.5, 1, 6, 5, 2, 8]\n"
                + "plot << new Stems(y: y1)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics()).isNotEmpty();
    Assertions.assertThat(plot.getGraphics().get(0) instanceof Stems).isTrue();
  }

  @Test
  public void parsePlotWithDashStyleStemsScript_returnPlotObjectWithDashStyleStems() {
    //when
    Object result =
        parseClassFromScript(
            "def plot = new Plot();\n"
                + "def y1 = [1.5, 1, 6, 5, 2, 8]\n"
                + "plot << new Stems(y: y1, style: StrokeType.DASH)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics()).isNotEmpty();
    Assertions.assertThat(((Stems) plot.getGraphics().get(0)).getStyle())
        .isEqualTo(StrokeType.DASH);
  }

  @Test
  public void parsePlotWithPointsScript_returnPlotObjectWithPoints() {
    //when
    Object result =
        parseClassFromScript(
            "def plot = new Plot();\n"
                + "def y1 = [6, 7, 12, 11, 8, 14]\n"
                + "plot << new Points(y: y1)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics()).isNotEmpty();
    Assertions.assertThat(plot.getGraphics().get(0) instanceof Points).isTrue();
  }

  @Test
  public void parsePlotWithCircleShapePointsScript_returnPlotObjectWithCircleShapePoints() {
    //when
    Object result =
        parseClassFromScript(
            "def plot = new Plot();\n"
                + "def y1 = [1.5, 1, 6, 5, 2, 8]\n"
                + "plot << new Points(y: y1, shape: ShapeType.CIRCLE)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics()).isNotEmpty();
    Assertions.assertThat(((Points) plot.getGraphics().get(0)).getShape())
        .isEqualTo(ShapeType.CIRCLE);
  }

  @Test
  public void parsePlotWithAreaScript_returnPlotObjectWithArea() {
    //when
    Object result =
        parseClassFromScript(
            "def plot = new Plot()\n"
                + "def ys = [3, 5, 2, 3]\n"
                + "def xs = [0, 1, 2, 3]\n"
                + "plot << new Area(x: xs, y: ys)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics()).isNotEmpty();
    Assertions.assertThat(plot.getGraphics().get(0) instanceof Area).isTrue();
  }

  @Test
  public void parsePlotWithBarsScript_returnPlotObjectWithBars() {
    //when
    Object result =
        parseClassFromScript(
            "def plot = new Plot()\n" + "plot << new Bars(x: (1..5), y: [3, 5, 2, 3, 7])");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics()).isNotEmpty();
    Assertions.assertThat(plot.getGraphics().get(0) instanceof Bars).isTrue();
  }

  @Test
  public void parsePlotWithConstantBandScript_returnPlotObjectWithConstantBand() {
    //when
    Object result =
        parseClassFromScript("def plot = new Plot()\n" + "plot << new ConstantBand(x: [1, 2])");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getConstantBands()).isNotEmpty();
    Assertions.assertThat(plot.getConstantBands().get(0)).isNotNull();
  }

  @Test
  public void parsePlotWithConstantLineScript_returnPlotObjectWithConstantLine() {
    //when
    Object result =
        parseClassFromScript("def plot = new Plot ()\n" + "plot << new ConstantLine(x: 0.65)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getConstantLines()).isNotEmpty();
    Assertions.assertThat(plot.getConstantLines().get(0)).isNotNull();
  }

  @Test
  public void parsePlotWithTextScript_returnPlotObjectWithText() {
    //when
    Object result =
        parseClassFromScript("def plot = new Plot ()\n" + "plot << new Text(text: \"labelText \")");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getTexts()).isNotEmpty();
    Assertions.assertThat(plot.getTexts().get(0)).isNotNull();
  }

  @Test
  public void parsePlotWithCrosshairScript_returnPlotObjectWithCrosshair() {
    //when
    Object result =
        parseClassFromScript("def plot = new Plot(crosshair: new Crosshair(color: Color.BLUE))");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getCrosshair()).isNotNull();
  }

  @Test
  public void parsePlotWithLegendLayoutScript_returnPlotObjectWithLegendLayout() {
    //when
    Object result =
        parseClassFromScript("def pp = new Plot(legendLayout: LegendLayout.HORIZONTAL)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getLegendLayout()).isEqualTo(LegendLayout.HORIZONTAL);
  }

  @Test
  public void parsePlotWithLegendPositionScript_returnPlotObjectWithLegendPosition() {
    //when
    Object result = parseClassFromScript("def pp = new Plot(legendPosition: LegendPosition.TOP)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getLegendPosition()).isEqualTo(LegendPosition.TOP);
  }

  @Test
  public void parsePlotWithBaseOfAreaScript_returnPlotObjectWithBaseOfArea() {
    //when
    Object result =
        parseClassFromScript(
            "def plot = new Plot()\n"
                + "def y = [3, 5, 2, 3]\n"
                + "def x0 = [0, 1, 2, 3]\n"
                + "plot << new Area(x: x0, y: y, base: 1)");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(((Area) plot.getGraphics().get(0)).getBase().intValue()).isGreaterThan(0);
  }

  @Test
  public void parsePlotWithXYStackerScript_returnPlotObjectWithGraphics() {
    //when
    Object result =
        parseClassFromScript(
            "def y1 = [1,5,3,2,3]\n"
                + "def y2 = [7,2,4,1,3]\n"
                + "def p = new Plot()\n"
                + "def a1 = new Area(y: y1, displayName: 'y1')\n"
                + "def a2 = new Area(y: y2, displayName: 'y2')\n"
                + "p << XYStacker.stack([a1, a2])");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics()).isNotEmpty();
  }

  @Test
  public void parseCategoryPlotWithCategoryBarsScript_returnCategoryPlotObjectWithCategoryBars() {
    //when
    Object result =
        parseClassFromScript(
            "def bars = new CategoryBars(value: [[1, 2, 3], [1, 3, 5]])\n"
                + "new CategoryPlot() << bars");
    //then
    Assertions.assertThat(result instanceof CategoryPlot).isTrue();
    CategoryPlot categoryPlot = (CategoryPlot) result;
    Assertions.assertThat(categoryPlot.getCategoryGraphics()).isNotEmpty();
  }

  @Test
  public void
      parseCategoryPlotWithHorizontalOrientationScript_returnCategoryPlotObjectWithHorizontalOrientation() {
    //when
    Object result =
        parseClassFromScript(
            "def plot = new CategoryPlot(orientation: PlotOrientationType.HORIZONTAL)\n"
                + "plot << new CategoryBars(value:[[1, 2, 3], [1, 3, 5]])");
    //then
    Assertions.assertThat(result instanceof CategoryPlot).isTrue();
    CategoryPlot categoryPlot = (CategoryPlot) result;
    Assertions.assertThat(categoryPlot.getOrientation()).isEqualTo(PlotOrientationType.HORIZONTAL);
  }

  @Test
  public void parseCategoryPlotWithCategoryStemsScript_returnCategoryPlotObjectWithCategoryStems() {
    //when
    Object result =
        parseClassFromScript(
            "new CategoryPlot() << new CategoryStems(value: [[1, 2, 4], [4, 5, 8]])");
    //then
    Assertions.assertThat(result instanceof CategoryPlot).isTrue();
    CategoryPlot categoryPlot = (CategoryPlot) result;
    Assertions.assertThat(categoryPlot.getCategoryGraphics()).isNotEmpty();
  }

  @Test
  public void
      parseCategoryPlotWithCategoryPointsScript_returnCategoryPlotObjectWithCategoryPoints() {
    //when
    Object result =
        parseClassFromScript(
            "new CategoryPlot() << new CategoryPoints(value: [[1, 2, 4], [4, 5, 8]])");
    //then
    Assertions.assertThat(result instanceof CategoryPlot).isTrue();
    CategoryPlot categoryPlot = (CategoryPlot) result;
    Assertions.assertThat(categoryPlot.getCategoryGraphics()).isNotEmpty();
  }

  @Test
  public void parseCategoryPlotWithCategoryLinesScript_returnCategoryPlotObjectWithCategoryLines() {
    //when
    Object result =
        parseClassFromScript(
            "new CategoryPlot() << new CategoryLines(value: [[1, 2, 4], [4, 5, 8]])");
    //then
    Assertions.assertThat(result instanceof CategoryPlot).isTrue();
    CategoryPlot categoryPlot = (CategoryPlot) result;
    Assertions.assertThat(categoryPlot.getCategoryGraphics()).isNotEmpty();
  }

  @Test
  public void parseCategoryPlotWithYAxisScript_returnCategoryPlotObjectWithYAxis() {
    //when
    Object result =
        parseClassFromScript(
            "def p = new CategoryPlot()\n" + "p << new YAxis(label: \"Volume\", upperMargin: 1)");
    //then
    Assertions.assertThat(result instanceof CategoryPlot).isTrue();
    CategoryPlot categoryPlot = (CategoryPlot) result;
    Assertions.assertThat(categoryPlot.getYAxes()).isNotEmpty();
  }

  @Test
  public void parseCategoryBarsWithLabelPositionScript_returnCategoryBarsObjectWithLabelPosition() {
    //when
    Object result =
        parseClassFromScript(
            "def p = new CategoryPlot()\n"
                + "p << new CategoryBars(value: [[1500, 2200, 2500, 4000]], width: 0.6,\n"
                + "                      color: Color.PINK, yAxis: \"Volume\", showItemLabel: true,\n"
                + "                      labelPosition: LabelPositionType.VALUE_INSIDE)");
    //then
    Assertions.assertThat(result instanceof CategoryPlot).isTrue();
    CategoryPlot categoryPlot = (CategoryPlot) result;
    Assertions.assertThat(categoryPlot.getCategoryGraphics()).isNotEmpty();
    CategoryBars categoryBars = (CategoryBars) categoryPlot.getCategoryGraphics().get(0);
    Assertions.assertThat(categoryBars.getLabelPosition())
        .isEqualTo(LabelPositionType.VALUE_INSIDE);
  }

  @Test
  public void parseNanoPlotWithPointsScript_returnNanoPlotObjectWithPoints() {
    //when
    Object result =
        parseClassFromScript(
            "def today  = new Date()\n"
                + "def millis = today.time\n"
                + "def nanos  = millis * 1000 * 1000g // g makes it arbitrary precision\n"
                + "def np = new NanoPlot()\n"
                + "np << new Points(x:(0..10).collect{nanos + 7 * it}, y:(0..10))");
    //then
    Assertions.assertThat(result instanceof NanoPlot).isTrue();
    NanoPlot nanoPlot = (NanoPlot) result;
    Assertions.assertThat(nanoPlot.getGraphics()).isNotEmpty();
  }

  @Test
  public void parseSimpleTimePlotScript_returnSimpleTimePlotObjectWithData() {
    //when
    Object result =
        parseClassFromScript(
            "def rates = (1..10).collect{[\"y1\": 1 + it, \"y10\": 2 + it, \"time\" : 633733200000 + 10000*it]}\n"
                + "new SimpleTimePlot(rates, [\"y1\", \"y10\"],\n"
                + "                   yLabel: \"Price\", \n"
                + "                   displayNames: [\"1 Year\", \"10 Year\"])");
    //then
    Assertions.assertThat(result instanceof SimpleTimePlot).isTrue();
    SimpleTimePlot simpleTimePlot = (SimpleTimePlot) result;
    Assertions.assertThat(simpleTimePlot.getData()).isNotEmpty();
  }

  @Test
  public void parseCombinedPlotScript_returnCombinedPlotObjectWithSubplots() {
    //when
    Object result =
        parseClassFromScript(
            "def cplot = new CombinedPlot(xLabel: \"Linear\");\n"
                + "cplot.add(new Plot())\n"
                + "cplot.add(new Plot())\n"
                + "cplot");
    //then
    Assertions.assertThat(result instanceof CombinedPlot).isTrue();
    CombinedPlot combinedPlot = (CombinedPlot) result;
    Assertions.assertThat(combinedPlot.getSubplots()).isNotEmpty();
  }

  @Test
  public void parseTimePlotScript_returnTimePlotObject() {
    //when
    Object result =
        parseClassFromScript(
            "def today = new Date();\n"
                + "def millis = today.time;\n"
                + "def hour = 1000 * 60 * 60;\n"
                + "def plot = new TimePlot( timeZone: new SimpleTimeZone(10800000, \"America/New_York\"));\n"
                + "plot << new Points(x:(0..10).collect{millis + hour * it}, y:(0..10));");
    //then
    Assertions.assertThat(result instanceof TimePlot).isTrue();
    TimePlot timePlot = (TimePlot) result;
    Assertions.assertThat(timePlot.getGraphics()).isNotEmpty();
  }

  @Test
  public void parseHistogramScript_returnHistogramObject() {
    //when
    Object result =
        parseClassFromScript(
            "Random random = new Random();\n"
                + "data3 = [];\n"
                + "(1..10000).each { data3 << random.nextGaussian();}\n"
                + "new Histogram(data: data3, binCount: 25);");
    //then
    Assertions.assertThat(result instanceof Histogram).isTrue();
    Histogram histogram = (Histogram) result;
    Assertions.assertThat(histogram.getData()).isNotEmpty();
  }

  @Test
  public void parseHeatmapScript_returnHeatmapObject() {
    //when
    Object result =
        parseClassFromScript(
            "data4 = [[1, 2, 3], [3, 2, 1], [2, 2, 1]]\n" + "new HeatMap(data: data4)");
    //then
    Assertions.assertThat(result instanceof HeatMap).isTrue();
    HeatMap heatMap = (HeatMap) result;
    Assertions.assertThat(heatMap.getData()).isNotEmpty();
  }

  @Test
  public void parseHeatmapWithGradientColorScript_returnHeatmapObject() {
    //when
    Object result =
        parseClassFromScript(
            "data4 = [[1, 2, 3], [3, 2, 1], [2, 2, 1]]\n"
                + "new HeatMap(data: data4, color: GradientColor.GREEN_YELLOW_WHITE)");
    //then
    Assertions.assertThat(result instanceof HeatMap).isTrue();
    HeatMap heatMap = (HeatMap) result;
    Assertions.assertThat(heatMap.getData()).isNotEmpty();
  }

  @Test
  public void parseLodFilterScript_returnLineObjectWithLodFilter() {
    //when
    Object result =
        parseClassFromScript("new Plot() << new Line(y: (0..10), lodFilter: Filter.LINE); ");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics()).isNotEmpty();
  }

  @Test
  public void parseKeyboardCodesScript_returnLineObjectWithKeyTags() {
    //when
    Object result =
        parseClassFromScript(
            "line = new Line(y: (0..10))\n"
                + "line.onKey(KeyboardCodes.F1, \"tag1\")\n"
                + "new Plot() << line   ");
    //then
    Assertions.assertThat(result instanceof Plot).isTrue();
    Plot plot = (Plot) result;
    Assertions.assertThat(plot.getGraphics().get(0).getKeyTags()).isNotEmpty();
  }
}

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
import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.chart.xychart.plotitem.*;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class GroovyEvaluatorChartTest extends GroovyEvaluatorTest {

    @Test
    public void parsePlotWithTitleScript_returnPlotObjectWithTitle(){
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
        Object result = parseClassFromScript(
                "def plot = new Plot()\n" +
                "def ys = [0, 1, 6, 5, 2, 8]\n" +
                "plot << new Line(y: ys)");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getGraphics()).isNotEmpty();
        Assertions.assertThat(plot.getGraphics().get(0) instanceof Line).isTrue();
    }

    @Test
    public void parsePlotWithRedColorLineScript_returnPlotObjectWithRedLine()  {
        //when
        Object result = parseClassFromScript(
                "def plot = new Plot()\n" +
                "def ys = [0, 1, 6, 5, 2, 8]\n" +
                "plot << new Line(y: ys, color: Color.red)");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getGraphics()).isNotEmpty();
        Assertions.assertThat(plot.getGraphics().get(0).getColor()).isEqualTo(Color.RED);
    }

    @Test
    public void parsePlotWithStemsScript_returnPlotObjectWithStems() {
        //when
        Object result = parseClassFromScript(
                "def plot = new Plot();\n" +
                "def y1 = [1.5, 1, 6, 5, 2, 8]\n" +
                "plot << new Stems(y: y1)");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getGraphics()).isNotEmpty();
        Assertions.assertThat(plot.getGraphics().get(0) instanceof Stems).isTrue();
    }

    @Test
    public void parsePlotWithDashStyleStemsScript_returnPlotObjectWithDashStyleStems()  {
        //when
        Object result = parseClassFromScript(
                "def plot = new Plot();\n" +
                "def y1 = [1.5, 1, 6, 5, 2, 8]\n" +
                "plot << new Stems(y: y1, style: StrokeType.DASH)");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getGraphics()).isNotEmpty();
        Assertions.assertThat(((Stems)plot.getGraphics().get(0)).getStyle()).isEqualTo(StrokeType.DASH);
    }

    @Test
    public void parsePlotWithPointsScript_returnPlotObjectWithPoints() {
        //when
        Object result = parseClassFromScript(
                "def plot = new Plot();\n" +
                "def y1 = [6, 7, 12, 11, 8, 14]\n" +
                "plot << new Points(y: y1)");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getGraphics()).isNotEmpty();
        Assertions.assertThat(plot.getGraphics().get(0) instanceof Points).isTrue();
    }

    @Test
    public void parsePlotWithCircleShapePointsScript_returnPlotObjectWithCircleShapePoints()  {
        //when
        Object result = parseClassFromScript(
                "def plot = new Plot();\n" +
                "def y1 = [1.5, 1, 6, 5, 2, 8]\n" +
                "plot << new Points(y: y1, shape: ShapeType.CIRCLE)");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getGraphics()).isNotEmpty();
        Assertions.assertThat(((Points)plot.getGraphics().get(0)).getShape()).isEqualTo(ShapeType.CIRCLE);
    }

    @Test
    public void parsePlotWithAreaScript_returnPlotObjectWithArea() {
        //when
        Object result = parseClassFromScript(
                "def plot = new Plot()\n" +
                "def ys = [3, 5, 2, 3]\n" +
                "def xs = [0, 1, 2, 3]\n" +
                "plot << new Area(x: xs, y: ys)");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getGraphics()).isNotEmpty();
        Assertions.assertThat(plot.getGraphics().get(0) instanceof Area).isTrue();
    }

    @Test
    public void parsePlotWithBarsScript_returnPlotObjectWithBars() {
        //when
        Object result = parseClassFromScript(
                "def plot = new Plot()\n" +
                "plot << new Bars(x: (1..5), y: [3, 5, 2, 3, 7])");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getGraphics()).isNotEmpty();
        Assertions.assertThat(plot.getGraphics().get(0) instanceof Bars).isTrue();
    }

    @Test
    public void parsePlotWithConstantBandScript_returnPlotObjectWithConstantBand() {
        //when
        Object result = parseClassFromScript(
                "def plot = new Plot()\n" +
                "plot << new ConstantBand(x: [1, 2])");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getConstantBands()).isNotEmpty();
        Assertions.assertThat(plot.getConstantBands().get(0)).isNotNull();
    }

    @Test
    public void parsePlotWithConstantLineScript_returnPlotObjectWithConstantLine() {
        //when
        Object result = parseClassFromScript(
                "def plot = new Plot ()\n" +
                "plot << new ConstantLine(x: 0.65)");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getConstantLines()).isNotEmpty();
        Assertions.assertThat(plot.getConstantLines().get(0)).isNotNull();
    }

    @Test
    public void parsePlotWithTextScript_returnPlotObjectWithText() {
        //when
        Object result = parseClassFromScript(
                "def plot = new Plot ()\n" +
                "plot << new Text(text: \"labelText \")");
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getTexts()).isNotEmpty();
        Assertions.assertThat(plot.getTexts().get(0)).isNotNull();
    }

}

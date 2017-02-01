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

import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import groovy.lang.GroovyClassLoader;
import groovy.lang.Script;
import org.assertj.core.api.Assertions;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static com.twosigma.beaker.groovy.GroovyDefaultVariables.CLASS_PATH;
import static com.twosigma.beaker.groovy.GroovyDefaultVariables.IMPORTS;
import static com.twosigma.beaker.groovy.GroovyDefaultVariables.OUT_DIR;

public class GroovyEvaluatorTest {

    static GroovyClassLoader groovyClassLoader;

    @BeforeClass
    public static void initClassStubData() throws IOException {
        GroovyEvaluator groovyEvaluator = new GroovyEvaluator("123", "345");
        groovyEvaluator.setShellOptions(CLASS_PATH, IMPORTS, OUT_DIR);
        groovyClassLoader = groovyEvaluator.newEvaluator();
    }

    @Test
    public void parsePlotWithTitleScript_returnPlotObjectWithTitle() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass(
                "def plot = new Plot(title: \"Setting line properties\")");
        Script instance = (Script) parsedClass.newInstance();
        Object result = instance.run();
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getTitle()).isEqualTo("Setting line properties");
    }

    @Test
    public void parsePlotWithLineScript_returnPlotObjectWithLine() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass(
                "def plot = new Plot()\n" +
                "def ys = [0, 1, 6, 5, 2, 8]\n" +
                "def ys2 = [0, 2, 7, 6, 3, 8]\n" +
                "plot << new Line(y: ys, width: 10, color: Color.red)");
        Script instance = (Script) parsedClass.newInstance();
        Object result = instance.run();
        //then
        Assertions.assertThat(result instanceof Plot).isTrue();
        Plot plot = (Plot) result;
        Assertions.assertThat(plot.getGraphics()).isNotEmpty();
        Assertions.assertThat(plot.getGraphics().get(0) instanceof Line).isTrue();
    }
}

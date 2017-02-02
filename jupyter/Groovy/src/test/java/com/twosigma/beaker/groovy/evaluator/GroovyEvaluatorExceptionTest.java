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

import groovy.lang.GroovyRuntimeException;
import groovy.lang.MissingPropertyException;
import groovy.lang.Script;
import org.codehaus.groovy.control.MultipleCompilationErrorsException;
import org.codehaus.groovy.runtime.typehandling.GroovyCastException;
import org.junit.Test;

public class GroovyEvaluatorExceptionTest extends GroovyEvaluatorTest {

    @Test(expected = MultipleCompilationErrorsException.class)
    public void parseNotExistingClassScript_throwMultipleCompilationErrorsException() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass("def plot = new NotExistPlot()");
        Script instance = (Script) parsedClass.newInstance();
        instance.run();
    }

    @Test(expected = MissingPropertyException.class)
    public void parseNotExistingPropertyScript_throwMissingPropertyException() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass("def plot = new Plot() \n plot << line");
        Script instance = (Script) parsedClass.newInstance();
        instance.run();
    }

    @Test(expected = NullPointerException.class)
    public void parseNullObjectScript_throwNullPointerException() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass(
                "def plot = new Plot() \n" +
                "Line line = null \n " +
                "plot << line");
        Script instance = (Script) parsedClass.newInstance();
        instance.run();
    }

    @Test(expected = GroovyCastException.class)
    public void parseCastWrongClassScript_throwGroovyCastException() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass(
                "def plot = new Plot() \n" +
                "Line line = (Line) Plot ");
        Script instance = (Script) parsedClass.newInstance();
        instance.run();
    }

    @Test(expected = IllegalArgumentException.class)
    public void parseIllegalArgumentScript_throwIllegalArgumentException() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass(
                "def plot = new Plot() \n" +
                "plot.setYBound(Arrays.asList(1, 2, 3)) ");
        Script instance = (Script) parsedClass.newInstance();
        instance.run();
    }

    @Test(expected = NumberFormatException.class)
    public void parseWrongNumberFormatScript_throwNumberFormatException() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass(
                "def intval = Color.decode(\"FF00FF\"); ");
        Script instance = (Script) parsedClass.newInstance();
        instance.run();
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void parseIndexOutOfBoundsScript_throwIndexOutOfBoundsException() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass(
                "def arr = new ArrayList() \n" +
                "arr.get(5) ");
        Script instance = (Script) parsedClass.newInstance();
        instance.run();
    }

    @Test(expected = GroovyRuntimeException.class)
    public void parseNotExistingConstructorScript_throwGroovyRuntimeException() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass("def plot = new Plot(123)");
        Script instance = (Script) parsedClass.newInstance();
        instance.run();
    }

    @Test(expected = ArithmeticException.class)
    public void parseDivisionByZeroScript_throwArithmeticException() throws IllegalAccessException, InstantiationException {
        //when
        Class<?> parsedClass = groovyClassLoader.parseClass("1/0 ");
        Script instance = (Script) parsedClass.newInstance();
        instance.run();
    }

}

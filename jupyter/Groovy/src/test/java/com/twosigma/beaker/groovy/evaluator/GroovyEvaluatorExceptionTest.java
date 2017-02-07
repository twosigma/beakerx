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
import org.codehaus.groovy.control.MultipleCompilationErrorsException;
import org.codehaus.groovy.runtime.typehandling.GroovyCastException;
import org.junit.Test;

public class GroovyEvaluatorExceptionTest extends GroovyEvaluatorTest {

    @Test(expected = MultipleCompilationErrorsException.class)
    public void parseNotExistingClassScript_throwMultipleCompilationErrorsException() {
        //when
        parseClassFromScript("def plot = new NotExistPlot()");
    }

    @Test(expected = MissingPropertyException.class)
    public void parseNotExistingPropertyScript_throwMissingPropertyException() {
        //when
        parseClassFromScript(
                "def plot = new Plot() \n " +
                "plot << line");
    }

    @Test(expected = NullPointerException.class)
    public void parseNullObjectScript_throwNullPointerException() {
        //when
        parseClassFromScript(
                "def plot = new Plot() \n" +
                "Line line = null \n " +
                "plot << line");
    }

    @Test(expected = GroovyCastException.class)
    public void parseCastWrongClassScript_throwGroovyCastException() {
        //when
        parseClassFromScript(
                "def plot = new Plot() \n" +
                "Line line = (Line) Plot ");
    }

    @Test(expected = IllegalArgumentException.class)
    public void parseIllegalArgumentScript_throwIllegalArgumentException() {
        //when
        parseClassFromScript(
                "def plot = new Plot() \n" +
                "plot.setYBound(Arrays.asList(1, 2, 3)) ");
    }

    @Test(expected = NumberFormatException.class)
    public void parseWrongNumberFormatScript_throwNumberFormatException() {
        //when
        parseClassFromScript("def intval = Color.decode(\"FF00FF\"); ");
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void parseIndexOutOfBoundsScript_throwIndexOutOfBoundsException() {
        //when
        parseClassFromScript(
                "def arr = new ArrayList() \n" +
                "arr.get(5) ");
    }

    @Test(expected = GroovyRuntimeException.class)
    public void parseNotExistingConstructorScript_throwGroovyRuntimeException() {
        //when
        parseClassFromScript("def plot = new Plot(123)");
    }

    @Test(expected = ArithmeticException.class)
    public void parseDivisionByZeroScript_throwArithmeticException() {
        //when
        parseClassFromScript("1/0 ");
    }

}

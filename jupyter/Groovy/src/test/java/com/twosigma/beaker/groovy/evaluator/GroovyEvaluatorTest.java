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

import groovy.lang.GroovyClassLoader;
import groovy.lang.Script;
import org.junit.BeforeClass;
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

    public Object parseClassFromScript(String script){
        Class<?> parsedClass = groovyClassLoader.parseClass(script);
        Script instance = null;
        try {
            instance = (Script) parsedClass.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return instance.run();
    }
}

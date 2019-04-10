/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import groovy.lang.Script;
import org.codehaus.groovy.runtime.StackTraceUtils;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.util.concurrent.Callable;

import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;
import static com.twosigma.beakerx.groovy.evaluator.GroovyStackTracePrettyPrinter.printStacktrace;

class GroovyCodeRunner implements Callable<TryResult> {

  public static final String SCRIPT_NAME = "script";
  private GroovyEvaluator groovyEvaluator;
  private final String theCode;
  private final SimpleEvaluationObject theOutput;

  public GroovyCodeRunner(GroovyEvaluator groovyEvaluator, String code, SimpleEvaluationObject out) {
    this.groovyEvaluator = groovyEvaluator;
    theCode = code;
    theOutput = out;
  }

  @Override
  public TryResult call() {
    TryResult either;
    String scriptName = SCRIPT_NAME;
    try {
      Object result = null;
      theOutput.setOutputHandler();
      scriptName += System.currentTimeMillis();
      Class<?> parsedClass = groovyEvaluator.getGroovyClassLoader().parseClass(theCode, scriptName);
      if (canBeInstantiated(parsedClass)) {
        Object instance = parsedClass.newInstance();
        if (instance instanceof Script) {
          result = runScript((Script) instance);
        }
      }
      either = TryResult.createResult(result);
    } catch (Throwable e) {
      either = handleError(scriptName, e);
    } finally {
      theOutput.clrOutputHandler();
    }
    return either;
  }

  private TryResult handleError(String scriptName, Throwable e) {
    TryResult either;
    if (e instanceof InvocationTargetException) {
      e = ((InvocationTargetException) e).getTargetException();
    }

    if (e instanceof InterruptedException || e instanceof InvocationTargetException || e instanceof ThreadDeath) {
      either = TryResult.createError(INTERUPTED_MSG);
    } else {
      StringWriter sw = new StringWriter();
      PrintWriter pw = new PrintWriter(sw);
      StackTraceUtils.sanitize(e).printStackTrace(pw);
      String value = sw.toString();
      value = printStacktrace(scriptName, value);
      either = TryResult.createError(value);
    }
    return either;
  }

  private Object runScript(Script script) {
    groovyEvaluator.getScriptBinding().setVariable(Evaluator.BEAKER_VARIABLE_NAME, groovyEvaluator.getBeakerX());
    script.setBinding(groovyEvaluator.getScriptBinding());
    return script.run();
  }

  private boolean canBeInstantiated(Class<?> parsedClass) {
    return !parsedClass.isEnum();
  }

}

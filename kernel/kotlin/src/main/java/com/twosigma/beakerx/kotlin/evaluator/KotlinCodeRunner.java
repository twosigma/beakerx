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
package com.twosigma.beakerx.kotlin.evaluator;

import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.jetbrains.kotlin.cli.common.repl.ReplEvalResult;
import org.jetbrains.kotlin.cli.jvm.repl.ReplInterpreter;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;

class KotlinCodeRunner implements Runnable {

  private final SimpleEvaluationObject theOutput;
  private final ClassLoader loader;
  private final ReplInterpreter repl;
  private final String codeToBeExecuted;

  public KotlinCodeRunner(SimpleEvaluationObject out, ClassLoader ld, ReplInterpreter repl, String codeToBeExecuted) {
    this.theOutput = checkNotNull(out);
    this.loader = checkNotNull(ld);
    this.repl = checkNotNull(repl);
    this.codeToBeExecuted = codeToBeExecuted;
  }

  @Override
  public void run() {
    ClassLoader oldld = Thread.currentThread().getContextClassLoader();
    Thread.currentThread().setContextClassLoader(loader);
    InternalVariable.setValue(theOutput);
    try {
      theOutput.setOutputHandler();
      InternalVariable.setValue(theOutput);
      ReplEvalResult eval = repl.eval(this.codeToBeExecuted);
      interpretResult(eval);
    } catch (Throwable e) {
      if (e instanceof InvocationTargetException)
        e = ((InvocationTargetException) e).getTargetException();
      if ((e instanceof InterruptedException) || (e instanceof ThreadDeath)) {
        theOutput.error(INTERUPTED_MSG);
      } else {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        theOutput.error(sw.toString());
      }
    } finally {
      theOutput.executeCodeCallback();
      theOutput.clrOutputHandler();
      Thread.currentThread().setContextClassLoader(oldld);
    }
  }

  private void interpretResult(Object o) {
    if (o == null) {
      theOutput.finished(null);
    } else if (o instanceof ReplEvalResult.UnitResult) {
      theOutput.finished(null);
    } else if (o instanceof ReplEvalResult.ValueResult) {
      theOutput.finished(((ReplEvalResult.ValueResult) o).getValue());
    } else if (o instanceof ReplEvalResult.Error) {
      theOutput.error(((ReplEvalResult.Error) o).getMessage());
    } else {
      theOutput.error(o);
    }
  }
}

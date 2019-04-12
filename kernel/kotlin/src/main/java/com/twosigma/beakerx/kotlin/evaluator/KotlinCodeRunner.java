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

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.jetbrains.kotlin.cli.common.repl.ReplEvalResult;
import org.jetbrains.kotlin.cli.jvm.repl.ReplInterpreter;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.util.concurrent.Callable;

import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;
import static com.twosigma.beakerx.util.Preconditions.checkNotNull;

class KotlinCodeRunner implements Callable<TryResult> {

  private final SimpleEvaluationObject theOutput;
  private final ReplInterpreter repl;
  private final String codeToBeExecuted;

  public KotlinCodeRunner(SimpleEvaluationObject out, ReplInterpreter repl, String codeToBeExecuted) {
    this.theOutput = checkNotNull(out);
    this.repl = checkNotNull(repl);
    this.codeToBeExecuted = codeToBeExecuted;
  }

  @Override
  public TryResult call() throws Exception {
    TryResult either;
    try {
      theOutput.setOutputHandler();
      ReplEvalResult eval = repl.eval(this.codeToBeExecuted);
      either = interpretResult(eval);
    } catch (Throwable e) {
      if (e instanceof InvocationTargetException)
        e = ((InvocationTargetException) e).getTargetException();
      if ((e instanceof InterruptedException) || (e instanceof ThreadDeath)) {
        either = TryResult.createError(INTERUPTED_MSG);
      } else {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        either = TryResult.createError(sw.toString());
      }
    } finally {
      theOutput.clrOutputHandler();
    }
    return either;
  }

  private TryResult interpretResult(Object o) {
    TryResult either;
    if (o == null) {
      either = TryResult.createResult(null);
    } else if (o instanceof ReplEvalResult.UnitResult) {
      either = TryResult.createResult(null);
    } else if (o instanceof ReplEvalResult.ValueResult) {
      Object value = ((ReplEvalResult.ValueResult) o).getValue();
      either = TryResult.createResult(value);
    } else if (o instanceof ReplEvalResult.Error) {
      String message = ((ReplEvalResult.Error) o).getMessage();
      either = TryResult.createError(message);
    } else {
      either = TryResult.createError(o.toString());
    }
    return either;
  }
}

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
package com.twosigma.beakerx.scala.evaluator;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.util.concurrent.Callable;

import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;

class ScalaCodeRunner implements Callable<TryResult> {

  private ScalaEvaluator scalaEvaluator;
  private final String theCode;
  private final SimpleEvaluationObject theOutput;

  public ScalaCodeRunner(ScalaEvaluator scalaEvaluator, String code, SimpleEvaluationObject out) {
    this.scalaEvaluator = scalaEvaluator;
    this.theCode = code;
    this.theOutput = out;
  }

  @Override
  public TryResult call() throws Exception {
    TryResult either;
    try {
      theOutput.setOutputHandler();
      either = scalaEvaluator.getShell().evaluate(theOutput, theCode);
    } catch (Throwable e) {
      if (e instanceof InterruptedException || e instanceof InvocationTargetException || e instanceof ThreadDeath) {
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

}

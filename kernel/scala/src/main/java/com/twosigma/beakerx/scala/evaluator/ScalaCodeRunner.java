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

import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;

class ScalaCodeRunner implements Runnable {

  private ScalaEvaluator scalaEvaluator;
  private final String theCode;
  private final SimpleEvaluationObject theOutput;

  public ScalaCodeRunner(ScalaEvaluator scalaEvaluator, String code, SimpleEvaluationObject out) {
    this.scalaEvaluator = scalaEvaluator;
    this.theCode = code;
    this.theOutput = out;
  }

  @Override
  public void run() {
    theOutput.setOutputHandler();
    try {
      InternalVariable.setValue(theOutput);
      scalaEvaluator.getShell().evaluate(theOutput, theCode);
    } catch (Throwable e) {
      if (e instanceof InterruptedException || e instanceof InvocationTargetException || e instanceof ThreadDeath) {
        theOutput.error("... cancelled!");
      } else {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        theOutput.error(sw.toString());
      }
    }
    theOutput.setOutputHandler();
  }

}

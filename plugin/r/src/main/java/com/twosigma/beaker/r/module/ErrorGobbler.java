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
package com.twosigma.beaker.r.module;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;

/**
 * ErrorGobbler that takes a stream from a evaluator process and write to outputLog
 */
public class ErrorGobbler extends Thread {

  private final InputStream inputStream;
  private boolean expectingExtraLine;
  private SimpleEvaluationObject dest;
  
  public ErrorGobbler(InputStream is) {
    inputStream = is;
    expectingExtraLine = false;
  }

  // R has a very weird behavior: when a session process is
  // interrupted the master issues an empty line to stderr.  No idea
  // why or how to stop it, seems like a bug.  Use this to hide it.
  public void expectExtraLine() {
    expectingExtraLine = true;
  }

  public void reset(SimpleEvaluationObject dest) {
    this.dest = dest;
  }

  @Override
  public void run() {
    try {
      InputStreamReader isr = new InputStreamReader(inputStream, "UTF-8");
      BufferedReader br = new BufferedReader(isr);
      String line = null;
      while ((line = br.readLine()) != null) {
        if (expectingExtraLine && line.length() == 0) {
          expectingExtraLine = false;
          continue;
        }
        if (this.dest != null)
          this.dest.appendError(line+"\n");
        else
          System.err.println(line);
      }
    } catch (IOException ioe) {
      ioe.printStackTrace();
    }
  }
}

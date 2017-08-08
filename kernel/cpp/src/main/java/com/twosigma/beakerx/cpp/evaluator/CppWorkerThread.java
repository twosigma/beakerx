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
package com.twosigma.beakerx.cpp.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.WorkerThread;

class CppWorkerThread extends WorkerThread {

  private CppEvaluator cppEvaluator;
  private CppCodeRunner cppCodeRunner;
  protected boolean exit;

  public CppWorkerThread(CppEvaluator cppEvaluator) {
    super("cpp worker");
    this.cppEvaluator = cppEvaluator;
    exit = false;
  }
  /*
   * This thread performs all the evaluation
   */

  public void run() {
    JobDescriptor j = null;
    NamespaceClient nc = null;


    while (!exit) {
      try {
        // wait for work
        syncObject.acquire();

        // get next job descriptor
        j = jobQueue.poll();
        if (j == null)
          continue;

        j.outputObject.started();

        nc = NamespaceClient.getBeaker(cppEvaluator.getSessionId());
        nc.setOutputObj(j.outputObject);

        // normalize and analyze code
        String code = normalizeCode(j.codeToBeExecuted);

        cppCodeRunner = new CppCodeRunner(cppEvaluator, j.outputObject, code, j.cellId);
        if (!cppEvaluator.executeTask(cppCodeRunner)) {
          j.outputObject.error("... cancelled!");
        }
        if (nc != null) {
          nc.setOutputObj(null);
          nc = null;
        }
        j = null;
      } catch (Throwable e) {
        e.printStackTrace();
      } finally {
        if (nc != null) {
          nc.setOutputObj(null);
          nc = null;
        }
      }
    }
    NamespaceClient.delBeaker(cppEvaluator.getSessionId());
  }

  /*
   * This function does:
   * 1) remove comments
   * 2) ensure we have a cr after each ';' (if not inside double quotes or single quotes)
   * 3) remove empty lines
   */

  protected String normalizeCode(String code) {
    String c1 = code.replaceAll("\r\n", "\n").replaceAll("(?:/\\*(?:[^*]|(?:\\*+[^*/]))*\\*+/)|(?://.*)", "");
    StringBuilder c2 = new StringBuilder();
    boolean indq = false;
    boolean insq = false;
    for (int i = 0; i < c1.length(); i++) {
      char c = c1.charAt(i);
      switch (c) {
        case '"':
          if (!insq && i > 0 && c1.charAt(i - 1) != '\\')
            indq = !indq;
          break;
        case '\'':
          if (!indq && i > 0 && c1.charAt(i - 1) != '\\')
            insq = !insq;
          break;
        case ';':
          if (!indq && !insq) {
            c2.append(c);
            c = '\n';
          }
          break;
      }
      c2.append(c);
    }
    return c2.toString().replaceAll("\n\n+", "\n").trim();
  }

  public void cancelExecution() {
    if (cppCodeRunner != null) {
      cppCodeRunner.cancelExecution();
    }
  }

  public void doExit() {
    this.exit = true;
  }
}

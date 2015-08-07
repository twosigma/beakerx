/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.cpp.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;

/**
 * CellGobbler
 * takes a stream from a evaluator process and writes to cell output
 */
public class CellGobbler extends Thread {

  private static volatile boolean shutdownInprogress = false;

  private final InputStream is;
  private final String type;
  private final SimpleEvaluationObject output;

  private boolean isStillWaiting;

  public CellGobbler(
      InputStream is,
      String type,
      SimpleEvaluationObject output) {
    this.is = is;
    this.type = type;
    this.output = output;
  }

  public static void shuttingDown() {
    CellGobbler.shutdownInprogress = true;
  }

  @Override
  public void run() {
    try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
      String line = null;
      while ((line = br.readLine()) != null) {
        if (this.type.equals("stderr")) {
          output.appendError(line + "\n");
        } else {
          output.appendOutput(line + "\n");
        }
      }
    } catch (Exception ioe) {
      ioe.printStackTrace();
      if (!CellGobbler.shutdownInprogress) {
        ioe.printStackTrace();
      }
    }
  }
}

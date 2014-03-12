/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
package com.twosigma.beaker.core.rest;

import com.twosigma.beaker.shared.cometd.OutputLogService;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

/**
 * StreamGobbler
 * takes a stream from a evaluator process and write to outputLog
 */
// Every time we use this, we make two of them one for std err and
// one for stdout.  That should be abstracted XXX.
public class StreamGobbler extends Thread {

  private static boolean shutdown_inprogress = false;
  private final InputStream is;
  private final String type;
  private final String plugin;
  private final boolean record;
  private final String waitfor;
  private final OutputLogService outputLogService;
  private boolean isStillWaiting;

  public StreamGobbler(OutputLogService outputLogService,
      InputStream is, String plugin, String type,
      boolean record, String waitfor) {
    this.is = is;
    this.type = type;
    this.record = record;
    this.plugin = plugin;
    this.waitfor = waitfor;
    this.outputLogService = outputLogService;
    this.isStillWaiting = this.waitfor != null;
  }

  public static void shuttingDown() {
    shutdown_inprogress = true;
  }

  @Override
  public void run() {
    try {
      PrintWriter pw = null;

      InputStreamReader isr = new InputStreamReader(is);
      BufferedReader br = new BufferedReader(isr);
      String line = null;
      while ((line = br.readLine()) != null) {
        if (pw != null) {
          pw.println(line);
        }
        if (this.plugin != null) {
          System.out.println(this.plugin + "-" + this.type + ">" + line);
        } else {
          if (this.type.equals("stderr")) {
            System.err.println(line);
          } else {
            System.out.println(line);
          }
        }
        if (this.record && !this.isStillWaiting) {
          OutputLogService.OutputLine outputLine =
                  new OutputLogService.OutputLine(this.plugin, this.type, line);
          if (this.outputLogService != null) {
            this.outputLogService.serverPut(outputLine);
          }
        }
        if (this.isStillWaiting && line.indexOf(this.waitfor) > 0) {
          this.isStillWaiting = false;
          System.out.println(this.plugin + "-" + this.type + " waiting over");
        }
      }
      if (pw != null) {
        pw.flush();
      }
    } catch (IOException ioe) {
      if (!StreamGobbler.shutdown_inprogress) {
        ioe.printStackTrace();
      }
    }
  }
}

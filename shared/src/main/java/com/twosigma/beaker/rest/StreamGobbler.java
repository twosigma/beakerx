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
package com.twosigma.beaker.rest;

import com.twosigma.beaker.cometd.OutputLogService;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

/**
 * StreamGobbler that takes a stream from a evaluator process and write to outputLog
 *
 * @author alee
 */
// Every time we use this, we make two of them one for std err and
// one for stdout.  That should be abstracted XXX.
public class StreamGobbler extends Thread {

  private static boolean shutdown_inprogress = false;
  InputStream is;
  String type;
  String plugin;
  boolean record;
  String waitfor;
  OutputLogService _outputLogService;

  public StreamGobbler(OutputLogService outputLogService,
          InputStream is, String plugin, String type,
          boolean record, String waitfor) {
    _outputLogService = outputLogService;
    this.is = is;
    this.type = type;
    this.record = record;
    this.plugin = plugin;
    this.waitfor = waitfor;
  }

  public static void shuttingDown() {
    shutdown_inprogress = true;
  }

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
        if (plugin != null) {
          System.out.println(plugin + "-" + type + ">" + line);
        } else {
          if (type.equals("stderr")) {
            System.err.println(line);
          } else {
            System.out.println(line);
          }
        }
        if (record && null == waitfor) {
          OutputLogService.OutputLine outputLine =
                  new OutputLogService.OutputLine(plugin, type, line);
          if (_outputLogService != null) {
            _outputLogService.serverPut(outputLine);
          }
        }
        if (waitfor != null && line.indexOf(waitfor) > 0) {
          waitfor = null;
          System.out.println(plugin + "-" + type + " waiting over");
        }
      }
      if (pw != null) {
        pw.flush();
      }
    } catch (IOException ioe) {
      if (!shutdown_inprogress) {
        ioe.printStackTrace();
      }
    }
  }
}

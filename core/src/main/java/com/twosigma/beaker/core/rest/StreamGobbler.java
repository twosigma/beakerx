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
package com.twosigma.beaker.core.rest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

/**
 * StreamGobbler
 * takes a stream from a evaluator process and write to outputLog
 */
public class StreamGobbler extends Thread {

  private static volatile boolean shutdownInprogress = false;

  private final InputStream is;
  private final String type;
  private final String name;
  private final String waitfor;
  private final OutputLogService outputLogService;

  private boolean isStillWaiting;

  public StreamGobbler(
      InputStream is,
      String type,
      String name,
      OutputLogService outputLogService,
      String waitfor) {
    this.is = is;
    this.type = type;
    this.name = name;
    this.waitfor = waitfor;
    this.outputLogService = outputLogService;
    this.isStillWaiting = this.waitfor != null;
  }

  public StreamGobbler(
      InputStream is,
      String type,
      String plugin,
      OutputLogService outputLogService) {
    this(is, type, plugin, outputLogService, null);
  }

  public StreamGobbler(InputStream is, String type, String plugin) {
    this(is, type, plugin, null, null);
  }

  public StreamGobbler(InputStream is, String type) {
    this(is, type, null, null, null);
  }

  public static void shuttingDown() {
    StreamGobbler.shutdownInprogress = true;
  }

  @Override
  public void run() {
    try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
      PrintWriter pw = null;
      String line = null;
      while ((line = br.readLine()) != null) {
        if (pw != null) {
          pw.println(line);
        }

        if (this.name != null) {
          System.out.println(this.name + "-" + this.type + ">" + line);
        } else {
          if (this.type.equals("stderr")) {
            System.err.println(line);
          } else {
            System.out.println(line);
          }
        }

        if (this.outputLogService != null) {
          if (this.isStillWaiting) {
            if (line.indexOf(this.waitfor) > 0) {
              System.out.println(this.name + "-" + this.type + " waiting over");
              this.isStillWaiting = false;
            }
          } else {
            OutputLogService.OutputLine outputLine =
                new OutputLogService.OutputLine(this.name, this.type, line);
            this.outputLogService.serverPut(outputLine);
          }
        }
      }

      if (pw != null) {
        pw.flush();
      }

    } catch (IOException ioe) {
      if (!StreamGobbler.shutdownInprogress) {
        ioe.printStackTrace();
      }
    }
  }
}

/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.widget;

public class OutputManager {

  private static Output output;
  private static Output stderr;
  private static Output stdout;

  public static void setOutput(Output out) {
    output = out;
  }

  public static void setStderr(Output out) {
    stderr = out;
  }

  public static void setStdout(Output out) {
    stdout = out;
  }

  public static void clearStderr() {
    if (stderr != null) {
      stderr.clearOutput();
    }
  }

  public static void clearStdout() {
    if (stdout != null) {
      stdout.clearOutput();
    }
  }

  public static void clearOutput() {
    if (output != null) {
      output.clearOutput();
    }
  }

  public static void clear() {
    clearOutput();
    clearStdout();
    clearStderr();
  }

  public static boolean sendStdout(String s) {
    if (output != null || stdout != null) {
      if (output != null) {
        output.sendStdout(s);
      }
      if (stdout != null) {
        stdout.sendStdout(s);
      }
      return true;
    }
    return false;
  }

  public static boolean sendStderr(String s) {
    if (output != null || stderr != null) {
      if (output != null) {
        output.sendStderr(s);
      }
      if (stderr != null) {
        stderr.sendStderr(s);
      }
      return true;
    }
    return false;
  }
}

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
package com.twosigma.beakerx.jvm.threads;

import com.twosigma.beakerx.widget.OutputManager;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

public class BeakerStdOutErrHandler {

  private static BeakerStdOutErrHandler instance;

  private PrintStream orig_out;
  private PrintStream orig_err;
  private BeakerOutputHandler out_handler;
  private BeakerOutputHandler err_handler;

  static synchronized public void init() {
    if (instance == null) {
      instance = new BeakerStdOutErrHandler();
      instance.theinit();
    }
  }

  static synchronized public void fini() {
    if (instance != null) {
      instance.thefini();
      instance = null;
    }
  }

  static synchronized public void setOutputHandler(BeakerOutputHandler out, BeakerOutputHandler err) {
    if (instance != null) {
      instance.theSetOutputHandler(out, err);
    }
  }

  static synchronized public void clrOutputHandler() {
    if (instance != null)
      instance.theClrOutputHandler();
  }

  private void theinit() {
    orig_out = System.out;
    orig_err = System.err;
    try {
      System.setOut(new PrintStream(new MyOutputStream(true), false, StandardCharsets.UTF_8.name()));
      System.setErr(new PrintStream(new MyOutputStream(false), false, StandardCharsets.UTF_8.name()));
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException(e);
    }
  }

  private void thefini() {
    System.setOut(orig_out);
    System.setErr(orig_err);
  }

  private synchronized void theSetOutputHandler(BeakerOutputHandler out, BeakerOutputHandler err) {
    out_handler = out;
    err_handler = err;
  }

  private synchronized void theClrOutputHandler() {
    out_handler = null;
    err_handler = null;
  }

  private synchronized void writeStdout(String text) throws IOException {
    boolean sendStdout = OutputManager.sendStdout(text);
    if (!sendStdout) {
      if (out_handler != null) {
        out_handler.write(text);
      } else {
        orig_out.write(text.getBytes(StandardCharsets.UTF_8));
      }
    }
  }

  private synchronized void writeStderr(String text) throws IOException {
    boolean sendStderr = OutputManager.sendStderr(text);
    if (!sendStderr) {
      if (err_handler != null) {
        err_handler.write(text);
      } else {
        orig_err.write(text.getBytes(StandardCharsets.UTF_8));
      }
    }
  }


  private class MyOutputStream extends OutputStream {

    private boolean is_out;

    public MyOutputStream(boolean isout) {
      is_out = isout;
    }

    @Override
    public void write(int b) throws IOException {
      byte[] ba = new byte[1];
      ba[0] = (byte) b;
      String s = new String(ba, StandardCharsets.UTF_8);
      write(s);
    }

    @Override
    public void write(byte[] b) throws IOException {
      String s = new String(b, StandardCharsets.UTF_8);
      write(s);
    }

    @Override
    public void write(byte[] b, int off, int len) throws IOException {
      String s = new String(b, off, len, StandardCharsets.UTF_8);
      write(s);
    }

    private void write(String s) throws IOException {
      if (is_out) {
        instance.writeStdout(s);
      } else {
        instance.writeStderr(s);
      }
    }
  }

}

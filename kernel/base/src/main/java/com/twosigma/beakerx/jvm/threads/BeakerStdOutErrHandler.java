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
    if (instance != null)
      instance.theSetOutputHandler(out, err);
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

  private BeakerOutputHandler getHandler(boolean out) {
    if (out_handler != null && err_handler != null) {
      if (out) {
        return out_handler;
      } else {
        return err_handler;
      }
    }
    return null;
  }

  private synchronized void write(boolean isout, int b) throws IOException {
    BeakerOutputHandler hdl = getHandler(isout);
    if (hdl != null) {
      hdl.write(b);
    } else if (isout) {
      orig_out.write(b);
    } else {
      orig_err.write(b);
    }
  }

  private synchronized void write(boolean isout, byte[] b) throws IOException {
    BeakerOutputHandler hdl = getHandler(isout);
    if (hdl != null) hdl.write(b);
    else if (isout)
      orig_out.write(b);
    else
      orig_err.write(b);
  }

  private synchronized void write(boolean isout, byte[] b, int off, int len) throws IOException {
    BeakerOutputHandler hdl = getHandler(isout);
    if (hdl != null) {
      hdl.write(b, off, len);
    } else if (isout) {
      orig_out.write(b, off, len);
    } else {
      orig_err.write(b, off, len);
    }
  }

  private class MyOutputStream extends OutputStream {
    private boolean is_out;

    public MyOutputStream(boolean isout) {
      is_out = isout;
    }

    @Override
    public void write(int b) throws IOException {
      instance.write(is_out, b);
    }

    @Override
    public void write(byte[] b) throws IOException {
      instance.write(is_out, b);
    }

    @Override
    public void write(byte[] b, int off, int len) throws IOException {
      instance.write(is_out, b, off, len);
    }
  }

}

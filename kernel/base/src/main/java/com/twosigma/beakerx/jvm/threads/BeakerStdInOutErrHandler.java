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
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ConcurrentHashMap;

public class BeakerStdInOutErrHandler {

  private static BeakerStdInOutErrHandler instance;
  private ConcurrentHashMap<ThreadGroup, BeakerOutputHandlers> handlers = new ConcurrentHashMap<>();
  private PrintStream orig_out;
  private PrintStream orig_err;
  private InputStream orig_in;

  private BeakerStdInOutErrHandler() {
  }

  static synchronized public void init() {
    if (instance == null) {
      instance = new BeakerStdInOutErrHandler();
      instance.theinit();
    }
  }

  static synchronized public void fini() {
    if (instance != null) {
      instance.thefini();
      instance = null;
    }
  }

  static synchronized public void setOutputHandler(BeakerOutputHandler out, BeakerOutputHandler err, BeakerInputHandler stdin) {
    if (instance != null) {
      instance.theSetOutputHandler(out, err, stdin, Thread.currentThread().getThreadGroup());
    }
  }

  static synchronized public void clrOutputHandler() {
    if (instance != null)
      instance.theClrOutputHandler();
  }

  private void theinit() {
    orig_out = System.out;
    orig_err = System.err;
    orig_in = System.in;
    try {
      System.setOut(new PrintStream(new ProxyOutputStream(true), false, StandardCharsets.UTF_8.name()));
      System.setErr(new PrintStream(new ProxyOutputStream(false), false, StandardCharsets.UTF_8.name()));
      System.setIn(new ProxyInputStream());
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException(e);
    }
  }

  private void thefini() {
    System.setOut(orig_out);
    System.setErr(orig_err);
    System.setIn(orig_in);
  }


  private synchronized void theSetOutputHandler(BeakerOutputHandler out, BeakerOutputHandler err, BeakerInputHandler stdin, ThreadGroup threadGroup) {
    removeGroupsWithAllNoAliveThreads();
    handlers.put(threadGroup, new BeakerOutputHandlers(out, err, stdin));
  }

  private synchronized void removeGroupsWithAllNoAliveThreads() {
    handlers.entrySet().stream()
            .filter(x -> x.getKey().activeCount() == 0)
            .forEach(y -> {
              BeakerOutputHandlers hrs = handlers.get(y.getKey());
              hrs.out_handler = null;
              hrs.err_handler = null;
              handlers.remove(y.getKey());
            });
  }

  private synchronized void theClrOutputHandler() {
    removeGroupsWithAllNoAliveThreads();
  }

  private synchronized void writeStdout(String text) throws IOException {
    boolean sendStdout = OutputManager.sendStdout(text);
    if (!sendStdout) {
      BeakerOutputHandlers hrs = handlers.get(Thread.currentThread().getThreadGroup());
      if (hrs != null && hrs.out_handler != null) {
        hrs.out_handler.write(text);
      } else {
        orig_out.write(text.getBytes(StandardCharsets.UTF_8));
      }
    }
  }

  private synchronized void writeStderr(String text) throws IOException {
    boolean sendStderr = OutputManager.sendStderr(text);
    if (!sendStderr) {
      BeakerOutputHandlers hrs = handlers.get(Thread.currentThread().getThreadGroup());
      if (hrs != null && hrs.err_handler != null) {
        hrs.err_handler.write(text);
      } else {
        orig_err.write(text.getBytes(StandardCharsets.UTF_8));
      }
    }
  }

  private class ProxyInputStream extends InputStream {
    @Override
    public int read() throws IOException {
      return instance.readStdin();
    }
  }

  private int readStdin() {
    BeakerOutputHandlers hrs = handlers.get(Thread.currentThread().getThreadGroup());
    if (hrs != null && hrs.stdin_handler != null) {
      return hrs.stdin_handler.read();
    }
    return 0;
  }


  private class ProxyOutputStream extends OutputStream {

    private boolean is_out;

    public ProxyOutputStream(boolean isout) {
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

  static class BeakerOutputHandlers {
    BeakerOutputHandler out_handler;
    BeakerOutputHandler err_handler;
    BeakerInputHandler stdin_handler;

    BeakerOutputHandlers(BeakerOutputHandler out, BeakerOutputHandler err, BeakerInputHandler stdin) {
      out_handler = out;
      err_handler = err;
      stdin_handler = stdin;
    }
  }

}

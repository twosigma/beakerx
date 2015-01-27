package com.twosigma.beaker.jvm.threads;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.HashMap;
import java.util.Map;

public class BeakerStdOutErrHandler {
  private static BeakerStdOutErrHandler instance;
  
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

  static synchronized public void setDefaultOutputHandler(BeakerOutputHandler out, BeakerOutputHandler err) {
    if (instance != null)
      instance.theSetDefaultOutputHandler(out, err);
  }

  static synchronized public void clrOutputHandler() {
    if (instance != null)
      instance.theClrOutputHandler();
  }
  
  static synchronized public PrintStream out() {
    if (instance != null && instance.orig_out!=null)
      return instance.orig_out;
    return System.out;
  }

  static synchronized public PrintStream err() {
    if (instance != null && instance.orig_err!=null)
      return instance.orig_err;
    return System.err;
  }

  private PrintStream orig_out;
  private PrintStream orig_err;
  
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
  
  private void theinit() {
    orig_out = System.out;
    orig_err = System.err;
    System.setOut(new PrintStream(new MyOutputStream(true)));
    System.setErr(new PrintStream(new MyOutputStream(false)));
  }
  
  private void thefini() {
    System.setOut(orig_out);
    System.setErr(orig_err);
  }

  private class threadOutputHandler {
    public BeakerOutputHandler out_handler;
    public BeakerOutputHandler err_handler;
  }
  
  private Map<Long,threadOutputHandler> thrHandlers = new HashMap<Long,threadOutputHandler>();
  private BeakerOutputHandler def_out;
  private BeakerOutputHandler def_err;
    
  private synchronized void theSetOutputHandler(BeakerOutputHandler out, BeakerOutputHandler err) {
    long id = Thread.currentThread().getId();
    threadOutputHandler t;
    if (!thrHandlers.containsKey(id)) {
      t = new threadOutputHandler();
      thrHandlers.put(id, t);
    } else {
      t = thrHandlers.get(id);
    }
    t.out_handler = out;
    t.err_handler = err;
  }
  
  private synchronized void theSetDefaultOutputHandler(BeakerOutputHandler out, BeakerOutputHandler err) {
    def_out = out;
    def_err = err;
  }

  private synchronized void theClrOutputHandler() {
    long id = Thread.currentThread().getId();
    thrHandlers.remove(id);
  }

  private BeakerOutputHandler getHandler(boolean out) {
    long id = Thread.currentThread().getId();
    if (thrHandlers.containsKey(id)) {
      threadOutputHandler t = thrHandlers.get(id);
      if (out)
        return t.out_handler;
      return t.err_handler;
    } else if (def_out!=null || def_err!=null) {
      // WARNING: memory leak - we never clean up these if the thread exit
      threadOutputHandler t = new threadOutputHandler();
      t.out_handler = def_out;
      t.err_handler = def_err;
      thrHandlers.put(id, t);
    }
    if(out)
      return def_out;
    return def_err;
  }
  
  private synchronized void write(boolean isout, int b) throws IOException {
    BeakerOutputHandler hdl = getHandler(isout);
    if (hdl!=null) hdl.write(b);
    else if(isout)
      orig_out.write(b);
    else
      orig_err.write(b);
  }
  private synchronized void write(boolean isout, byte[] b) throws IOException {
    BeakerOutputHandler hdl = getHandler(isout);
    if (hdl!=null) hdl.write(b);
    else if(isout)
      orig_out.write(b);
    else
      orig_err.write(b);
  }
  private synchronized void write(boolean isout, byte[] b, int off, int len) throws IOException {
    BeakerOutputHandler hdl = getHandler(isout);
    if (hdl!=null) hdl.write(b, off, len);
    else if(isout)
      orig_out.write(b);
    else
      orig_err.write(b);
  }

}

package com.twosigma.beaker.jvm.threads;

public interface BeakerOutputHandler {
  public void write(int b);
  public void write(byte[] b);
  public void write(byte[] b, int off, int len);
}

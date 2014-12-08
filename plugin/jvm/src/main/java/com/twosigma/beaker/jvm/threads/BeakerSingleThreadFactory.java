package com.twosigma.beaker.jvm.threads;

import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

public class BeakerSingleThreadFactory implements ThreadFactory {

  private Thread thr;
  private ThreadGroup thrGroup;
  private String prefix;
  private static AtomicInteger count = new AtomicInteger(0);
  
  public BeakerSingleThreadFactory(ThreadGroup tg, String prf) {
    thrGroup = tg;
    prefix   = prf;
  }
  
  @Override
  public Thread newThread(Runnable r) {
    thr = new Thread(thrGroup, r, prefix + count.getAndIncrement());
    return thr;
  }

  public Thread getTheThread() { return thr; }
}

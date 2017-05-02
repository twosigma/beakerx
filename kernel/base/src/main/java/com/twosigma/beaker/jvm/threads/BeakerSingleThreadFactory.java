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

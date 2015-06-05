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

import java.lang.Thread.State;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantLock;

public class BeakerCellExecutor {

  private final String prefix;
  private final ReentrantLock theLock;
  private BeakerSingleThreadFactory thrFactory;
  private ThreadGroup thrGroup;
  private ExecutorService worker;
  private static AtomicInteger count = new AtomicInteger();
  
  public BeakerCellExecutor(String prf) {
    prefix   = prf;
    theLock  = new ReentrantLock();
    thrGroup = new ThreadGroup(prefix + "TG" + count.getAndIncrement());
    reset();
  }
  
  public void reset() {
    theLock.lock();
    thrFactory = new BeakerSingleThreadFactory(thrGroup, prefix);
    worker = Executors.newSingleThreadExecutor(thrFactory);
    theLock.unlock();
  }
  
  public boolean executeTask(Runnable tsk) {
    Future<?> ret;
    
    try {
      theLock.lock();
      ret = worker.submit(tsk);
    } catch(Throwable t) {
      t.printStackTrace();
      return false;
    } finally {
      theLock.unlock();
    }

    try {
      ret.get();
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }

    if(ret.isCancelled())
      return false;
    return true;
  }
  
 
  @SuppressWarnings("deprecation")
  public void cancelExecution() {
    // stop current execution (if any)
    theLock.lock();
    worker.shutdownNow();
    Thread thr = thrFactory.getTheThread();
    if (thr != null) {
      int repeat = 5;
      while(repeat>0 && !thr.getState().equals(State.TERMINATED)) {
        repeat--;
        try {  Thread.sleep(100);  } catch (Throwable t) { }
      }
      if(!thr.getState().equals(State.TERMINATED)) {
        repeat = 15;
        while(repeat>0 && !thr.getState().equals(State.TERMINATED)) {
          repeat--;
          thr.stop();
          try {  Thread.sleep(100);  } catch (Throwable t) { }
        }
      }
    }
    theLock.unlock();
    
    // reset executor service
    reset();
  }
  
  public List<Thread> getThreadList() { 
    int nAlloc = thrGroup.activeCount( );
    if (nAlloc == 0)
      return new ArrayList<Thread>();
    int n = 0;
    Thread[] threads;
    do {
        nAlloc *= 2;
        threads = new Thread[ nAlloc ];
        n = thrGroup.enumerate( threads );
    } while ( n == nAlloc );
    return Arrays.asList(threads);
  }
  
  @SuppressWarnings("deprecation")
  public void killAllThreads() {
    // first stop current execution (if any)
    theLock.lock();
    worker.shutdownNow();
    Thread thr = thrFactory.getTheThread();
    int repeat;
    if(thr != null) {
      repeat = 5;
      while(repeat>0 && !thr.getState().equals(State.TERMINATED)) {
        repeat--;
        try {  Thread.sleep(100);  } catch (Throwable t) { }
      }
      if(!thr.getState().equals(State.TERMINATED)) {
        repeat = 15;
        while(repeat>0 && !thr.getState().equals(State.TERMINATED)) {
          repeat--;
          thr.stop();
          try {  Thread.sleep(100);  } catch (Throwable t) { }
        }
      }
    }
    
    // then kill all remaining threads in the threadpool
    List<Thread> tlist = getThreadList();
    
    for (Thread t : tlist) {
      if (t!=null)
        t.interrupt();
    }

    repeat = 15;
    while(repeat>0) {
      boolean finished = true;
      for (Thread t : tlist) {
        if (t!=null && ! t.getState().equals(State.TERMINATED) ) {
          finished = false;
          t.stop();
        }
      }
      if (finished)
        break;
      repeat--;
      try {  Thread.sleep(100);  } catch (Throwable t) { }
    }

    theLock.unlock();

    // reset executor service
    reset();
  }
  
  
}

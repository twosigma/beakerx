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

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.GroupName;
import org.jetbrains.annotations.NotNull;

import java.lang.Thread.State;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.FutureTask;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantLock;


public class BeakerCellExecutor implements CellExecutor {

  private static final int KILL_THREAD_SLEEP_IN_MILLIS = 2000;
  private static AtomicInteger count = new AtomicInteger();

  private final String prefix;
  private final ReentrantLock theLock;
  private ConcurrentLinkedQueue<ThreadGroup> threadGroups = new ConcurrentLinkedQueue<>();
  private int killThreadSleepInMillis;

  public BeakerCellExecutor(String prf, int killThreadSleepInMillis) {
    prefix = prf;
    theLock = new ReentrantLock();
    this.killThreadSleepInMillis = killThreadSleepInMillis;
    reset();
  }

  public BeakerCellExecutor(String prf) {
    this(prf, KILL_THREAD_SLEEP_IN_MILLIS);
  }

  private void reset() {
    theLock.lock();
    threadGroups = new ConcurrentLinkedQueue<>();
    theLock.unlock();
  }

  @Override
  public TryResult executeTask(Callable<TryResult> tsk, ExecutionOptions executionOptions) {
    FutureTask<TryResult> ret;
    try {
      theLock.lock();
      ret = executeTaskInNewThread(tsk, executionOptions.getGroupName());
    } catch (Throwable t) {
      t.printStackTrace();
      return TryResult.createError(t.getMessage());
    } finally {
      theLock.unlock();
    }
    return getResult(ret);
  }

  private TryResult getResult(FutureTask<TryResult> ret) {
    TryResult o;
    try {
      o = ret.get();
    } catch (Exception e) {
      e.printStackTrace();
      return TryResult.createError(e.getMessage());
    }

    if (ret.isCancelled())
      return TryResult.createError("Cancelled");
    return o;
  }

  @NotNull
  private FutureTask<TryResult> executeTaskInNewThread(Callable<TryResult> tsk, GroupName groupName) {
    ThreadGroup threadGroup = new ThreadGroup(groupName + "_" + prefix + "TG" + count.getAndIncrement());
    threadGroups.add(threadGroup);
    FutureTask<TryResult> ret = new FutureTask<>(tsk);
    Thread t = new Thread(threadGroup, ret);
    t.start();
    return ret;
  }

  @Override
  public void cancelExecution(GroupName groupName) {
    try {
      theLock.lock();
      threadGroups.stream()
              .filter(thg -> thg.getName().contains(groupName.asString()))
              .forEach(thg -> {
                List<Thread> tlist = getThreadList(thg);
                for (Thread t : tlist) {
                  killThread(t);
                }
                threadGroups.remove(thg);
              });
    } finally {
      theLock.unlock();
    }
  }

  public List<Thread> getThreadList(ThreadGroup thrGroup) {
    int nAlloc = thrGroup.activeCount();
    if (nAlloc == 0)
      return new ArrayList<Thread>();
    int n = 0;
    Thread[] threads;
    do {
      nAlloc *= 2;
      threads = new Thread[nAlloc];
      n = thrGroup.enumerate(threads);
    } while (n == nAlloc);
    return Arrays.asList(threads);
  }

  private void killThread(Thread thr) {
    if (null == thr) return;
    thr.interrupt();
    try {
      Thread.sleep(killThreadSleepInMillis);
    } catch (InterruptedException ex) {
    }
    if (!thr.getState().equals(State.TERMINATED)) {
      thr.stop();
    }
  }

  @Override
  public void killAllThreads() {
    try {
      theLock.lock();
      threadGroups.forEach(y -> {
        List<Thread> tlist = getThreadList(y);
        for (Thread t : tlist) {
          killThread(t);
        }
      });
    } finally {
      theLock.unlock();
      reset();
    }
  }
}

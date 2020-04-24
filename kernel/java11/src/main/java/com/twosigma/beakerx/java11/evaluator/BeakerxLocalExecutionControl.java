/*
 *  Copyright 2020 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.java11.evaluator;

import jdk.jshell.execution.DirectExecutionControl;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;

/**
 * Implementation extended from {@link jdk.jshell.execution.LocalExecutionControl}
 */

public class BeakerxLocalExecutionControl extends DirectExecutionControl {

  private final Object STOP_LOCK = new Object();
  private boolean userCodeRunning = false;
  private ThreadGroup execThreadGroup;
  private final Map<String, Object> objects = new ConcurrentHashMap<>();


  public Object getObject(String uuid) {
    return objects.remove(uuid);
  }

  @Override
  protected String invoke(Method doitMethod) throws Exception {
    Object object = invokeMethod(doitMethod);
    String uuid = UUID.randomUUID().toString();
    this.objects.put(uuid, object);
    return uuid;
  }

  private Object invokeMethod(Method doitMethod) throws Exception {
    execThreadGroup = new ThreadGroup("JShell process local execution");

    AtomicReference<InvocationTargetException> iteEx = new AtomicReference<>();
    AtomicReference<IllegalAccessException> iaeEx = new AtomicReference<>();
    AtomicReference<NoSuchMethodException> nmeEx = new AtomicReference<>();
    AtomicReference<Boolean> stopped = new AtomicReference<>(false);

    Thread.setDefaultUncaughtExceptionHandler((t, e) -> {
      if (e instanceof InvocationTargetException) {
        if (e.getCause() instanceof ThreadDeath) {
          stopped.set(true);
        } else {
          iteEx.set((InvocationTargetException) e);
        }
      } else if (e instanceof IllegalAccessException) {
        iaeEx.set((IllegalAccessException) e);
      } else if (e instanceof NoSuchMethodException) {
        nmeEx.set((NoSuchMethodException) e);
      } else if (e instanceof ThreadDeath) {
        stopped.set(true);
      }
    });

    final Object[] res = new Object[1];
    Thread snippetThread = new Thread(execThreadGroup, () -> {
      try {
        res[0] = doitMethod.invoke(null, new Object[0]);
      } catch (InvocationTargetException e) {
        if (e.getCause() instanceof ThreadDeath) {
          stopped.set(true);
        } else {
          iteEx.set(e);
        }
      } catch (IllegalAccessException e) {
        iaeEx.set(e);
      } catch (ThreadDeath e) {
        stopped.set(true);
      }
    });

    snippetThread.start();
    Thread[] threadList = new Thread[execThreadGroup.activeCount()];
    execThreadGroup.enumerate(threadList);
    for (Thread thread : threadList) {
      if (thread != null) {
        thread.join();
      }
    }

    if (stopped.get()) {
      throw new StoppedException();
    }

    if (iteEx.get() != null) {
      throw iteEx.get();
    } else if (nmeEx.get() != null) {
      throw nmeEx.get();
    } else if (iaeEx.get() != null) {
      throw iaeEx.get();
    }
    return res[0];
  }

  @Override
  @SuppressWarnings("deprecation")
  public void stop() throws InternalException {
    synchronized (STOP_LOCK) {
      if (!userCodeRunning) {
        return;
      }
      if (execThreadGroup == null) {
        throw new InternalException("Process-local code snippets thread group is null. Aborting stop.");
      }

      execThreadGroup.stop();
    }
  }

  @Override
  protected void clientCodeEnter() {
    synchronized (STOP_LOCK) {
      userCodeRunning = true;
    }
  }

  @Override
  protected void clientCodeLeave() {
    synchronized (STOP_LOCK) {
      userCodeRunning = false;
    }
  }


}

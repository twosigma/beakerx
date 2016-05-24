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
package com.twosigma.beaker.table;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Observable;

public abstract class ObservableTableDisplay extends Observable implements Cloneable, Serializable {
  private Object doubleClickListener;

  @Override
  public synchronized void setChanged() {
    super.setChanged();
  }

  public void setDoubleClickAction(Object listener) {
    this.doubleClickListener = listener;
  }

  public void fireDoubleClick(List<Object> params) {
    if (this.doubleClickListener != null) {
      if (params.size() == 2) {
        params.add(this);
      }
      try {
        runClosure(this.doubleClickListener, params.toArray());
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

  public boolean hasDoubleClickAction() {
    return this.doubleClickListener != null;
  }

  protected Object runClosure(Object closure, Object... params) throws Exception{
    Class<?> clazz = closure.getClass();
    Method getMaximumNumberOfParameters = clazz.getMethod("getMaximumNumberOfParameters");
    getMaximumNumberOfParameters.setAccessible(true);
    int numberOfParameters = (int) getMaximumNumberOfParameters.invoke(closure);
    Method call;
    Class<Object>[] paramTypes = new Class[numberOfParameters];
    Arrays.fill(paramTypes, Object.class);
    call = clazz.getMethod("call", paramTypes);
    call.setAccessible(true);
    return call.invoke(closure, Arrays.copyOfRange(params, 0, numberOfParameters));
  }
}

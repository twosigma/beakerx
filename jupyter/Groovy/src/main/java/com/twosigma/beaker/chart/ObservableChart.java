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

package com.twosigma.beaker.chart;

import com.twosigma.beaker.chart.actions.GraphicsActionObject;
import org.apache.commons.lang3.SerializationUtils;

import java.io.Serializable;
import java.util.Observable;

public class ObservableChart extends Observable implements Cloneable, Serializable{

  protected GraphicsActionObject details;

  @Override
  public synchronized void setChanged() {
    super.setChanged();
  }
  @Override
  public Object clone() throws CloneNotSupportedException {
    return SerializationUtils.clone(this);
  }

  public GraphicsActionObject getDetails() {
    return details;
  }

  public void setDetails(GraphicsActionObject details) {
    this.details = details;
  }
}

/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.widgets.floats;

import java.io.Serializable;
import java.util.HashMap;

public class BoundedFloatRangeWidget extends FloatRangeWidget {

  public static final String STEP = "step";
  public static final String MAX = "max";
  public static final String MIN = "min";

  private Double step = 1D;
  private Double max = 100D;
  private Double min = 0D;

  protected BoundedFloatRangeWidget() {
    super();
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(MAX, this.getMax());
    content.put(MIN, this.getMin());
    content.put(STEP, this.getStep());
    return content;
  }

  public Double getStep() {
    return step;
  }

  public void setStep(Double step) {
    this.step = step;
    sendUpdate(STEP, step);
  }

  public Double getMax() {
    return max;
  }

  public void setMax(Double max) {
    this.max = max;
    sendUpdate(MAX, max);
  }

  public Double getMin() {
    return min;
  }

  public void setMin(Double min) {
    this.min = min;
    sendUpdate(MIN, min);
  }

}
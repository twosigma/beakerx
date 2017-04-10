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
package com.twosigma.beaker.widgets.integers;

import java.io.Serializable;
import java.util.HashMap;

/**
 * Base class for widgets that represent an integer bounded from above and below.
 */
public abstract class BoundedIntWidget extends IntWidget<Integer> {

  public static final String STEP = "step";
  public static final String MAX = "max";
  public static final String MIN = "min";

  private Integer step = 1;
  private Integer max = 100;
  private Integer min = 0;

  protected BoundedIntWidget() {
    super();
    value = 0;
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(MAX, this.getMax());
    content.put(MIN, this.getMin());
    content.put(STEP, this.getStep());
    return content;
  }

  public Integer getStep() {
    return step;
  }

  public void setStep(Integer step) {
    this.step = step;
    sendUpdate(STEP, step);
  }

  public Integer getMax() {
    return max;
  }

  public void setMax(Integer max) {
    this.max = max;
    sendUpdate(MAX, max);
  }

  public Integer getMin() {
    return min;
  }

  public void setMin(Integer min) {
    this.min = min;
    sendUpdate(MIN, min);
  }

}
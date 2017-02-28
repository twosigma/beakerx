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
package com.twosigma.beaker.chart.xychart.plotitem;

import java.util.List;

public abstract class BasedXYGraphics extends XYGraphics {
  private Number baseBase = 0.0d;
  private List<Number> bases;

  public void setBase(Object base) {
    if (base instanceof Number) {
      this.baseBase = ((Number) base).floatValue();
    } else if (base instanceof List) {
      @SuppressWarnings("unchecked")
      List<Number> ss = (List<Number>) base;
      setBases(ss);
    } else {
      throw new IllegalArgumentException(
        "setBase takes Number or List of Number");
    }
    super.setBase(base);
  }

  private void setBases(List<Number> bases) {
    this.bases = bases;
  }

  public Number getBase() {
    return this.baseBase;
  }

  public List<Number> getBases() {
    return this.bases;
  }
}

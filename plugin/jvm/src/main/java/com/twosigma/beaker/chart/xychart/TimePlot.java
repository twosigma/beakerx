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

package com.twosigma.beaker.chart.xychart;

import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class TimePlot extends XYChart {

  public XYChart setXBound(Date lower, Date upper) {
    setXBound((double) lower.getTime(), (double) upper.getTime());
    return this;
  }

  @Override
  public XYChart setXBound(List bound) {
    if (bound.size() != 2) {
      throw new IllegalArgumentException("to set the x bound, the list needs to be of size=2");
    }
    if (bound.get(0) instanceof Date && bound.get(1) instanceof Date) {
      setXBound((Date) bound.get(0), (Date) bound.get(1));
    } else {
      super.setXBound(bound);
    }
    return this;
  }

}

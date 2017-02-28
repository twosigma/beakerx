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

import com.twosigma.beaker.chart.Filter;

import java.util.EnumSet;


public class Area extends BasedXYGraphics {

  private final static EnumSet<Filter> POSSIBLE_LOD_FILTERS = EnumSet.of(Filter.AREA, Filter.RIVER);

  private Integer interpolation;

  public void setInterpolation(Integer interpolation) {
    if (interpolation.intValue() < 0 || interpolation.intValue() > 1) {
      throw new IllegalArgumentException(
          "Area interpolation is limited to 0, 1");
    }

    this.interpolation = interpolation;
  }

  public Integer getInterpolation() {
    return this.interpolation;
  }

  @Override
  protected EnumSet<Filter> getPossibleFilters() {
    return POSSIBLE_LOD_FILTERS;
  }
}

/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.chart.actions;

import com.google.inject.Singleton;
import com.twosigma.beaker.chart.ObservableChart;

import java.util.HashMap;
import java.util.Map;

@Singleton
public class ChartObjectManager {
  /* plot id -> plot object */
  private final Map<String, ObservableChart> charts = new HashMap<>();

  public void registerChart(final String id, final ObservableChart chart) {
    charts.put(id, chart);
  }

  public ObservableChart getChart(final String id) {
    return charts.get(id);
  }

}

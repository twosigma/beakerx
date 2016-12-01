/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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

package com.twosigma.beaker.chart.serializer;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.chart.ObservableChart;
import com.twosigma.beaker.chart.actions.ChartObjectManager;
import com.twosigma.beaker.jvm.updater.UpdateManager;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;

import java.io.IOException;

public abstract class ObservableChartSerializer<T extends ObservableChart> extends JsonSerializer<T> {
  @Inject
  private Provider<ChartObjectManager> chartObjectManagerProvider;
  @Inject
  private Provider<UpdateManager> updateManagerProvider;

  protected void serialize(T chart, JsonGenerator jgen) throws IOException {
    String id = updateManagerProvider.get().register(chart);
    chartObjectManagerProvider.get().registerChart(id, chart);
    jgen.writeStringField("update_id", id);
  }

}

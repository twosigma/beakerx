package com.twosigma.beaker.chart.serializer;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.twosigma.beaker.chart.ObservableChart;
import com.twosigma.beaker.chart.actions.ChartObjectManager;
import com.twosigma.beaker.jvm.updater.UpdateManager;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;

import java.io.IOException;

@Singleton
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

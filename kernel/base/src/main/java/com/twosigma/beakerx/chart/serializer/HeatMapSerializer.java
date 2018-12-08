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
package com.twosigma.beakerx.chart.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.twosigma.beakerx.chart.heatmap.HeatMap;

import java.io.IOException;

import static com.twosigma.beakerx.chart.heatmap.HeatMap.COLUMN_LIMIT;
import static com.twosigma.beakerx.chart.heatmap.HeatMap.NUMBER_OF_NODES_LIMIT;
import static com.twosigma.beakerx.chart.heatmap.HeatMap.ROWS_LIMIT;

public class HeatMapSerializer extends AbstractChartSerializer<HeatMap> {

  public static final String GRAPHICS_LIST = "graphics_list";
  public static final String COLOR = "color";

  private HeatMapReducer heatMapReducer = new HeatMapReducer(COLUMN_LIMIT, ROWS_LIMIT);

  @Override
  public void serialize(HeatMap heatmap, JsonGenerator jgen, SerializerProvider sp)
          throws IOException {
    jgen.writeStartObject();
    serialize(heatmap, jgen);
    if (heatmap.getData() == null) {
      jgen.writeObjectField(GRAPHICS_LIST, heatmap.getData());
      jgen.writeObjectField(TOTAL_NUMBER_OF_POINTS, 0);
      jgen.writeBooleanField(TOO_MANY_ROWS, false);
    } else {
      serializeData(heatmap.getData(), jgen);
    }
    jgen.writeObjectField(COLOR, heatmap.getColor());
    jgen.writeEndObject();
  }

  private void serializeData(Number[][] data, JsonGenerator jgen) throws IOException {
    int totalPoints = HeatMapReducer.totalPoints(data);
    boolean tooManyPoints = totalPoints > NUMBER_OF_NODES_LIMIT;
    if (tooManyPoints) {
      Number[][] limitedHeatMapData = heatMapReducer.limitHeatmap(data);
      jgen.writeObjectField(GRAPHICS_LIST, limitedHeatMapData);
      jgen.writeObjectField(ROWS_LIMIT_ITEMS, NUMBER_OF_NODES_LIMIT);
      jgen.writeObjectField(NUMBER_OF_POINTS_TO_DISPLAY, HeatMapReducer.totalPoints(limitedHeatMapData));
    } else {
      jgen.writeObjectField(GRAPHICS_LIST, data);
    }
    jgen.writeObjectField(TOTAL_NUMBER_OF_POINTS, totalPoints);
    jgen.writeBooleanField(TOO_MANY_ROWS, tooManyPoints);
  }


}
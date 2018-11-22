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
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.Arrays;
import java.util.stream.IntStream;

import static com.twosigma.beakerx.chart.heatmap.HeatMap.ROWS_LIMIT;

public class HeatMapSerializer extends AbstractChartSerializer<HeatMap> {

  public static final String GRAPHICS_LIST = "graphics_list";
  public static final String COLOR = "color";

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
    int totalPoints = totalPoints(data);
    boolean tooManyPoints = totalPoints > ROWS_LIMIT;
    if (tooManyPoints) {
      Number[][] limitedHeatMapData = limitHeatmap(data);
      jgen.writeObjectField(GRAPHICS_LIST, limitedHeatMapData);
      jgen.writeObjectField(ROWS_LIMIT_ITEMS, ROWS_LIMIT);
      jgen.writeObjectField(NUMBER_OF_POINTS_TO_DISPLAY, totalPoints(limitedHeatMapData));
    } else {
      jgen.writeObjectField(GRAPHICS_LIST, data);
    }
    jgen.writeObjectField(TOTAL_NUMBER_OF_POINTS, totalPoints);
    jgen.writeBooleanField(TOO_MANY_ROWS, tooManyPoints);
  }

  private Number[][] limitHeatmap(Number[][] data) {
    Number[][] limitedElementsInRow = limitElementsInRow(data);
    int totalPoints = totalPoints(limitedElementsInRow);
    boolean tooManyRows = totalPoints > ROWS_LIMIT;
    if (tooManyRows) {
      return limitRows(limitedElementsInRow);
    }
    return limitedElementsInRow;
  }

  private Number[][] limitRows(Number[][] limitedElementsInRow) {
    int stepForRow = findStepForRow(limitedElementsInRow);
    Number[][] limitedRows = IntStream.range(0, limitedElementsInRow.length)
            .filter(n -> n % stepForRow == 0)
            .mapToObj(index -> limitedElementsInRow[index])
            .toArray(Number[][]::new);
    return limitedRows;
  }

  @NotNull
  private Number[][] limitElementsInRow(Number[][] data) {
    Number[][] limitedElements = Arrays.stream(data).
            map(row -> {
              if (row.length > 100) {
                int step = findStepForColumn(row);
                Number[] limitedRow = IntStream.range(0, row.length)
                        .filter(n -> n % step == 0)
                        .mapToObj(index -> row[index])
                        .toArray(Number[]::new);
                return limitedRow;
              } else {
                return row;
              }
            }).toArray(Number[][]::new);

    return limitedElements;
  }

  private int findStepForRow(Number[][] data) {
    int step = 2;
    while ((data.length / step) > 100) {
      step++;
    }
    return step;
  }


  private int findStepForColumn(Number[] row) {
    int step = 2;
    while ((row.length / step) > 100) {
      step++;
    }
    return step;
  }

  private int totalPoints(Number[][] data) {
    return Arrays.stream(data).
            mapToInt(x -> x.length).sum();
  }

}
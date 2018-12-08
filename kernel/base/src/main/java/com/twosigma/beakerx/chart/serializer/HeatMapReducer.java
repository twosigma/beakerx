/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import org.jetbrains.annotations.NotNull;

import java.util.Arrays;
import java.util.stream.IntStream;


public class HeatMapReducer {

  private final int nodeLimit;
  private final int columnLimit;
  private final int rowLimit;

  public HeatMapReducer(int columnLimit, int rowLimit) {
    this.columnLimit = columnLimit;
    this.rowLimit = rowLimit;
    this.nodeLimit = this.columnLimit * this.rowLimit;
  }

  public Number[][] limitHeatmap(Number[][] data) {
    Number[][] limitedElementsInRow = limitElementsInRow(data);
    int totalPoints = totalPoints(limitedElementsInRow);
    boolean tooManyRows = totalPoints > nodeLimit;
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
              if (row.length > this.columnLimit) {
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
    while ((data.length / step) > this.rowLimit) {
      step++;
    }
    return step;
  }


  private int findStepForColumn(Number[] row) {
    int step = 2;
    while ((row.length / step) > this.columnLimit) {
      step++;
    }
    return step;
  }

  public static int totalPoints(Number[][] data) {
    return Arrays.stream(data).
            mapToInt(x -> x.length).sum();
  }

}

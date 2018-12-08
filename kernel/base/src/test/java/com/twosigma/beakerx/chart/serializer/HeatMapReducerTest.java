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
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

public class HeatMapReducerTest {

  public static final int ROWS_LIMIT = 100;
  public static final int COLUMN_LIMIT = 100;
  private HeatMapReducer sut;

  @Before
  public void setUp() throws Exception {
    sut = new HeatMapReducer(COLUMN_LIMIT, ROWS_LIMIT);
  }

  @Test
  public void shouldLimitDataInHeatMap() {
    //given
    Integer[][] items = createData(1000, 1000);
    //when
    Number[][] limitedItems = sut.limitHeatmap(items);
    //then
    assertThat(HeatMapReducer.totalPoints(limitedItems)).isEqualTo(ROWS_LIMIT * COLUMN_LIMIT);
  }

  @NotNull
  private Integer[][] createData(int columns, int rows) {
    List<List<Integer>> integers = new ArrayList<>();
    IntStream.range(1, rows).forEach(x -> {
      List<Integer> collect = IntStream.range(1, columns).boxed().collect(Collectors.toList());
      integers.add(collect);
    });

    return integers.stream()
            .map(l -> l.stream().toArray(Integer[]::new))
            .toArray(Integer[][]::new);
  }
}
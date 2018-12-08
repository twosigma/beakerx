
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

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class HistogramReducerTest {


  public static final int ROWS_LIMIT = 100;
  public static final int NUMBER_OF_NODES_TO_DISPLAY = 10;
  private HistogramReducer sut;

  @Before
  public void setUp() throws Exception {
    sut = new HistogramReducer(ROWS_LIMIT, NUMBER_OF_NODES_TO_DISPLAY);
  }

  @Test
  public void shouldLimitData() {
    //given
    List<Number> data = IntStream.range(1, 1000001).boxed().collect(Collectors.toList());
    //when
    List<List<Number>> limitedData = sut.limitData(data);
    //then
    Assertions.assertThat(sut.totalPoints(limitedData).getAsInt()).isEqualTo(NUMBER_OF_NODES_TO_DISPLAY);
  }


  @Test
  public void shouldLimitListData() {
    //given
    List<List<Number>> integers = new ArrayList<>();
    IntStream.range(1, 1000).forEach(x -> {
      List<Number> collect = IntStream.range(1, 1000).boxed().collect(Collectors.toList());
      integers.add(collect);
    });
    //when
    List<List<Number>> limitedData = sut.limitListData(integers);
    //then
    Assertions.assertThat(sut.totalPoints(limitedData).getAsInt()).isEqualTo(NUMBER_OF_NODES_TO_DISPLAY);
  }
}
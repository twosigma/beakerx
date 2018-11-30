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

import java.util.List;
import java.util.OptionalInt;
import java.util.stream.Collectors;

import static java.util.Collections.singletonList;

public class HistogramReducer {

  private int rowLimit;
  private int numberOfRowsToDisplay;


  public HistogramReducer(int rowLimit, int numberOfRowsToDisplay) {
    this.rowLimit = rowLimit;
    this.numberOfRowsToDisplay = numberOfRowsToDisplay;
  }

  public List<List<Number>> limitData(List<Number> list) {
    return singletonList(list.subList(0, numberOfRowsToDisplay));
  }

  public List<List<Number>> limitListData(List<List<Number>> listData) {
    return listData.stream().
            map(x -> x.subList(0, (x.size() >= rowLimit) ? numberOfRowsToDisplay : x.size())).
            collect(Collectors.toList());
  }

  public OptionalInt totalPoints(List<List<Number>> listData) {
    return listData.stream().
            mapToInt(List::size).
            max();
  }

}

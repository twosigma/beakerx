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

package com.twosigma.beaker.chart.xychart;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.*;

public class SimpleTimePlotTest {

  Map<String, Object> parameters;
  List<Map<String, Object>> rates;
  List<String> columns;

  @Before
  public void initStubData(){
    createDataForSimpleTimePlot();
  }

  @Test
  public void callConstructorWithDataAndColumns_shouldCreateSimpleTimePlot() {
    //when
    SimpleTimePlot simpleTimePlot = new SimpleTimePlot(rates, Arrays.asList("m3", "time", "num"));
    //then
    Assertions.assertThat(simpleTimePlot).isNotNull();
  }

  @Test
  public void callConstructorWithParamsAndDataAndColumns_shouldCreateSimpleTimePlot() {
    //when
    SimpleTimePlot simpleTimePlot = new SimpleTimePlot(parameters, rates, Arrays.asList("m3", "time", "num"));
    //then
    Assertions.assertThat(simpleTimePlot).isNotNull();
  }

  @Test(expected = IllegalArgumentException.class)
  public void createInstanceWithStringValues_throwIllegalArgumentException() {
    new SimpleTimePlot(rates, Arrays.asList("m3", "str", "time", "num"));
  }

  private void createDataForSimpleTimePlot(){
    columns =  Arrays.asList("m3", "name", "time", "num");
    rates = new ArrayList<>();
    rates.add(new HashMap<String, Object>(){
      {
        put(columns.get(0), new Float(8.25));
        put(columns.get(1), "one");
        put(columns.get(2), new Long(633733200000L));
        put(columns.get(3), 123);
      }
    });
    rates.add(new HashMap<String, Object>(){
      {
        put(columns.get(0), new Float(9.0));
        put(columns.get(1), "two");
        put(columns.get(2), new Long(605733200000L));
        put(columns.get(3), 345);
      }
    });
    parameters = new HashMap<String, Object>(){
      {
        put("displayPoints", Boolean.TRUE);
        put("anyParam", Boolean.TRUE);
      }
    };
  }
}
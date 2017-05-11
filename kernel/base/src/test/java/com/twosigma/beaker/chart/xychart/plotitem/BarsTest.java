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

package com.twosigma.beaker.chart.xychart.plotitem;

import com.twosigma.beaker.chart.Color;
import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.util.Arrays;

public class BarsTest {

  @Test
  public void createBarsByEmptyConstructor_hasWidthAndColorValuesAreNulls() {
    //when
    Bars bars = new Bars();
    //then
    Assertions.assertThat(bars.getWidth()).isNull();
    Assertions.assertThat(bars.getWidths()).isNull();
    Assertions.assertThat(bars.getOutlineColor()).isNull();
    Assertions.assertThat(bars.getOutlineColors()).isNull();
  }

  @Test
  public void setWidthWithIntegerList_hasWidthListIsNotNull() {
    //when
    Bars bars = new Bars();
    bars.setWidth(Arrays.asList(new Integer(486), new Integer(528)));
    //then
    Assertions.assertThat(bars.getWidths()).isNotNull();
  }

  @Test
  public void setOutlineColorWithList_hasOutlineColorListIsNotNull() {
    //when
    Bars bars = new Bars();
    bars.setOutlineColor(Arrays.asList(Color.BLUE, Color.GREEN));
    //then
    Assertions.assertThat(bars.getOutlineColors()).isNotNull();
  }

  @Test
  public void setYAxis_hasYAxis() {
    //when
    Bars bars = new Bars();
    bars.setYAxis("yAxis name");
    //then
    Assertions.assertThat(bars.getYAxis()).isEqualTo("yAxis name");
  }
}

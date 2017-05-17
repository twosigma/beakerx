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

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

public class AreaTest {

  private Area area;

  @Before
  public void setUp() throws Exception {
    area = new Area();
  }

  @Test
  public void createAreaByEmptyConstructor_hasInterpolationIsNull() {
    //when
    Area area = new Area();
    //then
    Assertions.assertThat(area.getInterpolation()).isNull();
  }

  @Test(expected = IllegalArgumentException.class)
  public void setInterpolationWithPositive2_throwIllegalArgumentException() {
    //when
    area.setInterpolation(new Integer(-2));
  }

  @Test(expected = IllegalArgumentException.class)
  public void setInterpolationWithNegative2_throwIllegalArgumentException() {
    //when
    area.setInterpolation(new Integer(2));
  }

  @Test
  public void setInterpolationWithZeroOrOne_getInterpolationWithZeroOrOne() {
    area.setInterpolation(new Integer(0));
    Assertions.assertThat(area.getInterpolation()).isEqualTo(0);
    area.setInterpolation(new Integer(1));
    Assertions.assertThat(area.getInterpolation()).isEqualTo(1);
  }

  @Test
  public void createAreaByEmptyConstructor_hasPossibleFiltersIsNotEmpty(){
    //when
    Area area = new Area();
    //when
    Assertions.assertThat(area.getPossibleFilters()).isNotEmpty();
  }

}

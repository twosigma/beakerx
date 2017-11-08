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

package com.twosigma.beakerx.chart.xychart.plotitem;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

public class StemsTest {

  Stems stems;

  @Before
  public void setUp() throws Exception {
    stems = new Stems();
  }

  @Test
  public void createStemsByEmptyConstructor_hasWidthAndStyleAreNotNulls() {
    //when
    Stems stems = new Stems();
    //then
    Assertions.assertThat(stems.getWidth()).isNotNull();
    Assertions.assertThat(stems.getStyle()).isNotNull();
  }

  @Test
  public void setStyleWithStrokeTypeListParam_hasStyleListIsNotNull() {
    //when
    stems.setStyle(Arrays.asList(StrokeType.values()));
    //then
    Assertions.assertThat(stems.getStyles()).isNotNull();
  }

  @Test
  public void createStemsByEmptyConstructor_hasPossibleFiltersIsNotEmpty(){
    //when
    Stems stems = new Stems();
    //when
    Assertions.assertThat(stems.getPossibleFilters()).isNotEmpty();
  }

}

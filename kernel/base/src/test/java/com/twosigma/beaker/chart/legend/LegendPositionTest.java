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

package com.twosigma.beaker.chart.legend;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

public class LegendPositionTest {

  LegendPosition legendPosition;

  @Before
  public void setUp() throws Exception {
    legendPosition = new LegendPosition();
  }

  @Test
  public void createLegendPositionByEmptyConstructor_hasPositionIsNotNull() {
    //then
    Assertions.assertThat(legendPosition.getPosition()).isNotNull();
  }

  @Test
  public void createLegendPositionWithLeftPositionParam_hasLeftPosition() {
    //when
    LegendPosition legendPos = new LegendPosition(LegendPosition.Position.LEFT);
    //then
    Assertions.assertThat(legendPos.getPosition()).isEqualTo(LegendPosition.Position.LEFT);
  }

  @Test
  public void createLegendPositionWithOneLengthIntArrayParam_hasXNotZeroYIsZero() {
    //when
    LegendPosition legendPos = new LegendPosition(new int[] {1});
    //then
    Assertions.assertThat(legendPos.getX()).isNotZero();
    Assertions.assertThat(legendPos.getY()).isZero();
  }

  @Test
  public void createLegendPositionWithTwoLengthIntArrayParam_hasXAndYNotEqualZero() {
    //when
    LegendPosition legendPos = new LegendPosition(new int[] {1, 2});
    //then
    Assertions.assertThat(legendPos.getX()).isNotZero();
    Assertions.assertThat(legendPos.getY()).isNotZero();
  }

  @Test
  public void setX_hasX() {
    //when
    legendPosition.setX(1);
    //then
    Assertions.assertThat(legendPosition.getX()).isEqualTo(1);
  }

  @Test
  public void setY_hasY() {
    //when
    legendPosition.setY(2);
    //then
    Assertions.assertThat(legendPosition.getY()).isEqualTo(2);
  }

}

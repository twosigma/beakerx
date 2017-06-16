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

import com.twosigma.beakerx.chart.Color;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class BarsTest {

  private Bars bars;

  @Before
  public void setUp() throws Exception {
    bars = new Bars();
  }

  @Test
  public void createBarsByEmptyConstructor_hasWidthAndColorValuesAreNulls() {
    //then
    Assertions.assertThat(bars.getWidth()).isNull();
    Assertions.assertThat(bars.getWidths()).isNull();
    Assertions.assertThat(bars.getOutlineColor()).isNull();
    Assertions.assertThat(bars.getOutlineColors()).isNull();
  }

  @Test
  public void setWidthWithIntegerList_hasWidthListIsNotNull() {
    //when
    bars.setWidth(Arrays.asList(new Integer(486), new Integer(528)));
    //then
    Assertions.assertThat(bars.getWidths()).isNotNull();
  }

  @Test
  public void setOutlineColorWithList_hasOutlineColorListIsNotNull() {
    //when
    bars.setOutlineColor(Arrays.asList(Color.BLUE, Color.GREEN));
    //then
    Assertions.assertThat(bars.getOutlineColors()).isNotNull();
  }

  @Test
  public void setYAxis_hasYAxis() {
    //when
    bars.setYAxis("yAxis name");
    //then
    Assertions.assertThat(bars.getYAxis()).isEqualTo("yAxis name");
  }

  @Test
  public void clone_shouldCloneGraphics() throws CloneNotSupportedException {
    //when
    bars.setDisplayName("before");
    Bars cloneBars = (Bars) bars.clone();
    bars.setYAxis("after");
    //then
    Assertions.assertThat(cloneBars.getDisplayName()).isEqualTo("before");
    Assertions.assertThat(cloneBars.getYAxis()).isNotEqualTo("after");
  }

  @Test
  public void setOutlineColorWithAwtColor_hasOutlineColor() {
    //when
    bars.setOutlineColor(java.awt.Color.BLUE);
    //then
    Assertions.assertThat(bars.getOutlineColor()).isEqualTo(Color.BLUE);
  }

  @Test
  public void setOutlineColorWithListOfAwtColors_hasOutlineColorListNotEmpty() {
    //when
    bars.setOutlineColor(Arrays.asList(java.awt.Color.BLUE, java.awt.Color.GREEN));
    //then
    Assertions.assertThat(bars.getOutlineColors()).isNotEmpty();
  }

  @Test
  public void createBarsByEmptyConstructor_hasPossibleFiltersNotEmpty(){
    //when
    Bars bars = new Bars();
    //when
    Assertions.assertThat(bars.getPossibleFilters()).isNotEmpty();
  }

  @Test
  public void setColori_hasColor() {
    //when
    bars.setColori(Color.GREEN);
    //then
    Assertions.assertThat(bars.getColor()).isEqualTo(Color.GREEN);
  }

  @Test
  public void setColorWithListOfAwtColors_hasColorListNotEmpty() {
    //when
    bars.setColor(Arrays.asList(java.awt.Color.BLUE, java.awt.Color.GREEN));
    //then
    Assertions.assertThat(bars.getColors()).isNotEmpty();
  }

  @Test
  public void setBaseWithListOfIntegers_hasBasesListNotEmpty() {
    //when
    bars.setBase(Arrays.asList(0, 1));
    //then
    Assertions.assertThat(bars.getBases()).isNotEmpty();
  }

  @Test
  public void setBaseWithInteger_hasBaseNotEmpty() {
    //when
    bars.setBase(5f);
    //then
    Assertions.assertThat(bars.getBase()).isEqualTo(5f);
  }

  @Test
  public void setXWithDate_hasXListNotEmpty() {
    //when
    bars.setX(Arrays.asList(new Date()));
    //then
    Assertions.assertThat(bars.getX()).isNotEmpty();
  }

}

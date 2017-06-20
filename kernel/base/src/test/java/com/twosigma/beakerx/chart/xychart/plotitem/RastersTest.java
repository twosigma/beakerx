/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
import java.util.List;

public class RastersTest {

  Rasters rasters;

  @Before
  public void setUp() throws Exception {
    rasters = new Rasters();
  }

  @Test
  public void createRastersByEmptyConstructor_hasPositionEqualsZoomable() {
    //when
    Rasters rasters = new Rasters();
    //then
    Assertions.assertThat(rasters.getPosition()).isEqualTo("zoomable");
  }

  @Test
  public void setWidthWithIntList_hasWidthListIsNotNull() {
    //when
    rasters.setWidth(Arrays.asList(10, 20));
    //then
    Assertions.assertThat(rasters.getWidth()).isNotEmpty();
  }

  @Test
  public void setHeightWithIntList_hasHeightListIsNotNull() {
    //when
    rasters.setHeight(Arrays.asList(10, 20));
    //then
    Assertions.assertThat(rasters.getHeight()).isNotEmpty();
  }

  @Test
  public void setOpacityWithIntList_hasOpacityListIsNotNull() {
    //when
    rasters.setOpacity(Arrays.asList(10, 20));
    //then
    Assertions.assertThat(rasters.getOpacity().size()).isEqualTo(2);
  }

  @Test
  public void getOpacity_generateOpacityListFromWidthList() {
    //when
    rasters.setWidth(Arrays.asList(10, 20));
    List<Number> opacityList = rasters.getOpacity();
    //then
    Assertions.assertThat(opacityList.size()).isEqualTo(2);
  }

  @Test
  public void createRastersByEmptyConstructor_hasPossibleFiltersIsNull(){
    //when
    Rasters rasters = new Rasters();
    //when
    Assertions.assertThat(rasters.getPossibleFilters()).isNull();
  }

}

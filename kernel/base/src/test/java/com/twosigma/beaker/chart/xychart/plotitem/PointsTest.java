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
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

public class PointsTest {

  Points points;

  @Before
  public void setUp() throws Exception {
    points = new Points();
  }

  @Test
  public void createPointsByEmptyConstructor_hasSizeAndShapeIsNotNull() {
    //when
    Points points = new Points();
    //then
    Assertions.assertThat(points.getSize()).isNotNull();
    Assertions.assertThat(points.getShape()).isNotNull();
  }

  @Test
  public void setSizeWithIntegerList_hasSizeListIsNotNull() {
    //when
    points.setSize(Arrays.asList(new Integer(10), new Integer(20)));
    //then
    Assertions.assertThat(points.getSizes()).isNotNull();
  }

  @Test
  public void setShapeWithShapeTypeListParam_hasShapeListIsNotNull() {
    //when
    points.setShape(Arrays.asList(ShapeType.values()));
    //then
    Assertions.assertThat(points.getShapes()).isNotNull();
  }

  @Test
  public void setColorWithAwtColorParam_pointsHasBeakerColor() {
    //when
    points.setColor(java.awt.Color.GREEN);
    //then
    Assertions.assertThat(points.getColor() instanceof Color).isTrue();
  }

  @Test
  public void setOutlineColorWithAwtColor_hasOutlineColor() {
    //when
    points.setOutlineColor(java.awt.Color.BLUE);
    //then
    Assertions.assertThat(points.getOutlineColor()).isEqualTo(Color.BLUE);
  }

  @Test
  public void setOutlineColorWithList_hasOutlineColorListIsNotNull() {
    //when
    points.setOutlineColor(Arrays.asList(Color.BLUE, Color.GREEN));
    //then
    Assertions.assertThat(points.getOutlineColors()).isNotNull();
  }

  @Test
  public void setOutlineColorWithListOfAwtColors_hasOutlineColorListIsNotEmpty() {
    //when
    points.setOutlineColor(Arrays.asList(java.awt.Color.BLUE, java.awt.Color.GREEN));
    //then
    Assertions.assertThat(points.getOutlineColors()).isNotEmpty();
  }

  @Test
  public void createPointsByEmptyConstructor_hasPossibleFiltersIsNotEmpty(){
    //when
    Points points = new Points();
    //when
    Assertions.assertThat(points.getPossibleFilters()).isNotEmpty();
  }

}

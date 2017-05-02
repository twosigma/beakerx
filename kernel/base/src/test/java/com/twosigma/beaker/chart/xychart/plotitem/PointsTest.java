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

public class PointsTest {

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
    Points points = new Points();
    //then
    points.setSize(Arrays.asList(new Integer(10), new Integer(20)));
    Assertions.assertThat(points.getSizes()).isNotNull();
  }

  @Test
  public void setShapeWithShapeTypeListParam_hasShapeListIsNotNull() {
    //when
    Points points = new Points();
    //then
    points.setShape(Arrays.asList(ShapeType.values()));
    Assertions.assertThat(points.getShapes()).isNotNull();
  }

  @Test
  public void setColorWithAwtColorParam_pointsHasBeakerColor() {
    //when
    Points points = new Points();
    points.setColor(java.awt.Color.GREEN);
    //then
    Assertions.assertThat(points.getColor() instanceof Color).isTrue();
  }
}

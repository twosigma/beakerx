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

package com.twosigma.beakerx.scala.chart.xychart.plotitem;

import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.xychart.plotitem.StrokeType;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class CrosshairTest {

  @Test
  public void createCrosshairThreeParams_hasColorWidthAndStrokeTypeIsNotNull() {
    Color testColor = Color.GREEN;
    Float testWidth = 0.7f;
    StrokeType testType = StrokeType.DOT;
    //when
    Crosshair crosshair = new Crosshair(testColor, testWidth, testType);
    //then
    Assertions.assertThat(crosshair.getWidth()).isEqualTo(testWidth);
    Assertions.assertThat(crosshair.getColor()).isEqualTo(testColor);
    Assertions.assertThat(crosshair.getStyle()).isEqualTo(testType);
  }

  @Test
  public void setColorWithAwtColor_crosshairHasBeakerColor() {
    Crosshair crosshair = new Crosshair();
    //when
    crosshair.setColor(java.awt.Color.GREEN);
    //then
    Assertions.assertThat(crosshair.getColor() instanceof Color).isTrue();
  }

}

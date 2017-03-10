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

package com.twosigma.beaker.chart;

import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.util.Arrays;

public class GradientColorTest {

  @Test
  public void createGradientColorWithArrayBeakerColorParam_hasArrayBeakerColorsIsNotEmpty() {
    //when
    GradientColor gradientColor = new GradientColor(new Color[] {Color.black, Color.blue});
    //then
    Assertions.assertThat(gradientColor.getColors()[0] instanceof Color).isTrue();
    Assertions.assertThat(gradientColor.getColors()[1] instanceof Color).isTrue();
  }

  @Test
  public void createGradientColorWithArraylistAwtColorParam_hasArrayBeakerColorsIsNotEmpty() {
    //when
    GradientColor gradientColor =
        new GradientColor(Arrays.asList(java.awt.Color.GREEN, java.awt.Color.BLUE));
    //then
    Assertions.assertThat(gradientColor.getColors()[0] instanceof Color).isTrue();
    Assertions.assertThat(gradientColor.getColors()[1] instanceof Color).isTrue();
  }
}

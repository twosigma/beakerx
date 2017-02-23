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

package com.twosigma.beaker.chart.treemap.util;

import com.twosigma.beaker.chart.Color;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class ColorUtilsTest {

  @Test
  public void callInterpolateColorWithGreenBlueColors_returnBeakerColorWithRGB() {
    //when
    Color color = ColorUtils.interpolateColor(java.awt.Color.GREEN, java.awt.Color.BLUE, 0.1f);
    //then
    Assertions.assertThat(color.getRGB()).isNotZero();
  }

  @Test
  public void
      callInterpolateColorWithGreenBlueColorsAndFractionIsZero_returnBeakerColorWithGreenValue() {
    //when
    Color color = ColorUtils.interpolateColor(java.awt.Color.GREEN, java.awt.Color.BLUE, 0f);
    //then
    Assertions.assertThat(color).isEqualTo(Color.GREEN);
  }

  @Test
  public void
      callInterpolateColorWithGreenBlueColorsAndFractionIsOne_returnBeakerColorWithBlueValue() {
    //when
    Color color = ColorUtils.interpolateColor(java.awt.Color.GREEN, java.awt.Color.BLUE, 1f);
    //then
    Assertions.assertThat(color).isEqualTo(Color.BLUE);
  }
}

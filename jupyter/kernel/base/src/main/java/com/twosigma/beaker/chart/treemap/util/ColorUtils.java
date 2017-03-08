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

public class ColorUtils {

  public static Color interpolateColor(final java.awt.Color COLOR1,
                                       final java.awt.Color COLOR2,
                                       float fraction) {
    final float INT_TO_FLOAT_CONST = 1f / 255f;
    fraction = Math.min(fraction, 1f);
    fraction = Math.max(fraction, 0f);

    final float RED1 = COLOR1.getRed() * INT_TO_FLOAT_CONST;
    final float GREEN1 = COLOR1.getGreen() * INT_TO_FLOAT_CONST;
    final float BLUE1 = COLOR1.getBlue() * INT_TO_FLOAT_CONST;
    final float ALPHA1 = COLOR1.getAlpha() * INT_TO_FLOAT_CONST;

    final float RED2 = COLOR2.getRed() * INT_TO_FLOAT_CONST;
    final float GREEN2 = COLOR2.getGreen() * INT_TO_FLOAT_CONST;
    final float BLUE2 = COLOR2.getBlue() * INT_TO_FLOAT_CONST;
    final float ALPHA2 = COLOR2.getAlpha() * INT_TO_FLOAT_CONST;

    final float DELTA_RED = RED2 - RED1;
    final float DELTA_GREEN = GREEN2 - GREEN1;
    final float DELTA_BLUE = BLUE2 - BLUE1;
    final float DELTA_ALPHA = ALPHA2 - ALPHA1;

    float red = RED1 + (DELTA_RED * fraction);
    float green = GREEN1 + (DELTA_GREEN * fraction);
    float blue = BLUE1 + (DELTA_BLUE * fraction);
    float alpha = ALPHA1 + (DELTA_ALPHA * fraction);

    red = Math.min(red, 1f);
    red = Math.max(red, 0f);
    green = Math.min(green, 1f);
    green = Math.max(green, 0f);
    blue = Math.min(blue, 1f);
    blue = Math.max(blue, 0f);
    alpha = Math.min(alpha, 1f);
    alpha = Math.max(alpha, 0f);

    return new Color((new java.awt.Color(red, green, blue, alpha)).getRGB());
  }

}

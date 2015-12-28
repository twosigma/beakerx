/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class ChartUtils {

  public static class ColorPalette {
    private static final List<Color> colors = new ArrayList<>(Arrays.asList(new Color[]{
      new Color(140, 29, 23), // red
      new Color(33, 87, 141), // blue
      new Color(150, 130, 54),// yellow
      new Color(20, 30, 120), // violet
      new Color(54, 100, 54), // green
      new Color(60, 30, 50),  // dark
    }));

    public static Color getColor(int i) {
      return i < colors.size() ? colors.get(i) : createNiceColor();
    }

    public static Color createNiceColor() {
      Random random = new Random();
      final float hue = random.nextFloat();
      final float saturation = 0.75f;
      final float luminance = 0.85f;
      Color niceColor = new Color(java.awt.Color.getHSBColor(hue, saturation, luminance).getRGB());
      while (colors.contains(niceColor)) {
        niceColor = createNiceColor();
      }
      return niceColor;
    }
  }

  public static List<Object> convertColors(List colors, String errorMsg) {
    List<Object> clist = new ArrayList<>(colors.size());
    for(Object c : colors){
      if (c instanceof Color) {
        clist.add(c);
      } else if (c instanceof java.awt.Color) {
        clist.add(new Color((java.awt.Color) c));
      } else if (c instanceof List) {
        clist.add(convertColors((List)c, errorMsg));
      } else {
        throw new IllegalArgumentException(errorMsg);
      }
    }
    return clist;
  }

}

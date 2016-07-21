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

import java.io.Serializable;
import java.util.List;

public class GradientColor implements Serializable{
  public final static GradientColor BROWN_RED_YELLOW = new GradientColor(new Color[]{ new Color(120, 0, 4),
                                                                                      new Color(241, 88, 6),
                                                                                      new Color(255, 206, 31)});
  public final static GradientColor GREEN_YELLOW_WHITE = new GradientColor(new Color[]{ new Color(0, 170, 0),
                                                                                        new Color(102, 204, 0),
                                                                                        new Color(238, 238, 0),
                                                                                        new Color(238, 187, 68),
                                                                                        new Color(238, 187, 153),
                                                                                        new Color(255, 255, 255)});
  public final static GradientColor WHITE_BLUE = new GradientColor(new Color[]{ new Color(255, 255, 217),
                                                                                new Color(237, 248, 177),
                                                                                new Color(199, 233, 180),
                                                                                new Color(127, 205, 187),
                                                                                new Color(65, 182, 196),
                                                                                new Color(29, 145, 192),
                                                                                new Color(34, 94, 168),
                                                                                new Color(37, 52, 148),
                                                                                new Color(8, 29, 88)});

  private Color[] colors;

  protected GradientColor(Color[] colors){
    this.colors = colors;
  }

  public GradientColor(List<Object> colors){
    if (colors != null && colors.size() > 0) {
      this.colors = new Color[colors.size()];
      for (int i = 0; i < colors.size(); i++) {
        Object c = colors.get(i);
        if (c instanceof Color) {
          this.colors[i] = (Color) c;
        } else if (c instanceof java.awt.Color) {
          this.colors[i] = new Color((java.awt.Color) c);
        } else {
          throw new IllegalArgumentException("GradientColor takes List of Color");
        }
      }
    } else {
      this.colors = GradientColor.BROWN_RED_YELLOW.getColors();
    }
  }

  public Color[] getColors() {
    return colors;
  }

}

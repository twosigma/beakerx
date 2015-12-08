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
import net.sf.jtreemap.swing.TreeMapNode;


public class RandomColorProvider extends ColorProvider {

  private static final Color[] COLOURS = new Color[]{new Color(33, 87, 141), // blue
                                                     new Color(140, 29, 23), // red
                                                     new Color(150, 130, 54),// yellow
                                                     new Color(20, 30, 120), // violet
                                                     new Color(54, 100, 54), // green
                                                     new Color(0, 30, 50),   // dark
                                                     new Color(102, 102, 51),
                                                     new Color(255, 51, 153),
                                                     new Color(255, 153, 51),
                                                     new Color(204, 204, 51),
                                                     new Color(205, 102, 204),
                                                     new Color(51, 153, 255),
                                                     new Color(153, 102, 0)};

  private int cursor = 0;

  private final java.util.TreeMap<Double, Color> mapping = new java.util.TreeMap<>();

  public RandomColorProvider() {
    this.colours = COLOURS;
  }

  public RandomColorProvider(final Color[] colours) {
    this.colours = colours;
  }

  private final Color[] colours;

  @Override
  public Color getColor(final TreeMapNode node) {
    double value = getValue(node);
    if (!this.mapping.containsKey(value)) {
      mapping.put(value, colours[this.cursor]);
      cursor++;
      if (this.cursor == colours.length) {
        cursor = 0;
      }
    }
    return mapping.get(value);
  }

}


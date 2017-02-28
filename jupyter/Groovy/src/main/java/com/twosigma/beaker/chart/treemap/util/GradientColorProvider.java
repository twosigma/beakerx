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
import com.twosigma.beaker.chart.treemap.TreeMap;
import net.sf.jtreemap.swing.TreeMapNode;


public class GradientColorProvider extends ColorProvider {

  private java.awt.Color start;
  private java.awt.Color end;

  public GradientColorProvider(TreeMap treeMap, Color start, Color end) {
    valueAccessor = treeMap.getValueAccessor();

    this.start = new java.awt.Color(start.getRGB());
    this.end =   new java.awt.Color(end.getRGB());;

    setValues(treeMap.getRoot());
  }

  public GradientColorProvider(TreeMap treeMap) {
    this(treeMap, Color.RED, Color.GREEN);
  }


  @Override
  public Color getColor(TreeMapNode node) {
    double value = getValue(node);
    float result = (float) ((value - minValue) / (maxValue - minValue));
    return ColorUtils.interpolateColor(start,
                                       end,
                                       result);
  }


}

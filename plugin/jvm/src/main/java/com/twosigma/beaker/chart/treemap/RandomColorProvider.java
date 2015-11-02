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

package com.twosigma.beaker.chart.treemap;

import net.sf.jtreemap.swing.ColorProvider;
import net.sf.jtreemap.swing.TreeMapNode;
import net.sf.jtreemap.swing.Value;

import javax.swing.*;
import java.awt.*;
import java.util.Enumeration;

/**
 * Code based on the JTreeMap library
 * <p>
 * <p>
 * ColorProvider who choose the color between 13 predefined COLOURS.
 * </p>
 * <p>
 * Each value is associated to a color. If all the COLOURS are already
 * associated the new value is associated to the first color (and so on...)
 * </p>
 *
 * @author Laurent DUTHEIL
 */
public class RandomColorProvider extends ColorProvider {
  /**
   *
   */
  private static final long serialVersionUID = -8184356270950978553L;

  private static final Color[] COLOURS = new Color[]{new Color(255, 0, 0),
                                                     new Color(0, 255, 0),
                                                     new Color(0, 0, 255),
                                                     new Color(255, 255, 0),
                                                     new Color(255, 0, 255),
                                                     new Color(0, 255, 255),
                                                     new Color(102, 102, 51),
                                                     new Color(255, 51, 153),
                                                     new Color(255, 153, 51),
                                                     new Color(204, 204, 51),
                                                     new Color(205, 102, 204),
                                                     new Color(51, 153, 255),
                                                     new Color(153, 102, 0)};

  private int cursor = 0;

  private final java.util.TreeMap<Value, Color> mapping = new java.util.TreeMap<Value, Color>();

  public RandomColorProvider() {
  }

  /*
   * (non-Javadoc)
   *
   * @see net.sf.jtreemap.swing.ColorProvider#getColor(double)
   */
  @Override
  public Color getColor(final Value value) {
    if (!this.mapping.containsKey(value)) {
      mapping.put(value, COLOURS[this.cursor]);
      cursor++;
      if (this.cursor == COLOURS.length) {
        cursor = 0;
      }
    }
    return mapping.get(value);
  }


  void setValues(final TreeMapNode root) {
    if (root.isLeaf()) {
      final Value value = root.getValue();
      getColor(value);
    } else {
      for (final Enumeration e = root.children(); e.hasMoreElements(); ) {
        final TreeMapNode node = (TreeMapNode) e.nextElement();
        setValues(node);
      }
    }
  }

  /*
   * (non-Javadoc)
   *
   * @see net.sf.jtreemap.swing.ColorProvider#getLegendPanel()
   */
  @Override
  public JPanel getLegendPanel() {
    return null;
  }
}

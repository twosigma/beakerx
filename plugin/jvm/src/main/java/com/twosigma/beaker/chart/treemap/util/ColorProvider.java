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
import com.twosigma.beaker.chart.treemap.ValueAccessor;
import net.sf.jtreemap.swing.TreeMapNode;

import java.io.Serializable;
import java.util.Enumeration;

public abstract class ColorProvider implements Serializable {

  protected ValueAccessor valueAccessor = ValueAccessor.VALUE;

  public abstract Color getColor(TreeMapNode value);

  protected void setValues(final TreeMapNode root) {
    if (root.isLeaf()) {
      double value;
      if (valueAccessor == ValueAccessor.VALUE) {
        if (root.getValue() == null) {
          return;
        }
        value = root.getValue().getValue();
      } else {
        value = root.getWeight();
      }

      if (maxValue == null || value >= maxValue) {
        maxValue = value;
      }
      if (minValue == null || value <= minValue) {
        minValue = value;
      }
    } else {
      for (final Enumeration e = root.children(); e.hasMoreElements(); ) {
        final TreeMapNode node = (TreeMapNode) e.nextElement();
        setValues(node);
      }
    }
  }

  protected double getValue(TreeMapNode node) {
    return (node != null ? ((valueAccessor == ValueAccessor.VALUE) ?
      node.getValue().getValue() : node.getWeight()) : 0.00);
  }

  protected Double maxValue;

  protected Double minValue;
}

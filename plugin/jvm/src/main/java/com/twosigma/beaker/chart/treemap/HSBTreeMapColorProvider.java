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
 * An HSB color space color provider for JTreeMap. Uses a specified function to
 * map the values onto the HSB color space. The default is a linear function,
 * but in my experience one of the logarithmic ones works best for this color
 * space.
 *
 * @author Andy Adamczak
 */
public class HSBTreeMapColorProvider extends ColorProvider {
  private static final int HSBVAL_SIZE = 3;

  /**
   * @author Andy Adamczak
   */
  public enum ColorDistributionTypes {
    Linear, Log, Exp, SquareRoot, CubicRoot
  }

  /**
   * @param treeMap
   * @param color
   */
  public HSBTreeMapColorProvider(final TreeMap treeMap, final Color color) {
    this(treeMap, ColorDistributionTypes.Linear, color, color);
  }

  /**
   * @param treeMap
   * @param colorDistribution
   * @param color
   */
  public HSBTreeMapColorProvider(final TreeMap treeMap,
                                 final ColorDistributionTypes colorDistribution,
                                 final Color color) {
    this(treeMap, colorDistribution, color, color);
  }

  /**
   * @param treeMap
   * @param positiveColor
   * @param negativeColor
   */
  public HSBTreeMapColorProvider(final TreeMap treeMap,
                                 final Color positiveColor,
                                 final Color negativeColor) {
    this(treeMap, ColorDistributionTypes.Linear, positiveColor, negativeColor);
  }

  /**
   * @param treeMap
   * @param colorDistribution
   * @param positiveColor
   * @param negativeColor
   */
  public HSBTreeMapColorProvider(final TreeMap treeMap,
                                 final ColorDistributionTypes colorDistribution,
                                 final Color positiveColor,
                                 final Color negativeColor) {
    super();
    this.treeMap = treeMap;
    this.colorDistribution = colorDistribution;
    adjustColor(positiveColor, negativeColor);
  }

  /**
   * @param treeMap
   * @param hue
   * @param saturation
   */
  public HSBTreeMapColorProvider(final TreeMap treeMap, final float hue, final float saturation) {
    this(treeMap, ColorDistributionTypes.Linear, hue, saturation, hue, saturation);
  }

  /**
   * @param treeMap
   * @param colorDistribution
   * @param hue
   * @param saturation
   */
  public HSBTreeMapColorProvider(final TreeMap treeMap,
                                 final ColorDistributionTypes colorDistribution,
                                 final float hue,
                                 final float saturation) {
    this(treeMap, colorDistribution, hue, saturation, hue, saturation);
  }

  /**
   * @param treeMap
   * @param positiveHue
   * @param positiveSaturation
   * @param negativeHue
   * @param negativeSaturation
   */
  public HSBTreeMapColorProvider(final TreeMap treeMap,
                                 final float positiveHue,
                                 final float positiveSaturation,
                                 final float negativeHue,
                                 final float negativeSaturation) {
    this(treeMap,
         ColorDistributionTypes.Linear,
         positiveHue,
         positiveSaturation,
         negativeHue,
         negativeSaturation);
  }

  /**
   * @param treeMap
   * @param colorDistribution
   * @param positiveHue
   * @param positiveSaturation
   * @param negativeHue
   * @param negativeSaturation
   */
  public HSBTreeMapColorProvider(final TreeMap treeMap,
                                 final ColorDistributionTypes colorDistribution,
                                 final float positiveHue,
                                 final float positiveSaturation,
                                 final float negativeHue,
                                 final float negativeSaturation) {
    super();
    this.treeMap = treeMap;
    this.colorDistribution = colorDistribution;
    adjustColor(positiveHue, positiveSaturation, negativeHue, negativeSaturation);
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

  /**
   * @param color
   */
  public void adjustColor(final Color color) {
    adjustColor(color, color);
  }

  /**
   * @param positiveColor
   * @param negativeColor
   */
  public void adjustColor(final Color positiveColor, final Color negativeColor) {
    // Figure out the hue of the passed in colors. Note, greys will map to
    // reds in this color space, so use the
    // hue/saturation
    // constructions for grey scales.
    float[] hsbvals = new float[HSBVAL_SIZE];

    hsbvals = Color.RGBtoHSB(positiveColor.getRed(),
                             positiveColor.getGreen(),
                             positiveColor.getBlue(),
                             hsbvals);
    positiveHue = hsbvals[0];
    positiveSaturation = 1f;

    hsbvals = Color.RGBtoHSB(negativeColor.getRed(),
                             negativeColor.getGreen(),
                             negativeColor.getBlue(),
                             hsbvals);
    negativeHue = hsbvals[0];
    negativeSaturation = 1f;
  }

  /**
   * @param hue
   * @param saturation
   */
  public void adjustColor(final float hue, final float saturation) {
    adjustColor(hue, saturation, hue, saturation);
  }

  /**
   * @param posHue
   * @param posSaturation
   * @param negHue
   * @param negSaturation
   */
  public void adjustColor(final float posHue,
                          final float posSaturation,
                          final float negHue,
                          final float negSaturation) {
    this.positiveHue = posHue;
    this.positiveSaturation = posSaturation;
    this.negativeHue = negHue;
    this.negativeSaturation = negSaturation;
  }

  /*
   * (non-Javadoc)
   *
   * @see net.sf.jtreemap.swing.ColorProvider#getColor(net.sf.jtreemap.swing.Value)
   */
  @Override
  public Color getColor(final Value value) {
    // Figure out the current range of colors, map that range into a scale
    // from 0 to 1,
    // using the specified distribution type
    if (maxValue == null || minValue == null) {
      setValues(treeMap.getRoot());
    }
    final double max = this.maxValue.getValue();
    final double min = this.minValue.getValue();
    double val = (value != null ? value.getValue() : 0.00);

    if (val >= 0) {
      // Value is greater than 0, use the positive colors
      double range = max - Math.max(0, min);
      val -= Math.max(0, min);
      range = adjustValue(range);
      return Color.getHSBColor(positiveHue, positiveSaturation, (float) (adjustValue(val) / range));
    }

    // Value is less than 0, use the negative colors
    double range = Math.abs(min - Math.min(0, max));
    val += Math.min(0, max);
    val = Math.abs(val);
    // Value and range are not positive values, we need them to be for the
    // math functions
    range = adjustValue(range);
    return Color.getHSBColor(negativeHue, negativeSaturation, (float) (adjustValue(val) / range));
  }

  /**
   * Given a value, maps that value to a new value using the specified math
   * function
   *
   * @param value the value to convert
   * @return the converted value
   */
  private double adjustValue(final double value) {
    double ret = value;
    switch (colorDistribution) {
      case Log:
        ret = Math.log1p(value);
        break;
      case Exp:
        ret = Math.exp(value);
        break;
      case SquareRoot:
        ret = Math.sqrt(value);
        break;
      case CubicRoot:
        ret = Math.cbrt(value);
        break;
      default:
        // Linear
        ret = value;
        break;
    }
    return ret;
  }

  /**
   * Set the max and the min values in the tree map
   *
   * @param root root of the JTreeMap
   */
  private void setValues(final TreeMapNode root) {
    if (root.isLeaf()) {
      final Value value = root.getValue();

      if (value == null) {
        return;
      }

      if (maxValue == null || value.getValue() >= maxValue.getValue()) {
        try {
          final Class c = value.getClass();
          if (maxValue == null) {
            maxValue = (Value) (c.newInstance());
          }
          maxValue.setValue(value.getValue());
        } catch (final IllegalAccessException iae) {
          // ignore
        } catch (final InstantiationException ie) {
          // Ignore
          ie.printStackTrace();
        }
      }

      if (minValue == null || value.getValue() <= minValue.getValue()) {
        try {
          final Class c = value.getClass();
          if (minValue == null) {
            minValue = (Value) (c.newInstance());
          }
          minValue.setValue(value.getValue());
        } catch (final IllegalAccessException iae) {
          // ignore
        } catch (final InstantiationException ie) {
          // Ignore
          ie.printStackTrace();
        }
      }
    } else {
      for (final Enumeration e = root.children(); e.hasMoreElements(); ) {
        final TreeMapNode node = (TreeMapNode) e.nextElement();
        setValues(node);
      }
    }
  }

  private TreeMap treeMap;

  private Value maxValue;

  private Value minValue;

  private float positiveHue;

  private float negativeHue;

  private float positiveSaturation = 1f;

  private float negativeSaturation = 1f;

  private ColorDistributionTypes colorDistribution = ColorDistributionTypes.Linear;

}

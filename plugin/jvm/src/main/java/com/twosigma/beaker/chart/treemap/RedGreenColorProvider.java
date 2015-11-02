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

/**
 * Code based on the JTreeMap library
 *
 * ColorProvider who, with a max absolute value M, choose the color between
 * values -M and M.
 * 
 * @author Laurent Dutheil
 */

public class RedGreenColorProvider extends ColorProvider {
    private static final int COLOUR_MAX_VALUE = 255;

    private final TreeMap treeMap;

    private Value maxAbsValue;

    private Value minVal;

    private final int[] tabColor = {0, 60, 102, 153, 204, COLOUR_MAX_VALUE};

    private static final int[] TAB_LIMIT_VALUE = {25, 76, 123, 179, 230, COLOUR_MAX_VALUE};


    public RedGreenColorProvider(final TreeMap treeMap) {
        this.treeMap = treeMap;
    }

    @Override
    public Color getColor(final Value value) {
        // update the max absolute value
        if (this.maxAbsValue == null) {
            setMaxValue(this.treeMap.getRoot());
        }

        final double dValeur = (value != null ? value.getValue() : 0.00);

        int colorIndex = (int) (COLOUR_MAX_VALUE * Math.abs(dValeur) / this.maxAbsValue.getValue());

        if (colorIndex > COLOUR_MAX_VALUE) {
            colorIndex = COLOUR_MAX_VALUE;
        }

        for (int i = 0; i < TAB_LIMIT_VALUE.length; i++) {
            if (colorIndex <= TAB_LIMIT_VALUE[i]) {
                colorIndex = this.tabColor[i];
                break;
            }
        }

        if (dValeur >= 0) {
            return new Color(0, colorIndex, 0);
        }
        return new Color(colorIndex, 0, 0);
    }

    @Override
    public JPanel getLegendPanel() {
        return null;
    }

    private void setMaxValue(final TreeMapNode root) {
        if (root.isLeaf()) {
            final Value value = root.getValue();
            if (value != null && (this.maxAbsValue == null || Math.abs(value.getValue()) > this.maxAbsValue
              .getValue())) {
                try {
                    final Class c = value.getClass();
                    if (this.maxAbsValue == null || this.minVal == null) {
                        this.maxAbsValue = (Value) (c.newInstance());
                        this.minVal = (Value) (c.newInstance());
                    }
                    this.minVal.setValue(-Math.abs(value.getValue()));
                    this.maxAbsValue.setValue(Math.abs(value.getValue()));
                } catch (final IllegalAccessException | InstantiationException ie) {
                    // ignore
                }
            }
        } else {
            for (final TreeMapNode node : root.getChildren()) {
                setMaxValue(node);
            }
        }
    }
}

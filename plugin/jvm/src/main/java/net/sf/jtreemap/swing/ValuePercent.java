/*
 * ObjectLab, http://www.objectlab.co.uk/open is supporting JTreeMap.
 * 
 * Based in London, we are world leaders in the design and development 
 * of bespoke applications for the securities financing markets.
 * 
 * <a href="http://www.objectlab.co.uk/open">Click here to learn more</a>
 *           ___  _     _           _   _          _
 *          / _ \| |__ (_) ___  ___| |_| |    __ _| |__
 *         | | | | '_ \| |/ _ \/ __| __| |   / _` | '_ \
 *         | |_| | |_) | |  __/ (__| |_| |__| (_| | |_) |
 *          \___/|_.__// |\___|\___|\__|_____\__,_|_.__/
 *                   |__/
 *
 *                     www.ObjectLab.co.uk
 *
 * $Id: ColorProvider.java 69 2006-10-24 16:20:20Z benoitx $
 * 
 * Copyright 2006 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package net.sf.jtreemap.swing;

import java.text.NumberFormat;

/**
 * class who can display the values of elements of a JTreeMap with pourcent
 * 
 * @author Laurent Dutheil
 */

public class ValuePercent extends Value {
    private static final long serialVersionUID = 1087258219010392928L;
    private double value;
    private final NumberFormat nf;

    /**
     * Constructor of ValuePercent
     */
    public ValuePercent() {
        this.nf = NumberFormat.getInstance();
        this.nf.setMaximumFractionDigits(2);
        this.nf.setMinimumFractionDigits(2);
        this.nf.setMinimumIntegerDigits(1);
    }

    /**
     * Constructor of ValuePercent
     * 
     * @param value
     *            double value
     */
    public ValuePercent(final double value) {
        this();
        this.value = value;
    }

    @Override
    public void setValue(final double d) {
        this.value = d;
    }

    @Override
    public void setLabel(final String stLibelle) {
        // ignore
    }

    @Override
    public double getValue() {
        return this.value;
    }

    @Override
    public String getLabel() {
        if (this.value >= 0) {
            return "+" + this.nf.format(this.value) + " %";
        }
        return this.nf.format(this.value) + " %";
    }
}
/*
 *                 ObjectLab is supporing JTreeMap
 * 
 * Based in London, we are world leaders in the design and development 
 * of bespoke applications for the securities financing markets.
 * 
 * <a href="http://www.objectlab.co.uk/open">Click here to learn more about us</a>
 *           ___  _     _           _   _          _
 *          / _ \| |__ (_) ___  ___| |_| |    __ _| |__
 *         | | | | '_ \| |/ _ \/ __| __| |   / _` | '_ \
 *         | |_| | |_) | |  __/ (__| |_| |__| (_| | |_) |
 *          \___/|_.__// |\___|\___|\__|_____\__,_|_.__/
 *                   |__/
 *
 *                     www.ObjectLab.co.uk
 */

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
 * $Id: DefaultValue.java 74 2006-10-24 22:19:05Z benoitx $
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

/**
 * Default Value <BR>
 * The getLabel() method returns the "" + getValue()
 * 
 * @author Laurent DUTHEIL
 */
public class DefaultValue extends Value {
    /**
     * 
     */
    private static final long serialVersionUID = 367321198951855282L;

    private double value;

    /**
     * Constructor.
     */
    public DefaultValue() {
        // nothing to do
    }

    /**
     * Constructor.
     * 
     * @param value
     *            double value
     */
    public DefaultValue(final double value) {
        this.value = value;
    }

    /*
     * (non-Javadoc)
     * 
     * @see net.sf.jtreemap.swing.Value#getValue()
     */
    @Override
    public double getValue() {
        return this.value;
    }

    /*
     * (non-Javadoc)
     * 
     * @see net.sf.jtreemap.swing.Value#getLabel()
     */
    @Override
    public String getLabel() {
        return "" + this.value;
    }

    /*
     * (non-Javadoc)
     * 
     * @see net.sf.jtreemap.swing.Value#setValue(double)
     */
    @Override
    public void setValue(final double value) {
        this.value = value;
    }

    /*
     * (non-Javadoc)
     * 
     * @see net.sf.jtreemap.swing.Value#setLabel(java.lang.String)
     */
    @Override
    public void setLabel(final String newLabel) {
        // ignore

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

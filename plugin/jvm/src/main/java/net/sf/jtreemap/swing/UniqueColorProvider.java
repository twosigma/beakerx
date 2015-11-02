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
 * $Id: UniqueColorProvider.java 74 2006-10-24 22:19:05Z benoitx $
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

import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JPanel;

/**
 * Color Provider by default.<BR>
 * All values are associated to a unique color.
 * 
 * @author Laurent DUTHEIL
 * 
 */
public class UniqueColorProvider extends ColorProvider {
    /**
     * 
     */
    private static final long serialVersionUID = -7571926934516139432L;

    private static final Color DEFAULT_COLOR = new Color(153, 153, 51);

    private Color color;

    private JPanel legend;

    /**
     * Constructor.
     */
    public UniqueColorProvider() {
        this.color = DEFAULT_COLOR;
    }

    /**
     * Constructor.
     * 
     * @param color
     *            unique color
     */
    public UniqueColorProvider(final Color color) {
        this.color = color;
    }

    /*
     * (non-Javadoc)
     * 
     * @see net.sf.jtreemap.swing.ColorProvider#getColor(double)
     */
    @Override
    public Color getColor(final Value value) {
        return this.color;
    }

    /*
     * (non-Javadoc)
     * 
     * @see net.sf.jtreemap.swing.ColorProvider#getLegendPanel()
     */
    @Override
    public JPanel getLegendPanel() {
        if (this.legend == null) {
            this.legend = new Legend();
        }
        return this.legend;
    }

    /**
     * Panel with the legend.
     * 
     * @author Laurent Dutheil
     */
    private static class Legend extends JPanel {
        private static final int LEGEND_Y_POS = 20;

        private static final int LEGEND_X_POS = 20;

        private static final int LEGEND_HEIGHT = 40;

        private static final int LEGEND_WIDTH = 100;

        private static final long serialVersionUID = -8046211081305644785L;

        private static final String TEXT = "Unique Color Provider";

        /**
         * Constructor.
         */
        public Legend() {
            this.setPreferredSize(new java.awt.Dimension(LEGEND_WIDTH, LEGEND_HEIGHT));

        }

        @Override
        public void paint(final Graphics g) {
            g.setColor(Color.black);
            g.drawString(Legend.TEXT, LEGEND_X_POS, LEGEND_Y_POS);
        }
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

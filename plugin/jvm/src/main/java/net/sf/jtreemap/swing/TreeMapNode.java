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
 * $Id: TreeMapNode.java 145 2011-09-30 09:25:10Z jense128 $
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

import java.util.Enumeration;
import java.util.List;

import javax.swing.tree.DefaultMutableTreeNode;

/**
 * Node of a JTreeMap.<BR>
 * 
 * If the node is a branch, only the label is set.<BR>
 * If the node is a leaf, we need a label, a weight and a value.
 * <p>
 * You can also use a TreeMapNode in a JTree.
 * 
 * @author Laurent Dutheil
 */

public class TreeMapNode extends DefaultMutableTreeNode {
    private static final int DEFAULT_BORDER_SIZE = 3;

    private static final long serialVersionUID = 742372833853976103L;

    // max border between two nodes of the same level
    private static int border = DEFAULT_BORDER_SIZE;

    private int height;
    private Value value;
    private double weight = 0.0;
    private int width;
    private int x;
    private int y;

    /**
     * Get the max border between two nodes of the same level.
     * 
     * @return Returns the border.
     */
    public static int getBorder() {
        return TreeMapNode.border;
    }

    /**
     * Set the max border between two nodes of the same level.
     * 
     * @param border
     *            The border to set.
     */
    public static void setBorder(final int border) {
        TreeMapNode.border = border;
    }

    /**
     * Constructor for a branch.
     * 
     * @param label
     *            label of the branch.
     */
    public TreeMapNode(final String label) {
        super(label);
        super.allowsChildren = true;
    }

    /**
     * Constructor for a leaf.
     * 
     * @param label
     *            label of the leaf.
     * @param weight
     *            weight of the leaf (if negative, we take the absolute value).
     * @param value
     *            Value associee a la feuille
     */
    public TreeMapNode(final String label, final double weight, final Value value) {
        super(label);
        // the weight must be positive
        this.weight = Math.abs(weight);
        this.value = value;
        super.allowsChildren = false;
    }

    /**
     * add a new child to the node.
     * 
     * @param newChild
     *            new child
     */
    public void add(final TreeMapNode newChild) {
        super.add(newChild);
        this.setWeight(this.weight + newChild.getWeight());
    }

    /**
     * get the active leaf.<BR>
     * null if the passed position is not in this tree.
     * 
     * @param xParam
     *            x-coordinate
     * @param yParam
     *            y-coordinate
     * @return active leaf
     */
    public TreeMapNode getActiveLeaf(final int xParam, final int yParam) {

        if (this.isLeaf()) {
            if ((xParam >= this.getX()) && (xParam <= this.getX() + this.getWidth()) && (yParam >= this.getY()) && (yParam <= this.getY() + this.getHeight())) {
                return this;
            }
        } else {
            for (final Enumeration e = this.children(); e.hasMoreElements();) {
                final TreeMapNode node = (TreeMapNode) (e.nextElement());
                if ((xParam >= node.getX()) && (xParam <= node.getX() + node.getWidth()) && (yParam >= node.getY())
                        && (yParam <= node.getY() + node.getHeight())) {
                    return node.getActiveLeaf(xParam, yParam);
                }
            }
        }
        return null;
    }

    /**
     * get the first child which fits the position.<BR>
     * null if the passed position is not in this tree.
     * 
     * @param xParam
     *            x-coordinate
     * @param yParam
     *            y-coordinate
     * @return the first child which fits the position.
     */
    public TreeMapNode getChild(final int xParam, final int yParam) {
        if (!this.isLeaf()) {
            for (final Enumeration e = this.children(); e.hasMoreElements();) {
                final TreeMapNode node = (TreeMapNode) (e.nextElement());
                if ((xParam >= node.getX()) && (xParam <= node.getX() + node.getWidth()) && (yParam >= node.getY())
                        && (yParam <= node.getY() + node.getHeight())) {
                    return node;
                }
            }

        }
        return null;
    }

    /**
     * get a List with the children.
     * 
     * @return List with the children
     */
    @SuppressWarnings("unchecked")
    public List<TreeMapNode> getChildren() {
        return this.children;
    }

    /**
     * get the height.
     * 
     * @return the height
     */
    public int getHeight() {
        return this.height;
    }

    /**
     * get the label.
     * 
     * @return the label
     */
    public String getLabel() {
        return getUserObject() != null ? getUserObject().toString() : "";
    }

    /**
     * get the label of the Value.
     * 
     * @return the label of the Value
     */
    public String getLabelValue() {
        return value != null ? this.value.getLabel() : "";
    }

    /**
     * get the Value.
     * 
     * @return the value
     */
    public Value getValue() {
        return this.value;
    }

    /**
     * get the double Value.
     * 
     * @return the double value
     */
    public double getDoubleValue() {
        return this.value.getValue();
    }

    /**
     * get the weight.
     * 
     * @return the weight
     */
    public double getWeight() {
        return this.weight;
    }

    /**
     * get the width.
     * 
     * @return the width
     */
    public int getWidth() {
        return this.width;
    }

    /**
     * get the x-coordinate.
     * 
     * @return the x-coordinate
     */
    public int getX() {
        return this.x;
    }

    /**
     * get the y-coordinate.
     * 
     * @return the y-coordinate
     */
    public int getY() {
        return this.y;
    }

    /**
     * set the position and the size.
     * 
     * @param xParam
     *            x-coordinate
     * @param yParam
     *            y-coordinate
     * @param widthParam
     *            the new width
     * @param heightParam
     *            the new height
     */
    public void setDimension(final int xParam, final int yParam, final int widthParam, final int heightParam) {
        this.x = xParam;
        this.y = yParam;
        this.width = widthParam;
        this.height = heightParam;
    }

    /**
     * set the height.
     * 
     * @param height
     *            la nouvelle valeur de height
     */
    public void setHeight(final int height) {
        this.height = height;
    }

    /**
     * set the label.
     * 
     * @param label
     *            the new label
     */
    public void setLabel(final String label) {
        this.userObject = label;
    }

    /**
     * set the position.
     * 
     * @param xParam
     *            x-coordinate
     * @param yParam
     *            y-coordinate
     */
    public void setPosition(final int xParam, final int yParam) {
        this.x = xParam;
        this.y = yParam;
    }

    /**
     * set size.
     * 
     * @param widthParam
     *            the new width
     * @param heightParam
     *            the new height
     */
    public void setSize(final int widthParam, final int heightParam) {
        this.width = widthParam;
        this.height = heightParam;
    }

    /**
     * set the Value.
     * 
     * @param value
     *            the new Value
     */
    public void setValue(final Value value) {
        this.value = value;
    }

    /**
     * set the weight of the node and update the parents.
     * 
     * @param weight
     *            the new weight
     */
    public void setWeight(final double weight) {
        final double newWeight = Math.abs(weight);
        if (this.parent != null) {
            ((TreeMapNode) this.parent).setWeight(((TreeMapNode) this.parent).weight - this.weight + newWeight);
        }
        this.weight = newWeight;
    }

    /**
     * set the width.
     * 
     * @param width
     *            la nouvelle valeur de width
     */
    public void setWidth(final int width) {
        this.width = width;
    }

    /**
     * set the x-coordinate.
     * 
     * @param x
     *            the new x-coordinate
     */
    public void setX(final int x) {
        this.x = x;
    }

    /**
     * set the y-coordinate.
     * 
     * @param y
     *            the new y-coordinate
     */
    public void setY(final int y) {
        this.y = y;
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

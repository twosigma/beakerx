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
 * $Id: TreeMapNodeBuilder.java 74 2006-10-24 22:19:05Z benoitx $
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

import java.io.Serializable;

/**
 * Tree builder for a JTreeMap.
 * 
 * @author Laurent Dutheil
 */

public class TreeMapNodeBuilder implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = -1340499387405510692L;

    private TreeMapNode root;

    /**
     * Add a branch to the tree. <BR>
     * If the parent is null, the build node become the root if and only if the
     * tree have no root yet. If the parent is null and if the root is already
     * build, the node will NOT be added to the tree.
     * 
     * @param label
     *            label of the node
     * @param parent
     *            father of the node
     * @return the created node
     */
    public TreeMapNode buildBranch(final String label, final TreeMapNode parent) {
        final TreeMapNode node = new TreeMapNode(label);
        if (parent != null) {
            parent.add(node);
        } else if (this.root == null) {
            this.root = node;
        }
        return node;
    }

    /**
     * add a leaf to the tree. <BR>
     * If the parent is null, the build node become the root if and only if the
     * tree have no root yet. If the parent is null and if the root is already
     * build, the node will NOT be added to the tree.
     * 
     * @param label
     *            label of the leaf
     * @param weight
     *            weight of the leaf
     * @param value
     *            Value of the leaf
     * @param parent
     *            father of the leaf
     * @return the created node
     */
    public TreeMapNode buildLeaf(final String label, final double weight, final Value value, final TreeMapNode parent) {
        final TreeMapNode node = new TreeMapNode(label, weight, value);
        if (parent != null) {
            parent.add(node);
        } else if (this.root == null) {
            this.root = node;
        }
        return node;
    }

    /**
     * get the build tree.
     * 
     * @return the root of the tree
     */
    public TreeMapNode getRoot() {
        return this.root;
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

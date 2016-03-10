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

import com.twosigma.beaker.Chart;
import com.twosigma.beaker.chart.treemap.util.ColorProvider;
import com.twosigma.beaker.chart.treemap.util.IToolTipBuilder;
import com.twosigma.beaker.chart.treemap.util.RandomColorProvider;
import net.sf.jtreemap.swing.TreeMapNode;

public class TreeMap extends Chart {

  // root of the tree
  private TreeMapNode root = null;

  // color provider
  private ColorProvider colorProvider = null;

  private IToolTipBuilder toolTipBuilder = null;

  /**
   * If mode is specified, sets the layout algorithm. If mode is not specified, returns the current layout
   * algorithm, which defaults to "squarify". The following modes are supported:
   * <p>
   * squarify - rectangular subdivision; squareness controlled via the target ratio.
   * slice - horizontal subdivision.
   * dice - vertical subdivision.
   * slice-dice - alternating between horizontal and vertical subdivision.
   */
  private Mode mode;


  /**
   * If ratio is specified, sets the layout ratio. If ratio is not specified, returns the current layout
   * ratio, which defaults to .5 * (1 + Math.sqrt(5))
   */
  private Double ratio;

  /**
   * If sticky is specified, sets whether or not the treemap layout is "sticky": a sticky treemap
   * layout will preserve the relative arrangement of nodes across transitions. The allocation of nodes
   * into squarified horizontal and vertical rows is persisted across updates by storing a z attribute
   * on the last element in each row; this allows nodes to be resized smoothly, without shuffling or
   * occlusion that would impede perception of changing values. Note, however, that this results in a
   * suboptimal layout for one of the two states. If sticky is not specified, returns whether the
   * treemap layout is sticky.
   * Implementation note: sticky treemaps cache the array of nodes internally; therefore,
   * it is not possible to reuse the same layout instance on multiple datasets. To reset the
   * cached state when switching datasets with a sticky layout, call sticky(true) again. Since
   * version 1.25.0, hierarchy layouts no longer copy the input data by default on each invocation,
   * so it may be possible to eliminate caching and make the layout fully stateless.
   */
  private Boolean sticky;

  /**
   * If round is specified, sets whether or not the treemap layout will round to exact pixel boundaries.
   * This can be nice to avoid antialiasing artifacts in SVG. If round is not specified, returns whether
   * the treemap will be rounded.
   */
  private Boolean round;


  //determine value accessor for chart
  private ValueAccessor valueAccessor = ValueAccessor.VALUE;

  public TreeMap(final TreeMapNode root) {
    this();
    setRoot(root);
  }

  public TreeMap() {
    setColorProvider(new RandomColorProvider());
    setShowLegend(false);
  }

  /**
   * get the root.
   *
   * @return the root
   */
  public TreeMapNode getRoot() {
    return root;
  }


  /**
   * set the new root.
   *
   * @param newRoot the new root to set
   */
  public void setRoot(final TreeMapNode newRoot) {
    root = newRoot;
  }

  public Mode getMode() {
    return mode;
  }

  public void setMode(Mode mode) {
    this.mode = mode;
  }

  public Double getRatio() {
    return ratio;
  }

  public void setRatio(Double ratio) {
    this.ratio = ratio;
  }

  public Boolean getSticky() {
    return sticky;
  }

  public void setSticky(Boolean sticky) {
    this.sticky = sticky;
  }

  public Boolean getRound() {
    return round;
  }

  public void setRound(Boolean round) {
    this.round = round;
  }

  public ValueAccessor getValueAccessor() {
    return valueAccessor;
  }

  public void setValueAccessor(ValueAccessor valueAccessor) {
    this.valueAccessor = valueAccessor;
  }

  public void setColorProvider(final ColorProvider newColorProvider) {
    colorProvider = newColorProvider;
  }

  public ColorProvider getColorProvider() {
    return colorProvider;
  }

  public IToolTipBuilder getToolTipBuilder() {
    return toolTipBuilder;
  }

  public void setToolTipBuilder(IToolTipBuilder toolTipBuilder) {
    this.toolTipBuilder = toolTipBuilder;
  }
}

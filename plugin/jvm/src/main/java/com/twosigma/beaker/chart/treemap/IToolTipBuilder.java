package com.twosigma.beaker.chart.treemap;

import net.sf.jtreemap.swing.TreeMapNode;

public interface IToolTipBuilder {
  String getToolTip(TreeMapNode node);
}

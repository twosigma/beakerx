/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.groovy;

import java.util.List;

/**
 * 
 * @author konst
 *
 */
public class GroovyDefaultVariables {
  
  /**
   * Default imports
   */
  //TODO add to kernel this classes, then uncomment
  public static final String[] IMPORTS ={
      "static java.lang.Math.*",
      //"graxxia.*",
      //"com.twosigma.beaker.NamespaceClient",
      //"com.twosigma.beaker.BeakerProgressUpdate",
      "com.twosigma.beaker.chart.Color",
      "com.twosigma.beaker.chart.xychart.*",
      "com.twosigma.beaker.chart.xychart.plotitem.*",
      "com.twosigma.beaker.chart.legend.*",
      "com.twosigma.beaker.chart.Filter",
      //"com.twosigma.beaker.easyform.*",
      //"com.twosigma.beaker.easyform.formitem.*",
      "com.twosigma.beaker.chart.GradientColor",
      "com.twosigma.beaker.chart.categoryplot.*",
      "com.twosigma.beaker.chart.categoryplot.plotitem.*",
      "com.twosigma.beaker.chart.histogram.*",
      //"com.twosigma.beaker.chart.treemap.*",
      //"com.twosigma.beaker.chart.treemap.util.*",
      //"net.sf.jtreemap.swing.*",
      "com.twosigma.beaker.chart.heatmap.HeatMap",
      //"com.twosigma.beaker.jvm.object.*",
      "com.twosigma.beaker.chart.KeyboardCodes",
      "java.util.concurrent.TimeUnit",
      "com.github.lwhite1.tablesaw.api.*",
      "com.github.lwhite1.tablesaw.columns.*",
      "com.github.lwhite1.tablesaw.api.ml.clustering.*",
      "com.github.lwhite1.tablesaw.reducing.*",
      "com.github.lwhite1.tablesaw.api.ml.regression.*",
      "static com.github.lwhite1.tablesaw.api.QueryHelper.*",
      "com.github.lwhite1.tablesaw.filtering.*"//,
      //"com.twosigma.beaker.table.*",
      //"com.twosigma.beaker.table.format.*",
      //"com.twosigma.beaker.table.renderer.*",
      //"com.twosigma.beaker.table.highlight.*";
      };

  /**
   * Default class path
   */
  public static final String[] CLASS_PATH = {};
  
}
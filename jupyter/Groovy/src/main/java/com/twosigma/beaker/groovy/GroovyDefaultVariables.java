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
  public static final String IMPORTS = 
      "static java.lang.Math.*" + 
      //"\ngraxxia.*" + 
      //"\ncom.twosigma.beaker.NamespaceClient" + 
      //"\ncom.twosigma.beaker.BeakerProgressUpdate"+
      "\ncom.twosigma.beaker.chart.Color"+ 
      "\ncom.twosigma.beaker.chart.xychart.*"+
      "\ncom.twosigma.beaker.chart.xychart.plotitem.*"+
      "\ncom.twosigma.beaker.chart.legend.*"+
      "\ncom.twosigma.beaker.chart.Filter"+
      //"\ncom.twosigma.beaker.easyform.*"+
      //"\ncom.twosigma.beaker.easyform.formitem.*"+
      "\ncom.twosigma.beaker.chart.GradientColor"+
      "\ncom.twosigma.beaker.chart.categoryplot.*"+
      "\ncom.twosigma.beaker.chart.categoryplot.plotitem.*"+
      "\ncom.twosigma.beaker.chart.histogram.*"+
      //"\ncom.twosigma.beaker.chart.treemap.*"+
      //"\ncom.twosigma.beaker.chart.treemap.util.*"+
      //"\nnet.sf.jtreemap.swing.*"+
      "\ncom.twosigma.beaker.chart.heatmap.HeatMap"+
      //"\ncom.twosigma.beaker.jvm.object.*"+
      "\ncom.twosigma.beaker.chart.KeyboardCodes"+
      "\njava.util.concurrent.TimeUnit";//+
      //"\ncom.twosigma.beaker.table.*"+
      //"\ncom.twosigma.beaker.table.format.*"+
      //"\ncom.twosigma.beaker.table.renderer.*"+
      //"\ncom.twosigma.beaker.table.highlight.*";
      
  /**
   * Default class path
   */
  public static final String CLASS_PATH = 
      "C:\\processing.jar";
  /**
   * Default dynamic classes directory
   */
  public static final String OUT_DIR = "";
  
}
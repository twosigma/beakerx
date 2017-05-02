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
package com.twosigma.beaker;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import static com.twosigma.beaker.jupyter.Utils.getAsString;

/**
 * 
 * @author konst
 *
 */
public class DefaultJVMVariables {

  /**
   * Default imports
   */
  private final Set<String> IMPORTS = new HashSet<>();

  /**
   * Default class path
   */
  private final Set<String> CLASS_PATH = new HashSet<>();

  public DefaultJVMVariables() {
    addImports(
        "com.twosigma.beaker.NamespaceClient",
        "com.twosigma.beaker.BeakerProgressUpdate",
        "com.twosigma.beaker.chart.Color",
        "com.twosigma.beaker.chart.GradientColor",
        "com.twosigma.beaker.chart.legend.*",
        "com.twosigma.beaker.chart.Filter",
        "com.twosigma.beaker.chart.xychart.*",
        "com.twosigma.beaker.chart.xychart.plotitem.*",
        "com.twosigma.beaker.chart.categoryplot.*",
        "com.twosigma.beaker.chart.categoryplot.plotitem.*",
        //"com.twosigma.beaker.chart.treemap.*",
        //"com.twosigma.beaker.chart.treemap.util.*",
        //"net.sf.jtreemap.swing.*",
        "com.twosigma.beaker.chart.histogram.*",
        "com.twosigma.beaker.chart.heatmap.HeatMap",
        //"com.twosigma.beaker.easyform.*",
        //"com.twosigma.beaker.easyform.formitem.*",
        "static com.twosigma.beaker.widgets.DisplayAnyWidget.display",
        "com.twosigma.beaker.easyform.EasyForm",
        "com.twosigma.beaker.table.*",
        "com.twosigma.beaker.fileloader.CsvPlotReader",
        "com.twosigma.beaker.jvm.object.OutputCell"

    );
  }

  public void addImports(String... input) {
    IMPORTS.addAll(Arrays.asList(input));
  }

  public void addImports(Collection<String> input) {
    IMPORTS.addAll(input);
  }

  public void removeImports(String... input) {
    IMPORTS.removeAll(Arrays.asList(input));
  }

  public void removeImports(Collection<String> input) {
    IMPORTS.removeAll(input);
  }

  public void addClassPath(String... input) {
    CLASS_PATH.addAll(Arrays.asList(input));
  }

  public void addClassPath(Collection<String> input) {
    CLASS_PATH.addAll(input);
  }

  public void removeClassPath(String... input) {
    CLASS_PATH.removeAll(Arrays.asList(input));
  }

  public void removeClassPath(Collection<String> input) {
    CLASS_PATH.removeAll(input);
  }

  public String[] getImportsAsArray() {
    return getArray(IMPORTS);
  }

  public String getImportsAsString() {
    return getAsString(IMPORTS);
  }

  public Collection<String> getImports() {
    return IMPORTS;
  }

  public String[] getClassPathAsArray() {
    return getArray(CLASS_PATH);
  }

  public String getClassPathAsString() {
    return getAsString(CLASS_PATH);
  }

  public Collection<String> getClassPath() {
    return CLASS_PATH;
  }

  private static String[] getArray(Set<String> input) {
    String[] ret = null;
    if (input != null) {
      ret = input.toArray(new String[input.size()]);
    } else {
      ret = new String[0];
    }
    return ret;
  }

}
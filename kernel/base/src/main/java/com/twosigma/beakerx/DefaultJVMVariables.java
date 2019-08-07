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
package com.twosigma.beakerx;

import static com.twosigma.beakerx.kernel.Utils.getAsString;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * @author konst
 */
public class DefaultJVMVariables {

  public static final String IMPORTS = "imports";
  public static final String CLASSPATH = "classpath";

  /**
   * Default imports
   */
  private final Set<String> IMPORT = new HashSet<>();

  /**
   * Default class path
   */
  private final Set<String> CLASS_PATH = new HashSet<>();

  public DefaultJVMVariables() {
    addImports(
            "com.twosigma.beakerx.NamespaceClient",
            "com.twosigma.beakerx.widget.OutputManager",
            "com.twosigma.beakerx.ClasspathManager",
            "com.twosigma.beakerx.chart.Color",
            "com.twosigma.beakerx.chart.GradientColor",
            "com.twosigma.beakerx.chart.legend.*",
            "com.twosigma.beakerx.chart.Filter",
            "com.twosigma.beakerx.chart.xychart.*",
            "com.twosigma.beakerx.chart.xychart.plotitem.*",
            "com.twosigma.beakerx.chart.categoryplot.*",
            "com.twosigma.beakerx.chart.categoryplot.plotitem.*",
            "com.twosigma.beakerx.chart.treemap.*",
            "com.twosigma.beakerx.chart.treemap.util.*",
            "net.sf.jtreemap.swing.*",
            "com.twosigma.beakerx.chart.histogram.*",
            "com.twosigma.beakerx.chart.heatmap.HeatMap",
            //"com.twosigma.beaker.easyform.*",
            //"com.twosigma.beaker.easyform.formitem.*",
            "com.twosigma.beakerx.easyform.EasyForm",
            "com.twosigma.beakerx.table.*",
            "com.twosigma.beakerx.fileloader.CSV",
            "com.twosigma.beakerx.jvm.object.OutputContainer",
            "com.twosigma.beakerx.jvm.object.TabbedOutputContainerLayoutManager",
            "com.twosigma.beakerx.jvm.object.GridOutputContainerLayoutManager",
            "com.twosigma.beakerx.jvm.object.CyclingOutputContainerLayoutManager",
            "com.twosigma.beakerx.jvm.object.OutputCell",
            "com.twosigma.beakerx.table.renderer.TableDisplayCellRenderer",
            "com.twosigma.beakerx.table.format.TableDisplayStringFormat",
            "com.twosigma.beakerx.table.highlight.TableDisplayCellHighlighter",
            "com.twosigma.beakerx.table.highlight.ThreeColorHeatmapHighlighter",
            "static com.twosigma.beakerx.Display.display",
            "com.twosigma.beakerx.kernel.KernelInfo",
            "com.twosigma.beakerx.kernel.magic.command.BxMavenManager",
            "com.twosigma.beakerx.table.TableDisplayLoadingMode"

    );
  }

  public void addImports(String... input) {
    IMPORT.addAll(Arrays.asList(input));
  }

  public void addImports(Collection<String> input) {
    IMPORT.addAll(input);
  }

  public void removeImports(String... input) {
    IMPORT.removeAll(Arrays.asList(input));
  }

  public void removeImports(Collection<String> input) {
    IMPORT.removeAll(input);
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
    return getArray(IMPORT);
  }

  public String getImportsAsString() {
    return getAsString(IMPORT);
  }

  public Collection<String> getImports() {
    return IMPORT;
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

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

import com.twosigma.beaker.DefaultJVMVariables;

/**
 * 
 * @author konst
 *
 */
public class GroovyDefaultVariables extends DefaultJVMVariables {
  
  public GroovyDefaultVariables() {
    addImports(
      "static java.lang.Math.*",
      //"graxxia.*",
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
      );
  }

}
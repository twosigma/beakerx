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
package com.twosigma.beakerx.kotlin.kernel;

import com.twosigma.beakerx.DefaultJVMVariables;

/**
 * 
 * @author konst
 *
 */
public class KotlinDefaultVariables extends DefaultJVMVariables {
  
  public KotlinDefaultVariables() {
    addImports(
      //"graxxia.*",
      //"com.twosigma.beaker.jvm.object.*",
      "com.twosigma.beakerx.chart.KeyboardCodes",
      "java.util.concurrent.TimeUnit",
      "com.github.lwhite1.tablesaw.api.*",
      "com.github.lwhite1.tablesaw.columns.*",
      "com.github.lwhite1.tablesaw.api.ml.clustering.*",
      "com.github.lwhite1.tablesaw.reducing.*",
      "com.github.lwhite1.tablesaw.api.ml.regression.*",
      "com.github.lwhite1.tablesaw.filtering.*",
      
      "com.twosigma.beakerx.mimetype.MIMEContainer.HTML",
      "com.twosigma.beakerx.mimetype.MIMEContainer.Latex",
      "com.twosigma.beakerx.mimetype.MIMEContainer.Markdown",
      "com.twosigma.beakerx.mimetype.MIMEContainer.Math",
      "com.twosigma.beakerx.mimetype.MIMEContainer.Javascript",
      "com.twosigma.beakerx.mimetype.MIMEContainer.IFrame",
      "com.twosigma.beakerx.mimetype.MIMEContainer.VimeoVideo",
      "com.twosigma.beakerx.mimetype.MIMEContainer.ScribdDocument",
      "com.twosigma.beakerx.mimetype.MIMEContainer.YoutubeVideo",
      "com.twosigma.beakerx.mimetype.MIMEContainer.Video",
      "com.twosigma.beakerx.mimetype.SVGContainer.SVG",
      "com.twosigma.beakerx.mimetype.ImageContainer.Image",
      "com.twosigma.beakerx.mimetype.FileLinkContainer.FileLink",
      "com.twosigma.beakerx.mimetype.FileLinkContainer.FileLinks",
      "java.lang.Math.*",
      "com.github.lwhite1.tablesaw.api.QueryHelper.*",
      
      "com.twosigma.beakerx.mimetype.MIMEContainer"
      //"com.twosigma.beaker.table.*",
      //"com.twosigma.beaker.table.format.*",
      //"com.twosigma.beaker.table.renderer.*",
      //"com.twosigma.beaker.table.highlight.*";
      );
    removeImports("com.twosigma.beakerx.jvm.object.OutputCell");
  }

}
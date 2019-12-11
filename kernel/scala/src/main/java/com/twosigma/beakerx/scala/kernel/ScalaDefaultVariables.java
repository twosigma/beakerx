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
package com.twosigma.beakerx.scala.kernel;

import com.twosigma.beakerx.DefaultJVMVariables;

/**
 * @author konst
 */
public class ScalaDefaultVariables extends DefaultJVMVariables {

  public ScalaDefaultVariables() {
    removeImports("com.twosigma.beakerx.easyform.EasyForm",
        "com.twosigma.beakerx.fileloader.CSV",
        "com.twosigma.beakerx.chart.xychart.*",
        "com.twosigma.beakerx.chart.xychart.plotitem.*",
        "com.twosigma.beakerx.chart.categoryplot.*",
        "com.twosigma.beakerx.chart.categoryplot.plotitem.*",
        "com.twosigma.beakerx.chart.heatmap.HeatMap",
        "com.twosigma.beakerx.chart.histogram.*",
        "com.twosigma.beakerx.chart.treemap.*",
        "com.twosigma.beakerx.chart.GradientColor",
        "com.twosigma.beakerx.table.*"
    );

    addImports("com.twosigma.beakerx.scala.chart.xychart._",
        "com.twosigma.beakerx.scala.chart.xychart.plotitem._",
        "com.twosigma.beakerx.scala.chart.xychart.{Plot,TimePlot,NanoPlot,SimpleTimePlot,CombinedPlot}",
        "com.twosigma.beakerx.scala.chart.categoryplot.plotitem._",
        "com.twosigma.beakerx.scala.chart.categoryplot.CategoryPlot",
        "com.twosigma.beakerx.scala.chart.heatmap.HeatMap",
        "com.twosigma.beakerx.scala.chart.histogram.Histogram",
        "com.twosigma.beakerx.scala.chart.treemap.TreeMap",
        "com.twosigma.beakerx.scala.chart.GradientColor",
        "com.twosigma.beakerx.scala.easyform.EasyForm",
        "com.twosigma.beakerx.easyform.formitem._",
        "com.twosigma.beakerx.scala.table._",
        "com.twosigma.beakerx.table.ColumnType",
        "com.twosigma.beakerx.table.TableDisplayAlignmentProvider",
        "com.twosigma.beakerx.table.CellHighlighter",
        "com.twosigma.beakerx.table.ContextMenuAction",
        "com.twosigma.beakerx.table.highlight.HighlightStyle",
        "com.twosigma.beakerx.table.TooltipAction",
        "com.twosigma.beakerx.table.RowFilter",
        "com.twosigma.beakerx.table.RowsToShow",
        "com.twosigma.beakerx.table.FontColorProvider",
        "com.twosigma.beakerx.scala.fileloader._",
        "com.twosigma.beakerx.chart.xychart.plotitem.ShapeType",
        "com.twosigma.beakerx.chart.xychart.plotitem.StrokeType",
        "com.twosigma.beakerx.scala.fileloader.CSV",
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
        "com.twosigma.beakerx.mimetype.MIMEContainer"
    );
  }
}

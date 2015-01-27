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
(function() {
  "use strict";
  window.bkInit.getOutputDisplayCssList = [
       // required for plot and combined plot output display
       "outputdisplay/bko-plot/bko-plot.css",
       "outputdisplay/bko-plot/bko-combinedplot.css"
     ];
  window.bkInit.getOutputDisplayJsList = [
      "vendor/bower_components/d3/d3.js",

      "outputdisplay/bko-chart.js",

      "outputdisplay/bko-tabledisplay.js",

      // enable this to use the example object container output display
      //"outputdisplay/bko-testcontainer.js",

      "outputdisplay/bko-image.js",
      
      "outputdisplay/bko-latex.js",
      
      "outputdisplay/bko-progress.js",

      "outputdisplay/bko-results.js",

      "vendor/vega/vega.js",
      "vendor/vega/d3.geo.projection.min.js",
      "vendor/vega/d3.layout.cloud.js",
      "outputdisplay/bko-vega.js",

      "outputdisplay/bko-plot/plotutils.js",
      "outputdisplay/bko-plot/plotsampler.js",
      "outputdisplay/bko-plot/plotitems/auxes/plotauxbox.js",
      "outputdisplay/bko-plot/plotitems/auxes/plotauxriver.js",
      "outputdisplay/bko-plot/plotitems/auxes/plotauxstem.js",
      "outputdisplay/bko-plot/plotitems/std/plotline.js",
      "outputdisplay/bko-plot/plotitems/std/plotbar.js",
      "outputdisplay/bko-plot/plotitems/std/plotstem.js",
      "outputdisplay/bko-plot/plotitems/std/plotarea.js",
      "outputdisplay/bko-plot/plotitems/std/plotpoint.js",
      "outputdisplay/bko-plot/plotitems/std/plotconstline.js",
      "outputdisplay/bko-plot/plotitems/std/plotconstband.js",
      "outputdisplay/bko-plot/plotitems/std/plottext.js",
      "outputdisplay/bko-plot/plotitems/lod/plotlodline.js",
      "outputdisplay/bko-plot/plotitems/lod/plotlodriver.js",
      "outputdisplay/bko-plot/plotitems/lod/plotlodbox.js",
      "outputdisplay/bko-plot/plotitems/lod/plotlodpoint.js",
      "outputdisplay/bko-plot/plotitems/lod/plotlodstem.js",
      "outputdisplay/bko-plot/plotitems/lodloader/plotlinelodloader.js",
      "outputdisplay/bko-plot/plotitems/lodloader/plotarealodloader.js",
      "outputdisplay/bko-plot/plotitems/lodloader/plotbarlodloader.js",
      "outputdisplay/bko-plot/plotitems/lodloader/plotstemlodloader.js",
      "outputdisplay/bko-plot/plotitems/lodloader/plotpointlodloader.js",
      "outputdisplay/bko-plot/plotaxis.js",
      "outputdisplay/bko-plot/plotfactory.js",
      "outputdisplay/bko-plot/plotconverter.js",
      "outputdisplay/bko-plot/plotformatter.js",
      "outputdisplay/bko-plot/combinedplotformatter.js",
      "outputdisplay/bko-plot/bko-plot.js",
      "outputdisplay/bko-plot/bko-combinedplot.js"
    ];
})();
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
  'use strict';
  var retfunc = function(bkUtils, plotFormatter) {
    return {
      standardizeModel : function(model) {
        var newmodel = {
          title : model.title,
          plots : []
        };
        var version;
        if (model.version === "groovy") {
          version = "groovy";
        } else {
          version = "direct";
        }

        var width, height;
        var showLegend, useToolTip;
        if (version === "groovy") {
          newmodel.xAxisLabel = model.x_label;
          newmodel.yAxisLabel = model.y_label;
          width = model.init_width;
          height = model.init_height;
          showLegend = model.show_legend;
          useToolTip = model.use_tool_tip;
        } else if (version === "direct"){
          width = model.width;
          height = model.height;
          showLegend = model.showLegend;
          useToolTip = model.useToolTip;
        }

        if (width == null) { width = 1200; }
        if (height == null) { height = 600; }

        newmodel.initSize = {
          "width" : width,
          "height" : height
        };

        var plotType = model.plot_type;
        if (plotType == null) { plotType = "Plot"; }

        var sumweights = 0;
        var weights = model.weights == null ? [] : model.weights;
        for(var i = 0; i < model.plots.length; i++) {
          if(weights[i] == null) {
            weights[i] = 1;
          }
          sumweights += weights[i];
        }
        var plots = model.plots;
        for(var i = 0; i < plots.length; i++) {
          var plotmodel = plots[i];

          if (plotmodel.version == null) { plotmodel.version = version; }
          if (plotmodel.showLegend == null) { plotmodel.showLegend = showLegend; }
          if (plotmodel.useToolTip == null) { plotmodel.useToolTip = useToolTip; }

          plotmodel.type = plotType;
          var newplotmodel = plotFormatter.standardizeModel(plotmodel);

          if (i < plots.length - 1) {  // turn off x coordinate labels
            newplotmodel.xAxis.axisLabel = null;
            newplotmodel.xAxis.showGridlineLabels = false;
          } else {
            newplotmodel.xAxis.axisLabel = newmodel.xAxisLabel;
          }

          newplotmodel.initSize.width = width;
          newplotmodel.initSize.height = height * weights[i] / sumweights;

          newmodel.plots.push(newplotmodel);
        }
        return newmodel;
      }
    };
  };
  beaker.bkoFactory('combinedplotFormatter', ["bkUtils", "plotFormatter", retfunc]);
})();

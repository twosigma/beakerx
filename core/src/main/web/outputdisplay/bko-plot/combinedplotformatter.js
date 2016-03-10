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
  var retfunc = function(bkUtils, plotFormatter, plotUtils) {
    return {
      standardizeModel : function(model, prefs) {
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

        newmodel.plotSize = {
          "width" : width,
          "height" : height
        };

        var plotType = model.plot_type;
        if (plotType == null) { plotType = "Plot"; }

        var layout = {
          bottomLayoutMargin : 30
        };
        var sumweights = 0;
        var sumvmargins = 0;
        var vmargins = [];
        var weights = model.weights == null ? [] : model.weights;
        for(var i = 0; i < model.plots.length; i++) {
          if(weights[i] == null) {
            weights[i] = 1;
          }
          sumweights += weights[i];
          if (i < model.plots.length - 1) {  //add margins for correct height calculation
            vmargins[i] = layout.bottomLayoutMargin;
            sumvmargins += vmargins[i];
          } else {
            vmargins[i] = layout.bottomLayoutMargin + plotUtils.fonts.labelHeight * 2;
            sumvmargins += vmargins[i];
          }
        }
        var plots = model.plots;
        for(var i = 0; i < plots.length; i++) {
          var plotmodel = plots[i];

          if (plotmodel.version == null) { plotmodel.version = version; }
          if (plotmodel.showLegend == null) { plotmodel.showLegend = showLegend; }
          if (plotmodel.useToolTip == null) { plotmodel.useToolTip = useToolTip; }

          plotmodel.type = plotType;
          var newplotmodel = plotFormatter.standardizeModel(plotmodel, prefs);

          if (i < plots.length - 1) {  // turn off x coordinate labels
            newplotmodel.xAxis.label = null;
            newplotmodel.xAxis.showGridlineLabels = false;
          } else {
            newplotmodel.xAxis.label = newmodel.xAxisLabel;
          }

          newplotmodel.plotSize.width = width;

          newplotmodel.plotSize.height = (height - sumvmargins) * weights[i] / sumweights + vmargins[i];

          newmodel.plots.push(newplotmodel);
        }
        return newmodel;
      }
    };
  };
  beakerRegister.bkoFactory('combinedplotFormatter', ["bkUtils", "plotFormatter", "plotUtils", retfunc]);
})();

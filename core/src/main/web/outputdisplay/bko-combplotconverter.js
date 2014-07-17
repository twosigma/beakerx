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
  var retfunc = function(bkUtils, plotConverter) {
    return {
      standardizeModel : function(model) {
        model = model.result; 
        var newmodel = {
          title : model.title,
          xLabel : model.x_label != null ? model.x_label : model.xLabel,
          yLabel : model.y_label != null ? model.y_label : model.yLabel,
          plots : []
        }; 

        var width = model.init_width != null ? model.init_width : 1200,
            height = model.init_height != null ? model.init_height : 600;
        var sumweights = 0;
        var weights = model.weights == null ? [] : model.weights;
        for(var i = 0; i < model.plots.length; i++) {
          if(weights[i] == null) { weights[i] = 1; }
          sumweights += weights[i];
        }
        var plots = model.plots;
        for(var i = 0; i < plots.length; i++) {
          var plotmodel = plots[i];
          var newplotmodel = plotConverter.standardizeModel(plotmodel);
          
          if(i < plots.length - 1) {  // turn off x coordinate labels
            newplotmodel.xLabel = null;
            newplotmodel.xCoordLabel = false;
          }
          
          newplotmodel.initSize.width = width + "px";
          newplotmodel.initSize.height = height * weights[i] / sumweights + "px";
          
          newmodel.plots.push(newplotmodel);
        }
        return newmodel;
      }
    };
  };
  beaker.bkoFactory('combplotConverter', ["bkUtils", "plotConverter", retfunc]);
})();

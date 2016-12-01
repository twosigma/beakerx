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
  var retfunc = function() {

    return {

      convertGroovyData : function(newmodel, model) {
        // set margin
        newmodel.margin = {
          top: 0,
          bottom: 0
        };
        // set axis bound as focus
        if (model.x_auto_range === false) {
          if (model.x_lower_bound != null) {
            newmodel.userFocus.xl = model.x_lower_bound;
          }
          if (model.x_upper_bound != null) {
            newmodel.userFocus.xr = model.x_upper_bound;
          }
        } else {
          if (model.x_lower_margin != null) {
            newmodel.margin.left = model.x_lower_margin;
          }
          if (model.x_upper_margin != null) {
            newmodel.margin.right = model.x_upper_margin;
          }
        }

        if (model.rangeAxes != null) {
          var axis = model.rangeAxes[0];
          if (axis.auto_range === false) {
            if (axis.lower_bound != null) {
              newmodel.userFocus.yl = axis.lower_bound;
            }
            if (axis.upper_bound != null) {
              newmodel.userFocus.yr = axis.upper_bound;
            }
          }
        }

        //axes types
        newmodel.xAxis.type = "linear";
        newmodel.yAxis.type = "linear";

        var data = model.graphics_list;

        var minValue = data[0][0];
        var maxValue = minValue;
        for (var rowInd = 0; rowInd < data.length; rowInd++) {
          var row = data[rowInd];
          maxValue = Math.max(maxValue, Math.max.apply(null, row));
          minValue = Math.min(minValue, Math.min.apply(null, row));
        }

        var item = {
          type: "heatmap",
          minValue: minValue,
          maxValue: maxValue,
          legend: "true",
          colors: []
        };

        var colors = model.color;
        for (var i = 0; i < colors.length; i++) {
          item.colors.push("#" + colors[i].substr(3));
        }

        var elements = [];

        for (var rowInd = 0; rowInd < data.length; rowInd++) {
          var row = data[rowInd];

          for (var colInd = 0; colInd < row.length; colInd++) {
            var value = row[colInd];
            if (value === "NaN")
              continue;

            var eleSize = 1;
            var ele = {
              x: colInd - eleSize / 2,
              y: rowInd - eleSize / 2,
              x2: colInd + eleSize / 2,
              y2: rowInd + eleSize / 2,
              value: value
            };

            elements.push(ele);
          }
        }
        item.elements = elements;
        newmodel.data.push(item);
      }
    };
  };
  beakerRegister.bkoFactory('heatmapConverter', retfunc);
})();

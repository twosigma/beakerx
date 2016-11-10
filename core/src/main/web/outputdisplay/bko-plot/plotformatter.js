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
  var retfunc = function(bkUtils, plotConverter, heatmapConverter, PlotAxis, plotFactory, plotUtils) {

    var createNewModel = function (model) {

      var newmodel;

      if (model.version === "groovy") {  // model returned from serializer

        newmodel = {
          plotId: model.update_id,
          type: "plot",
          title: model.chart_title != null ? model.chart_title : model.title,
          margin: {},
          showLegend: model.show_legend,
          legendPosition: model.legend_position != null ? model.legend_position : {position: "TOP_RIGHT"},
          legendLayout: model.legend_layout != null ? model.legend_layout : "VERTICAL",
          useToolTip: model.use_tool_tip != null ? model.use_tool_tip : false,
          plotSize: {
            "width": model.init_width != null ? model.init_width : 1200,
            "height": model.init_height != null ? model.init_height : 350
          },
          customStyles: model.custom_styles ? model.custom_styles : '',
          elementStyles: model.element_styles ? model.element_styles : ''
        }
      } else {
        newmodel = {
          showLegend: model.showLegend,
          legendPosition: model.legendPosition != null ? model.legendPosition : {position: "TOP_RIGHT"},
          legendLayout: model.legendLayout != null ? model.legendLayout : "VERTICAL",
          useToolTip: model.useToolTip != null ? model.useToolTip : false,
          margin: model.margin != null ? model.margin : {},
          plotSize: {
            "width": model.width != null ? model.width : 1200,
            "height": model.height != null ? model.height : 350
          }
        };
      }

      if (model.type !== "TreeMap") {

        if (model.version === "groovy") {  // model returned from serializer

          newmodel = _.extend(newmodel, {
            userFocus: {},
            xAxis: {label: model.domain_axis_label},
            yAxis: {label: model.y_label, lowerMargin: model.rangeAxes[0].lower_margin, upperMargin: model.rangeAxes[0].upper_margin},
            yAxisR: model.rangeAxes.length > 1 ? {label: model.rangeAxes[1].label, lowerMargin: model.rangeAxes[1].lower_margin, upperMargin: model.rangeAxes[1].upper_margin} : null,
            orientation: model.orientation != null ? model.orientation : "VERTICAL",
            omitCheckboxes: model.omit_checkboxes,
            nanoOffset: null,
            timezone: model.timezone,
            categoryNames: model.categoryNames,
            showXGridlines: !(model.orientation !== 'HORIZONTAL' && model.type === "CategoryPlot"),
            categoryMargin: model.category_margin,
            categoryNamesLabelAngle: model.categoryNamesLabelAngle,
            cumulative: model.cumulative,
            binCount: model.bin_count,
            normed: model.normed,
            rangeMin: model.range_min,
            rangeMax: model.range_max,
            displayMode: model.displayMode != null ? model.displayMode : 'OVERLAP',
            rightClose: model.right_close,
            tips: model.tips ? model.tips : null,
            tooltips: model.tooltips ? model.tooltips : null,
            itemLabels: model.itemLabels ? model.itemLabels : null

          });
        } else {
          newmodel = _.extend(newmodel, {
            orientation: model.orientation != null ? model.orientation : "VERTICAL",
            omitCheckboxes: model.omitCheckboxes,
            xAxis: model.xAxis != null ? model.xAxis : {},
            yAxis: model.yAxis != null ? model.yAxis : {},
            yAxisR: model.yAxisR,
            range: model.range != null ? model.range : null,
            userFocus: model.focus != null ? model.focus : {},
            xCursor: model.xCursor,
            yCursor: model.yCursor,
            timezone: model.timezone,
            categoryNames: model.categoryNames,
            showXGridlines: !(model.orientation !== 'HORIZONTAL' && model.type === "CategoryPlot"),
            categoryMargin: model.categoryMargin,
            categoryNamesLabelAngle: model.categoryNamesLabelAngle,
            cumulative: model.cumulative,
            binCount: model.binCount,
            normed: model.normed,
            rangeMin: model.rangeMin,
            rangeMax: model.rangeMax,
            displayMode: model.displayMode != null ? model.displayMode : 'OVERLAP',
            rightClose: model.rightClose,
            tips: model.tips ? model.tips : null,
            tooltips: model.tooltips,
            itemLabels: model.itemLabels
          });
        }
      }else{
        if (model.version === "groovy") {  // model returned from serializer

          newmodel = _.extend(newmodel, {
            mode: model.mode,
            ratio: model.ratio,
            sticky: model.sticky,
            round: model.round,
            valueAccessor: model.valueAccessor
          });
        } else {
          newmodel = _.extend(newmodel, {
            mode: model.mode,
            ratio: model.ratio,
            sticky: model.sticky,
            round: model.round,
            valueAccessor: model.valueAccessor
          });
        }
      }

      return newmodel;
    };

    return {
      lineDasharrayMap : {
        "solid" : "",
        "dash" : "9,5",
        "dot" : "2,2",
        "dashdot" : "9,5,2,5",
        "longdash" : "20,5",
        "" : ""
      },

      remapModel : function(model) {
        // map data entrie to [0, 1] of axis range
        var vrange = model.vrange;
        var xAxisLabel = model.xAxis.label;

        var xAxis = new PlotAxis(model.xAxis.type);

        if (xAxis.axisType === "category") {
          xAxis.setRange(vrange.xl, vrange.xr, model.xAxis.base);
          xAxis.setCategoryNames(model.categoryNames, model.labelsxs);
        } else if (xAxis.axisType === "time" || xAxis.axisType === "nanotime") {
          xAxis.setRange(vrange.xl, vrange.xr, model.timezone);
        } else {
          xAxis.setRange(vrange.xl, vrange.xr, model.xAxis.base);
        }

        if (xAxisLabel != null) {
          xAxis.setLabel(xAxisLabel);
        }
        model.xAxis = xAxis;

        var updateYAxisRange = function(modelAxis, axisVRange){
          if(modelAxis == null || axisVRange == null) { return null; }

          var label = modelAxis.label;

          var axis = new PlotAxis(modelAxis.type);

          if (axis.axisType === "category") {
            axis.setRange(vrange.xl, vrange.xr, model.xAxis.base);
            axis.setCategoryNames(model.categoryNames, model.labelsxs);
          } else if (axis.axisType !== "time") {
            axis.setRange(axisVRange.yl, axisVRange.yr, modelAxis.base);
          } else {
            axis.setRange(axisVRange.yl, axisVRange.yr, modelAxis.timezone);
          }

          if (label != null) {
            axis.setLabel(label);
          }
          axis.axisMarginValL = modelAxis.lowerMargin;
          axis.axisMarginValR = modelAxis.upperMargin;
          return axis;
        };
        model.yAxis = updateYAxisRange(model.yAxis, model.vrange);
        model.yAxisR = updateYAxisRange(model.yAxisR, model.vrangeR);

        var data = model.data;
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          if (item.type === "treemapnode")  continue;

          // map coordinates using percentage
          // tooltips are possibly generated at the same time
          if(plotUtils.useYAxisR(model, item)){
            item.applyAxis(xAxis, model.yAxisR);
          }else{
            item.applyAxis(xAxis, model.yAxis);
          }
        }
        // map focus region
        var focus = model.userFocus;
        if (focus.xl != null) { focus.xl = xAxis.getPercent(focus.xl); }
        if (focus.xr != null) { focus.xr = xAxis.getPercent(focus.xr); }
        if (focus.yl != null) { focus.yl = yAxis.getPercent(focus.yl); }
        if (focus.yr != null) { focus.yr = yAxis.getPercent(focus.yr); }
      },

      formatTreeMapModel: function (newmodel) {
        if (newmodel.data == null) {
          newmodel.data = [];
        }
        var data = newmodel.data;
        for (var i = 0; i < data.length; i++) {
          plotFactory.recreatePlotItem(data[i]);
        }
      },

      formatModel: function(newmodel) {
        if (newmodel.xCursor != null) {
          var cursor = newmodel.xCursor;
          if (cursor.color == null) { cursor.color = "black"; }
          if (cursor.width == null) { cursor.width = 1; }
          cursor.stroke_dasharray = this.lineDasharrayMap[cursor.style];
        }
        if (newmodel.yCursor != null) {
          var cursor = newmodel.yCursor;
          if (cursor.color == null) { cursor.color = "black"; }
          if (cursor.width == null) { cursor.width = 1; }
          cursor.stroke_dasharray = this.lineDasharrayMap[cursor.style];
        }
        var logx = newmodel.xAxis.type === "log",
            logxb = newmodel.xAxis.base,
            logy = newmodel.yAxis.type === "log",
            logyb = newmodel.yAxis.base,
            logyR = newmodel.yAxisR && newmodel.yAxisR.type === "log",
            logybR = newmodel.yAxisR && newmodel.yAxisR.base;

        if (newmodel.orientation === 'HORIZONTAL'){
          var temp = newmodel.xAxis;
          newmodel.xAxis = newmodel.yAxis;
          newmodel.yAxis = temp;
        }

        if (newmodel.data == null) { newmodel.data = []; }
        var data = newmodel.data;
        for (var i = 0; i < data.length; i++) {
          var item = data[i], eles = item.elements;

          var eles = item.elements;

          if (item.type !== "treemapnode") {
            var useYAxisR = plotUtils.useYAxisR(newmodel, item);
            var itemlogy = useYAxisR ? logyR : logy;
            var itemlogyb = useYAxisR ? logybR : logyb;
          }

          if (eles == null) eles = [];

          item.showItem = true;

          if (item.type == null) {
            item.type = "line";
          }

          if(item.type === "bar" || item.type === "area") {
            //newmodel.yPreventNegative = true; // prevent move to y < 0
          }

          if(item.type === "line" || item.type === "constline") {
            if (item.color == null) {
              item.color = "black";
            }
            if (item.style == null) {
              item.style = "solid";
            }
            item.stroke_dasharray = this.lineDasharrayMap[item.style];
          }

          if(item.type === "line" || item.type === "area") {
            if (item.interpolation === "curve") {
            }
          }

          if (item.type === "line" || item.type === "stem") {
            if (item.width == null) {
              item.width = 2;
            }
          }
          if (item.type === "bar" && item.width == null) {
            item.width = 1;
          }

          if (item.type === "point") {
            if (item.shape == null) {
              item.shape = "rect";
            }
            if (item.size == null) {
              item.size = item.shape === "rect" ? 8 : 5;
            }
          }

          if (item.type === "constline" || item.type === "constband") {
            if (item.color == null) {
              item.color = "black";
            }
          }

          if (item.useToolTip == null) {
            if (newmodel.useToolTip === true) {
              item.useToolTip = true;
            }
          }

          if (item.colorOpacity != null) {
            item.color_opacity = item.colorOpacity;
            delete item.colorOpacity;
          }
          if (item.outlineColor != null) {
            item.stroke = item.outlineColor;
            delete item.outlineColor;
          }
          if (item.outlineWidth != null) {
            item.stroke_width = item.outlineWidth;
            delete item.outlineWidth;
          }
          if (item.outlineOpacity != null) {
            item.stroke_opacity = item.outlineOpacity;
            delete item.outlineOpacity;
          }

          if (item.color_opacity == null) {
            item.color_opacity = 1.0; // default show fully
          }
          if (item.stroke_opacity == null) {
            // default show based on whether stroke is set
            item.stroke_opacity = item.stroke == null ? 0.0 : 1.0;
          }

          for (var j = 0; j < eles.length; j++) {
            var ele = eles[j];

            if(item.type === "stem") {
              ele.stroke_dasharray = this.lineDasharrayMap[ele.style];
            }

            if (ele.outlineColor != null) {
              ele.stroke = ele.outlineColor;
              delete ele.outlineColor;
            }
            if (ele.outlineWidth != null) {
              ele.stroke_width = ele.outlineWidth;
              delete ele.outlineWidth;
            }
            if (ele.outlineOpacity != null) {
              ele.stroke_opacity = ele.outlineOpacity;
              delete ele.outlineOpacity;
            }

            if (item.type === "bar" && ele.x2 == null) {
              ele.x = plotUtils.minus(ele.x, item.width / 2);
              ele.x2 = plotUtils.plus(ele.x, item.width);
            }
            if ((item.type === "area" || item.type === "bar" || item.type === "stem")
              && ele.y2 == null) {
              if (item.height != null) {
                ele.y2 = ele.y + item.height;
              } else if (item.base != null) {
                ele.y2 = item.base;
              } else {
                ele.y2 = itemlogy ? 1 : 0;
              }
            }

            if (item.type === "point" && ele.size == null) {
              if (item.size != null) {
                ele.size = item.size;
              } else {
                ele.size = item.shape === "rect" ? 8 : 5;
              }
            }

            if (item.type === "area") {
              if (item.interpolation == null) {
                item.interpolation = "linear";
              }
            }
            // swap y, y2
            if (ele.y != null && ele.y2 != null && ele.y > ele.y2) {
              var temp = ele.y;
              ele.y = ele.y2;
              ele.y2 = temp;
            }

            if (ele.x != null) {
              ele._x = ele.x;
              if (logx) {
                ele.x = Math.log(ele.x) / Math.log(logxb);
              }
            }
            if (ele.x2 != null) {
              ele._x2 = ele.x2;
              if (logx) {
                ele.x2 = Math.log(ele.x2) / Math.log(logxb);
              }
            }
            if (ele.y != null) {
              ele._y = ele.y;
              if (itemlogy) {
                ele.y = Math.log(ele.y) / Math.log(itemlogyb);
              }
            }
            if (ele.y2 != null) {
              ele._y2 = ele.y2;
              if (itemlogy) {
                ele.y2 = Math.log(ele.y2) / Math.log(itemlogyb);
              }
            }

            if (newmodel.orientation === 'HORIZONTAL'){
              var temp = {
                x: ele.y,
                x2: ele.y2,
                y: ele.x,
                y2: ele.x2
              };

              ele.x = temp.x;
              ele.x2 = temp.x2;
              ele.y = temp.y;
              ele.y2 = temp.y2;

              ele._x = ele.x;
              ele._x2 = ele.x2;
              ele._y = ele.y;
              ele._y2 = ele.y2;

              if (item.type === 'stem'){
                ele.y2 = ele.y;
                ele._y2 = ele._y;
              }
            }
          }

          if (newmodel.orientation === 'HORIZONTAL'){
            var temp =  item.x;
            item.x = item.y;
            item.y = temp;
          }

          // recreate rendering objects
          item.index = i;
          item.id = "i" + i;

          data[i] = plotFactory.createPlotItem(item, newmodel.lodThreshold);
        }

        // apply log to focus
        var focus = newmodel.userFocus;
        if (logx) {
          if (focus.xl != null) {
            focus.xl = Math.log(focus.xl) / Math.log(logxb);
          }
          if (focus.xr != null) {
            focus.xr = Math.log(focus.xr) / Math.log(logxb);
          }
        }
        if (logy) {
          if (focus.yl != null) {
            focus.yl = Math.log(focus.yl) / Math.log(logyb);
          }
          if (focus.yr != null) {
            focus.yr = Math.log(focus.yr) / Math.log(logyb);
          }
        }
      },

      sortModel: function(model) {
        var data = model.data;
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          if (item.type === "treemapnode" || item.type === "constline" || item.type === "constband" || item.type === "heatmap") { continue; }

          var eles = item.elements;
          var unordered = false;
          for (var j = 1; j < eles.length; j++) {
            if (plotUtils.lt(eles[j].x, eles[j - 1].x)) {
              unordered = true;
              break;
            }
          }
          if (unordered === true) {
            if (item.type === "bar" || item.type === "stem" ||
            item.type === "point" || item.type === "text") {
              eles.sort(function(a, b) {
                plotUtils.minus(a.x, b.x);
              });
            } else {
              item.isUnorderedItem = true;
            }
          }
        }
      },

      standardizeModel : function(_model, prefs) {
        var model = {};
        $.extend(true, model, _model); // deep copy model to prevent changing the original JSON

        if (model.graphics_list != null) {
          model.version = "groovy";  // TODO, a hack now to check DS source
        }
        if (model.version === "complete") { // skip standardized model in combined plot
          return model;
        } else if (model.version === "groovy") {
        } else {
          model.version = "direct";
        }
        var newmodel = createNewModel(model);

        newmodel.lodThreshold = (model.lodThreshold) ?
          model.lodThreshold : (prefs !== undefined && prefs.lodThreshold !== undefined ? prefs.lodThreshold : 4000) ;

        newmodel.data = [];

        if (model.version === "groovy") {
          switch(model.type){
            case 'HeatMap':
              heatmapConverter.convertGroovyData(newmodel, model);
              break;
            default:
              plotConverter.convertGroovyData(newmodel, model);
              break;
          }
        } else {  // DS generated directly
          _.extend(newmodel, model);
        }

        if (model.type === 'TreeMap') {
          this.formatTreeMapModel(newmodel);
        } else {
          this.formatModel(newmodel); // fill in null entries, compute y2, etc.
          this.sortModel(newmodel);

          // at this point, data is in standard format (log is applied as well)

          var yAxisData = [], yAxisRData = [];
          for (var i = 0; i < newmodel.data.length; i++) {
            var item = newmodel.data[i];
            if(newmodel.showLegend == null && item.legend){
                newmodel.showLegend = true;
            }
            if(plotUtils.useYAxisR(newmodel, item)){
              yAxisRData.push(item);
            }else{
              yAxisData.push(item);
            }
          }

          newmodel.showLegend = newmodel.showLegend != null ? newmodel.showLegend : false;

          var range = plotUtils.getDataRange(yAxisData).datarange;
          var rangeR = _.isEmpty(yAxisRData) ? null : plotUtils.getDataRange(yAxisRData).datarange;

          var applyMargins = function (range, axis) {
            axis.lowerMargin = axis.lowerMargin || 0;
            axis.upperMargin = axis.upperMargin || 0;

            var span = range.yr - range.yl;
            range.yl -= axis.lowerMargin * span;
            range.yr += axis.upperMargin * span;
            range.yspan = range.yr - range.yl;
            return range;
          };
          range = applyMargins(range, newmodel.yAxis);
          if (rangeR) {
            rangeR = applyMargins(rangeR, newmodel.yAxisR);
          }

          if (newmodel.yIncludeZero === true && range.yl > 0) {
            range.yl = 0;
            range.yspan = range.yr - range.yl;
          }
          if (rangeR && newmodel.yRIncludeZero === true && rangeR.yl > 0) {
            rangeR.yl = 0;
            rangeR.yspan = rangeR.yr - rangeR.yl;
          }

          var margin = newmodel.margin;
          if (margin.bottom == null) { margin.bottom = .05; }
          if (margin.top == null) { margin.top = .05; }
          if (margin.left == null) { margin.left = .05; }
          if (margin.right == null) { margin.right = .05; }

          if (newmodel.vrange == null) {
            // visible range initially is 10x larger than data range by default
            var getModelRange = function(r, logx, logy){
              if (r == null) { return null; }
              var result = {
                xl: plotUtils.minus(r.xl, r.xspan * 10.0),
                xr: plotUtils.plus(r.xr, r.xspan * 10.0),
                yl: r.yl - r.yspan * 10.0,
                yr: r.yr + r.yspan * 10.0
              };
              if(logx){
                result.xl = Math.max(result.xl, r.xl - newmodel.margin.left * r.xspan);
              }
              if(logy){
                result.yl = Math.max(result.yl, r.yl - newmodel.margin.left * r.yspan);
              }
              return result;
            };
            newmodel.vrange = getModelRange(range, newmodel.xAxis.type === "log", newmodel.yAxis.type === "log");
            if(newmodel.yAxisR){
              newmodel.vrangeR = getModelRange(rangeR, newmodel.xAxis.type === "log", newmodel.yAxisR.type === "log");
            }

            var vrange = newmodel.vrange;
            var vrangeR = newmodel.vrangeR;

            if (newmodel.yPreventNegative === true) {
              vrange.yl = Math.min(0, range.yl);
            }

            var focus = newmodel.userFocus; // allow user to overide vrange
            if (focus.xl != null) { vrange.xl = Math.min(focus.xl, vrange.xl); }
            if (focus.xr != null) { vrange.xr = Math.max(focus.xr, vrange.xr); }
            if (focus.yl != null) { vrange.yl = Math.min(focus.yl, vrange.yl); }
            if (focus.yr != null) { vrange.yr = Math.max(focus.yr, vrange.yr); }

            var updateRangeSpan = function(r) {
              if (r) {
                r.xspan = plotUtils.minus(r.xr, r.xl);
                r.yspan = r.yr - r.yl;
              }
            };
            updateRangeSpan(vrange);
            updateRangeSpan(vrangeR);
          }

          this.remapModel(newmodel);
        }
        newmodel.version = "complete";
        return newmodel;
      }
    };
  };
  beakerRegister.bkoFactory('plotFormatter',
    ["bkUtils", 'plotConverter', 'heatmapConverter', 'PlotAxis', 'plotFactory', 'plotUtils', retfunc]);
})();

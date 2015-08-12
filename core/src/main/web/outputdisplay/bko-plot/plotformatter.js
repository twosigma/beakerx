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
  var retfunc = function(bkUtils, plotConverter, PlotAxis, plotFactory, plotUtils, bkHelper) {

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

        if (xAxis.axisType !== "time") {
          xAxis.setRange(vrange.xl, vrange.xr, model.xAxis.base);
        } else {
          xAxis.setRange(vrange.xl, vrange.xr, model.timezone);
        }

        if (xAxisLabel != null) {
          xAxis.setLabel(xAxisLabel);
        }
        model.xAxis = xAxis;

        var updateYAxisRange = function(modelAxis, axisVRange){
          if(modelAxis == null || axisVRange == null) { return null; }

          var axisLabel = modelAxis.label;

          var axis = new PlotAxis(modelAxis.type);

          if (axis.axisType !== "time") {
            axis.setRange(axisVRange.yl, axisVRange.yr, modelAxis.base);
          } else {
            axis.setRange(axisVRange.yl, axisVRange.yr, modelAxis.timezone);
          }

          if (axisLabel != null) {
            axis.setLabel(axisLabel);
          }
          return axis;
        };
        model.yAxis = updateYAxisRange(model.yAxis, model.vrange);
        model.yAxisR = updateYAxisRange(model.yAxisR, model.vrangeR);

        var data = model.data;
        for (var i = 0; i < data.length; i++) {
          var item = data[i], eles = item.elements;

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

        if (newmodel.data == null) { newmodel.data = []; }
        var data = newmodel.data;
        for (var i = 0; i < data.length; i++) {
          var item = data[i], eles = item.elements;

          var useYAxisR = plotUtils.useYAxisR(newmodel, item);
          var itemlogy = useYAxisR ? logyR : logy;
          var itemlogyb = useYAxisR ? logybR : logyb;

          if (eles == null) eles = [];

          item.showItem = true;

          if (item.type == null) {
            item.type = "line";
          }

          if(item.type === "bar" || item.type === "area") {
            //newmodel.yPreventNegative = true; // prevent move to y < 0
          }

          if(item.type === "line" || item.type === "stem") {
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
              ele.x -= item.width / 2;
              ele.x2 = ele.x + item.width;
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
          if (item.type === "constline" || item.type === "constband") { continue; }

          var eles = item.elements;
          var unordered = false;
          for (var j = 1; j < eles.length; j++) {
            if (eles[j].x < eles[j - 1].x) {
              unordered = true;
              break;
            }
          }
          if (unordered === true) {
            if (item.type === "bar" || item.type === "stem" ||
            item.type === "point" || item.type === "text") {
              eles.sort(function(a, b) {
                return a.x - b.x;
              });
            } else {
              item.isUnorderedItem = true;
            }
          }
        }
      },

      standardizeModel : function(_model) {
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
        var newmodel;
        if (model.version === "groovy") {  // model returned from serializer

          newmodel = {
            type : "plot",
            title : model.chart_title != null ? model.chart_title : model.title,
            margin : {},
            userFocus : {},
            xAxis : { label : model.domain_axis_label },
            yAxis : { label : model.y_label },
            yAxisR : model.rangeAxes.length > 1 ? { label : model.rangeAxes[1].label } : null,
            showLegend : model.show_legend != null ? model.show_legend : false,
            legendPosition : model.legend_position != null ? model.legend_position : {position: "TOP_RIGHT"},
            legendLayout : model.legend_layout != null ? model.legend_layout : "VERTICAL",
            omitCheckboxes : model.omit_checkboxes,
            useToolTip : model.use_tool_tip != null ? model.use_tool_tip : false,
            plotSize : {
              "width" : model.init_width != null ? model.init_width : 1200,
              "height" : model.init_height != null ? model.init_height : 350
            },
            nanoOffset : null,
            timezone : model.timezone
          };
        } else {
          newmodel = {
            showLegend : model.showLegend != null ? model.showLegend : false,
            legendPosition : model.legendPosition != null ? model.legendPosition : {position: "TOP_RIGHT"},
            legendLayout : model.legendLayout != null ? model.legendLayout : "VERTICAL",
            omitCheckboxes : model.omitCheckboxes,
            useToolTip : model.useToolTip != null ? model.useToolTip : false,
            xAxis : model.xAxis != null ? model.xAxis : {},
            yAxis : model.yAxis != null ? model.yAxis : {},
            yAxisR : model.yAxisR,
            margin : model.margin != null ? model.margin : {},
            range : model.range != null ? model.range : null,
            userFocus : model.focus != null ? model.focus : {},
            xCursor : model.xCursor,
            yCursor : model.yCursor,
            plotSize : {
              "width" : model.width != null ? model.width : 1200,
              "height": model.height != null ? model.height : 350
            },
            timezone : model.timezone
          };
        }

        newmodel.lodThreshold = (model.lodThreshold) ?
          model.lodThreshold :
          bkHelper.getBkNotebookViewModel().getLodThreshold();

        newmodel.data = [];

        if (model.version === "groovy") {
          plotConverter.convertGroovyData(newmodel, model);
        } else {  // DS generated directly
          _.extend(newmodel, model);
        }
        this.formatModel(newmodel); // fill in null entries, compute y2, etc.
        this.sortModel(newmodel);

        // at this point, data is in standard format (log is applied as well)

        var yAxisData = [], yAxisRData = [];
        for (var i = 0; i < newmodel.data.length; i++) {
          var item = newmodel.data[i];
          if(plotUtils.useYAxisR(newmodel, item)){
            yAxisRData.push(item);
          }else{
            yAxisData.push(item);
          }
        }

        var range = plotUtils.getDataRange(yAxisData).datarange;
        var rangeR = _.isEmpty(yAxisRData) ? null : plotUtils.getDataRange(yAxisRData).datarange;

        var margin = newmodel.margin;
        if (margin.bottom == null) { margin.bottom = .05; }
        if (margin.top == null) { margin.top = .05; }
        if (margin.left == null) { margin.left = .05; }
        if (margin.right == null) { margin.right = .05; }

        if (newmodel.vrange == null) {
          // visible range initially is 10x larger than data range by default
          var getModelRange = function(r){
            return r ? {
              xl : r.xl - r.xspan * 10.0,
              xr : r.xr + r.xspan * 10.0,
              yl : r.yl - r.yspan * 10.0,
              yr : r.yr + r.yspan * 10.0
            } : null;
          };
          newmodel.vrange = getModelRange(range);
          newmodel.vrangeR = getModelRange(rangeR);

          var vrange = newmodel.vrange;
          var vrangeR = newmodel.vrangeR;

          if (newmodel.yPreventNegative === true) {
            vrange.yl = Math.min(0, range.yl);
          }
          if (newmodel.yIncludeZero === true) {
            if (vrange.yl > 0) {
              vrange.yl = 0;
            }
          }

          if(vrangeR && newmodel.yRIncludeZero === true){
            if (vrangeR.yl > 0) {
              vrangeR.yl = 0;
            }
          }

          var focus = newmodel.userFocus; // allow user to overide vrange
          if (focus.xl != null) { vrange.xl = Math.min(focus.xl, vrange.xl); }
          if (focus.xr != null) { vrange.xr = Math.max(focus.xr, vrange.xr); }
          if (focus.yl != null) { vrange.yl = Math.min(focus.yl, vrange.yl); }
          if (focus.yr != null) { vrange.yr = Math.max(focus.yr, vrange.yr); }

          var updateRangeSpan = function(r){
            if(r){
              r.xspan = r.xr - r.xl;
              r.yspan = r.yr - r.yl;
            }
          };
          updateRangeSpan(vrange);
          updateRangeSpan(vrangeR);
        }

        this.remapModel(newmodel);

        newmodel.version = "complete";
        return newmodel;
      }
    };
  };
  beaker.bkoFactory('plotFormatter',
    ["bkUtils", 'plotConverter', 'PlotAxis', 'plotFactory', 'plotUtils', 'bkHelper', retfunc]);
})();

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
  var retfunc = function(bkUtils, PlotAxis, plotFactory, plotUtils) {
    return {
      dataTypeMap : {
        "Line" : "line",
        "Stems" : "stem",
        "Bars" : "bar",
        "Area" : "area",
        "Text" : "text",
        "Points" : "point",
        "" : ""
      },
      lineStyleMap : {
        "DEFAULT": "solid",
        "SOLID" : "solid",
        "DASH" : "dash",
        "DOT" : "dot",
        "DASHDOT" : "dashdot",
        "LONGDASH" : "longdash",
        "" : "solid"
      },
      lineDasharrayMap : {
        "solid" : "",
        "dash" : "9,5",
        "dot" : "2,2",
        "dashdot" : "9,5,2,5",
        "longdash" : "20,5",
        "" : ""
      },
      pointShapeMap : {
        "DEFAULT" : "rect",
        "CIRCLE" : "circle",
        "DIAMOND" : "diamond",
        "" : "rect"
      },
      interpolationMap : {
        0 : "none",
        1 : "linear",
        2 : "linear", // should be "curve" but right now it is not implemented yet
        "" : "linear"
      },

      remapModel : function(model) {
        // map data entrie to [0, 1] of axis range
        var vrange = model.vrange;
        var xAxisLabel = model.xAxis.label,
            yAxisLabel = model.yAxis.label;

        var xAxis = new PlotAxis(model.xAxis.type),
            yAxis = new PlotAxis(model.yAxis.type);

        if (xAxis.getType() !== "time") {
          xAxis.setRange(vrange.xl, vrange.xr, model.xAxis.base);
        } else {
          xAxis.setRange(vrange.xl, vrange.xr, model.timezone);
        }
        if (yAxis.getType() !== "time") {
          yAxis.setRange(vrange.yl, vrange.yr, model.yAxis.base);
        } else {
          yAxis.setRange(vrange.yl, vrange.yr, model.timezone);
        }

        if (xAxisLabel != null) {
          xAxis.setLabel(xAxisLabel);
        }
        if (yAxisLabel != null) {
          yAxis.setLabel(yAxisLabel);
        }
        model.xAxis = xAxis;
        model.yAxis = yAxis;

        var data = model.data;
        for (var i = 0; i < data.length; i++) {

          var item = data[i], eles = item.elements;

          for (var j = 0; j < eles.length; j++) {
            var ele = eles[j];
            if (ele.x != null) {
              ele.x = xAxis.getPercent(ele.x);
            }
            if (ele.x2 != null) {
              ele.x2 = xAxis.getPercent(ele.x2);
            }
            if (ele.y != null) {
              ele.y = yAxis.getPercent(ele.y);
            }
            if (ele.y2 != null) {
              ele.y2 = yAxis.getPercent(ele.y2);
            }
          }
        }
        // map focus region
        var focus = model.focus;
        if (focus.xl != null) { focus.xl = xAxis.getPercent(focus.xl); }
        if (focus.xr != null) { focus.xr = xAxis.getPercent(focus.xr); }
        if (focus.yl != null) { focus.yl = yAxis.getPercent(focus.yl); }
        if (focus.yr != null) { focus.yr = yAxis.getPercent(focus.yr); }
      },

      generateTips : function(model) {
        var data = model.data;
        for (var i = 0; i < data.length; i++) {
          var item = data[i], eles = item.elements;
          for (var j = 0; j < eles.length; j++) {
            var ele = eles[j];
            var txt = "";
            var valx = plotUtils.getTipString(ele._x, model.xAxis),
                valy = plotUtils.getTipString(ele._y, model.yAxis);
            if (item.legend != null) {
              txt += "<div style='font-weight:bold'>" + item.legend + "</div>";
            }
            txt += "<div>x: " + valx + "</div><div>y: " + valy + "</div>";
            if (ele._y2 != null) {
              var valy2 = plotUtils.getTipString(ele._y2, model.yAxis);
              txt += "<div>y2: " + valy2 + "</div>";
            }

            item.elementProps[j].tip_text = txt;
          }
        }
      },

      formatModel: function(newmodel, model) {
        if (newmodel.xCursor != null) {
          var cursor = newmodel.xCursor;
          if (cursor.color == null) { cursor.color = "black"; }
          if (cursor.width == null) { cursor.width = 2; }
        }
        var logx = newmodel.xAxis.type === "log",
            logxb = newmodel.xAxis.base,
            logy = newmodel.yAxis.type === "log",
            logyb = newmodel.yAxis.base;
        // fill in null entries, compute y2, etc.
        // move some of format SerializedData to formatData?
        var data = newmodel.data;
        for (var i = 0; i < data.length; i++) {
          var item = data[i], eles = item.elements;

          if (eles == null) eles = [];

          item.shown = true;

          if (item.type == null) {
            item.type = "line";
          }

          if(item.type === "bar" || item.type === "area") {
            //newmodel.yPreventNegative = true; // prevent move to y < 0
          }

          if(item.type === "line" || item.type === "stem") {
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

            if (item.type === "bar") {
              var w = item.width;
              ele.x = ele.x - w/2;
              ele.x2 = ele.x + w/2;
            }
            if (item.type === "area" || item.type === "bar" || item.type === "stem") {
              if (item.y2 == null) {
                if (item.height != null) {
                  ele.y2 = ele.y - item.height;
                } else if (item.base != null) {
                  ele.y2 = item.base;
                } else if (item.bases != null) {
                  ele.y2 = item.bases[j];
                } else {
                  ele.y2 = logy ? 1 : 0;
                }
              } else {
                ele.y2 = item.y2[j];
              }
            }
            if (item.type === "point") {
              if (item.size != null) {
                ele.size = item.size;
              } else if (item.sizes != null) {
                ele.size = item.sizes[j];
              } else {
                ele.size = item.style === "rect"? 10 : 5;
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
              if (logy) {
                ele.y = Math.log(ele.y) / Math.log(logyb);
              }
            }
            if (ele.y2 != null) {
              ele._y2 = ele.y2;
              if (logy) {
                ele.y2 = Math.log(ele.y2) / Math.log(logyb);
              }
            }
          }
          // recreate rendering objects
          item.id = "i" + i;

          data[i] = plotFactory.createPlotItem(item);

          console.log(data[i]);
        }

        // apply log to focus
        var focus = newmodel.focus;
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


      formatGroovyData : function(newmodel, model) {
        var yIncludeZero = false;
        var logx = false, logy = false, logxb, logyb;
        if (model.rangeAxes != null) {
          var axis = model.rangeAxes[0];
          if (axis.auto_range_includes_zero === true) {
            yIncludeZero = true;
          }
          if (axis.use_log === true) {
            logy = true;
            logyb = axis.log_base == null ? 10 : axis.log_base;
          }
        }
        if (model.log_x === true) {
          logx = true;
          logxb = model.x_log_base;
        }
        // set margin
        newmodel.margin = {};
        // set axis bound as focus
        if (model.x_auto_range === false) {
          if (model.x_lower_bound != null) {
            newmodel.focus.xl = model.x_lower_bound;
          }
          if (model.x_upper_bound != null) {
            newmodel.focus.xr = model.x_upper_bound;
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
              newmodel.focus.yl = axis.lower_bound;
            }
            if (axis.upper_bound != null) {
              newmodel.focus.yr = axis.upper_bound;
            }
          } else {
            if (axis.lower_margin != null) {
              newmodel.margin.bottom = axis.lower_margin;
            }
            if (axis.upper_margin != null) {
              newmodel.margin.top = axis.upper_margin;
            }
          }
        }

        if (model.crosshair != null) {
          var color = model.crosshair.color;
          newmodel.xCursor = {};
          var cursor = newmodel.xCursor;

          cursor.color_opacity = parseInt(color.substr(1,2), 16) / 255;
          cursor.color = "#" + color.substr(3);

          var style = model.crosshair.style;
          if (style == null) style = "";
          style = this.lineStyleMap[style];
          cursor.stroke_dasharray = this.lineDasharrayMap[style];
          cursor.width = model.crosshair.width != null ? model.crosshair.width : 2;

          newmodel.yCursor = {};
          _.extend(newmodel.yCursor, cursor);
        }

        // log scaling
        if (logx) {
          newmodel.xAxis.type = "log";
          newmodel.xAxis.base = logxb;
        } else if (model.type === "TimePlot") {
          newmodel.xAxis.type = "time";
        } else if (model.type === "NanoPlot"){  // TODO
        } else {
          newmodel.xAxis = "linear";
        }

        if (logy) {
          newmodel.yAxis.type = "log";
          newmodel.yAxis.base = logyb;
        } else {
          newmodel.yAxis.type = "linear";
        }

        var list = model.graphics_list;
        var numLines = list.length;
        for (var i = 0; i < numLines; i++) {
          var item = list[i];

          item.legend = item.display_name;
          delete item.display_name;

          if (item.color != null) {
            item.color_opacity = parseInt(item.color.substr(1,2), 16) / 255;
            item.color = "#" + item.color.substr(3);
          }
          if (item.fill != null && item.fill === false) {
            item.color = "none";
          }
          if (item.outline_color != null) {
            item.stroke_opacity = parseInt(item.outline_color.substr(1,2), 16) / 255;
            item.stroke = "#" + item.outline_color.substr(3);
            delete item.outline_color;
          }

          if (item.type == null) { item.type = ""; }
          if (item.style == null) { item.style = ""; }
          if (item.stroke_dasharray == null) { item.stroke_dasharray = ""; }
          if (item.interpolation == null) { item.interpolation = ""; }

          item.type = this.dataTypeMap[item.type];

          if(item.type === "bar" || item.type === "area") {
            //newmodel.yPreventNegative = true; // auto range to y = 0
          }

          if(item.type === "line" || item.type === "stem") {
            item.style = this.lineStyleMap[item.style];
            item.stroke_dasharray = this.lineDasharrayMap[item.style];
          }

          if(item.type === "line" || item.type === "area") {
            item.interpolation = this.interpolationMap[item.interpolation];
          }

          if(item.type === "bar") {
            if (item.width == null) {
              item.width = 1;
            }
          }

          if (item.type === "point") {
            if (item.shape == null) {
              item.shape = "DEFAULT";
            }
            item.shape = this.pointShapeMap[item.shape];
          }

          var elements = [];
          var numEles = item.x.length;
          for (var j = 0; j < numEles; j++) {
            var ele = {};
            ele.x = item.x[j];
            ele.y = item.y[j];
            if (item.colors != null) {
              ele.color_opacity = parseInt(item.colors[j].substr(1,2), 16) / 255;
              ele.color = "#" + item.colors[j].substr(3);
            }
            if (item.fills != null && item.fills[j] === false) {
              ele.color = "none";
            }
            if (item.outline_colors != null) {
              ele.stroke_opacity = parseInt(item.outline_colors[j].substr(1,2), 16) / 255;
              ele.stroke = "#" + item.outline_colors[j].substr(3);
            }

            if (item.type === "line" || item.type === "stem") {
              if (item.styles != null) {
                var style = item.styles[j];
                if (style == null) {
                  style = "";
                }
                var shape = this.lineStyleMap[style];
                ele.stroke_dasharray = this.lineDasharrayMap[shape];
              }
            }
            elements.push(ele);
          }

          item.elements = elements;

          newmodel.data.push(item);
        }
        if(model.constant_lines != null) {
          for(var i = 0; i < model.constant_lines.length; i++) {
            var line = model.constant_lines[i];
            var item = {
              "type": "constline",
              "width": line.width != null ? line.width : 1,
              "color": "black",
              "elements": []
            };
            if (line.color != null) {
              item.color_opacity = parseInt(line.color.substr(1,2), 16) / 255;
              item.color = "#" + line.color.substr(3);
            }
            var style = line.style;
            if (style == null) { style = ""; }
            style = this.lineStyleMap[style];
            item.stroke_dasharray = this.lineDasharrayMap[style];

            if (line.x != null) {
              var ele = {"type": "x", "x": line.x};
            } else if(line.y != null) {
              var y = line.y;
              var ele = {"type": "y", "y": y};
            }
            item.elements.push(ele);
            newmodel.data.push(item);
          }
        }
        if (model.constant_bands != null) {
          for (var i = 0; i < model.constant_bands.length; i++) {
            var band = model.constant_bands[i];
            var item = {
              "type" : "constband",
              "elements" : []
            };
            if (band.color != null) {
              item.color_opacity = parseInt(band.color.substr(1, 2), 16) / 255;
              item.color = "#" + band.color.substr(3);
            }
            if (band.x != null) {
              var ele = {
                "type" : "x",
                "x" : band.x[0],
                "x2" : band.x[1]
              };
            } else if (band.y != null) {
              var ele = {
                "type" : "y"
              };
              var y1 = band.y[0], y2 = band.y[1];
              ele.y = y1;
              ele.y2 = y2;
            }
            item.elements.push(ele);
            newmodel.data.push(item);
          }
        }
        if (model.texts != null) {
          for (var i = 0; i < model.texts.length; i++) {
            var mtext = model.texts[i];
            var item = {
              "type" : "text",
              "color" : mtext.color != null ? mtext.color : "black",
              "elements" : []
            };
            var ele = {
              "x" : mtext.x,
              "y" : mtext.y,
              "v" : mtext.text
            };
            item.elements.push(ele);
            newmodel.data.push(item);
          }
        }
        newmodel.yIncludeZero = yIncludeZero;
      },
      cleanupModel : function(model) {
        for (var i = 0; i < model.data.length; i++) {
          var item = model.data[i];
          if (item.x != null) { delete item.x; }
          if (item.y != null) { delete item.y; }
          if (item.colors) { delete item.colors; }
          if (item.sizes) { delete item.sizes; }
          if (item.bases) { delete item.bases; }
          if (item.outline_colors) { delete item.outline_colors; }
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
            focus : {},
            xAxis : {},
            yAxis : {},
            xAxisLabel : model.domain_axis_label,
            yAxisLabel : model.y_label,
            showLegend : model.show_legend != null ? model.show_legend : false,
            useToolTip : model.use_tool_tip != null ? model.use_tool_tip : false,
            initSize : {
              "width" : model.init_width != null ? model.init_width : 1200,
              "height" : model.init_height != null ? model.init_height : 350
            },
            nanoOffset : null,
            timezone : model.timezone
          };
        } else {
          newmodel = {
            showLegend : model.showLegend != null ? model.showLegend : false,
            useToolTip : model.useToolTip != null ? model.useToolTip : false,
            xAxis : model.xAxis != null ? model.xAxis : {},
            yAxis : model.yAxis != null ? model.yAxis : {},
            margin : model.margin != null ? model.margin : {},
            range : model.range != null ? model.range : null,
            focus : model.focus != null ? model.focus : {},
            xCursor : model.xCursor,
            yCursor : model.yCursor,
            initSize : {
              "width" : model.width != null ? model.width : 1200,
              "height": model.height != null ? model.height : 350
            },
            timezone : model.timezone
          };
        }

        newmodel.data = [];

        if (model.version === "groovy") {
          this.formatGroovyData(newmodel, model);
        } else {  // DS generated directly
          _.extend(newmodel, model);
        }
        this.formatModel(newmodel, model); // fill in null entries, compute y2, etc.


        // at this point, data is in standard format (log is applied as well)

        var range = plotUtils.getDataRange(newmodel.data).datarange;

        var margin = newmodel.margin;
        if (margin.bottom == null) { margin.bottom = .05; }
        if (margin.top == null) { margin.top = .05; }
        if (margin.left == null) { margin.left = .05; }
        if (margin.right == null) { margin.right = .05; }

        if (newmodel.vrange == null) {
          // visible range initially is 10x larger than data range by default
          newmodel.vrange = {
            xl : range.xl - range.xspan * 10.0,
            xr : range.xr + range.xspan * 10.0,
            yl : range.yl - range.yspan * 10.0,
            yr : range.yr + range.yspan * 10.0
          };
          var vrange = newmodel.vrange;

          if (newmodel.yPreventNegative === true) {
            vrange.yl = Math.min(0, range.yl);
          }
          if (newmodel.yIncludeZero === true) {
            if (vrange.yl > 0) {
              vrange.yl = 0;
            }
          }
          var focus = newmodel.focus; // allow user to overide vrange
          if (focus.xl != null) { vrange.xl = Math.min(focus.xl, vrange.xl); }
          if (focus.xr != null) { vrange.xr = Math.max(focus.xr, vrange.xr); }
          if (focus.yl != null) { vrange.yl = Math.min(focus.yl, vrange.yl); }
          if (focus.yr != null) { vrange.yr = Math.max(focus.yr, vrange.yr); }

          vrange.xspan = vrange.xr - vrange.xl;
          vrange.yspan = vrange.yr - vrange.yl;
        }

        this.remapModel(newmodel);
        this.generateTips(newmodel);


        //this.cleanupModel(newmodel);

        newmodel.version = "complete";
        console.log(newmodel);
        return newmodel;
      }
    };
  };
  beaker.bkoFactory('plotConverter', ["bkUtils", 'PlotAxis', 'plotFactory', 'plotUtils', retfunc]);
})();

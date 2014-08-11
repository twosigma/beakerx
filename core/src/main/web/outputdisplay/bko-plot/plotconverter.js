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
  var retfunc = function(bkUtils, plotAxis, plotUtils) {
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

        var xAxis = new plotAxis(model.xAxis.type),
            yAxis = new plotAxis(model.yAxis.type);

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
          var dat = data[i], eles = dat.elements;
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
        var focus = model.focus;
        if (focus.xl != null) { focus.xl = xAxis.getPercent(focus.xl); }
        if (focus.xr != null) { focus.xr = xAxis.getPercent(focus.xr); }
        if (focus.yl != null) { focus.yl = yAxis.getPercent(focus.yl); }
        if (focus.yr != null) { focus.yr = yAxis.getPercent(focus.yr); }
      },
      generateTips : function(model) {
        var data = model.data;
        for (var i = 0; i < data.length; i++) {
          var dat = data[i], eles = dat.elements;
          for (var j = 0; j < eles.length; j++) {
            var ele = eles[j];
            var txt = "";
            var valx = plotUtils.getTipString(ele._x, model.xAxis);
            var valy = plotUtils.getTipString(ele._y, model.yAxis);
            if (dat.legend != null) {
              txt += "<div>" + dat.legend + "</div>";
            }
            txt += "<div>x: " + valx + "</div><div>y: " + valy + "</div>";
            if (ele._y2 != null) {
              var valy2 = plotUtils.getTipString(ele._y2, model.yAxis);
              txt += "<div>y2: " + valy2 + "</div>";
            }
            ele.tip_value = txt;
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
        //var logy = newmodel.yScale.type === "log", logyb = newmodel.yScale.base;
        for (var i = 0; i < data.length; i++) {
          var dat = data[i], eles = dat.elements;

          if (eles == null) eles = [];

          dat.shown = true;

          if (dat.type == null) {
            dat.type = "line";
          }

          if(dat.type === "bar" || dat.type === "area") {
            //newmodel.yPreventNegative = true; // prevent move to y < 0
          }

          if(dat.type === "line" || dat.type === "stem") {
            if (dat.style == null) {
              dat.style = "solid";
            }
            dat.stroke_dasharray = this.lineDasharrayMap[dat.style];
          }

          if(dat.type === "line" || dat.type === "area") {
            if (dat.interpolation === "curve") {
            }
          }

          if (dat.type === "line" || dat.type === "stem") {
            if (dat.width == null) {
              dat.width = 2;
            }
          }
          if (dat.type === "bar" && dat.width == null) {
            dat.width = 1;
          }

          if (dat.colorOpacity != null) {
            dat.color_opacity = dat.colorOpacity;
            delete dat.colorOpacity;
          }
          if (dat.outlineColor != null) {
            dat.stroke = dat.outlineColor;
            delete dat.outlineColor;
          }
          if (dat.outlineWidth != null) {
            dat.stroke_width = dat.outlineWidth;
            delete dat.outlineWidth;
          }
          if (dat.outlineOpacity != null) {
            dat.stroke_opacity = dat.outlineOpacity;
            delete dat.outlineOpacity;
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

            if (dat.type === "bar") {
              var w = dat.width;
              ele.x = ele.x - w/2;
              ele.x2 = ele.x + w/2;
            }
            if (dat.type === "area" || dat.type === "bar" || dat.type === "stem") {
              if (dat.y2 == null) {
                if (dat.height != null) {
                  ele.y2 = ele.y - dat.height;
                } else if (dat.base != null) {
                  ele.y2 = dat.base;
                } else if (dat.bases != null) {
                  ele.y2 = dat.bases[j];
                } else {
                  ele.y2 = logy ? 1 : 0;
                }
              } else {
                ele.y2 = dat.y2[j];
              }
            }
            if (dat.type === "point") {
              if (dat.size != null) {
                ele.size = dat.size;
              } else if (dat.sizes != null) {
                ele.size = dat.sizes[j];
              } else {
                ele.size = dat.style === "rect"? 10 : 5;
              }
            }

            if (dat.type === "area") {
              if (dat.interpolation == null) {
                dat.interpolation = "linear";
              }
            }

            // swap y, y2
            if (ele.y != null && ele.y2 != null && ele.y < ele.y2) {
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
        }
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
          var dat = _.omit(list[i]);

          dat.legend = dat.display_name;
          delete dat.display_name;

          if (dat.color != null) {
            dat.color_opacity = parseInt(dat.color.substr(1,2), 16) / 255;
            dat.color = "#" + dat.color.substr(3);
          }
          if (dat.fill != null && dat.fill === false) {
            dat.color = "none";
          }
          if (dat.outline_color != null) {
            dat.stroke_opacity = parseInt(dat.outline_color.substr(1,2), 16) / 255;
            dat.stroke = "#" + dat.outline_color.substr(3);
            delete dat.outline_color;
          }

          if (dat.type == null) { dat.type = ""; }
          if (dat.style == null) { dat.style = ""; }
          if (dat.stroke_dasharray == null) { dat.stroke_dasharray = ""; }
          if (dat.interpolation == null) { dat.interpolation = ""; }

          dat.type = this.dataTypeMap[dat.type];

          if(dat.type === "bar" || dat.type === "area") {
            //newmodel.yPreventNegative = true; // auto range to y = 0
          }

          if(dat.type === "line" || dat.type === "stem") {
            dat.style = this.lineStyleMap[dat.style];
            dat.stroke_dasharray = this.lineDasharrayMap[dat.style];
          }

          if(dat.type === "line" || dat.type === "area") {
            dat.interpolation = this.interpolationMap[dat.interpolation];
          }

          if(dat.type === "bar") {
            if (dat.width == null) {
              dat.width = 1;
            }
          }

          if (dat.type === "point") {
            if (dat.shape == null) {
              dat.shape = "DEFAULT";
            }
            dat.style = this.pointShapeMap[dat.shape];
          }

          var elements = [];
          var numEles = dat.x.length;
          for (var j = 0; j < numEles; j++) {
            var ele = {
              uniqid : i + "_" + j
            };
            ele.x = dat.x[j];
            ele.y = dat.y[j];
            if (dat.colors != null) {
              ele.color_opacity = parseInt(dat.colors[j].substr(1,2), 16) / 255;
              ele.color = "#" + dat.colors[j].substr(3);
            }
            if (dat.fills != null && dat.fills[j] === false) {
              ele.color = "none";
            }
            if (dat.outline_colors != null) {
              ele.stroke_opacity = parseInt(dat.outline_colors[j].substr(1,2), 16) / 255;
              ele.stroke = "#" + dat.outline_colors[j].substr(3);
            }

            if (dat.type === "line" || dat.type === "stem") {
              if (dat.styles != null) {
                var style = dat.styles[j];
                if (style == null) {
                  style = "";
                }
                var shape = this.lineStyleMap[style];
                ele.stroke_dasharray = this.lineDasharrayMap[shape];
              }
            }
            elements.push(ele);
          }

          dat.elements = elements;

          newmodel.data.push(dat);
        }
        if(model.constant_lines != null) {
          for(var i = 0; i < model.constant_lines.length; i++) {
            var line = model.constant_lines[i];
            var dat = {
              "type": "constline",
              "width": line.width != null ? line.width : 1,
              "color": "black",
              "elements": []
            };
            if (line.color != null) {
              dat.color_opacity = parseInt(line.color.substr(1,2), 16) / 255;
              dat.color = "#" + line.color.substr(3);
            }
            var style = line.style;
            if (style == null) { style = ""; }
            style = this.lineStyleMap[style];
            dat.stroke_dasharray = this.lineDasharrayMap[style];

            if (line.x != null) {
              var ele = {"type": "x", "x": line.x};
            } else if(line.y != null) {
              var y = line.y;
              var ele = {"type": "y", "y": y};
            }
            dat.elements.push(ele);
            newmodel.data.push(dat);
          }
        }
        if (model.constant_bands != null) {
          for (var i = 0; i < model.constant_bands.length; i++) {
            var band = model.constant_bands[i];
            var dat = {
              "type" : "constband",
              "elements" : []
            };
            if (band.color != null) {
              dat.color_opacity = parseInt(band.color.substr(1, 2), 16) / 255;
              dat.color = "#" + band.color.substr(3);
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
            dat.elements.push(ele);
            newmodel.data.push(dat);
          }
        }
        if (model.texts != null) {
          for (var i = 0; i < model.texts.length; i++) {
            var mtext = model.texts[i];
            var dat = {
              "type" : "text",
              "color" : mtext.color != null ? mtext.color : "black",
              "elements" : []
            };
            var ele = {
              "x" : mtext.x,
              "y" : mtext.y,
              "v" : mtext.text
            };
            dat.elements.push(ele);
            newmodel.data.push(dat);
          }
        }
        newmodel.yIncludeZero = yIncludeZero;
      },
      cleanupModel : function(model) {
        for (var i = 0; i < model.data.length; i++) {
          var dat = model.data[i];
          if (dat.x != null) { delete dat.x; }
          if (dat.y != null) { delete dat.y; }
          if (dat.colors) { delete dat.colors; }
          if (dat.sizes) { delete dat.sizes; }
          if (dat.bases) { delete dat.bases; }
          if (dat.outline_colors) { delete dat.outline_colors; }
        }
      },
      standardizeModel : function(_model) {
        var model = {};
        $.extend(true, model, _model); // deep copy model to prevent changing the original JSON

        if (model.graphics_list != null) {
          model.version = "groovy";  // TODO, a hack now to check DS source
        }
        if (model.version === "complete") { // skip standardized model in combined plot
          //console.log("pass", model);
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

        this.cleanupModel(newmodel);
        newmodel.version = "complete";
        console.log(newmodel);
        return newmodel;
      }
    };
  };
  beaker.bkoFactory('plotConverter', ["bkUtils", 'plotAxis', 'plotUtils', retfunc]);
})();

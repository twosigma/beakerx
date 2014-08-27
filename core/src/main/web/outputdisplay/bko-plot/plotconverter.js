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
  var retfunc = function(bkUtils) {
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

      convertGroovyData : function(newmodel, model) {
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
          logxb = model.x_log_base == null ? 10 : model.x_log_base;
        }
        // set margin
        newmodel.margin = {};
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
          cursor.style = this.lineStyleMap[style];
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
          newmodel.xAxis.type = "linear";
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

          if (item.use_tool_tip != null) {
            item.useToolTip = item.use_tool_tip;
            delete item.use_tool_tip;
          }

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

          if (item.base != null && logy) {
            if (item.base === 0) {
              item.base = 1;
            }
          }

          var elements = [];
          for (var j = 0; j < item.x.length; j++) {
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
                item.style = this.lineStyleMap[style];
              }
            }

            if ((item.type === "stem" || item.type === "bar" || item.type === "area") &&
              ele.y2 == null) {
              if (item.bases != null) {
                ele.y2 = item.bases[j];
              }
            }

            if (item.type === "point") {
              if (item.sizes != null) {
                ele.size = item.sizes[j];
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
            item.style = this.lineStyleMap[style];

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
              "text" : mtext.text
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
      }
    };
  };
  beaker.bkoFactory('plotConverter', ["bkUtils", retfunc]);
})();

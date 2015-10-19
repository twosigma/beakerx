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
  var retfunc = function(bkUtils, plotUtils) {

    var calcxs = function(categoryItem, categoryMargin, categoriesNumber, seriesNumber) {
      var xs = new Array(seriesNumber);
      for (var i = 0; i < xs.length; i++) {
        xs[i] = new Array(categoriesNumber);
      }

      var resWidth = 0;
      for (var colindex = 0; colindex < categoriesNumber; colindex++) {
        for (var rowindex = 0; rowindex < seriesNumber; rowindex++) {
          var elWidth;
          if (_.isArray(categoryItem.widths)) {
            var rowWidths = categoryItem.widths[rowindex];
            if (_.isArray(rowWidths)) {
              elWidth = rowWidths[colindex];
            } else {
              elWidth = rowWidths;
            }
          } else {
            elWidth = categoryItem.width;
          }
          resWidth += elWidth || 1; //FIXME why width is null?
          xs[rowindex][colindex] = resWidth;
        }
        resWidth += categoryMargin;
      }
      return xs;
    };

    var processItem = function(item, newmodel, yAxisRSettings, yAxisSettings) {
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

      item.type = dataTypeMap[item.type];

      if(item.type === "bar" || item.type === "area") {
        //newmodel.yPreventNegative = true; // auto range to y = 0
      }

      if(item.type === "line" || item.type === "stem") {
        item.style = lineStyleMap[item.style];
      }

      if(item.type === "line" || item.type === "area") {
        item.interpolation = interpolationMap[item.interpolation];
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
        item.shape = pointShapeMap[item.shape];
      }

      var yAxisSettings = plotUtils.useYAxisR(newmodel, item) ? yAxisRSettings : yAxisSettings;
      if (item.base != null && yAxisSettings.logy) {
        if (item.base === 0) {
          item.base = 1;
        }
      }
    };

    var processElement = function(item, j, ele, yAxisSettings, logx) {
      // discard NaN entries
      if (ele.x === "NaN" || ele.y === "NaN" ||
        logx && ele.x <= 0 || yAxisSettings.logy && ele.y <= 0 )
        return;

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
          item.style = lineStyleMap[style];
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

      if (item.type === "bar" && item.widths != null) {
        ele.x -= item.widths[j] / 2;
        ele.x2 = ele.x + item.widths[j];
      }
    };

    var dataTypeMap = {
      "Line" : "line",
      "Stems" : "stem",
      "Bars" : "bar",
      "Area" : "area",
      "Text" : "text",
      "Points" : "point",
      "CategoryLine" : "line",
      "CategoryStems" : "stem",
      "CategoryBars" : "bar",
      "CategoryArea" : "area",
      "CategoryText" : "text",
      "CategoryPoints" : "point",
      "" : ""
    };
    var lineStyleMap = {
      "DEFAULT": "solid",
      "SOLID" : "solid",
      "DASH" : "dash",
      "DOT" : "dot",
      "DASHDOT" : "dashdot",
      "LONGDASH" : "longdash",
      "" : "solid"
    };
    var pointShapeMap = {
      "DEFAULT" : "rect",
      "CIRCLE" : "circle",
      "DIAMOND" : "diamond",
      "" : "rect"
    };
    var interpolationMap = {
      0 : "none",
      1 : "linear",
      2 : "linear", // should be "curve" but right now it is not implemented yet
      "" : "linear"
    };

    return {
      dataTypeMap : dataTypeMap,
      lineStyleMap : lineStyleMap,
      pointShapeMap : pointShapeMap,
      interpolationMap : interpolationMap,

      convertGroovyData : function(newmodel, model) {
        var logx = false, logxb;
        var yAxisSettings = {yIncludeZero: false, logy: false, logyb: null};
        var yAxisRSettings = _.clone(yAxisSettings);
        if (model.rangeAxes != null) {
          var updateAxisSettings = function(axis, settings){
            if (axis.auto_range_includes_zero === true) {
              settings.yIncludeZero = true;
            }
            if (axis.use_log === true) {
              settings.logy = true;
              settings.logyb = axis.log_base == null ? 10 : axis.log_base;
            }
          };

          updateAxisSettings(model.rangeAxes[0], yAxisSettings);
          if(model.rangeAxes.length > 1){
            updateAxisSettings(model.rangeAxes[1], yAxisRSettings);
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
          cursor.style = lineStyleMap[style];
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
        //TODO
        //else if (model.type === "CategoryPlot") {
        // newmodel.xAxis.type = "category";
        //}

        var setYAxisType = function(axis, settings){
          if(axis == null){ return; }
          if (settings.logy) {
            axis.type = "log";
            axis.base = settings.logyb;
          } else {
            axis.type = "linear";
          }
        };
        setYAxisType(newmodel.yAxis, yAxisSettings);
        setYAxisType(newmodel.yAxisR, yAxisRSettings);

        var list = model.graphics_list;
        var numLines = list.length;
        if(model.type !== "CategoryPlot"){
          for (var i = 0; i < numLines; i++) {
            var item = list[i];

            processItem(item, newmodel, yAxisRSettings, yAxisSettings);

            var elements = [];
            for (var j = 0; j < item.x.length; j++) {
              var ele = {};
              ele.x = item.x[j];
              ele.y = item.y[j];

              processElement(item, j, ele, yAxisSettings);

              elements.push(ele);
            }

            item.elements = elements;

            newmodel.data.push(item);
          }
        }else{
          for (var index = 0; index < list.length; index++) {
            var categoryItem = list[index]; //e.g. CategoryBar
            var value = categoryItem.value;
            var categoriesNumber = value[0].length;
            var seriesNumber = value.length;
            var seriesNames = categoryItem.seriesNames;
            if (seriesNames == null) {
              seriesNames = [];
              for (var s = 0; s < seriesNumber; s++) {
                seriesNames.push("series" + s);
              }
            }

            model.categoryMargin = 1; //FIXME

            var xs = calcxs(categoryItem, model.categoryMargin, categoriesNumber, seriesNumber);

            for (var i = 0; i < seriesNumber; i++) {
              var series = value[i];
              var item = _.extend({}, categoryItem);//
              item.series = i;
              item.display_name = seriesNames[i];

              var processSeriesProperty = function (seriesindex, property, seriesproperty) {
                if (item[property]) {
                  var seriesPropertyValue = item[property][seriesindex];
                  if (_.isArray(seriesPropertyValue)) {
                    item[property] = seriesPropertyValue;
                  } else {
                    item[seriesproperty] = seriesPropertyValue;
                    delete item[property];
                  }
                }
              };
              processSeriesProperty(i, 'colors', 'color');
              processSeriesProperty(i, 'widths', 'widths');
              processSeriesProperty(i, 'outline_colors', 'outline_color');
              processSeriesProperty(i, 'bases', 'base');
              processSeriesProperty(i, 'fills', 'fill');
              processSeriesProperty(i, 'outlines', 'outline');
              processSeriesProperty(i, 'styles', 'style');

              delete item.value;
              delete item.seriesNames;

              item.y = [];
              item.x = [];
              for (var j = 0; j < categoriesNumber; j++) {
                item.y.push(series[j]);
                item.x.push(xs[i][j]);
              }

              processItem(item, newmodel, yAxisRSettings, yAxisSettings);

              var elements = [];
              for (var j = 0; j < item.x.length; j++) {
                var ele = {
                  series: i,
                  category: j,
                  x: item.x[j],
                  y: item.y[j]
                };

                processElement(item, j, ele, yAxisSettings);

                elements.push(ele);
              }

              item.elements = elements;

              newmodel.data.push(item);
            }
          }
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
            item.style = lineStyleMap[style];

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
        newmodel.yIncludeZero = yAxisSettings.yIncludeZero;
        newmodel.yRIncludeZero = yAxisRSettings.yIncludeZero;
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
  beaker.bkoFactory('plotConverter', ["bkUtils", "plotUtils", retfunc]);
})();

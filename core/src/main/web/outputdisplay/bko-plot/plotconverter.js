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

    var calcWidths = function(categoryItems){

      var plotCategoriesNumber = 0;
      var plotSeriesNumber = 0;

      for (var i = 0; i < categoryItems.length; i++) {
        var categoryItem = categoryItems[i]; //e.g. CategoryBar
        var value = categoryItem.value;
        plotCategoriesNumber = Math.max(plotCategoriesNumber, value[0].length);
        plotSeriesNumber = Math.max(plotSeriesNumber, value.length);
      }

      var calculatedWidths = new Array(plotSeriesNumber);
      for (var i = 0; i < calculatedWidths.length; i++) {
        calculatedWidths[i] = Array.apply(null, Array(plotCategoriesNumber)).map(function (item, index) {
          return 0;
        });
      }

      for (var index = 0; index < categoryItems.length; index++) {
        var categoryItem = categoryItems[index]; //e.g. CategoryBar
        var itemCategoriesNumber = categoryItem.value[0].length;
        var itemSeriesNumber = categoryItem.value.length;

        for (var colindex = 0; colindex < itemCategoriesNumber; colindex++) {
          for (var rowindex = 0; rowindex < itemSeriesNumber; rowindex++) {
            if (_.isArray(categoryItem.widths)) {
              var rowWidths = categoryItem.widths[rowindex];
              if (_.isArray(rowWidths)) {
                calculatedWidths[rowindex][colindex] = Math.max(calculatedWidths[rowindex][colindex], rowWidths[colindex]);
              } else {
                calculatedWidths[rowindex][colindex] = Math.max(calculatedWidths[rowindex][colindex], rowWidths);
              }
            } else {
              calculatedWidths[rowindex][colindex] = Math.max(calculatedWidths[rowindex][colindex], categoryItem.width);
            }
          }
        }
      }

      return calculatedWidths;
    };


    var calccategoryitem = function(newmodel, categoryItem, categoriesNumber, seriesNumber, calculatedWidths) {

      var categoryMargin = newmodel.categoryMargin;

      var elementsxs = new Array(seriesNumber);
      for (var i = 0; i < elementsxs.length; i++) {
        elementsxs[i] = new Array(categoriesNumber);
      }
      var labelsxs = [];

      var resWidth = 0;

      for (var colindex = 0; colindex < categoriesNumber; colindex++) {
        var categoryxl = resWidth;
        var maxRowWidth = 0;
        for (var rowindex = 0; rowindex < seriesNumber; rowindex++) {

          var elWidth = calculatedWidths[rowindex][colindex] || 1; //FIXME why width default value is not set?
          elementsxs[rowindex][colindex] = resWidth + elWidth / 2;

          if (!categoryItem.center_series) {
            resWidth += elWidth;
          } else {
            maxRowWidth = Math.max(maxRowWidth, elWidth)
          }
        }
        if (categoryItem.center_series) {
          resWidth += maxRowWidth;
        }

        labelsxs.push(categoryxl + (resWidth - categoryxl) / 2);
        resWidth += categoryMargin;
      }
      return {
        elementsxs: elementsxs,
        labelsxs: labelsxs
      };
    };

    var  processItem = function(item, index, newmodel, yAxisRSettings, yAxisSettings) {
      item.legend = item.display_name;
      delete item.display_name;

      if (item.use_tool_tip != null) {
        item.useToolTip = item.use_tool_tip;
        delete item.use_tool_tip;
      }

      if(item.color == null && item.colors == null) {
        //set default colors
        item.color = plotUtils.getDefaultColor(index);
      }

      if (item.color != null) {
        item.color_opacity = parseInt(item.color.substr(1,2), 16) / 255;
        item.color = "#" + item.color.substr(3);
      }
      if (item.fill != null && item.fill === false) {
        item.color = "none";
      }
      if (item.outline_color != null) {
        if (!item.hasOwnProperty("outline") && !item.hasOwnProperty("outlines") ||
            item.hasOwnProperty("outline") && item.outline === true) {
          item.stroke_opacity = parseInt(item.outline_color.substr(1, 2), 16) / 255;
          item.stroke = "#" + item.outline_color.substr(3);
          //do not remove item.outline_color here, it is used in processElement()
        }
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

      if (item.tooltips){
        ele.tooltip = item.tooltips[j];
      }

      // discard NaN entries
      if (ele.x === "NaN" || ele.y === "NaN" ||
        logx && ele.x <= 0 || yAxisSettings.logy && ele.y <= 0 )
        return false;

      if (item.colors != null) {
        ele.color_opacity = parseInt(item.colors[j].substr(1,2), 16) / 255;
        ele.color = "#" + item.colors[j].substr(3);
      }
      if (item.fills != null && item.fills[j] === false) {
        ele.color = "none";
      }
      if (item.hasOwnProperty("outlines") || item.hasOwnProperty("outline")) {
        if (item.outlines && item.outlines[j] === true || item.outline === true) {
          if (item.outline_colors != null) {
            ele.stroke_opacity = parseInt(item.outline_colors[j].substr(1, 2), 16) / 255;
            ele.stroke = "#" + item.outline_colors[j].substr(3);
          } else if (item.outline_color != null) {
            ele.stroke_opacity = parseInt(item.outline_color.substr(1, 2), 16) / 255;
            ele.stroke = "#" + item.outline_color.substr(3);
          } else {
            ele.stroke_opacity = 1;
            ele.stroke = plotUtils.colorToHex("black");
          }
        }
      } else if (item.outline_colors != null) {
        ele.stroke_opacity = parseInt(item.outline_colors[j].substr(1,2), 16) / 255;
        ele.stroke = "#" + item.outline_colors[j].substr(3);
      }

      if (item.type === "line" || item.type === "stem") {
        if (item.styles != null) {
          var style = item.styles[j];
          if (style == null) {
            style = "";
          }
          if (item.type === "line")
            item.style = lineStyleMap[style];
          else
            ele.style = lineStyleMap[style];
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
        ele.x = plotUtils.minus(ele.x, item.widths[j] / 2);
        ele.x2 = plotUtils.plus(ele.x, item.widths[j]);
      }
      return true;
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
      "TreeMapNode" : "treemapnode",
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

      convertTreeMapGroovyData: function (newmodel, model) {

        newmodel.process = process;

        function findParent(node) {
          var data = model.children;
          for (var i = 0; i < data.length; i++) {
            var _node_ = data[i];
            var _parent_ = _findParent_(_node_, node);
            if (_parent_)
              return _parent_;
          }

          return null;
        }

        function _findParent_(parent, node) {
          if (parent.children) {
            for (var i = 0; i < parent.children.length; i++) {
              var child = parent.children[i];
              if (child == node)
                return parent;

              var _parent_ = _findParent_(parent.children[i], node);
              if (_parent_)
                return _parent_;
            }
          }

          return null;
        }

        function _treatNode_(node, visitor) {
          visitor.visit(node);
          if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
              _treatNode_(node.children[i], visitor);
            }
          }
        }

        var visitor = {
          i: 0,
          visit: function (node) {
            node.showItem = true;
            node.setShowItem = setShowItem;
            node.type = dataTypeMap[node.type];

            node.index = this.i;
            node.id = "i" + this.i;

            this.i = this.i + 1;
            node.showItem = true;

            if (!node.children){
              node.legend = node.label;
            }

            newmodel.data.push(node)
          }
        };

        function setShowItem(showItem, skipChildren) {
          this.showItem = showItem;

          if (!skipChildren && this.children) {
            for (var i = 0; i < this.children.length; i++) {
              this.children[i].setShowItem(showItem);
            }
          }

          if (showItem === true) {
            var _parent_ = findParent(this);
            if (_parent_) {
              _parent_.setShowItem(true, true);
            }
          }
        }

        var item = model.graphics_list;
        function process(visitor) {
          _treatNode_(item, visitor);
        }
        item.root = true;
        process(visitor);
      },

      convertGroovyData : function(newmodel, model) {
        if ( model.type === 'TreeMap'){
          this.convertTreeMapGroovyData(newmodel, model);
          return;
        }
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
          if (model.x_lower_bound !== model.x_upper_bound) {
            if (model.x_lower_bound != null) {
              newmodel.userFocus.xl = model.x_lower_bound;
            }
            if (model.x_upper_bound != null) {
              newmodel.userFocus.xr = model.x_upper_bound;
            }
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
        } else if (model.type === "NanoPlot"){
          newmodel.xAxis.type = "nanotime";
        } else if (model.type === "CategoryPlot") {
          newmodel.xAxis.type = "category";
        } else {
          newmodel.xAxis.type = "linear";
        }

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
        switch (model.type) {
          case "CategoryPlot":
            var calculatedWidths = calcWidths(list);

            for (var index = 0; index < list.length; index++) {
              var categoryItem = list[index]; //e.g. CategoryBar
              var value = categoryItem.value;
              var categoriesNumber = value[0].length;
              var seriesNumber = value.length;
              var seriesNames = categoryItem.seriesNames || [];
              if (_.isEmpty(seriesNames) && newmodel.showLegend) {
                for (var s = 0; s < seriesNumber; s++) {
                  seriesNames.push("series" + s);
                }
              }

              var res = calccategoryitem(newmodel, categoryItem, categoriesNumber, seriesNumber, calculatedWidths);
              var elementsxs = res.elementsxs;
              newmodel.labelsxs = res.labelsxs;

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

                    if(property === 'styles' && item.type === "CategoryLines") {
                      item.style = lineStyleMap[item.style];
                    }
                  }
                };
                processSeriesProperty(i, 'colors', 'color');
                processSeriesProperty(i, 'widths', 'width');
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
                  item.x.push(elementsxs[i][j]);
                }

                processItem(item, i, newmodel, yAxisRSettings, yAxisSettings, logx);

                var elements = [];
                for (var j = 0; j < item.x.length; j++) {
                  var ele = {
                    series: i,
                    category: j,
                    x: item.x[j],
                    y: item.y[j]

                  };
                  if(categoryItem.itemLabels){
                    ele.itemLabel =  categoryItem.itemLabels[j][i];
                  }

                  if(processElement(item, j, ele, yAxisSettings)){
                    elements.push(ele);
                  }
                }

                item.elements = elements;

                newmodel.data.push(item);
              }
            }
            break;
          case "Histogram":
            if (!list || !list.length || !list[0] || !list[0].length) {
              break;
            }
            var datasets = [];
            var rangeMin = list[0][0], rangeMax = rangeMin;
            for (var i = 0; i < list.length; i++) {
              rangeMin = Math.min(rangeMin, d3.min(list[i]));
              rangeMax = Math.max(rangeMax, d3.max(list[i]));
            }
            for (var i = 0; i < list.length; i++) {
              var dataset = list[i];
              var item = {
                type: "Bars",
                color: !_.isEmpty(model.colors) ? model.colors[i] : model.color,
                x: [],
                y: []
              };

              if(newmodel.displayMode === 'STACK' && list.length > 1){
                item.bases = [];
              }

              if(list.length > 1) {
                if(model.names && model.names.length>0) {
                    item.display_name = model.names[i]
                }
                else {
                    item.display_name = "dataset" + (i + 1);
                }
              }

              var histvalues = plotUtils.histogram().
                rightClose(newmodel.rightClose).
                binCount(newmodel.binCount).
                rangeMin(newmodel.rangeMin != null ? newmodel.rangeMin : rangeMin).
                rangeMax(newmodel.rangeMax != null  ? newmodel.rangeMax : rangeMax)(dataset);

              datasets.push(histvalues);

              var sumy = 0;
              if(newmodel.normed === true) {
                for (var j = 0; j < histvalues.length; j++) {
                  sumy += histvalues[j].y;
                }
              }

              for(var j = 0; j < histvalues.length; j++){
                if(newmodel.normed === true){
                  histvalues[j].y = histvalues[j].y / sumy;
                }

                if (newmodel.cumulative && j != 0) {
                  histvalues[j].y = histvalues[j - 1].y + histvalues[j].y;
                }

                if(newmodel.displayMode === 'STACK' && i != 0){
                  histvalues[j].y = histvalues[j].y + datasets[i - 1][j].y;
                }

                if(newmodel.displayMode === 'SIDE_BY_SIDE'){
                  histvalues[j].dx = histvalues[j].dx / list.length;
                  histvalues[j].x += histvalues[j].dx * i;
                }

                var histvalue = histvalues[j];
                item.x.push(histvalue.x);
                item.y.push(histvalue.y);
                item.width = histvalue.dx;
              }

              processItem(item, i, newmodel, yAxisRSettings, yAxisSettings, logx);

              var elements = [];
              for (var j = 0; j < item.x.length; j++) {
                var ele = {};
                ele.x = item.x[j];
                ele.x2 = item.x[j] + item.width;
                ele.y = item.y[j];

                if(processElement(item, j, ele, yAxisSettings, logx)){
                  elements.push(ele);
                }
              }

              item.elements = elements;

              newmodel.data.push(item);

            }
            if(newmodel.displayMode === 'STACK' && list.length > 1){
              newmodel.data.reverse();
            }
            break;
          default:
            for (var i = 0; i < numLines; i++) {
              var item = list[i];

              processItem(item, i, newmodel, yAxisRSettings, yAxisSettings);

              var elements = [];
              for (var j = 0; j < item.x.length; j++) {
                var x = item.x[j];
                if (model.type === 'NanoPlot') {
                  if (_.isEmpty(x)) { continue; }
                  var bigv = new Big(x);
                  if (logx && bigv.lte(0)){ continue; }
                  item.x[j] = bigv;
                }

                var ele = {};
                ele.x = item.x[j];
                ele.y = item.y[j];
                ele.index = j;

                if(processElement(item, j, ele, yAxisSettings, logx)){
                  elements.push(ele);
                }
              }

              item.elements = elements;

              newmodel.data.push(item);
            }
            break;
        }

        if(model.constant_lines != null) {
          for(var i = 0; i < model.constant_lines.length; i++) {
            var line = model.constant_lines[i];
            var item = {
              "type": "constline",
              "width": line.width != null ? line.width : 1,
              "color": "black",
              "yAxis": line.yAxis,
              "showLabel": line.showLabel,
              "elements": []
            };
            if (line.color != null) {
              item.color_opacity = parseInt(line.color.substr(1,2), 16) / 255;
              item.color = "#" + line.color.substr(3);
            }
            var style = line.style;
            if (style == null) { style = ""; }
            item.style = lineStyleMap[style];

            var addElement = function (line, type, log) {
              if (line[type] == null || log && plotUtils.lte(line[type], 0)) {
                return false;
              }
              var ele = {"type": type};
              ele[type] = line[type];
              item.elements.push(ele);
            };

            if (model.type === "NanoPlot") {
              if (!_.isEmpty(line.x)) {
                line.x = new Big(line.x);
                addElement(line, "x", logx)
              }
            } else {
              addElement(line, "x", logx)
            }
            addElement(line, "y", yAxisSettings.logy)

            if (!_.isEmpty(item.elements)) {
              newmodel.data.push(item);
            }
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
                "x" : plotUtils.convertInfinityValue(band.x[0]),
                "x2" : plotUtils.convertInfinityValue(band.x[1])
              };
              item.elements.push(ele);
            }
            if (band.y != null) {
              var ele = {
                "type" : "y"
              };
              var y1 = band.y[0], y2 = band.y[1];
              ele.y = plotUtils.convertInfinityValue(y1);
              ele.y2 = plotUtils.convertInfinityValue(y2);
              item.elements.push(ele);
            }
            newmodel.data.push(item);
          }
        }
        if (model.texts != null) {
          for (var i = 0; i < model.texts.length; i++) {
            var mtext = model.texts[i];
            var item = {
              "type" : "text",

              "color" : mtext.color != null ? "#" + mtext.color.substr(3) : "black",
              "color_opacity" : mtext.color != null ? parseInt(mtext.color.substr(1,2), 16) / 255 : 1,
              "show_pointer" : mtext.show_pointer,
              "pointer_angle" : mtext.pointer_angle,
              "size" : mtext.size,

              "elements" : []
            };
            var x = mtext.x;
            if (model.type === 'NanoPlot') {
              if (_.isEmpty(x)) { continue; }
              var bigv = new Big(x);
              mtext.x = bigv;
            }
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
  beakerRegister.bkoFactory('plotConverter', ["bkUtils", "plotUtils", retfunc]);
})();

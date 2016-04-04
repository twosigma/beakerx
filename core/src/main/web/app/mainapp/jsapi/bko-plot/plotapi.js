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

(function () {
  'use strict';
  var module = angular.module('bk.plotapi', []);
  module.factory('bkPlotApi', [
    'bkUtils',
    function (bkUtils) {

      var getValue = function (obj, value, defaultValue) {
        return obj.hasOwnProperty(value) ? obj[value] : defaultValue;
      };

      var inheritsFrom = function (child, parent) {
        child.prototype = Object.create(parent.prototype);
      };

      var getColor = function (color) {
        if(color instanceof Array) {
          var values = [];
          for(var i = 0; i < color.length; i++){
            values.push(getColor(color[i]));
          }
          return values;
        } else if (color instanceof Color){
          return color.value;
        }
        return color;
      };

      //utils//
      var StrokeType = function () { };
      StrokeType.NONE = 'NONE';
      StrokeType.SOLID = 'SOLID';
      StrokeType.DASH = 'DASH';
      StrokeType.DOT = 'DOT';
      StrokeType.DASHDOT = 'DASHDOT';
      StrokeType.LONGDASH = 'LONGDASH';

      var ShapeType = function () { };
      ShapeType.SQUARE = 'SQUARE';
      ShapeType.CIRCLE = 'CIRCLE';
      ShapeType.TRIANGLE = 'TRIANGLE';
      ShapeType.DIAMOND = 'DIAMOND';
      ShapeType.DCROSS = 'DCROSS';
      ShapeType.DOWNTRIANGLE = 'DOWNTRIANGLE';
      ShapeType.CROSS = 'CROSS';
      ShapeType.DEFAULT = 'DEFAULT';
      ShapeType.LEVEL = 'LEVEL';
      ShapeType.VLEVEL = 'VLEVEL';
      ShapeType.LINECROSS = 'LINECROSS';

      var LegendPosition = function(data){
        if (data instanceof Array && data.length > 1) {
          this.x = data[0];
          this.y = data[0];
        } else {
          this.position = data;
        }
      };
      LegendPosition.TOP = new LegendPosition('TOP');
      LegendPosition.LEFT = new LegendPosition('LEFT');
      LegendPosition.BOTTOM = new LegendPosition('BOTTOM');
      LegendPosition.RIGHT = new LegendPosition('RIGHT');
      LegendPosition.TOP_LEFT = new LegendPosition('TOP_LEFT');
      LegendPosition.TOP_RIGHT = new LegendPosition('TOP_RIGHT');
      LegendPosition.BOTTOM_LEFT = new LegendPosition('BOTTOM_LEFT');
      LegendPosition.BOTTOM_RIGHT = new LegendPosition('BOTTOM_RIGHT');

      var LegendLayout = function () { };
      LegendLayout.HORIZONTAL = 'HORIZONTAL';
      LegendLayout.VERTICAL = 'VERTICAL';

      var Filter = function (text) {
        this.text = text;
      };
      Filter.AREA = new Filter('area');
      Filter.LINE = new Filter('line');
      Filter.BAR = new Filter('bar');
      Filter.BOX = new Filter('box');
      Filter.POINT = new Filter('point');
      Filter.STEAM = new Filter('stem');
      Filter.STEAM_PLUS = new Filter('stem+');
      Filter.RIVER = new Filter('river');

      var Color = function (r, g, b, a) {
        this.value = bkUtils.rgbaToHex(r, g, b, a);
      };
      Color.white = new Color(255, 255, 255);
      Color.WHITE = Color.white;
      Color.lightGray = new Color(192, 192, 192);
      Color.LIGHT_GRAY = Color.lightGray;
      Color.gray = new Color(128, 128, 128);
      Color.GRAY = Color.gray;
      Color.darkGray = new Color(64, 64, 64);
      Color.DARK_GRAY = Color.darkGray;
      Color.black = new Color(0, 0, 0);
      Color.BLACK = Color.black;
      Color.red = new Color(255, 0, 0);
      Color.RED = Color.red;
      Color.pink = new Color(255, 175, 175);
      Color.PINK = Color.pink;
      Color.orange = new Color(255, 200, 0);
      Color.ORANGE = Color.orange;
      Color.yellow = new Color(255, 255, 0);
      Color.YELLOW = Color.yellow;
      Color.green = new Color(0, 255, 0);
      Color.GREEN = Color.green;
      Color.magenta = new Color(255, 0, 255);
      Color.MAGENTA = Color.magenta;
      Color.cyan = new Color(0, 255, 255);
      Color.CYAN = Color.cyan;
      Color.blue = new Color(0, 0, 255);
      Color.BLUE = Color.blue;

      //utils//

      var YAxis = function(data) {
        if (!data) { data = {}; }
        _.extend(this, {
          "type": 'YAxis',
          "label": data.label || "",
          "auto_range": data.autoRange,
          "auto_range_includes_zero": data.autoRangeIncludesZero,
          "lower_margin": getValue(data, 'lowerMargin', 0.05),
          "upper_margin": getValue(data, 'upperMargin', 0.05),
          "lower_bound": data.lowerBound,
          "upper_bound": data.upperBound,
          "use_log": data.log,
          "log_base": data.logBase
        });
      };

      //Plot items//
      var Graphics = function (data) {
        if (!data) { data = {}; }
        _.extend(this, {
          "visible": getValue(data, 'visible', true),
          "yAxis": data.yAxis
        });
      };

      var XYGraphics = function (data) {
        if (!data) { data = {}; }
        Graphics.call(this, data);
        _.extend(this, {
          "x" : getValue(data, 'x', data.y ? _.range(data.y.length) : []),
          "y": data.y,
          "display_name": data.displayName,
          "lod_filter" : data.lodFilter,
          "tooltips": data.toolTips
          //TODO add actions
        });
      };
      inheritsFrom(XYGraphics, Graphics);
      //add prototype methods here

      var Line = function (data) {
        if (!data) { data = {}; }
        XYGraphics.call(this, data);
        _.extend(this, {
          "type": "Line",
          "color": getColor(data.color),
          "width": getValue(data, 'width', 1.5),
          "style": data.style,
          "interpolation": data.interpolation
        });
      };
      inheritsFrom(Line, XYGraphics);
      //add prototype methods here

      var BasedXYGraphics = function (data) {
        if (!data) { data = {}; }
        XYGraphics.call(this, data);
        if (data.base instanceof Array) {
          this.bases = data.base;
        } else {
          this.base = data.base;
        }
      };
      inheritsFrom(BasedXYGraphics, XYGraphics);
      //add prototype methods here

      var Bars = function (data) {
        if (!data) { data = {}; }
        BasedXYGraphics.call(this, data);
        _.extend(this, {
          "type": "Bars"
        });
        if (data.widths) {
          this.widths = data.widths;
        } else {
          this.width = data.width;
        }
        if (data.color) {
          this.colors = getColor(data.color);
        } else {
          this.color = getColor(data.color);
        }
        if (data.outlineColors) {
          this.outline_colors = data.outline_colors;
        } else {
          this.outline_color = data.outlineColor;
        }
      };
      inheritsFrom(Bars, BasedXYGraphics);
      //add prototype methods here

      var Points = function (data) {
        if (!data) { data = {}; }
        XYGraphics.call(this, data);
        _.extend(this, {
          "type": "Points"
        });
        if (data.sizes) {
          this.sizes = data.sizes;
        } else {
          this.size = getValue(data, 'size', 6.0);
        }
        if (data.shape instanceof Array) {
          this.shapes = data.shape;
        } else {
          this.shape = getValue(data, 'shape', ShapeType.DEFAULT);
        }
        if (data.fills) {
          this.fills = data.fills;
        } else {
          this.fill = data.fill;
        }
        if (data.color) {
          this.colors = getColor(data.color);
        } else {
          this.color = getColor(data.color);
        }
        if (data.outlineColors) {
          this.outline_colors = data.outline_colors;
        } else {
          this.outline_color = data.outlineColor;
        }
      };
      inheritsFrom(Points, XYGraphics);
      //add prototype methods here

      var Stems = function (data) {
        if (!data) { data = {}; }
        BasedXYGraphics.call(this, data);
        _.extend(this, {
          "type": "Stems",
          "width": getValue(data, 'width', 1.5)
        });
        if (data.color instanceof Array) {
          this.colors = getColor(data.color);
        } else {
          this.color = getColor(data.color);
        }
        if (data.style instanceof Array) {
          this.styles = data.style;
        } else {
          this.style = getValue(data, 'style', StrokeType.SOLID);
        }
      };
      inheritsFrom(Stems, BasedXYGraphics);
      //add prototype methods here

      var Area = function (data) {
        if (!data) { data = {}; }
        BasedXYGraphics.call(this, data);
        _.extend(this, {
          "type": "Area",
          "color": getColor(data.color),
          "interpolation": data.interpolation
        });
      };
      inheritsFrom(Area, BasedXYGraphics);
      //add prototype methods here

      var Crosshair = function (data) {
        if (!data) { data = {}; }
        XYGraphics.call(this, data);
        _.extend(this, {
          "type": "Crosshair",
          "color": getColor(data.color),
          "style": data.style,
          "width": data.width
        });
      };
      inheritsFrom(Crosshair, BasedXYGraphics);
      //add prototype methods here

      //Plot items//

      //Plots//
      var Chart = function (data) {
        if (!data) { data = {}; }
        _.extend(this, {
          "init_width": getValue(data, 'initWidth', 640),
          "init_height": getValue(data, 'initHeight', 480),
          "chart_title": data.title,
          "show_legend": data.showLegend,
          "use_tool_tip": getValue(data, 'useToolTip', true),
          "legend_position": getValue(data, 'legendPosition', LegendPosition.TOP_RIGHT),
          "legend_layout": getValue(data, 'legendLayout', LegendLayout.VERTICAL)
        });
        this.version = 'groovy';
      };

      var AbstractChart = function (data) {
        if (!data) { data = {}; }
        Chart.call(this, data);
        var yAxis = new YAxis({
          autoRange: data.yAutoRange,
          autoRangeIncludesZero: data.yAutoRangeIncludesZero,
          lowerMargin: data.yLowerMargin,
          upperMargin: data.yUpperMargin,
          lowerBound: data.yLowerBound,
          upperBound: data.yUpperBound,
          log: data.yLog,
          logBase: data.yLogBase
        });
        _.extend(this, {
          "domain_axis_label": data.xLabel,
          "y_label": data.yLabel,
          "rangeAxes": data.yAxes || [yAxis],
          "x_lower_margin": getValue(data, 'xLowerMargin', 0.05),
          "x_upper_margin": getValue(data, 'xUpperMargin', 0.05),
          "y_auto_range": yAxis.auto_range,
          "y_auto_range_includes_zero": yAxis.auto_range_includes_zero,
          "y_lower_margin": yAxis.y_lower_margin,
          "y_upper_margin": yAxis.y_upper_margin,
          "y_lower_bound": yAxis.y_lower_bound,
          "y_upper_bound": yAxis.y_upper_bound,
          "log_y": data.logY,
          "timezone": data.timeZone,
          "crosshair": data.crosshair,
          "omit_checkboxes": data.omitCheckboxes || false,
        });
      };
      inheritsFrom(AbstractChart, Chart);
      //add prototype methods here
      AbstractChart.prototype.add = function (item) {
        if (item instanceof YAxis) {
          this.rangeAxes.push(item);
        }
        return this;
      };


      //XYPlots
      var XYChart = function(data){
        if (!data) { data = {}; }
        AbstractChart.call(this, data);
        _.extend(this, {
          "graphics_list": data.graphics || [],
          "constant_lines": data.constantLines || [],
          "constant_bands": data.constantBands || [],
          "texts": data.texts || [],
          "x_auto_range": getValue(data, 'xAutoRange', true),
          "x_lower_bound": getValue(data, 'xLowerBound', 0),
          "x_upper_bound": getValue(data, 'xUpperBound', 0),
          "log_x": getValue(data, 'logX', false),
          "x_log_base": getValue(data, 'xLogBase', 10),
          "lodThreshold": data.lodThreshold
        });
      };
      inheritsFrom(XYChart, AbstractChart);
      //add prototype methods here
      var abstractChartAdd = AbstractChart.prototype.add;
      XYChart.prototype.add = function (item) {
        if (item instanceof XYGraphics) {
          this.graphics_list.push(item);
        } else {
          abstractChartAdd.call(this, item);
        }
        return this;
      };

      var Plot = function (data) {
        if (!data) { data = {}; }
        XYChart.call(this, data);
        this.type = 'Plot';
      };
      inheritsFrom(Plot, XYChart);
      //add prototype methods here

      var TimePlot = function (data) {
        if (!data) { data = {}; }
        XYChart.call(this, data);
        this.type = 'TimePlot';
      };
      inheritsFrom(TimePlot, Plot);
      //add prototype methods here

      var NanoPlot = function (data) {
        if (!data) { data = {}; }
        TimePlot.call(this, data);
        this.type = 'NanoPlot';
      };
      inheritsFrom(NanoPlot, TimePlot);
      //add prototype methods here
      //Plots//


      var api = {
        Plot: Plot,
        TimePlot: TimePlot,
        NanoPlot: NanoPlot,
        YAxis: YAxis,
        Line: Line,
        Bars: Bars,
        Points: Points,
        Stems: Stems,
        Area: Area,
        Crosshair: Crosshair,
        StrokeType: StrokeType,
        ShapeType: ShapeType,
        LegendLayout: LegendLayout,
        LegendPosition: LegendPosition,
        Filter: Filter,
        Color: Color
      };
      var list = function () {
        return api;
      };
      var instanceOfPlotApi = function (obj) {
        if (!obj) { return false; }
        var res = false;
        _.forOwn(api, function (value) {
          if (obj instanceof value) {
            res = true;
          }
        });
        return res;
      };
      return {
        list: list,
        instanceOfPlotApi: instanceOfPlotApi
      }
    }
  ]);
})();


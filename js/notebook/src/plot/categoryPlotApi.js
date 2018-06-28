/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

 define([
   'underscore',
   './plotApi'
 ], function(
   _,
   bkPlotApi
 ) {

   var plotApi = bkPlotApi.list();
   var getValue = bkPlotApi.getValue;
   var inheritsFrom = bkPlotApi.inheritsFrom;
   var getColor = bkPlotApi.getColor;

   //utils//
   var PlotOrientationType = function () {};
   PlotOrientationType.VERTICAL = 'VERTICAL';
   PlotOrientationType.HORIZONTAL = 'HORIZONTAL';

   var LabelPositionType = function () {};
   LabelPositionType.VALUE_OUTSIDE = 'VALUE_OUTSIDE';
   LabelPositionType.VALUE_INSIDE = 'VALUE_INSIDE';
   LabelPositionType.CENTER = 'CENTER';
   LabelPositionType.BASE_OUTSIDE = 'BASE_OUTSIDE';
   LabelPositionType.BASE_INSIDE = 'BASE_INSIDE';

   var ShapeType = function () {};
   ShapeType.SQUARE = 'SQUARE',
     ShapeType.CIRCLE = 'CIRCLE',
     ShapeType.TRIANGLE = 'TRIANGLE',
     ShapeType.DIAMOND = 'DIAMOND',
     ShapeType.DCROSS = 'DCROSS',
     ShapeType.DOWNTRIANGLE = 'DOWNTRIANGLE',
     ShapeType.CROSS = 'CROSS',
     ShapeType.DEFAULT = 'DEFAULT',
     ShapeType.LEVEL = 'LEVEL',
     ShapeType.VLEVEL = 'VLEVEL',
     ShapeType.LINECROSS = 'LINECROSS';

   //CategoryPlot items//

   var CategoryGraphics = function (data) {
     if (!data) { data = {}; }
     plotApi.Graphics.call(this, data);
     _.extend(this, {
       "showItemLabel": getValue(data, 'showItemLabel', false),
       "center_series": getValue(data, 'centerSeries', false),
       "use_tool_tip": getValue(data, 'useToolTip', true)
     });
     if (data.seriesNames != null) {
       this.seriesNames = data.seriesNames;
     }
     if (!_.isEmpty(data.value)) {
       if (data.value[0] instanceof Array) {
         this.value = data.value;
       } else {
         this.value = [data.value];
       }
     }

     if (data.color instanceof Array) {
       this.colors = getColor(data.color);
     } else {
       this.color = getColor(data.color);
     }
     if (data.itemLabel != null) {
       this.itemLabels = data.itemLabel;
     }
   };
   inheritsFrom(CategoryGraphics, plotApi.Graphics);
   //add prototype methods here

   var CategoryLines = function (data) {
     if (!data) { data = {}; }
     CategoryGraphics.call(this, data);
     _.extend(this, {
       "type": "CategoryLines"
     });
     if (data.width != null) {
       this.width = getValue(data, 'width', 1.5);
     }
     if (data.style instanceof Array) {
       this.styles = data.style;
     } else {
       this.style = getValue(data, 'style', plotApi.StrokeType.SOLID);
     }
     if (data.interpolation != null) {
       this.interpolation = data.interpolation;
     }
   };
   inheritsFrom(CategoryLines, CategoryGraphics);
   //add prototype methods here

   var CategoryAreas = function (data) {
     if (!data) { data = {}; }
     CategoryGraphics.call(this, data);
     _.extend(this, {
       "type": "CategoryAreas",
       "labelPosition": getValue(data, 'labelPosition', LabelPositionType.CENTER)
     });
     if (data.base instanceof Array) {
       this.bases = data.base;
     } else {
       this.base = getValue(data, 'base', 0);
     }
     if (data.width instanceof Array) {
       this.widths = data.width;
     } else {
       this.width = data.width;
     }
     if (data.outlineColor instanceof Array) {
       this.outline_colors = getColor(data.outlineColor);
     } else {
       this.outline_color = getColor(data.outlineColor);
     }
     if (data.fill instanceof Array) {
       this.fills = data.fill;
     } else {
       this.fill = data.fill;
     }
     if (data.drawOutline instanceof Array) {
       this.outlines = data.drawOutline;
     } else {
       this.outline = getValue(data, 'drawOutline', false);
     }
   };
   inheritsFrom(CategoryAreas, CategoryGraphics);
   //add prototype methods here

   var CategoryBars = function (data) {
     if (!data) { data = {}; }
     CategoryGraphics.call(this, data);
     _.extend(this, {
       "type": "CategoryBars",
       "labelPosition": getValue(data, 'labelPosition', LabelPositionType.CENTER)
     });
     if (data.base instanceof Array) {
       this.bases = data.base;
     } else {
       this.base = getValue(data, 'base', 0);
     }
     if (data.width instanceof Array) {
       this.widths = data.width;
     } else {
       this.width = data.width;
     }
     if (data.outlineColor instanceof Array) {
       this.outline_colors = getColor(data.outlineColor);
     } else {
       this.outline_color = getColor(data.outlineColor);
     }
     if (data.fill instanceof Array) {
       this.fills = data.fill;
     } else {
       this.fill = data.fill;
     }
     if (data.drawOutline instanceof Array) {
       this.outlines = data.drawOutline;
     } else {
       this.outline = getValue(data, 'drawOutline', false);
     }
   };
   inheritsFrom(CategoryBars, CategoryGraphics);
   //add prototype methods here

   var CategoryPoints = function (data) {
     if (!data) { data = {}; }
     CategoryGraphics.call(this, data);
     _.extend(this, {
       "type": "CategoryPoints"
     });
     if (data.size instanceof Array) {
       this.sizes = data.size;
     } else {
       this.size = getValue(data, 'size', 6);
     }
     if (data.shape instanceof Array) {
       this.shapes = data.shape;
     } else {
       this.shape = getValue(data, 'shape', ShapeType.DEFAULT);
     }
     if (data.fill instanceof Array) {
       this.fills = data.fill;
     } else {
       this.fill = data.fill;
     }
     if (data.outline_color instanceof Array) {
       this.outline_colors = getColor(data.outlineColor);
     } else {
       this.outline_color = getColor(data.outlineColor);
     }
   };
   inheritsFrom(CategoryPoints, CategoryGraphics);
   //add prototype methods here

   var CategoryStems = function (data) {
     if (!data) { data = {}; }
     CategoryGraphics.call(this, data);
     _.extend(this, {
       "type": "CategoryStems"
     });
     if (data.width != null) {
       this.width = getValue(data, 'width', 1.5);
     }
     if (data.base instanceof Array) {
       this.bases = data.base;
     } else {
       this.base = data.base;
     }
     if (data.style instanceof Array) {
       this.styles = data.style;
     } else {
       this.style = getValue(data, 'style', plotApi.StrokeType.SOLID);
     }
   };
   inheritsFrom(CategoryStems, CategoryGraphics);
   //add prototype methods here
   //CategoryPlot items//

   //CategoryPlot//
   var CategoryPlot = function (data) {
     if (!data) { data = {}; }
     plotApi.AbstractChart.call(this, data);

     _.extend(this, {
       "type": "CategoryPlot",
       "graphics_list": data.graphics || [],
       "categoryNames": data.categoryNames || [],
       "orientation": getValue(data, 'orientation', PlotOrientationType.VERTICAL),
       "category_margin": getValue(data, 'categoryMargin', 0.2),
       "categoryNamesLabelAngle": getValue(data, 'categoryNamesLabelAngle', 0)
     });
   };
   inheritsFrom(CategoryPlot, plotApi.AbstractChart);
   var abstractChartAdd = plotApi.AbstractChart.prototype.add;
   CategoryPlot.prototype.add = function (item) {
     if (item instanceof CategoryGraphics) {
       this.graphics_list.push(item);
     } else if (item instanceof Array) {
       for (var i = 0; i < item.length; i++) {
         this.add(item[i]);
       }
     } else {
       abstractChartAdd.call(this, item);
     }
     return this;
   };
   //add prototype methods here

   CategoryPlot.prototype.display = function(output_area) {

   };

   var api = {
     CategoryPlot: CategoryPlot,
     CategoryLines: CategoryLines,
     CategoryAreas: CategoryAreas,
     CategoryBars: CategoryBars,
     CategoryPoints: CategoryPoints,
     CategoryStems: CategoryStems,
     PlotOrientationType: PlotOrientationType,
     LabelPositionType: LabelPositionType,
     ShapeType: ShapeType
   };
   var list = function () {
     return api;
   };
   var instanceOfCategoryPlotApi = function (obj) {
     if (!obj) {
       return false;
     }
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
     instanceOfCategoryPlotApi: instanceOfCategoryPlotApi
   };

 });
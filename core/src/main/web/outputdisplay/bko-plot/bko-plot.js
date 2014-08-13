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

/*
 * bkoPlot
 * This is the output display component for displaying xyChart
 */
( function() {
  'use strict';
  var retfunc = function(plotUtils, plotConverter, bkCellMenuPluginManager) {
    var CELL_TYPE = "bko-plot";
    return {
      template :
          "<div id='plotTitle' class='plot-title'></div>" +
          "<div id='plotContainer' class='plot-renderdiv' oncontextmenu='return false;'>" +
          "<svg>"  +
          "<defs>" +
            "<filter id='svgfilter'>" +
              "<feOffset result='offOut' in='SourceAlpha' dx='2' dy='2' />" +
              "<feGaussianBlur result='blurOut' in='offOut' stdDeviation='1' />" +
              "<feBlend in='SourceGraphic' in2='blurOut' mode='normal' />" +
            "</filter>" +
          "</defs>" +
          "<g id='coordg'></g>" +
          "<g id='maing'></g>" +
          /*
            "<g id='lineg'></g> <g id='barg'></g> <g id='riverg'></g> <g id='circleg'></g>" +
            "<g id='stemg'></g> <g id='segg'></g> <g id='rectg'></g>" +
            "<g id='pointrectg'></g> <g id='pointcircleg'></g> <g id='pointdiamondg'></g>" +
            "<g id='textg'></g> "
            */
          "<g id='labelg'></g> " +
          "<g id='interg'>" +
            "<g id='dotg'></g>" +
          "</g>" +
          "</svg>" +
          "</div>",
      controller : function($scope) {
        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch("getShareMenuPlugin()", function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });
      },
      link : function(scope, element, attrs) {
        // rendering code
        element.find("#plotContainer").resizable({
          maxWidth : element.width(), // no wider than the width of the cell
          minWidth : 450,
          minHeight: 150,
          handles : "e, s, se",
          resize : function(event, ui) {
            scope.width = ui.size.width;
            scope.height = ui.size.height;
            scope.jqsvg.css({"width": scope.width, "height": scope.height});
            scope.jqplottitle.css({"width": scope.width });
            scope.numIntervals = {
              x: scope.width / scope.intervalStepHint.x,
              y: scope.height / scope.intervalStepHint.y
            };
            scope.calcRange();
            scope.calcMapping(false);
            scope.emitSizeChange();
            scope.legendDone = false;

            scope.update();
          }
        });

        scope.initLayout = function() {
          var model = scope.stdmodel;

          element.find(".ui-icon-gripsmall-diagonal-se")
            .removeClass("ui-icon ui-icon-gripsmall-diagonal-se"); // remove the ugly handle :D
          scope.container = d3.select(element[0]).select("#plotContainer"); // hook container to use jquery interaction
          scope.jqcontainer = element.find("#plotContainer");
          scope.jqcontainer.css(model.initSize);
          scope.svg = d3.select(element[0]).select("#plotContainer svg");
          scope.jqsvg = element.find("svg");
          scope.jqsvg.css(model.initSize);

          $(window).resize(function() {
            // update resize maxWidth when the browser window resizes
            var width = element.width();
            scope.jqcontainer.resizable({
              maxWidth : width
            });
          });

          // set title
          scope.jqplottitle = element.find("#plotTitle");
          scope.jqplottitle.text(model.title).css("width", model.initSize.width);

          scope.maing = d3.select(element[0]).select("#maing");
          scope.coordg = d3.select(element[0]).select("#coordg");
          scope.labelg = d3.select(element[0]).select("#labelg");
          /*
          scope.lineg = scope.maing.select("#lineg");
          scope.barg = scope.maing.select("#barg");
          scope.riverg = scope.maing.select("#riverg");
          scope.stemg = scope.maing.select("#stemg");
          scope.circleg = scope.maing.select("#circleg");
          scope.pointrectg = scope.maing.select("#pointrectg");
          scope.pointcircleg = scope.maing.select("#pointcircleg");
          scope.pointdiamondg = scope.maing.select("#pointdiamondg");
          scope.segg = scope.maing.select("#segg");
          scope.rectg = scope.maing.select("#rectg");
          scope.textg = scope.maing.select("#textg");
          */

          scope.interg = d3.select(element[0]).select("#interg");
          scope.dotg = scope.interg.select("#dotg");

          scope.layout = {    // TODO, specify space for left/right y-axis, also avoid half-shown labels
            bottomLayoutMargin : 30,
            topLayoutMargin : 0,
            leftLayoutMargin : 80,
            rightLayoutMargin : 0,
            legendMargin : 10,
            legendBoxSize : 10
          };
          scope.fonts = {
            labelWidth : 6,
            labelHeight : 12,
            tooltipWidth : 10
          };
          scope.zoomLevel = {
            minSpanX : 1E-12,
            minSpanY : 1E-12,
            maxScaleX : 1E9,
            maxScaleY : 1E9
          };
          scope.labelPadding = {
            x : 10,
            y : 10
          };
          scope.intervalStepHint = {
            x : 150,
            y : 75
          };
          scope.numIntervals = {
            x: parseInt(model.initSize.width) / scope.intervalStepHint.x,
            y: parseInt(model.initSize.height) / scope.intervalStepHint.y
          };
          scope.locateBox = null;
          scope.tips = {};
          scope.cursor = {
            x : -1,
            y : -1
          };
          scope.showAllLines = true;
          if (model.xAxis.getLabel() != null) {
            scope.layout.bottomLayoutMargin += scope.fonts.labelHeight * 2;
          }
          if (model.yAxis.getLabel() != null) {
            scope.layout.leftLayoutMargin += scope.fonts.labelHeight;
          }
          scope.$watch("model.getFocus()", function(newFocus) {
            if (newFocus == null) { return; }
            scope.focus.xl = newFocus.xl;
            scope.focus.xr = newFocus.xr;
            scope.focus.xspan = newFocus.xr - newFocus.xl;
            scope.calcMapping(false);
            scope.update();
          });
          scope.$watch("model.getWidth()", function(newWidth) {
            if (scope.width == newWidth) { return; }
            scope.width = newWidth;
            scope.jqcontainer.css("width", newWidth );
            scope.jqsvg.css("width", newWidth );
            scope.calcMapping(false);
            scope.legendDone = false;
            scope.update();
          });
        };

        scope.emitSizeChange = function() {
          if (scope.model.updateWidth != null) {
            scope.model.updateWidth(scope.width);
          } // not stdmodel here
        };
        scope.calcRange = function() {
          var ret = plotUtils.getInitFocus(scope.stdmodel);
          scope.visibleData = ret.visibleData;
          scope.initFocus = ret.initFocus;
          scope.fixFocus(scope.initFocus);
        };
        scope.initRange = function() {
          var model = scope.stdmodel;
          scope.vrange = {
            xl : 0,
            xr : 1,
            yl : 0,
            yr : 1,
            xspan : 1,
            yspan : 1
          };  // visible range is mapped to [0,1] x [0,1]

          scope.calcRange();
          scope.focus = {};
          _.extend(scope.focus, scope.initFocus);
        };
        scope.calcCoords = function() {
          // prepare the coordinates
          var focus = scope.focus, model = scope.stdmodel;
          model.xAxis.setCoords(focus.xl, focus.xr, scope.numIntervals.x);
          model.yAxis.setCoords(focus.yl, focus.yr, scope.numIntervals.y);
        };
        scope.renderCoords = function() {
          var focus = scope.focus, model = scope.stdmodel;
          var mapX = scope.data2scrX, mapY = scope.data2scrY;

          var xCoords = model.xAxis.getCoords();
          for (var i = 0; i < xCoords.length; i++) {
            var x = xCoords[i];
            scope.rpipeCoords.push({
              "id" : "coord_x_" + i,
              "class" : "plot-coord",
              "x1" : mapX(x),
              "y1" : mapY(focus.yl),
              "x2" : mapX(x),
              "y2" : mapY(focus.yr)
            });
          }
          var yCoords = model.yAxis.getCoords();
          for (var i = 0; i < yCoords.length; i++) {
            var y = yCoords[i];
            scope.rpipeCoords.push({
              "id" : "coord_y_" + i,
              "class" : "plot-coord",
              "x1" : mapX(focus.xl),
              "y1" : mapY(y),
              "x2" : mapX(focus.xr),
              "y2" : mapY(y)
            });
          }
          scope.rpipeCoords.push({
            "id" : "coord_x_base",
            "class" : "plot-coord-base",
            "x1" : mapX(focus.xl),
            "y1" : mapY(focus.yl),
            "x2" : mapX(focus.xr),
            "y2" : mapY(focus.yl)
          });
          scope.rpipeCoords.push({
            "id" : "coord_y_base",
            "class" : "plot-coord-base",
            "x1" : mapX(focus.xl),
            "y1" : mapY(focus.yl),
            "x2" : mapX(focus.xl),
            "y2" : mapY(focus.yr)
          });
        };
        scope.filterData = function() {
          var focus = scope.focus, data = scope.stdmodel.data;
          scope.fdata = [];
          var fdata = scope.fdata;
          for (var i = 0; i < data.length; i++) {
            var eles = data[i].elements;
            if (data[i].type === "constline" || data[i].type === "constband" ||
                data[i].type === "text") {
              fdata[i] = {
                "leftIndex" : 0,
                "rightIndex" : eles.length - 1
              };
              continue;
            }
            var l = plotUtils.upper_bound(eles, "x", focus.xl);
            var r = plotUtils.upper_bound(eles, "x", focus.xr);

            if ( data[i].type === "line" || data[i].type === "area") {
              // cover one more point to the right for line and area
              r++;
            } else {
              // skip the left side element
              l++;
            }

            // truncate out-of-sight segment on x-axis
            l = Math.max(l, 0);
            r = Math.min(r, eles.length - 1);

            if (l == r && eles[l].x < focus.xl) {
              // all elements are to the left of the svg
              l = 0;
              r = -1;
            }
            fdata[i] = {
              "leftIndex" : l,
              "rightIndex" : r
            };
          }
        };
        scope.renderData = function() {
          var model = scope.stdmodel, data = scope.stdmodel.data, fdata = scope.fdata;
          var focus = scope.focus, mapX = scope.data2scrX, mapY = scope.data2scrY;


          for (var i = 0; i < data.length; i++) {
            /*
            if (data[i].shown === false) {
              continue;
            }
            */
            data[i].render(scope);
          }

          return;
          /*****************
            emergency return
           *******************/

          var W = scope.jqsvg.width(), H = scope.jqsvg.height();
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin,
              tMargin = scope.layout.topLayoutMargin, rMargin = scope.layout.rightLayoutMargin;

          for (var i = 0; i < data.length; i++) {
            if (data[i].shown === false) {
              continue;
            }
            var eles = data[i].elements;
            if (data[i].type === "bar") {
              var w = data[i].width, sw;
              var reles = [];
              for (var j = fdata[i].leftIndex; j <= fdata[i].rightIndex; j++) {
                var p = eles[j];
                var x1 = mapX(p.x), x2 = mapX(p.x2);
                if (x2 - x1 < 1) x2 = x1 + 1;
                var y = p.y, y2 = p.y2;
                y = mapY(y); y2 = mapY(y2);
                sw = x2 - x1;
                if (y > y2) { continue; } // prevent negative height
                var bar = {
                  "id" : "bar_" + i + "_" + j,
                  "class" : "plot-resp",
                  "x" : x1,
                  "y" : y,
                  "width" : sw,
                  "height" : y2 - y,
                  "fill" : p.color,
                  "fill_opacity" : p.color_opacity,
                  "stroke" : p.stroke,
                  "stroke_width" : p.stroke_width,
                  "stroke_opacity" : p.stroke_opacity,
                  "tip_text" : p.tip_value,
                  "tip_color" : data[i].color,
                  "tip_x" : x1,
                  "tip_y" : y
                };
                /*
                if (p.color != null) { bar.fill = p.color; }
                if (p.fill_opacity != null) { bar.fill_opaicty = p.fill_opacity; }
                if (p.stroke != null) { bar.stroke = p.stroke; }
                if (p.stroke_opacity != null) { bar.stroke_opacity = p.stroke_opacity; }
                */
                reles.push(bar);
              }
              scope.rpipeBars.push({
                "id" : "bar_" + i,
                "class" : "plot-bar",
                "fill" : data[i].color,
                "fill_opacity": data[i].color_opacity,
                "stroke": data[i].stroke,
                "stroke_width": data[i].stroke_width,
                "stroke_opacity": data[i].stroke_opacity,
                "elements" : reles
              });
            } else if (data[i].type === "area") {
              var pstr = "", skipped = false;
              for (var j = fdata[i].leftIndex; j <= fdata[i].rightIndex; j++) {
                var p = eles[j];
                var x = mapX(p.x), y = mapY(p.y);
                if (Math.abs(x) > 1E6 || Math.abs(y) > 1E6) {
                  skipped = true;
                  break;
                }
                if (data[i].interpolation === "linear") {
                  pstr += x + "," + y + " ";
                } else if (data[i].interpolation === "none" && j < fdata[i].rightIndex) {
                  var p2 = eles[j + 1];
                  var x2 = mapX(p2.x);
                  if (Math.abs(x2) > 1E6) {
                    skipped = true;
                    break;
                  }
                  pstr += x + "," + y + " " + x2 + "," + y + " ";
                }
              }
              for (var j = fdata[i].rightIndex; j >= fdata[i].leftIndex; j--) {
                var p = eles[j], x = mapX(p.x), y2 = p.y2 == null ? mapY(focus.yl) : mapY(p.y2);
                if (Math.abs(y2) > 1E6) { // x is already checked above
                  skipped = true;
                  break;
                }
                if (data[i].interpolation === "linear") {
                  pstr += x + "," + y2 + " ";
                } else if (data[i].interpolation === "none" && j < fdata[i].rightIndex) {
                  var p2 = eles[j + 1];
                  var x2 = mapX(p2.x);
                  pstr += x2 + "," + y2 + " " + x + "," + y2 + " ";
                }
              }
              if (skipped === false) {
                scope.rpipeRivers.push({
                  "id" : "river_" + i,
                  "class" : "plot-river",
                  "fill" : data[i].color,
                  "fill_opacity": data[i].color_opacity,
                  "stroke": data[i].stroke,
                  "stroke_width": data[i].stroke_width,
                  "stroke_opacity": data[i].stroke_opacity,
                  "elements" : pstr
                });
              } else {
                console.error("data not shown due to too large coordinate");
              }
            } else if (data[i].type === "stem") {
              var reles = [];
              for (var j = fdata[i].leftIndex; j <= fdata[i].rightIndex; j++) {
                var p = eles[j];
                var y2 = p.y2;
                reles.push({
                  "id" : "stem_" + i + "_" + j,
                  "class" : "plot-resp",
                  "x1" : mapX(p.x),
                  "y1" : mapY(p.y),
                  "x2" : mapX(p.x),
                  "y2" : mapY(p.y2),
                  "stroke": p.color,
                  "stroke_opacity": p.color_opacity,
                  "stroke_dasharray": p.stroke_dasharray,
                  "stroke_width" : p.width,
                  "tip_text": p.tip_value,
                  "tip_color": data[i].color,
                  "tip_x" : mapX(p.x),
                  "tip_y" : mapY(p.y)
                });

              }
              scope.rpipeStems.push({
                "id" : "stem_" + i,
                "class" : "plot-stem",
                "stroke" : data[i].color,
                "stroke_opacity": data[i].color_opacity,
                "stroke_width": data[i].width,
                "stroke_dasharray": data[i].stroke_dasharray,
                "elements" : reles
              });
            } else if (data[i].type === "point") {
              var reles = [];
              for (var j = fdata[i].leftIndex; j <= fdata[i].rightIndex; j++) {
                var p = eles[j], s = p.size;
                var x = mapX(p.x), y = mapY(p.y);
                var ele = {
                  "id" : "point_" + i + "_" + j,
                  "class" : "plot-resp",
                  "tip_text" : p.tip_value,
                  "tip_color" : data[i].color,
                  "tip_x" : x,
                  "tip_y" : y
                };
                if (data[i].style === "circle") {
                  _.extend(ele, {
                    "cx" : x,
                    "cy" : y,
                    "r" : s
                  });
                } else if (data[i].style === "diamond") {
                  var pstr = "";
                  pstr += (x - s) + "," + (y    ) + " ";
                  pstr += (x    ) + "," + (y - s) + " ";
                  pstr += (x + s) + "," + (y    ) + " ";
                  pstr += (x    ) + "," + (y + s) + " ";
                  _.extend(ele, {
                    "points" : pstr
                  });
                } else {
                  _.extend(ele, {
                    "x" : x - s / 2,
                    "y" : y - s / 2,
                    "width" : s,
                    "height" : s
                  });
                }
                if (p.color != null) ele.fill = p.color;
                if (p.color_opacity != null) ele.fill_opacity = p.color_opacity;
                if (p.stroke != null) ele.stroke = p.stroke;
                if (p.stroke_opacity != null) ele.stroke_opacity = p.stroke_opacity;

                reles.push(ele);
              }
              var pipe;
              if (data[i].style === "diamond") { pipe = scope.rpipePointDiamonds; }
              else if (data[i].style === "circle") { pipe = scope.rpipePointCircles; }
              else pipe = scope.rpipePointRects;

              pipe.push({
                  "id" : "point_" + i,
                  "class" : "plot-point",
                  "fill" : data[i].color,
                  "fill_opacity": data[i].color_opacity,
                  "stroke": data[i].stroke,
                  "stroke_width": data[i].stroke_width,
                  "stroke_opacity": data[i].stroke_opacity,
                  "elements" : reles
              });
            } else if (data[i].type === "constline") {
              var reles = [];
              for (var j = fdata[i].leftIndex; j <= fdata[i].rightIndex; j++) {
                var ele = eles[j];
                var labelid = "constlabel_" + i + "_" + j;
                if (ele.type === "x") {
                  if (ele.x < focus.xl || ele.x > focus.xr) {
                    scope.jqcontainer.find("#" + labelid).remove();
                    continue;
                  }
                  var x = mapX(ele.x);
                  reles.push({
                    "id" : "constline_" + i + "_" + j,
                    "x1" : x,
                    "x2" : x,
                    "y1" : mapY(focus.yl),
                    "y2" : mapY(focus.yr),
                    "stroke" : ele.color,
                    "stroke_opacity" : ele.color_opacity,
                    "stroke_width" : ele.width,
                    "stroke_dasharray" : ele.stroke_dasharray
                  });

                  scope.jqcontainer.find("#" + labelid).remove();
                  var label = $("<div id=" + labelid + " class='plot-constlabel'></div>")
                    .appendTo(scope.jqcontainer)
                    .text(plotUtils.getTipString(ele._x, model.xAxis));
                  var w = label.outerWidth(), h = label.outerHeight();
                  label.css({
                    "left" : x - w / 2,
                    "top" : H - bMargin - h - scope.labelPadding.y,
                    "background-color" : data[i].color
                  });
                } else if (ele.type === "y") {
                  if (ele.y < focus.yl || ele.y > focus.yr) {
                    scope.jqcontainer.find("#" + labelid).remove();
                    continue;
                  }
                  var y = mapY(ele.y);
                  reles.push({
                    "id" : "constline_" + i + "_" + j,
                    "x1" : mapX(focus.xl),
                    "x2" : mapX(focus.xr),
                    "y1" : y,
                    "y2" : y,
                    "stroke" : ele.color,
                    "stroke_opacity" : ele.color_opacity,
                    "stroke_width" : ele.width,
                    "stroke_dasharray" : ele.stroke_dasharray
                  });
                  scope.jqcontainer.find("#" + labelid).remove();
                  var label = $("<div id=" + labelid + " class='plot-constlabel'></div>")
                    .appendTo(scope.jqcontainer)
                    .text(plotUtils.getTipString(ele._y, model.yAxis));
                  var w = label.outerWidth(), h = label.outerHeight();
                  label.css({
                    "left" : lMargin + scope.labelPadding.x,
                    "top" : y - h / 2,
                    "background-color" : data[i].color
                  });
                }
              }
              scope.rpipeSegs.push({
                "id" : "constline_" + i,
                "class" : "plot-const",
                "stroke" : data[i].color,
                "stroke_opacity": data[i].color_opacity,
                "stroke_width" : data[i].width,
                "stroke_dasharray" : data[i].stroke_dasharray,
                "elements" : reles
              });
            } else if (data[i].type === "constband") {
              var reles = [];
              for (var j = fdata[i].leftIndex; j <= fdata[i].rightIndex; j++) {
                var p = eles[j];
                var ele = {
                  "id": "constband_" + i + "_" + j
                };
                if (p.type === "x") {
                  if (p.x > focus.xr || p.x2 < focus.xl) { continue; }
                  var x = mapX(p.x), x2 = mapX(p.x2);
                  x = Math.max(x, lMargin);
                  x2 = Math.min(x2, W - rMargin);
                  _.extend(ele, {
                    "x" : x,
                    "width" : x2 - x,
                    "y" : tMargin,
                    "height" : H - bMargin - tMargin,
                    "opacity" : p.opacity
                  });
                } else if (p.type === "y") {
                  if (p.y > focus.yr || p.y2 < focus.yl) { continue; }
                  var y = mapY(p.y), y2 = mapY(p.y2); // after mapping, y1,y2 are reversed
                  y = Math.min(y, H - bMargin);
                  y2 = Math.max(y2, tMargin);
                  _.extend(ele, {
                    "id" : "const_" + i + "_" + j,
                    "x" : lMargin,
                    "width" : W - lMargin - rMargin,
                    "y" : y,
                    "height" : y2 - y,
                    "opacity" : p.opacity
                  });
                }
                reles.push(ele);
              }
              scope.rpipeRects.push({
                "id" : "constband_" + i,
                "class" : "plot-const",
                "fill" : data[i].color,
                "fill_opacity": data[i].color_opacity,
                "stroke": data[i].stroke,
                "stroke_opacity": data[i].stroke_opacity,
                "stroke_width": data[i].stroke_width,
                "elements" : reles
              });
            } else if (data[i].type === "text") {
              var reles = [], dtf = "";
              if (data[i].rotate != null){
                dtf = "rotate(" +  data[i].rotate + ")";  // TODO check global rotation
              }
              var focus  = scope.focus;
              for (var j = fdata[i].leftIndex; j <= fdata[i].rightIndex; j++) {
                var p = eles[j];
                if (p.x < focus.xl || p.x > focus.xr || p.y < focus.yl || p.y > focus.yr) {
                  continue; // text point out of sight
                }
                var x = mapX(p.x), y = mapY(p.y);
                var tf = "";
                if (p.rotate != null) {
                  tf = "rotate(" + p.rotate + " " + x + " " + y + ")";
                }
                tf += "translate(" + x + "," + y + ")";
                reles.push({
                  "id" : "text_" + i + "_" + j,
                  "text" : p.v,
                  "transform" : tf,
                  "fill" : p.color,
                  "fill_opacity" : p.color_opacity
                });
              }
              scope.rpipeUserTexts.push({
                "id" : "text_" + i,
                "class" : "plot-text",
                "transform" : dtf,
                "fill" : data[i].color,
                "fill_opacity" : data[i].color_opacity,
                "elements" : reles
              });
            } else { // standard line: solid, dash or dot
              var pstr = "", skipped = false;
              for (var j = fdata[i].leftIndex; j <= fdata[i].rightIndex; j++) {
                var p = eles[j];
                if (j == fdata[i].leftIndex) pstr += "M";
                else if (j == fdata[i].leftIndex + 1) {
                  if (data[i].interpolation !== "curve") pstr += "L";
                  else pstr += "C";
                }
                var x = mapX(p.x), y = mapY(p.y);
                if (Math.abs(x) > 1E6 || Math.abs(y) > 1E6) {
                  skipped = true;
                  break;
                }
                var nxtp = x + "," + y + " ";

                if (j < fdata[i].rightIndex) {
                  if (data[i].interpolation === "none") {
                    var p2 = eles[j + 1];
                    nxtp += mapX(p.x) + "," + mapY(p.y) + " " + mapX(p2.x) + "," + mapY(p.y) + " ";
                  } else if (data[i].interpolation === "curve") {
                    // TODO curve implementation
                  }
                }
                pstr += nxtp;
              }
              if (pstr.length > 0 && skipped === false) {
                var line = {
                  "id": "line_"+i,
                  "class": "plot-line",
                  "stroke": data[i].color,
                  "stroke_opacity": data[i].color_opacity,
                  "stroke_width": data[i].width,
                  "stroke_dasharray": data[i].stroke_dasharray,
                  "d": pstr
                };
                scope.rpipeLines.push(line);
              } else if (skipped === true) {
                console.error("data not shown due to too large coordinate");
              }
            }
          }
        };
        scope.renderDots = function() {
          var data = scope.stdmodel.data, fdata = scope.fdata, numLines = data.length, focus = scope.focus;
          var mapX = scope.data2scrX, mapY = scope.data2scrY;
          for (var i = 0; i < numLines; i++) {
            if (data[i].shown === false) {
              continue;
            }
            if (data[i].type !== "line" && data[i].type !== "area") {
              continue;
            }

            var eles = data[i].elements;
            var reles = [];
            for (var j = fdata[i].leftIndex; j <= fdata[i].rightIndex; j++) {
              var p = {
                "x" : mapX(eles[j].x),
                "y" : mapY(eles[j].y)
              };
              if (plotUtils.outsideScr(scope, p.x, p.y)) { continue; }
              var id = "dot_" + i + "_" + j;
              reles.push({
                "id" : id,
                "class" : "plot-resp",
                "isResp" : true,
                "cx" : p.x,
                "cy" : p.y,
                "r" : 4,
                "opacity" : scope.tips[id] == null ? 0 : 1,
                "point" : _.omit(eles[j], "uniqid"),
                "tip_text" : eles[j].tip_value,
                "tip_color" : data[i].color,
                "tip_x" : p.x,
                "tip_y" : p.y
              });
            }
            var wrapper = {
              "id" : "linedots_" + i,
              "class" : "plot-dot",
              "stroke" : data[i].color == null ? "gray" : data[i].color,
              "fill" : "white",
              "elements" : reles
            };
            scope.rpipeDots.push(wrapper);
          }
        };
        scope.prepareInteraction = function(id) {
          var model = scope.stdmodel;
          if (model.useToolTip != true) {
            return;
          }

          var sel = scope.svg.selectAll(".plot-resp");
          sel.on("mouseenter", function(d) {
            return scope.tooltip(d);
          }).on("mouseleave", function(d) {
            return scope.untooltip(d);
          }).on("click", function(d) {
            return scope.toggleTooltip(d);
          });
        };
        scope.toggleTooltip = function(d) {
          var id = d.id, nv = !scope.tips[id];
          if (nv === true) {
            scope.tooltip(d);
          } else {
            scope.tips[id].sticking = !scope.tips[id].sticking;
            if (scope.tips[id].sticking === false) {
              scope.untooltip(d);
            }
          }
        };
        scope.tooltip = function(d) {
          if (scope.tips[d.id] != null) {
            return;
          }
          scope.tips[d.id] = {};
          _.extend(scope.tips[d.id], d);
          var d = scope.tips[d.id];
          d.sticking = false;
          d.datax = scope.scr2dataX(d.tip_x);
          d.datay = scope.scr2dataY(d.tip_y);

          scope.renderTips();
        };
        scope.untooltip = function(d) {
          if (scope.tips[d.id] == null) { return; }
          if (scope.tips[d.id].sticking === false){
            delete scope.tips[d.id];
            scope.jqcontainer.find("#tip_" + d.id).remove();
            if (d.isResp === true) {
              scope.jqsvg.find("#" + d.id).attr("opacity", 0);
            } else {
              scope.jqsvg.find("#" + d.id).removeAttr("filter");
            }
            scope.renderTips();
          }
        };
        scope.renderTips = function() {
          _.each(scope.tips, function(d) {
            var x = scope.data2scrX(d.datax),
                y = scope.data2scrY(d.datay);
            d.scrx = x;
            d.scry = y;
            var tipdiv = scope.jqcontainer.find("#tip_" + d.id);
            if (tipdiv.length > 0) {
              var w = tipdiv.width(), h = tipdiv.height();
              if (plotUtils.outsideScrBox(scope, x + d.objw + scope.fonts.tooltipWidth, y,
                w, h)) {
                tipdiv.remove();
                return;
              }
            }
            if (tipdiv.length == 0) {
              tipdiv = $("<div></div>").appendTo(scope.jqcontainer)
              .attr("id", "tip_" + d.id)
              .attr("class", "plot-tooltip")
              .css("border-color", d.tip_color)
              .append(d.tip_text).mousedown(function(e) {
                if (e.which == 3) {
                  if (d.isResp === true) {  // is line responsive dot
                    scope.jqsvg.find("#" + d.id).attr("opacity", 0);
                  } else {
                    scope.jqsvg.find("#" + d.id).removeAttr("filter");
                  }
                  delete scope.tips[d.id];
                  $(this).remove();
                }
              });
            }
            var objw = scope.jqsvg.find("#" + d.id).attr("width");
            objw = objw == null ? 0 : parseFloat(objw);
            d.objw = objw;
            var w = tipdiv.width(), h = tipdiv.height();
            if (plotUtils.outsideScrBox(scope, x + objw + scope.fonts.tooltipWidth, y, w, h)) {
              tipdiv.remove();
              return;
            }
            tipdiv.draggable({
              stop : function(event, ui) {
                d.scrx = ui.position.left - objw - scope.fonts.tooltipWidth;
                d.scry = ui.position.top;
                d.datax = scope.scr2dataX(d.scrx);
                d.datay = scope.scr2dataY(d.scry);
              }
            });

            tipdiv
              .css("left", x + objw + scope.fonts.tooltipWidth)
              .css("top", y);
            if (d.isResp === true) {
              scope.jqsvg.find("#" + d.id).attr("opacity", 1);
            } else {
              scope.jqsvg.find("#" + d.id)
                .attr("filter", "url(#svgfilter)");
            }
          });
        };
        scope.renderLabels = function() {
          var mapX = scope.data2scrX, mapY = scope.data2scrY;
          var model = scope.stdmodel, ys = model.yScale;
          var coords, labels;
          coords = model.xAxis.getCoords();
          labels = model.xAxis.getCoordLabels();
          for (var i = 0; i < labels.length; i++) {
            var x = coords[i];
            scope.rpipeTexts.push({
              "id" : "label_x_" + i,
              "class" : "plot-label",
              "text" : labels[i],
              "x" : mapX(x),
              "y" : mapY(scope.focus.yl) + scope.labelPadding.y,
              "text-anchor" : "middle",
              "dominant-baseline" : "hanging"
            });
          }
          coords = model.yAxis.getCoords();
          labels = model.yAxis.getCoordLabels();
          for (var i = 0; i < labels.length; i++) {
            var y = coords[i];
            scope.rpipeTexts.push({
              "id" : "label_y_" + i,
              "class" : "plot-label",
              "text" : labels[i],
              //ys.type === "log" ? parseFloat(Math.pow(ys.base, y)).toFixed(2) : y,
              "x" : mapX(scope.focus.xl) - scope.labelPadding.x,
              "y" : mapY(y),
              "text-anchor" : "end",
              "dominant-baseline" : "central"
            });
          }
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
          if (model.xAxis.getLabel() != null) {
            scope.rpipeTexts.push({
              "id" : "xlabel",
              "class" : "plot-xylabel",
              "text" : model.xAxis.getLabel(),
              "x" : lMargin + (scope.jqsvg.width() - lMargin) / 2,
              "y" : scope.jqsvg.height() - scope.fonts.labelHeight
            });
          }
          if (model.yAxis.getLabel() != null) {
            var x = scope.fonts.labelHeight * 2, y = (scope.jqsvg.height() - bMargin) / 2;
            scope.rpipeTexts.push({
              "id" : "ylabel",
              "class" : "plot-xylabel",
              "text" : model.yAxis.getLabel(),
              "x" : x,
              "y" : y,
              "transform" : "rotate(-90 " + x + " " + y + ")"
            });
          }
        };
        scope.renderCursor = function(e) {
          var x = e.offsetX, y = e.offsetY;
          var W = scope.jqsvg.width(), H = scope.jqsvg.height();
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
          if (x < lMargin || y > H - bMargin) {
            scope.svg.selectAll(".plot-cursor").remove();
            scope.jqcontainer.find(".plot-cursorlabel").remove();
            return;
          }
          var model = scope.stdmodel;
          var mapX = scope.scr2dataX, mapY = scope.scr2dataY;
          if (model.xCursor != null) {
            var opt = model.xCursor;
            scope.svg.selectAll("#cursor_x").data([{}]).enter().append("line")
              .attr("id", "cursor_x")
              .attr("class", "plot-cursor")
              .style("stroke", opt.color)
              .style("stroke-opacity", opt.color_opacity)
              .style("stroke-width", opt.width)
              .style("stroke-dasharray", opt.stroke_dasharray);
            scope.svg.select("#cursor_x")
              .attr("x1", x).attr("y1", 0).attr("x2", x).attr("y2", H - bMargin);

            scope.jqcontainer.find("#cursor_xlabel").remove();
            var label = $("<div id='cursor_xlabel' class='plot-cursorlabel'></div>")
              .appendTo(scope.jqcontainer)
              .text(plotUtils.getTipStringPercent(mapX(x), model.xAxis));
            var w = label.outerWidth(), h = label.outerHeight();
            var p = {
              "x" : x - w / 2,
              "y" : H - bMargin - scope.labelPadding.y - h
            };
            label.css({
              "left" : p.x ,
              "top" : p.y ,
              "background-color" : opt.color != null ? opt.color : "black"
            });
          }
          if (model.yCursor != null) {
            var opt = model.yCursor;
            scope.svg.selectAll("#cursor_y").data([{}]).enter().append("line")
              .attr("id", "cursor_y")
              .attr("class", "plot-cursor")
              .style("stroke", opt.color)
              .style("stroke-opacity", opt.color_opacity)
              .style("stroke-width", opt.width)
              .style("stroke-dasharray", opt.stroke_dasharray);
            scope.svg.select("#cursor_y")
              .attr("x1", lMargin)
              .attr("y1", y)
              .attr("x2", W)
              .attr("y2", y);

            scope.jqcontainer.find("#cursor_ylabel").remove();
            var label = $("<div id='cursor_ylabel' class='plot-cursorlabel'></div>")
              .appendTo(scope.jqcontainer)
              .text(plotUtils.getTipStringPercent(mapY(y), model.yAxis));
            var w = label.outerWidth(), h = label.outerHeight();
            var p = {
              "x" : lMargin + scope.labelPadding.x,
              "y" : y - h / 2
            };
            label.css({
              "left" : p.x ,
              "top" : p.y ,
              "background-color" : opt.color != null ? opt.color : "black"
            });
          }
        };
        scope.renderLegends = function() {
          if (scope.stdmodel.showLegend == false || scope.legendDone == true)
            return;
          // legend redraw is controlled by legendDone
          var data = scope.stdmodel.data;
          var margin = scope.layout.legendMargin;

          scope.jqcontainer.find("#legends").remove();

          scope.legendDone = true;
          var legend = $("<ul></ul>").appendTo(scope.jqcontainer)
            .attr("id", "legends")
            .attr("class", "plot-legendcontainer")
            .css({
              "left" : scope.jqcontainer.width() + 10 ,
              "top" : "0px"
            });

          if (scope.visibleData > 1) {  // skip "All" check when there is only one line
            var unit = $("<li></li>").appendTo(legend)
              .attr("id", "legend_all");
            $("<input type='checkbox'></input>").appendTo(unit)
              .attr("id", "legendcheck_all")
              .attr("class", "plot-legendcheckbox")
              .prop("checked", true)
              .click(function(e) {
                return scope.toggleLine(e);
              });
            $("<span></span>").appendTo(unit)
              .attr("id", "legendbox_all")
              .attr("class", "plot-legendbox")
              .css("background-color", "none");
            $("<span></span>").appendTo(unit)
              .attr("id", "legendtext_all")
              .attr("class", "plot-label")
              .text("All");
          }

          var content = "";
          for (var i = 0; i < data.length; i++) {
            if (data[i].type === "text" || data[i].type === "constline" || data[i].type === "constband") { continue; }
            if (data[i].legend == null || data[i].legend === "") { continue; }
            var unit = $("<li></li>").appendTo(legend)
              .attr("id", "legend_" + i);
            $("<input type='checkbox'></input>").appendTo(unit)
              .attr("id", "legendcheck_" + i)
              .attr("class", "plot-legendcheckbox")
              .prop("checked", data[i].shown)
              .click(function(e) {
                return scope.toggleLine(e);
              });
            $("<span></span>").appendTo(unit)
              .attr("id", "legendbox_" + i)
              .attr("class", "plot-legendbox")
              .css("background-color", data[i].color == null? "none" : data[i].color);
            $("<span></span>").appendTo(unit)
              .attr("id", "legendtext_" + i)
              .attr("class", "plot-label")
              .text(data[i].legend);
          }
          legend.draggable();
        };
        scope.toggleLine = function(e) {
          var id = e.target.id.split("_")[1], data = scope.stdmodel.data;
          // id in the format "legendcheck_i"
          if (id == "all") {
            scope.showAllLines = !scope.showAllLines;
            for (var i = 0; i < data.length; i++) {
              if (data[i].type === "constline" || data[i].type === "constband"
                || data[i].type === "text") { continue; }
              data[i].shown = scope.showAllLines;
              scope.jqcontainer.find("#legendcheck_" + i).prop("checked", data[i].shown);
            }
            scope.calcRange();
            scope.update();
            return;
          }
          data[id].shown = !data[id].shown;
          scope.calcRange();
          scope.update();
        };
        scope.renderCoverBox = function() {
          var W = scope.jqsvg.width(), H = scope.jqsvg.height();
          plotUtils.replotSingleRect(scope.labelg, {
            "id" : "coverboxYr",
            "class" : "plot-coverbox",
            "x" : 0,
            "y" : H - scope.layout.bottomLayoutMargin,
            "width" : W,
            "height" : scope.layout.bottomLayoutMargin
          });
          plotUtils.replotSingleRect(scope.labelg, {
            "id" : "coverboxYl",
            "class" : "plot-coverbox",
            "x" : 0,
            "y" : 0,
            "width" : W,
            "height" : scope.layout.topLayoutMargin
          });
          plotUtils.replotSingleRect(scope.labelg, {
            "id" : "coverboxXl",
            "class" : "plot-coverbox",
            "x" : 0,
            "y" : 0,
            "width" : scope.layout.leftLayoutMargin,
            "height" : H
          });
          plotUtils.replotSingleRect(scope.labelg, {
            "id" : "coverboxXr",
            "class" : "plot-coverbox",
            "x" : W - scope.layout.rightLayoutMargin,
            "y" : 0,
            "width" : scope.layout.rightLayoutMargin,
            "height" : H
          });

        };
        scope.renderLocateBox = function() {
          scope.svg.selectAll("#locatebox").remove();
          if (scope.locateBox != null) {
            var box = scope.locateBox;
            scope.svg.selectAll("#locatebox").data([{}]).enter().append("rect")
              .attr("id", "locatebox")
              .attr("class", "plot-locatebox")
              .attr("x", box.x)
              .attr("y", box.y)
              .attr("width", box.w)
              .attr("height", box.h);
          }
        };
        scope.calcLocateBox = function() {
          var p1 = scope.mousep1, p2 = scope.mousep2;
          var xl = Math.min(p1.x, p2.x), xr = Math.max(p1.x, p2.x),
              yl = Math.min(p1.y, p2.y), yr = Math.max(p1.y, p2.y);
          if (xr === xl) { xr = xl + 1; }
          if (yr === yl) { yr = yl + 1; }
          scope.locateBox = {
            "x" : xl,
            "y" : yl,
            "w" : xr - xl,
            "h" : yr - yl
          };
        };
        scope.mouseDown = function() {
          if (d3.event.target.nodeName === "div") {
            scope.interactMode = "other";
            scope.disableZoom();
            return;
          }
          scope.interactMode = d3.event.button == 0 ? "zoom" : "locate";
        };
        scope.mouseUp = function() {
          if (scope.interactMode === "other") {
            scope.enableZoom();
            scope.interactMode = "zoom";
          }
        };
        scope.zoomStart = function(d) {
          if (scope.interactMode === "other") { return; }
          scope.lastx = scope.lasty = 0;
          scope.lastscale = 1.0;
          scope.zoomObj.scale(1.0);
          scope.zoomObj.translate([0, 0]);
          scope.mousep1 = {
            "x" : d3.mouse(scope.svg[0][0])[0],
            "y" : d3.mouse(scope.svg[0][0])[1]
          };
          scope.mousep2 = {};
          _.extend(scope.mousep2, scope.mousep1);
        };
        scope.zooming = function(d) {
          if (scope.interactMode === "other") {
            return;
          }
          if (scope.interactMode === "zoom") {
            // left click zoom
            var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
            var W = scope.jqsvg.width() - lMargin, H = scope.jqsvg.height() - bMargin;
            var d3trans = d3.event.translate, d3scale = d3.event.scale;
            var dx = d3trans[0] - scope.lastx, dy = d3trans[1] - scope.lasty,
                ds = this.lastscale / d3scale;
            scope.lastx = d3trans[0];
            scope.lasty = d3trans[1];
            scope.lastscale = d3scale;

            var focus = scope.focus, vrange = scope.vrange;
            var mx = d3.mouse(scope.svg[0][0])[0], my = d3.mouse(scope.svg[0][0])[1];
            if (ds == 1.0) {
              // translate only
              var tx = -dx / W * focus.xspan, ty = dy / H * focus.yspan, vrange = scope.vrange;
              if (focus.xl + tx >= vrange.xl && focus.xr + tx <= vrange.xr) {
                focus.xl += tx;
                focus.xr += tx;
              } else {
                if (focus.xl + tx < vrange.xl) {
                  focus.xl = vrange.xl;
                  focus.xr = focus.xl + focus.xspan;
                } else if (focus.xr + tx > vrange.xr) {
                  focus.xr = vrange.xr;
                  focus.xl = focus.xr - focus.xspan;
                }
              }
              if (focus.yl + ty >= vrange.yl && focus.yr + ty <= vrange.yr) {
                focus.yl += ty;
                focus.yr += ty;
              } else {
                if (focus.yl + ty < vrange.yl) {
                  focus.yl = vrange.yl;
                  focus.yr = focus.yl + focus.yspan;
                } else if (focus.yr + ty > vrange.yr) {
                  focus.yr = vrange.yr;
                  focus.yl = focus.yr - focus.yspan;
                }
              }
              scope.jqsvg.css("cursor", "move");
            } else {
              // scale only
              var level = scope.zoomLevel;
              if (my <= scope.jqsvg.height() - scope.layout.bottomLayoutMargin) {
                // scale y
                var ym = focus.yl + scope.scr2dataYp(my) * focus.yspan;
                var nyl = ym - ds * (ym - focus.yl), nyr = ym + ds * (focus.yr - ym),
                    nyspan = nyr - nyl;

                if (nyspan >= level.minSpanY && nyspan <= vrange.yspan * level.maxScaleY) {
                  focus.yl = nyl;
                  focus.yr = nyr;
                  focus.yspan = nyspan;
                } else {
                  if (nyspan > vrange.yspan * level.maxScaleY) {
                    focus.yr = focus.yl + vrange.yspan * level.maxScaleY;
                  } else if (nyspan < level.minSpanY) {
                    focus.yr = focus.yl + level.minSpanY;
                  }
                  focus.yspan = focus.yr - focus.yl;
                }
              }
              if (mx >= scope.layout.leftLayoutMargin) {
                // scale x
                var xm = focus.xl + scope.scr2dataXp(mx) * focus.xspan;
                var nxl = xm - ds * (xm - focus.xl), nxr = xm + ds * (focus.xr - xm),
                    nxspan = nxr - nxl;
                if (nxspan >= level.minSpanX && nxspan <= vrange.xspan * level.maxScaleX) {
                  focus.xl = nxl;
                  focus.xr = nxr;
                  focus.xspan = nxspan;
                } else {
                  if (nxspan > vrange.yspan * level.maxScaleX) {
                    focus.xr = focus.xl + vrange.xspan * level.maxScaleX;
                  } else if (nxspan < level.minSpanX) {
                    focus.xr = focus.xl + level.minSpanX;
                  }
                  focus.xspan = focus.xr - focus.xl;
                }
              }
              scope.fixFocus(focus);
            }
            scope.calcMapping(true);
            scope.renderCursor({
              offsetX : mx,
              offsetY : my
            });
            scope.update();
          } else if (scope.interactMode === "locate") {
            // right click zoom
            scope.mousep2 = {
              "x" : d3.mouse(scope.svg[0][0])[0],
              "y" : d3.mouse(scope.svg[0][0])[1]
            };
            scope.calcLocateBox();
            scope.rpipeRects = [];
            scope.renderLocateBox();
          }
        };
        scope.zoomEnd = function(d) {
          scope.zoomObj.scale(1.0);
          scope.zoomObj.translate([0, 0]);
          if (scope.interactMode === "locate") {
            scope.locateFocus();
            scope.locateBox = null;
            scope.update();
            scope.interactMode = "zoom";
          }
          scope.jqsvg.css("cursor", "auto");
        };
        scope.fixFocus = function(focus) {
          var vrange = scope.vrange;
          focus.xl = focus.xl < 0 ? 0 : focus.xl;
          focus.xr = focus.xr > 1 ? 1 : focus.xr;
          focus.yl = focus.yl < 0 ? 0 : focus.yl;
          focus.yr = focus.yr > 1 ? 1 : focus.yr;
          focus.xspan = focus.xr - focus.xl;
          focus.yspan = focus.yr - focus.yl;

          if (focus.xl > focus.xr || focus.yl > focus.yr) {
            console.error("visible range specified does not match data range, " +
                "enforcing visible range");
            _.extend(focus, scope.initFocus);
          }
        };
        scope.resetFocus = function() {
          var mx = d3.mouse(scope.svg[0][0])[0], my = d3.mouse(scope.svg[0][0])[1];
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
          var W = scope.jqsvg.width(), H = scope.jqsvg.height();
          if (mx < lMargin && my < H - bMargin) {
            _.extend(scope.focus, _.pick(scope.initFocus, "yl", "yr", "yspan"));
          } else if (my > H - bMargin && mx > lMargin) {
            _.extend(scope.focus, _.pick(scope.initFocus, "xl", "xr", "xspan"));
          } else {
            _.extend(scope.focus, scope.initFocus);
          }
          scope.fixFocus(scope.focus);
          scope.calcMapping(true);
          scope.update();
        };
        scope.locateFocus = function() {
          var box = scope.locateBox;
          if (box == null)
            return;
          var p1 = {
            "x" : scope.scr2dataXp(box.x),
            "y" : scope.scr2dataYp(box.y)
          };
          var p2 = {
            "x" : scope.scr2dataXp(box.x + box.w),
            "y" : scope.scr2dataYp(box.y + box.h)
          };
          p1.x = Math.max(0, p1.x);
          p1.y = Math.max(0, p1.y);
          p2.x = Math.min(1, p2.x);
          p2.y = Math.min(1, p2.y);

          var focus = scope.focus, ofocus = {};
          _.extend(ofocus, scope.focus);
          focus.xl = ofocus.xl + ofocus.xspan * p1.x;
          focus.xr = ofocus.xl + ofocus.xspan * p2.x;
          focus.yl = ofocus.yl + ofocus.yspan * p2.y;
          focus.yr = ofocus.yl + ofocus.yspan * p1.y;
          focus.xspan = focus.xr - focus.xl;
          focus.yspan = focus.yr - focus.yl;
          scope.calcMapping(true);
        };
        scope.resetSvg = function() {
          scope.jqcontainer.find(".plot-constlabel").remove();

          scope.rpipeLines = [];
          scope.rpipeCoords = [];
          scope.rpipeTexts = [];
          scope.rpipeRects = [];
          scope.rpipeDots = [];
          scope.rpipeBars = [];
          scope.rpipeRivers = [];
          scope.rpipeStems = [];
          scope.rpipePointCircles = [];
          scope.rpipePointRects = [];
          scope.rpipePointDiamonds = [];
          scope.rpipeSegs = [];
          scope.rpipeUserTexts = [];
        };
        scope.enableZoom = function() {
          scope.svg.call(scope.zoomObj.on("zoomstart", function(d) {
            return scope.zoomStart(d);
          }).on("zoom", function(d) {
            return scope.zooming(d);
          }).on("zoomend", function(d) {
            return scope.zoomEnd(d);
          }));
          scope.svg.on("dblclick.zoom", function() {
            return scope.resetFocus();
          });
        };
        scope.disableZoom = function() {
          scope.svg.call(scope.zoomObj.on("zoomstart", null).on("zoom", null).on("zoomend", null));
        };

        scope.mouseleaveClear = function() {
          scope.svg.selectAll(".plot-cursor").remove();
          scope.jqcontainer.find(".plot-cursorlabel").remove();
        };
        scope.calcMapping = function(emitFocusUpdate) {
          // called every time after the focus is changed
          var focus = scope.focus;
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin,
              tMargin = scope.layout.topLayoutMargin, rMargin = scope.layout.rightLayoutMargin;
          var model = scope.stdmodel;
          var W = scope.jqsvg.width(), H = scope.jqsvg.height();
          if (emitFocusUpdate == true && scope.model.updateFocus != null) {
            scope.model.updateFocus({
              "xl" : focus.xl,
              "xr" : focus.xr
            });
          }

          scope.data2scrY = d3.scale.linear().domain([focus.yl, focus.yr]).range([H - bMargin, tMargin]);
          scope.data2scrYp = d3.scale.linear().domain([focus.yl, focus.yr]).range([1, 0]);
          scope.scr2dataY = d3.scale.linear().domain([tMargin, H - bMargin]).range([focus.yr, focus.yl]);
          scope.scr2dataYp = d3.scale.linear().domain([tMargin, H - bMargin]).range([1, 0]);
          scope.data2scrX = d3.scale.linear().domain([focus.xl, focus.xr]).range([lMargin, W-rMargin]);
          scope.data2scrXp = d3.scale.linear().domain([focus.xl, focus.xr]).range([0, 1]);
          scope.scr2dataX = d3.scale.linear().domain([lMargin, W-rMargin]).range([focus.xl, focus.xr]);
          scope.scr2dataXp = d3.scale.linear().domain([lMargin, W-rMargin]).range([0, 1]);
        };
        scope.standardizeData = function() {
          var model = scope.model.getCellModel();
          scope.stdmodel = plotConverter.standardizeModel(model);
        };
        scope.init = function() {

          // first standardize data
          scope.standardizeData();
          // create layout elements
          scope.initLayout();

          scope.resetSvg();
          scope.zoomObj = d3.behavior.zoom();
          // set zoom object
          scope.container.on("mousedown", function() {
            return scope.mouseDown();
          }).on("mouseup", function() {
            return scope.mouseUp();
          });
          scope.jqsvg.mousemove(function(e) {
            return scope.renderCursor(e);
          }).mouseleave(function(e) {
            return scope.mouseleaveClear();
          });
          scope.enableZoom();

          // init copies focus to initFocus, called only once, create axes
          scope.initRange();

          scope.calcMapping();
          scope.update();
        };

        scope.update = function(first) {
          scope.resetSvg();
          //scope.filterData();
          scope.calcCoords();
          scope.renderCoords();
          scope.renderData();
          //scope.renderDots();
          scope.renderLabels();

          plotUtils.plotCoords(scope);

          /*
          plotUtils.plotRivers(scope);
          plotUtils.plotBars(scope);
          plotUtils.plotStems(scope);
          plotUtils.plotLines(scope);
          plotUtils.plotDots(scope);
          plotUtils.plotPointCircles(scope);
          plotUtils.plotPointRects(scope);
          plotUtils.plotPointDiamonds(scope);
          plotUtils.plotSegs(scope);
          plotUtils.plotRects(scope);
          plotUtils.plotUserTexts(scope);
          */

          scope.renderTips();
          scope.renderLocateBox(); // redraw
          scope.renderLegends(); // redraw
          scope.renderCoverBox(); // redraw
          plotUtils.plotLabels(scope); // redraw

          scope.prepareInteraction();
        };
        scope.init(); // initialize
      }
    };
  };
  beaker.bkoDirective("Plot", ["plotUtils", "plotConverter", "bkCellMenuPluginManager", retfunc]);
})();

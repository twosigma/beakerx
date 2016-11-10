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
  var retfunc = function(plotUtils,
                         plotTip,
                         plotFormatter,
                         plotFactory,
                         bkCellMenuPluginManager,
                         bkSessionManager,
                         bkUtils,
                         GradientLegend,
                         bkoChartExtender,
                         plotService,
                         $compile) {
    var CELL_TYPE = "bko-plot";
    return {
      template :
          "<canvas></canvas>" +
          "<div id='plotTitle' class='plot-title'></div>" +
          "<div id='plotLegendContainer' class='plot-plotlegendcontainer' oncontextmenu='return false;'>" +
          "<div class='plot-plotcontainer' oncontextmenu='return false;'>" +
          "<svg id='svgg'>"  +
          "<defs>" +
            "<marker id='Triangle' class='text-line-style' viewBox='0 0 10 10' refX='1' refY='5' markerWidth='6' markerHeight='6' orient='auto'>" +
            "<path d='M 0 0 L 10 5 L 0 10 z' />" +
            "</marker>" +
            "<filter id='svgfilter'>" +
              "<feGaussianBlur result='blurOut' in='SourceGraphic' stdDeviation='1' />" +
              "<feBlend in='SourceGraphic' in2='blurOut' mode='normal' />" +
            "</filter>" +
            "<filter id='svgAreaFilter'>" +
              "<feMorphology operator='dilate' result='blurOut' in='SourceGraphic' radius='2' />" +
              "<feBlend in='SourceGraphic' in2='blurOut' mode='normal' />" +
            "</filter>" +
          "</defs>" +
          "<g id='gridg'></g>" +
          "<g id='maing'></g>" +
          "<g id='labelg'></g> " +
          "</svg>" +
          "</div>" +
          "</div>",
      controller : function($scope) {
        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch("getShareMenuPlugin()", function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });
        
        function modelHasPlotSpecificMethods(model) {
          return model.getSvgToSave && model.saveAsSvg && model.saveAsPng && model.updateLegendPosition;
        }

        $scope.fillCellModelWithPlotMethods = function () {
          var model = $scope.model.getCellModel();
          if(modelHasPlotSpecificMethods(model)) {
            return;
          }
          model.getSvgToSave = function () {
            return $scope.getSvgToSave();
          };
          model.saveAsSvg = function () {
            return $scope.saveAsSvg();
          };
          model.saveAsPng = function () {
            return $scope.saveAsPng();
          };
          model.updateLegendPosition = function () {
            return $scope.updateLegendPosition();
          };
        };
        $scope.$watch("model.getCellModel()", function () {
          $scope.fillCellModelWithPlotMethods();
        });
        $scope.fillCellModelWithPlotMethods();
      },
      link : function(scope, element, attrs) {
        // rendering code
        element.find(".plot-plotcontainer").resizable({
          maxWidth : element.width(), // no wider than the width of the cell
          minWidth : 450,
          minHeight: 150,
          handles : "e, s, se",
          resize : function(event, ui) {
            scope.width = ui.size.width;
            scope.height = ui.size.height;
            _.extend(scope.plotSize, ui.size);
            if (scope.setDumpState !== undefined) {
              scope.setDumpState(scope.dumpState());
            }

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
            scope.legendResetPosition = true;

            scope.update();
          }
        });


        scope.resizeFunction = function() {
          // update resize maxWidth when the browser window resizes
          var width = element.width();
          scope.jqcontainer.resizable({
            maxWidth : width
          });
        };

        scope.id = 'bko-plot-' + bkUtils.generateId(6);
        element.find('.plot-plotcontainer').attr('id', scope.id);
        element.find('.plot-title').attr('class', 'plot-title ' + 'plot-title-' + scope.id);

        if (!scope.model.disableContextMenu) {
          $.contextMenu({
            selector: '#' + scope.id,
            zIndex: 3,
            items: plotUtils.getSavePlotAsContextMenuItems(scope) 
          });
        }

        scope.initLayout = function() {
          var model = scope.stdmodel;
          
          if(scope.model.getCellModel().x_tickLabels_visible !== undefined){
            model.xAxis.showGridlineLabels = scope.model.getCellModel().x_tickLabels_visible;
          }
            
          if(scope.model.getCellModel().y_tickLabels_visible !== undefined){
            model.yAxis.showGridlineLabels = scope.model.getCellModel().y_tickLabels_visible;
          }

          element.find(".ui-icon-gripsmall-diagonal-se")
            .removeClass("ui-icon-gripsmall-diagonal-se")
            .addClass("ui-icon-grip-diagonal-se");

          // hook container to use jquery interaction
          scope.container = d3.select(element[0]).select(".plot-plotcontainer");
          scope.jqcontainer = element.find(".plot-plotcontainer");
          scope.jqlegendcontainer = element.find("#plotLegendContainer");
          scope.svg = d3.select(element[0]).select(".plot-plotcontainer svg");
          scope.jqsvg = element.find("#svgg");
          scope.canvas = element.find("canvas")[0];

          scope.canvas.style.display="none";

          var plotSize = scope.plotSize;
          scope.jqcontainer.css(plotSize);
          scope.jqsvg.css(plotSize);

          $(window).resize(scope.resizeFunction);

          // Apply  advanced custom styles set directly by user
          if(model['customStyles']) {
              $("<style>"+model['customStyles'].map(function(s) { 
                  return "#" + scope.id + ' ' + s; 
              }).join('\n') + "\n</style>").prependTo(element.find('.plot-plotcontainer'));
          }

          // set title
          scope.jqplottitle = element.find("#plotTitle");
          scope.jqplottitle.text(model.title).css("width", plotSize.width);

          // Apply any specific element styles (labelStyle,elementStyle, etc)
          if(model['elementStyles']) {
              var styles = [];
              for(var style in model['elementStyles']) {
                  styles.push('#' + scope.id + ' ' + style + ' { ' + model['elementStyles'][style] + '}');
              }
              $("<style>\n" + styles.join('\n') + "\n</style>").prependTo(element.find('.plot-plotcontainer'));

              // Title style has to be handlded separately because it sits in a separate
              // div outside the hierachy the rest of the plot is in
              if(model['elementStyles']['.plot-title']) {
                  $("<style>\n" + '.plot-title-' + scope.id + ' { ' + 
                          model['elementStyles']['.plot-title'] + 
                          "}\n</style>").prependTo(element.find('.plot-title-' + scope.id));
              }
          }

          scope.maing = d3.select(element[0]).select("#maing");
          scope.gridg = d3.select(element[0]).select("#gridg");
          scope.labelg = d3.select(element[0]).select("#labelg");

          scope.jqgridg = element.find("#gridg");

          // set some constants

          scope.renderFixed = 1;
          scope.layout = {    // TODO, specify space for left/right y-axis, also avoid half-shown labels
            bottomLayoutMargin : 30,
            topLayoutMargin : 0,
            leftLayoutMargin : calcVertLayoutMargin(scope.stdmodel.yAxis),
            rightLayoutMargin : scope.stdmodel.yAxisR ? calcVertLayoutMargin(scope.stdmodel.yAxisR) : 0,
            legendMargin : 10,
            legendBoxSize : 10
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
            x : scope.model.getCellModel().type === 'NanoPlot' ? 130 : 75,
            y : 30
          };
          if(scope.stdmodel.orientation === 'HORIZONTAL'){
            var tempx = scope.intervalStepHint.x;
            scope.intervalStepHint.x = scope.intervalStepHint.y;
            scope.intervalStepHint.y = tempx;
          }
          scope.numIntervals = {
            x: parseInt(plotSize.width) / scope.intervalStepHint.x,
            y: parseInt(plotSize.height) / scope.intervalStepHint.y
          };
          scope.locateBox = null;
          scope.cursor = {
            x : -1,
            y : -1
          };

          scope.gridlineTickLength = 3;
          
          var factor = 2.0;
          if (model.xAxis.label == null) { factor -= 1.0; }
          if (model.xAxis.showGridlineLabels === false) { factor -= 1.0; }
          scope.layout.bottomLayoutMargin += plotUtils.fonts.labelHeight * factor;

          if (model.yAxis.showGridlineLabels !== false) {
            scope.layout.topLayoutMargin += plotUtils.fonts.labelHeight / 2;
          }

          if (model.yAxis.label != null) {
            scope.layout.leftLayoutMargin += plotUtils.fonts.labelHeight;
          }
          if(model.yAxisR != null) {
            scope.layout.rightLayoutMargin += plotUtils.fonts.labelHeight;
          }
          scope.legendResetPosition = true;

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
            scope.legendResetPosition = true;
            scope.update();
          });
          scope.$watch('model.isShowOutput()', function(prev, next) {
            if (prev !== next) {
              scope.update();
            }
          });
        };

        function measureText(pText, pFontSize, pStyle) {
          var lDiv = document.createElement('lDiv');

          document.body.appendChild(lDiv);

          if (pStyle != null) {
            lDiv.style = pStyle;
          }
          lDiv.style.fontSize = "" + pFontSize + "px";
          lDiv.style.position = "absolute";
          lDiv.style.left = -1000;
          lDiv.style.top = -1000;

          lDiv.innerHTML = pText;

          var lResult = {
            width: lDiv.clientWidth,
            height: lDiv.clientHeight
          };

          document.body.removeChild(lDiv);
          lDiv = null;

          return lResult;
        }

        var calcVertLayoutMargin = function (axis, pStyle) {
          var result = 80;
          if (axis && axis.axisType === 'linear') {
            var l = axis.axisValL.toFixed(axis.axisFixed) + '';
            var r = axis.axisValL.toFixed(axis.axisFixed) + '';

            var m = l.length > r.length ? l : r;
            var size = measureText(m, 13, pStyle);
            result = size.width + size.height * 2;
          }
          return result > 80 ? result : 80;
        };

        scope.emitZoomLevelChange = function() {
          var data = scope.stdmodel.data;
          for (var i = 0; i < data.length; i++) {
            if (data[i].isLodItem === true) {
              data[i].zoomLevelChanged(scope);
            }
          }
        };

        scope.emitSizeChange = function() {
          if (scope.model.updateWidth != null) {
            scope.model.updateWidth(scope.width);
          } // not stdmodel here

          scope.$emit('plotSizeChanged', {
            width: scope.width,
            height: scope.height
          });
        };
        scope.$on('plotSizeChanged', function (event, data) {
          //if (scope.width !== data.width
          //  //|| scope.height !== data.height
          //) {
          //  scope.model.width = data.width;
          //  //scope.model.height = data.height;
          //}
        });

        scope.calcRange = function() {
          var ret = plotUtils.getDefaultFocus(scope.stdmodel);
          scope.visibleItem = ret.visibleItem;
          scope.legendableItem = ret.legendableItem;
          scope.defaultFocus = ret.defaultFocus;
          scope.fixFocus(scope.defaultFocus);
        };
        scope.calcGridlines = function() {
          // prepare the gridlines
          var focus = scope.focus, model = scope.stdmodel;
          model.xAxis.setGridlines(focus.xl,
            focus.xr,
            scope.numIntervals.x,
            model.margin.left,
            model.margin.right);
          model.yAxis.setGridlines(focus.yl,
            focus.yr,
            scope.numIntervals.y,
            model.margin.bottom,
            model.margin.top);
          if(model.yAxisR){
            model.yAxisR.setGridlines(focus.yl,
              focus.yr,
              scope.numIntervals.y,
              model.margin.bottom,
              model.margin.top)
          }
        };
        scope.renderGridlines = function() {
          var focus = scope.focus, model = scope.stdmodel;
          var mapX = scope.data2scrX, mapY = scope.data2scrY;

          if(model.showXGridlines){
            var xGridlines = model.xAxis.getGridlines();
            for (var i = 0; i < xGridlines.length; i++) {
              var x = xGridlines[i];
              scope.rpipeGridlines.push({
                "id" : "gridline_x_" + i,
                "class" : "plot-gridline",
                "x1" : mapX(x),
                "y1" : mapY(focus.yl),
                "x2" : mapX(x),
                "y2" : mapY(focus.yr)
              });
            }
          }
          var yGridlines = model.yAxis.getGridlines();
          for (var i = 0; i < yGridlines.length; i++) {
            var y = yGridlines[i];
            scope.rpipeGridlines.push({
              "id" : "gridline_y_" + i,
              "class" : "plot-gridline",
              "x1" : mapX(focus.xl),
              "y1" : mapY(y),
              "x2" : mapX(focus.xr),
              "y2" : mapY(y)
            });
          }
          scope.rpipeGridlines.push({
            "id" : "gridline_x_base",
            "class" : "plot-gridline-base",
            "x1" : mapX(focus.xl),
            "y1" : mapY(focus.yl),
            "x2" : mapX(focus.xr),
            "y2" : mapY(focus.yl)
          });
          scope.rpipeGridlines.push({
            "id" : "gridline_y_base",
            "class" : "plot-gridline-base",
            "x1" : mapX(focus.xl),
            "y1" : mapY(focus.yl),
            "x2" : mapX(focus.xl),
            "y2" : mapY(focus.yr)
          });
          scope.rpipeGridlines.push({
            "id" : "gridline_yr_base",
            "class" : "plot-gridline-base",
            "x1" : mapX(focus.xr),
            "y1" : mapY(focus.yl),
            "x2" : mapX(focus.xr),
            "y2" : mapY(focus.yr)
          });
        };
        scope.renderData = function() {
          var data = scope.stdmodel.data;
          for (var i = 0; i < data.length; i++) {
            data[i].render(scope);
            if (data[i].isLodItem === true) {
              scope.hasLodItem = true;
            }
            if (data[i].isUnorderedItem === true) {
              scope.hasUnorderedItem = true;
            }
          }

          if (scope.hasUnorderedItem === true && scope.showUnorderedHint === true) {
            scope.showUnorderedHint = false;
            console.warn("unordered area/line detected, truncation disabled");
          }

        };

        scope.onKeyAction = function (item, onKeyEvent) {
          var key = plotUtils.getKeyCodeConstant(onKeyEvent.keyCode);
          for (var i = 0; i < scope.stdmodel.data.length; i++) {
            var data = scope.stdmodel.data[i];
            if (data.id === item.id || item.id.indexOf(data.id + "_") === 0) {
              var plotId = scope.stdmodel.plotId;
              if (data.keyTags != null && !_.isEmpty(data.keyTags[key])) {
                if (scope.model.setActionDetails) {
                  scope.model.setActionDetails(plotId, data, item).then(
                    function () { plotUtils.evaluateTagCell(data.keyTags[key]); },
                    function () { console.error('set action details error'); } );
                } else {
                  plotService.setActionDetails(plotId, data.uid, scope.model.getEvaluatorId(),
                    plotUtils.getActionObject(scope.model.getCellModel().type, item)).then(
                    function () { plotUtils.evaluateTagCell(data.keyTags[key]); },
                    function () { console.error('set action details error'); });
                }
              } else if (data.keys != null && data.keys.indexOf(key) > -1) {
                scope.legendDone = false;
                scope.legendResetPosition = true;
                scope.doNotLoadState = true;
                if (scope.model.onKey) {
                  scope.model.onKey(key, plotId, data, item);
                } else {
                  plotService.onKey(plotId, data.uid, scope.model.getEvaluatorId(), {
                    key: key,
                    actionObject: plotUtils.getActionObject(scope.model.getCellModel().type, item)
                  });
                }
              }
            }
          }
        };

        scope.onKeyListeners = {}; //map: item.id -> listener function
        scope.removeOnKeyListeners = function () {
          for (var f in scope.onKeyListeners){
            if(scope.onKeyListeners.hasOwnProperty(f)){
              $(document).off("keydown.plot-action", scope.onKeyListeners[f]);
            }
          }
          scope.onKeyListeners = {};
        };

        scope.prepareInteraction = function() {
          var model = scope.stdmodel;

          scope.svg.selectAll(".item-clickable")
            .on('click.action', function (e) {
              for (var i = 0; i < model.data.length; i++) {
                var item = model.data[i];
                if(item.hasClickAction === true && (item.id === e.id || e.id.indexOf(item.id + "_") === 0)) {
                  var plotId = scope.stdmodel.plotId;
                  if(!_.isEmpty(item.clickTag)){
                    if (scope.model.setActionDetails) {
                      scope.model.setActionDetails(plotId, item, e).then(
                        function () { plotUtils.evaluateTagCell(item.clickTag); },
                        function () { console.error('set action details error'); }
                      );
                    } else {
                      plotService.setActionDetails( plotId,
                                                    item.uid,
                                                    scope.model.getEvaluatorId(),
                                                    plotUtils.getActionObject(scope.model.getCellModel().type, e)).then(
                        function () { plotUtils.evaluateTagCell(item.clickTag); },
                        function () { console.error('set action details error'); }
                      );
                    }
                  }else{
                    scope.legendDone = false;
                    scope.legendResetPosition = true;
                    scope.doNotLoadState = true;
                    if (scope.model.onClick) {
                      scope.model.onClick(plotId, item, e);
                      return;
                    } else {
                      plotService.onClick(plotId, item.uid, scope.model.getEvaluatorId(),
                                          plotUtils.getActionObject(scope.model.getCellModel().type, e));
                    }
                  }
                }
              }
            });

          var onKeyElements = scope.svg.selectAll(".item-onkey");
          //TODO add listeners only for elements that have keys or keyTags
          onKeyElements
            .on("mouseenter.plot-click", function(item){
              if(!scope.onKeyListeners[item.id]) {
                scope.onKeyListeners[item.id] = function(onKeyEvent){
                  scope.onKeyAction(item, onKeyEvent);
                };
                $(document).on("keydown.plot-action", scope.onKeyListeners[item.id]);
              }
            })
            .on("mouseleave.plot-click", function(item){
              var keyListener = scope.onKeyListeners[item.id]
              if (keyListener) {
                delete scope.onKeyListeners[item.id];
                $(document).off("keydown.plot-action", keyListener);
              }
            });

          if (model.useToolTip === false) {
            return;
          }
          scope.svg.selectAll(".plot-resp")
            .on('mouseenter', function(d) {
              scope.drawLegendPointer(d);
              return plotTip.tooltip(scope, d, d3.mouse(scope.svg[0][0]));
            })
            .on('mousemove', function(d) {

              scope.removeLegendPointer();
              plotTip.untooltip(scope, d);

              scope.drawLegendPointer(d);
              return plotTip.tooltip(scope, d, d3.mouse(scope.svg[0][0]));
            })
            .on("mouseleave", function(d) {
              scope.removeLegendPointer();
              return plotTip.untooltip(scope, d);
            })
            .on("click.resp", function(d) {
              return plotTip.toggleTooltip(scope, d);
            });
        };

        scope.drawLegendPointer = function(d) {
          if (scope.gradientLegend) {
            scope.gradientLegend.drawPointer(d.ele.value);
          }
        };

        scope.removeLegendPointer = function() {
          if(scope.gradientLegend){
            scope.gradientLegend.removePointer();
          }
        };


        scope.renderGridlineLabels = function() {
          var _size_ = function (s, clazz) {
            var o = $('<div>' + s + '</div>')
                .css({
                  'position': 'absolute',
                  'float': 'left',
                  'white-space': 'nowrap',
                  'visibility': 'hidden',
                  'class': clazz
                }).appendTo($('body')),
              w = o.width(),
              h = o.height();
            o.remove();
            return {
              width : w,
              height : h
            };
          };
          var mapX = scope.data2scrX, mapY = scope.data2scrY;
          var model = scope.stdmodel;
          if (model.xAxis.showGridlineLabels !== false) {
            var lines = model.xAxis.getGridlines(),
                labels = model.xAxis.getGridlineLabels();
            for (var i = 0; i < labels.length; i++) {
              var x = mapX(lines[i]);
              var y = mapY(scope.focus.yl) + scope.labelPadding.y;
							var rpipeText = {
                "id": "label_x_" + i,
                "class": "plot-label plot-label-x",
                "text": labels[i],
                "x": x,
                "y": y,
                "text-anchor": "middle",
                "dominant-baseline": "hanging"
              };
              if (model.categoryNamesLabelAngle &&
                model.categoryNamesLabelAngle !== 0 && model.orientation === 'VERTICAL') {
                var __size__ = _size_(labels[i], "plot-label");
                var degree = -1 * model.categoryNamesLabelAngle * (180 / Math.PI);
								var delta = degree > 0 ? (__size__.width / 2) : -1 * (__size__.width / 2);
                rpipeText.transform =
                  "translate(" +
                  delta +
                  " " + -scope.labelPadding.y +
                  ") "
                  +
                  "rotate(" +
                  degree +
                  " " + (x - delta) +
                  " " + (y + __size__.height / 2) +
                  ") "
                ;
              }
              scope.rpipeTexts.push(rpipeText);
            }
          }
          if (model.yAxis.showGridlineLabels !== false) {
            lines = model.yAxis.getGridlines();
            labels = model.yAxis.getGridlineLabels();
            for (var i = 0; i < labels.length; i++) {
              var x = mapX(scope.focus.xl) - scope.labelPadding.x;
              var y = mapY(lines[i]);

							var rpipeText = {
                "id": "label_y_" + i,
                "class": "plot-label plot-label-y",
                "text": labels[i],
                "x": x,
                "y": y,
                "text-anchor": "end",
                "dominant-baseline": "central"
              };
              if (model.categoryNamesLabelAngle &&
                model.categoryNamesLabelAngle !== 0 && model.orientation === 'HORIZONTAL') {
                rpipeText.transform = "rotate(" +
                model.categoryNamesLabelAngle * (180 / Math.PI) +
                " " + (x) +
                " " + (y) +
                ")";
              }
              scope.rpipeTexts.push(rpipeText);
            }
          }
          if (model.yAxisR && model.yAxisR.showGridlineLabels !== false) {
            lines = model.yAxisR.getGridlines();
            labels = model.yAxisR.getGridlineLabels();
            for (var i = 0; i < labels.length; i++) {
              var y = lines[i];
              scope.rpipeTexts.push({
                "id" : "label_yr_" + i,
                "class" : "plot-label",
                "text" : labels[i],
                "x" : mapX(scope.focus.xr) + scope.labelPadding.x,
                "y" : mapY(y),
                "dominant-baseline" : "central"
              });
            }
          }
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
          if (model.xAxis.label != null) {
            scope.rpipeTexts.push({
              "id" : "xlabel",
              "class" : "plot-xylabel",
              "text" : model.xAxis.axisLabelWithCommon,
              "x" : lMargin + (plotUtils.safeWidth(scope.jqsvg) - lMargin) / 2,
              "y" : plotUtils.safeHeight(scope.jqsvg) - plotUtils.fonts.labelHeight
            });
          }
          if (model.yAxis.label != null) {
            var x = plotUtils.fonts.labelHeight * 2, y = (plotUtils.safeHeight(scope.jqsvg) - bMargin) / 2;
            scope.rpipeTexts.push({
              "id" : "ylabel",
              "class" : "plot-xylabel",
              "text" : model.yAxis.label,
              "x" : x,
              "y" : y,
              "transform" : "rotate(-90 " + x + " " + y + ")"
            });
          }
          if (model.yAxisR && model.yAxisR.label != null) {
            var x = plotUtils.safeWidth(scope.jqsvg) - plotUtils.fonts.labelHeight, y = (plotUtils.safeHeight(scope.jqsvg) - bMargin) / 2;
            scope.rpipeTexts.push({
              "id" : "yrlabel",
              "class" : "plot-xylabel",
              "text" : model.yAxisR.label,
              "x" : x,
              "y" : y,
              "transform" : "rotate(-90 " + x + " " + y + ")"
            });
          }
        };

        scope.renderGridlineTicks = function() {
          var tickLength = scope.gridlineTickLength;
          var mapX = scope.data2scrX, mapY = scope.data2scrY;
          var focus = scope.focus;
          var model = scope.stdmodel;
          if (model.xAxis.showGridlineLabels !== false) {
            var lines = model.xAxis.getGridlines(),
              labels = model.xAxis.getGridlineLabels();
            for (var i = 0; i < labels.length; i++) {
              var x = lines[i];
              scope.rpipeTicks.push({
                "id" : "tick_x_" + i,
                "class" : "plot-tick",
                "x1" : mapX(x),
                "y1" : mapY(focus.yl),
                "x2" : mapX(x),
                "y2" : mapY(focus.yl) + tickLength
              });
            }
          }
          if (model.yAxis.showGridlineLabels !== false) {
            lines = model.yAxis.getGridlines();
            labels = model.yAxis.getGridlineLabels();
            for (var i = 0; i < labels.length; i++) {
              var y = lines[i];
              scope.rpipeTicks.push({
                "id" : "tick_y_" + i,
                "class" : "plot-tick",
                "x1" : mapX(focus.xl) - tickLength,
                "y1" : mapY(y),
                "x2" : mapX(focus.xl),
                "y2" : mapY(y)
              });
            }
          }
          if (model.yAxisR && model.yAxisR.showGridlineLabels !== false) {
            lines = model.yAxisR.getGridlines();
            labels = model.yAxisR.getGridlineLabels();
            for (var i = 0; i < labels.length; i++) {
              var y = lines[i];
              scope.rpipeTicks.push({
                "id" : "tick_yr_" + i,
                "class" : "plot-tick",
                "x1" : mapX(focus.xr),
                "y1" : mapY(y),
                "x2" : mapX(focus.xr) + tickLength,
                "y2" : mapY(y)
              });
            }
          }
        };

        scope.renderCursor = function(e) {
          var x = e.offsetX, y = e.offsetY;
          var W = plotUtils.safeWidth(scope.jqsvg), H = plotUtils.safeHeight(scope.jqsvg);
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin,
              rMargin = scope.layout.rightLayoutMargin, tMargin = scope.layout.topLayoutMargin;
          var model = scope.stdmodel;
          if (x < lMargin || model.yAxisR != null && x > W - rMargin || y > H - bMargin || y < tMargin) {
            scope.svg.selectAll(".plot-cursor").remove();
            scope.jqcontainer.find(".plot-cursorlabel").remove();
            return;
          }
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
              .attr("x1", x).attr("y1", tMargin).attr("x2", x).attr("y2", H - bMargin);

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
              .attr("x2", W - rMargin)
              .attr("y2", y);

            var renderCursorLabel = function(axis, id, alignRight){
              if(axis == null) { return };
              scope.jqcontainer.find("#" + id).remove();
              var label = $("<div id='" + id + "' class='plot-cursorlabel'></div>")
                .appendTo(scope.jqcontainer)
                .text(plotUtils.getTipStringPercent(mapY(y), axis));
              var w = label.outerWidth(), h = label.outerHeight();
              var p = {
                "x" : (alignRight ? rMargin : lMargin) + scope.labelPadding.x,
                "y" : y - h / 2
              };
              var css = {
                "top" : p.y ,
                "background-color" : opt.color != null ? opt.color : "black"
              };
              css[alignRight ? "right" : "left"] = p.x;
              label.css(css);
            };

            renderCursorLabel(model.yAxis, "cursor_ylabel", false);
            renderCursorLabel(model.yAxisR, "cursor_yrlabel", true);
          }
        };

        scope.prepareMergedLegendData = function() {
          var data = scope.stdmodel.data;

          var mergedLines = {};
          var lineUniqueAttributesSet = {};

          function getColorInfoUid(dat) {
            var color = plotUtils.createColor(dat.color, dat.color_opacity),
                border = plotUtils.createColor(dat.stroke, dat.stroke_opacity);
            return color + border;
          }

          function addNewLegendLineData(dat, lineUniqueIndex) {
            var line = {
              dataIds: [i],
              legend: dat.legend,
              showItem: dat.showItem,
              isLodItem: dat.isLodItem === true,
              color: dat.color,
              color_opacity: dat.color_opacity,
              stroke: dat.stroke,
              stroke_opacity: dat.stroke_opacity
            };
            if (dat.isLodItem === true) {
              line.lodDataIds = [i];
            }
            var lineId = plotUtils.randomString(32);
            mergedLines[lineId] = line;
            lineUniqueAttributesSet[lineUniqueIndex] = lineId;
            return lineId;
          }

          function addDataForExistingLegendLine(dat, line) {
            line.dataIds.push(i);
            if (dat.isLodItem === true) {
              line.isLodItem = true;
              if (line.lodDataIds) {
                line.lodDataIds.push(i);
              } else {
                line.lodDataIds = [i];
              }
            }
            if (line.showItem !== true) {
              line.showItem = dat.showItem
            }
          }

          for (var i = 0; i < data.length; i++) {
            var dat = data[i];
            if (dat.legend == null || dat.legend === "") {
              continue;
            }

            var lineUniqueIndex = dat.legend + getColorInfoUid(dat);

            if (lineUniqueAttributesSet[lineUniqueIndex] == null) {
              addNewLegendLineData(dat, lineUniqueIndex);
            } else {
              addDataForExistingLegendLine(dat, mergedLines[lineUniqueAttributesSet[lineUniqueIndex]])
            }
          }
          return mergedLines;
        };

        scope.getLegendPosition = function(legendPosition, isHorizontal) {
          var margin = scope.layout.legendMargin,
              containerWidth = scope.jqcontainer.outerWidth(true),
              containerWidthWithMargin = containerWidth + margin,
              legend = scope.jqlegendcontainer.find("#plotLegend"),
              legendHeight = legend.height(),
              legendHeightWithMargin = legendHeight + margin,
              verticalCenter = scope.jqcontainer.height() / 2 - legendHeight / 2,
              horizontalCenter = containerWidth / 2 - legend.width() / 2;
          if (!legendPosition) { return scope.getLegendPosition("TOP_RIGHT", isHorizontal); }
          var position;
          if(legendPosition.position){
            switch(legendPosition.position){
              case "TOP":
                position = {
                  "left": horizontalCenter,
                  "top": -legendHeightWithMargin
                };
                break;
              case "LEFT":
                position = {
                  "left": 0,
                  "top": verticalCenter
                };
                break;
              case "BOTTOM":
                position = {
                  "left": horizontalCenter,
                  "bottom": -legendHeightWithMargin
                };
                break;
              case "RIGHT":
                position = {
                  "left": containerWidthWithMargin,
                  "bottom": verticalCenter
                };
                break;
              default:
                position = scope.getLegendPositionByLayout(legendPosition, isHorizontal);
            }
          }else{
            position = {
              "left": legendPosition.x,
              "top": legendPosition.y
            };
          }
          return position;
        };

        scope.getLegendPositionByLayout = function(legendPosition, isHorizontal){
          var legend = scope.jqlegendcontainer.find("#plotLegend"),
              margin = scope.layout.legendMargin,
              legendWidth = legend.outerWidth(true),
              containerWidth = scope.jqcontainer.outerWidth(true),
              containerWidthWithMargin = containerWidth + margin,
              legendHeight = legend.height(),
              legendHeightWithMargin = legendHeight + margin, position;
          if(isHorizontal){
            switch(legendPosition.position){
              case "TOP_LEFT":
                position = {
                  "left": 0,
                  "top": -legendHeightWithMargin
                };
                break;
              case "TOP_RIGHT":
                position = {
                  "left": containerWidth - legendWidth,
                  "top": -legendHeightWithMargin
                };
                break;
              case "BOTTOM_LEFT":
                position = {
                  "left": 0,
                  "bottom": -legendHeightWithMargin
                };
                break;
              case "BOTTOM_RIGHT":
                position = {
                  "left": containerWidth - legendWidth,
                  "bottom": -legendHeightWithMargin
                };
                break;
            }
          }else{
            switch(legendPosition.position){
              case "TOP_LEFT":
                position = {
                  "left": 0,
                  "top": scope.layout.topLayoutMargin
                };
                break;
              case "TOP_RIGHT":
                position = {
                  "left": containerWidthWithMargin,
                  "top": scope.layout.topLayoutMargin
                };
                break;
              case "BOTTOM_LEFT":
                position = {
                  "left": 0,
                  "bottom": scope.layout.bottomLayoutMargin
                };
                break;
              case "BOTTOM_RIGHT":
                position = {
                  "left": containerWidthWithMargin,
                  "bottom": scope.layout.bottomLayoutMargin
                };
                break;
            }
          }
          return position;
        };

        scope.createLegendContainer = function(clazz, handle) {
          var isHorizontal = scope.stdmodel.legendLayout === "HORIZONTAL";
          var draggable = {
            start: function(event, ui) {
              $(this).css({//avoid resizing for bottom-stacked legend
                "bottom": "auto"
              });
            },
            stop: function(event, ui) {
              scope.legendPosition = {
                "left": ui.position.left,
                "top": ui.position.top
              };
            }
          };

          var legendContainer = $("<div></div>").appendTo(scope.jqlegendcontainer)
            .attr("id", "plotLegend")
            .attr("class", "plot-legend")
            .draggable(draggable)
            .css("max-height", plotUtils.safeHeight(scope.jqsvg) - scope.layout.bottomLayoutMargin - scope.layout.topLayoutMargin);

          if (clazz != null) {
            legendContainer.addClass(clazz);
          }

          if (handle != null) {
            draggable.handle = handle;
          } else {
            legendContainer.addClass("plot-legenddraggable");
          }

          if (isHorizontal) {
            legendContainer.css("max-width", scope.jqcontainer.width());
          }

          return legendContainer;
        };

        scope.getLodLabel = function(lodType) {
          var label;
          switch(lodType){
            case 'box':
              label = 'group into boxes';
              break;
            case 'river':
              label = 'group into river';
              break;
            case 'off':
              label = 'no grouping';
              break;
            default:
              label = lodType;
          }
          return label;
        };

        scope.renderLegends = function() {
          // legend redraw is controlled by legendDone
          if (scope.legendableItem === 0 ||
            scope.stdmodel.showLegend === false || scope.legendDone === true) { return; }

          var data = scope.stdmodel.data;
          var isHorizontal = scope.stdmodel.legendLayout === "HORIZONTAL";

          scope.jqlegendcontainer.find("#plotLegend").remove();
          scope.legendDone = true;

          var legendContainer;
          if (scope.model.getCellModel().type === "HeatMap"){
            legendContainer = scope.createLegendContainer();
          }else{
            legendContainer = scope.createLegendContainer("plot-legendscrollablecontainer", "#legendDraggableContainer");
          }

          if (scope.model.getCellModel().type === "HeatMap") {
            scope.gradientLegend = new GradientLegend(data);
            scope.gradientLegend.render(legendContainer, data[0].colors);
            scope.updateLegendPosition();
            return;
          }

          var legendDraggableContainer = $("<div></div>").appendTo(legendContainer)
            .attr("id", "legendDraggableContainer")
            .attr("class", "plot-legenddraggable");

          var legendUnit = "<div></div>",
              legendLineUnit = isHorizontal ? "<div class='plot-legenditeminline'></div>" : "<div class='plot-legenditeminrow'></div>";
          var legend = $(legendUnit).appendTo(legendDraggableContainer)
            .attr("id", "legends");

          scope.legendMergedLines = scope.prepareMergedLegendData();

          if (!scope.stdmodel.omitCheckboxes &&
            Object.keys(scope.legendMergedLines).length > 1) {  // skip "All" check when there is only one line
            var allLegendId = plotUtils.randomString(32);
            var unit = $(legendLineUnit).appendTo(legend)
              .attr("id", "legend_all")
              .addClass("plot-legendline");
            $("<input type='checkbox'></input>")
              .attr("id", "legendcheck_all_" + allLegendId)
              .attr("class", "plot-legendcheckbox beforeCheckbox")
              .prop("checked", scope.showAllItems)
              .click(function(e) {
                return scope.toggleVisibility(e);
              })
              .appendTo($(unit));
            $("<span></span>")
              .attr("id", "legendbox_all")
              .attr("class", "plot-legendbox")
              .css("background-color", "none")
              .appendTo($(unit));
            $("<label></label>")
              .attr("id", "legendtext_all")
              .attr("for", "legendcheck_all_" + allLegendId)
              .attr("class", "plot-label")
              .text("All")
              .appendTo($(unit));
          }

          scope.lodTypeMenuItems = {};
          for (var id in scope.legendMergedLines) {
            if (!scope.legendMergedLines.hasOwnProperty(id)) { continue; }
            var line = scope.legendMergedLines[id];
            if (line.legend == null || line.legend === "") { continue; }
            var highlightTimeoutId;
            var unit = $(legendLineUnit).appendTo(legend)
              .attr("id", "legend_" + id)
              .addClass("plot-legendline")
              .mouseenter(function(e){
                var legendLine = $(this)[0];
                highlightTimeoutId = setTimeout(function(){
                  scope.highlightElements(legendLine.id.split("_")[1], true);
                }, 300);
              })
              .mouseleave(function(e){
                clearTimeout(highlightTimeoutId);
                scope.highlightElements($(this)[0].id.split("_")[1], false);
              });
            if(!scope.stdmodel.omitCheckboxes){
              // checkbox
              $("<input type='checkbox'></input>")
                .attr("id", "legendcheck_" + id)
                .attr("class", "plot-legendcheckbox beforeCheckbox")
                .prop("checked", line.showItem)
                .click(function(e) {
                  return scope.toggleVisibility(e);
                })
                .appendTo(unit);
            }

            var clr = plotUtils.createColor(line.color, line.color_opacity),
                st_clr = plotUtils.createColor(line.stroke, line.stroke_opacity);
            var sty = line.color == null ? "dotted " : "solid ";
            // color box
            $("<span></span>")
              .attr("id", "legendbox_" + id)
              .attr("class", "plot-legendbox")
              .attr("title", line.color == null ? "Element-based colored item" : "")
              .css("background-color",
                line.color == null ? "none" : clr)
              .css("border",
                line.stroke != null ? "1px " + sty + st_clr :
                (line.color != null ? "1px " + sty + clr : "1px dotted gray"))
              .appendTo(unit);
            // legend text
            $("<label></label>").appendTo(unit)
              .attr("id", "legendtext_" + id)
              .attr("for", "legendcheck_" + id)
              .attr("class", "plot-label")
              .text(line.legend);

            if (line.isLodItem === true) {

              var applyLodType = function (lodType, legendLineId) {
                var dataIds = scope.legendMergedLines[legendLineId].dataIds;

                if (lodType === 'off') {
                  if (scope.getMergedLodInfo(dataIds).lodType === "off") { return; }
                  scope.removePipe.push("msg_lodoff");
                  scope.renderMessage("LOD is being turned off. Are you sure?",
                    [ "You are trying to turning off LOD. Loading full resolution data is " +
                    "going to take time and may potentially crash the browser.",
                    "PROCEED (left click) / CANCEL (right click)"],
                    "msg_lodoff",
                    function() {
                      _.forEach(dataIds, function (dataId) {
                        var loadLoader = scope.stdmodel.data[dataId];
                        if (loadLoader.toggleLod) {
                          loadLoader.toggleLod(scope);
                        }
                      });
                      scope.update();
                      scope.setMergedLodHint(dataIds, legendLineId);
                    }, null);
                } else {
                  var hasChanged = false;
                  _.forEach(dataIds, function (dataId) {
                    var loadLoader = scope.stdmodel.data[dataId];
                    if (!loadLoader.lodType || loadLoader.lodType === lodType) { return; }
                    loadLoader.clear(scope);
                    loadLoader.applyLodType(lodType);
                    loadLoader.zoomLevelChanged(scope);
                    hasChanged = true;
                  });
                  if (hasChanged) {
                    scope.update();
                    scope.setMergedLodHint(dataIds, legendLineId);
                  }
                }
              };

              var createLodTypeMenuItem = function(lodType, lineId){
                return {
                  lodType: lodType,
                  lineId: lineId,
                  name: scope.getLodLabel(lodType),
                  action: function(){
                    applyLodType(this.lodType, this.lineId);
                  }
                }
              };

              var lodTypeMenuItems = [];
              _.forEach(line.dataIds, function(dataId){
                var graphics = scope.stdmodel.data[dataId];
                _.forEach(graphics.lodTypes, function(lodType){
                  if(!_.some(lodTypeMenuItems, {lodType: lodType})){
                    lodTypeMenuItems.push(createLodTypeMenuItem(lodType, id));
                  }
                });
              });
              lodTypeMenuItems.push(createLodTypeMenuItem('off', id));

              var lodhint = $(
                '<div class="dropdown dropdown-promoted" data-toggle="dropdown" style="float: right; width: auto;">' +
                '<a class="dropdown-toggle plot-legendlodtype" data-toggle="dropdown"></a>' +
                '<bk-dropdown-menu menu-items="lodTypeMenuItems[\'' + id + '\']" submenu-classes="drop-right"></bk-dropdown-menu>' +
                '</div>'
              );
              scope.lodTypeMenuItems[id] = lodTypeMenuItems;
              unit.append($compile(lodhint)(scope));
              lodhint.attr("id", "hint_" + id).attr("class", "plot-legendlod");
              scope.setMergedLodHint(line.lodDataIds, id);
            }
          }

          scope.updateLegendPosition();
        };

        scope.updateLegendPosition = function() {
          var legendContainer = scope.jqlegendcontainer.find("#plotLegend");
          var isHorizontal = scope.stdmodel.legendLayout === "HORIZONTAL";
          var margin = scope.layout.legendMargin;
          if (scope.legendResetPosition === true) {
            scope.legendPosition = scope.getLegendPosition(scope.stdmodel.legendPosition, isHorizontal);
            scope.legendResetPosition = false;
          }
          legendContainer.css(scope.legendPosition);

          //increase plot margins if legend has predefined values
          if(scope.stdmodel.legendPosition.position === "LEFT") {
            scope.jqcontainer.css("margin-left", legendContainer.width() + margin);
          }
          if(scope.stdmodel.legendPosition.position === "TOP") {
            scope.jqcontainer.css("margin-top", legendContainer.height() + margin);
          }
          if(scope.stdmodel.legendPosition.position === "BOTTOM") {
            scope.jqcontainer.css("margin-bottom", legendContainer.height() + margin);
          }
          if(isHorizontal){
            if(["TOP_LEFT", "TOP_RIGHT"].indexOf(scope.stdmodel.legendPosition.position) !== -1) {
              scope.jqcontainer.css("margin-top", legendContainer.height() + margin);
            }
            if(["BOTTOM_LEFT", "BOTTOM_RIGHT"].indexOf(scope.stdmodel.legendPosition.position) !== -1) {
              scope.jqcontainer.css("margin-bottom", legendContainer.height() + margin);
            }
          }else{
            if(["TOP_LEFT", "BOTTOM_LEFT"].indexOf(scope.stdmodel.legendPosition.position) !== -1) {
              scope.jqcontainer.css("margin-left", legendContainer.width() + margin);
            }
          }

          if (legendContainer.length) {
            var legenddraggable = legendContainer.find(".plot-legenddraggable");
            if (legendContainer.get(0).scrollHeight > legendContainer.get(0).clientHeight) {
              legenddraggable.addClass("hasScroll");
            } else {
              legenddraggable.removeClass("hasScroll");
            }
          }

        };

        scope.highlightElements = function(legendId, highlight){

          if(!legendId) { return; }

          var elementsIds = scope.legendMergedLines[legendId].dataIds;
          for(var i=0; i<elementsIds.length; i++){
            var id = elementsIds[i];
            var data = scope.stdmodel.data[id];
            data.setHighlighted(scope, highlight);
          }
        };

        scope.updateMargin = function(){
          if (scope.model.updateMargin != null) {
            setTimeout(scope.model.updateMargin, 0);
          }
        };

        scope.getMergedLodInfo = function(lodDataIds) {
          var firstLine = scope.stdmodel.data[lodDataIds[0]];
          var lodInfo = {
            lodType: firstLine.lodType,
            lodOn: firstLine.lodOn,
            lodAuto: firstLine.lodAuto //consider all lines have the same lodAuto
          };

          for (var j = 0; j < lodDataIds.length; j++) {
            var dat = scope.stdmodel.data[lodDataIds[j]];
            if (lodInfo.lodType !== dat.lodType) {
              lodInfo.lodType = "mixed";//if merged lines have different lod types
            }
            if (lodInfo.lodOn !== true) {//switch off lod only if all lines has lod off
              lodInfo.lodOn = dat.lodOn;
            }
          }
          return lodInfo;
        };
        scope.setMergedLodHint = function(lodDataIds, legendLineId) {
          var lodInfo = scope.getMergedLodInfo(lodDataIds);
          var legend = scope.jqlegendcontainer.find("#legends");
          var hint = legend.find("#hint_" + legendLineId);
          var type = hint.find(".dropdown-toggle");
          type.text(lodInfo.lodType);
        };
        scope.toggleVisibility = function(e) {
          var id = e.target.id.split("_")[1], data = scope.stdmodel.data, line;
          // id in the format "legendcheck_id"
          if (id == "all") {
            scope.showAllItems = !scope.showAllItems;

            for (var lineId in scope.legendMergedLines) {
              if (scope.legendMergedLines.hasOwnProperty(lineId)) {
                line = scope.legendMergedLines[lineId];
                line.showItem = scope.showAllItems;
                for (var i = 0; i < line.dataIds.length; i++) {
                  var dat = data[line.dataIds[i]];
                  dat.showItem = scope.showAllItems;
                  if (dat.showItem === false) {
                    dat.hideTips(scope, true);
                    if (dat.isLodItem === true) {
                      dat.lodOn = false;
                    }
                  }else{
                    dat.hideTips(scope, false);
                  }
                }
                if (line.showItem === false) {
                  if (line.isLodItem === true) {
                    scope.setMergedLodHint(line.lodDataIds, lineId);
                  }
                }
                scope.jqlegendcontainer.find("#legendcheck_" + lineId).prop("checked", line.showItem);
              }
            }

            scope.calcRange();
            scope.update();
            return;
          }

          line = scope.legendMergedLines[id];
          line.showItem = !line.showItem;
          for (var j = 0; j < line.dataIds.length; j++) {
            var dat = data[line.dataIds[j]];
            dat.showItem = !dat.showItem;
            if (dat.showItem === false) {
              dat.hideTips(scope, true);
              if (dat.isLodItem === true) {
                dat.lodOn = false;
              }
            } else {
              dat.hideTips(scope, false);
            }
          }
          if (line.showItem === false) {
            if (line.isLodItem === true) {
              scope.setMergedLodHint(line.lodDataIds, id);
            }
          }

          scope.calcRange();
          scope.update();
        };

        scope.renderMessage = function(title, msgs, msgid, callbacky, callbackn) {
          var message = $("<div></div>").appendTo(scope.jqcontainer)
            .attr("id", msgid)
            .attr("class", "plot-message")
            .on('mousedown', function(e) {
              if (e.which === 3) {
                if (callbackn != null) {
                  callbackn();
                }
              } else {
                if (callbacky != null) {
                  callbacky();
                }
              }
              $(this).remove();
            });

          if (title != null && title != "") {
            $("<div></div>").appendTo(message)
              .attr("class", "plot-message-title")
              .text(title);
          }

          var content = $("<div></div>").appendTo(message)
              .attr("class", "plot-message-content");
          if (typeof(msgs) === "string") {
            msgs = [ msgs ];
          }
          for (var i = 0; i < msgs.length; i++) {
            $("<div></div>").appendTo(content)
              .text(msgs[i]);
          }

          var w = message.outerWidth(), h = message.outerHeight();
          var lMargin = scope.layout.leftLayoutMargin,
              bMargin = scope.layout.bottomLayoutMargin;
          message.css({
            "left" : (scope.jqcontainer.width() - lMargin) / 2 - w / 2 + lMargin,
            "top" : (scope.jqcontainer.height() - bMargin) / 2 - h / 2
          });
        };

        scope.renderCoverBox = function() {
          var W = plotUtils.safeWidth(scope.jqsvg), H = plotUtils.safeHeight(scope.jqsvg);
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
            "width" : scope.stdmodel.yAxisR ? scope.layout.rightLayoutMargin : 10,
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
          if (scope.interactMode === "other") {
            return;
          }
          if (d3.event.target.nodeName.toLowerCase() === "div") {
            scope.interactMode = "other";
            scope.disableZoom();
            return;
          }
          scope.interactMode = d3.event.button == 0 ? "zoom" : "locate";
        };
        scope.mouseUp = function() {
          if (scope.interactMode === "remove") {
            scope.interactMode = "other";
            return;
          }
          if (scope.interactMode === "other") {
            scope.interactMode = "zoom";
          }
          scope.enableZoom();
        };
        scope.zoomStart = function(d) {
          if (scope.interactMode === "other") { return; }
          scope.zoomed = false;
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
          if (scope.interactMode === "other") { return; }
          if (scope.interactMode === "zoom") {
            // left click zoom
            var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
            var W = plotUtils.safeWidth(scope.jqsvg) - lMargin, H = plotUtils.safeHeight(scope.jqsvg) - bMargin;
            var d3trans = d3.event.translate, d3scale = d3.event.scale;
            var dx = d3trans[0] - scope.lastx, dy = d3trans[1] - scope.lasty,
                ds = this.lastscale / d3scale;
            scope.lastx = d3trans[0];
            scope.lasty = d3trans[1];
            scope.lastscale = d3scale;

            var focus = scope.focus;
            var mx = d3.mouse(scope.svg[0][0])[0], my = d3.mouse(scope.svg[0][0])[1];
            if (Math.abs(mx - scope.mousep1.x) > 0 || Math.abs(my - scope.mousep1.y) > 0) {
              scope.zoomed = true;
            }
            if (ds == 1.0) {
              // translate only
              var tx = -dx / W * focus.xspan, ty = dy / H * focus.yspan;
              if (focus.xl + tx >= 0 && focus.xr + tx <= 1) {
                focus.xl += tx;
                focus.xr += tx;
              } else {
                if (focus.xl + tx < 0) {
                  focus.xl = 0;
                  focus.xr = focus.xl + focus.xspan;
                } else if (focus.xr + tx > 1) {
                  focus.xr = 1;
                  focus.xl = focus.xr - focus.xspan;
                }
              }
              if (focus.yl + ty >= 0 && focus.yr + ty <= 1) {
                focus.yl += ty;
                focus.yr += ty;
              } else {
                if (focus.yl + ty < 0) {
                  focus.yl = 0;
                  focus.yr = focus.yl + focus.yspan;
                } else if (focus.yr + ty > 1) {
                  focus.yr = 1;
                  focus.yl = focus.yr - focus.yspan;
                }
              }
              scope.jqsvg.css("cursor", "move");
            } else {
              // scale only
              var level = scope.zoomLevel;
              if (my <= plotUtils.safeHeight(scope.jqsvg) - scope.layout.bottomLayoutMargin) {
                // scale y
                var ym = focus.yl + scope.scr2dataYp(my) * focus.yspan;
                var nyl = ym - ds * (ym - focus.yl), nyr = ym + ds * (focus.yr - ym),
                    nyspan = nyr - nyl;

                if (nyspan >= level.minSpanY && nyspan <= level.maxScaleY) {
                  focus.yl = nyl;
                  focus.yr = nyr;
                  focus.yspan = nyspan;
                } else {
                  if (nyspan > level.maxScaleY) {
                    focus.yr = focus.yl + level.maxScaleY;
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
                if (nxspan >= level.minSpanX && nxspan <= level.maxScaleX) {
                  focus.xl = nxl;
                  focus.xr = nxr;
                  focus.xspan = nxspan;
                } else {
                  if (nxspan > level.maxScaleX) {
                    focus.xr = focus.xl + level.maxScaleX;
                  } else if (nxspan < level.minSpanX) {
                    focus.xr = focus.xl + level.minSpanX;
                  }
                  focus.xspan = focus.xr - focus.xl;
                }
              }
              scope.emitZoomLevelChange();
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
          focus.xl = focus.xl < 0 ? 0 : focus.xl;
          focus.xr = focus.xr > 1 ? 1 : focus.xr;
          focus.yl = focus.yl < 0 ? 0 : focus.yl;
          focus.yr = focus.yr > 1 ? 1 : focus.yr;
          focus.xspan = focus.xr - focus.xl;
          focus.yspan = focus.yr - focus.yl;

          if (focus.xl > focus.xr || focus.yl > focus.yr) {
            console.error("visible range specified does not match data range, " +
                "enforcing visible range");
            _.extend(focus, scope.defaultFocus);
          }
        };
        scope.resetFocus = function() {
          var mx = d3.mouse(scope.svg[0][0])[0], my = d3.mouse(scope.svg[0][0])[1];
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
          var W = plotUtils.safeWidth(scope.jqsvg), H = plotUtils.safeHeight(scope.jqsvg);
          if (mx < lMargin && my < H - bMargin) {
            _.extend(scope.focus, _.pick(scope.defaultFocus, "yl", "yr", "yspan"));
          } else if (my > H - bMargin && mx > lMargin) {
            _.extend(scope.focus, _.pick(scope.defaultFocus, "xl", "xr", "xspan"));
          } else {
            _.extend(scope.focus, scope.defaultFocus);
          }
          scope.fixFocus(scope.focus);
          scope.calcMapping(true);
          scope.emitZoomLevelChange();
          scope.update();
        };
        scope.locateFocus = function() {
          var box = scope.locateBox;
          if (box == null) {
            return;
          }
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
          scope.emitZoomLevelChange();
        };
        scope.resetSvg = function() {
          scope.jqcontainer.find(".plot-constlabel").remove();

          scope.rpipeGridlines = [];
          scope.rpipeTexts = [];
          scope.rpipeTicks = [];
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
        scope.disableWheelZoom = function() {
          scope.svg.on("wheel.zoom", null);
        };

        scope.mouseleaveClear = function() {
          scope.svg.selectAll(".plot-cursor").remove();
          scope.jqcontainer.find(".plot-cursorlabel").remove();
        };

        scope.calcMapping = function(emitFocusUpdate) {
          // called every time after the focus is changed
          var focus = scope.focus;
          var lMargin = scope.layout.leftLayoutMargin,
              bMargin = scope.layout.bottomLayoutMargin,
              tMargin = scope.layout.topLayoutMargin,
              rMargin = scope.layout.rightLayoutMargin;
          var model = scope.stdmodel;
          var W = plotUtils.safeWidth(scope.jqsvg), H = plotUtils.safeHeight(scope.jqsvg);
          if (emitFocusUpdate == true && scope.model.updateFocus != null) {
            scope.model.updateFocus({
              "xl" : focus.xl,
              "xr" : focus.xr
            });
          }
          scope.data2scrY =
            d3.scale.linear().domain([focus.yl, focus.yr]).range([H - bMargin, tMargin]);
          scope.data2scrYp =
            d3.scale.linear().domain([focus.yl, focus.yr]).range([1, 0]);
          scope.scr2dataY =
            d3.scale.linear().domain([tMargin, H - bMargin]).range([focus.yr, focus.yl]);
          scope.scr2dataYp =
            d3.scale.linear().domain([tMargin, H - bMargin]).range([1, 0]);
          scope.data2scrX =
            d3.scale.linear().domain([focus.xl, focus.xr]).range([lMargin, W - rMargin]);
          scope.data2scrXp =
            d3.scale.linear().domain([focus.xl, focus.xr]).range([0, 1]);
          scope.scr2dataX =
            d3.scale.linear().domain([lMargin, W-rMargin]).range([focus.xl, focus.xr]);
          scope.scr2dataXp =
            d3.scale.linear().domain([lMargin, W-rMargin]).range([0, 1]);

          scope.data2scrXi = function(val) {
            return Number(scope.data2scrX(val).toFixed(scope.renderFixed));
          };
          scope.data2scrYi = function(val) {
            return Number(scope.data2scrY(val).toFixed(scope.renderFixed));
          };
        };

        scope.standardizeData = function() {
          var model = scope.model.getCellModel();
          scope.stdmodel = plotFormatter.standardizeModel(model, scope.prefs);
        };

        scope.dumpState = function() {
          var state = {};

          state.showAllItems = scope.showAllItems;
          state.plotSize = scope.plotSize;
          state.zoomed = scope.zoomed;
          state.focus = scope.focus;

          state.lodOn = [];
          state.lodType = [];
          state.lodAuto = [];
          state.zoomHash = [];
          state.showItem = [];
          var data = scope.stdmodel.data;
          for (var i = 0; i < data.length; i++) {
            state.lodOn[i] = data[i].lodOn;
            state.lodType[i] = data[i].lodType;
            state.lodAuto[i] = data[i].lodAuto;
            state.zoomHash[i] = data[i].zoomHash;
            state.showItem[i] = data[i].showItem;
          }
          state.visibleItem = scope.visibleItem;
          state.legendableItem = scope.legendableItem;
          state.defaultFocus = scope.defaultFocus;


          state.tips = {};
          $.extend(true, state.tips, scope.tips);

          return state;
        };

        scope.loadState = function(state) {
          scope.showAllItems = state.showAllItems;
          scope.plotSize = state.plotSize;
          scope.zoomed = state.zoomed;
          scope.focus = state.focus;
          var data = scope.stdmodel.data;
          for (var i = 0; i < data.length; i++) {
            if(data[i].isLodItem === true){
              data[i].lodOn = state.lodOn[i];
              if (state.lodOn[i]) {
                data[i].applyLodType(state.lodType[i]);
                data[i].applyLodAuto(state.lodAuto[i]);
                data[i].applyZoomHash(state.zoomHash[i]);
              }
            }
            data[i].showItem = state.showItem[i];
          }
          scope.visibleItem = state.visibleItem;
          scope.legendableItem = state.legendableItem;
          scope.defaultFocus = state.defaultFocus;
          if(scope.defaultFocus) {
            scope.fixFocus(scope.defaultFocus);
          }

          $.extend(true, scope.tips, state.tips);
        };

        scope.initFlags = function() {
          scope.showAllItems = true;
          scope.showLodHint = true;
          scope.showUnorderedHint = true;
        };

        scope.clearRemovePipe = function() {
          // some hints are set to be removed at the end of the next rendering cycle
          for (var i = 0; i < scope.removePipe.length; i++) {
            var id = scope.removePipe[i];
            scope.jqcontainer.find("#" + id).remove();
          }
          scope.removePipe.length = 0;
        };

        scope.init = function() {
          
          // first standardize data
          scope.standardizeData();
          // init flags
          scope.initFlags();

          // see if previous state can be applied
          scope.focus = {};

          if (!scope.model.getCellModel().tips) {
            scope.model.getCellModel().tips = {};
          }

          scope.tips = scope.model.getCellModel().tips;
          scope.plotSize = {};

          _.extend(scope.plotSize, scope.stdmodel.plotSize);
          var savedstate = scope.model.getDumpState();
          if (scope.doNotLoadState !== true && savedstate !== undefined && savedstate.plotSize !== undefined) {
            scope.loadState(savedstate);
          } else {
            if (scope.setDumpState !== undefined) {
              scope.setDumpState(scope.dumpState());
            }
          }
          scope.doNotLoadState = false;

          // create layout elements
          scope.initLayout();

          scope.resetSvg();
          scope.zoomObj = d3.behavior.zoom();

          // set zoom object
          scope.svg.on("mousedown", function() {
            return scope.mouseDown();
          }).on("mouseup", function() {
            return scope.mouseUp();
          }).on("mouseleave", function() {
            return scope.disableWheelZoom();
          });
          scope.jqsvg.mousemove(function(e) {
            return scope.renderCursor(e);
          }).mouseleave(function(e) {
            return scope.mouseleaveClear(e);
          });
          scope.enableZoom();
          scope.disableWheelZoom();
          scope.calcRange();

          // init copies focus to defaultFocus, called only once
          if(_.isEmpty(scope.focus)){
            _.extend(scope.focus, scope.defaultFocus);
          }

          // init remove pipe
          scope.removePipe = [];

          scope.calcMapping();

          scope.legendDone = false;
          scope.update();
        };

        scope.update = function(first) {
          if (scope.model.isShowOutput !== undefined && scope.model.isShowOutput() === false) {
            return;
          }

          scope.resetSvg();
          scope.calcGridlines();
          scope.renderGridlines();
          plotUtils.plotGridlines(scope);

          scope.renderData();
          scope.renderGridlineLabels();
          scope.renderGridlineTicks();
          scope.renderCoverBox(); // redraw
          plotUtils.plotLabels(scope); // redraw
          plotUtils.plotTicks(scope); // redraw

          plotTip.renderTips(scope);
          scope.renderLocateBox(); // redraw
          scope.renderLegends(); // redraw
          scope.updateMargin(); //update plot margins

          scope.prepareInteraction();

          scope.clearRemovePipe();
        };


        scope.getDumpState = function () {
          if (scope.model.getDumpState !== undefined) {
            return scope.model.getDumpState();
          }
        };


        scope.setDumpState = function (state) {
          if (scope.model.setDumpState !== undefined) {
              scope.model.setDumpState(state);

              bkSessionManager.setNotebookModelEdited(true);
              bkUtils.refreshRootScope();
          }
        };

        if (scope.model.getCellModel().type === "TreeMap"){
          bkoChartExtender.extend(scope, element, attrs);
        }
        scope.init(); // initialize
        scope.$watch('getDumpState()', function (result) {
          if (result !== undefined && result.plotSize === undefined) {
            scope.setDumpState(scope.dumpState());
          }
        });

        scope.getCellWidth = function () {
          return scope.jqcontainer.width();
        };

        scope.getCellHeight= function () {
          return scope.jqcontainer.height();
        };

        var watchCellSize = function () {
          if (!scope.model.isShowOutput || (scope.model.isShowOutput && scope.model.isShowOutput() === true)) {
            scope.plotSize.width = scope.getCellWidth();
            scope.plotSize.height = scope.getCellHeight();
            if (scope.setDumpState !== undefined) {
              scope.setDumpState(scope.dumpState());
            }
          }
        };

        scope.$watch('getCellWidth()', function (newValue, oldValue) {
          if(newValue !== oldValue){
            watchCellSize();
          }
        });

        scope.$watch('getCellHeight()', function (newValue, oldValue) {
          if(newValue !== oldValue){
            watchCellSize();
          }
        });

        scope.getCellModel = function() {
          return scope.model.getCellModel();
        };
        scope.$watch('getCellModel()', function() {
          scope.init();
        });
        scope.getTheme = function(){
          return bkHelper.getTheme();
        };
        scope.$watch('getTheme()', function(newValue, oldValue) {
          if(newValue !== oldValue) {
            if (scope.model.setDumpState !== undefined) {
              scope.model.setDumpState(scope.dumpState());
            }
            scope.legendDone = false;
            scope.init();
          }
        });

        scope.$on('$destroy', function() {
          $(window).off('resize',scope.resizeFunction);
          scope.svg.selectAll("*").remove();
          scope.jqlegendcontainer.find("#plotLegend").remove();
          scope.removeOnKeyListeners();
          $.contextMenu('destroy', { selector: '#' + scope.id});
        });

        scope.getSvgToSave = function() {
          var svg = scope.svg
            .node()
            .cloneNode(true);
          svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          svg.setAttribute('class', 'svg-export');

          var plotTitle = scope.jqplottitle;
          var titleOuterHeight = plotUtils.getActualCss(plotTitle, 'outerHeight', true);

          //legend
          scope.adjustSvgPositionWithLegend(svg, titleOuterHeight);
          scope.appendLegendToSvg(d3.select(svg));
          ///////

          plotUtils.translateChildren(svg, 0, titleOuterHeight);
          plotUtils.addTitleToSvg(svg, plotTitle, {
            width: plotTitle.width(),
            height: plotUtils.getActualCss(plotTitle, 'outerHeight') 
          });

          // Custom styles added by user
          var cellModel = scope.getCellModel();
          var extraStyles = [];
          if(cellModel.elementStyles) {
              for(var style in cellModel.elementStyles) {
                  elementStyles.push(style + ' {' + cellModel.elementStyles[style] + '}');
              }
          }

          if(cellModel.custom_styles) 
              extraStyles = extraStyles.concat(cellModel.custom_styles);

          plotUtils.addInlineStyles(svg, extraStyles);

          return svg;
        };

        scope.saveAsSvg = function() {
          var html = plotUtils.convertToXHTML(scope.getSvgToSave().outerHTML);
          var fileName = _.isEmpty(scope.stdmodel.title) ? 'plot' : scope.stdmodel.title;
          plotUtils.download('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html))), fileName + ".svg");
        };

        scope.saveAsPng = function() {
          var svg = scope.getSvgToSave();

          scope.canvas.width = svg.getAttribute("width");
          scope.canvas.height = svg.getAttribute("height");

          var imgsrc = 'data:image/svg+xml;base64,' +
            btoa(unescape(encodeURIComponent(plotUtils.convertToXHTML(svg.outerHTML))));
          var fileName = _.isEmpty(scope.stdmodel.title) ? 'plot' : scope.stdmodel.title;
          plotUtils.drawPng(scope.canvas, imgsrc, fileName + ".png");
        };

        scope.adjustSvgPositionWithLegend = function(svg, titleOuterHeight) {
          var isHorizontal = scope.stdmodel.legendLayout === "HORIZONTAL";
          var margin = scope.layout.legendMargin;
          var legendContainer = scope.jqlegendcontainer.find("#plotLegend");
          var containerLeftMargin = parseFloat(scope.jqcontainer.css("margin-left"));


          var W = plotUtils.outerWidth(scope.jqcontainer) + containerLeftMargin + 1;//add 1 because jQuery round size
          var H = plotUtils.outerHeight(scope.jqcontainer) + titleOuterHeight + 1;
          var legendW = plotUtils.getActualCss(legendContainer, 'outerWidth', true);
          var legendH = plotUtils.getActualCss(legendContainer, 'outerHeight', true);
          var legendPosition = scope.stdmodel.legendPosition;

          if (!legendPosition.position) {
            if (legendPosition.x + legendW > W) {
              W += legendPosition.x + legendW - W;
            }
            if ((legendPosition.y + legendH) > H) {
              H += legendPosition.y + legendH - H;
            }
          }

          if (legendPosition.position === "LEFT") {
            plotUtils.translateChildren(svg, legendW + margin, 0);
            W += legendW + margin;
          }
          if (legendPosition.position === "RIGHT") {
            W += legendW + margin;
          }
          if (legendPosition.position === "BOTTOM") {
            H += legendH + margin;
          }
          if (legendPosition.position === "TOP") {
            plotUtils.translateChildren(svg, 0, legendH + margin);
            H += legendH + margin;
          }
          if (isHorizontal) {
            if (["TOP_LEFT", "TOP_RIGHT"].indexOf(legendPosition.position) !== -1) {
              plotUtils.translateChildren(svg, 0, legendH + margin);
              H += legendH + margin;
            }
            if (["BOTTOM_LEFT", "BOTTOM_RIGHT"].indexOf(legendPosition.position) !== -1) {
              H += legendH + margin;
            }
            if (legendPosition.position !== "LEFT") {
              plotUtils.translateChildren(svg, containerLeftMargin, 0);
            }
          } else {
            if (["TOP_LEFT", "BOTTOM_LEFT"].indexOf(legendPosition.position) !== -1) {
              plotUtils.translateChildren(svg, legendW + margin, 0);
              W += legendW + margin;
            }
            if (["TOP_RIGHT", "BOTTOM_RIGHT"].indexOf(legendPosition.position) !== -1) {
              W += legendW + margin;
            }
            if (["LEFT", "TOP_LEFT", "BOTTOM_LEFT"].indexOf(legendPosition.position) < 0) {
              plotUtils.translateChildren(svg, containerLeftMargin, 0);
            }
          }
          svg.setAttribute("width", W);
          svg.setAttribute("height", H);
          $(svg).css("width", W);
          $(svg).css("height", H);
        };

        scope.appendLegendToSvg = function(svg) {

          var legend = scope.jqlegendcontainer.find("#plotLegend");
          if (scope.legendableItem === 0 || scope.stdmodel.showLegend === false || !legend.length) { return; }
          var legendCopy = scope.jqlegendcontainer.find("#plotLegend").clone();
          legendCopy.find(".plot-legendcheckbox").each(function(i, item) {
            if (item.checked) {
              item.setAttribute("checked", true);
            }
            item.setAttribute("onclick", "return false");
          });
          legendCopy.css("position", "inherit");

          //remove base from urls
          legendCopy.find("[style*='url']").each(function(i, item){
            var style = $(item).attr('style');
            style = style.replace("/beaker/", "");
            $(item).attr('style', style);
          });

          var getPositive = function(value) {
            return value > 0 ? value : 0;
          };

          var position = plotUtils.getActualCss(legend, 'position');
          var x = getPositive(position.left);
          var y = position.top != null ? getPositive(position.top) : getPositive(position.bottom);
          svg.append("foreignObject")
            .attr("width", plotUtils.getActualCss(legend, 'outerWidth', true) + 1)//add 1 because jQuery round size
            .attr("height", plotUtils.getActualCss(legend, 'outerHeight', true) + 1)
            .attr("x", x)
            .attr("y", y)
            .append("xhtml:body")
            .attr("xmlns", "http://www.w3.org/1999/xhtml")
            .html(legendCopy[0].outerHTML);
        }

      }
    };
  };
  beakerRegister.bkoDirective("Plot", [
    "plotUtils",
    "plotTip",
    "plotFormatter",
    "plotFactory",
    "bkCellMenuPluginManager",
    "bkSessionManager",
    "bkUtils",
    "GradientLegend",
    "bkoChartExtender",
    "plotService",
    "$compile",
    retfunc]);
})();

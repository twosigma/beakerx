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
/**
 * bko-LinePlot
 * ????
 */
(function() {
  'use strict';
  beaker.bkoDirective("LinePlot",
      ["lineplotUtils",
       "bkCellMenuPluginManager",
        function(lineplotUtils, bkCellMenuPluginManager) {
          return {
            template: "<div id='plotitle' class='lineplot-title'></div>"+
                      "<div id='lineplotContainer' class='lineplot-renderdiv' >"+ //oncontextmenu='return false;'
                      "<svg>"+
                      "<g id='maing'> <g id='lineg'></g> <g id='barg'></g> <g id='riverg'></g> <g id='circleg'></g>"+
                      "<g id='stemg'></g> <g id='pointrectg'></g> <g id='pointcircleg'></g> </g>"+
                      "<g id='coordg'></g>"+
                      "<g id='labelg'></g>"+
                      "</svg>"+
                      "</div>",
            controller: function($scope) {
              var model = $scope.model.getCellModel();
              $scope.range = null;
              $scope.layout = { bottomTextHeight: 30, leftTextWidth: 80, legendMargin: 10, legendBoxSize: 10 };
              $scope.fonts = { labelWidth: 6, labelHeight: 12, tooltipWidth: 10 };
              $scope.numIntervals = { x: 12, y: 8 };
              $scope.labelPadding = { x: 10, y: 10 };
              $scope.locateBox = null;
              $scope.tips = {};
              $scope.cursor = { x: -1, y: -1 };
              if (model.xLabel!=null) {
                $scope.layout.bottomTextHeight += $scope.fonts.labelHeight*2;
              }
              if (model.yLabel!=null) {
                $scope.layout.leftTextWidth += $scope.fonts.labelHeight;
              }
              if (model.xCoords==false) {
                $scope.layout.bottomTextHeight = 0;
              }
              $scope.$watch("model.getFocus()", function(newFocus){
                //console.log("CHANGE", newFocus, oldFocus);
                $scope.focus.xl = newFocus.xl;
                $scope.focus.xr = newFocus.xr;
                $scope.focus.xspan = newFocus.xr-newFocus.xl;
                $scope.calcMapping(false); // TODO make clear the logic of focus update & redraw
                $scope.update();
              });
              $scope.$watch("model.getWidth()", function(newWidth){
                if ($scope.width==newWidth) return;
                $scope.width = newWidth;
                $scope.jqcontainer.css("width", newWidth+"px");
                $scope.calcMapping(false);
                $scope.legendDone = false;
                $scope.update();
              });
            },
            link: function(scope, element, attrs) {
              // rendering code
              element.find("#lineplotContainer").resizable({
                maxWidth: element.width(),   // no wider than the width of the cell
                handles: "e, s, se",
                resize: function(event, ui){
                    scope.width = ui.size.width; scope.height = ui.size.height;
                    scope.calcMapping(false);
                    scope.emitSizeChange();
                    scope.legendDone = false;
                    scope.update();
                  }
              });
              var model = scope.model.getCellModel();
              element.find("#plotitle").text(model.plotTitle);
              element.find(".ui-icon-gripsmall-diagonal-se").removeClass("ui-icon ui-icon-gripsmall-diagonal-se"); // remove the ugly handle :D
              scope.container = d3.select(element[0]).select("#lineplotContainer"); // hook container to use jquery interaction
              scope.jqcontainer = element.find("#lineplotContainer");
              if (model.width!=null) scope.jqcontainer.css("width", model.width+"px");
              if (model.height!=null) scope.jqcontainer.css("height", model.height+"px");
              scope.maing = d3.select(element[0]).select("#maing");
              scope.coordg = d3.select(element[0]).select("#coordg");
              scope.labelg = d3.select(element[0]).select("#labelg");
              scope.lineg = scope.maing.select("#lineg");
              scope.barg = scope.maing.select("#barg");
              scope.riverg = scope.maing.select("#riverg");
              scope.stemg = scope.maing.select("#stemg");
              scope.circleg = scope.maing.select("#circleg");
              scope.pointrectg = scope.maing.select("#pointrectg");
              scope.pointcircleg = scope.maing.select("#pointcircleg");
              
              scope.emitSizeChange = function(){
                scope.model.updateWidth(scope.width);
              }
              scope.initRange = function(){
                var data = scope.data;
                var numLines= data.length;
                var xl = 1E20, xr = 0, yl = 1E20, yr = 0; // get the x,y ranges
                for(var i=0; i<numLines; i++){
                  var numPoints = data[i].points.length;
                  var points = data[i].points;
                  for(var j=0; j<numPoints; j++){
                    xl = Math.min(xl, points[j].x);
                    xr = Math.max(xr, points[j].x);
                    yl = Math.min(yl, points[j].y);
                    yr = Math.max(yr, points[j].y);
                    if (data[i].type==="river" && (data[i].height!=null || points[j].y2!=null)) {
                      var y2 = points[j].y2!=null? points[j].y2 : points[j].y+data[i].height;
                      yr = Math.max(yr, y2);
                    }
                    if (data[i].type==="stem" && (data[i].height!=null || points[j].y2!=null)) {
                      var y2 = points[j].y2!=null? points[j].y2 : points[j].y+data[i].height;
                      yr = Math.max(yr, y2);
                    }
                  }
                }
                scope.range = {"xl": xl, "xr": xr, "yl": yl, "yr": yr, "xspan": xr-xl, "yspan": yr-yl};
                scope.focus = {};
                scope.vrange = {}; // visible range
                _.extend(scope.focus, scope.range); // by default focus = range
                _.extend(scope.vrange, scope.range);
                scope.vrange.xl -= scope.xspan * 0.1;
                scope.vrange.xr += scope.xspan * 0.1;
                scope.vrange.yr += scope.yspan * 0.1;
                scope.vrange.yl = 0;
              }
              
              var dateIntervals = [1,5,10,15,30,60,300,600,1800,3600,10800,21600,43200,86400,604800,2592000,7776000,15552000,31104000];
              var valIntervals = [0.001,0.005,0.01,0.05,0.1,0.5,1,5,10,50,100,500,1000,5000,10000,50000,100000];
              scope.calcCoords = function(){
                // prepare the coordinates
                var focus = scope.focus;

                var xspan = focus.xr-focus.xl, yspan = focus.yr-focus.yl;
                var xbase, ybase, deci=0;
                for(var i=dateIntervals.length-1; i>=0; i--){
                  xbase = dateIntervals[i]*1000;
                  if (xspan/xbase>=scope.numIntervals.x) break;
                }
                for(var i=valIntervals.length-1; i>=0; i--){
                  ybase = valIntervals[i];
                  if (yspan/ybase>=scope.numIntervals.y) break;
                }
                while (xspan/xbase > scope.numIntervals.x*1.1) {
                  xbase *= 2;
                }
                while (yspan/ybase > scope.numIntervals.y*1.1) {
                  ybase *= 2;
                }
                if (ybase<=0.005) deci = 3;
                else if (ybase<=0.05) deci = 2;
                else if (ybase<=0.5) deci = 1;
                var xintv = xbase, yintv = ybase;
                var xs = Math.ceil(focus.xl/xintv)*xintv,
                    xt = Math.floor(focus.xr/xintv)*xintv,
                    ys = Math.ceil(focus.yl/yintv)*yintv,
                    yt = Math.floor(focus.yr/yintv)*yintv;
                scope.xCoords = [];
                scope.yCoords = [];
                for(var i=xs; i<=xt; i+=xintv)  scope.xCoords.push(i);
                for(var i=ys; i<=yt; i+=yintv)  scope.yCoords.push(i.toFixed(deci));
                scope.xintv = xintv;
                scope.yintv = yintv;
              }
              scope.renderCoords = function(){
                var focus = scope.focus;
                var mapX = scope.data2scrX, mapY = scope.data2scrY;
                for(var i=0; i<scope.xCoords.length; i++){
                  var x = scope.xCoords[i];
                  scope.rpipeCoords.push({
                    "id": "coord_x_"+i, "class": "lineplot-coord",
                    "x1": mapX(x), "y1": mapY(focus.yl), "x2": mapX(x), "y2": mapY(focus.yr)
                  })
                }
                for(var i=0; i<scope.yCoords.length; i++){
                  var y = scope.yCoords[i];
                  scope.rpipeCoords.push({
                    "id": "coord_y_"+i, "class": "lineplot-coord",
                    "x1": mapX(focus.xl), "y1": mapY(y), "x2": mapX(focus.xr), "y2": mapY(y)
                  })
                }
                scope.rpipeCoords.push({
                  "id": "coord_x_base", "class": "lineplot-coord-base",
                  "x1": mapX(focus.xl), "y1": mapY(focus.yl), "x2": mapX(focus.xr), "y2": mapY(focus.yl)
                });
                scope.rpipeCoords.push({
                    "id": "coord_y_base", "class": "lineplot-coord-base",
                    "x1": mapX(focus.xl), "y1": mapY(focus.yl), "x2": mapX(focus.xl), "y2": mapY(focus.yr)
                  });
              }
              scope.filterData = function(){
                var focus = scope.focus, data = scope.data, numLines = data.length;
                scope.fdata = [];
                var fdata = scope.fdata;
                for(var i=0; i<numLines; i++){
                  var points = data[i].points;
                  //fdata[i] = {"leftIndex":0, "rightIndex":points.length-1};
                  
                  var l = lineplotUtils.upper_bound(points, "x", focus.xl);
                  var r = lineplotUtils.upper_bound(points, "x", focus.xr)+1; // truncate out-of-sight segment on x-axis
                  l = Math.max(l, 0);
                  r = Math.min(r, points.length-1);
                  fdata[i] = {"leftIndex":l, "rightIndex":r};
                }
              }
              scope.renderLines = function(){
                var data = scope.data, fdata = scope.fdata, numLines = data.length, focus = scope.focus;
                var mapX = scope.data2scrX, mapY = scope.data2scrY;
                for(var i=0; i<numLines; i++){
                  if (data[i].shown==false) continue;
                  var points = data[i].points;
                  if (data[i].type==="bar") {
                    var w = data[i].width;
                    var sw;
                    var H = scope.jqsvg.height()-scope.layout.bottomTextHeight;
                    var rpoints = [];
                    for(var j=fdata[i].leftIndex; j<=fdata[i].rightIndex; j++){
                      var p = points[j];
                      var x1 = mapX(p.x-w/2), x2 = mapX(p.x+w/2), y = mapY(p.y);
                      sw = x2-x1;
                      if(H-y<0) continue; // prevent negative height
                      var bar = {
                        "id": "bar_"+i+"_"+j,
                        "x": x1, "y": y, "height": H-y
                      };
                      if (p.color!=null) bar.fill = p.color;
                      rpoints.push(bar);
                    }
                    scope.rpipeBars.push({
                      "id": "bar_"+i, "class": "lineplot-bar",
                      "width": sw,
                      "fill": data[i].color,
                      "points": rpoints
                    });
                  }else if (data[i].type==="river") {
                    var pstr = "";
                    for(var j=fdata[i].leftIndex; j<=fdata[i].rightIndex; j++){
                      var p = points[j];
                      pstr += mapX(p.x)+","+mapY(p.y)+" ";
                    }
                    for(var j=fdata[i].rightIndex; j>=fdata[i].leftIndex; j--){
                      var p = points[j];
                      var y2 = p.y2;
                      if (y2==null) y2 = focus.yl;
                      pstr += mapX(p.x)+","+mapY(y2)+" ";
                    }
                    scope.rpipeRivers.push({
                      "id": "river_"+i, "class": "lineplot-river",
                      "fill": data[i].color,
                      "points": pstr
                      })
                  }else if(data[i].type==="stem"){
                    var rpoints = [];
                    for(var j=fdata[i].leftIndex; j<=fdata[i].rightIndex; j++){
                      var p = points[j];
                      var y2 = p.y2;
                      if (y2==null) y2 = focus.yl;
                      rpoints.push({"id": "stem_"+i+"_"+j, "x1": mapX(p.x), "y1": mapY(p.y), "x2": mapX(p.x), "y2": mapY(y2),
                                    "stroke-width": data[i].width
                                   });
                      if (data[i].style.search("bottom")!=-1) {
                        var y = Math.min(p.y, y2);
                        rpoints.push({"id": "stem_b_"+i+"_"+j, "x1": mapX(p.x)-5, "y1": mapY(y), "x2": mapX(p.x)+5, "y2": mapY(y),
                                    "stroke-width": data[i].width
                                   });
                      }
                       if (data[i].style.search("top")!=-1) {
                        var y = Math.max(p.y, y2);
                        rpoints.push({"id": "stem_t_"+i+"_"+j, "x1": mapX(p.x)-5, "y1": mapY(y), "x2": mapX(p.x)+5, "y2": mapY(y),
                                    "stroke-width": data[i].width
                                   });
                      }
                    }
                    scope.rpipeStems.push({
                      "id": "stem_"+i, "class": "lineplot-stem",
                      "stroke": data[i].color,
                      "points": rpoints
                    });
                  }else if(data[i].type==="point"){
                    var rpoints = [];
                    for(var j = fdata[i].leftIndex; j<=fdata[i].rightIndex; j++){
                      var p = points[j];
                      if (data[i].style==="circle") {
                        var r = data[i].radius==null? 5:data[i].radius;
                        rpoints.push({"id": "point_"+i+"_"+j, "cx": mapX(p.x), "cy": mapY(p.y), "r": r});
                      }else{
                        var s = data[i].size==null? 10:data[i].size;
                        rpoints.push({"id": "point_"+i+"_"+j, "x": mapX(p.x)-s/2, "y": mapY(p.y)-s/2, "width":s, "height": s});
                      }
                    }
                    if (data[i].style==="rect") {
                      scope.rpipePointRects.push({
                        "id": "pointrect_"+i, "class": "lineplot-pointrect",
                        "fill": data[i].color,
                        "points": rpoints
                      });
                    }else{
                      scope.rpipePointCircles.push({
                        "id": "pointcircle_"+i, "class": "lineplot-pointcircle",
                        "fill": data[i].color,
                        "points": rpoints
                      });
                    }
                  }else { // polyline: solid, dash or dot
                    var pstr = "";
                    for(var j=fdata[i].leftIndex; j<=fdata[i].rightIndex; j++){
                      var p = points[j];
                      pstr += mapX(p.x)+","+mapY(p.y)+" ";
                      if (data[i].interpolation==="none" && j<fdata[i].rightIndex) {
                        var p2 = points[j+1];
                        pstr += mapX(p.x)+","+mapY(p.y)+" "+mapX(p2.x)+","+mapY(p.y)+" ";
                      }
                    }
                    var prop = lineplotUtils.standardizeLineProp("line_"+i, data[i]);
                    _.extend(prop, {"points": pstr});
                    scope.rpipeLines.push(prop);
                  }
                }
              }
              scope.renderLineDots = function(){
                var data = scope.data, fdata = scope.fdata, numLines = data.length, focus = scope.focus;
                var mapX = scope.data2scrX, mapY = scope.data2scrY;
                for (var i=0; i<numLines; i++) {
                  if (data[i].shown==false) continue;
                  var points = data[i].points;
                  var rpoints = [];
                  for(var j=fdata[i].leftIndex; j<=fdata[i].rightIndex; j++){
                    //var p = lineplotUtils.data2scrPoint(scope, points[j]);
                    var p = {"x": mapX(points[j].x), "y": mapY(points[j].y)};
                    if (lineplotUtils.outsideScr(scope, p)) continue;
                    var id = "dot_"+points[j].uniqid;
                    rpoints.push({
                      "id": id, "lineid": i,
                      "cx": p.x, "cy": p.y, "r": 4, "opacity": scope.tips[id]==null?0:1,
                      "point": _.omit(points[j], "uniqid"),
                      //"color": data[i].color,
                      "value": points[j].value
                    });
                  }
                  var wrapper = {"id":"linedots_"+i, "class": "lineplot-dot", "stroke": data[i].color, "fill": "white", "points": rpoints};
                  scope.rpipeCircles.push(wrapper);
                }
              }
              scope.prepareInteraction = function(id){
                var sel;
                if (id==null) {
                  sel = scope.svg.selectAll(".lineplot-dot circle");
                }else{
                  sel = scope.svg.selectAll("#"+id);
                }
                sel
                  .on("mouseenter", function(d){ return scope.tooltip(d); })
                  .on("mouseleave", function(d){ return scope.untooltip(d); })
                  .on("click", function(d){ return scope.toggleTooltip(d); });
              }
              scope.toggleTooltip = function(d){
                var id = d.id, nv = scope.tips[id]==null?1:0;
                //scope.svg.selectAll("#"+id)
                //  .attr("visibility", nv);
                if (nv==1) {
                  d.opacity = 1;
                  scope.tips[id] = d;
                  scope.svg.selectAll("#"+id)
                    .attr("opacity", 1);
                  //lineplotUtils.replotSingleCircle(scope, d);
                  //scope.prepareInteraction(d.id);
                }else{
                  delete scope.tips[id];
                  d.opacity = 0;
                  scope.svg.selectAll("#"+id)
                    .attr("opacity", 0);
                  scope.jqcontainer.find("#tip_"+id).remove();
                  scope.jqcontainer.find("#tip_mouse").remove();
                }
              }
              scope.tooltip = function(d){
                //scope.svg.selectAll("#"+d.id)
                //  .attr("opacity", 1);
                d.opacity = 1;
                scope.svg.select("#"+d.id).attr("opacity", 1);
                //lineplotUtils.replotSingleCircle(scope, d);
                //scope.prepareInteraction(d.id);
                
                scope.jqcontainer.find("#tip_mouse").remove();
                if (scope.tips[d.id]!=null) {
                  return;
                }
                $("<div></div>").appendTo(scope.jqcontainer)
                  .attr("id", "tip_mouse")
                  .attr("class", "lineplot-tooltip")
                  .css("left", d.cx + scope.fonts.tooltipWidth+"px")
                  .css("top", d.cy+"px")
                  .css("border-color", scope.data[d.lineid].color)
                  .append("<div>"+d.value+"</div>");
              }
              scope.untooltip = function(d){
                var opaq = scope.tips[d.id]==null?0:1;
                scope.svg.selectAll("#"+d.id)
                  .attr("opacity", opaq);
                scope.jqcontainer.find("#tip_mouse").remove();
                scope.renderTips();
              }
              scope.renderTips = function(){
                _.each(scope.tips, function(d){
                  //var p = lineplotUtils.data2scrPoint(scope, d.point);
                  var p = {"x": scope.data2scrX(d.point.x), "y": scope.data2scrY(d.point.y)};
                  if (lineplotUtils.outsideScr(scope, p)) return;
                  //if (p==null) return;
                  d.cx = p.x + scope.fonts.tooltipWidth;
                  d.cy = p.y;
                  var tip = scope.tips[d.id];
                  var tipdiv = scope.jqcontainer.find("#tip_"+d.id);
                  if (tipdiv.length==0) {
                    tipdiv = $("<div></div>").appendTo(scope.jqcontainer)
                      .attr("id", "tip_"+d.id)
                      .attr("class", "lineplot-tooltip")
                      .css("left", d.cx+"px")
                      .css("top", d.cy+"px")
                      .css("border-color", scope.data[d.lineid].color)
                      .append(d.value)
                      .mousedown( function(e){
                        if (e.which==3) {
                          scope.svg.selectAll("#"+d.id)
                             .attr("opacity", 0);
                          delete scope.tips[d.id];
                          $(this).remove();
                        }
                      })
                      .draggable({
                      stop: function(event, ui) {
                        tip.cx = ui.position.left - scope.fonts.tooltipWidth;
                        tip.cy = ui.position.top;
                        //var p = lineplotUtils.scr2dataPoint(scope, {"x":tip.cx, "y":tip.cy } );
                        tip.point.x = scope.scr2dataX(tip.cx);
                        tip.point.y = scope.scr2dataY(tip.cy);
                      }
                    });
                  }else{
                    tipdiv
                      .css("left", d.cx+"px")
                      .css("top", d.cy+"px");
                  }
                })
              }
              
              scope.renderLabels = function(){
                var mapX = scope.data2scrX, mapY = scope.data2scrY;
                var model = scope.model.getCellModel();
                if (model.xCoords!=false) {
                  for(var i=0; i<scope.xCoords.length; i++){
                    var x = scope.xCoords[i];
                    var p = {"x":mapX(x), "y":mapY(scope.focus.yl)+scope.labelPadding.y};
                    //var p = lineplotUtils.data2scrLabel(scope, {"x":x, "y":scope.focus.yl}, {x:0, y:scope.labelPadding.y});
                    scope.rpipeTexts.push({
                      "id": "label_x_"+i, "class": "lineplot-label",
                      "text": lineplotUtils.formatDate(scope.xintv, x),
                      "x": p.x, "y": p.y, "text-anchor": "middle", "dominant-baseline": "hanging"
                    });
                  }
                }
                for(var i=0; i<scope.yCoords.length; i++){
                  var y = scope.yCoords[i];
                  var p = {"x":mapX(scope.focus.xl)-scope.labelPadding.x, "y":mapY(y)};
                  //var p = lineplotUtils.data2scrLabel(scope, {"x":scope.focus.xl, "y":y}, {x:scope.labelPadding.x, y:0});
                   scope.rpipeTexts.push({
                    "id": "label_y_"+i, "class": "lineplot-label",
                    "text": y,
                    "x": p.x, "y": p.y, "text-anchor": "end", "dominant-baseline": "central"
                  });
                }
                var model = scope.model.getCellModel();
                var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
                if (model.xLabel!=null) {
                  scope.rpipeTexts.push({
                    "id": "xlabel", "class": "lineplot-xylabel",
                    "text": model.xLabel,
                    "x": lMargin+(scope.jqsvg.width()-lMargin)/2, "y": scope.jqsvg.height()-scope.fonts.labelHeight
                  });
                }
                if (model.yLabel!=null) {
                  var x = scope.fonts.labelHeight*2, y = (scope.jqsvg.height()-bMargin)/2;
                  scope.rpipeTexts.push({
                    "id": "ylabel", "class": "lineplot-xylabel",
                    "text": model.yLabel,
                    "x": x, "y": y,
                    "transform": "rotate(-90 "+x+" "+y+")"
                  });
                }
              }
              scope.renderCursor = function(e){
                var x = e.offsetX, y = e.offsetY;
                var W = scope.jqsvg.width(), H = scope.jqsvg.height();
                var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
                if(x<lMargin || y>H-bMargin) {
                  scope.svg.selectAll(".lineplot-cursor").remove();
                  scope.jqcontainer.find(".lineplot-cursorlabel").remove();
                  return;
                }
                var model = scope.model.getCellModel();
                var mapX = scope.scr2dataX, mapY = scope.scr2dataY;
                if (model.xCursor!=null) {
                  var opt = model.xCursor;
                  scope.svg.selectAll("#cursor_x").data([{}]).enter().append("line")
                    .attr("id", "cursor_x")
                    .attr("class", "lineplot-cursor")
                    .attr("stroke", opt.color!=null? opt.color:"black");
                  scope.svg.select("#cursor_x")
                    .attr("x1", x).attr("y1", 0).attr("x2", x).attr("y2", H-bMargin);
                  
                  scope.jqcontainer.find("#cursor_xlabel").remove();
                  var label = $("<div id='cursor_xlabel' class='lineplot-cursorlabel'></div>").appendTo(scope.jqcontainer)
                    .text(lineplotUtils.formatDate(scope.xintv, mapX(x)));
                  var w = label.outerWidth();
                  var p = {"x":x-w/2, "y":-scope.labelPadding.y*1.5-scope.fonts.labelHeight-bMargin+H};
                  label.css({"left": p.x+"px", "top": p.y+"px",
                          "background-color": opt.color!=null? opt.color:"black"});
                }
                if (model.yCursor!=null) {
                  var opt = model.yCursor;
                  scope.svg.selectAll("#cursor_y").data([{}]).enter().append("line")
                    .attr("id", "cursor_y")
                    .attr("class", "lineplot-cursor")
                    .attr("stroke", opt.color!=null? opt.color:"black");
                  scope.svg.select("#cursor_y")
                    .attr("x1", lMargin).attr("y1", y).attr("x2", W).attr("y2", y);
                    
                  scope.jqcontainer.find("#cursor_ylabel").remove();
                  var label = $("<div id='cursor_ylabel' class='lineplot-cursorlabel'></div>").appendTo(scope.jqcontainer)
                    .text(mapY(y).toFixed(0));
                  var w = label.outerWidth(), h = label.outerHeight();
                  var p = {"x":lMargin+scope.labelPadding.x, "y":y-h/2};
                  label.css({"left": p.x+"px", "top": p.y+"px",
                            "background-color": opt.color!=null? opt.color:"black"});
                }
              }
              scope.renderLegends = function(){
                if (scope.model.getCellModel().showLegend==false || scope.legendDone==true) return; // legend redraw is controlled by legendDone
                var data = scope.data, numLines = data.length;
                var margin = scope.layout.legendMargin;
                
                scope.jqcontainer.find("#legends").remove();
                
                scope.legendDone = true;
                var legend = $("<div></div>").appendTo(scope.jqcontainer)
                  .attr("id", "legends")
                  .attr("class", "lineplot-legendcontainer")
                  .css({"left": scope.jqcontainer.width()+10+"px", "top": "0px"});
                legend.draggable();
                
                var content = "";
                for(var i=0; i<numLines; i++){
                  var unit = $("<div></div>").appendTo(legend).attr("id", "legend_"+i);
                  $("<input type='checkbox'></input>").appendTo(unit)
                    .attr("id", "legendcheck_"+i)
                    .attr("class", "lineplot-legendcheckbox")
                    .attr("checked", data[i].shown==true)
                    .click( function(e){ return scope.toggleLine(e); } );
                  $("<span></span>").appendTo(unit)
                    .attr("id", "legendbox_"+i)
                    .attr("class", "lineplot-legendbox")
                    .css("background-color", data[i].color);
                  $("<span></span>").appendTo(unit)
                    .attr("id", "legendtext_"+i)
                    .attr("class", "lineplot-label")
                    .text(data[i].legend);
                }
              }
              scope.toggleLine = function(e){
                var id = e.target.id.split("_")[1];  // id in the format "legendcheck_i"
                var data = scope.data;
                data[id].shown = !data[id].shown;
                scope.update();
              }
              scope.renderCoverBox = function(){
                lineplotUtils.replotSingleRect(scope.labelg, {
                  "id": "coverboxX", "class": "lineplot-coverbox",
                  "x":0, "y":0, "width":scope.layout.leftTextWidth, "height":scope.jqsvg.height()
                });
                lineplotUtils.replotSingleRect(scope.labelg, {
                  "id": "coverboxY", "class": "lineplot-coverbox",
                  "x":0, "y":scope.jqsvg.height()-scope.layout.bottomTextHeight, "width":scope.jqsvg.width(), "height":scope.layout.bottomTextHeight
                });
              }
              scope.renderLocateBox = function(){
                scope.svg.selectAll("#locatebox").remove();
                if (scope.locateBox!=null) {
                  var box = scope.locateBox;
                  scope.svg.selectAll("#locatebox").data([{}]).enter().append("rect")
                    .attr("id", "locatebox")
                    .attr("class", "lineplot-locatebox")
                    .attr("x", box.x)
                    .attr("y", box.y)
                    .attr("width", box.w)
                    .attr("height", box.h);
                }
              }
              scope.calcLocateBox = function(){
                var p1 = scope.mousep1, p2 = scope.mousep2;
                var xl = Math.min(p1.x, p2.x), xr = Math.max(p1.x, p2.x), yl = Math.min(p1.y, p2.y), yr = Math.max(p1.y, p2.y);
                scope.locateBox = {"x":xl, "y":yl, "w":xr-xl, "h":yr-yl};
              }
              scope.mouseDown = function(){
                if (d3.event.target.nodeName!="svg") {
                  scope.interactMode = "other";
                  scope.disableZoom();
                  return;
                }
                scope.interactMode = d3.event.button==0? "zoom":"locate";
              }
              scope.mouseUp = function(){
                if (scope.interactMode==="other") {
                  scope.enableZoom();
                  scope.interactMode = "zoom";
                }
              }
              scope.zoomStart = function(d){
                if (scope.interactMode==="other") return;
                scope.lastx = scope.lasty = 0;
                scope.lastscale = 1.0;
                scope.zoomObj.scale(1.0);
                scope.zoomObj.translate([0,0]);
                scope.mousep1 = {"x": d3.mouse(scope.svg[0][0])[0], "y": d3.mouse(scope.svg[0][0])[1]};
                scope.mousep2 = {};
                _.extend(scope.mousep2, scope.mousep1);
                scope.jqcontainer.find("#tip_mouse").remove();
              }
              scope.zooming = function(d){
                if (scope.interactMode==="other") {
                  return;
                }
                if (scope.interactMode==="zoom") {
                  // left click zoom
                  var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
                  var W = scope.jqsvg.width()-lMargin, H = scope.jqsvg.height()-bMargin;
                  var d3trans = d3.event.translate, d3scale = d3.event.scale;
                  var dx = d3trans[0]-scope.lastx, dy = d3trans[1]-scope.lasty, ds = d3scale/this.lastscale;
                  scope.lastx = d3trans[0]; scope.lasty = d3trans[1]; scope.lastscale = d3scale;
                  
                  var focus = scope.focus, range = scope.range;
                  var mx = d3.mouse(scope.svg[0][0])[0], my = d3.mouse(scope.svg[0][0])[1];
                  //console.log(dx, dy, ds);
                  if (ds==1.0) {  // translate only
                    var tx = -dx/W*focus.xspan, ty = dy/H*focus.yspan;
                    focus.xl += tx;
                    focus.xr += tx;
                    focus.yl += ty;
                    focus.yr += ty;
                    scope.fixFocus();
                    scope.jqsvg.css("cursor", "move");
                  }else{  // scale only
                    // scale x only
                    if (my <= scope.jqsvg.height()-scope.layout.bottomTextHeight) {
                      // scale y
                      var ym = focus.yl + scope.scr2dataYp(my)*focus.yspan;
                      var nyl = ym - ds*(ym-focus.yl),
                          nyr = ym + ds*(focus.yr-ym),
                          nyspan = nyr-nyl;
                      if (nyspan <= range.yspan*100 && nyspan >= range.yspan*0.01) {
                        focus.yl = nyl; 
                        focus.yr = nyr;
                        focus.yspan = nyspan;
                      }
                      //scope.translateY = scope.translateY*ds + (1-ds)*my;
                      //scope.scaleY *= ds;
                    }
                    if (mx >= scope.layout.leftTextWidth) {
                      // scale x
                      var xm = focus.xl + scope.scr2dataXp(mx)*focus.xspan;
                      var nxl = xm - ds*(xm-focus.xl),
                          nxr = xm + ds*(focus.xr-xm),
                          nxspan = nxr-nxl;
                      if (nxspan <= range.xspan*100 && nxspan >= range.xspan*0.01) {
                        focus.xl = nxl;
                        focus.xr = nxr;
                        focus.xspan = nxspan;
                      }
                     // scope.translateX = scope.translateX*ds + (1-ds)*mx;
                     // scope.scaleX *= ds;
                    }
                    scope.fixFocus();
                  }
                  scope.calcMapping(true);
                  scope.renderCursor({offsetX: mx, offsetY: my});
                  scope.update();
                }else if (scope.interactMode==="locate") {
                  // right click zoom
                  scope.mousep2 = {"x": d3.mouse(scope.svg[0][0])[0], "y": d3.mouse(scope.svg[0][0])[1]};
                  scope.calcLocateBox();
                  scope.rpipeRects = [];
                  scope.renderLocateBox();
                }
              }
              scope.zoomEnd = function(d){
                scope.zoomObj.scale(1.0);
                scope.zoomObj.translate([0,0]);
                if (scope.interactMode==="locate") {
                  scope.locateFocus();
                  scope.locateBox = null;
                  scope.update();
                  scope.interactMode = "zoom";
                }
                scope.jqsvg.css("cursor", "auto");
              }
              scope.fixFocus = function(){
                var focus = scope.focus, vrange = scope.vrange;
                if (focus.xl < vrange.xl) focus.xl = vrange.xl;
                if (focus.xr > vrange.xr) focus.xr = vrange.xr;
                if (focus.yl < vrange.yl) focus.yl = vrange.yl;
                if (focus.yr > vrange.yr) focus.yr = vrange.yr;
                focus.xspan = focus.xr - focus.xl;
                focus.yspan = focus.yr - focus.yl;
              }
              scope.resetFocus = function(){
                var mx = d3.mouse(scope.svg[0][0])[0], my = d3.mouse(scope.svg[0][0])[1];
                var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
                var W = scope.jqsvg.width(), H = scope.jqsvg.height();
                if (mx < lMargin && my < H-bMargin) {
                  _.extend(scope.focus, _.pick(scope.range, "yl","yr","yspan"));
                }else if (my > H-bMargin && mx > lMargin) {
                  _.extend(scope.focus, _.pick(scope.range, "xl","xr","xspan"));
                }else{
                 _.extend(scope.focus, scope.range);
                }
                scope.calcMapping(true);
                
                scope.update();
              }
              scope.locateFocus = function(){
                var box = scope.locateBox;
                if (box==null) return;
                //var p1 = lineplotUtils.scr2dataPercent(scope, {"x": box.x, "y": box.y});
                //var p2 = lineplotUtils.scr2dataPercent(scope, {"x": box.x+box.w, "y": box.y+box.h});
                //console.log(p1, p2);
                var p1 = {"x": scope.scr2dataXp(box.x      ), "y": scope.scr2dataYp(box.y      )};
                var p2 = {"x": scope.scr2dataXp(box.x+box.w), "y": scope.scr2dataYp(box.y+box.h)};
                p1.x = lineplotUtils.fixPercent(p1.x);
                p1.y = lineplotUtils.fixPercent(p1.y);
                p2.x = lineplotUtils.fixPercent(p2.x);
                p2.y = lineplotUtils.fixPercent(p2.y);
                var focus = scope.focus, ofocus = {};
                _.extend(ofocus, scope.focus);
                focus.xl = ofocus.xl + ofocus.xspan * p1.x;
                focus.xr = ofocus.xl + ofocus.xspan * p2.x;
                focus.yl = ofocus.yl + ofocus.yspan * p2.y;
                focus.yr = ofocus.yl + ofocus.yspan * p1.y; 
                focus.xspan = focus.xr - focus.xl;
                focus.yspan = focus.yr - focus.yl;
                scope.calcMapping(true);
              }
              scope.resetSvg = function(){
                var svg = d3.select(element[0]).select("#lineplotContainer svg");
                scope.svg = svg;
                scope.jqsvg = element.find("svg");
                
                scope.rpipeLines = [];
                scope.rpipeCoords = [];
                scope.rpipeTexts = [];
                scope.rpipeRects = [];
                scope.rpipeCircles = [];
                scope.rpipeBars = [];
                scope.rpipeRivers = [];
                scope.rpipeStems = [];
                scope.rpipePointCircles = [];
                scope.rpipePointRects = [];
              }
              scope.enableZoom = function(){
                scope.container
                  .call(scope.zoomObj
                    .on("zoomstart", function(d){ return scope.zoomStart(d); } )
                    .on("zoom", function(d){ return scope.zooming(d); } )
                    .on("zoomend", function(d){ return scope.zoomEnd(d); } )
                  )
                  .on("dblclick.zoom", function(){ return scope.resetFocus(); });
              }
              scope.disableZoom = function(){
                scope.container
                  .call(scope.zoomObj
                    .on("zoomstart", null )
                    .on("zoom", null )
                    .on("zoomend", null )
                  );
              }
              scope.standardizeData = function(){
                var model = scope.model.getCellModel(), mdata = model.data, numLines = mdata.length;
                scope.data = _.without(mdata);
                for(var i=0; i<numLines; i++){
                  var data = scope.data[i];
                  if (data.interpolation==null) data.interpolation = "linear";
                  if (data.type==null) data.type = "line";
                  if (data.type=="line") {
                    if (data.style==null) data.style = "solid";
                  }
                  data.shown = true;
                  var numPoints = data.points.length;
                  for(var j=0; j<numPoints; j++){
                    data.points[j].uniqid = i+"_"+j;
                    var txt = "", prs = _.pairs(_.omit(data.points[j], "value"));
                    for (var k=0; k<prs.length; k++) {
                      var val = prs[k][1];
                      if (prs[k][0]==="x")  val = new Date(val).toLocaleString();
                      txt += "<div>" + prs[k][0] + ": "+ val + "</div>";
                    }
                    data.points[j].value = txt;
                    
                    if (data.type==="river" && data.points[j].y2==null && data.height!=null) {
                      data.points[j].y2 = data.points[j].y+data.height;
                    }
                    if (data.type==="stem" && data.points[j].y2==null && data.height!=null) {
                      data.points[j].y2 = data.points[j].y+data.height;
                    }
                  }
                }
              }
              scope.mouseleaveClear = function(){
                scope.svg.selectAll(".lineplot-cursor").remove();
                scope.jqcontainer.find(".lineplot-cursorlabel").remove();
              }
              scope.calcMapping = function(emitFocusUpdate){ // called every time after the focus is changed
                var focus = scope.focus, range = scope.range;
                var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
                var W = scope.jqsvg.width(), H = scope.jqsvg.height();
                // TODO make clear the logic of focus update
                if (emitFocusUpdate==true && scope.model.updateFocus!=null) {
                  scope.model.updateFocus({"xl": focus.xl, "xr": focus.xr});
                }
                
                scope.data2scrX = d3.scale.linear().domain([focus.xl, focus.xr]).range([lMargin,W]);
                scope.data2scrY = d3.scale.linear().domain([focus.yl, focus.yr]).range([H-bMargin,0]);
                scope.data2scrXp = d3.scale.linear().domain([focus.xl, focus.xr]).range([0,1]);
                scope.data2scrYp = d3.scale.linear().domain([focus.yl, focus.yr]).range([1,0]);
                
                scope.scr2dataX = d3.scale.linear().domain([lMargin,W]).range([focus.xl, focus.xr]);
                scope.scr2dataY = d3.scale.linear().domain([0,H-bMargin]).range([focus.yr, focus.yl]);
                scope.scr2dataXp = d3.scale.linear().domain([lMargin,W]).range([0,1]);
                scope.scr2dataYp = d3.scale.linear().domain([0,H-bMargin]).range([1,0]);
              }
              scope.init = function(){
                scope.resetSvg();
                scope.zoomObj = d3.behavior.zoom();   // set zoom object
                scope.container
                  .on("mousedown", function(){ return scope.mouseDown(); } )
                  .on("mouseup", function(){ return scope.mouseUp(); } );
                scope.jqsvg
                  .mousemove( function(e){ return scope.renderCursor(e); })
                  .mouseleave( function(e){ return scope.mouseleaveClear() });
                
                scope.enableZoom();
                scope.standardizeData();
                scope.initRange();
                scope.calcMapping();
                scope.update();
              }
              
              scope.update = function(first){
                scope.resetSvg();
                scope.filterData();
                scope.calcCoords();
                scope.renderCoords();
                scope.renderLines();
                scope.renderLineDots();
                scope.renderLabels();
                lineplotUtils.plotCoords(scope);
                lineplotUtils.plotRivers(scope);
                lineplotUtils.plotBars(scope);
                lineplotUtils.plotStems(scope);
                lineplotUtils.plotLines(scope);
                lineplotUtils.plotCircles(scope);
                lineplotUtils.plotPointCircles(scope);
                lineplotUtils.plotPointRects(scope);
                scope.renderTips();
                lineplotUtils.plotRects(scope);
                scope.renderLocateBox();  // redraw
                scope.renderLegends();    // redraw
                scope.renderCoverBox();   // redraw
                lineplotUtils.plotTexts(scope); // redraw
                
                scope.prepareInteraction();
              }
              
              scope.init(); // initialize
            }
          };
        }]);
  
})();

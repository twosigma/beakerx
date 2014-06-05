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
                      "<div id='lineplotContainer' class='renderdiv' oncontextmenu='return false;'>"+
                      "<svg></svg>"+
                      "</div>",
            controller: function($scope) {
              var model = $scope.model.getCellModel();
              $scope.range = null;
              $scope.layout = { bottomTextHeight: 30, leftTextWidth: 80, legendMargin: 10, legendBoxSize: 10 };
              $scope.fonts = { labelWidth: 6, labelHeight: 12, tooltipWidth: 10 };
              $scope.numIntervals = { x: 12, y: 8 };
              $scope.labelPadding = { x: -10, y: 10 };
              $scope.locateBox = null;
              $scope.tips = {};
            },
            link: function(scope, element, attrs) {
              // rendering code
              element.find("#lineplotContainer").resizable({
                maxWidth: element.width(),   // no wider than the width of the cell
                handles: "e, s, se",
                resize: function(event, ui){
                    scope.width = ui.size.width; scope.height = ui.size.height;
                    scope.update();
                  }
              });
              var model = scope.model.getCellModel();
              element.find("#plotitle").text(model.plotTitle);
              element.find(".ui-icon-gripsmall-diagonal-se").removeClass("ui-icon ui-icon-gripsmall-diagonal-se"); // remove the ugly handle :D
              scope.container = d3.select(element[0]).select("#lineplotContainer"); // hook container to use jquery interaction
              scope.jqcontainer = element.find("#lineplotContainer");
              
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
                  }
                }
                scope.range = {"xl": xl, "xr": xr, "yl": yl, "yr": yr, "xspan": xr-xl, "yspan": yr-yl};
                scope.focus = {};
                _.extend(scope.focus, scope.range); // by default focus = range
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
                    
                //console.log(xbase, ybase, xspan/xintv, yspan/yintv);

                //console.log(xs,xt,ys,yt);
                scope.xCoords = [];
                scope.yCoords = [];
                for(var i=xs; i<=xt; i+=xintv) {
                  scope.xCoords.push(i);
                }
                for(var i=ys; i<=yt; i+=yintv) {
                  scope.yCoords.push(i.toFixed(deci));
                }
                scope.xintv = xintv;
                scope.yintv = yintv;
              }
              
              scope.filterData = function(){
                var focus = scope.focus, data = scope.data, numLines = data.length;
                scope.fdata = [];
                var fdata = scope.fdata;
                for(var i=0; i<numLines; i++){
                  var points = data[i].points;
                  var l = lineplotUtils.upper_bound(points, "x", focus.xl);
                  var r = lineplotUtils.upper_bound(points, "x", focus.xr)+1; // truncate out-of-sight segment on x-axis
                  l = Math.max(l, 0);
                  r = Math.min(r, points.length-1);
                  fdata[i] = {"leftIndex":l, "rightIndex":r};
                }
              }
              scope.renderLines = function(){
                var data = scope.data, fdata = scope.fdata, numLines = data.length, focus = scope.focus;
                for(var i=0; i<numLines; i++){
                  var points = data[i].points;
                  var prevDrawn;
                  for(var j=fdata[i].leftIndex; j<fdata[i].rightIndex; j++){
                    var p1 = _.omit(points[j]), p2 = _.omit(points[j+1]);
                    if (data[i].interpolation==="none") {
                      p2.y = p1.y;
                    }
                    var line = lineplotUtils.data2scrLine(scope, p1, p2);
                    if (line==null) {
                      prevDrawn = 0; continue;
                    }
                    var y1 = line.p1.y, y2 = line.p2.y;
                    if (Math.min(y1,y2)>=scope.jqsvg.height()-scope.layout.bottomTextHeight-1E-6) {
                      prevDrawn = 0; continue;
                    }
                    var seg = lineplotUtils.generateLine(line, points[j], data[i]);
                    scope.rpipeLines.push(seg);
                    
                    if (data[i].interpolation==="none" && prevDrawn==0 && j>0) {
                      var p3 = _.omit(points[j-1]);
                      p3.x = p1.x;
                      var line = lineplotUtils.data2scrLine(scope, p3, p1);
                      var seg = lineplotUtils.generateLine(line, points[j-1], data[i]);
                      scope.rpipeLines.push(seg);
                    }
                    if (data[i].interpolation==="none") {
                      var p3 = _.omit(points[j+1]);
                      var line = lineplotUtils.data2scrLine(scope, p2, p3);
                      var seg = lineplotUtils.generateLine(line, points[j], data[i]);
                      scope.rpipeLines.push(seg);
                    }
                    prevDrawn = 1;
                  }
                }
              }
              scope.renderPoints = function(){
                var data = scope.data, fdata = scope.fdata, numLines = data.length, focus = scope.focus;
                for (var i=0; i<numLines; i++) {
                  var points = data[i].points;
                  for(var j=fdata[i].leftIndex; j<fdata[i].rightIndex; j++){
                    var p = lineplotUtils.data2scrPoint(scope, points[j]);
                    if (p==null) continue;
                    var id = "dot_"+points[j].uniqid;
                    var value = points[j];
                    var txt = "";
                    var prs = _.pairs(value);
                    for (var k=0; k<prs.length; k++) {
                      var val = prs[k][1];
                      if (prs[k][0]==="x")  val = new Date(val).toLocaleString();
                      txt += "<div>" + prs[k][0] + ": "+ val + "</div>";
                    }
                    scope.rpipeCircles.push({
                      "id": id, "class": "lineplot-dot",
                      "cx": p.x, "cy": p.y, "r": 4, "opacity": scope.tips[id]==null?0:1,
                      "point": _.omit(points[j], "uniqid"),
                      "stroke": data[i].color,
                      "value": txt
                    });
                  }
                }
              }
              scope.prepareInteraction = function(){
                scope.svg.selectAll(".lineplot-dot")
                  .on("mouseenter", function(d){ return scope.tooltip(d); })
                  .on("mouseleave", function(d){ return scope.untooltip(d); })
                  .on("click", function(d){ return scope.toggleTooltip(d); });
              }
              scope.toggleTooltip = function(d){
                var id = d.id, nv = scope.tips[id]==null?1:0;
                scope.svg.selectAll("#"+id)
                  .attr("visibility", nv);
                if (nv==1) {
                  scope.tips[id] = d;
                  scope.svg.selectAll("#"+id)
                    .attr("opacity", 1);
                }else{
                  delete scope.tips[id];
                  scope.svg.selectAll("#"+id)
                    .attr("opacity", 0);
                  scope.jqcontainer.find("#tip_"+id).remove();
                  scope.jqcontainer.find("#tip_mouse").remove();
                }
              }
              scope.tooltip = function(d){
                scope.svg.selectAll("#"+d.id)
                  .attr("opacity", 1);
                $("<div></div>").appendTo(scope.jqcontainer)
                  .attr("id", "tip_mouse")
                  .attr("class", "lineplot-tooltip")
                  .css("left", d.cx + scope.fonts.tooltipWidth+"px")
                  .css("top", d.cy+"px")
                  .css("border-color", d.stroke)
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
                  var p = lineplotUtils.data2scrPoint(scope, d.point);
                  if (p==null) return;
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
                      .css("border-color", d.stroke)
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
                        var p = lineplotUtils.scr2dataPoint(scope, {"x":tip.cx, "y":tip.cy } );
                        tip.point.x = p.x;
                        tip.point.y = p.y;
                      }
                      
                    });
                  }else{
                    tipdiv
                      .css("left", d.cx+"px")
                      .css("top", d.cy+"px");
                  }
                    /*
                  }
                  scope.svg.selectAll("#tip_"+d.id).data([d]).enter().append("text")
                    .attr("id", "tip_"+d.id)
                    .attr("class", "lineplot-tooltip")
                    .attr("x", p.x + scope.fonts.tooltipWidth)
                    .attr("y", p.y)
                    .text(d.value);
                    */
                })
              }
              scope.renderCoords = function(){
                for(var i=0; i<scope.xCoords.length; i++){
                  var x = scope.xCoords[i];
                  var line = lineplotUtils.data2scrLine(scope, {"x":x, "y":scope.focus.yl}, {"x":x, "y":scope.focus.yr});
                  scope.rpipeLines.push({
                    "id": "coord_x_"+i, "class": "lineplot-coord",
                    "x1": line.p1.x, "y1": line.p1.y, "x2": line.p2.x, "y2": line.p2.y
                  })
                }
                for(var i=0; i<scope.yCoords.length; i++){
                  var y = scope.yCoords[i];
                  var line = lineplotUtils.data2scrLine(scope, {"x":scope.focus.xl, "y":y}, {"x":scope.focus.xr, "y":y});
                  scope.rpipeLines.push({
                    "id": "coord_y_"+i, "class": "lineplot-coord",
                    "x1": line.p1.x, "y1": line.p1.y, "x2": line.p2.x, "y2": line.p2.y
                  })
                }
                var line = lineplotUtils.data2scrLine(scope, {"x":scope.focus.xl, "y":scope.focus.yl}, {"x":scope.focus.xr, "y":scope.focus.yl});
                scope.rpipeLines.push({
                    "id": "coord_x_base", "class": "lineplot-coord-base",
                    "x1": line.p1.x, "y1": line.p1.y, "x2": line.p2.x, "y2": line.p2.y
                  })
                var line = lineplotUtils.data2scrLine(scope, {"x":scope.focus.xl, "y":scope.focus.yl}, {"x":scope.focus.xl, "y":scope.focus.yr});
                scope.rpipeLines.push({
                    "id": "coord_y_base", "class": "lineplot-coord-base",
                    "x1": line.p1.x, "y1": line.p1.y, "x2": line.p2.x, "y2": line.p2.y
                  })
              }
              
              scope.renderLabels = function(){
                for(var i=0; i<scope.xCoords.length; i++){
                  var x = scope.xCoords[i];
                  var p = lineplotUtils.data2scrLabel(scope, {"x":x, "y":scope.focus.yl}, {x:0, y:scope.labelPadding.y});
                  scope.rpipeTexts.push({
                    "id": "label_x_"+i, "class": "lineplot-label",
                    "text": lineplotUtils.formatDate(scope.xintv, x),
                    "x": p.x, "y": p.y, "text-anchor": "middle", "dominant-baseline": "hanging"
                  });
                }
                for(var i=0; i<scope.yCoords.length; i++){
                  var y = scope.yCoords[i];
                  var p = lineplotUtils.data2scrLabel(scope, {"x":scope.focus.xl, "y":y}, {x:scope.labelPadding.x, y:0});
                   scope.rpipeTexts.push({
                    "id": "label_y_"+i, "class": "lineplot-label",
                    "text": y,
                    "x": p.x, "y": p.y, "text-anchor": "end", "dominant-baseline": "center"
                  });
                }
              }
              scope.renderLegends = function(){
                var data = scope.data, numLines = data.length;
                var margin = scope.layout.legendMargin;
                var legendLen = 0;
                for (var i=0; i<numLines; i++) legendLen = Math.max(legendLen, data[i].legend.length);
                var boxsz = scope.layout.legendBoxSize;
                scope.rpipeRects.push({
                  "id": "legendcontainer", "class": "lineplot-legendcontainer",
                  "x": scope.jqsvg.width()-legendLen*scope.fonts.labelWidth - margin*2 - boxsz*1.5,
                  "y": 0,
                  "width": legendLen*scope.fonts.labelWidth + margin*2 + boxsz*1.5,
                  "height": scope.fonts.labelHeight*1.2*numLines + margin*2 
                })
                for (var i=0; i<numLines; i++) {
                  scope.rpipeTexts.push({
                    "id": "legend_"+i, "class": "lineplot-label",
                    "text": data[i].legend,
                    "x": scope.jqsvg.width()-legendLen*scope.fonts.labelWidth-margin, "y": margin+scope.fonts.labelHeight*1.2*i,
                    "dominant-baseline": "hanging"
                  });
                  scope.rpipeRects.push({
                    "id": "legendbox_"+i, "class": "lineplot-legendbox",
                    "x": scope.jqsvg.width()-legendLen*scope.fonts.labelWidth-margin-boxsz*1.5, "y": margin+scope.fonts.labelHeight*1.2*i,
                    "width": boxsz, "height": boxsz, "fill": data[i].color
                  });
                }
              }
              
             
              
              scope.renderLocateBox = function(){
                scope.svg.selectAll("#locatebox").remove();
                if (scope.locateBox!=null) {
                  var box = scope.locateBox;
                  
                  /*
                  // cannot use rpipeRects because batch rendering only accepts enter() situation
                  scope.rpipeRects.push({
                    "id": "locatebox", "class": "lineplot-locatebox",
                    "x": box.x, "y": box.y, "width": box.w, "height": box.h
                  })
                  */
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
              }
              scope.zooming = function(d){
                if (scope.interactMode==="other") {
                  return;
                }
                if (scope.interactMode==="zoom") {
                  // left click zoom
                  var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
                  var W = scope.jqsvg.width(), H = scope.jqsvg.height();
                  var d3trans = d3.event.translate, d3scale = d3.event.scale;
                  var dx = d3trans[0]-scope.lastx, dy = d3trans[1]-scope.lasty, ds = d3scale/this.lastscale;
                  scope.lastx = d3trans[0]; scope.lasty = d3trans[1]; scope.lastscale = d3scale;
                  
                  var focus = scope.focus;
                  //console.log(dx, dy, ds);
                  if (ds==1.0) {  // translate only
                    var tx = -dx/W*focus.xspan, ty = dy/H*focus.yspan;
                    focus.xl += tx;
                    focus.xr += tx;
                    focus.yl += ty;
                    focus.yr += ty;
                    scope.jqsvg.css("cursor", "move");
                  }else{  // scale only
                    // scale x only
                    var mx = d3.mouse(scope.svg[0][0])[0], my = d3.mouse(scope.svg[0][0])[1];
                    if (my <= scope.jqsvg.height()-scope.layout.bottomTextHeight) {
                      // scale x
                      var ym = focus.yl + lineplotUtils.scr2dataPercent(scope, {"x":0, "y":my}).y*focus.yspan;
                      focus.yl = ym - ds*(ym-focus.yl);
                      focus.yr = ym + ds*(focus.yr-ym);
                      focus.yspan = focus.yr-focus.yl;
                    }
                    if (mx >= scope.layout.leftTextWidth) {
                      // scale y
                      var xm = focus.xl + lineplotUtils.scr2dataPercent(scope, {"x":mx, "y":0}).x*focus.xspan;
                      focus.xl = xm - ds*(xm-focus.xl);
                      focus.xr = xm + ds*(focus.xr-xm);
                      focus.xspan = focus.xr-focus.xl;
                    }
                  }
                  scope.update();
                }else if (scope.interactMode==="locate") {
                  // right click zoom
                  scope.mousep2 = {"x": d3.mouse(scope.svg[0][0])[0], "y": d3.mouse(scope.svg[0][0])[1]};
                  scope.calcLocateBox();
                  scope.rpipeRects = [];
                  scope.renderLocateBox();
                  lineplotUtils.plotRects(scope);
                }
              }
              scope.zoomEnd = function(d){
                scope.zoomObj.scale(1.0);
                scope.zoomObj.translate([0,0]);
                if (scope.interactMode==="locate") {
                  scope.updateFocus();
                  scope.locateBox = null;
                  scope.update();
                  scope.interactMode = "zoom";
                }
                scope.jqsvg.css("cursor", "auto");
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
                scope.update();
              }
              scope.updateFocus = function(){
                var box = scope.locateBox;
                if (box==null) return;
                var p1 = lineplotUtils.scr2dataPercent(scope, {"x": box.x, "y": box.y});
                var p2 = lineplotUtils.scr2dataPercent(scope, {"x": box.x+box.w, "y": box.y+box.h});
                //console.log(p1, p2);
                p1.x = lineplotUtils.fixPercent(p1.x);
                p1.y = lineplotUtils.fixPercent(p1.y);
                p2.x = lineplotUtils.fixPercent(p2.x);
                p2.y = lineplotUtils.fixPercent(p2.y);
                
                var focus = scope.focus, ofocus = {};
                _.extend(ofocus, scope.focus);
                focus.xl = ofocus.xl + ofocus.xspan * p1.x;
                focus.xr = ofocus.xl + ofocus.xspan * p2.x;
                focus.yr = ofocus.yl + ofocus.yspan * (1.0-p1.y);
                focus.yl = ofocus.yl + ofocus.yspan * (1.0-p2.y); // y should be reversed
                focus.xspan = focus.xr - focus.xl;
                focus.yspan = focus.yr - focus.yl;
                //console.log(focus);
              }
              scope.resetSvg = function(){
                var svg = d3.select(element[0]).select("#lineplotContainer svg");
                svg.selectAll("rect").remove();
                svg.selectAll("line").remove();
                svg.selectAll("text").remove();
                svg.selectAll("circle").remove();
                scope.svg = svg;
                //scope.svg = d3.select(element[0]).select("#lineplotContainer").append("svg");
                scope.jqsvg = element.find("svg");
                
                scope.rpipeLines = [];
                scope.rpipeTexts = [];
                scope.rpipeRects = [];
                scope.rpipeCircles = [];
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
                  if (data.style==null) data.style = "solid";
                  var numPoints = data.points.length;
                  for(var j=0; j<numPoints; j++){
                    _.extend(data.points[j], {"uniqid": i+"_"+j});
                  }
                }
              }
              scope.init = function(){
                scope.resetSvg();
                scope.zoomObj = d3.behavior.zoom();   // set zoom object
                scope.container
                  .on("mousedown", function(){ return scope.mouseDown(); } )
                  .on("mouseup", function(){ return scope.mouseUp(); } )
                
                scope.enableZoom();
                scope.standardizeData();
                scope.initRange();
                scope.update();
              }
              
              scope.update = function(){
                scope.resetSvg();
                scope.filterData();
                scope.calcCoords();
                scope.renderCoords();
                scope.renderLines();
                scope.renderPoints();
                scope.renderLabels();
                scope.renderLocateBox();
                scope.renderLegends();
                lineplotUtils.plotLines(scope);
                lineplotUtils.plotCircles(scope);
                scope.renderTips();
                lineplotUtils.plotRects(scope);
                lineplotUtils.plotTexts(scope);
               
                scope.prepareInteraction();
              }
              
              scope.init(); // initialize
            }
          };
        }]);
  
})();

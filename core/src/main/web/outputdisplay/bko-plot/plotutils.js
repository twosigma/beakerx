
(function() {
    'use strict';
    var retfunc = function(bkUtils) {
    return {
      months: ["Jan", "Feb", "Mar", "Apr", "May", "June",
          "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      updateDataRangeVal : function(range, dim, val) {
        var dl = dim + "l", dr = dim + "r";
        range[dl] = Math.min(range[dl], val);
        range[dr] = Math.max(range[dr], val);
      },
      updateDataRange : function(range, ele) {
        if (ele.x != null) { this.updateDataRangeVal(range, "x", ele.x); }
        if (ele.y != null) { this.updateDataRangeVal(range, "y", ele.y); }
        if (ele.x2 != null) { this.updateDataRangeVal(range, "x", ele.x2); }
        if (ele.y2 != null) { this.updateDataRangeVal(range, "y", ele.y2); }
      },
      getDataRange : function(data) { // data range is in [0,1] x [0,1]
        var datarange = {
          xl: 1E100,
          yl: 1E100,
          xr: -1E100,
          yr: -1E100
        };
        var visibleData = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].shown === false) { continue; }
          visibleData++;
          var eles = data[i].elements;
          for (var j = 0; j < eles.length; j++) {
            this.updateDataRange(datarange, eles[j]);
          }
        }
        if (visibleData === 0) {
          datarange.xl = datarange.yl = 0;
          datarange.xr = datarange.yr = 1;
        }
        datarange.xspan = datarange.xr - datarange.xl;
        datarange.yspan = datarange.yr - datarange.yl;
        return {
          "datarange" : datarange,
          "visibleData": visibleData
        };
      },
      getInitFocus : function(model) {
        var ret = this.getDataRange(model.data);
        var range = ret.datarange, margin = model.margin;
        var focus = {
          xl : model.focus.xl,
          xr : model.focus.xr,
          yl : model.focus.yl,
          yr : model.focus.yr
        };
        if (focus.xl == null) {
          focus.xl = range.xl - range.xspan * margin.left;
        }
        if (focus.xr == null) {
          focus.xr = range.xr + range.xspan * margin.right;
        }
        if (focus.yl == null) {
          focus.yl = range.yl - range.yspan * margin.bottom;
        }
        if (focus.yr == null) {
          focus.yr = range.yr + range.yspan * margin.top;
        }
        focus.xspan = focus.xr - focus.xl;
        focus.yspan = focus.yr - focus.yl;
        return {
          "initFocus" : focus,
          "visibleData" : ret.visibleData
        };
      },
      outsideScr: function(scope, x, y) {
        var W = scope.jqsvg.width(), H = scope.jqsvg.height();
        return x < 0 || x > W || y < 0 || y > H;
      },
      outsideScrBox: function(scope, x, y, w, h) {
        var W = scope.jqsvg.width(), H = scope.jqsvg.height();
        return x > W || x + w < 0 || y > H || y + h < 0;
      },
      plotStems: function(scope) {
        var pipe = scope.rpipeStems;
        scope.stemg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        scope.stemg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; })
          .style("stroke-dasharray", function(d) { return d.stroke_dasharray; })
          .style("stroke-width", function(d) { return d.stroke_width; });
        for (var i = 0; i < pipe.length; i++) {
            scope.stemg.select("#" + pipe[i].id).selectAll("line")
              .data(pipe[i].elements, function(d) { return d.id; }).exit().remove();
            scope.stemg.select("#" + pipe[i].id).selectAll("line")
              .data(pipe[i].elements, function(d) { return d.id; }).enter().append("line")
              .attr("id", function(d) { return d.id; })
              .attr("class", function(d) { return d.class; })
              .style("stroke", function(d) { return d.stroke; })
              .style("stroke-opacity", function(d) { return d.stroke_opacity; })
              .style("stroke-dasharray", function(d) { return d.stroke_dasharray; })
              .style("stroke-width", function(d) { return d.stroke_width; });
            scope.stemg.select("#" + pipe[i].id).selectAll("line")
              .data(pipe[i].elements, function(d) { return d.id; })
              .attr("x1", function(d) { return d.x1; })
              .attr("x2", function(d) { return d.x2; })
              .attr("y1", function(d) { return d.y1; })
              .attr("y2", function(d) { return d.y2; });
        }
      },
      plotLines: function(scope) {
        var pipe = scope.rpipeLines;
        scope.lineg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        scope.lineg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-dasharray", function(d) { return d.stroke_dasharray; })
          .style("stroke-width", function(d) { return d.stroke_width; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; });
        for (var i = 0; i < pipe.length; i++) {
            scope.lineg.select("#" + pipe[i].id).selectAll("path")
              .data([{}]).enter().append("path");
            scope.lineg.select("#" + pipe[i].id + " path")
              .attr("d", pipe[i].d);
        }
      },
      plotSegs: function(scope) {
        var pipe = scope.rpipeSegs;
        scope.segg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        scope.segg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-dasharray", function(d) { return d.stroke_dasharray; })
          .style("stroke-width", function(d) { return d.stroke_width; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; });
        for (var i = 0; i < pipe.length; i++) {
          scope.segg.select("#" + pipe[i].id).selectAll("line")
            .data(pipe[i].elements, function(d) { return d.id; }).exit().remove();
          scope.segg.select("#" + pipe[i].id).selectAll("line")
            .data(pipe[i].elements, function(d) { return d.id; }).enter().append("line")
            .attr("id", function(d) { return d.id; })
            .attr("class", function(d) { return d.class; })
            .attr("x1", function(d) { return d.x1; })
            .attr("x2", function(d) { return d.x2; })
            .attr("y1", function(d) { return d.y1; })
            .attr("y2", function(d) { return d.y2; })
            .style("stroke", function(d) { return d.stroke; })
            .style("stroke-opacity", function(d) { return d.stroke_opacity; })
            .style("stroke-dasharray", function(d) { return d.stroke_dasharray; })
            .style("stroke-width", function(d) { return d.stroke_width; });
          scope.segg.select("#" + pipe[i].id).selectAll("line")
            .data(pipe[i].elements, function(d) { return d.id; })
            .attr("x1", function(d) { return d.x1; })
            .attr("x2", function(d) { return d.x2; })
            .attr("y1", function(d) { return d.y1; })
            .attr("y2", function(d) { return d.y2; });
        }
      },
      plotRects: function(scope) {
        var pipe = scope.rpipeRects;
        scope.rectg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        scope.rectg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; });
        for (var i = 0; i < pipe.length; i++) {
            scope.rectg.select("#" + pipe[i].id).selectAll("rect")
              .data(pipe[i].elements, function(d) { return d.id; }).exit().remove();
            scope.rectg.select("#" + pipe[i].id).selectAll("rect")
              .data(pipe[i].elements, function(d) { return d.id; }).enter().append("rect")
              .attr("id", function(d) { return d.id; })
              .attr("class", function(d) { return d.class; })
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; })
              .attr("width", function(d) { return d.width; })
              .attr("height", function(d) { return d.height; })
              .style("fill", function(d) { return d.fill; })
              .style("fill-opacity", function(d) { return d.fill_opacity; })
              .style("stroke", function(d) { return d.stroke; })
              .style("stroke-opacity", function(d) { return d.stroke_opacity; });
            scope.rectg.select("#" + pipe[i].id).selectAll("rect")
              .data(pipe[i].elements, function(d) { return d.id; })
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; })
              .attr("width", function(d) { return d.width; })
              .attr("height", function(d) { return d.height; });
        }
      },
      plotDots: function(scope) {
        var pipe = scope.rpipeDots;
        scope.dotg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        scope.dotg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("stroke", function(d) { return d.stroke; })
          //.style("opacity", function(d) { return d.opacity; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; });
        for (var i = 0; i < pipe.length; i++) {
            scope.dotg.select("#" + pipe[i].id).selectAll("circle")
              .data(pipe[i].elements, function(d) { return d.id; }).exit().remove();
            scope.dotg.select("#" + pipe[i].id).selectAll("circle")
              .data(pipe[i].elements, function(d) { return d.id; }).enter().append("circle")
              .attr("id", function(d) { return d.id; })
              .attr("class", function(d) { return d.class; })
              .attr("cx", function(d) { return d.cx; })
              .attr("cy", function(d) { return d.cy; })
              .attr("r", function(d) { return d.r; })
              //.attr("opacity", function(d) { return d.opacity; })
              .style("fill", function(d) { return d.fill; })
              .style("fill-opacity", function(d) { return d.fill_opacity; })
              .style("stroke", function(d) { return d.stroke; })
              .style("stroke-opacity", function(d) { return d.stroke_opacity; });
            scope.dotg.select("#" + pipe[i].id).selectAll("circle")
              .data(pipe[i].elements, function(d) { return d.id; })
              .attr("cx", function(d) { return d.cx; })
              .attr("cy", function(d) { return d.cy; })
              .attr("opacity", function(d) { return d.opacity; });
        }
      },
      plotPointCircles: function(scope) {
        var pipe = scope.rpipePointCircles;
        var svg = scope.pointcircleg;
        svg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        svg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; })
          .style("stroke-width", function(d) { return d.stroke_width; });
        for (var i = 0; i < pipe.length; i++) {
            svg.select("#" + pipe[i].id).selectAll("circle")
              .data(pipe[i].elements, function(d) { return d.id; }).exit().remove();
            svg.select("#" + pipe[i].id).selectAll("circle")
              .data(pipe[i].elements, function(d) { return d.id; }).enter().append("circle")
              .attr("id", function(d) { return d.id; })
              .attr("class", function(d) { return d.class; })
              .attr("cx", function(d) { return d.cx; })
              .attr("cy", function(d) { return d.cy; })
              .attr("r", function(d) { return d.r; })
              .style("fill", function(d) { return d.fill; })
              .style("fill-opacity", function(d) { return d.fill_opacity; })
              .style("stroke", function(d) { return d.stroke; })
              .style("stroke-opacity", function(d) { return d.stroke_opacity; })
              .style("stroke-width", function(d) { return d.stroke_width; });
            svg.select("#" + pipe[i].id).selectAll("circle")
              .data(pipe[i].elements, function(d) { return d.id; })
              .attr("cx", function(d) { return d.cx; })
              .attr("cy", function(d) { return d.cy; });
        }
      },
      plotPointDiamonds: function(scope) {
        var pipe = scope.rpipePointDiamonds;
        var svg = scope.pointdiamondg;
        svg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        svg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; })
          .style("stroke-width", function(d) { return d.stroke_width; });
        for (var i = 0; i < pipe.length; i++) {
            svg.select("#" + pipe[i].id).selectAll("polygon")
              .data(pipe[i].elements, function(d) { return d.id; }).exit().remove();
            svg.select("#" + pipe[i].id).selectAll("polygon")
              .data(pipe[i].elements, function(d) { return d.id; }).enter().append("polygon")
              .attr("id", function(d) { return d.id; })
              .attr("class", function(d) { return d.class; })
              .style("fill", function(d) { return d.fill; })
              .style("fill-opacity", function(d) { return d.fill_opacity; })
              .style("stroke", function(d) { return d.stroke; })
              .style("stroke-opacity", function(d) { return d.stroke_opacity; })
              .style("stroke-width", function(d) { return d.stroke_width; })
              .attr("points", function(d) { return d.points; });
            svg.select("#" + pipe[i].id).selectAll("polygon")
              .data(pipe[i].elements, function(d) { return d.id; })
              .attr("points", function(d) { return d.points; });
        }
      },
      plotPointRects: function(scope) {
        var pipe = scope.rpipePointRects;
        var svg = scope.pointrectg;
        svg.selectAll("g").data(pipe, function(d) { return d.id; }).exit().remove();
        svg.selectAll("g").data(pipe, function(d) { return d.id; }).enter().append("g")
            .attr("id", function(d) { return d.id; })
            .attr("class", function(d) { return d.class; })
            .style("fill", function(d) { return d.fill; })
            .style("fill-opacity", function(d) { return d.fill_opacity; })
            .style("stroke", function(d) { return d.stroke; })
            .style("stroke-opacity", function(d) { return d.stroke_opacity; })
            .style("stroke-width", function(d) { return d.stroke_width; });
        for (var i = 0; i < pipe.length; i++) {
            svg.select("#" + pipe[i].id).selectAll("rect")
              .data(pipe[i].elements, function(d) { return d.id; }).exit().remove();
            svg.select("#" + pipe[i].id).selectAll("rect")
              .data(pipe[i].elements, function(d) { return d.id; }).enter().append("rect")
              .attr("id", function(d) { return d.id; })
              .attr("class", function(d) { return d.class; })
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; })
              .attr("width", function(d) { return d.width; })
              .attr("height", function(d) { return d.height; })
              .style("fill", function(d) { return d.fill; })
              .style("fill-opacity", function(d) { return d.fill_opacity; })
              .style("stroke", function(d) { return d.stroke; })
              .style("stroke-opacity", function(d) { return d.stroke_opacity; })
              .style("stroke-width", function(d) { return d.stroke_width; });
            svg.select("#" + pipe[i].id).selectAll("rect")
              .data(pipe[i].elements, function(d) { return d.id; })
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; });
        }
      },
      plotBars: function(scope) {
        var pipe = scope.rpipeBars;
        scope.barg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        scope.barg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; })
          .style("stroke-width", function(d) { return d.stroke_width; });
        for (var i = 0; i < pipe.length; i++) {
            scope.barg.select("#" + pipe[i].id).selectAll("rect")
              .data(pipe[i].elements, function(d) { return d.id; }).exit().remove();
            scope.barg.select("#" + pipe[i].id).selectAll("rect")
              .data(pipe[i].elements, function(d) { return d.id; }).enter().append("rect")
              .attr("id", function(d) { return d.id; })
              .attr("class", function(d) { return d.class; })
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; })
              .attr("width", function(d) { return d.width; })
              .attr("height", function(d) { return d.height; })
              .style("fill", function(d) { return d.fill; })
              .style("fill-opacity", function(d) { return d.fill_opacity; })
              .style("stroke", function(d) { return d.stroke; })
              .style("stroke-opacity", function(d) { return d.stroke_opacity; })
              .style("stroke-width", function(d) { return d.stroke_width; });
            scope.barg.select("#" + pipe[i].id).selectAll("rect")
              .data(pipe[i].elements, function(d) { return d.id; })
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; })
              .attr("width", function(d) { return d.width; })
              .attr("height", function(d) { return d.height; });
        }
      },
      plotUserTexts: function(scope) {
        var pipe = scope.rpipeUserTexts;
        scope.textg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        scope.textg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .attr("transform", function(d) { return d.transform; });
        for (var i = 0; i < pipe.length; i++) {
          scope.textg.select("#" + pipe[i].id).selectAll("text")
            .data(pipe[i].elements, function(d) { return d.id; }).exit().remove();
          scope.textg.select("#" + pipe[i].id).selectAll("text")
            .data(pipe[i].elements, function(d) { return d.id; }).enter().append("text")
            .attr("id", function(d) { return d.id; })
            .attr("class", function(d) { return d.class; })
            .style("fill", function(d) { return d.fill; })
            .style("fill-opacity", function(d) { return d.fill_opacity; })
            .attr("transform", function(d) { return d.transform; })
            .text(function(d) { return d.text; });
          scope.textg.select("#" + pipe[i].id).selectAll("text")
            .data(pipe[i].elements, function(d) { return d.id; })
            .attr("transform", function(d) { return d.transform; });
        }
      },
      plotRivers: function(scope) {
        var pipe = scope.rpipeRivers;
        scope.riverg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        scope.riverg.selectAll("g")
          .data(pipe, function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; })
          .style("stroke-width", function(d) { return d.stroke_width; });
        for (var i = 0; i < pipe.length; i++) {
            scope.riverg.select("#" + pipe[i].id).selectAll("polygon")
              .data([{}]).enter().append("polygon");
            scope.riverg.select("#" + pipe[i].id+" polygon")
              .attr("points", pipe[i].elements);
        }
      },

      plotCoords: function(scope) {
        var sel = scope.coordg.selectAll("line");
        sel.data(scope.rpipeCoords, function(d) { return d.id; }).exit().remove();
        sel.data(scope.rpipeCoords, function(d) { return d.id; }).enter().append("line")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-dasharray", function(d) { return d.stroke_dasharray; });
        sel.data(scope.rpipeCoords, function(d) { return d.id; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; });
      },

      plotLabels: function(scope) {   // redraw
        var pipe = scope.rpipeTexts;
        scope.labelg.selectAll("text").remove();
        scope.labelg.selectAll("text")
          .data(pipe, function(d) { return d.id; }).enter().append("text")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("transform", function(d) { return d.transform; })
          .attr("text-anchor", function(d) { return d["text-anchor"]; })
          .attr("dominant-baseline", function(d) { return d["dominant-baseline"]; })
          .text(function(d) { return d.text; });
      },
      replotSingleCircle: function(scope, d) {
        scope.svg.selectAll("#" + d.id).remove();
        scope.svg.selectAll("#" + d.id)
          .data([d]).enter().append("circle")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("cx", function(d) { return d.cx; })
          .attr("cy", function(d) { return d.cy; })
          .attr("r", function(d) { return d.r; })
          .style("fill", function(d) { return d.color; })
          .style("stroke", function(d) { return d.stroke; })
          .attr("opacity", function(d) { return d.opacity; });
      },
      replotSingleRect: function(svgElement, d) {
        svgElement.selectAll("#" + d.id).remove();
        svgElement.selectAll("#" + d.id)
          .data([d]).enter().append("rect")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("width", function(d) { return d.width; })
          .attr("height", function(d) { return d.height; })
          .style("fill", function(d) { return d.fill; });
      },
      formatCoord: function(type, w, x, nanoOffset) {
        if (type === "time" || type === "nanotime") {
          var months = this.months, days = this.days, d, ret = "";
          if (type === "time") { d = new Date(x); }
          else { d = new Date(parseInt(x / 1000000)); }

          if (w <= 1000 * 60 * 60)
            ret = this.padStr(d.getHours(),2) + ":" +
                this.padStr(d.getMinutes(),2) + ":" +
                this.padStr(d.getSeconds(),2); // minute:seconds
          else if (w <= 1000 * 60 * 60 * 24)
            ret = days[d.getDay()] + " " +
                this.padStr(d.getHours(),2) + ":" +
                this.padStr(d.getMinutes(),2); // day hour:minutes
          else if (w <= 1000 * 60 * 60 * 24 * 31)
            ret = months[d.getMonth()] + " " +
                d.getDate() + " " +
                days[d.getDay()]; // month date day
          else
            ret = d.getFullYear() + " " +
                months[d.getMonth()]; //year month

          if (type === "nanotime") {
            ret += "." + parseInt(x % 1000000);
          }
          return ret;
        } else {
          return parseInt(x);
        }
      },
      padStr: function(str, len) {
        str = "" + str;
        while (str.length < len) str = "0" + str;
        return str;
      },
      upper_bound: function(a, attr, val) {
        var l = 0, r = a.length - 1;
        while (l <= r) {
          var m = Math.floor((l + r) / 2);
          if (a[m][attr] >= val) r = m - 1;
          else l = m + 1;
        }
        return r;
      },
      randomColor: function() {
        var rhex6 = Math.floor(Math.random() * Math.pow(16, 6));
        var s = rhex6.toString(16);
        while (s.length < 6) s = "0" + s;
        return "#" + s;
      },
      getTipString : function(val, axis) {
        var type = axis.getType();
        if (type === "time") {
          return moment(val).tz(axis.getTimezone()).format("YYYY MMM DD ddd, HH:mm:ss .SSS");
        }
        if (typeof(val) === "number") {
          val = val.toFixed(axis.getFixed());
        }
        return "" + val;
      },
      getTipStringPercent : function(pct, axis) {
        var val = axis.getValue(pct);
        if (axis.getType() === "log") {
          val = axis.axisPow(pct);
          return val.toFixed(3);
        }
        return this.getTipString(val, axis);
      }

    };
  };
  beaker.bkoFactory('plotUtils', ["bkUtils", retfunc]);
})();

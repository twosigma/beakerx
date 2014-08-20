
(function() {
    'use strict';
    var retfunc = function(bkUtils) {
    return {
      outsideScr: function(scope, x, y) {
        var W = scope.jqsvg.width(), H = scope.jqsvg.height();
        return x < 0 || x > W || y < 0 || y > H;
      },
      outsideScrBox: function(scope, x, y, w, h) {
        var W = scope.jqsvg.width(), H = scope.jqsvg.height();
        return x > W || x + w < 0 || y > H || y + h < 0;
      },
      updateRange : function(datarange, itemrange) {
        if (itemrange.xl != null) { datarange.xl = Math.min(datarange.xl, itemrange.xl); }
        if (itemrange.xr != null) { datarange.xr = Math.max(datarange.xr, itemrange.xr); }
        if (itemrange.yl != null) { datarange.yl = Math.min(datarange.yl, itemrange.yl); }
        if (itemrange.yr != null) { datarange.yr = Math.max(datarange.yr, itemrange.yr); }
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

          var itemrange = data[i].getRange();
          this.updateRange(datarange, itemrange);
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

      plotGridlines: function(scope) {
        var sel = scope.gridg.selectAll("line");
        sel.data(scope.rpipeGridlines, function(d) { return d.id; }).exit().remove();
        sel.data(scope.rpipeGridlines, function(d) { return d.id; }).enter().append("line")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-dasharray", function(d) { return d.stroke_dasharray; });
        sel.data(scope.rpipeGridlines, function(d) { return d.id; })
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
          .style("text-anchor", function(d) { return d["text-anchor"]; })
          .style("dominant-baseline", function(d) { return d["dominant-baseline"]; })
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
          .style("opacity", function(d) { return d.opacity; });
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

      randomString: function(len) {
        var ret = "";
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++ ) {
          ret += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return ret;
      },

      createColor : function(hexstr, opacity) {
        if (hexstr == null) {
          hexstr = "#000000";
        }
        if (opacity == null) {
          opacity = 1.0;
        }
        var r = parseInt(hexstr.substr(1,2), 16),
            g = parseInt(hexstr.substr(3,2), 16),
            b = parseInt(hexstr.substr(5,2), 16);
            var str = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";;
        return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
      },

      getTipString : function(val, axis, fixed) {
        if (axis.axisType === "time") {
          return moment(val).tz(axis.axisTimezone).format("YYYY MMM DD ddd, HH:mm:ss .SSS");
        }
        if (typeof(val) === "number") {
          if (fixed === true) {
            // do nothing, keep full val
          } else if (typeof(fixed) === "number"){
            val = val.toFixed(fixed);
          } else {
            val = val.toFixed(axis.axisFixed);
          }
        }
        return "" + val;
      },

      getTipStringPercent : function(pct, axis, fixed) {
        var val = axis.getValue(pct);
        if (axis.axisType === "log") {
          val = axis.axisPow(pct);
          return this.getTipString(val, axis, fixed) + " (" + axis.getString(pct) + ")";
        }
        return this.getTipString(val, axis, fixed);
      },

      createTipString : function(obj) {
        var txt = "";
        _(obj).each(function(value, key) {
          if (key == "title") {
            txt += "<div style='font-weight:bold'>";
          } else {
            txt += "<div>";
            txt += key + ": ";
          }
          txt += value;
          txt += "</div>";
        });
        return txt;
      },

      rangeAssert : function(list) {
        _(list).each(function(e, i){
          if (abs(e) > 1E6) {
            console.error("data not shown due to too large coordinate");
            return true;
          }
        });
        return false;
      }
    };
  };
  beaker.bkoFactory('plotUtils', ["bkUtils", retfunc]);
})();

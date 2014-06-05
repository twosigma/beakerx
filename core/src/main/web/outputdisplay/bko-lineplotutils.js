

(function(){
    'use strict';
beaker.bkoFactory('lineplotUtils', ["bkUtils", function(bkUtils) {
    return {
      months: ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"],
      days: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      pointOnLine: function(a,b,c,x,y){
        var p = {};
        if (x==null) {
          p.x = (-c-b*y)/a; p.y = y;
          return p;
        }else if (y==null) {
          p.x = x; p.y = (-c-a*x)/b;
          return p;
        }
        console.error("pointOnLine called with invalid parameters");
        return null; // error
      },
      fixPercent: function(val){
        val = Math.max(val, 0);
        val = Math.min(val, 1);
        return val;
      },
      truncateLine: function(p1, p2){
        if (p1.x > p2.x) { // should not reach here for normal time series plot
          var p3 = {}; _.extend(p3, p1); p1 = p2;  p2 = p3;
        }
        var a = p2.y-p1.y, b = p1.x-p2.x, c = p2.x*p1.y-p1.x*p2.y;
        if (p1.x<0) _.extend(p1, this.pointOnLine(a,b,c,0,null));
        if (p2.x>1) _.extend(p2, this.pointOnLine(a,b,c,1,null));
        if (p1.y > p2.y) { 
          var p3 = {}; _.extend(p3, p1); p1 = p2;  p2 = p3;
        }
        if (p1.y<0) _.extend(p1, this.pointOnLine(a,b,c,null,0));
        if (p2.y>1) _.extend(p2, this.pointOnLine(a,b,c,null,1));
      },
      scr2dataPercent: function(scope, p){
        var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
        var W = scope.jqsvg.width() - lMargin, H = scope.jqsvg.height() - bMargin;
        return {"x": (p.x-lMargin)/W, "y": p.y/H};
      },
      scr2dataPoint: function(scope, p){
        var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
        var W = scope.jqsvg.width() - lMargin, H = scope.jqsvg.height() - bMargin;
        var focus = scope.focus
        var tp = this.scr2dataPercent(scope, p);
        tp.y = 1.0 - tp.y;
        return {"x": focus.xl+tp.x*focus.xspan, "y": focus.yl+tp.y*focus.yspan};
      },
      data2scrPercent: function(scope, p){
        var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
        var W = scope.jqsvg.width() - lMargin, H = scope.jqsvg.height() - bMargin;
        var xspan = scope.focus.xspan, yspan = scope.focus.yspan;
        var xl = scope.focus.xl, yl = scope.focus.yl;
        return {"x": (p.x-xl)/xspan, "y": (p.y-yl)/yspan};
      },
      data2scrPoint: function(scope, p){
        var tp = this.data2scrPercent(scope, p);
        if (tp.x<0 || tp.y<0 || tp.x>1 || tp.y>1) return null;
        var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
        var W = scope.jqsvg.width() - lMargin, H = scope.jqsvg.height() - bMargin;
        return { "x":tp.x*W+lMargin, "y":H*(1-tp.y) };
      },
      data2scrLine: function(scope, p1, p2){
        // line plot coordinates are all centered at (0,0) of the line plot (instead of the svg (0,0) )
        var tp1 = this.data2scrPercent(scope, p1),
            tp2 = this.data2scrPercent(scope, p2);
        var y1 = tp1.y, y2 = tp2.y;
        if (Math.max(y1,y2)<0-1E-6 || Math.min(y1,y2)>1+1E-6) return null;
        this.truncateLine(tp1, tp2);
        var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
        var W = scope.jqsvg.width() - lMargin, H = scope.jqsvg.height() - bMargin;
        return { p1: {"x":tp1.x*W+lMargin, "y":H*(1-tp1.y)},
                 p2: {"x":tp2.x*W+lMargin, "y":H*(1-tp2.y)} };
      },
      data2scrLabel: function(scope, p, shifts){
        var lMargin = scope.layout.leftTextWidth, bMargin = scope.layout.bottomTextHeight;
        var W = scope.jqsvg.width() - lMargin, H = scope.jqsvg.height() - bMargin;
        var xspan = scope.focus.xspan, yspan = scope.focus.yspan;
        var xl = scope.focus.xl, yl = scope.focus.yl;
        var shift = shifts;
        return { "x": lMargin+(p.x-xl)/xspan*W+shift.x,
                 "y": H-(p.y-yl)/yspan*H+shift.y };
      },
      generateLine: function(line, ele, data){
        var seg = { "id": "line"+ele.uniqid, "class": "lineplot-line", 
            "x1": line.p1.x, "y1": line.p1.y, "x2": line.p2.x, "y2": line.p2.y,
            "stroke": data.color
          };
        if (data.style==="dot") {
          _.extend(seg, {"stroke-dasharray": "2,2"});
        }else if (data.style==="dash") {
          _.extend(seg, {"stroke-dasharray": "9,5"});
        }
        return seg;
      },
      plotLines: function(scope){
        scope.svg.selectAll("line").data(scope.rpipeLines).enter().append("line")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; })
          .attr("stroke", function(d) { return d.stroke; })
          .attr("stroke-dasharray", function(d){ return d["stroke-dasharray"]; });
      },
      plotTexts: function(scope){
        scope.svg.selectAll("text").data(scope.rpipeTexts).enter().append("text")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y; })
          .attr("text-anchor", function(d){ return d["text-anchor"]; })
          .attr("dominant-baseline", function(d) { return d["dominant-baseline"]; })
          .text(function(d){ return d.text; });
      },
      plotRects: function(scope){
        scope.svg.selectAll("rect").data(scope.rpipeRects).enter().append("rect")
          .attr("id", function(d){ return d.id; })
          .attr("class", function(d){ return d.class; })
          .attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y; })
          .attr("width", function(d){ return d.width; })
          .attr("height", function(d){ return d.height; })
          .attr("fill", function(d){ return d.fill; });
      },
      plotCircles: function(scope){
        scope.svg.selectAll("circle").data(scope.rpipeCircles).enter().append("circle")
          .attr("id", function(d){ return d.id; })
          .attr("class", function(d){ return d.class; })
          .attr("cx", function(d){ return d.cx; })
          .attr("cy", function(d){ return d.cy; })
          .attr("r", function(d){ return d.r; })
          .attr("fill", function(d){ return d.color; })
          .attr("stroke", function(d){ return d.stroke; })
          .attr("opacity", function(d){ return d.opacity; })
          .attr("visibility", function(d){ return d.visibility; });
      },
      formatDate: function(intv, x){
        var months = this.months, days = this.days;
        var d = new Date(x);
        if (intv <= 1000*60*60) return this.padStr(d.getHours(),2)+":"+this.padStr(d.getMinutes(),2)+":"+this.padStr(d.getSeconds(),2); // minute:seconds
        else if (intv <= 1000*60*60*24) return days[d.getDay()]+" "+this.padStr(d.getHours(),2)+":"+this.padStr(d.getMinutes(),2); // day hour:minutes
        else if (intv <= 1000*60*60*24*31) return months[d.getMonth()]+" "+d.getDate()+" "+days[d.getDay()]; // month date day
        else return d.getFullYear()+" "+months[d.getMonth()]; //year month
      },
      padStr: function(str, len){
        str = ""+str;
        while (str.length<len) str = "0"+str;
        return str;
      },
      upper_bound: function(a, attr, val){
        var l = 0, r = a.length-1;
        while (l<=r) {
          var m = Math.floor((l+r)/2);
          if (a[m][attr]>=val) r = m-1;
          else l = m+1;
        }
        return r;
      },
      randomColor: function(){
        var rhex6 = Math.floor(Math.random()*Math.pow(16,6));
        var s = rhex6.toString(16);
        while(s.length<6) s = "0"+s;
        return "#"+s;
      }
    };
  }]);
})();
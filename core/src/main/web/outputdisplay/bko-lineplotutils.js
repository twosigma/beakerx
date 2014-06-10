

(function(){
    'use strict';
beaker.bkoFactory('lineplotUtils', ["bkUtils", function(bkUtils) {
    return {
      months: ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"],
      days: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      
      
      fixPercent: function(val){
        val = Math.max(val, 0);
        val = Math.min(val, 1);
        return val;
      },
      /*
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
       truncateLine: function(x1, y1, x2, y2){
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
         var tp1 = this.data2scrPercent(scope, p1),
             tp2 = this.data2scrPercent(scope, p2);
         var y1 = tp1.y, y2 = tp2.y;
         if (Math.max(y1,y2)<0-1E-6 || Math.min(y1,y2)>1+1E-6) return null;
         //this.truncateLine(tp1, tp2);
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
       */
      outsideScr: function(scope, p){
        var W = scope.jqsvg.width(), H = scope.jqsvg.height();
        return p.x < 0 || p.x > W || p.y < 0 || p.y > H;
      },
      generateLine: function(line, id, data){
        var seg = { "id": id, "class": "lineplot-line", 
            "x1": line[0], "y1": line[1], "x2": line[2], "y2": line[3],
            "stroke": data.color
          };
        if (data.style==="dot") {
          _.extend(seg, {"stroke-dasharray": "2,2"});
        }else if (data.style==="dash") {
          _.extend(seg, {"stroke-dasharray": "9,5"});
        }
        return seg;
      },
      standardizeLineProp : function(id, data){
        var prop = {"id": id, "class": "lineplot-line", "stroke": data.color, "stroke-width": data.width==null?2:data.width};
        if (data.style==="dot") {
          _.extend(prop, {"stroke-dasharray": "2,2"});
        }else if (data.style==="dash") {
          _.extend(prop, {"stroke-dasharray": "9,5"});
        }
        return prop;
      },
      plotStems: function(scope){
        var pipe = scope.rpipeStems;
        for(var i=0; i<pipe.length; i++){
            scope.maing.selectAll("#"+pipe[i].id).data([pipe[i]]).enter().append("g")
                .attr("id", function(d){ return d.id;} )
                .attr("class", function(d){ return d.class; })
                .attr("stroke", function(d){ return d.stroke; })
                .attr("stroke-dasharray", function(d){ return d["stroke-dasharray"]; });
            scope.svg.select("#"+pipe[i].id).selectAll("line").data(pipe[i].points, function(d){ return d.id; }).exit().remove();
            scope.svg.select("#"+pipe[i].id).selectAll("line").data(pipe[i].points, function(d){ return d.id; }).enter().append("line");
            scope.svg.select("#"+pipe[i].id).selectAll("line").data(pipe[i].points, function(d){ return d.id; })
                .attr("x1", function(d){ return d.x1; })
                .attr("x2", function(d){ return d.x2; })
                .attr("y1", function(d){ return d.y1; })
                .attr("y2", function(d){ return d.y2; })
                .attr("stroke-width", function(d){ return d["stroke-width"]; });
        }      
      },
      plotLines: function(scope){
        //scope.maing.attr("transform", "translate("+scope.translateX+","+scope.translateY+") scale("+scope.scaleX+","+scope.scaleY+")");
        var pipe = scope.rpipeLines;
        for(var i=0; i<pipe.length; i++){
            scope.maing.selectAll("#"+pipe[i].id).data([pipe[i]]).enter().append("g")
                .attr("id", function(d){ return d.id; })
                .attr("stroke", function(d) { return d.stroke; })
                .attr("stroke-width", function(d){ return d["stroke-width"]; })
                .attr("stroke-dasharray", function(d){ return d["stroke-dasharray"]; })
                .attr("class", function(d){ return d.class; });
            scope.svg.select("#"+pipe[i].id).selectAll("polyline").data([{}]).enter().append("polyline");
            scope.svg.select("#"+pipe[i].id+" polyline")
                .attr("points", pipe[i].points);
        }
        return;
    /*
        var sel = scope.maing.selectAll("line");
        sel.data(scope.rpipeLines, function(d){ return d.id; }).exit().remove();
        sel.data(scope.rpipeLines, function(d){ return d.id; }).enter().append("line")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; })
          .attr("stroke", function(d) { return d.stroke; })
          .attr("stroke-dasharray", function(d){ return d["stroke-dasharray"]; });
        sel.data(scope.rpipeLines, function(d){ return d.id; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; });
          */
      },
      plotCircles: function(scope){
        var pipe = scope.rpipeCircles;
        scope.maing.selectAll("g").data(pipe, function(d){ return d.id; }).enter().append("g")
            .attr("id", function(d){ return d.id; })
            .attr("class", function(d){ return d.class; })
            .attr("stroke", function(d){ return d.stroke; })
            .attr("fill", function(d){ return d.color; })
            .attr("r", function(d){ return d.r; });
        for(var i=0; i<pipe.length; i++){
            scope.maing.select("#"+pipe[i].id).selectAll("circle").data(pipe[i].points, function(d){return d.id;}).exit().remove();
            scope.maing.select("#"+pipe[i].id).selectAll("circle").data(pipe[i].points, function(d){return d.id;}).enter().append("circle")
                .attr("id", function(d){ return d.id; })
                .attr("cx", function(d){ return d.cx; })
                .attr("cy", function(d){ return d.cy; })
                .attr("opacity", function(d){ return d.opacity; })
                .attr("r", function(d){ return d.r; });
            scope.svg.select("#"+pipe[i].id).selectAll("circle").data(pipe[i].points, function(d){return d.id;})
                .attr("cx", function(d){ return d.cx; })
                .attr("cy", function(d){ return d.cy; })
                .attr("r", function(d){ return d.r; })
                .attr("opacity", function(d){ return d.opacity; });
        }
        /*
        var sel = scope.svg.selectAll("circle");
        sel.data(scope.rpipeCircles, function(d){ return d.id; }).exit().remove();
        sel.data(scope.rpipeCircles, function(d){ return d.id; }).enter().append("circle")
          .attr("id", function(d){ return d.id; })
          .attr("class", function(d){ return d.class; })
          .attr("cx", function(d){ return d.cx; })
          .attr("cy", function(d){ return d.cy; })
          .attr("r", function(d){ return d.r; })
          .attr("fill", function(d){ return d.color; })
          .attr("stroke", function(d){ return d.stroke; })
          .attr("opacity", function(d){ return d.opacity; });
        sel.data(scope.rpipeCircles, function(d){ return d.id; })
          .attr("cx", function(d){ return d.cx; })
          .attr("cy", function(d){ return d.cy; })
          .attr("opacity", function(d){ return d.opacity; });
          */
      },
      plotBars: function(scope){
        var pipe = scope.rpipeBars;
        scope.maing.selectAll("g").data(pipe, function(d){ return d.id; }).enter().append("g")
            .attr("id", function(d){ return d.id; })
            .attr("class", function(d){ return d.class; })
            .attr("fill", function(d){ return d.fill; })
        for (var i=0; i<pipe.length; i++) {
            scope.maing.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].points, function(d){return d.id;}).exit().remove();
            scope.maing.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].points, function(d){return d.id;}).enter().append("rect")
                .attr("id", function(d){ return d.id; })
                .attr("x", function(d){ return d.x; })
                .attr("y", function(d){ return d.y; })
                .attr("width", pipe[i].width)
                .attr("height", function(d){ return d.height; })
                .attr("fill", function(d){ return d.fill; });
            scope.maing.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].points, function(d){return d.id;})
                .attr("x", function(d){ return d.x; })
                .attr("y", function(d){ return d.y; })
                .attr("width", pipe[i].width)
                .attr("height", function(d){ return d.height; });
        }
      },
      plotRivers: function(scope){
        var pipe = scope.rpipeRivers;
        for(var i=0; i<pipe.length; i++){
            var sel = scope.maing.selectAll("#"+pipe[i].id);
            sel.data([pipe[i]]).enter().append("g")
                .attr("id", function(d){ return d.id; })
                .attr("fill", function(d){ return d.fill; })
                .attr("class", function(d){ return d.class; });
            scope.svg.select("#"+pipe[i].id).selectAll("polygon").data([{}]).enter().append("polygon");
            scope.svg.select("#"+pipe[i].id+" polygon")
                .attr("points", pipe[i].points);
        }
        return;
      },
      plotCoords: function(scope){
        var sel = scope.coordg.selectAll("line");
        sel.data(scope.rpipeCoords, function(d){ return d.id; }).exit().remove();
        sel.data(scope.rpipeCoords, function(d){ return d.id; }).enter().append("line")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; })
          .attr("stroke", function(d) { return d.stroke; })
          .attr("stroke-dasharray", function(d){ return d["stroke-dasharray"]; });
        sel.data(scope.rpipeCoords, function(d){ return d.id; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; });
      },
      plotTexts: function(scope){
        var sel = scope.svg.selectAll("text");
        scope.svg.selectAll("text").remove();
        //sel.data(scope.rpipeTexts, function(d){ return d.id; }).exit().remove();
        scope.svg.selectAll("text").data(scope.rpipeTexts, function(d){ return d.id; }).enter().append("text")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y; })
          .attr("transform", function(d){ return d.transform; })
          .attr("text-anchor", function(d){ return d["text-anchor"]; })
          .attr("dominant-baseline", function(d) { return d["dominant-baseline"]; })
          .text(function(d){ return d.text; });
        sel.data(scope.rpipeTexts, function(d){ return d.id; })
          .attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y; });
      },
      
      plotRects: function(scope){
        scope.labelg.selectAll("rect").data(scope.rpipeRects, function(d){ return d.id; }).exit().remove();
        scope.labelg.selectAll("rect").data(scope.rpipeRects, function(d){ return d.id; }).enter().append("rect")
          .attr("id", function(d){ return d.id; })
          .attr("class", function(d){ return d.class; })
          .attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y; })
          .attr("width", function(d){ return d.width; })
          .attr("height", function(d){ return d.height; })
          .attr("fill", function(d){ return d.fill; });
        scope.labelg.selectAll("rect").data(scope.rpipeRects, function(d){ return d.id; })
          .attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y; })
          .attr("width", function(d){ return d.width; })
          .attr("height", function(d){ return d.height; });
      },
     
      replotSingleCircle: function(scope, d){
        scope.svg.selectAll("#"+d.id).remove();
        scope.svg.selectAll("#"+d.id).data([d]).enter().append("circle")
          .attr("id", function(d){ return d.id; })
          .attr("class", function(d){ return d.class; })
          .attr("cx", function(d){ return d.cx; })
          .attr("cy", function(d){ return d.cy; })
          .attr("r", function(d){ return d.r; })
          .attr("fill", function(d){ return d.color; })
          .attr("stroke", function(d){ return d.stroke; })
          .attr("opacity", function(d){ return d.opacity; });
      },
      replotSingleRect: function(scope, d){
        scope.svg.selectAll("#"+d.id);
        scope.svg.selectAll("#"+d.id).data([d]).enter().append("rect")
          .attr("id", function(d){ return d.id; })
          .attr("class", function(d){ return d.class; })
          .attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y; })
          .attr("width", function(d){ return d.width; })
          .attr("height", function(d){ return d.height; })
          .attr("fill", function(d){ return d.fill; });
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
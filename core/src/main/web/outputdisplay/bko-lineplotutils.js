

(function(){
    'use strict';
    var retfunc = function(bkUtils) {
    return {
      months: ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"],
      days: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      
      fixPercent: function(val){
        val = Math.max(val, 0);
        val = Math.min(val, 1);
        return val;
      },
      outsideScr: function(scope, p){
        var W = scope.jqsvg.width(), H = scope.jqsvg.height();
        return p.x < 0 || p.x > W || p.y < 0 || p.y > H;
      },
      standardizeLineProp : function(id, data){
        var prop = {"id": id, "class": "lineplot-line", "stroke": data.color, "stroke-width": data.width==null?2:data.width};
        if (data.style==="dot") {
          _.extend(prop, {"stroke_dasharray": "2,2"});
        }else if (data.style==="dash") {
          _.extend(prop, {"stroke_dasharray": "9,5"});
        }
        return prop;
      },
      plotStems: function(scope){
        var pipe = scope.rpipeStems;
        scope.stemg.selectAll("g").data(pipe, function(d){ return d.id; }).exit().remove();
        scope.stemg.selectAll("g").data(pipe, function(d){ return d.id; }).enter().append("g")
            .attr("id", function(d){ return d.id;} )
            .attr("class", function(d){ return d.class; })
            .attr("stroke-width", function(d){ return d.stroke_width; })
            .attr("stroke-dasharray", function(d){ return d.stroke_dasharray; })
            .attr("stroke", function(d){ return d.stroke; })
            .attr("opacity", function(d){ return d.opacity; });
        for(var i=0; i<pipe.length; i++){
            scope.stemg.select("#"+pipe[i].id).selectAll("line").data(pipe[i].elements, function(d){ return d.id; }).exit().remove();
            scope.stemg.select("#"+pipe[i].id).selectAll("line").data(pipe[i].elements, function(d){ return d.id; }).enter().append("line")
            	.attr("stroke-width", function(d){ return d.stroke_width; })
            	.attr("stroke", function(d){ return d.stroke; })
            	.attr("opacity", function(d){ return d.opacity; });
            scope.stemg.select("#"+pipe[i].id).selectAll("line").data(pipe[i].elements, function(d){ return d.id; })
              .attr("x1", function(d){ return d.x1; })
              .attr("x2", function(d){ return d.x2; })
              .attr("y1", function(d){ return d.y1; })
              .attr("y2", function(d){ return d.y2; });
        }      
      },
      plotLines: function(scope){
        //scope.maing.attr("transform", "translate("+scope.translateX+","+scope.translateY+") scale("+scope.scaleX+","+scope.scaleY+")");
        var pipe = scope.rpipeLines;
        scope.lineg.selectAll("g").data(pipe, function(d){return d.id;}).exit().remove();
        scope.lineg.selectAll("g").data(pipe, function(d){return d.id;}).enter().append("g")
            .attr("id", function(d){ return d.id; })
            .attr("stroke", function(d) { return d.stroke; })
            .attr("stroke-width", function(d){ return d["stroke-width"]; })
            .attr("stroke-dasharray", function(d){ return d.stroke_dasharray; })
            .attr("class", function(d){ return d.class; });
        for(var i=0; i<pipe.length; i++){
            scope.lineg.select("#"+pipe[i].id).selectAll("polyline").data([{}]).enter().append("polyline");
            scope.lineg.select("#"+pipe[i].id+" polyline")
                .attr("points", pipe[i].elements);
        }
    
      },
      plotSegs: function(scope){
        var pipe = scope.rpipeSegs;
        scope.segg.selectAll("g").data(pipe, function(d){return d.id;}).exit().remove();
        scope.segg.selectAll("g").data(pipe, function(d){return d.id;}).enter().append("g")
            .attr("id", function(d){ return d.id; })
            .attr("class", function(d){ return d.class; })
            .attr("stroke", function(d){ return d.stroke; })
            .attr("stroke-width", function(d){ return d.stroke_width; })
            .attr("stroke-opacity", function(d){ return d.stroke_opacity; });
        for(var i=0; i<pipe.length; i++){
            scope.segg.select("#"+pipe[i].id).selectAll("line").data(pipe[i].elements, function(d){return d.id;}).exit().remove();
            scope.segg.select("#"+pipe[i].id).selectAll("line").data(pipe[i].elements, function(d){return d.id;}).enter().append("line")
                .attr("id", function(d) { return d.id; })
                .attr("x1", function(d) { return d.x1; })
                .attr("x2", function(d) { return d.x2; })
                .attr("y1", function(d) { return d.y1; })
                .attr("y2", function(d) { return d.y2; });
            scope.segg.select("#"+pipe[i].id).selectAll("line").data(pipe[i].elements, function(d){return d.id;})
                .attr("x1", function(d) { return d.x1; })
                .attr("x2", function(d) { return d.x2; })
                .attr("y1", function(d) { return d.y1; })
                .attr("y2", function(d) { return d.y2; });
        }
      },
      plotRects: function(scope){
        var pipe = scope.rpipeRects;
        scope.rectg.selectAll("g").data(pipe, function(d){return d.id;}).exit().remove();
        scope.rectg.selectAll("g").data(pipe, function(d){return d.id;}).enter().append("g")
          .attr("id", function(d){ return d.id; })
          .attr("class", function(d){ return d.class; })
          .attr("fill", function(d){ return d.fill; })
          .attr("fill-opacity", function(d){ return d.fill_opacity; })
          .attr("stroke", function(d){ return d.stroke; })
        	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
        for(var i=0; i<pipe.length; i++){
            scope.rectg.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].elements, function(d){ return d.id; }).exit().remove();
            scope.rectg.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].elements, function(d){ return d.id; }).enter().append("rect")
              .attr("x", function(d){ return d.x; })
              .attr("y", function(d){ return d.y; })
              .attr("width", function(d){ return d.width; })
              .attr("height", function(d){ return d.height; })
              .attr("fill", function(d){ return d.fill; })
	            .attr("fill-opacity", function(d){ return d.fill_opacity; })
	            .attr("stroke", function(d){ return d.stroke; })
	          	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
            scope.rectg.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].elements, function(d){ return d.id; })
              .attr("x", function(d){ return d.x; })
              .attr("y", function(d){ return d.y; })
              .attr("width", function(d){ return d.width; })
              .attr("height", function(d){ return d.height; });
        }
      },
      plotDots: function(scope){
        var pipe = scope.rpipeDots;
        scope.circleg.selectAll("g").data(pipe, function(d){ return d.id; }).exit().remove();
        scope.circleg.selectAll("g").data(pipe, function(d){ return d.id; }).enter().append("g")
            .attr("id", function(d){ return d.id; })
            .attr("class", function(d){ return d.class; })
            .attr("stroke", function(d){ return d.stroke; })
            .attr("opacity", function(d){ return d.opacity; })
            .attr("fill", function(d){ return d.fill; })
            .attr("fill-opacity", function(d){ return d.fill_opacity; })
            .attr("stroke", function(d){ return d.stroke; })
          	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
        for(var i=0; i<pipe.length; i++){
            scope.circleg.select("#"+pipe[i].id).selectAll("circle").data(pipe[i].elements, function(d){return d.id;}).exit().remove();
            scope.circleg.select("#"+pipe[i].id).selectAll("circle").data(pipe[i].elements, function(d){return d.id;}).enter().append("circle")
              .attr("id", function(d){ return d.id; })
              .attr("cx", function(d){ return d.cx; })
              .attr("cy", function(d){ return d.cy; })
              .attr("r", function(d){ return d.r; })
              .attr("opacity", function(d){ return d.opacity; })
              .attr("fill", function(d){ return d.fill; })
	            .attr("fill-opacity", function(d){ return d.fill_opacity; })
	            .attr("stroke", function(d){ return d.stroke; })
	          	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
            scope.circleg.select("#"+pipe[i].id).selectAll("circle").data(pipe[i].elements, function(d){return d.id;})
              .attr("cx", function(d){ return d.cx; })
              .attr("cy", function(d){ return d.cy; })
              .attr("opacity", function(d){ return d.opacity; });
        }
      },
      plotPointCircles: function(scope){
        var pipe = scope.rpipePointCircles;
        var svg = scope.pointcircleg;
        svg.selectAll("g").data(pipe, function(d){ return d.id; }).exit().remove();
        svg.selectAll("g").data(pipe, function(d){ return d.id; }).enter().append("g")
            .attr("id", function(d){ return d.id; })
            .attr("class", function(d){ return d.class; })
            .attr("fill", function(d){ return d.fill; })
            .attr("fill-opacity", function(d){ return d.fill_opacity; })
            .attr("stroke", function(d){ return d.stroke; })
          	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
        for(var i=0; i<pipe.length; i++){
            svg.select("#"+pipe[i].id).selectAll("circle").data(pipe[i].elements, function(d){ return d.id; }).exit().remove();
            svg.select("#"+pipe[i].id).selectAll("circle").data(pipe[i].elements, function(d){ return d.id; }).enter().append("circle")
              .attr("id", function(d){ return d.id; })
              .attr("cx", function(d){ return d.cx; })
              .attr("cy", function(d){ return d.cy; })
              .attr("r", function(d){ return d.r; })
              .attr("fill", function(d){ return d.fill; })
	            .attr("fill-opacity", function(d){ return d.fill_opacity; })
	            .attr("stroke", function(d){ return d.stroke; })
	          	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
            svg.select("#"+pipe[i].id).selectAll("circle").data(pipe[i].elements, function(d){return d.id;})
              .attr("cx", function(d){ return d.cx; })
              .attr("cy", function(d){ return d.cy; });
        }
      },
      plotPointRects: function(scope){
        var pipe = scope.rpipePointRects;
        var svg = scope.pointrectg;
        svg.selectAll("g").data(pipe, function(d){ return d.id; }).exit().remove();
        svg.selectAll("g").data(pipe, function(d){ return d.id; }).enter().append("g")
            .attr("id", function(d){ return d.id; })
            .attr("class", function(d){ return d.class; })
            .attr("fill", function(d){ return d.fill; })
            .attr("fill-opacity", function(d){ return d.fill_opacity; })
            .attr("stroke", function(d){ return d.stroke; })
          	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
        for (var i=0; i<pipe.length; i++) {
            svg.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].elements, function(d){return d.id;}).exit().remove();
            svg.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].elements, function(d){return d.id;}).enter().append("rect")
              .attr("id", function(d){ return d.id; })
              .attr("x", function(d){ return d.x; })
              .attr("y", function(d){ return d.y; })
              .attr("width", function(d){ return d.width; })
              .attr("height", function(d){ return d.height; })
              .attr("fill", function(d){ return d.fill; })
	            .attr("fill-opacity", function(d){ return d.fill_opacity; })
	            .attr("stroke", function(d){ return d.stroke; })
	          	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
            svg.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].elements, function(d){return d.id;})
              .attr("x", function(d){ return d.x; })
              .attr("y", function(d){ return d.y; });
        }
      },
      plotBars: function(scope){
        var pipe = scope.rpipeBars;
        scope.barg.selectAll("g").data(pipe, function(d){ return d.id; }).exit().remove();
        scope.barg.selectAll("g").data(pipe, function(d){ return d.id; }).enter().append("g")
            .attr("id", function(d){ return d.id; })
            .attr("class", function(d){ return d.class; })
           	.attr("fill", function(d){ return d.fill; })
            .attr("fill-opacity", function(d){ return d.fill_opacity; })
            .attr("stroke", function(d){ return d.stroke; })
          	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
        for (var i=0; i<pipe.length; i++) {
            scope.barg.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].elements, function(d){return d.id;}).exit().remove();
            scope.barg.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].elements, function(d){return d.id;}).enter().append("rect")
              .attr("id", function(d){ return d.id; })
              .attr("x", function(d){ return d.x; })
              .attr("y", function(d){ return d.y; })
              .attr("width", pipe[i].width)
              .attr("height", function(d){ return d.height; })
              .attr("fill", function(d){ return d.fill; })
	            .attr("fill-opacity", function(d){ return d.fill_opacity; })
	            .attr("stroke", function(d){ return d.stroke; })
	          	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
            scope.barg.select("#"+pipe[i].id).selectAll("rect").data(pipe[i].elements, function(d){return d.id;})
              .attr("x", function(d){ return d.x; })
              .attr("y", function(d){ return d.y; })
              .attr("width", pipe[i].width)
              .attr("height", function(d){ return d.height; });
        }
      },
      plotRivers: function(scope){
        var pipe = scope.rpipeRivers;
        scope.riverg.selectAll("g").data(pipe, function(d){return d.id; }).exit().remove();
        scope.riverg.selectAll("g").data(pipe, function(d){return d.id; }).enter().append("g")
            .attr("id", function(d){ return d.id; })
            .attr("class", function(d){ return d.class; })
            .attr("fill", function(d){ return d.fill; })
            .attr("fill-opacity", function(d){ return d.fill_opacity; })
            .attr("stroke", function(d){ return d.stroke; })
          	.attr("stroke-opacity", function(d){ return d.stroke_opacity; });
        for(var i=0; i<pipe.length; i++){
            scope.riverg.select("#"+pipe[i].id).selectAll("polygon").data([{}]).enter().append("polygon");
            scope.riverg.select("#"+pipe[i].id+" polygon")
              .attr("points", pipe[i].elements);
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
          .attr("stroke-dasharray", function(d){ return d.stroke_dasharray; });
        sel.data(scope.rpipeCoords, function(d){ return d.id; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; });
      },
      plotTexts: function(scope){   // redraw
        var pipe = scope.rpipeTexts;
        scope.labelg.selectAll("text").remove();
        scope.labelg.selectAll("text").data(pipe, function(d){ return d.id; }).enter().append("text")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y; })
          .attr("transform", function(d){ return d.transform; })
          .attr("text-anchor", function(d){ return d["text-anchor"]; })
          .attr("dominant-baseline", function(d) { return d["dominant-baseline"]; })
          .text(function(d){ return d.text; });
        //scope.labelg.selectAll("text").data(scope.rpipeTexts, function(d){ return d.id; })
        //  .attr("x", function(d){ return d.x; })
        //  .attr("y", function(d){ return d.y; });
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
      replotSingleRect: function(svgElement, d){
        svgElement.selectAll("#"+d.id).remove();
        svgElement.selectAll("#"+d.id).data([d]).enter().append("rect")
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
  };
  beaker.bkoFactory('lineplotUtils', ["bkUtils", retfunc]);
})();
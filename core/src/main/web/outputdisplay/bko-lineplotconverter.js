

(function(){
    'use strict';
beaker.bkoFactory('lineplotConverter', ["bkUtils", function(bkUtils) {
    return {
      standardizeModel: function(model){
        var newmodel = {
            type: "LinePlot",
            title: model.chart_title ? model.chart_title : model.title,
            xLabel: model.domain_axis_label? model.domain_axis_label : model.xLabel,
            yLabel: model.y_label? model.y_label : model.yLabel,    // ? range_axis_label ?
            xType: model.xType? model.xType : "ordinal",
            yType: model.yType? model.yType : "ordinal",
            // TODO margin
            // TODO range
            show_legend: model.show_legend,
            use_tool_tip: model.use_tool_tip,
            xCursor: model.xCursor,
            yCursor: model.yCursor,
            data: []
        }
        
        // scaling
        var logy = false, logyb;
        if (model.log_y) {
            newmodel.yScale = {"type": "log", "base": model.y_log_base==null?10: model.y_log_base};
            logy = true;
            logyb = newmodel.yScale.base;
        }else{
            newmodel.yScale = {"type": "linear"};
        }
        newmodel.xScale = {"type": "linear"};
        
        if (model.version === "test") {
            var list = model.data;
            var numLines = list.length;
            for(var i=0; i<numLines; i++){
                var data = _.omit(list[i]);
                data.shown = true;
                
                if (data.type==null) {
                    data.type = "line";
                }
                if (data.type==="line") {
                    if (data.style==null) data.style = "solid";
                    if (data.interpolation==null) data.interpolation = "linear";
                }
                
                var numEles = data.elements.length;
                for(var j=0; j<numEles; j++){
                    var ele = data.elements[j];
                    data.elements[j].uniqid = i+"_"+j;
                    
                    var txt = "";
                    var valx = newmodel.xType==="time"? new Date(ele.x).toLocaleString() : ele.x;
                    var valy = ele.y;
                    txt += "<div>x: "+valx+"</div><div>y: "+valy+"</div>";
                    data.elements[j].value = txt;
                    
                    if (data.type==="river" && data.elements[j].y2==null && data.height!=null) {
                        data.elements[j].y2 = data.elements[j].y+data.height;
                    }
                    if (data.type==="stem" && data.elements[j].y2==null && data.height!=null) {
                        data.elements[j].y2 = data.elements[j].y+data.height;
                    }
                }
                newmodel.data.push(data);
            }
        } else {
            var list = model.graphics_list;
            var numLines = list.length;
            for(var i=0; i<numLines; i++){
                var data = _.omit(list[i]);
                
                data.legend = data.display_name;
                delete data.display_name;
                data.shown = true;
                data.color = "#"+data.color.substr(3);
                
                if (data.type==null || data.type==="Line") {
                    data.type = "line";
                    if (data.style==null)  data.style = "solid";
                    if (data.interpolation==null) data.interpolation = "linear";
                } else if (data.type==="Stem") {
                    data.type = "stem";
                } else if (data.type==="Bars"){
                    data.type = "bar";
                } else if (data.type==="Area") {
                    data.type = "river";
                } else if (data.type==="Points") {
                    data.type = "point";
                }
                
                var elements = [];
                var numEles = data.x.length;
                for(var j=0; j<numEles; j++){
                    var ele = { uniqid: i+"_"+j };
                    ele.x = data.x[j];
                    ele.y = data.y[j];
                    
                    
                    
                    /*
                  var txt = "", prs = _.pairs(_.omit(data.elements[j], "value"));
                  for (var k=0; k<prs.length; k++) {
                    var val = prs[k][1];
                    if (prs[k][0]==="x")  {
                      val = model.xType=="time"? new Date(val).toLocaleString() : val;
                    }
                    txt += "<div>" + prs[k][0] + ": "+ val + "</div>";
                  }
                  data.elements[j].value = txt;
                  */
                  
                    if (data.type==="river" || data.type==="bar" ){
                        if (data.y2==null) {
                            if (data.height!=null) {
                                ele.y2 = ele.y+data.height;
                            }else if (data.base!=null) {
                                ele.y2 = ele.y;
                                ele.y = base;
                            }else{
                                ele.y2 = null;
                            }
                        }else{
                            ele.y2 = data.y2[j];
                        }
                    }
                    if (data.type==="stem" && data.y2[j].y2==null && data.height!=null) {
                        ele.y2 = data.y2[j].y+data.height;
                    }
                    
                    if (data.type==="point" && data.sizes!=null) {
                        ele.size = data.sizes[j];
                    }
                    
                    var txt = "";
                    var valx = newmodel.xType==="time"? new Date(ele.x).toLocaleString() : ele.x;
                    var valy = ele.y;
                    txt += "<div>Type: "+data.type+"</div>";
                    txt += "<div>x: "+valx+"</div><div>y: "+valy+"</div>";
                    if (ele.y2!=null) {
                        txt += "<div>y2: "+ele.y2+"</div>";
                    }
                    ele.value = txt;

                    
                    if (logy) {
                        if (ele.y != null) {
                            if (ele.y <= 0) console.error("cannot apply log scale to non-positive y value");
                            ele._y = ele.y;
                            ele.y = Math.log(ele.y)/Math.log(logyb);
                        }
                        if (ele.y2 != null) {
                            if (ele.y2 <= 0) console.error("cannot apply log scale to non-positive y value");
                            ele._y2 = ele.y2;
                            ele.y2 = Math.log(ele.y2)/Math.log(logyb);
                        }
                    }
                    elements.push(ele);
                }
                delete data.x;
                delete data.y;
                data.elements = elements;
                newmodel.data.push(data);
            }
        }
        console.log(newmodel);
        return newmodel;
      }
    };
  }]);
})();
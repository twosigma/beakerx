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

(function() {'use strict';
  
  var retfunc = function(bkUtils, plotUtils) {
    return {
      dataTypeMap : {
        "Line" : "line",
        "Stems" : "stem",
        "Bars" : "bar",
        "Area" : "river",
        "Text" : "text",
        "Points" : "point",
        "" : ""
      },
      lineStyleMap : {
        "SOLID" : "solid",
        "DASH" : "dash",
        "DOT" : "dot",
        "DASHDOT" : "dashdot",
        "LONGDASH" : "longdash",
        "" : "solid"
      },
      lineDasharrayMap : {
        "solid" : "",
        "dash" : "9,5",
        "dot" : "2,2",
        "dashdot" : "9,5,2,5",
        "longdash" : "20,5",
        "" : ""
      },
      pointShapeMap : {
        "DEFAULT" : "rect",
        "CIRCLE" : "circle",
        "DIAMOND" : "rect",
        "" : "rect"
      },
      interpolationMap : {
        0 : "none",
        1 : "linear",
        2 : "linear", // should be "curve" but right now there is no plan to support curve
        "" : "linear"
      },
      formatData: function(newmodel, model) {
        // TODO
        // fill in null entries, compute y2, etc.
      },
      formatSerializedData : function(newmodel, model) {
        var onzeroY = false;
        var logy = false, logyb;
        if(model.rangeAxes != null) {
          var axis = model.rangeAxes[0];
          if (axis.auto_range_includes_zero) { onzeroY = true; }
          if (axis.use_log === true) {
            logy = true;
            logyb = axis.log_base == null ? 10 : axis.log_base;
          }
        }
        
        if(model.x_lower_bound) { newmodel.focus.xl = model.x_lower_bound; }
        if(model.x_upper_bound) { newmodel.focus.xr = model.x_upper_bound; }
        if(model.rangeAxes && model.rangeAxes[0].lower_bound) { 
          newmodel.focus.yl = model.rangeAxes[0].lower_bound;
        }
        if(model.rangeAxes && model.rangeAxes[0].upper_bound) {
           newmodel.focus.yr = model.rangeAxes[0].upper_bound;
        }
        
        if (model.type === "TimePlot") {
          newmodel.xType = "time";
        }

        // scaling
        var logy = false, logyb;
        if (logy) {
          newmodel.yScale = {
            "type" : "log",
            "base" : logyb
          };
        } else {
          newmodel.yScale = {
            "type" : "linear"
          };
        }
        newmodel.xScale = {
          "type" : "linear"
        };
        
        var list = model.graphics_list;
        var numLines = list.length;
        for (var i = 0; i < numLines; i++) {
          var data = _.omit(list[i]);

          data.legend = data.display_name;
          delete data.display_name;
          data.shown = true;
          if (data.color != null) {
            data.color_opacity = parseInt(data.color.substr(1,2), 16) / 255;
            data.color = "#" + data.color.substr(3);
          }
          if(data.outline_color != null) {
            data.stroke_opacity = parseInt(data.outline_color.substr(1,2), 16) / 255;
            data.stroke = "#" + data.outline_color.substr(3);
            delete data.outline_color;
          }
          
          if (data.colors != null) { data.colorArray = true; }
          if (data.sizes != null) { data.sizeArray = true; }
          if (data.bases != null) { data.baseArray = true; }
          
          if (data.type == null) { data.type = ""; }
          if (data.style == null) { data.style = ""; }
          if (data.stroke_dasharray == null) { data.stroke_dasharray = ""; }
          if (data.interpolation == null) { data.interpolation = ""; }
          
          data.type = this.dataTypeMap[data.type];
          
          if(data.type === "bar" || data.type === "river") { 
            onzeroY = true; // auto range to y=0
          } 

          if(data.type === "line" || data.type === "stem") {
            data.style = this.lineStyleMap[data.style];
            data.stroke_dasharray = this.lineDasharrayMap[data.style];
          }
          
          if(data.type === "line" || data.type === "river") { 
            data.interpolation = this.interpolationMap[data.interpolation]; 
          }

          if(data.type === "bar") {
            if (data.width == null) { 
              data.width = 1;
            }
          }
          
          if (data.type === "point") { 
            data.style = this.pointShapeMap[data.shape]; 
          }
          
          var elements = [];
          var numEles = data.x.length;
          for (var j = 0; j < numEles; j++) {
            var ele = {
              uniqid : i + "_" + j
            };
            ele.x = data.x[j];
            ele.y = data.y[j];
            if(data.colors != null) {
              ele.color_opacity = parseInt(data.colors[j].substr(1,2), 16) / 255;
              ele.color = "#" + data.colors[j].substr(3);
            }
            if(data.outline_colors != null) {
              ele.stroke_opacity = parseInt(data.outline_colors[j].substr(1,2), 16) / 255;
              ele.stroke = "#" + data.outline_colors[j].substr(3);
            }
            
            if (data.type === "river" || data.type === "bar" || data.type === "stem") {
              if (data.y2 == null) {
                if (data.height != null) {
                  ele.y2 = ele.y - data.height;
                } else if (data.base != null) {
                  ele.y2 = data.base;
                } else if (data.bases != null) {
                  ele.y2 = data.bases[j];
                } else {
                  ele.y2 = null;
                }
              } else {
                ele.y2 = data.y2[j];
              }
            }
            if (data.type === "point") {
              if(data.size != null) {
                ele.size = data.size;
              } else if (data.sizes != null) {
                ele.size = data.sizes[j];
              } else {
                ele.size = data.style === "rect"? 10 : 5;
              }
            }
            if(data.type === "bar") {
              var w = data.width;
              ele.x1 = ele.x - w/2;
              ele.x2 = ele.x + w/2;
            }

            var txt = "";
            var valx = newmodel.xType === "time" ? new Date(ele.x).toLocaleString() : ele.x;
            var valy = ele.y;
            txt += "<div>Type: " + data.type + "</div>";
            txt += "<div>x: " + valx + "</div><div>y: " + valy + "</div>";
            if (ele.y2 != null) {
              txt += "<div>y2: " + ele.y2 + "</div>";
            }
            ele.value = txt;

            if (logy) {
              if (ele.y != null) {
                if (ele.y <= 0) {
                  console.error("cannot apply log scale to non-positive y value");
                }
                ele._y = ele.y;
                ele.y = Math.log(ele.y) / Math.log(logyb);
              }
              if (ele.y2 != null) {
                if (ele.y2 <= 0) {
                  console.error("cannot apply log scale to non-positive y value");
                }
                ele._y2 = ele.y2;
                ele.y2 = Math.log(ele.y2) / Math.log(logyb);
              }
            }
            elements.push(ele);
          }
          delete data.x;
          delete data.y;
          data.elements = elements;
          if (data.colors) { delete data.colors; }
          if (data.sizes) { delete data.sizes; }
          if (data.bases) { delete data.bases; }
          if (data.outline_colors) { delete data.outline_colors; }
          newmodel.data.push(data);
        }
        if(model.constant_lines != null) {
          for(var i = 0; i < model.constant_lines.length; i++) {
            var line = model.constant_lines[i];
            var data = {
              "type": "constline",
              "width": line.width!=null ? line.width : 1,
              "color": "black",
              "elements": []
            };
            if (line.color != null) {
              data.color_opacity = parseInt(line.color.substr(1,2), 16) / 255;
              data.color = "#" + line.color.substr(3);
            }
            if (line.x != null) {
              var ele = {"type": "x", "x": line.x};
            } else if(line.y != null) {
              var y = line.y;
              var ele = {"type": "y", "y": y};
              if(logy) {
                ele._y = y;
                ele.y = Math.log(y) / Math.log(logyb);
              }
            }
            data.elements.push(ele);
            newmodel.data.push(data);
          }
        }
        if (model.constant_bands != null) {
          for (var i = 0; i < model.constant_bands.length; i++) {
            var band = model.constant_bands[i];
            var data = {
              "type" : "constband",
              "elements" : []
            };
            if (band.color != null) {
              data.color_opacity = parseInt(band.color.substr(1, 2), 16) / 255;
              data.color = "#" + band.color.substr(3);
            }
            if (band.x != null) {
              var ele = {
                "type" : "x",
                "x1" : band.x[0],
                "x2" : band.x[1]
              };
            } else if (band.y != null) {
              var ele = {
                "type" : "y"
              };
              var y1 = band.y[0], y2 = band.y[1];
              ele.y1 = y1;
              ele.y2 = y2;
              if (logy) {
                ele._y1 = y1;
                ele.y1 = Math.log(y1) / Math.log(logyb);
                ele._y2 = y2;
                ele.y2 = Math.log(y2) / Math.log(logyb);
              }
            }
            data.elements.push(ele);
            newmodel.data.push(data);
          }
        }
        if (model.texts != null) {
          for (var i = 0; i < model.texts.length; i++) {
            var mtext = model.texts[i];
            var data = {
              "type" : "text",
              "color" : mtext.color != null ? mtext.color : "black",
              "elements" : []
            };
            var ele = {
              "x" : mtext.x,
              "y" : mtext.y,
              "v" : mtext.text
            };
            if (logy) {
              ele._y = ele.y;
              ele.y = Math.log(ele.y) / Math.log(logyb);
            }
            data.elements.push(ele);
            newmodel.data.push(data);
          }
        }
        if (model.type === "NanoPlot") {
          // TODO, beaker crashes when loading long integers
          // var range = plotUtils.getDataRange(newmodel.data);
          // newmodel.nanoOffset = range.xl;
        }
        
        newmodel.onzeroY = onzeroY;
      },
      standardizeModel : function(model) {
        if (model.graphics_list != null) {
          model.version = "dnote";  // TODO, a hack now to check DS source
        }
        if (model.version === "complete") { // skip standardized model in combined plot
          //console.log("pass", model);
          return model;
        } else if (model.version === "dnote") {
        } else {
          model.version = "direct";
        }
        var newmodel;
        if (model.version === "dnote") {  // model returned from serializer
          newmodel = {
            type : "plot",
            title : model.chart_title != null ? model.chart_title : model.title,
            xLabel : model.domain_axis_label != null ? model.domain_axis_label : model.xLabel,
            yLabel : model.y_label != null ? model.y_label : model.yLabel, // ? range_axis_label ?
            xType : model.xType != null ? model.xType : "ordinal",
            yType : model.yType != null ? model.yType : "ordinal",
            margin : model.margin != null ? model.margin : null,
            range : model.range != null ? model.range : null,
            focus : model.focus != null ? model.focus : {},
            xCursor : model.xCursor,
            yCursor : model.yCursor,
            initSize : {
              "width" : (model.init_width != null ? model.init_width : 1200) + "px",
              "height" : (model.init_height != null ? model.init_height : 350) + "px"
            },
            nanoOffset : null,
            data : []
          };
        } else {
          newmodel = {
            xLabel : model.xLabel != null ? model.xLabel : null,
            yLabel : model.yLabel != null ? model.yLabel : null,
            xType : model.xType != null ? model.xType : "ordinal",
            yType : model.yType != null ? model.yType : "ordinal",
            focus : model.focus != null ? model.focus : {},
            xScale : model.xScale != null ? model.xScale : { type: "linear" },
            yScale : model.yScale != null ? model.yScale : { type: "linear" },
            initSize : {
              "width" : (model.width != null ? model.width : 1200) + "px",
              "height": (model.height != null ? model.height : 350) + "px"
            }
          };
        }
        newmodel.show_legend = model.show_legend != null ? model.show_legend : false;
        newmodel.use_tool_tip = model.use_tool_tip != null ? model.use_tool_tip : false;

        
        if (model.version === "dnote") {
          this.formatSerializedData(newmodel, model);
        }
        this.formatData(newmodel, model); // fill in null entries, compute y2, etc.
        
        if (newmodel.margin == null) { 
          newmodel.margin = {
            bottom : newmodel.onzeroY === true ? 0 : 5,
            top : 5,
            left : 5,
            right : 5
          };
        }
        newmodel.version = "complete";
        console.log(newmodel);
        return newmodel;
      }
    };
  };
  beaker.bkoFactory('plotConverter', ["bkUtils", 'plotUtils', retfunc]);
})();

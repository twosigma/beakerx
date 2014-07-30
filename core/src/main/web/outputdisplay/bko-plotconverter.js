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
        "DEFAULT": "solid",
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
        "DIAMOND" : "diamond",
        "" : "rect"
      },
      interpolationMap : {
        0 : "none",
        1 : "linear",
        2 : "linear", // should be "curve" but right now it is not implemented yet
        "" : "linear"
      },
      formatData: function(newmodel, model) {
        // TODO
        // fill in null entries, compute y2, etc.
        // move some of format SerializedData to formatData?
        var data = newmodel.data;
        var logy = newmodel.yScale.type === "log", logyb = newmodel.yScale.base;
        for (var i = 0; i < data.length; i++) {
          var dat = data[i], eles = dat.elements;
          
          if (eles == null) eles = [];

          dat.shown = true;
          
          if (dat.type == null) {
            dat.type = "line";
          }
          
          if(dat.type === "bar" || dat.type === "river") { 
            newmodel.onzeroY = true; // auto range to y=0
          } 

          if(dat.type === "line" || dat.type === "stem") {
            if (dat.style == null) {
              dat.style = "solid";
            }
            dat.stroke_dasharray = this.lineDasharrayMap[dat.style];
          }
          
          if(dat.type === "line" || dat.type === "river") { 
            if (dat.interpolation === "curve") {
            }
          }
          
          if (dat.type === "line" || dat.type === "stem") {
            if (dat.width == null) {
              dat.width = 2;
            }
          }
          if (dat.type === "bar" && dat.width == null) {
            dat.width = 1;
          }
          
          if (dat.colorOpacity != null) {
            dat.color_opacity = dat.colorOpacity;
            delete dat.colorOpacity;
          }
          if (dat.outlineColor != null) {
            dat.stroke = dat.outlineColor;
            delete dat.outlineColor;
          }
          if (dat.outlineWidth != null) {
            dat.stroke_width = dat.outlineWidth;
            delete dat.outlineWidth;
          }
          if (dat.outlineOpacity != null) {
            dat.stroke_opacity = dat.outlineOpacity;
            delete dat.outlineOpacity;
          }
          
          for (var j = 0; j < eles.length; j++) {
            var ele = eles[j];
            
            if (ele.outlineColor != null) {
              ele.stroke = ele.outlineColor;
              delete ele.outlineColor;
            }
            if (ele.outlineWidth != null) {
              ele.stroke_width = ele.outlineWidth;
              delete ele.outlineWidth;
            }
            if (ele.outlineOpacity != null) {
              ele.stroke_opacity = ele.outlineOpacity;
              delete ele.outlineOpacity;
            }
            
            if (dat.type === "bar") {
              var w = dat.width;
              ele.x1 = ele.x - w/2;
              ele.x2 = ele.x + w/2;
            }
            if (dat.type === "river" || dat.type === "bar" || dat.type === "stem") {
              if (dat.y2 == null) {
                if (dat.height != null) {
                  ele.y2 = ele.y - dat.height;
                } else if (dat.base != null) {
                  ele.y2 = dat.base;
                } else if (dat.bases != null) {
                  ele.y2 = dat.bases[j];
                } else {
                  ele.y2 = null;
                }
              } else {
                ele.y2 = dat.y2[j];
              }
            }
            if (dat.type === "point") {
              if (dat.size != null) {
                ele.size = dat.size;
              } else if (dat.sizes != null) {
                ele.size = dat.sizes[j];
              } else {
                ele.size = dat.style === "rect"? 10 : 5;
              }
            }
            
            if (dat.type === "river") {
              if (dat.interpolation == null) {
                dat.interpolation = "linear";
              }
            }
            
            var txt = "";
            var valx = newmodel.xType === "time" ? new Date(ele.x).toLocaleString() : ele.x;
            var valy = ele.y;
            if (data.legend != null) {
              txt += "<div>" + data.legend + "</div>";
            }
            txt += "<div>x: " + valx + "</div><div>y: " + valy + "</div>";
            if (ele.y2 != null) {
              txt += "<div>y2: " + ele.y2 + "</div>";
            }
            ele.tip_value = txt;
            
            if (logy) {
              if (ele.y != null) {
                if (ele.y <= 0) {
                  console.error("cannot apply log scale to non-positive y value");
                }
                ele._y = ele.y;
                ele.y = Math.log(ele.y) / Math.log(logyb);
              }
              if (ele.y1 != null) {
                if (ele.y1 <= 0) {
                  console.error("cannot apply log scale to non-positive y value");
                }
                ele._y1 = ele.y1;
                ele.y1 = Math.log(ele.y1) / Math.log(logyb);
              }
              if (ele.y2 != null) {
                if (ele.y2 <= 0) {
                  console.error("cannot apply log scale to non-positive y value");
                }
                ele._y2 = ele.y2;
                ele.y2 = Math.log(ele.y2) / Math.log(logyb);
              }
            }
          }
        }
      },
      formatSerializedData : function(newmodel, model) {
        var onzeroY = false;
        var logy = false, logyb;
        if(model.rangeAxes != null) {
          var axis = model.rangeAxes[0];
          if (axis.auto_range_includes_zero === true) { 
            onzeroY = true;
           }
          if (axis.use_log === true) {
            logy = true;
            logyb = axis.log_base == null ? 10 : axis.log_base;
          }
        }
        
        // set margin
        newmodel.margin = {};
        // set axis bound as focus
        if (model.x_auto_range === false) {
          if (model.x_lower_bound != null) { 
            newmodel.focus.xl = model.x_lower_bound; 
          }
          if (model.x_upper_bound != null) { 
            newmodel.focus.xr = model.x_upper_bound; 
          }
        } else {
          if (model.x_lower_margin != null) {
            newmodel.margin.left = model.x_lower_margin * 100.0;
          }
          if (model.x_upper_margin != null) {
            newmodel.margin.right = model.x_upper_margin * 100.0;
          }
        }
        
        if (model.rangeAxes != null) {
          var axis = model.rangeAxes[0];
          if (axis.auto_range === false) {
            if (axis.lower_bound != null) { 
              newmodel.focus.yl = axis.lower_bound; 
            }
            if (axis.upper_bound != null) { 
              newmodel.focus.yr = axis.upper_bound; 
            }
          } else {
            if (axis.lower_margin != null) {
              newmodel.margin.bottom = axis.lower_margin * 100.0;
            }
            if (axis.upper_margin != null) {
              newmodel.margin.top = axis.upper_margin * 100.0;
            }
          }
        }
        
        if (model.type === "TimePlot") {
          newmodel.xType = "time";
        }

        // scaling
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

          if (data.color != null) {
            data.color_opacity = parseInt(data.color.substr(1,2), 16) / 255;
            data.color = "#" + data.color.substr(3);
          }
          if (data.fill != null && data.fill === false) {
            data.color = "none";
          }
          if (data.outline_color != null) {
            data.stroke_opacity = parseInt(data.outline_color.substr(1,2), 16) / 255;
            data.stroke = "#" + data.outline_color.substr(3);
            delete data.outline_color;
          }
         
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
            if (data.shape == null) {
              data.shape = "DEFAULT";
            }
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
            if (data.colors != null) {
              ele.color_opacity = parseInt(data.colors[j].substr(1,2), 16) / 255;
              ele.color = "#" + data.colors[j].substr(3);
            }
            if (data.fills != null && data.fills[j] === false) {
              ele.color = "none";
            }
            if (data.outline_colors != null) {
              ele.stroke_opacity = parseInt(data.outline_colors[j].substr(1,2), 16) / 255;
              ele.stroke = "#" + data.outline_colors[j].substr(3);
            }
            
            if (data.type === "line" || data.type === "stem") {
              if (data.styles != null) {
                var style = data.styles[j];
                if (style == null) {
                  style = "";
                }
                var shape = this.lineStyleMap[style];
                ele.stroke_dasharray = this.lineDasharrayMap[shape];
              }
            }
            elements.push(ele);
          }
          
          data.elements = elements;
          
          newmodel.data.push(data);
        }
        if(model.constant_lines != null) {
          for(var i = 0; i < model.constant_lines.length; i++) {
            var line = model.constant_lines[i];
            var data = {
              "type": "constline",
              "width": line.width != null ? line.width : 1,
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
            data.elements.push(ele);
            newmodel.data.push(data);
          }
        }
        if (model.type === "NanoPlot") {
          // TODO, beaker crashes when loading long integers
          // 
          // newmodel.nanoOffset = range.xl;
        }
        
        newmodel.onzeroY = onzeroY;
      },
      cleanupModel : function(model) {
        for (var i = 0; i < model.data.length; i++) {
          var data = model.data;
          if (data.x != null) { delete data.x; }
          if (data.y != null) { delete data.y; }
          if (data.colors) { delete data.colors; }
          if (data.sizes) { delete data.sizes; }
          if (data.bases) { delete data.bases; }
          if (data.outline_colors) { delete data.outline_colors; }
        }
      },
      standardizeModel : function(model) {
        if (model.graphics_list != null) {
          model.version = "groovy";  // TODO, a hack now to check DS source
        }
        if (model.version === "complete") { // skip standardized model in combined plot
          //console.log("pass", model);
          return model;
        } else if (model.version === "groovy") {
        } else {
          model.version = "direct";
        }
        var newmodel;
        if (model.version === "groovy") {  // model returned from serializer
          newmodel = {
            type : "plot",
            title : model.chart_title != null ? model.chart_title : model.title,
            xLabel : model.domain_axis_label != null ? model.domain_axis_label : null,
            yLabel : model.y_label != null ? model.y_label : null, // ? range_axis_label ?
            xType : "ordinal",
            yType : "ordinal",
            margin : {},
            range : null,
            focus : {},
            xCursor : null,
            yCursor : null,
            showLegend : model.show_legend != null ? model.show_legend : false,
            useToolTip : model.use_tool_tip != null ? model.use_tool_tip : false,
            initSize : {
              "width" : (model.init_width != null ? model.init_width : 1200) + "px",
              "height" : (model.init_height != null ? model.init_height : 350) + "px"
            },
            nanoOffset : null,
          };
        } else {
          newmodel = {
            xLabel : model.xLabel != null ? model.xLabel : null,
            yLabel : model.yLabel != null ? model.yLabel : null,
            xScale : model.xScale != null ? model.xScale : { type: "linear" },
            yScale : model.yScale != null ? model.yScale : { type: "linear" },
            showLegend : model.showLegend != null ? model.showLegend : false,
            useToolTip : model.useToolTip != null ? model.useToolTip : false,
            xType : model.xType != null ? model.xType : "ordinal",
            yType : model.yType != null ? model.yType : "ordinal",
            margin : model.margin != null ? model.margin : {},
            range : model.range != null ? model.range : null,
            focus : model.focus != null ? model.focus : {},
            xCursor : model.xCursor,
            yCursor : model.yCursor,
            initSize : {
              "width" : (model.width != null ? model.width : 1200) + "px",
              "height": (model.height != null ? model.height : 350) + "px"
            }
          };
        }
        
        newmodel.data = [];

        if (model.version === "groovy") {
          this.formatSerializedData(newmodel, model);
        } else {  // DS generated directly
          _.extend(newmodel, model);
        }
        this.formatData(newmodel, model); // fill in null entries, compute y2, etc.
        var range = plotUtils.getDataRange(newmodel.data).datarange;
        
        var margin = newmodel.margin;
        if (margin.bottom == null) { margin.bottom = newmodel.onzeroY === true ? 0 : 5; }
        if (margin.top == null) { margin.top = 5; }
        if (margin.left == null) { margin.left = 5; }
        if (margin.right == null) { margin.right = 5; }
        
        if (newmodel.vrange == null) {
          // visible range initially is 10x larger than data range by default
          newmodel.vrange = {
            xl : range.xl - range.xspan * 10.0,
            xr : range.xr + range.xspan * 10.0,
            yl : range.yl - range.yspan * 10.0,
            yr : range.yr + range.yspan * 10.0
          };
          var vrange = newmodel.vrange;
          if (newmodel.onzeroY === true) {
            vrange.yl = 0;
          }
          vrange.xspan = vrange.xr - vrange.xl;
          vrange.yspan = vrange.yr - vrange.yl;
        }
        this.cleanupModel(newmodel);
        newmodel.version = "complete";
        console.log(newmodel);
        return newmodel;
      }
    };
  };
  beaker.bkoFactory('plotConverter', ["bkUtils", 'plotUtils', retfunc]);
})();

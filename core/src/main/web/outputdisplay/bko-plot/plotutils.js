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

(function() {
    'use strict';
    var retfunc = function(bkUtils, bkCoreManager, bkSessionManager) {
      var keyCodeMap = {
        8	  : "BACKSPACE",
        9	  : "TAB",
        13	: "ENTER",
        16	: "SHIFT",
        17	: "CTRL",
        18	: "ALT",
        19	: "PAUSE_BREAK",
        20	: "CAPS_LOCK",
        27	: "ESCAPE",
        32	: "SPACE",
        33	: "PAGE_UP",
        34	: "PAGE_DOWN",
        35	: "END",
        36	: "HOME",
        37	: "LEFT_ARROW",
        38	: "UP_ARROW",
        39	: "RIGHT_ARROW",
        40	: "DOWN_ARROW",
        45	: "INSERT",
        46	: "DELETE",
        106	: "MULTIPLY",
        107	: "ADD",
        109	: "SUBTRACT",
        110	: "DECIMAL_POINT",
        111	: "DIVIDE",
        112	: "F1",
        113	: "F2",
        114	: "F3",
        115	: "F4",
        116	: "F5",
        117	: "F6",
        118	: "F7",
        119	: "F8",
        120	: "F9",
        121	: "F10",
        122	: "F11",
        123	: "F12",
        144	: "NUM_LOCK",
        145	: "SCROLL_LOCK",
        186	: "SEMICOLON",
        187	: "EQUAL_SIGN",
        188	: "COMMA",
        189	: "DASH",
        190	: "PERIOD",
        191	: "FORWARD_SLASH",
        192	: "GRAVE_ACCENT",
        219	: "OPEN_BRACKET",
        220	: "BACK_SLASH",
        221	: "CLOSE_BRAKET",
        222	: "SINGLE_QUOTE"
      };

      function fireClickEvent(a) {
        if (document.createEvent) {
          var evObj = document.createEvent('MouseEvents');
          evObj.initEvent('click', true, false);
          a.dispatchEvent(evObj);
        } else if (document.createEventObject) {
          a.fireEvent('onclick' + evt, document.createEventObject());
        }
      }

    return {

      safeWidth: function(e){
        return bkHelper.isChrome ? this.getComputedStyle(e, 'width') : e.width();
      },
      safeHeight: function(e){
        return bkHelper.isChrome ? this.getComputedStyle(e, 'height')  : e.height();
      },
      outsideScr: function(scope, x, y) {
        var W = this.safeWidth(scope.jqsvg), H = this.safeHeight(scope.jqsvg);
        return x < 0 || x > W || y < 0 || y > H;
      },
      outsideScrBox: function(scope, x, y, w, h) {
        var W = this.safeWidth(scope.jqsvg), H = this.safeHeight(scope.jqsvg);
        return x > W || x + w < 0 || y > H || y + h < 0;
      },
      updateRange : function(datarange, itemrange) {
        if (itemrange.xl != null) { datarange.xl = this.min(datarange.xl, itemrange.xl); }
        if (itemrange.xr != null) { datarange.xr = this.max(datarange.xr, itemrange.xr); }
        if (itemrange.yl != null) { datarange.yl = Math.min(datarange.yl, itemrange.yl); }
        if (itemrange.yr != null) { datarange.yr = Math.max(datarange.yr, itemrange.yr); }
      },
      getDataRange : function(data) { // data range is in [0,1] x [0,1]
        var datarange = {
          xl : Infinity,
          xr : -Infinity,
          yl : Infinity,
          yr : -Infinity
        };
        var visibleItem = 0, legendableItem = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].legend != null && data[i].legend != "") {
            legendableItem++;
          }
          if (data[i].showItem === false) { continue; }
          visibleItem++;
          var itemrange = data[i].getRange();
          this.updateRange(datarange, itemrange);
        }
        if (datarange.xl === Infinity && datarange.xr !== -Infinity) {
          datarange.xl = datarange.xr - 1;
        } else if (datarange.xr === -Infinity && datarange.xl !== Infinity) {
          datarange.xr = datarange.xl + 1;
        } else if (visibleItem === 0 || datarange.xl === Infinity) {
          datarange.xl = 0;
          datarange.xr = 1;
        } else if (datarange.xl > datarange.xr) {
          var temp = datarange.xl;
          datarange.xl = datarange.xr;
          datarange.xr = temp;
        }
        if (datarange.yl === Infinity && datarange.yr !== -Infinity) {
          datarange.yl = datarange.yr - 1;
        } else if (datarange.yr === -Infinity && datarange.yl !== Infinity) {
          datarange.yr = datarange.yl + 1;
        }
        if (visibleItem === 0 || datarange.yl === Infinity) {
          datarange.yl = 0;
          datarange.yr = 1;
        } else if (datarange.yl > datarange.yr) {
          var temp = datarange.yl;
          datarange.yl = datarange.yr;
          datarange.yr = temp;
        }

        var self = this;
        var increaseRange = function(value) {
          return self.plus(value, self.div((value || 1), 10));
        };
        var decreaseRange = function(value){
          return self.minus(value, self.div((value || 1), 10));
        };

        if (this.eq(datarange.xl, datarange.xr)) {
          datarange.xl = decreaseRange(datarange.xl);
          datarange.xr = increaseRange(datarange.xr);
        }
        if (datarange.yl === datarange.yr) {
          datarange.yl = decreaseRange(datarange.yl);
          datarange.yr = increaseRange(datarange.yr);
        }

        datarange.xspan = this.minus(datarange.xr, datarange.xl);
        datarange.yspan = datarange.yr - datarange.yl;
        return {
          "datarange" : datarange,
          "visibleItem" : visibleItem,
          "legendableItem" : legendableItem
        };
      },
      getDefaultFocus : function(model) {
        var ret = this.getDataRange(model.data);
        var range = ret.datarange, margin = model.margin;
        if(ret.visibleItem === 0) { // for empty plot, focus needs to be adjusted
          range.xl = model.xAxis.getPercent(range.xl);
          range.xr = model.xAxis.getPercent(range.xr);
          range.yl = model.yAxis.getPercent(range.yl);
          range.yr = model.yAxis.getPercent(range.yr);
        }
        var focus = {
          xl : model.userFocus.xl,
          xr : model.userFocus.xr,
          yl : model.userFocus.yl,
          yr : model.userFocus.yr
        };

        if (focus.xl == null) {
          focus.xl = this.minus(range.xl, this.mult(range.xspan, margin.left));
        }
        if (focus.xr == null) {
          focus.xr = this.plus(range.xr, this.mult(range.xspan, margin.right));
        }
        if (focus.xl instanceof Big) {
          focus.xl = parseFloat(focus.xl.toString());
        }
        if (focus.xr instanceof Big) {
          focus.xr = parseFloat(focus.xr.toString());
        }

        if (focus.yl == null) {
          if (model.yIncludeZero === true) {
            var yl = model.vrange.yspan * range.yl + model.vrange.yl;
            if(yl > 0){
              range.yl = (0 - model.vrange.yl) / model.vrange.yspan;
              range.yspan = range.yr - range.yl;
            }
          }
          focus.yl = range.yl - range.yspan * margin.bottom;
        }
        if (focus.yr == null) {
          focus.yr = range.yr + range.yspan * margin.top;
        }
        focus.xspan = focus.xr - focus.xl;
        focus.yspan = focus.yr - focus.yl;
        var result = {};
        result.defaultFocus = focus;
        _.extend(result, _.omit(ret, "datarange"));
        return result;
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
      plotTicks: function(scope){
        scope.labelg.selectAll("line").remove();
        scope.labelg.selectAll("line")
          .data(scope.rpipeTicks, function(d) { return d.id; }).enter().append("line")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
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

      colorToHex: function(color) {

        var colors = {
          "aliceblue" : "#f0f8ff",
          "antiquewhite" : "#faebd7",
          "aqua" : "#00ffff",
          "aquamarine" : "#7fffd4",
          "azure" : "#f0ffff",
          "beige" : "#f5f5dc",
          "bisque" : "#ffe4c4",
          "black" : "#000000",
          "blanchedalmond" : "#ffebcd",
          "blue" : "#0000ff",
          "blueviolet" : "#8a2be2",
          "brown" : "#a52a2a",
          "burlywood" : "#deb887",
          "cadetblue" : "#5f9ea0",
          "chartreuse" : "#7fff00",
          "chocolate" : "#d2691e",
          "coral" : "#ff7f50",
          "cornflowerblue" : "#6495ed",
          "cornsilk" : "#fff8dc",
          "crimson" : "#dc143c",
          "cyan" : "#00ffff",
          "darkblue" : "#00008b",
          "darkcyan" : "#008b8b",
          "darkgoldenrod" : "#b8860b",
          "darkgray" : "#a9a9a9",
          "darkgreen" : "#006400",
          "darkkhaki" : "#bdb76b",
          "darkmagenta" : "#8b008b",
          "darkolivegreen" : "#556b2f",
          "darkorange" : "#ff8c00",
          "darkorchid" : "#9932cc",
          "darkred" : "#8b0000",
          "darksalmon" : "#e9967a",
          "darkseagreen" : "#8fbc8f",
          "darkslateblue" : "#483d8b",
          "darkslategray" : "#2f4f4f",
          "darkturquoise" : "#00ced1",
          "darkviolet" : "#9400d3",
          "deeppink" : "#ff1493",
          "deepskyblue" : "#00bfff",
          "dimgray" : "#696969",
          "dodgerblue" : "#1e90ff",
          "firebrick" : "#b22222",
          "floralwhite" : "#fffaf0",
          "forestgreen" : "#228b22",
          "fuchsia" : "#ff00ff",
          "gainsboro" : "#dcdcdc",
          "ghostwhite" : "#f8f8ff",
          "gold" : "#ffd700",
          "goldenrod" : "#daa520",
          "gray" : "#808080",
          "green" : "#008000",
          "greenyellow" : "#adff2f",
          "honeydew" : "#f0fff0",
          "hotpink" : "#ff69b4",
          "indianred " : "#cd5c5c",
          "indigo" : "#4b0082",
          "ivory" : "#fffff0",
          "khaki" : "#f0e68c",
          "lavender" : "#e6e6fa",
          "lavenderblush" : "#fff0f5",
          "lawngreen" : "#7cfc00",
          "lemonchiffon" : "#fffacd",
          "lightblue" : "#add8e6",
          "lightcoral" : "#f08080",
          "lightcyan" : "#e0ffff",
          "lightgoldenrodyellow" : "#fafad2",
          "lightgrey" : "#d3d3d3",
          "lightgreen" : "#90ee90",
          "lightpink" : "#ffb6c1",
          "lightsalmon" : "#ffa07a",
          "lightseagreen" : "#20b2aa",
          "lightskyblue" : "#87cefa",
          "lightslategray" : "#778899",
          "lightsteelblue" : "#b0c4de",
          "lightyellow" : "#ffffe0",
          "lime" : "#00ff00",
          "limegreen" : "#32cd32",
          "linen" : "#faf0e6",
          "magenta" : "#ff00ff",
          "maroon" : "#800000",
          "mediumaquamarine" : "#66cdaa",
          "mediumblue" : "#0000cd",
          "mediumorchid" : "#ba55d3",
          "mediumpurple" : "#9370d8",
          "mediumseagreen" : "#3cb371",
          "mediumslateblue" : "#7b68ee",
          "mediumspringgreen" : "#00fa9a",
          "mediumturquoise" : "#48d1cc",
          "mediumvioletred" : "#c71585",
          "midnightblue" : "#191970",
          "mintcream" : "#f5fffa",
          "mistyrose" : "#ffe4e1",
          "moccasin" : "#ffe4b5",
          "navajowhite" : "#ffdead",
          "navy" : "#000080",
          "oldlace" : "#fdf5e6",
          "olive" : "#808000",
          "olivedrab" : "#6b8e23",
          "orange" : "#ffa500",
          "orangered" : "#ff4500",
          "orchid" : "#da70d6",
          "palegoldenrod" : "#eee8aa",
          "palegreen" : "#98fb98",
          "paleturquoise" : "#afeeee",
          "palevioletred" : "#d87093",
          "papayawhip" : "#ffefd5",
          "peachpuff" : "#ffdab9",
          "peru" : "#cd853f",
          "pink" : "#ffc0cb",
          "plum" : "#dda0dd",
          "powderblue" : "#b0e0e6",
          "purple" : "#800080",
          "red" : "#ff0000",
          "rosybrown" : "#bc8f8f",
          "royalblue" : "#4169e1",
          "saddlebrown" : "#8b4513",
          "salmon" : "#fa8072",
          "sandybrown" : "#f4a460",
          "seagreen" : "#2e8b57",
          "seashell" : "#fff5ee",
          "sienna" : "#a0522d",
          "silver" : "#c0c0c0",
          "skyblue" : "#87ceeb",
          "slateblue" : "#6a5acd",
          "slategray" : "#708090",
          "snow" : "#fffafa",
          "springgreen" : "#00ff7f",
          "steelblue" : "#4682b4",
          "tan" : "#d2b48c",
          "teal" : "#008080",
          "thistle" : "#d8bfd8",
          "tomato" : "#ff6347",
          "turquoise" : "#40e0d0",
          "violet" : "#ee82ee",
          "wheat" : "#f5deb3",
          "white" : "#ffffff",
          "whitesmoke" : "#f5f5f5",
          "yellow" : "#ffff00",
          "yellowgreen" : "#9acd32"
        };
        if (typeof colors[color.toLowerCase()] != null)
            return colors[color.toLowerCase()];
        return null;
      },

      createColor : function(hexstr, opacity) {
        if (hexstr == null) {
          hexstr = "#000000";
        }
        if (hexstr[0] !== "#") {
          hexstr = this.colorToHex(hexstr);
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
          return bkUtils.formatTimestamp(val, axis.axisTimezone, "YYYY MMM DD ddd, HH:mm:ss .SSS");
        }
        if (axis.axisType === "nanotime") {
          var d = parseFloat(val.div(1000000).toFixed(0));
          var nanosec = val.mod(1000000000).toFixed(0);
          return bkUtils.formatTimestamp(d, axis.axisTimezone, "YYYY MMM DD ddd, HH:mm:ss") + "." + this.padStr(nanosec, 9);
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
        _.each(obj, function(value, key) {
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
        _.each(list, function(e, i){
          if (Math.abs(e) > 1E6) {
            console.error("data not shown due to too large coordinate");
            return true;
          }
        });
        return false;
      },

      useYAxisR: function(model, data) {
        var yAxisR = model.yAxisR;
        return yAxisR && yAxisR.label === data.yAxis;
      },

      getHighlightedDiff: function(highlighted) {
        return highlighted ? 2 : 0;
      },

      getHighlightedSize: function(size, highlighted) {
        return size + this.getHighlightedDiff(highlighted);
      },

      getHighlightDuration: function() {
        return 100;
      },

      getElementStyles: function(element) {
        var elementStyles = "";
        var styleSheets = document.styleSheets;
        for (var i = 0; i < styleSheets.length; i++) {
          var cssRules = styleSheets[i].cssRules;
          for (var j = 0; j < cssRules.length; j++) {
            var cssRule = cssRules[j];
            if (cssRule.style) {
              try {
                var childElements = element.querySelectorAll(cssRule.selectorText);
                if (childElements.length > 0 || element.matches(cssRule.selectorText)) {
                  elementStyles += cssRule.selectorText + " { " + cssRule.style.cssText + " }\n";
                }
              } catch (err) {
                //just ignore errors
                //http://bugs.jquery.com/ticket/13881#comment:1
              }
            }
          }
        }
        return elementStyles;
      },

      addInlineStyles: function(element) {
        var styleEl = document.createElement('style');
        styleEl.setAttribute('type', 'text/css');
        var elementStyles = this.getElementStyles(element);
        elementStyles += this.getFontToInject({
          fontFamily: 'pt-sans',
          urlformats: {'app/fonts/regular/pts55f-webfont.woff' : 'woff'},
          fontWeight: 'normal',
          fontStyle: 'normal'
        });
        elementStyles += this.getFontToInject({
          fontFamily: 'pt-sans',
          urlformats: {'app/fonts/bold/pts75f-webfont.woff' : 'woff'},
          fontWeight: 'bold',
          fontStyle: 'normal'
        });

        styleEl.innerHTML = '<![CDATA[\n' + elementStyles + '\n]]>';
        var defsEl = document.createElement('defs');
        defsEl.appendChild(styleEl);
        element.insertBefore(defsEl, element.firstChild);
      },

      download: function(url, fileName) {
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        fireClickEvent(a);
        a.remove();
      },

      translate: function(jqelement, x, y) {
        var getNumber = function(str) {
          return parseFloat(str.substring(0, str.length - 2));
        };
        var transform = jqelement.css('transform');
        var elementTranslate = {x: 0, y: 0};
        if (transform && transform.indexOf("translate") != -1) {
          var translate = transform.match(/translate(.*)/)[1].substring(1);
          var translateValues = translate.substring(0, translate.indexOf(')')).split(", ");
          elementTranslate.x = getNumber(translateValues[0]);
          elementTranslate.y = getNumber(translateValues[1]);
        }
        jqelement.css("transform", "translate(" + (elementTranslate.x + x) + "px, " + (elementTranslate.y + y) + "px)")
      },

      translateChildren: function(element, x, y) {
        for (var j = 0; j < element.childElementCount; j++) {
          var child = element.children[j];
          if (child.nodeName.toLowerCase() !== 'defs') {
            this.translate($(child), x, y);
          }
        }
      },

      addTitleToSvg: function(svg, jqtitle, titleSize) {
        d3.select(svg).insert("text", "g")
          .attr("id", jqtitle.attr("id"))
          .attr("class", jqtitle.attr("class"))
          .attr("x", titleSize.width / 2)
          .attr("y", titleSize.height)
          .style("text-anchor", "middle")
          .text(jqtitle.text());
      },

      drawPng: function(canvas, imgsrc, fileName) {
        var download = this.download;
        var context = canvas.getContext("2d");
        var image = new Image;
        image.src = imgsrc;
        image.onload = function() {
          context.drawImage(image, 0, 0);
          download(canvas.toDataURL("image/png"), fileName);
          context.clearRect(0, 0, canvas.width, canvas.height);
        };
      },

      outerHeight: function (e, includeMargin) {
        if (!e || e.length === 0)
          return null;
        return this.getComputedStyle(e, 'height')
        + this.getComputedStyle(e, 'padding-top') + this.getComputedStyle(e, 'padding-bottom')
        + this.getComputedStyle(e, 'border-top') + this.getComputedStyle(e, 'border-bottom')
        + ((includeMargin === true ) ? this.getComputedStyle(e, 'margin-top') + this.getComputedStyle(e, 'margin-bottom') : 0);

      },

      outerWidth: function (e, includeMargin) {
        if (!e || e.length === 0)
          return null;
        return this.getComputedStyle(e, 'width')
        + this.getComputedStyle(e, 'padding-left') + this.getComputedStyle(e, 'padding-right')
        + this.getComputedStyle(e, 'border-left') + this.getComputedStyle(e, 'border-right')
        + ((includeMargin === true ) ? this.getComputedStyle(e, 'margin-left') + this.getComputedStyle(e, 'margin-right') : 0);
      },

      getComputedStyle: function(e, style, defaultValue) {
        if (!e || e.length === 0)
          return null;
        defaultValue = defaultValue || 0;
        var getValue = function(e){
          var value = window.getComputedStyle(e.get()[0], null).getPropertyValue(style).match(/\d+/);
          if (!value || value.length === 0 )
            return '';
          return value[0];
        };
        var hiddenParent = e.parents(".ng-hide:first");
        var value;
        if (hiddenParent.length === 0) {
          value = getValue(e);
        }else{
          hiddenParent.removeClass("ng-hide");
          value = getValue(e);
          hiddenParent.addClass("ng-hide");
        }
        return parseInt(value) || defaultValue;
      },

      getActualCss: function(jqelement, jqFunction, jqFunctionParams) {
        //to get actual size/position/etc values of hidden elements
        var value;
        if (jqelement.is(":visible")) {
          value = jqFunctionParams != null ? jqelement[jqFunction](jqFunctionParams) : jqelement[jqFunction]();
        } else {
          var hiddenParent = jqelement.parents(".ng-hide:first");
          hiddenParent.removeClass("ng-hide");
          value = jqFunctionParams != null ? jqelement[jqFunction](jqFunctionParams) : jqelement[jqFunction]();
          hiddenParent.addClass("ng-hide");
        }
        return value;
      },

      convertToXHTML: function (html) {
        return html.replace(/input[^>]+"/g, "$&" + '/');
      },

      base64Fonts: {},

      getFontToInject: function(font) {
        var src = '';
        for (var url in font.urlformats) {
          if (font.urlformats.hasOwnProperty(url)) {
            var format = font.urlformats[url];
            if (this.base64Fonts[url] == null) {
              this.base64Fonts[url] = bkHelper.base64Encode(this.getFileSynchronously(url));
      }
            src += "url('data:application/font-" + format + ";charset=utf-8;base64," + this.base64Fonts[url] + "') format('" + format + "'), ";
          }
        }
        src = src.replace(/,\s*$/, "");
        return '@font-face' + " { " +
          "font-family: '" + font.fontFamily + "';" +
          "src: " + src + ";" +
          "font-weight: " + font.fontWeight + ";" +
          "font-style: " + font.fontStyle + ";" +
          " }\n";
      },

      getFileSynchronously: function(file) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", file, false);
        xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.send(null);
        return xhr.responseText;
      },

      //ideas and some code - from d3 library(d3.layout.histogram)
      histogram: function () {

        var rightClose = false, binCount, rangeMin, rangeMax;

        var calcRange = function (values) {
          if (rangeMin !== undefined && rangeMax !== undefined) {
            return [rangeMin, rangeMax];
          } else if (rangeMin !== undefined) {
            return [rangeMin, d3.max(values)];
          } else if (rangeMax !== undefined) {
            return [d3.min(values), rangeMax];
          }
          return [d3.min(values), d3.max(values)];
        };

        var calcThresholds = function (range, values) {
          var n = binCount !== undefined ?
            binCount :
            Math.ceil(Math.log(values.length) / Math.LN2 + 1);
          var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
          while (++x <= n) f[x] = m * x + b;

          if (rightClose) {
            f.splice(0, 0, range[0] - m);
          }

          return f;
        };

        function histogram(data) {
          var bins = [],
            values = data.map(Number, this),
            range = calcRange(values),
            thresholds = calcThresholds(range, values),
            bin, i = -1,
            n = values.length,
            m = thresholds.length - 1,
            k = 1,
            x;

          while (++i < m) {
            bin = bins[i] = [];
            bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
            bin.y = 0;
          }
          if (m > 0) {
            i = -1;
            while (++i < n) {
              x = values[i];
              if (x >= range[0] && x <= range[1]) {
                bin = rightClose ?
                  bins[d3.bisectLeft(thresholds, x, 1, m) - 1] :
                  bins[d3.bisect(thresholds, x, 1, m) - 1];
                bin.y += k;
                bin.push(data[i]);
              }
            }
          }
          return bins;
        }

        histogram.rangeMin = function (x) {
          rangeMin = x;
          return histogram;
        };
        histogram.rangeMax = function (x) {
          rangeMax = x;
          return histogram;
        };
        histogram.binCount = function (x) {
          binCount = x;
          return histogram;
        };
        histogram.rightClose = function (x) {
          rightClose = x;
          return histogram;
        };

        return histogram;
      },

      fonts: {
        labelWidth : 6,
        labelHeight : 12,
        tooltipWidth : 10
      },

      padStr: function(val, len) {
        var str = "" + Math.abs(val);
        while (str.length < len) str = "0" + str;
        return str;
      },

      max: function(n1, n2){
        if (n1 instanceof Big || n2 instanceof Big) {
          if(n1 == -Infinity){
            return n2;
          }
          if(n2 == -Infinity){
            return n1;
          }
          return n1.gt(n2) ? n1 : n2;
        } else {
          return Math.max(n1, n2);
        }
      },
      min: function(n1, n2){
        if (n1 instanceof Big || n2 instanceof Big) {
          if(n1 == Infinity){
            return n2;
          }
          if(n2 == Infinity){
            return n1;
          }
          return n1.lt(n2) ? n1 : n2;
        } else {
          return Math.min(n1, n2);
        }
      },

      eq: function(n1, n2){
        return n1 instanceof Big ? n1.eq(n2) : n1 === n2;
      },

      lt: function(n1, n2){
        return n1 instanceof Big ? n1.lt(n2) : n1 < n2;
      },

      lte: function(n1, n2){
        return n1 instanceof Big ? n1.lte(n2) : n1 <= n2;
      },

      gt: function(n1, n2){
        return n1 instanceof Big ? n1.gt(n2) : n1 > n2;
      },

      gte: function(n1, n2){
        return n1 instanceof Big ? n1.gte(n2) : n1 >= n2;
      },

      plus: function(n1, n2){
        return n1 instanceof Big ? n1.plus(n2) : n1 + n2;
      },
      minus: function(n1, n2){
        return n1 instanceof Big ? n1.minus(n2) : n1 - n2;
      },
      mult: function(n1, n2){
        return n1 instanceof Big ? n1.times(n2) : n1 * n2;
      },
      div: function(n1, n2){
        return n1 instanceof Big ? n1.div(n2) : n1 / n2;
      },
      convertInfinityValue: function (value) {
        if(value === "Infinity"){
          return Infinity;
        }
        if(value === "-Infinity"){
          return -Infinity;
        }
        return value;
      },

      createNiceColor: function (n) {
        var hue = n * 157.5 / 360;
        var saturation = 0.75 + Math.cos(n) / 4;
        var value = 7/8 + Math.cos(n/5.1) / 8;

        var rgb = this.hsvToRgb(hue, saturation, value);
        return bkUtils.rgbaToHex(rgb[0], rgb[1], rgb[2]);
      },

      //http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
      hsvToRgb : function(h,s,v){
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch(i % 6){
          case 0: r = v, g = t, b = p; break;
          case 1: r = q, g = v, b = p; break;
          case 2: r = p, g = v, b = t; break;
          case 3: r = p, g = q, b = v; break;
          case 4: r = t, g = p, b = v; break;
          case 5: r = v, g = p, b = q; break;
        }

        return [r * 255, g * 255, b * 255];
      },

      getDefaultColor: function (i) {
        var themeColors = bkHelper.defaultPlotColors[bkHelper.getTheme()];
        return i < themeColors.length ? themeColors[i] : this.createNiceColor(i);
      },
      evaluateTagCell: function (tag) {
        var cellOp = bkSessionManager.getNotebookCellOp();
        var result;
        if (cellOp.hasUserTag(tag)) {
          result = cellOp.getCellsWithUserTag(tag);
          bkCoreManager.getBkApp().evaluateRoot(result)
            .catch(function () {
              console.log('Evaluation failed: ' + tag);
            });
        }
      },
      getActionObject: function (plotType, e, subplotIndex) {
        var actionObject = {};
        if (plotType === "CategoryPlot") {
          if(e.ele != null){
            actionObject.category = e.ele.category;
            actionObject.series = e.ele.series;
            actionObject["@type"] = "categoryActionObject";
          }
        } else {
          if(plotType === "CombinedPlot") {
            actionObject.subplotIndex = subplotIndex;
            actionObject["@type"] =  "combinedActionObject";
          } else {
            actionObject["@type"] = "xyActionObject";
          }
          if(e.ele != null){
            actionObject.index = e.ele.index;
          }
        }
        return actionObject;
      },
      getKeyCodeConstant: function(keyCode){
        if(keyCode > 46 && keyCode < 90) {
          return String.fromCharCode(keyCode).toUpperCase();
        } else {
          return keyCodeMap[keyCode];
        }
      },
      getSavePlotAsContextMenuItems: function (scope) {
        return [
          {
            name: 'Save as PNG',
            callback: function () {
              scope.saveAsPng();
            }
          },
          {
            name: 'Save as SVG',
            callback: function () {
              scope.saveAsSvg();
            }
          }
        ];
      }
    };
  };
  beakerRegister.bkoFactory('plotUtils', ["bkUtils", "bkCoreManager", "bkSessionManager", retfunc]);
})();

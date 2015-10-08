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
        if (visibleItem === 0 || datarange.xl === Infinity) {
          datarange.xl = 0;
          datarange.xr = 1;
        }
        if (visibleItem === 0 || datarange.yl === Infinity) {
          datarange.yl = 0;
          datarange.yr = 1;
        }

        var increaseRange = function(value){
          return value + (value || 1) / 10;
        };
        var decreaseRange = function(value){
          return value - (value || 1) / 10;
        };

        if(datarange.xl === datarange.xr){
          datarange.xl = decreaseRange(datarange.xl);
          datarange.xr = increaseRange(datarange.xr);
        }
        if(datarange.yl === datarange.yr) {
          datarange.yl = decreaseRange(datarange.yl);
          datarange.yr = increaseRange(datarange.yr);
        }

        datarange.xspan = datarange.xr - datarange.xl;
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
        var focus = {
          xl : model.userFocus.xl,
          xr : model.userFocus.xr,
          yl : model.userFocus.yl,
          yr : model.userFocus.yr
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
        var result = {};
        result.defaultFocus = focus;
        _(result).extend(_.omit(ret, "datarange"));
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
          if (Math.abs(e) > 1E6) {
            console.error("data not shown due to too large coordinate");
            return true;
          }
        });
        return false;
      },

      useYAxisR : function(model, data){
        var yAxisR = model.yAxisR;
        return yAxisR && yAxisR.label === data.yAxis;
      },

      getHighlightedSize : function(size, highlighted) {
        return highlighted ? size + 2 : size;
      },

      getHighlightDuration : function() {
        return 100;
      },

      getElementStyles : function(element){
        var elementStyles = "";
        var styleSheets = document.styleSheets;
        for (var i = 0; i < styleSheets.length; i++) {
          var cssRules = styleSheets[i].cssRules;
          for (var j = 0; j < cssRules.length; j++) {
            var cssRule = cssRules[j];
            if (cssRule.style) {
              try{
                var childElements = element.querySelectorAll(cssRule.selectorText);
                if (childElements.length > 0 || element.matches(cssRule.selectorText)) {
                  elementStyles += cssRule.selectorText + " { " + cssRule.style.cssText + " }\n";
                }
              } catch(err) {
                //just ignore errors
                //http://bugs.jquery.com/ticket/13881#comment:1
              }
            }
          }
        }
        return elementStyles;
      },

      addInlineStyles: function (element){
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

      download: function(url, fileName){
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        a.remove();
      },

      translate: function(jqelement, x, y){
        var getNumber = function(str){
          return parseFloat(str.substring(0, str.length - 2));
        };
        var transform = jqelement.css('transform');
        var elementTranslate = { x: 0, y: 0 };
        if(transform && transform.indexOf("translate") != -1){
          var translate = transform.match(/translate(.*)/)[1].substring(1);
          var translateValues = translate.substring(0, translate.indexOf(')')).split(", ");
          elementTranslate.x = getNumber(translateValues[0]);
          elementTranslate.y = getNumber(translateValues[1]);
        }
        jqelement.css("transform", "translate(" + (elementTranslate.x + x) + "px, " + (elementTranslate.y + y) + "px)")
      },

      translateChildren: function(element, x, y){
        for (var j = 0; j < element.childElementCount; j++) {
          var child = element.children[j];
          if (child.nodeName.toLowerCase() !== 'defs') {
            this.translate($(child), x, y);
          }
        }
      },

      addTitleToSvg: function(svg, jqtitle, titleSize){
        d3.select(svg).insert("text", "g")
          .attr("id", jqtitle.attr("id"))
          .attr("class", jqtitle.attr("class"))
          .attr("x", titleSize.width / 2)
          .attr("y", titleSize.height)
          .style("text-anchor", "middle")
          .text(jqtitle.text());
      },

      drawPng: function(canvas, imgsrc, fileName){
        var download = this.download;
        var context = canvas.getContext("2d");
        var image = new Image;
        image.src = imgsrc;
        image.onload = function () {
          context.drawImage(image, 0, 0);
          download(canvas.toDataURL("image/png"), fileName);
          context.clearRect(0, 0, canvas.width, canvas.height);
        };
      },

      getElementActualHeight: function(jqelement, withMargins){
        var height;
        if (jqelement.is(":visible")) {
          height = jqelement.outerHeight(!!withMargins);
        } else {
          var hiddenParent = jqelement.parents(".ng-hide:first");
          hiddenParent.removeClass("ng-hide");
          height = jqelement.outerHeight(!!withMargins);
          hiddenParent.addClass("ng-hide");
        }
        return height;
      },

      base64Fonts: {},

      getFontToInject: function(font) {
        var defer = bkUtils.newDeferred();
        var src = '';
        for (var url in font.urlformats) {
          if (font.urlformats.hasOwnProperty(url)) {
            var format = font.urlformats[url];
            if (this.base64Fonts[url] == null) {
              this.base64Fonts[url] = this.base64Encode(this.getFileSynchronously(url));
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
        return defer.promise;
      },

      //http://stackoverflow.com/questions/7370943/retrieving-binary-file-content-using-javascript-base64-encode-it-and-reverse-de
      base64Encode: function(str) {
        var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var out = "", i = 0, len = str.length, c1, c2, c3;
        while (i < len) {
          c1 = str.charCodeAt(i++) & 0xff;
          if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
          }
          c2 = str.charCodeAt(i++);
          if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += CHARS.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
          }
          c3 = str.charCodeAt(i++);
          out += CHARS.charAt(c1 >> 2);
          out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
          out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
          out += CHARS.charAt(c3 & 0x3F);
        }
        return out;
      },

      getFileSynchronously: function(file) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", file, false);
        xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.send(null);
        return xhr.responseText;
      }

    };
  };
  beaker.bkoFactory('plotUtils', ["bkUtils", retfunc]);
})();

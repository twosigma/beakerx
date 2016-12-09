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

(function () {
  'use strict';
  beakerRegister.bkoFactory('cellHighlighters', [
    'bkUtils',
    'GLOBALS',
    function (bkUtils,
              GLOBALS) {
      ///////////////constants///////////////
      var HIGHLIGHT_STYLE = {
        FULL_ROW: 'FULL_ROW',
        SINGLE_COLUMN: 'SINGLE_COLUMN'
      };
      ///////////////constants///////////////

      var getValue = function (obj, value, defaultValue) {
        return obj[value] != null ? obj[value] : defaultValue;
      };

      ///////////////colors///////////////
      var formatColor = function (hexColor) {
        //remove alpha
        return hexColor.length > 7 ? '#' + hexColor.substr(3) : hexColor;
      };
      var rgbToHex = function (r, g, b) {
        return formatColor(bkUtils.rgbaToHex(r, g, b));
      };
      var DEFAULT_COLORS = {};
      DEFAULT_COLORS[GLOBALS.THEMES.DEFAULT] = {
        red: rgbToHex(241, 88, 84),
        blue: rgbToHex(93, 165, 218),
        green: rgbToHex(96, 189, 104)
      };
      DEFAULT_COLORS[GLOBALS.THEMES.AMBIANCE] = {
        red: rgbToHex(191, 39, 31),
        blue: rgbToHex(46, 119, 191),
        green: rgbToHex(75, 160, 75)
      };
      var getDefaultColor = function (color) {
        return DEFAULT_COLORS[bkHelper.getTheme()][color];
      };
      ///////////////colors///////////////

      ///////////////Base Highlighter///////////////
      var CellHighlighter = function (data) {
        if (!data) { data = {}; }
        _.extend(this, {
          style: getValue(data, 'style', HIGHLIGHT_STYLE.SINGLE_COLUMN),
          colInd: data.colInd,
          type: data.type,
        });
        this.removeHighlight = function (table) {
          var self = this;
          table.column(this.colInd).nodes().each(function (td) {
            var nodeToHighlight = self.style === HIGHLIGHT_STYLE.SINGLE_COLUMN ?
              $(td) : $(table.row(table.cell(td).index().row).node()).find('td');
            nodeToHighlight.css({'background-color': ''});
          });
        };
      };
      ///////////////Base Highlighter///////////////

      ///////////////Heatmap Highlighter///////////////
      var HeatmapHighlighter = function (data) {
        if (!data) { data = {}; }
        CellHighlighter.call(this, data);
        _.extend(this, {
          type: 'HeatmapHighlighter',
          minVal: data.minVal,
          maxVal: data.maxVal,
          minColor: formatColor(getValue(data, 'minColor', getDefaultColor('blue'))),
          maxColor: formatColor(getValue(data, 'maxColor', getDefaultColor('red')))
        });

        this.colorScale = function (min, max) {
          return d3.scaleLinear().domain([min, max]).range([this.minColor, this.maxColor]);
        };

        this.doHighlight = function (table) {
          var data = table.column(this.colInd).data();
          if (this.minVal == null) {
            this.minVal = getValue(data, 'minVal', data.min());
          }
          if (this.maxVal == null) {
            this.maxVal = getValue(data, 'maxVal', data.max());
          }
          var colorScaleFunction = this.colorScale(this.minVal, this.maxVal);

          var self = this;
          table.column(self.colInd).nodes().each(function (td) {
            var value = $(td).text();
            if ($.isNumeric(value)) {
              var color = colorScaleFunction(value);
              var nodeToHighlight = self.style === HIGHLIGHT_STYLE.SINGLE_COLUMN ?
                $(td) : $(table.row(table.cell(td).index().row).node()).find('td');
              nodeToHighlight.css({
                'background-color': color
              });
            }
          });
        };
      };
      ///////////////Heatmap Highlighter///////////////

      //////////ThreeColorHeatmap Highlighter//////////
      var ThreeColorHeatmapHighlighter = function (data) {
        if (!data) { data = {}; }
        HeatmapHighlighter.call(this, data);
        _.extend(this, {
          type: 'ThreeColorHeatmapHighlighter',
          midVal: data.midVal,
          midColor: formatColor(data.midColor)
        });
        this.colorScale = function (min, max) {
          if (this.midVal == null) {
            this.midVal = (min + max) / 2;
          }
          return d3.scaleLinear(min, max).domain([min, this.midVal, max]).range([this.minColor, this.midColor, this.maxColor]);
        };
      };
      //////////ThreeColorHeatmap Highlighter//////////

      //////////UniqueEntriesHighlighter//////////
      var UniqueEntriesHighlighter = function (data) {
        if (!data) { data = {}; }
        CellHighlighter.call(this, data);
        _.extend(this, {
          type: 'UniqueEntriesHighlighter'
        });

        var generateColor = function (colorNum, colors) {
          return "hsl(" + (colorNum * (360 / colors)) + ", 75%, 85%)";
        };

        var findUniqueValues = function (colData) {
          return colData.unique().toArray();
        };

        this.doHighlight = function (table) {
          var uniqueValues = findUniqueValues(table.column(this.colInd).data());
          var uniqueColors = {};
          _.forEach(uniqueValues, function(value, index){
            uniqueColors[value] = generateColor(index, uniqueValues.length);
          });
          var self = this;
          table.column(self.colInd).nodes().each(function (td) {
            var value = table.cell(td).data();
            if ($.isNumeric(value)) {
              var color = uniqueColors[value];
              var nodeToHighlight = self.style === HIGHLIGHT_STYLE.SINGLE_COLUMN ?
                $(td) : $(table.row(table.cell(td).index().row).node()).find('td');
              nodeToHighlight.css({
                'background-color': color
              });
            }
          });
        };
      };
      //////////UniqueEntriesHighlighter//////////

      ///////////////Value Highlighter///////////////
      var ValueHighlighter = function (data) {
        if (!data) { data = {}; }
        CellHighlighter.call(this, data);
        _.extend(this, {
          colors: data.colors,
          type: 'ValueHighlighter',
          style: HIGHLIGHT_STYLE.SINGLE_COLUMN
        });
        this.doHighlight = function (table) {
          var self = this;
          table.column(self.colInd).nodes().each(function (td) {
            var index = table.cell(td).index();
            var color = self.colors[index.row];
            if(color){
              $(td).css({
                'background-color': formatColor(color)
              });
            }
          });
        };
      };
      ///////////////Value Highlighter///////////////

      return {
        HeatmapHighlighter: HeatmapHighlighter,
        ThreeColorHeatmapHighlighter: ThreeColorHeatmapHighlighter,
        createHighlighter: function (type, data) {
          switch (type) {
            case 'HeatmapHighlighter':
              return new HeatmapHighlighter(data);
            case 'ThreeColorHeatmapHighlighter':
              return new ThreeColorHeatmapHighlighter(data);
            case 'UniqueEntriesHighlighter':
              return new UniqueEntriesHighlighter(data);
            case 'ValueHighlighter':
              return new ValueHighlighter(data);
          }
        }
      }
    }]);
})();

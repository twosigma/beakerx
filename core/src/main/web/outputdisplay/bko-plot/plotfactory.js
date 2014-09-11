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
  var retfunc = function(PlotAxis, PlotLine, PlotBar, PlotStem, PlotArea, PlotPoint,
    PlotConstline, PlotConstband, PlotText,
    PlotLineLodLoader, PlotBarLodLoader, PlotStemLodLoader, PlotAreaLodLoader,
    PlotPointLodLoader) {
    var lodthresh = 300;
    return {
      createPlotItem : function(item) {
        var size = item.elements.length;
        var plotitem;
        switch (item.type) {
          case "line":
            plotitem = size >= lodthresh ?
              new PlotLineLodLoader(item, lodthresh) : new PlotLine(item);
            break;
          case "bar":
            plotitem = size >= lodthresh ?
              new PlotBarLodLoader(item, lodthresh) : new PlotBar(item);
            break;
          case "stem":
            plotitem = size >= lodthresh ?
              new PlotStemLodLoader(item, lodthresh) : new PlotStem(item);
            break;
          case "area":
            plotitem = size >= lodthresh ?
              new PlotAreaLodLoader(item, lodthresh) : new PlotArea(item);
            break;
          case "point":
            plotitem = size >= lodthresh ?
              new PlotPointLodLoader(item, lodthresh) : new PlotPoint(item);
            break;
          case "constline":
            plotitem = new PlotConstline(item);
            break;
          case "constband":
            plotitem = new PlotConstband(item);
            break;
          case "text":
            plotitem = new PlotText(item);
            break;
          default:
            console.error("no type specified for item creation");
        }
        return plotitem;
      },

      recreatePlotItem : function(item) {
        switch (item.type) {
          case "line":
            if (item.isLodItem === true) {
              item.__proto__ = PlotLineLodLoader.prototype;
            } else {
              item.__proto__ = PlotLine.prototype;
            }
            break;
          case "bar":
            if (item.isLodItem === true) {
              item.__proto__ = PlotBarLodLoader.prototype;
            } else {
              item.__proto__ = PlotBar.prototype;
            }
            break;
          case "stem":
          if (item.isLodItem === true) {
              item.__proto__ = PlotStemLodLoader.prototype;
            } else {
              item.__proto__ = PlotStem.prototype;
            }
            break;
          case "area":
            if (item.isLodItem === true) {
              item.__proto__ = PlotAreaLodLoader.prototype;
            } else {
              item.__proto__ = PlotArea.prototype;
            }
            break;
          case "point":
            if (item.isLodItem === true) {
              item.__proto__ = PlotPointLodLoader.prototype;
            } else {
              item.__proto__ = PlotPoint.prototype;
            }
            break;
          case "constline":
            item.__proto__ = PlotConstline.prototype;
            break;
          case "constband":
            item.__proto__ = PlotConstband.prototype;
            break;
          case "text":
            item.__proto__ = PlotText.prototype;
            break;
          case "axis":
            item.__proto__ = PlotAxis.prototype;
            break;
          default:
            console.error("no type specified for item recreation");
        }
      }
    };
  };
  beaker.bkoFactory('plotFactory',
    ['PlotAxis', 'PlotLine', 'PlotBar', 'PlotStem', 'PlotArea', 'PlotPoint',
     'PlotConstline', 'PlotConstband', 'PlotText',
     'PlotLineLodLoader', 'PlotBarLodLoader', 'PlotStemLodLoader', 'PlotAreaLodLoader',
     'PlotPointLodLoader',
      retfunc]);
})();

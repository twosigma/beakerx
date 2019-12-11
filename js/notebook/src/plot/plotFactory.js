/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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


define([
  './std/plotline',
  './std/plotarea',
  './std/plotconstband',
  './std/plotconstline',
  './std/plottext',
  './std/plotraster',
  './std/heatmap',
  './std/plotbar',
  './std/plotpoint',
  './std/plotstem',
  './std/plottreemapnode',
  './lodloader/plotLineLodLoader',
  './lodloader/plotBarLodLoader',
  './lodloader/plotStemLodLoader',
  './lodloader/plotAreaLodLoader',
  './lodloader/plotPointLodLoader'
], function(
  PlotLine,
  PlotArea,
  PlotConstband,
  PlotConstline,
  PlotText,
  PlotRaster,
  HeatMap,
  PlotBar,
  PlotPoint,
  PlotStem,
  PlotTreeMapNode,
  PlotLineLodLoader,
  PlotBarLodLoader,
  PlotStemLodLoader,
  PlotAreaLodLoader,
  PlotPointLodLoader
) {
  const TimeAxis = require("./std/axis/TimeAxis").default;
  const BigNumberUtils = require("beakerx_shared/lib/utils/BigNumberUtils").default;

  var plotFactory = {
    createPlotItem : function(item, lodthresh) {
      if (!lodthresh){
        lodthresh = 1500;
      }
      var size = item.elements ?  item.elements.length : 0;
      var shouldApplyLod = size >= lodthresh;
      if (shouldApplyLod) {
        var eles = item.elements;
        for (var j = 1; j < eles.length; j++) {
          if (BigNumberUtils.lt(eles[j].x, eles[j - 1].x)) {
            console.warn("x values are not monotonic, LOD is disabled");
            shouldApplyLod = false;
            break;
          }
        }
      }
      var plotitem;
      switch (item.type) {
        case "line":
          plotitem = shouldApplyLod ?
            new PlotLineLodLoader(item, lodthresh) : new PlotLine(item);
          break;
        case "bar":
          plotitem = shouldApplyLod ?
            new PlotBarLodLoader(item, lodthresh) : new PlotBar(item);
          break;
        case "stem":
          plotitem = shouldApplyLod ?
            new PlotStemLodLoader(item, lodthresh) : new PlotStem(item);
          break;
        case "area":
          plotitem = shouldApplyLod ?
            new PlotAreaLodLoader(item, lodthresh) : new PlotArea(item);
          break;
        case "point":
          plotitem = shouldApplyLod ?
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
        case "treemapnode":
          plotitem = new PlotTreeMapNode(item);
          break;
        case "heatmap":
          plotitem = new HeatMap(item);
          break;
        case "raster":
          plotitem = new PlotRaster(item);
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
          item.__proto__ = TimeAxis.prototype;
          break;
        case "treemapnode":
          item.__proto__ = PlotTreeMapNode.prototype;
          break;
        case "raster":
          item.__proto__ = PlotRaster.prototype;
          break;
        default:
          console.error("no type specified for item recreation");
      }
    }
  };

  return plotFactory;
});
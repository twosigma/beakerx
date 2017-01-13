define([
  'nbextensions/beaker/plot/std/plotline',
  'nbextensions/beaker/plot/std/plotarea',
  'nbextensions/beaker/plot/std/plotaxis',
  'nbextensions/beaker/plot/std/plotconstband',
  'nbextensions/beaker/plot/std/plotconstline',
  'nbextensions/beaker/plot/std/plottext',
  'nbextensions/beaker/plot/std/heatmap',
  'nbextensions/beaker/plot/std/plotbar',
  'nbextensions/beaker/plot/std/plotpoint',
  'nbextensions/beaker/plot/std/plotstem',
  'nbextensions/beaker/plot/std/plottreemapnode',
  'nbextensions/beaker/plot/plotUtils',
  'nbextensions/beaker/plot/lodloader/plotLineLodLoader',
  'nbextensions/beaker/plot/lodloader/plotBarLodLoader',
  'nbextensions/beaker/plot/lodloader/plotStemLodLoader',
  'nbextensions/beaker/plot/lodloader/plotAreaLodLoader',
  'nbextensions/beaker/plot/lodloader/plotPointLodLoader'
], function(
  PlotLine,
  PlotArea,
  PlotAxis,
  PlotConstband,
  PlotConstline,
  PlotText,
  HeatMap,
  PlotBar,
  PlotPoint,
  PlotStem,
  PlotTreeMapNode,
  plotUtils,
  PlotLineLodLoader,
  PlotBarLodLoader,
  PlotStemLodLoader,
  PlotAreaLodLoader,
  PlotPointLodLoader
) {
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
          if (plotUtils.lt(eles[j].x, eles[j - 1].x)) {
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
        case "treemapnode":
          item.__proto__ = PlotTreeMapNode.prototype;
          break;
        default:
          console.error("no type specified for item recreation");
      }
    }
  };

  return plotFactory;
});
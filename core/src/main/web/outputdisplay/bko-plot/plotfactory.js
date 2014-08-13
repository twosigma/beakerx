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
  var retfunc = function(PlotLine, PlotBar, PlotStem, PlotArea, PlotPoint,
    PlotConstline, PlotConstband, PlotText) {
    return {
      createPlotItem : function(item) {
        var plotitem;
        switch (item.type) {
          case "line":
            plotitem = new PlotLine(item);
            break;
          case "bar":
            plotitem = new PlotBar(item);
            break;
          case "stem":
            plotitem = new PlotStem(item);
            break;
          case "area":
            plotitem = new PlotArea(item);
            break;
          case "point":
            plotitem = new PlotPoint(item);
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
            plotitem = new PlotLine(item);  // default is line
        }
        return plotitem;
      }
    };
  };
  beaker.bkoFactory('plotFactory',
    ['PlotLine', 'PlotBar', 'PlotStem', 'PlotArea', 'PlotPoint',
     'PlotConstline', 'PlotConstband', 'PlotText',
      retfunc]);
})();
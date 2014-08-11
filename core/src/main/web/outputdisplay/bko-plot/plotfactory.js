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
  var retfunc = function(plotLine, plotBar, plotStem, plotArea,
    plotConstline, plotConstband, plotText) {
    return {
      createPlotItem : function(item) {
        switch (item.type) {
          case "line":
            return new plotLine(item);
          case "bar":
            return new plotBar(item);
          case "stem":
            return new plotStem(item);
          case "area":
            return new plotArea(item);
          case "constline": 
            return new plotConstline(item);
          case "constband": 
            return new plotConstband(item);
          case "text":
            return new plotText(item);
          default:
        }
      }
    };
  };
  beaker.bkoFactory('plotFactory', 
    ['plotLine', 'plotBar', 'plotStem', 'plotArea', 'plotConstline', 'plotConstband', 'plotText',
      retfunc]);
})();
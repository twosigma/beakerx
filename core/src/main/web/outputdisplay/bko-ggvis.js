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
/**
 * bkoResults
 */
(function() {
  'use strict';
  beakerRegister.bkoDirective("GGVis", ["$interval", "$compile", "$sce", "$rootScope", "bkOutputDisplayFactory", function(
      $interval, $compile, $sce, $rootScope, bkOutputDisplayFactory) {
    return {
      template: '<div><iframe srcdoc="{{getStuff()}}" style="height: 450px; width: 650px; resize: both; overflow: auto; border: 0;"></iframe></div>',
      link: function(scope, element, attrs) {
        scope.header = '<!DOCTYPE html>' +
          '<html>\n' +
          '<head>\n' +
          '<meta charset="utf-8"/>\n' +
          '<script src="app/vendor/ggvis/lib/jquery/jquery.min.js"></script>\n' +
          '<script src="app/vendor/ggvis/lib/detect-resize/jquery.resize.js"></script>\n' +
          '<link href="app/vendor/ggvis/lib/jquery-ui/jquery-ui.min.css" rel="stylesheet" />\n' +
          '<script src="app/vendor/ggvis/lib/jquery-ui/jquery-ui.min.js"></script>\n' +
          '<script src="app/vendor/ggvis/lib/d3/d3.min.js"></script>\n' +
          '<script src="app/vendor/ggvis/lib/vega/vega.min.js"></script>\n' +
          '<script src="app/vendor/ggvis/lib/lodash/lodash.min.js"></script>\n' +
          '<script>var lodash = _.noConflict();</script>\n' +
          '<link href="app/vendor/ggvis/ggvis/css/ggvis.css" rel="stylesheet" />\n' +
          '<script src="app/vendor/ggvis/ggvis/js/ggvis.js"></script>\n' +
          '</head>\n' +
          '<body style="background-color:white;">\n';
        
        scope.footer = '</body>\n' +
          '</html>\n';
        
        scope.getModel = function() {
          return scope.model.getCellModel();
        };
        scope.isShowOutput = function() {
          return scope.model.isShowOutput();
        };
        scope.getStuff = function() {
          if (scope.payload)
            return $sce.trustAsHtml(scope.header+scope.payload.first+scope.payload.second+scope.footer);
          return $sce.trustAsHtml(scope.header + scope.footer);
        };
        
        scope.isShowMenu = function() { return false; };
        scope.showoutput = scope.model.isShowOutput();        
        scope.payload = scope.getModel();
        
        scope.$watch('getModel()', function() {
          scope.payload = scope.getModel();
        });

        scope.$watch('isShowOutput()', function(oldval, newval) {
          scope.showoutput = newval;
        });

        var debouncedOnResize = _.debounce(onResize, 100);
        var iframeEl = element.find('iframe').on('resize', debouncedOnResize);

        function onResize() {
          $rootScope.$emit('beaker.resize');
        }
        
        scope.$on('$destroy', function() {
          iframeEl.off('resize', debouncedOnResize);
        });
      }
    };
  }]);
  beakerRegister.registerOutputDisplay("GGVis", ["GGVis", "Text"]);
})();

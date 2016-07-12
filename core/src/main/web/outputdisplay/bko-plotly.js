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
 * bkoPlotly
 * output display component for displaying plotly
 */
( function() {
  'use strict';
  var retfunc = function($sce, $rootScope) {
    var CELL_TYPE = "bko-plotly";
    return {
      template: '<div><iframe srcdoc="{{getHtml()}}" ' +
                'style="height: 480px; width: 640px; resize: both; overflow: auto; border: 0;"></iframe></div>',
      link: function(scope, element, attrs) {
        scope.getModel = function(){
          return scope.model.getCellModel();
        };
        if(scope.getModel().data.evals == null){
          scope.getModel().data.evals = [];
        }
        scope.html = '<!DOCTYPE html>' +
          '<script src="app/vendor/htmlwidgets/htmlwidgets.js"></script>' +
          '<script src="app/vendor/plotly/lib/plotlyjs/plotly-latest.min.js"></script>' +
          '<script src="app/vendor/plotly/plotly.js"></script>' +
          '<div id="htmlwidget_container">' +
          '<div id="htmlwidget" class="plotly"></div>' +
          '</div>' +
          '<script type="application/json" data-for="htmlwidget">' +
          angular.toJson(scope.model.getCellModel().data) +
          '</script>' +
          '<script type="application/htmlwidget-sizing" data-for="htmlwidget">{' +
          '"viewer":{"width":640,"height":480,"padding":5,"fill":true},' +
          '"browser":{"width":960,"height":500,"padding":5,"fill":true}}</script>';

        scope.getHtml = function() {
          return $sce.trustAsHtml(scope.html);
        };

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
  };
  beakerRegister.bkoDirective("Plotly", [
    '$sce',
    '$rootScope',
    retfunc]);
})();

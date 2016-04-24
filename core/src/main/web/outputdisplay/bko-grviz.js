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
  beakerRegister.bkoDirective("grViz", ["$interval", "$compile", "$sce", "bkOutputDisplayFactory", function(
      $interval, $compile, $sce, bkOutputDisplayFactory) {
    return {
      template: '<div><iframe srcdoc="{{getView()}}" style="height: 500px; width: 900px; resize: both; overflow: auto; border: 0;"></iframe></div>',
      link: function(scope, element, attrs) {
        scope.templateCode =
          "<!DOCTYPE html>\n" +
          "<html>\n" +
          "<head>\n" +
          "<meta charset=\"utf-8\"/>\n" +
          "<script src=\"app/vendor/grviz/lib/htmlwidgets/htmlwidgets.js\"></script>\n" +
          "<script src=\"app/vendor/grviz/lib/d3/d3.min.js\"></script>\n" +
          "<script src=\"app/vendor/grviz/lib/dagre-d3/dagre-d3.min.js\"></script>\n" +
          "<link href=\"app/vendor/grviz/lib/mermaid/dist/mermaid.css\" rel=\"stylesheet\" />\n" +
          "<script src=\"app/vendor/grviz/lib/mermaid/dist/mermaid.slim.min.js\"></script>\n" +
          "<link href=\"app/vendor/grviz/lib/styles/styles.css\" rel=\"stylesheet\" />\n" +
          "<script src=\"app/vendor/grviz/lib/viz/viz.js\"></script>\n" +
          "<script src=\"app/vendor/grviz/lib/vis/vis.min.js\"></script>\n" +
          "<link href=\"app/vendor/grviz/lib/vis/vis.min.css\" rel=\"stylesheet\" />\n" +
          "<script src=\"app/vendor/grviz/lib/VivaGraphJS/dist/vivagraph.min.js\"></script>\n" +
          "<script src=\"app/vendor/grviz/visNetwork.js\"></script>\n" +
          "<script src=\"app/vendor/grviz/lib/chromatography/chromatography.js\"></script>\n" +
          "<script src=\"app/vendor/grviz/DiagrammeR.js\"></script>\n" +
          "<script src=\"app/vendor/grviz/grViz.js\"></script>\n" +
          "\n" +
          "</head>\n" +
          "<body style=\"background-color:white;\">\n" +
          "<div id=\"htmlwidget_container\">\n" +
          "  <div id=\"htmlwidget-6900\" style=\"width:100%;height:100%;\" class=\"$type$ html-widget\"></div>\n" +
          "</div>\n" +
          "<script type=\"application/json\" data-for=\"htmlwidget-6900\">$payload$</script>\n" +
          "<script type=\"application/htmlwidget-sizing\" data-for=\"htmlwidget-6900\">{\"viewer\":{\"width\":450,\"height\":350,\"padding\":15,\"fill\":true},\"browser\":{\"width\":820,\"height\":420,\"padding\":40,\"fill\":false}}</script>\n" +
          "</body>\n" +
          "</html>";

        scope.getModel = function() {
          return scope.model.getCellModel();
        };
        scope.isShowOutput = function() {
          return scope.model.isShowOutput();
        };

        scope.widgetId = getRandomId();

        scope.getView = function() {
          return $sce.trustAsHtml(getTemplate()
            .replace('$widgetId$', 'htmlwidget' + scope.widgetId)
            .replace('$type$', scope.payload.concreteType)
            .replace('$payload$', scope.payload ? JSON.stringify(fixPayload()) : ''));
        };

        function getTemplate() {
          return scope.templateCode;
        }

        function getRandomId() {
          return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        }

        function fixPayload() {
          return {
            "x": scope.payload.data.x,
            "evals": [],
            "jsHooks": []
          };
        }
        
        scope.isShowMenu = function() { return false; };
        scope.showoutput = scope.model.isShowOutput();
        scope.payload = scope.getModel();
        
        scope.$watch('getModel()', function() {
          scope.payload = scope.getModel();
        });

        scope.$watch('isShowOutput()', function(oldval, newval) {
          scope.showoutput = newval;
        });

      }
    };
  }]);
  beakerRegister.registerOutputDisplay("grViz", ["grViz", "Text"]);
})();

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
  var module = angular.module('bk.notebook');

  module.directive('bkMarkdownCell', ['bkSessionManager', 'bkHelper', '$timeout', function(bkSessionManager, bkHelper, $timeout) {
  marked.setOptions({
    gfm: true,
    breaks: true
  });
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/markdowncell"](),
      controller: function($scope) {
        $scope.getFullIndex = function() {
          return $scope.$parent.$parent.$parent.getFullIndex() + "." + ($scope.$parent.index + 1);
        };
      },
      link: function(scope, element, attrs) {
        var preview = function() {
          var markdownFragment = $('<div style="display: none;">' + scope.cellmodel.body + '</div>');
          markdownFragment.appendTo('body'); // ugh mathjax doesn't operate on document fragments...

          MathJax.Hub.Queue(["Typeset", MathJax.Hub, markdownFragment[0]]);
          MathJax.Hub.Queue(function() {
            element.find('.markup').html(marked(markdownFragment.html()));
            markdownFragment.remove();
          });
          scope.mode = 'preview';
        };

        var syncContentAndPreview = function() {
          scope.cellmodel.body = scope.cm.getValue();
          preview();
        };

        scope.edit = function(event) {
          if (bkHelper.isNotebookLocked()) return;

          scope.mode = 'edit';

          $timeout(function() {
            var cm = scope.cm;
            cm.setValue(scope.cellmodel.body);
            cm.clearHistory();

            if (event) {
              var clickLocation;
              var markdownCell = element.find('.markdown-wrapper');
              var top = markdownCell.offset().top;
              var bottom = top + markdownCell.outerHeight();
              if (event !== undefined && event.pageY < (top + bottom) / 2) {
                cm.setCursor(0, 0);
              } else {
                cm.setCursor(cm.lineCount() - 1, cm.getLine(cm.lastLine()).length);
              }
            }

            cm.focus();
          });
        };

        preview();

        scope.cm = CodeMirror.fromTextArea(element.find("textarea")[0], {
          electricChars: false,
          extraKeys: {
            "Ctrl-Enter": function(cm) {
              scope.$apply(function() {
                syncContentAndPreview();
              });
            },
            "Cmd-Enter": function(cm) {
              scope.$apply(function() {
                syncContentAndPreview();
              });
            }
          }
        });

        scope.cm.on("blur", function(){
          scope.$apply(function() {
            syncContentAndPreview();
          });
        });

        scope.$on('beaker.cell.added', function(e, cellmodel) {
          if (cellmodel === scope.cellmodel) scope.edit();
        });

        scope.$watch('cellmodel.body', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });
      }
    };
  }]);
})();

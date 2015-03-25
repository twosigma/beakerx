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
  var enterKey = 13;

  module.directive('bkMarkdownCell', ['bkSessionManager', 'bkHelper', '$timeout', function(bkSessionManager, bkHelper, $timeout) {
    // Extract text with preserving whitespace, inspired from:
    // http://stackoverflow.com/questions/3455931/extracting-text-from-a-contenteditable-div
    function getContentEditableText(content) {
      var ce = $("<pre />").html(content);
      ce.find("div").replaceWith(function() { return "\n" + this.innerHTML; });
      ce.find("br").replaceWith("\n");

      return ce.text();
    }

    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/markdowncell"](),
      controller: function($scope) {
        $scope.getFullIndex = function() {
          return $scope.$parent.$parent.$parent.getFullIndex() + "." + ($scope.$parent.index + 1);
        };
      },
      link: function(scope, element, attrs) {
        var convert = function() {
          var markdownFragment = $('<div style="display: none;">' + scope.cellmodel.body + '</div>');
          markdownFragment.appendTo('body'); // ugh mathjax doesn't operate on document fragments...

          MathJax.Hub.Queue(["Typeset", MathJax.Hub, markdownFragment[0]]);
          MathJax.Hub.Queue(function() {
            element.find('.markup').html(marked(markdownFragment.html()));
            markdownFragment.remove();
          });
        };

        var syncContentAndPreview = function() {
          scope.cellmodel.body = getContentEditableText(element.find('.markdown').html());
          scope.mode = 'preview';
        };

        scope.keyDown = function(e) {
          if (e.keyCode == enterKey && (e.ctrlKey || e.metaKey)){
            syncContentAndPreview();
          }
        };

        scope.edit = function() {
          if (bkHelper.isNotebookLocked()) return;

          scope.mode = 'edit';
        };

        scope.mode = 'preview';
        convert();

        element.find('.markdown').on('blur', function() {
          scope.$apply(function() {
            syncContentAndPreview();
          });
        });

        scope.$watch('mode', function(newVal, oldVal) {
          if (newVal == oldVal) return;

          if (scope.mode == 'preview') {
            convert();
          } else {
            var markdown = element.find('.markdown');
            markdown.html(scope.cellmodel.body);
            markdown.focus();
          }
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

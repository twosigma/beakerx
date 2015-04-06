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

  //Namespace management idea from http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
  var setEndOfContenteditable = function(contentEditableElement)
  {
    var range,selection;
    if(document.createRange)
    {
      range = document.createRange();
      range.selectNodeContents(contentEditableElement);
      range.collapse(false);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    else if(document.selection)
    {
      range = document.body.createTextRange();
      range.moveToElementText(contentEditableElement);
      range.collapse(false);
      range.select();
    }
  };

  // Extract text with preserving whitespace, inspired from:
  // http://stackoverflow.com/questions/3455931/extracting-text-from-a-contenteditable-div
  var getContentEditableText = function(content) {
    var ce = $("<pre />").html(content);
    ce.find("div").replaceWith(function() { return "\n" + this.innerHTML; });
    ce.find("br").replaceWith("\n");

    return ce.text();
  };

  module.directive('bkMarkdownCell', ['bkSessionManager', 'bkHelper', '$timeout', function(bkSessionManager, bkHelper, $timeout) {
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
          scope.cellmodel.body = getContentEditableText(element.find('.markdown').html());
          preview();
        };

        scope.keyDown = function(e) {
          if (e.keyCode == enterKey && (e.ctrlKey || e.metaKey)){
            syncContentAndPreview();
          }
        };

        scope.edit = function(event) {
          if (bkHelper.isNotebookLocked()) return;

          scope.mode = 'edit';
          var clickLocation;
          var markdownCell = element.find('.markdown-wrapper');
          var top = markdownCell.offset().top;
          var bottom = top + markdownCell.outerHeight();

          if (event !== undefined && event.pageY < (top + bottom) / 2) {
            clickLocation = 'top';
          } else {
            clickLocation = 'bottom';
          }

          var markdown = element.find('.markdown');
          markdown.html(scope.cellmodel.body);

          $timeout(function(){
            markdown.focus();
            if (clickLocation == 'bottom') {
              setEndOfContenteditable(markdown[0]);
            }
          });
        };

        preview();

        element.find('.markdown').on('blur', function() {
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

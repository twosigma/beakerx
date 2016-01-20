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

  module.directive('bkCellTooltip', function(bkUtils, $rootScope) {
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/celltooltip"](),
      scope: {
        editor: '='
      },
      controller: function($scope) {
      },
      link: function(scope, element, attrs) {
        var tooltip = element.find('.bkcelltooltip');

        ///handle showTooltip event//////////////////////
        scope.$on('showTooltip', function(event, doc) {
          tooltip.empty();
          bindEvents();
          var html = getDocContent(doc);
          if (html) {
            displayTooltip(html);
            setTooltipPosition(calculateTooltipPosition());
          }
        });

        scope.$on('showDocumentationForAutocomplete', function(event, doc) {
          tooltip.empty();
          var html = getDocContent(doc);
          if (html) {
            displayTooltip(html);
            var autocompleteList = $('ul.CodeMirror-hints');
            _.defer(function() {
              tooltip.addClass('CodeMirror-hints');
              setTooltipPosition(_.merge(calculateTooltipPosition(), {left: autocompleteList.position().left + autocompleteList.outerWidth() - $('.bkcell').offset().left}));

              if (autocompleteListAboveCursor(autocompleteList)) {
                moveTooltipAboveCursor();
              }
            });
          }
        });

        scope.$on('hideDocumentationForAutocomplete', function(event) {
          tooltip.removeClass('bkcelltooltip-open');
          tooltip.removeClass('CodeMirror-hints');
        });

        function getDocContent(doc) {
          if (doc.ansiHtml) {
            return ansi_up.ansi_to_html(doc.ansiHtml, {use_classes: true});
          }
          if (doc.text) {
            return doc.text
          }
        }

        function autocompleteListAboveCursor(list) {
          return list.offset().top < scope.editor.cursorCoords(true).top;
        }

        function displayTooltip(htmlContent) {
          tooltip.html(htmlContent);
          tooltip.addClass('bkcelltooltip-open');
        }

        function hideTooltip() {
          unbindEvents();
          tooltip.removeClass('bkcelltooltip-open');
        }

        function calculateTooltipPosition() {
          var jqEditor = $(scope.editor.getWrapperElement());
          var cmPosition = jqEditor.position();
          var position = scope.editor.cursorCoords(true, 'local');
          var vMargins = jqEditor.outerHeight(true) - jqEditor.height();
          var hMargins = jqEditor.outerWidth(true) - jqEditor.width();

          var left = (cmPosition.left + position.left + hMargins);
          var top = (cmPosition.top + position.bottom + vMargins);
          return {top: top, left: left};
        }

        function moveTooltipAboveCursor() {
          var c = scope.editor.cursorCoords(true, 'local');
          var currentTooltipTop = parseInt(tooltip.css('top'), 10);
          var newTopPosition = currentTooltipTop - tooltip.outerHeight() - (c.bottom - c.top);
          tooltip.css('top', newTopPosition + 'px');
        }

        function setTooltipPosition(position) {
          tooltip.css('position', 'absolute');
          tooltip.css('top', position.top);
          tooltip.css('left', position.left);
        }

        function shouldHideTooltip(clickEventElement) {
          return tooltipIsOpen() && !tooltip.is(clickEventElement) &&
            tooltip.has(clickEventElement).length === 0;
        }

        function tooltipIsOpen() {
          return tooltip.hasClass('bkcelltooltip-open');
        }

        var mouseDownHandler = function(e) {
          if (shouldHideTooltip(e.target)) {
            hideTooltip();
          }
        };

        var resizeHandler = function() {
          if (tooltipIsOpen()) {
            calculateTooltipPosition();
          }
        };

        var editorChangeHandler = function() {
          if (tooltipIsOpen()) {
            hideTooltip();
          }
        };

        var escapeKeyBind = function(evt) {
          if (evt.which === 27 && tooltipIsOpen()) {
            hideTooltip();
          }
        };

        function bindEvents() {
          //handle document mousedown to close tooltip
          $(window).on('mousedown', mouseDownHandler);
          //adjust tooltip position on window resize
          $(window).resize(resizeHandler);
          //close tooltip on esc
          $(window).on('keydown', escapeKeyBind);
          //hide tooltip on typing in editor
          scope.editor.on('change', editorChangeHandler);
        }

        function unbindEvents() {
          $(window).off('resize', resizeHandler);
          $(window).off('mousedown', mouseDownHandler);
          $(window).off('keydown', escapeKeyBind);
          if(scope.editor){
            scope.editor.off('change', editorChangeHandler);
          }
        }

        scope.$on('$destroy', function() {
          unbindEvents();
        });
      }
    };
  });
})();
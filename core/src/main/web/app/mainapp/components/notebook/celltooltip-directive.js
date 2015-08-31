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

  module.directive('bkCellTooltip', function(bkUtils) {
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/celltooltip"](),
      scope: {
        editor: '='
      },
      controller: function($scope) {
      },
      link: function(scope, element, attrs){
        var tooltip = element.find('.bkcelltooltip');
        var initialized = false;

        ///handle showTooltip event//////////////////////
        scope.$on('showTooltip', function(event, doc){
          if(!initialized){
            initialized = true;
            init();
          }
          showTooltip(doc);
        });
        function showTooltip(doc){
          tooltip.empty();
          var html;
          if(doc.ansiHtml){
            html = ansi_up.ansi_to_html(doc.ansiHtml, {use_classes: true});
          }else if(doc.text){
            html = doc.text;
          }
          if(html){
            tooltip.html(html);
            tooltip.addClass('bkcelltooltip-open');
            adjustTooltipPosition();
          }
        }

        function hideTooltip(){
          tooltip.removeClass('bkcelltooltip-open');
        }

        function adjustTooltipPosition(){
          var jqEditor = $(scope.editor.getWrapperElement());
          var cmPosition = jqEditor.position();
          var position = scope.editor.cursorCoords(true, 'local');
          var vMargins = jqEditor.outerHeight(true) - jqEditor.height();
          var hMargins = jqEditor.outerWidth(true) - jqEditor.width();

          var left = (cmPosition.left + position.left + hMargins);
          var top = (cmPosition.top + position.bottom + vMargins);

          tooltip.css('position', 'absolute');
          tooltip.css('top', top );
          tooltip.css('left', left);
        }

        function shouldHideTooltip(clickEventElement) {
          return tooltipIsOpen() &&
              !tooltip.is(clickEventElement) &&
              tooltip.has(clickEventElement).length === 0;
        }

        function tooltipIsOpen(){
          return tooltip.hasClass('bkcelltooltip-open');
        }

        var mouseDownHandler = function (e) {
          if (shouldHideTooltip(e.target)){
            hideTooltip();
          }
        };

        var resizeHandler = function() {
          if(tooltipIsOpen()){
            adjustTooltipPosition();
          }
        };

        var editorChangeHandler = function () {
          if(tooltipIsOpen()){
            hideTooltip();
          }
        };

        var init = function(){
          //handle document mousedown to close tooltip
          $(window).on('mousedown', mouseDownHandler);
          //adjust tooltip position on window resize
          $(window).resize(resizeHandler);
          //hide tooltip on typing in editor
          scope.editor.on('change', editorChangeHandler);
          scope.$on('$destroy', function() {
            $(window).off('resize', resizeHandler);
            $(window).off('mousedown', mouseDownHandler);
            CodeMirror.off('change', editorChangeHandler);
          });
        };
      }
    };
  });
})();
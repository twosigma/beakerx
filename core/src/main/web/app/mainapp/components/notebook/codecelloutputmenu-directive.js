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

  module.directive('bkCodeCellOutputMenu', function(bkUtils) {
    return {
      restrict: 'E',
      templateUrl: "./app/mainapp/components/notebook/codecelloutputmenu.html",
      scope: {
        model: '='
      },
      controller: function($scope) {
        $scope.getItemName = function(item) {
          if (_.isFunction(item.name)) {
            return item.name();
          } else {
            return item.name;
          }
        };
        $scope.getItemClass = function(item) {
          var result = [];
          if (item.items) {
            var subItems = $scope.getSubItems(item);
            if (subItems.length > 0) {
              result.push("dropdown-submenu");
              result.push("pull-left");
            } else {
              result.push("display-none");
            }
          } else if ($scope.getItemName(item) === "") {
            result.push("display-none");
          }
          return result.join(" ");
        };
        $scope.getSubmenuItemClass = function(item) {
          var result = [];
          if (item.disabled) {
            result.push("disabled-link");
          }
          return result.join(" ");
        };
        $scope.getSubItems = function(parentItem) {
          if (_.isFunction(parentItem.items)) {
            return parentItem.items();
          }
          return parentItem.items;
        };
      },
      link: function(scope, element, attrs) {
        var outputMenuDiv = element.parent('.bkcell');
        var clickHandler = function(event) {
          //click in the border or padding should trigger menu
          if (bkUtils.getEventOffsetX(outputMenuDiv, event) >= outputMenuDiv.width()) {
            var menu = outputMenuDiv.find('.dropdown').last();
            menu.css("top", event.clientY);
            menu.css("left", event.clientX - 150);
            menu.find('.dropdown-toggle').first().dropdown('toggle');
            event.stopPropagation();
          }
        };
        outputMenuDiv.click(clickHandler);
        var mousemoveHandler = function(event) {
          if (bkUtils.getEventOffsetX(outputMenuDiv, event) >= outputMenuDiv.width()) {
            outputMenuDiv.css('cursor', 'pointer');
          } else {
            outputMenuDiv.css('cursor', 'default');
          }
        };
        outputMenuDiv.mousemove(mousemoveHandler);
        scope.$on("$destroy", function () {
          outputMenuDiv.off("click", clickHandler);
          outputMenuDiv.off("mousemove", mousemoveHandler);
        });
      }
    };
  });

})();

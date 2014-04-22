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
 * This is a reusable UI component for tree views.
 */
(function() {
  'use strict';
  var treeView = angular.module('M_TreeView', ['ngAnimate']);

  treeView.factory('fileService', function() {
    var _provider = {};
    return {
      setProvider: function(providers) {
        _provider = providers;
      },
      getChildren: function(uri, callback) {
        _provider.getChildren(uri, callback);
      },
      open: function(uri) {
        _provider.open(uri);
      }
    };
  });

  treeView.directive("treeView", function($templateCache) {
    return {
      restrict: 'E',
      template: "<tree-node data='root' fs='fs' displayname='{{ rooturi }}'></tree-node>",
      scope: {rooturi: "@", fs: "="},
      controller: function($scope) {
        if (!$templateCache.get('treeNodeChildren.html')) {
          $templateCache.put('treeNodeChildren.html', "<tree-node class='bk-treeview' ng-repeat='d in data.children' data='d' fs='fs'></tree-node>");
        }

        $scope.root = {
          type: "directory",
          uri: $scope.rooturi,
          children: []
        };
      }
    };
  });

  treeView.directive("treeNode", function() {
    return {
      restrict: 'E',
      template: "<span ng-click='click()'><i class='{{ getIcon() }}'></i> <span>{{ getDisplayName() }}</span></span>" +
          "<div class='pushright'>" +
          "<div ng-include='\"treeNodeChildren.html\"'></div>" +
          "</div>",
      scope: {data: "=", fs: "=", displayname: "@"},
      controller: function($scope) {
        $scope.click = function() {
          if ($scope.data.type === 'directory') {
            $scope.fs.open($scope.data.uri);
            // toggle
            if ($scope.data.children.length) {
              $scope.data.children.splice(0, $scope.data.children.length);
            } else {
              $scope.fs.getChildren($scope.data.uri, function(children) {
                $scope.data.children.splice(0, $scope.data.children.length);
                children = _.sortBy(children, function(c) {
                  if (c.type === "directory") {
                    return "!!!!!" + c.uri.toLowerCase();
                  } else {
                    return c.uri.toLowerCase();
                  }
                });
                _.each(children, function(c) {
                  $scope.data.children.push({
                    type: c.type,
                    uri: c.uri,
                    displayName: c.displayName,
                    children: []
                  });
                });
              });
            }
          } else {
            // open
            $scope.fs.open($scope.data.uri);
          }
        };
        $scope.getIcon = function() {
          if ($scope.data.type === "directory") {
            if ($scope.data.children.length) {
              return 'icon-folder-open';
            } else {
              return 'icon-folder-close';
            }
          }
          if ($scope.data.type === "application/prs.twosigma.beaker.notebook+json") {
            return 'icon-book';
          } else if ($scope.fs.getIcon && $scope.fs.getIcon($scope.data.type)) {
            return $scope.fs.getIcon($scope.data.type);
          } else {
            return 'icon-th';
          }
        };

        $scope.getDisplayName = function() {
          if ($scope.displayname) {
            return $scope.displayname;
          }
          if ($scope.data.displayName) {
            return $scope.data.displayName;
          }
          var name = $scope.data.uri;
          if (name.length > 0 && name[name.length - 1] === '/') {
            name = name.substring(0, name.length - 1)
          }
          return name.replace(/^.*[\\\/]/, '');
        };
      }
    };
  });
})();

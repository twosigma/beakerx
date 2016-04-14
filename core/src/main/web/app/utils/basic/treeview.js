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
  var treeView = angular.module('bk.treeView', ['ngAnimate', 'bk.utils']);

  treeView.factory('fileService', function() {
    var _provider = {};
    return {
      setProvider: function(providers) {
        _provider = providers;
      },
      getChildren: function(uri, callback) {
        _provider.getChildren(uri, callback);
      },
      fillInput: function(uri) {
        _provider.fillInput(uri);
      },
      open: function(uri) {
        _provider.open(uri);
      }
    };
  });

  var getSlash = function(isWindows) {
    if (isWindows) {
      return '\\'
    }
    return '/';
  };

  var addTrailingSlash = function(str, isWindows) {
    if (isWindows) {
      if (!_.endsWith(str, '\\')) {
        str = str + '\\';
      }
    } else {
      if (!_.endsWith(str, '/')) {
        str = str + '/';
      }
    }
    return str;
  };

  treeView.directive('treeView', function($templateCache, $rootScope, $timeout, bkUtils) {
    return {
      restrict: 'E',
      template: '<tree-node data="root" fs="fs" displayname="{{ rooturi }}"></tree-node>',
      scope: {rooturi: '@', fs: '='},
      controller: function($scope) {
        if (!$templateCache.get('treeNodeChildren.html')) {
          //jscs:disable
          $templateCache.put('treeNodeChildren.html', '<tree-node class="bk-treeview" ng-repeat="d in data.children | fileFilter:fs.filter | orderBy:fs.getOrderBy():fs.getOrderReverse()" data="d" fs="fs"></tree-node>');
          //jscs:enable
        }

        $rootScope.fsPrefs = $rootScope.fsPrefs || {
          openFolders: []
        };

        var isHomeDir = $scope.rooturi.length >= 3; // '/' for *nix and C:\ for windows
        var separator  = getSlash(bkUtils.isWindows);

        var getOpenFolders = function(path){
          var openFolders = [];
          if (path.indexOf($scope.rooturi)!== -1){
            path = path.replace($scope.rooturi,  "");
            var the_arr = path.split(separator);
            var openFolder = addTrailingSlash($scope.rooturi, bkUtils.isWindows);
            while (the_arr.length > 0){
              var part =  the_arr.shift();
              if (part.length > 0) {
                openFolder += addTrailingSlash(part, bkUtils.isWindows);
                openFolders.push(openFolder);
              }
            }
            return openFolders;
          }
          return undefined;
        };

        var reinit = function (rooturi, openFolders, callback) {
          $scope.root = {
            type: 'directory',
            uri: $scope.rooturi,
            children: []
          };

          $scope.fs.getChildren(rooturi, openFolders).then(function (response) {
            $scope.$evalAsync(function () {
              $scope.root.children = response.data;
              if (callback) {
                $timeout(function () {
                  callback();
                }, 0);
              }
            });
          });
        };

        $scope.$on("SELECT_DIR", function (event, data) {
          var callback = function(){
            $rootScope.$broadcast("SCROLL_TO_TREE_NODE",{
              path: data.path
            });
          };
          var openFolders = getOpenFolders(data.path);
          if (isHomeDir && data.find_in_home_dir == true){
            if (openFolders) {
              reinit($scope.rooturi, openFolders, callback);
            }
            else {

              $rootScope.$broadcast("SELECT_DIR",{
                find_in_home_dir: false,
                path: data.path
              });
            }
          }else if (!isHomeDir && data.find_in_home_dir == false){
            if (openFolders) {
              reinit($scope.rooturi, openFolders, callback);
            }
          }
        });

        $scope.root = {
          type: 'directory',
          uri: $scope.rooturi,
          children: []
        };
      }
    };
  });

  treeView.filter('fileFilter', function() {
    return function(children, filter) {
      return _.isFunction(filter) ? _.filter(children, filter) : children;
    };
  });

  treeView.directive('treeNode', function(bkUtils) {
    return {
      restrict: 'E',
      //jscs:disable
      template: '<span ng-dblclick="dblClick()" ng-click="click()"><i class="{{ getIcon() }}"></i> <span>{{ getDisplayName() }}</span></span>' +
          '<div class="pushright">' +
          '<div ng-include="\'treeNodeChildren.html\'"></div>' +
          '</div>',
      //jscs:enable
      scope: {data: '=', fs: '=', displayname: '@'},
      controller: function($scope, $rootScope) {



        var transform = function(c) {
          return {
            type: c.type,
            uri: c.uri,
            modified: c.modified,
            displayName: c.displayName,
            children: _.map(c.children, transform)
          };

        };
        $scope.onMakeNewDir = function(path) {

          if (path){
            var removeLastDirectoryPartOf =  function (the_url)
            {
              var the_arr = the_url.split('/');
              the_arr.pop();
              return( the_arr.join('/') );
            };

            if (removeLastDirectoryPartOf(path) === $scope.data.uri) {
              $scope.data.children = $scope.fs.getChildren($scope.data.uri).success(function (list) {
                $scope.data.children = list;
              });
            }
          }
        };
        $scope.click = function() {
          if ($scope.data.type === 'directory') {
            var uri = $scope.data.uri;
            addTrailingSlash(uri, bkUtils.isWindows);
            $scope.fs.fillInput(uri);
            // toggle
            if (!_.isEmpty($scope.data.children)) {
              $scope.data.children.splice(0, $scope.data.children.length);
              $rootScope.fsPrefs.openFolders = _.reject($rootScope.fsPrefs.openFolders, function(folder) {
                return _.startsWith(folder, uri);
              });
            } else {
              $rootScope.fsPrefs.openFolders.push(uri);
              $scope.fs.getChildren($scope.data.uri).success(function(children) {
                children = _.sortBy(children, function(c) {
                  if (c.type === 'directory') {
                    return '!!!!!' + c.uri.toLowerCase();
                  } else {
                    return c.uri.toLowerCase();
                  }
                });
                $scope.data.children = _.map(children, transform);
              });
            }
          } else {
            $scope.fs.fillInput($scope.data.uri);
          }
        };
        $scope.dblClick = function() {
          if ($scope.data.type === 'directory') {
            return;
          }

          $scope.fs.open($scope.data.uri);
        };
        $scope.getIcon = function() {
          if ($scope.data) {
            if ($scope.data.type === 'directory') {
              return 'folder-icon';
            }
            if ($scope.data.type === 'application/prs.twosigma.beaker.notebook+json') {
              return 'glyphicon glyphicon-book file-icon';
            } else if ($scope.fs && $scope.fs.getIcon && $scope.fs.getIcon($scope.data.type)) {
              return $scope.fs.getIcon($scope.data.type);
            }
          }

          return 'glyphicon glyphicon-th file-icon';
        };

        $scope.getDisplayName = function() {
          if ($scope.displayname) {
            return $scope.displayname;
          }
          if ($scope.data.displayName) {
            return $scope.data.displayName;
          }
          var name = $scope.data.uri;
          if (name && name.length > 0 && name[name.length - 1] === '/') {
            name = name.substring(0, name.length - 1);
          }
          return name ? name.replace(/^.*[\\\/]/, '') : '';
        };

        if ($scope.fs.addListener){
          $scope.fs.addListener($scope);
        }

        $scope.$on("MAKE_NEW_DIR", function (event, data) {
          $scope.onMakeNewDir(data.path);
        });
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$on("SCROLL_TO_TREE_NODE", function (event, data) {
          if (addTrailingSlash(data.path, bkUtils.isWindows) === addTrailingSlash(scope.data.uri, bkUtils.isWindows))
            element.get()[0].scrollIntoView();
        });
      }
    };
  });
})();

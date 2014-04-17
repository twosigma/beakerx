/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
 * M_bkControl
 * - This is the module for the 'control panel' section of beaker
 * - In the control panel, users get a list of opened sessions and is able to
 * (re)open one in bkApp.
 */
(function() {
  'use strict';
  var bkControl = angular.module('M_bkControl',
      ['M_bkCore', 'M_bkSession', 'M_menuPlugin']);

  bkControl.directive('bkControl', function(
      bkCoreManager, bkSession, menuPluginManager, trackingService) {
    return {
      restrict: 'E',
      templateUrl: './template/bkControl.html',
      controller: function($scope) {
        document.title = "Beaker";
        var _impl = {
          _pathOpeners: {},
          // Open
          setPathOpener: function(pathType, opener) {
            this._pathOpeners[pathType] = opener;
          },
          openPath: function(path, pathType, retry, timeout) {
            bkCoreManager.openURI(path);
          },
          showAnonymousTrackingDialog: function() {
            $scope.isAllowAnonymousTracking = null;
          }
        };
        bkCoreManager.setBkAppImpl(_impl);
        $scope.sessions = [];
        $scope.newNotebook = function() {
          bkCoreManager.newSession();
        };
        $scope.openTutorial = function() {
          bkHelper.openURI("file:config/tutorial.bkr");
        };
        var plugins = [];
        $scope.getPlugins = function() {
          return plugins;
        };
        menuPluginManager.clear();
        $.get('/beaker/rest/util/getControlPanelMenuPlugins')
            .done(function(menus) {
              menus.forEach(function(menu) {
                menuPluginManager.addControlMenu(menu);
              });
            });

        // get list of opened sessions
        bkSession.getSessions().then(function(ret) {
          for (var id in ret) {
            var url = ret[id].notebookurl;
            if (url && url[url.length - 1] === "/") {
              url = url.substring(0, url.length - 1);
            }
            $scope.sessions.push({
              id: id,
              caption: ret[id].caption ? ret[id].caption :
                  (url ? url.replace(/^.*[\\\/]/, '') : "New Notebook"),
              openDate: ret[id].openDate,
              description: url,
              edited: ret[id].edited
            });
          }
        });
        bkSession.getPlugins().then(function(ret) {
          plugins = plugins.concat(ret);
        });
        $scope.getDisplayName = function(plugin) {
          return (plugin.name) ? plugin.name : plugin.url;
        };
        $scope.getMenus = function() {
          return menuPluginManager.getMenus();
        };
        $scope.gotoControlPanel = function(event) {
          if (bkCoreManager.isMiddleClick(event)) {
            window.open("./");
          } else {
            location.reload();
          }
        };
        $scope.isAllowAnonymousTracking = false;
        $scope.$watch("isAllowAnonymousTracking", function(newValue, oldValue) {
          if (newValue !== oldValue) {
            var allow = null;
            if (newValue) {
              allow = "true";
              trackingService.enable();
            } else if (newValue === false) {
              allow = "false";
              trackingService.disable();
            }
            bkCoreManager.httpPost("./rest/util/setAllowAnonymousTracking", {allow: allow});
          }
        });
        $scope.showWhatWeLog = function() {
          var template = "<div class='modal-header'>" +
              "<h3>What will we log</h3>" +
              "</div>" +
              "<div class='modal-body'>" +
              "<p><b>What we log</b></p>" +
              "<p>We use Google Analytics to collect usage info. Google Analytics collects data such as how long you spend in Beaker, what browser you're using, and your geographic region.</p>" +
              "<p>In addition to the standard Google Analytics collection, we're logging how many times you run cells in each language and what types of notebooks you open (local .bkr file, remote .ipynb, et cetera).</p>" +
              "<p><b>What we <i>don't</i> log</b></p>" +
              "<p>We will never log any of the code you run, the names of your notebooks, your IP address, or any other personal or sensitive information.</p>" +
              "</div>" +
              '<div class="modal-footer">' +
              "   <button class='btn' ng-click='close()' class='btn'>Got it</button>"
          '</div>';
          return bkCoreManager.showFileChooser(function() {

          }, template);
        }
        if (trackingService.isNeedPermission()) {
          bkCoreManager.httpGet("./rest/util/isAllowAnonymousTracking").then(function(allow) {
            switch (allow.data) {
              case "true":
                $scope.isAllowAnonymousTracking = true;
                break;
              case "false":
                $scope.isAllowAnonymousTracking = false;
                break;
              default:
                $scope.isAllowAnonymousTracking = null;
            }
          });
        } else {
          $scope.isAllowAnonymousTracking = true;
        }
      }
    };
  });

  bkControl.directive('bkControlItem', function(bkSession, $location) {
    return {
      restrict: 'E',
      template: "<table class='table table-striped'>" +
          "<tbody>" +
          "<tr><th>ID</th><th>Open Date</th><th>Name</th><th>Path</th><th>Edited</th><th>Operation</th></tr>" +
          "<tr ng-repeat='session in sessions | orderBy:\"openDate\":true'>" +
          "<td>{{session.id}}</td>" +
          "<td>{{session.openDate | date:'medium'}}</td>" +
          "<td><span class='caption' contenteditable='false'>{{session.caption}}</span></td>" +
          "<td>{{session.description}}</td>" +
          "<td>{{session.edited ? '*' : ''}}</td>" +
          "<td><div class='btn-group'><button class='btn' ng-click='open(session)'>Go to</button>" +
          "<button class='btn' ng-click='close(session)'>Close</button></div></td>" +
          "</tr></tbody>" +
          "</table>",
      controller: function($scope) {
        $scope.open = function(session) {
          $location.path("session/" + session.id);
        };
        $scope.close = function(session) {
          $location.path("close/" + session.id);
        };
        $scope.resetCaption = function(newCaption) {
          // TODO
        };
      },
      link: function(scope, element, attr) {
//                var captionElement = $(element.find(".caption").first());
//                captionElement.bind('blur', function() {
//                    scope.resetCaption(captionElement.html().trim());
//                });
      }
    };
  });
})();

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
  var module = angular.module('bk.controlPanel');

  module.directive('bkControlPanel', function(
      bkUtils, bkCoreManager, bkSession, bkMenuPluginManager, bkTrack) {
    return {
      restrict: 'E',
      templateUrl: './app/controlpanel/controlpanel.html',
      controller: function($scope) {
        document.title = "Beaker";
        var _impl = {
          name: "bkControlApp",
          showAnonymousTrackingDialog: function() {
            $scope.isAllowAnonymousTracking = null;
          }
        };

        bkCoreManager.setBkAppImpl(_impl);

        $scope.gotoControlPanel = function(event) {
          if (bkUtils.isMiddleClick(event)) {
            window.open("./");
          } else {
            location.reload();
          }
        };

        // setup menus
        bkMenuPluginManager.clear();
        bkUtils.httpGet('/beaker/rest/util/getControlPanelMenuPlugins')
            .success(function(menuUrls) {
              menuUrls.forEach(function(url) {
                bkMenuPluginManager.loadMenuPlugin(url);
              });
            });
        $scope.getMenus = function() {
          return bkMenuPluginManager.getMenus();
        };


        // actions for UI
        $scope.newNotebook = function() {
          bkCoreManager.newSession();
        };
        $scope.openTutorial = function() {
          bkCoreManager.openNotebook("config/tutorial.bkr", undefined, true);
        };

        // ask for tracking permission
        $scope.isAllowAnonymousTracking = false;
        if (bkTrack.isNeedPermission()) {
          bkUtils.httpGet("./rest/util/isAllowAnonymousTracking").then(function(allow) {
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
        $scope.$watch("isAllowAnonymousTracking", function(newValue, oldValue) {
          if (newValue !== oldValue) {
            var allow = null;
            if (newValue) {
              allow = "true";
              bkTrack.enable();
            } else if (newValue === false) {
              allow = "false";
              bkTrack.disable();
            }
            bkUtils.httpPost("./rest/util/setAllowAnonymousTracking", { allow: allow });
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
              "   <button class='btn' ng-click='close()' class='btn'>Got it</button>" +
              "</div>";
          return bkCoreManager.showFileChooser(function() {}, template);
        };


        // sessions list UI
        $scope.sessions = null;
        // get list of opened sessions
        $scope.reloadSessionsList = function() {
          bkSession.getSessions().then(function(sessions) {
            $scope.sessions = sessions;
          });
        };
        $scope.reloadSessionsList();
        $scope.isSessionsListEmpty = function() {
          return _.isEmpty($scope.sessions);
        };
      }
    };
  });

})();

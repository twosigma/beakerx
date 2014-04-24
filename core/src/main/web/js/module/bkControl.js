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
 * M_bkControl
 * - This is the module for the 'control panel' section of beaker
 * - In the control panel, users get a list of opened sessions and is able to
 * (re)open one in bkApp.
 */
(function() {
  'use strict';
  var bkControl = angular.module('M_bkControl', [
    'M_bkUtils',
    'M_bkCore',
    'M_bkSession',
    'M_bkMenuPluginManager',
    'M_bkRecentMenu',
    'M_bkEvaluatePluginManager']);

  bkControl.directive('bkControl', function(
      bkUtils, bkCoreManager, bkSession, bkMenuPluginManager, trackingService) {
    return {
      restrict: 'E',
      templateUrl: './template/bkControl.html',
      controller: function($scope) {
        document.title = "Beaker";
        var _impl = {
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
        if (trackingService.isNeedPermission()) {
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
              trackingService.enable();
            } else if (newValue === false) {
              allow = "false";
              trackingService.disable();
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
              "   <button class='btn' ng-click='close()' class='btn'>Got it</button>"
          '</div>';
          return bkCoreManager.showFileChooser(function() {}, template);
        }


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
        }
      }
    };
  });

  bkControl.directive('bkControlItem', function(
      bkUtils, bkSession, bkCoreManager, bkRecentMenu, bkEvaluatePluginManager) {
    return {
      restrict: 'E',
      template: "<table class='table table-striped'>" +
          "<tbody>" +
          "<tr><th>ID</th><th>Open Date</th><th>Name</th><th>Path</th><th>Edited</th><th>Operation</th></tr>" +
          "<tr ng-repeat='(sessionId, session) in sessions | orderBy:\"openDate\":true'>" +
          "<td>{{sessionId}}</td>" +
          "<td>{{session.openedDate | date:'medium'}}</td>" +
          "<td><span class='caption' contenteditable='false'>{{getCaption(session)}}</span></td>" +
          "<td>{{getDescription(session)}}</td>" +
          "<td>{{session.edited ? '*' : ''}}</td>" +
          "<td><div class='btn-group'><button class='btn' ng-click='open(sessionId)'>Go to</button>" +
          "<button class='btn' ng-click='close(sessionId, session)'>Close</button></div></td>" +
          "</tr></tbody>" +
          "</table>",
      controller: function($scope) {
        $scope.open = function(sessionId) {
          bkCoreManager.openSession(sessionId);
        };
        $scope.close = function(sessionId, session) {
          var notebookUri = session.notebookUri;
          var uriType = session.uriType;
          var readOnly = session.readOnly;
          var format = session.format;
          var notebookModel = angular.fromJson(session.notebookModelJson);
          var edited = session.edited;
          var closeSession = function() {
            if (notebookModel && notebookModel.evaluators) {
              for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                bkEvaluatePluginManager.createEvaluatorThenExit(notebookModel.evaluators[i]);
              }
            }
            return bkSession.close(sessionId).then(function() {
              $scope.reloadSessionsList();
            });
          };
          if (!edited) {
            // close session
            closeSession();
          } else {
            // ask if user want to save first
            bkHelper.showYesNoCancelModal(
                "Do you want to save [" + $scope.getCaption(sessionId) + "]?",
                "Confirm close",
                function() { // yes
                  // save session
                  var saveSession = function() {
                    var notebookModelAsString = bkUtils.toPrettyJson(notebookModel);
                    if (!_.isEmpty(session.notebookUri)) {
                      var fileSaver = bkCoreManager.getFileSaver(session.uriType);
                      return fileSaver.save(session.notebookUri, notebookModelAsString);
                    } else {
                      var deferred = bkUtils.newDeferred();
                      bkCoreManager.showDefaultSavingFileChooser().then(function(pathInfo) {
                        if (!pathInfo.uri) {
                          deferred.reject({
                            cause: "Save cancelled"
                          });
                        } else {
                          var fileSaver = bkCoreManager.getFileSaver(pathInfo.uriType);
                          fileSaver.save(pathInfo.uri, notebookModelAsString).then(function () {
                            bkRecentMenu.recordRecentDocument(angular.toJson({
                              uri: pathInfo.uri,
                              type: pathInfo.uriType,
                              readOnly: false,
                              format: _.isEmpty(format) ? "" : format
                            }));
                            deferred.resolve();
                          }, function (error) {
                            deferred.reject({
                              cause: "error saving to file",
                              error: error
                            });
                          });
                        }
                      });
                      return deferred.promise;
                    }
                  };
                  var savingFailedHandler = function(info) {
                    if (info.cause === "Save cancelled") {
                      console.log("File saving cancelled");
                    } else {
                      bkHelper.showErrorModal(info.error, info.cause);
                    }
                  }
                  saveSession().then(closeSession, savingFailedHandler);
                },
                function() { // no
                  console.log("close without saving");
                  closeSession();
                },
                function() { // cancel
                  // no-op
                },
                "Save",
                "Don't Save"
            );
          }
        };

        $scope.getCaption = function(session) {
          var url = session.notebookUri;
          if (!url) {
            return "New Notebook";
          }
          if (url[url.length - 1] === "/") {
              url = url.substring(0, url.length - 1);
          }
          return url.replace(/^.*[\\\/]/, '');
        };
        $scope.getDescription = function(session) {
          return session.notebookUri;
        };
      }
    };
  });
})();

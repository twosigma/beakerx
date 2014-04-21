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
 * M_bkCloseSessionApp
 * This module serves the single purpose of properly closing a session that was not loaded.
 */
(function() {
  'use strict';
  var bkApp = angular.module('M_bkCloseSessionApp', [
    'ngRoute',
    'M_bkCore',
    'M_bkSession',
    'M_evaluatorManager'
  ]);

  bkApp.directive('bkCloseSessionApp', function(
      $routeParams, $location, $q, bkCoreManager, bkSession, evaluatorManager) {
    return {
      restrict: 'E',
      template: "<div>Closing session {{sessionID}}</div>",
      scope: {},
      controller: function($scope) {
        var sessionID = $routeParams.sessionID;
        $scope.sessionID = sessionID;
        bkSession.loadSession(sessionID).then(function(ret) {
          var notebookModel = angular.fromJson(ret.content);
          var notebookUri = ret.notebookurl;
          if (notebookModel && notebookModel.evaluators) {
            for (var i = 0; i < notebookModel.evaluators.length; ++i) {
              evaluatorManager.createEvaluatorThenExit(notebookModel.evaluators[i]);
            }
          }
          var goToControlPanel = function() {
            $location.path("/control");
          };
          var closeSession = function() {
            bkSession.closeSession(sessionID).then(goToControlPanel);
          };
          var saveSession = function() {
            if (notebookUri) {
              var notebookUriType = notebookUri.substring(0, notebookUri.indexOf(':/')) || "file";
              var saveFunc = bkCoreManager.getSaveFunc(notebookUriType);
              return saveFunc(notebookUri, notebookModel);
            } else {
              var deferred = $q.defer();
              var saveAsFile = function(path) {
                if (!path) {
                  deferred.reject("Save cancelled");
                } else {
                  var saveFunc = bkCoreManager.getSaveFunc("file");
                  saveFunc(path, notebookModel).then(function() {
                    deferred.resolve();
                  }, function(error) {
                    deferred.reject("error saving to file", error);
                  });
                }
              };
              bkHelper.showFileChooser(saveAsFile, 'template/saveAsMenuModal.html');
              return deferred.promise;
            }
          };
          if (ret.edited === false) {
            closeSession();
          } else {
            var notebookName = notebookUri ? notebookUri.replace(/^.*[\\\/]/, '') : "[New Notebook]";
            bkHelper.showYesNoCancelModal(
                "Do you want to save " + notebookName + "?",
                "Confirm close",
                function() {
                  // save session
                  saveSession().then(closeSession, function(msg, error) {
                    if (msg === "Save cancelled") {
                      goToControlPanel();
                    } else {
                      bkHelper.showErrorModal(error, msg)
                    }
                  });
                },
                function() {
                  console.log("close without saving");
                  closeSession();
                },
                goToControlPanel,
                "Save",
                "Don't Save"
            );
          }
        });
      }
    };
  });
})();

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
 * bk.ControlPanel
 * - This is the module for the 'control panel' section of beaker
 * - In the control panel, users get a list of opened sessions and is able to
 * (re)open one in bkApp.
 */
(function() {
  'use strict';
  var module = angular.module('bk.controlPanel');

  module.directive('bkControlPanelSessionItem', function(
      bkUtils, bkSession, bkCoreManager, bkRecentMenu, bkEvaluatePluginManager) {

    function saveMostRecentNotebookContents(sessionId, pathInfo, format) {
      var deferred = bkUtils.newDeferred();

      $.cometd.subscribe('/latest-notebook-model', function(resp) {

        var fileSaver = bkCoreManager.getFileSaver(pathInfo.uriType);
        fileSaver.save(pathInfo.uri, resp.data.notebookJson)
        .then(function() {
          bkRecentMenu.recordRecentDocument(JSON.stringify({
            uri: pathInfo.uri,
            type: pathInfo.uriType,
            readOnly: false,
            format: _.isEmpty(format) ? '' : format
          }));
        })
        .then(deferred.resolve)
        .catch(deferred.reject);

        $.cometd.unsubscribe('/latest-notebook-model');
      });

      $.cometd.publish('/request-latest-notebook-model', {sessionId: sessionId});

      return deferred.promise;
    }

    return {
      restrict: 'E',
      template: JST['controlpanel/table'],
      controller: function($scope) {
        $scope.open = function(session) {
          bkCoreManager.openSession(session.id);
        };
        $scope.close = function(session) {
          var format = session.format;
          var notebookModel = angular.fromJson(session.notebookModelJson);
          var closeSession = function() {
            if (notebookModel && notebookModel.evaluators) {
              for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                // XXX Outdated notebook model is used, consider getting most recent version from backend
                bkEvaluatePluginManager.createEvaluatorThenExit(notebookModel.evaluators[i]);
              }
            }
            return bkSession.close(session.id).then(function() {
              $scope.reloadSessionsList();
            });

          };
          bkSession.getSessionEditedState(session.id)
          .then(function(response) {
            var edited = response.data.edited;
            if (!edited) {
              // close session
              closeSession();
            } else {
              // ask if user want to save first
              bkHelper.show3ButtonModal(
                  'Do you want to save [' + $scope.getCaption(session) + ']?',
                  'Confirm close',
                  function() { // yes
                    // save session
                    var saveSession = function() {
                      var notebookModelAsString = bkUtils.toPrettyJson(notebookModel);
                      if (!_.isEmpty(session.notebookUri) && !session.readOnly) {
                        var fileSaver = bkCoreManager.getFileSaver(session.uriType);
                        return fileSaver.save(session.notebookUri, notebookModelAsString, true);
                      }

                      return bkCoreManager.showDefaultSavingFileChooser()
                      .then(function(pathInfo) {
                        if (!pathInfo.uri) {
                          return bkUtils.newDeferred().reject({
                            cause: 'Save cancelled'
                          });
                        }

                        return saveMostRecentNotebookContents(session.id, pathInfo, format)
                        .catch(function(error) {
                          return bkUtils.newDeferred().reject({
                            cause: 'error saving to file',
                            error: error
                          });
                        });
                      });
                    };

                    var savingFailedHandler = function(info) {
                      if (info.cause === 'Save cancelled') {
                        console.log('File saving cancelled');
                      } else {
                        bkHelper.show1ButtonModal(info.error, info.cause);
                      }
                    };
                    saveSession().then(closeSession, savingFailedHandler);
                  },
                  function() { // no
                    closeSession();
                  },
                  function() { // cancel
                    // no-op
                  },
                  'Save',
                  'Don\'t Save'
              );
            }
          });
        };

        $scope.getCaption = function(session) {
          var url = session.notebookUri;
          if (!url) {
            return 'New Notebook';
          }
          if (url[url.length - 1] === '/') {
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

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
 * M_bkBunsenHelper
 * The docs go here ...
 *
 */
(function() {
  'use strict';
  var module = angular.module('bk.bunsen', [
    'bk.core',
    'bk.share',
    'bk.sessionManager'
  ]);
  /**
   * bkBunsenHelper
   *
   */
// bkBaseSessionModel
  module.factory('bkBunsenHelper', function(bkCoreManager, bkShare, $dialog, $routeParams, $window, $timeout, bkSessionManager) {

    var bunsenSave = function(notebook, operation) {
      $window.top.postMessage({projectId: $routeParams.projectId,
                               notebook: notebook,
                               operation: operation},
                              $routeParams.bunsenUiUrl);
      bkSessionManager.setNotebookModelEdited(false);
    };

    var bkBunsenHelper = {
      forDebugOnly: {
        bkSessionManager: bkSessionManager,
        bkCoreManager: bkCoreManager
      },

      userToken: function() {
        return $routeParams.userToken;
      },

      resizeIFrame: function() {
        $timeout(function() {
          $window.top.postMessage({height: $('html').outerHeight(),
                                   notebookId: $routeParams.notebookId,
                                   operation: 'resize'},
                                  $routeParams.bunsenUiUrl);
        });
      },

      saveNotebook: function(newName) {
        var saveData = bkSessionManager.getSaveData().notebookModelAsString;
        var action = 'update';
        var serializedNotebook = {
          data: saveData,
          id: $routeParams.notebookId
        };
        if (newName) {
          action = 'create';
          _.extend(serializedNotebook, {
            id: null,
            name: newName
          });
        }

        bunsenSave(serializedNotebook, action);
      }
    };
    console.log("bunsenhelper making it global");
    window.bkBunsenHelper = bkBunsenHelper; // TODO, we want to revisit the decision of making this global
    return bkBunsenHelper;
  });
})();

console.log("read file bunsenhelper");

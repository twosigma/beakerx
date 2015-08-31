/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

  var module = angular.module('bk.core');

  module.controller('publicationCtrl',
    ['$scope', 'bkUtils', 'bkPublicationApi', 'bkPublicationAuth', 'bkSessionManager', '$modalInstance',
    function($scope, bkUtils, bkPublicationApi, bkPublicationAuth, bkSessionManager, $modalInstance) {

      bkPublicationAuth.initSession();

      var notebook = bkSessionManager.getRawNotebookModel();

      $scope.user = {role: 'beaker'};
      $scope.model = {};

      $scope.signIn = function() {
        return bkPublicationAuth.signIn($scope.user)
        .then(function() {
          initPublication();
          delete $scope.user.password;
        })
        .catch(function(err) {
          $scope.error = 'Error: Invalid email or password';
        });
      };

      $scope.signOut = function() {
        bkPublicationAuth.signOut();
      };

      $scope.isSignedIn = function() {
        return bkPublicationAuth.isSignedIn();
      };

      $scope.currentUser = function() {
        return bkPublicationAuth.currentUser();
      };

      function defaultName() {
        var section = _(notebook.cells).find(function(cell) {
          return cell.type === 'section';
        });
        return section && section.title;
      }

      function initPublication() {
        $scope.edited = bkSessionManager.isNotebookModelEdited();

        bkPublicationApi.getCategories()
        .then(function(resp) {
          $scope.categories = resp.data;
        });

        $scope.model.name = defaultName();
        $scope.published = false;
        $scope.title = 'Publish Notebook';
        $scope.saveButton = 'Publish';

        if (wasPublished()) {
          bkPublicationApi.getPublication(notebook.metadata['publication-id'])
          .then(function(resp) {
            $scope.model = resp.data;
            $scope.model['category-id'] = resp.data.category['public-id'];
            $scope.published = true;
            $scope.title = 'Update Notebook';
            $scope.saveButton = 'Update';
          });
        }

        if (bkSessionManager.isNotebookModelEdited()) {
          $scope.saveButton = 'Save and ' + $scope.saveButton;
        }
      }

      function wasPublished() {
        return notebook.metadata && notebook.metadata['publication-id'];
      }

      function createPublication() {
        $scope.model.contents = bkSessionManager.getSaveData().notebookModelAsString;
        return bkPublicationApi.createPublication($scope.model)
        .then(function(resp) {
          // save publication id as notebook metadata
          bkSessionManager.getRawNotebookModel().metadata = {'publication-id': resp.data['public-id']};
          return bkHelper.saveNotebook();
        });
      }

      function updatePublication() {
        $scope.model.contents = bkSessionManager.getSaveData().notebookModelAsString;
        return bkPublicationApi.updatePublication(notebook.metadata['publication-id'], $scope.model);
      }

      $scope.publishAction = function() {
        $scope.saving = true;
        var action = $scope.published ? updatePublication : createPublication;
        return bkHelper.saveNotebook()
        .then(action)
        .then(function() {
          $scope.saving = false;
          $scope.close();
        });
      };

      $scope.delete = function() {
        $scope.saving = true;
        return bkPublicationApi.deletePublication(notebook.metadata['publication-id'])
        .then(function() {
          delete bkSessionManager.getRawNotebookModel().metadata['publication-id'];
          delete $scope.model;
          $scope.saving = false;
          $scope.close();
        });
      }

      if ($scope.isSignedIn()) {
        initPublication();
      }

      $scope.close = function() {
        $modalInstance.close('ok');
      };
  }]);
})();

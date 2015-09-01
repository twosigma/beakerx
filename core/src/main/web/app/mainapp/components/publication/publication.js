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
    ['$scope', 'bkUtils', 'bkPublicationApi', 'bkPublicationAuth', 'bkSessionManager', '$modalInstance', '$location',
    function($scope, bkUtils, bkPublicationApi, bkPublicationAuth, bkSessionManager, $modalInstance, $location) {

      bkPublicationAuth.initSession();

      var notebook = bkSessionManager.getRawNotebookModel();

      $scope.user = {role: 'beaker'};
      $scope.model = {};
      $scope.baseUrl = bkPublicationApi.getBaseUrl();

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

      function initNodes(categories) {
        var nodes = {};
        _.each(categories, function(category) {
          nodes[category['public-id']] = _.extend(category, {
            count: +category.count,
            children: []
          });
        });

        return nodes;
      }

      function generateTree(categories) {
        var nodes = initNodes(categories);
        var rootNodes = [];

        _.each(_.sortBy(categories, 'name').reverse(), function(category) {
          var parentNode;
          if (category.parent) {
            parentNode = nodes[category.parent['public-id']];
          }
          var node = nodes[category['public-id']];
          if (parentNode) {
            node.parent = parentNode;
            parentNode.children.unshift(node);
          } else {
            rootNodes.unshift(node);
          }
        });

        return rootNodes;
      }

      function flattenCategories(categories, prefix) {
        if (!prefix) { prefix = ' '; }

        return _.reduce(categories, function(newCategories, category) {
          var toBeAdded = [];

          if (category.children.length) {
            Array.prototype.push.apply(toBeAdded, flattenCategories(category.children, '-' + prefix));
          }

          category.name = prefix + category.name;

          toBeAdded.unshift(category);

          return Array.prototype.concat.apply(newCategories, toBeAdded);
        }, []);
      }

      function initPublication() {
        $scope.edited = bkSessionManager.isNotebookModelEdited();

        bkPublicationApi.getCategories()
        .then(function(resp) {
          var tree = generateTree(resp.data)
          $scope.categories = flattenCategories(tree);
        });

        $scope.model.name = defaultName();
        $scope.published = false;
        $scope.title = 'Publish Notebook';
        $scope.saveButton = 'Publish';

        if (wasPublished()) {
          bkPublicationApi.getPublication(notebook.metadata['publication-id'])
          .then(function(resp) {
            var pub = resp.data;
            if (bkPublicationAuth.currentUser()['public-id'] == pub['author-id']) {
              $scope.model = pub;
              $scope.model['category-id'] = pub.category['public-id'];
              $scope.published = true;
              $scope.title = 'Update Notebook';
              $scope.saveButton = 'Update';
            }
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
        var action = $scope.published ? "update" : "create";
        return $scope.publish(action);
      };

      $scope.publish = function(action) {
        $scope.saving = true;
        return bkHelper.saveNotebook()
        .then(action == "update" ? updatePublication : createPublication)
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

      $scope.signupUrl = function() {
        return $scope.baseUrl + '#/sign_up?redirect=' + encodeURIComponent($location.absUrl());
      };
  }]);
})();

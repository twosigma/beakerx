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
    ['$scope', 'bkHelper', 'bkPublicationApi', 'bkPublicationAuth', 'bkSessionManager', '$uibModalInstance', '$location', '$window', 'nModel',
    function($scope, bkHelper, bkPublicationApi, bkPublicationAuth, bkSessionManager, $uibModalInstance, $location, $window, nModel) {

      var notebook = nModel || bkSessionManager.getRawNotebookModel();

      $scope.user = {role: 'beaker'};
      $scope.model = {};
      $scope.baseUrl = bkPublicationApi.getBaseUrl();
      $scope.initializing = true;

      $scope.signIn = function() {
        $scope.saving = true;
        return bkPublicationAuth.signIn($scope.user)
        .then(function() {
          initPublication();
          delete $scope.user.password;
        })
        .catch(function(err) {
          $scope.error = 'Error: Invalid email or password';
        })
        .finally(function() {
          $scope.saving = false;
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
        var section = _.find(notebook.cells, function(cell) {
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

        _.each(categories, function(category) {
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

        return _.reduce(_.sortBy(categories, 'order'), function(newCategories, category) {
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
              $scope.model['category-id'] = pub.category && pub.category['public-id'];
              $scope.attachmentUrl = $scope.model['attachment-id'] &&
                bkPublicationApi.getAttachmentUrl($scope.model['attachment-id']);
              $scope.published = true;
              $scope.title = 'Update Notebook';
              $scope.saveButton = 'Update';
            }
          });
        }
      }

      function wasPublished() {
        return notebook.metadata && notebook.metadata['publication-id'];
      }

      function setModelContents() {
        bkHelper.updateCellsFromDOM(notebook.cells);
        $scope.model.contents = bkHelper.sanitizeNotebookModel(notebook);
      }

      function getPublicationModel() {
        var pubModel = _.clone($scope.model);
        if (_.isEmpty(pubModel.name)) {
          pubModel.name = ' '; //to avoid error on pub server
        }
        return pubModel;
      }

      function createPublication() {
        setModelContents();
        return bkPublicationApi.createPublication(getPublicationModel())
        .then(function(resp) {
          // save publication id as notebook metadata - only for entire notebook publication
          if (_.isUndefined(nModel)) {
            bkSessionManager.getRawNotebookModel().metadata = {'publication-id': resp.data['public-id']};
          }
          return resp.data['public-id'];
        });
      }

      function updatePublication() {
        setModelContents();
        return bkPublicationApi.updatePublication(notebook.metadata['publication-id'], getPublicationModel())
        .then(function() {
          return notebook.metadata['publication-id'];
        });
      }

      $scope.publishAction = function() {
        var action = $scope.published ? "update" : "create";
        return $scope.publish(action);
      };

      $scope.publish = function(action, skipAttachmentDeletion) {
        var tab = $window.open(bkPublicationApi.getBaseUrl() + '/#/publication_loading');
        var publicId;
        $scope.saving = true;
        (action == "update" ? updatePublication : createPublication)()
        .then(function(publicationId) {
          $scope.saving = false;
          publicId = publicationId;
          tab.location = bkPublicationApi.getBaseUrl() + '/#/publications/' + publicationId;
        })
        .then(function() {
          if ($scope.deletedAttachment && !skipAttachmentDeletion) {
            return bkPublicationApi.deleteAttachment($scope.deletedAttachment);
          }
        })
        .then(function() {
          delete $scope.deletedAttachment;
          $scope.close(!_.isUndefined(nModel) && publicId);
        });
      };

      $scope.delete = function() {
        $scope.saving = true;
        return bkPublicationApi.deletePublication(notebook.metadata['publication-id'])
        .then(function() {
          delete bkSessionManager.getRawNotebookModel().metadata['publication-id'];
          delete $scope.model;
          delete $scope.attachmentUrl;
          $scope.saving = false;
          $scope.close();
        });
      }

      bkPublicationAuth.initSession()
      .then(function() {
        if ($scope.isSignedIn()) {
          initPublication();
        }
      })
      .finally(function() {
        $scope.initializing = false;
      });

      $scope.close = function(publicationId) {
        $uibModalInstance.close(publicationId || 'done');
      };

      $scope.signupUrl = function() {
        return $scope.baseUrl + '#/sign_up?redirect=' + encodeURIComponent($location.absUrl());
      };

      $scope.removeAttachment = function() {
        $scope.deletedAttachment = $scope.model['attachment-id'];
        $scope.model['attachment-id'] = -1;
        delete $scope.attachmentUrl;
      };

      $scope.uploadAttachment = function(file) {
        $scope.file = file;

        if (file && !file.$error) {
          file.upload = bkPublicationApi.uploadAttachment(file);
          file.upload = file.upload.progress(function(evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
          file.upload.then(function(resp) {
            if ($scope.attachmentUrl) {
              bkPublicationApi.deleteAttachment($scope.model['attachment-id']);
            }
            var attachment = resp.data;
            delete $scope.attachmentErrors;
            $scope.model['attachment-id'] = attachment['public-id'];
            $scope.attachmentUrl = bkPublicationApi.getAttachmentUrl(attachment['public-id']);
            delete file.progress;
          }, function(resp) {
            var err = resp.data;
            $scope.attachmentErrors = _.chain(err).values().flatten().value().join(', ');
          });
        }
      };
  }]);
})();

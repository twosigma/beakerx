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
/**
 * Module bk.publication
 * Publication API wrapper
 */
(function() {
  'use strict';
  var module = angular.module('bk.publication', [
    'bk.utils',
    'bk.core',
    'bk.sessionManager'
  ]);

  module.factory('bkPublicationApi', function (bkUtils, $localStorage, Upload) {
    var baseUrl = window.beakerRegister !== undefined && window.beakerRegister.publicationApiURL !== undefined ? window.beakerRegister.publicationApiURL : 'https://pub.beakernotebook.com';

    function headers() {
      if ($localStorage.token) {
        return {'X-Authorization': 'Token ' + $localStorage.token};
      }
    }

    return {
      createSession: function(params) {
        return bkUtils.httpPostJson(baseUrl + '/user/v1/sessions', params)
      },
      getCurrentUser: function() {
        return bkUtils.httpGetJson(baseUrl + '/user/v1/current_user', {silent: true}, headers())
      },
      createPublication: function(params) {
        return bkUtils.httpPostJson(baseUrl + '/notebook/v1/publications', params, headers());
      },
      updatePublication: function(id, params) {
        return bkUtils.httpPutJson(baseUrl + '/notebook/v1/publications/' + id, params, headers());
      },
      getPublication: function(id) {
        return bkUtils.httpGetJson(baseUrl + '/notebook/v1/publications/' + id, {}, headers());
      },
      deletePublication: function(id) {
        return bkUtils.httpDeleteJson(baseUrl + '/notebook/v1/publications/' + id, {}, headers());
      },
      getCategories: function() {
        return bkUtils.httpGetJson(baseUrl + '/notebook/v1/categories', {}, headers());
      },
      uploadAttachment: function(file) {
        return Upload.upload({
          url: baseUrl + '/user/v1/attachments',
          method: 'POST',
          headers: {'X-Authorization': 'Token ' + $localStorage.token},
          fields: {style: 'publication-preview'},
          file: file
        });
      },
      deleteAttachment: function(id) {
        return bkUtils.httpDeleteJson(baseUrl + '/user/v1/attachments/' + id, {}, headers());
      },
      getAttachmentUrl: function(id) {
        return baseUrl + '/user/v1/attachments/' + id;
      },
      getBaseUrl: function () {
        return baseUrl;
      }
    };
  });

  module.factory('bkPublicationAuth', function (bkPublicationApi, $localStorage) {
    var currentUser;

    return {
      signIn: function(user) {
        var self = this;
        return bkPublicationApi.createSession(user)
        .then(function(response) {
          if (response.data && response.data.token) {
            $localStorage.token = response.data.token
          }
          return self.initSession();
        });
      },
      signOut: function() {
        delete $localStorage.token;
        currentUser = null;
      },
      initSession: function() {
        return bkPublicationApi.getCurrentUser()
        .then(function(resp) {
          if (resp.data && resp.data.token) {
            $localStorage.token = resp.data.token
          }
          return currentUser = resp.data;
        });
      },
      currentUser: function() {
        return currentUser;
      },
      isSignedIn: function() {
        return !!currentUser;
      }
    };
  });

  module.factory('bkPublicationHelper', function (bkUtils, bkCoreManager, bkSessionManager) {
    return {
      helper: publicationHelper
    };

    function publicationHelper(type, $scope) {
      function addPublishMenuItem() {
        var item = {
          name: 'Publish...',
          action: function() {
            var notebook = $scope.getPublishData();
            var cb = function(r) {
              if (r != 'done') {
                $scope.cellmodel.metadata = {'publication-id': r};
              }
            };
            bkCoreManager.showPublishForm(notebook, cb);
          }
        };

        if (type == 'code') {
          $scope.cellmenu.addItem(item);
        } else {
          $scope.cellview.menu.addItem(item);
        }
      }

      function initWatcher() {
        $scope.$watch('cellmodel.metadata.publication-id', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });
      }

      function initPublishDataAction() {
        if (!angular.isFunction($scope['getPublishData'])) {
          $scope.getPublishData = function () {
            var evaluator = _.find(bkSessionManager.getRawNotebookModel().evaluators, function (evaluator) {
              return (type == 'code') ? (evaluator.name === $scope.cellmodel.evaluator) : true;
            });
            var cells = [$scope.cellmodel];
            return bkUtils.generateNotebook([evaluator], cells, $scope.cellmodel.metadata);
          };
        }

        addPublishMenuItem();
        initWatcher();
      };
      if (window.beakerRegister === undefined || window.beakerRegister.isEmbedded === undefined) {
        initPublishDataAction();
      }
    }
  });
})();

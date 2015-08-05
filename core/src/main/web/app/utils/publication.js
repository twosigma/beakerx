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
  var module = angular.module('bk.publication', ['bk.utils']);

  module.factory('bkPublicationApi', function (bkUtils, $localStorage) {
    var baseUrl = 'https://pub.beakernotebook.com';

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
        return bkUtils.httpGetJson(baseUrl + '/user/v1/user', {}, headers())
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
      initSession: function() {
        return bkPublicationApi.getCurrentUser()
        .then(function(resp) {
          return currentUser = resp.data;
        });
      },
      isSignedIn: function() {
        return !!currentUser;
      }
    };
  });
})();

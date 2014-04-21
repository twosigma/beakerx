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
 * M_angularUtils
 * This module provides AngularJS specific utilities that are shared across the whole application.
 */
(function() {
  'use strict';
  var module = angular.module('M_angularUtils', []);
  module.factory('angularUtils', function($rootScope, $location, $http, $q, $timeout) {
    return {
      setLocation: function(newLocation) {
        $location.path(newLocation);
      },
      refreshRootScope: function() {
        $rootScope.$$phase || $rootScope.$apply();
      },
      toPrettyJson: function(angularBoundJsObj) {
        function cleanup(key, value) {
          if (key == '$$hashKey') return undefined;
          return value;
        };
        return JSON.stringify(angularBoundJsObj, cleanup, 4) + "\n";
      },
      httpGet: function(url, data) {
        return $http({method: "GET", url: url, params: data});
      },
      httpPost: function(url, data) {
        return $http({
          method: "POST",
          url: url,
          data: $.param(data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
      },
      newDeferred: function() {
        return $q.defer();
      },
      newPromise: function() {
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      },
      delay: function(ms) {
        var deferred = $q.defer();
        $timeout(function() {
          deferred.resolve();
        }, ms);
        return deferred.promise;
      }
    };
  });
})();

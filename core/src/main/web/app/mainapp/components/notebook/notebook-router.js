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
  var module = angular.module('bk.notebookRouter', ['ngRoute']);

  module.controller('notebookRouter', function($scope, $route, $routeParams) {
    var sessionRouteResolve = $route.current.$$route.resolve;

    $scope.sessionId = $routeParams.sessionId;
    $scope.newSession = $route.current.locals.isNewSession;
    $scope.isImport = $route.current.locals.isImport;
    $scope.isOpen = $route.current.locals.isOpen;
    $scope.notebook = $route.current.locals.target;

    delete sessionRouteResolve.isNewSession;
    delete sessionRouteResolve.isImport;
    delete sessionRouteResolve.isOpen;
    delete sessionRouteResolve.target;
  });
})();

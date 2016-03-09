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
(function() {
  'use strict';
  var module = angular.module('bk.core');

  module.controller('BkoRenameController', ['$scope', '$uibModalInstance', 'dscope', 'bkHelper', function($scope, $uibModalInstance, dscope, bkHelper) {
    $scope.dscope = dscope;
    $scope.propertyName = undefined;

    var idx = dscope.getPropertyId();
    var model = dscope.model;
    var oldPropertyName = model && model.getCellModel().labels[idx];

    $scope.close = function() {
      $uibModalInstance.close('close');
    };
    $scope.save = function() {
      var beakerObj = bkHelper.getBeakerObject();
      var beaker = beakerObj.beakerObj;

      if (beaker && $scope.propertyName !== oldPropertyName) {
        var value = beaker[oldPropertyName];
        beaker[$scope.propertyName] = value;
        beakerObj.beakerObjectToNotebook();

        delete beaker[oldPropertyName];
        beakerObj.beakerObjectToNotebook();
      }

      $uibModalInstance.close('save');
    };
  }]);

})();
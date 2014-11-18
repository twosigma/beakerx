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
 * bkCell
 * - the controller that responsible for directly changing the view
 * - the container for specific typed cell
 * - the directive is designed to be capable of used in a nested way
 * - conceptually, a cell is 'cell model' + 'view model'(an example of what goes in to the view
 * model is code cell bg color)
 * - A bkCell is generically corresponds to a portion of the notebook model (currently, it is
 * always a branch in the hierarchy)
 * - When exporting (a.k.a. sharing), we will need both the cell model and the view model
 */

(function() {
  'use strict';
  var module = angular.module('bk.core');

  module.controller('CodeCellOptionsController', ['$scope', 'dialog', 'dscope', 'bkCoreManager', function($scope, dialog, dscope, bkCoreManager){
    $scope.dscope = dscope;
    $scope.initializationCell = dscope.initialization;
    $scope.cellName = dscope.id;
    $scope.cellTags = dscope.tags;
    $scope.isInitCell = function() {
      return $scope.initializationCell;
    };
    $scope.toggleInitCell = function() {
      $scope.initializationCell = !$scope.initializationCell;
    };
    $scope.close = function(){
      dialog.close('close');
    };
    $scope.save = function(){
      dscope.initialization = $scope.initializationCell;
      dscope.tags = $scope.cellTags;
      bkCoreManager.getNotebookCellManager().renameCell(dscope.id,$scope.cellName);
      dialog.close('save');
    };
}]);

})();

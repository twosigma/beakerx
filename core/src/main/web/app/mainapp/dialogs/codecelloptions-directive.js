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

  module.controller('CodeCellOptionsController', ['$scope', '$modalInstance', 'dscope', 'bkCoreManager', function($scope, $modalInstance, dscope, bkCoreManager) {
    $scope.dscope = dscope;
    $scope.initializationCell = dscope.initialization;
    $scope.cellName = dscope.id;
    $scope.cellTags = dscope.tags;
    $scope.isInitCell = function() {
      return this.initializationCell;
    };
    $scope.toggleInitCell = function() {
      this.initializationCell = !this.initializationCell;
    };
    $scope.saveDisabled = function() {
      return !(( this.getNameError() === '' ) && ( this.getTagError() === '' ));
    };
    $scope.isError = function() {
      return !!$scope.getNameError() || !!$scope.getTagError();
    };
    $scope.getNameError = function() {
      if(this.dscope.id === this.cellName)
        return '';
      return bkCoreManager.getNotebookCellManager().canRenameCell(this.cellName);
    };
    $scope.getTagError = function() {
      return bkCoreManager.getNotebookCellManager().canSetUserTags(this.cellTags);
    };
    $scope.close = function() {
      $modalInstance.close('close');
    };
    $scope.save = function() {
      if (this.saveDisabled())
        return;
      var reb = false;
      this.dscope.initialization = this.initializationCell;
      if (this.dscope.tags !== this.cellTags) {
        this.dscope.tags = this.cellTags;
        reb = true;
      }
      if (this.dscope.id !== this.cellName)
        bkCoreManager.getNotebookCellManager().renameCell(this.dscope.id,this.cellName);
      else if(reb)
        bkCoreManager.getNotebookCellManager().rebuildMaps()
      $modalInstance.close('save');
    };
}]);

})();

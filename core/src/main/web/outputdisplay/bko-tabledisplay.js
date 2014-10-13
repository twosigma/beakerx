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
 * bkoTableDisplay
 * This is the output display component for displaying tables.
 */
(function() {
  'use strict';
  beaker.bkoDirective('Table', ["bkCellMenuPluginManager", "bkDatatables", "bkUtils", function(bkCellMenuPluginManager, bkDatatables, bkUtils) {
    var CELL_TYPE = "bko-tabledisplay";
    return {
      template: '<table datatable="" dt-options="dtOptions" dt-columns="dtColumns" class="compact row-border hover"></table>',
      controller: function($scope) {
        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch("getShareMenuPlugin()", function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });
      },
      link: function(scope, element, attrs) {
        var data = scope.model.getCellModel().values;
        var columns = scope.model.getCellModel().columnNames;
       
        scope.dtOptions = bkDatatables.DTOptionsBuilder
          .fromFnPromise(function() {
            var deferred = bkUtils.newDeferred();
            deferred.resolve(data);
            return deferred.promise; })
          .withColReorder()
          .withColVis()
          .withTableTools('vendor/TableTools-2.2.3/swf/copy_csv_xls_pdf.swf')
          .withTableToolsButtons([
            'select_all',
            'select_none',
            'copy',
            {
              'sExtends': 'collection',
              'sButtonText': 'Save',
              'aButtons': ['csv', 'xls', 'pdf']
            }
          ])
          .withTableToolsOption('sRowSelect', 'os')
          .withOption('responsive', true)
          .withOption('searching', false);
        if (data.length > 15) {
          scope.dtOptions.withPaginationType('simple_numbers')
          .withDisplayLength(10);            
        } else {
          scope.dtOptions.withOption('paging', false);
        }
        scope.dtColumns = [ ];
        for (var i = 0; i < columns.length; i++) {
          scope.dtColumns.push(bkDatatables.DTColumnBuilder.newColumn(i).withTitle(columns[i]));
        }
      }
    };
  }]);
})();

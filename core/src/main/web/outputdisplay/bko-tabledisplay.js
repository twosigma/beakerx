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
  beaker.bkoDirective('Table', ["bkCellMenuPluginManager", "bkUtils", '$interval', 'uiGridConstants', function(bkCellMenuPluginManager, bkUtils, $interval, uiGridConstants) {
    var CELL_TYPE = "bko-tabledisplay";
    return {
      template: '<div ui-grid="gridOptions" ui-grid-cellNav ui-grid-resize-columns ui-grid-exporter ui-grid-pinning ui-grid-selection style="witdth: 500px; height: 350px; "></div>',
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

        var fakeI18n = function( title ){
          var deferred = bkUtils.newDeferred();
          $interval( function() {
            deferred.resolve( 'col: ' + title );
          }, 1000, 1);
          return deferred.promise;
        };
        
        scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [ ],
            modifierKeysToMultiSelectCells: true,
            enableRowSelection: true,
            enableColumnResizing: true,
            enableSelect: true,
            enableSelectAll: true,
            enableSelectionBatchEvent: false,
            multiSelect: true,
            selectionRowHeaderWidth: 35,
            enableGridMenu: true,
            showGridFooter: true,
            showColumnFooter: true,
            gridMenuShowHideColumns: false,
            
            gridMenuCustomItems: [
                                  {
                                    title: 'Clear Selection',
                                    action: function ($event) {
                                      scope.gridApi.selection.clearSelectedRows();
                                      scope.gridApi.core.notifyDataChange(scope.gridApi.grid, uiGridConstants.dataChange.ALL );
                                    }
                                  }

                                ]
         
        };
        scope.gridOptions.onRegisterApi = function(gridApi){
          scope.gridApi = gridApi;
          gridApi.selection.on.rowSelectionChanged(scope,function(row) {
            var msg = 'row selected ' + row.isSelected;
            console.log(msg);
          });
        }
        scope.gridOptions.rowIdentity = function(row) {
          return row.beakerid;
        };
        scope.gridOptions.getRowIdentity = function(row) {
          return row.beakerid;
        };
        
        scope.gridOptions.data = [];
        
        var i,j;
        for (j=0; j<columns.length; j++) {
          var f = 'f'+j;
          scope.gridOptions.columnDefs.push( { field: f, name: columns[j] } );
        }
        
        for (i=0; i<data.length; i++) {
          var d = data[i];
          var t = {};
          t.beakerid = i;
          for (j=0; j<columns.length; j++) {
            var f = 'f'+j;
            t[f] = d[j];
          }
          scope.gridOptions.data.push(t);
        }
                             
        scope.getDumpState = function() {
          return scope.model.getDumpState();
        };

        /*
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
                                  .withOption('scrollX', true)
                                  .withDOM('<"bko-table-top">rt<"bko-table-bottom"lp><"bko-table-bottom2"TC><"bko-table-clear">')
                                  .withOption('searching', false);
        if (data.length > 25) {
          scope.dtOptions.withPaginationType('simple_numbers')
          .withDisplayLength(25)
          .withOption('lengthMenu', [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]);
        } else {
          scope.dtOptions.withOption('paging', false);
          scope.dtOptions.withOption('scrollY', 350);
          scope.dtOptions.withOption('scrollCollapse', true);
        }
*/
        
        scope.state = {};
        var savedstate = scope.model.getDumpState();
        if (savedstate !== undefined && savedstate.tablestate !== undefined) {
          scope.state = savedstate.tablestate;
        }
        /*
        scope.dtOptions.withOption('stateSave', true);
        scope.dtOptions.withOption('stateSaveCallback',
            function (settings, data) {
          scope.state = data;
        });

        scope.dtOptions.withOption('stateLoadCallback',
            function (settings) {
          return scope.state;
        });

        scope.dtColumns = [ ];
        for (var i = 0; i < columns.length; i++) {
          if (columns[i] === "time") {
            if (scope.model.getCellModel().timeStrings) {
              scope.timeStrings = scope.model.getCellModel().timeStrings;
              scope.dtColumns.push(bkDatatables.DTColumnBuilder.newColumn(i).withTitle(columns[i])
                  .renderWith(function(data, type, full, meta)
                      {
                    return scope.timeStrings[meta.row];
                      }));
            } else {
              scope.tz = scope.model.getCellModel().timeZone;
              scope.dtColumns.push(bkDatatables.DTColumnBuilder.newColumn(i).withTitle(columns[i])
                  .renderWith(function(value,type,full,meta)
                      {
                    if (typeof value =='string')
                      return value;
                    var nano = value % 1000;
                    var micro = (value / 1000) % 1000;
                    var milli = value / 1000 / 1000;
                    var time = moment(milli);
                    var tz = scope.tz;
                    if (tz)
                      time.tz(tz);
                    return time.format("YYYYMMDD HH:mm:ss.SSS");
                      }));
            }
          } else
            scope.dtColumns.push(bkDatatables.DTColumnBuilder.newColumn(i).withTitle(columns[i]));
        }

        scope.$on('expand', function() {
          scope.dtOptions.dirty = true;
        });
*/
        
        scope.$watch('getDumpState()', function(result) {
          if (result !== undefined && result.tablestate === undefined) {
            scope.model.setDumpState({ tablestate : scope.state});
          }
        });
      }
    };
  }]);
})();

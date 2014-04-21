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
 * M_bkoTableDisplay
 * This is the output display component for displaying tables.
 */
(function() {
  'use strict';
  beaker.bkoDirective('Table', ["bkCellPluginManager", function(bkCellPluginManager) {
    return {
      template: '<div class="slickgrid" style="height:500px;"></div>',
      controller: function($scope) {
        $scope.getShareMenuPlugin = function() {
          // the following cellType needs to match
          //plugin.cellType = "bkTableDisplay"; in dynamically loaded outputDisplay_bkTableDisplay.js
          var cellType = "bkTableDisplay";
          return bkCellPluginManager.getPlugin(cellType);
        };
        $scope.$watch("getShareMenuPlugin()", function(getShareMenu) {
          if (getShareMenu && $scope.model.resetShareMenuItems) {
            $scope.model.resetShareMenuItems(getShareMenu($scope));
          }
        });

        var onDestroy = function() {
          //$scope.dt.fnDestroy();
          delete $scope.grid;
        };
        $scope.$on("$destroy", onDestroy);
        $scope.getColumns = function() {
          var columns = _.map($scope.model.getCellModel().columnNames, function(col) {
            return {id: col, name: col, field: col, sortable: true};
          });
          var elm = document.createElement('div');
          $(elm).addClass('ui-widget').addClass('slick-cell');
          var getWidth = function(text) {
            $(elm).html(text);
            $('body').append(elm);
            var width = $(elm).width();
            $(elm).remove();
            return width + 10;
          };

          _.each(columns, function(col) {
            col.width = getWidth(col.field);
          });
          var r, c, row, col, width;
          for (r = 0; r < $scope.model.getCellModel().values.length && r < 10; ++r) {
            row = $scope.model.getCellModel().values[r];
            for (c = 0; c < columns.length; c++) {
              width = getWidth(row[c]);
              col = columns[c];
              if (width > col.width) {
                col.width = width;
              }
            }
          }
          var timeCol = _.find(columns, function(it) {
            return it.field === "time";
          });
          if (timeCol) {
            // if the server provides the converted timeStrings, just use it
            if ($scope.model.getCellModel().timeStrings) {
              var timeStrings = $scope.model.getCellModel().timeStrings;
              timeCol.width = getWidth(timeStrings[0]);
              timeCol.formatter = function(row, cell, value, columnDef, dataContext) {
                return timeStrings[row];
              };
            } else {
              timeCol.width = getWidth("20110101 23:00:00.000 000 000");
              timeCol.formatter = function(row, cell, value, columnDef, dataContext) {
                var nano = value % 1000;
                var micro = (value / 1000) % 1000;
                var milli = value / 1000 / 1000;
                var d = new Date(milli);
                var doubleDigit = function(integer) {
                  if (integer < 10) {
                    return "0" + integer;
                  }
                  return integer.toString();
                };
                var trippleDigit = function(integer) {
                  if (integer < 10) {
                    return "00" + integer;
                  } else if (integer < 100) {
                    return "0" + integer;
                  }
                  return integer.toString();
                };
                var result = "";
                result += d.getFullYear() + doubleDigit(d.getMonth() + 1) + doubleDigit(d.getDate());
                result += " ";
                result += doubleDigit(d.getHours()) + ":" + doubleDigit(d.getMinutes()) + ":" + doubleDigit(d.getSeconds());
                result += ".";
                result += trippleDigit(d.getMilliseconds());
                result += " " + trippleDigit(micro);
                result += " " + trippleDigit(nano);
                return result;
              };
            }
          }
          return columns;
        };
        $scope.getOptions = function() {
          var options = {
            enableCellNavigation: true,
            enableColumnReorder: true,
            multiColumnSort: true,
            selectedCellCssClass: 'bk-table-cell-selected'
            //forceFitColumns: true
          };
          return options;
        };
        $scope.getData = function() {
          var data = _.map($scope.model.getCellModel().values, function(row) {
            return _.object($scope.model.getCellModel().columnNames, row);
          });
          return data;
        };
      },
      link: function(scope, element, attrs) {
        var data = scope.getData();
        var div = element.find('div');
        scope.grid = new Slick.Grid(div, data, scope.getColumns(), scope.getOptions());
        scope.grid.onSort.subscribe(function(e, args) {
          var cols = args.sortCols;
          data.sort(function(dataRow1, dataRow2) {
            for (var i = 0, l = cols.length; i < l; i++) {
              var field = cols[i].sortCol.field;
              var sign = cols[i].sortAsc ? 1 : -1;
              var value1 = dataRow1[field], value2 = dataRow2[field];
              var result = (value1 === value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;
              if (result !== 0) {
                return result;
              }
            }
            return 0;
          });
          scope.grid.invalidate();
          scope.grid.render();
        });

        // Use the plugin to allow copy/paste from other spreadsheets.
        // See http://labs.nereo.com/slick.html
        // See slick.cellexternalcopymanager.js for the options doc.
        var externalCopyManagerOpts = {
          copiedCellStyle: 'bk-table-copied-cell'
        };
        // Selection is pre-req of copying.
        scope.grid.setSelectionModel(new Slick.CellSelectionModel());
        scope.grid.registerPlugin(new Slick.CellExternalCopyManager(externalCopyManagerOpts));

        //table needs to be redrawn to get column sizes correct
        setTimeout(function() {
          var hasHorizontalScroll = function() {
            var viewport = element.find('.slick-viewport')[0];
            return viewport.clientWidth !== viewport.scrollWidth;
          };
          var h = element.find('.slick-header').height();
          h += element.find('.slick-row').size() * element.find('.slick-row').height();
          h += hasHorizontalScroll() ? 20 : 4;
          if (h < 500) {
            div.height(h);
            scope.grid.resizeCanvas();
          }
        }, 5);
      }
    };
  }]);
})();

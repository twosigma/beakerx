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
  (function($) {
    $.fn.dataTable.moment = function(format, locale) {
      var types = $.fn.dataTable.ext.type;
      // Add type detection
      types.detect.unshift(function(d) {
        // Null and empty values are acceptable
        if (d === '' || d === null) {
          return 'moment-' + format;
        }
        return (d.timestamp !== undefined && moment(d.timestamp).isValid()) ?
          'moment-' + format :
          null;
      });
      // Add sorting method - use an integer for the sorting
      types.order['moment-' + format + '-pre'] = function(d) {
        return d === '' || d === null ?
          -Infinity :
          parseInt(d.timestamp, 10);
      };
    };
  }(jQuery));

  $.fn.dataTable.moment('YYYYMMDD HH:mm:ss');
  $.fn.dataTable.moment('YYYYMMDD');
  $.fn.dataTable.moment('DD/MM/YYYY');

  $.fn.dataTable.Api.register( 'column().data().max()', function () {
    return this.length ? this.reduce( function (a, b) {
      var x = parseFloat( a ) || 0;
      var y = parseFloat( b ) || 0;
      return Math.max(x, y);
    } ) : 0;
  } );

  $.fn.dataTable.Api.register( 'column().data().min()', function () {
    return this.length ? this.reduce( function (a, b) {
      var x = parseFloat( a ) || 0;
      var y = parseFloat( b ) || 0;
      return Math.min(x, y);
    } ) : 0;
  } );

  // detect and sort by file size
  jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    'file-size-pre': function(a) {
      var x = a.substring(0, a.length - 2);
      var xUnit = (a.substring(a.length - 2, a.length).toLowerCase() == 'mb' ?
          1000 : (a.substring(a.length - 2, a.length).toLowerCase() == 'gb' ? 1000000 : 1));
      return parseInt(x * xUnit, 10);
    },
    'file-size-asc': function(a, b) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    'file-size-desc': function(a, b) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
  });

  var findDTColumnIndex = function(dtSettings, dtElement){
    var colInd;
    var dtCellNode = $(dtElement).closest('td').length ? $(dtElement).closest('td') : $(dtElement).closest('th');
    var fixedCols = dtSettings._oFixedColumns;
    if (dtCellNode.is('td')) {
      colInd = fixedCols.fnGetPosition(dtCellNode[0])[2];
    } else if (dtCellNode.is('th')) {
      var thInd = dtCellNode.index();
      var rightHeader = fixedCols ? fixedCols.dom.clone.right.header : null;
      if (rightHeader && $(rightHeader).has(dtCellNode).length) {
        var colsLength = 0;
        _.forOwn(dtSettings.aoColumns, function(value){
          if(value.bVisible){
            colsLength++;
          }
        });
        colInd = colsLength - fixedCols.s.rightColumns + thInd;
      } else {
        colInd = thInd;
      }
    }
    return colInd;
  };

  var findFilterInput = function (dtSettings, colInd) {
    var colsLength = 0;
    _.forOwn(dtSettings.aoColumns, function(value){
      if(value.bVisible){
        colsLength++;
      }
    });
    var fixedCols = dtSettings._oFixedColumns;
    var leftFixedHeader = fixedCols ? fixedCols.dom.clone.left.header : null;
    var rightFixedHeader = fixedCols ? fixedCols.dom.clone.right.header : null;
    var isFixedLeft = function (colInd) {
      return leftFixedHeader && fixedCols.s.leftColumns > colInd;
    };
    var isFixedRight = function (colInd) {
      return rightFixedHeader && fixedCols.s.rightColumns >= colsLength - colInd;
    };
    var jqInput;
    if (isFixedLeft(colInd)) {
      jqInput = $(leftFixedHeader).find('.filterRow th:eq(' + colInd + ') .filter-input');
    } else if (isFixedRight(colInd)) {
      var idxInRightClone = colInd - (colsLength - fixedCols.s.rightColumns);
      jqInput = $(rightFixedHeader).find('.filterRow th:eq(' + idxInRightClone + ') .filter-input');
    } else {
      var header = dtSettings.aoHeader[1][colInd];
      if (header) {
        jqInput = $(header.cell).find('.filter-input');
      }
    }
    return jqInput;
  };

  $.fn.dataTable.ext.search.push(
    function (settings, formattedRow, rowIndex, row) {

      if (!$(settings.nTHead).find('.filterRow').is(':visible')
        || $(settings.nTHead).find('.filter-input').hasClass('search-active')) {
        return true; // no filtering
      }

      var isValidJSIdentifier = function (columnTitle) {
        try {
          eval('var ' + columnTitle);
        } catch (e) { return false; }
        return true;
      };
      var formatValue = function (value) {
        if (typeof value === 'string') { return "'" + value + "'"; }
        if (value && value.type === 'Date') { return value.timestamp; }
        return value;
      };
      var evalExpression = function (expression, vars) {
        var result = true;
        if (!_.isEmpty(expression)) {
          try {
            result = eval(vars + expression);
          } catch (e) {
            if (!(e instanceof SyntaxError && e.message === 'Unexpected end of input')) {
              result = false;
              console.log(e.message);
            }
          }
        }
        return result;
      };

      var $$ = {};
      var variables = "var $ = undefined;";
      _.forEach(settings.aoColumns, function (column, index) {
        var title = $(column.sTitle).text();
        $$[title] = row[index];
        if (isValidJSIdentifier(title)) {
          variables += ('var ' + title + '=' + formatValue(row[index]) + ';');
        }
      });

      var tableFilterValue = findFilterInput(settings, 0).val();
      if (!evalExpression(tableFilterValue, variables)) {
        return false;
      }

      for (var colInd = 1; colInd < row.length; colInd++) {
        var columnFilter = findFilterInput(settings, colInd);
        if (columnFilter.hasClass('search-active')) {
          return true; //use expression parsing only for filtering
        }

        var columnFilterValue = columnFilter.val();

        if (_.isEmpty(columnFilterValue)) { continue; }

        variables += '$=' + formatValue(row[colInd]) + ';';
        if (!evalExpression(columnFilterValue, variables)) {
          return false;
        }
      }
      return true;
    }
  );

  jQuery.fn.dataTableExt.aTypes.unshift(function(sData) {
    if (typeof sData !== 'string') {
      return;
    }

    var sValidChars = '123456789';
    var Char;

    /* Check the numeric part */
    for (var i = 0; i < (sData.length - 3); i++) {
      Char = sData.charAt(i);
      if (sValidChars.indexOf(Char) == -1) {
        return null;
      }
    }
    /* Check for size unit KB, MB or GB */
    if (sData.substring(sData.length - 2, sData.length).toLowerCase() == 'kb' ||
      sData.substring(sData.length - 2, sData.length).toLowerCase() == 'mb' ||
      sData.substring(sData.length - 2, sData.length).toLowerCase() == 'gb') {
      return 'file-size';
    }
    return null;
  });

  // detect and sort by IP addresses
  jQuery.fn.dataTableExt.aTypes.unshift(function(sData) {
    if (/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(sData)) {
      return 'ip-address';
    }
    return null;
  });

  jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    'ip-address-pre': function(a) {
      var m = a.split('.');
      var x = '';
      for (var i = 0; i < m.length; i++) {
        var item = m[i];
        if (item.length === 1) {
          x += '00' + item;
        } else if (item.length === 2) {
          x += '0' + item;
        } else {
          x += item;
        }
      }
      return x;
    },
    'ip-address-asc': function(a, b) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    'ip-address-desc': function(a, b) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
  });
  moment.tz.link(['Etc/GMT+1|GMT+01:00',
                  'Etc/GMT+2|GMT+02:00',
                  'Etc/GMT+3|GMT+03:00',
                  'Etc/GMT+4|GMT+04:00',
                  'Etc/GMT+5|GMT+05:00',
                  'Etc/GMT+6|GMT+06:00',
                  'Etc/GMT+7|GMT+07:00',
                  'Etc/GMT+8|GMT+08:00',
                  'Etc/GMT+9|GMT+09:00',
                  'Etc/GMT+10|GMT+10:00',
                  'Etc/GMT+11|GMT+11:00',
                  'Etc/GMT+12|GMT+12:00',
                  'Etc/GMT-1|GMT-01:00',
                  'Etc/GMT-2|GMT-02:00',
                  'Etc/GMT-3|GMT-03:00',
                  'Etc/GMT-4|GMT-04:00',
                  'Etc/GMT-5|GMT-05:00',
                  'Etc/GMT-6|GMT-06:00',
                  'Etc/GMT-7|GMT-07:00',
                  'Etc/GMT-8|GMT-08:00',
                  'Etc/GMT-9|GMT-09:00',
                  'Etc/GMT-10|GMT-10:00',
                  'Etc/GMT-11|GMT-11:00',
                  'Etc/GMT-12|GMT-12:00',
                  'Etc/GMT-13|GMT-13:00',
                  'Etc/GMT-14|GMT-14:00']);
  //jscs:disable
  beakerRegister.bkoDirective('Table', ['bkCellMenuPluginManager', 'bkUtils', 'bkElectron', '$interval', 'GLOBALS',
    '$rootScope','$timeout', 'cellHighlighters', 'tableService', 'bkSessionManager', 'bkCoreManager',
    function(bkCellMenuPluginManager, bkUtils, bkElectron, $interval, GLOBALS,
             $rootScope, $timeout, cellHighlighters, tableService, bkSessionManager, bkCoreManager) {
  //jscs:enable
    var CELL_TYPE = 'bko-tabledisplay';
    var ROW_HEIGHT = 27;
    var ROW_HEIGHT_ADVANCED_MODE = 22;
    var DEFAULT_PAGE_LENGTH = 25;
    var MIN_ROWS_FOR_PAGING = DEFAULT_PAGE_LENGTH;
    var FC_LEFT_SEPARATOR_CLASS = 'left-fix-col-separator';
    var FC_RIGHT_SEPARATOR_CLASS = 'right-fix-col-separator';
    var TIME_UNIT_FORMATS = {
      DATETIME:     { title: 'datetime', format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ' },
      DAYS:         { title: 'date', format: 'YYYY-MM-DD' },
      HOURS:        { title: 'hours', format: 'YYYY-MM-DD HH:mm ZZ' },
      MINUTES:      { title: 'minutes', format: 'HH:mm ZZ' },
      SECONDS:      { title: 'seconds', format: 'HH:mm:ss ZZ' },
      MILLISECONDS: { title: 'milliseconds', format: 'HH:mm:ss.SSS ZZ' }
    };
    return {
      template: JST['bko-tabledisplay/output-table'],
      controller: function($scope, $uibModal) {

        $scope.id = 'table_' + bkUtils.generateId(6);
        $scope.rowsToDisplayMenu = [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']];

        $scope.showColumnMenu = {
          searchable: function(){
            return $scope.columnNames && $scope.columnNames.length > 10;
          }
        };

        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch('getShareMenuPlugin()', function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });

        $scope.exportTo = function(rows, format) {
          var data = rows.data();
          var settings = $scope.table.settings()[0];
          var rowIndexes = rows[0];
          var i;
          var j;
          var startingColumnIndex = 1;
          var order;
          var out = '';
          var eol = '\n';
          var sep = ',';
          var qot = '"';
          var fix = function(s) { return s.replace(/"/g, '""');};
          var model = $scope.model.getCellModel();
          var hasIndex = model.hasIndex === "true";
          if (hasIndex) {
            startingColumnIndex = 0;
          }

          if (format === 'tabs') {
            sep = '\t';
            qot = '';
            fix = function(s) { return s.replace(/\t/g, ' ');};
          }
          if (navigator.appVersion.indexOf('Win') !== -1) {
            eol = '\r\n';
          }

          for (i = startingColumnIndex; i < $scope.columns.length; i++) {
            order = $scope.colorder[i];
            if (!$scope.table.column(i).visible()) {
              continue;
            }
            if (out !== '') {
              out = out + sep;
            }
            var columnTitle
                = (hasIndex && i === startingColumnIndex)
                ? "Index"
                : fix($($scope.columns[order].title).text());
            out = out + qot + columnTitle + qot;
          }
          out = out + eol;

          for (i = 0; i < data.length; i++) {
            var row = data[i];
            var some = false;
            for (j = startingColumnIndex; j < row.length; j++) {
              order = $scope.colorder[j];
              if (!$scope.table.column(j).visible()) {
                continue;
              }
              if (!some) {
                some = true;
              } else {
                out = out + sep;
              }
              var d = row[j];
              if ($scope.columns[order].render !== undefined) {
                d = $scope.columns[order].render(d, 'csv', null,
                                                 {settings: settings,
                                                  row: rowIndexes[i],
                                                  col: order});
              }
              if (d == null) {
                d = '';
              }
              d = d + '';
              out = out + qot + (d !== undefined && d !== null ? fix(d) : '') + qot;
            }
            out = out + eol;
          }
          return out;
        };
        
        $scope.getCSV = function(selectedRows) {
          var data;
          var filename;
          var isFiltered = function (index) {
            return $scope.table.settings()[0].aiDisplay.indexOf(index) > -1;
          };
          if (!selectedRows) {
            data = $scope.table.rows(isFiltered).data();
          } else {
            data = $scope.table.rows(function(index, data, node) {
              return $scope.selected[index] && isFiltered(index);
            });
          }
          return $scope.exportTo(data, 'csv');
        };
        
        $scope.doCSVDownload = function(selectedRows) {
          var href = 'data:attachment/csv;charset=utf-8,' + encodeURI($scope.getCSV(selectedRows));
          var target = '_black';
          var filename = 'tableRows.csv';
          var anchor = document.createElement('a');
          anchor.href = href;
          anchor.target = target;
          anchor.download = filename;
          var event = document.createEvent("MouseEvents");
          event.initEvent(
            "click", true, false
          );
          anchor.dispatchEvent(event);

        };

        $scope.doCSVExport = function(selectedRows) {
          bkHelper.showFileSaveDialog({
            extension: "csv",
            title: 'Select name for CSV file to save',
            saveButtonTitle : 'Save'
          }).then(function (ret) {
            if (ret.uri) {
              return bkHelper.saveFile(ret.uri, $scope.getCSV(selectedRows), true);
            }
          });
        };
        
        // reset table state
        $scope.doResetAll = function () {
          $scope.table.state.clear();
          $scope.init($scope.getCellModel(), false);
        };

        // these are the menu actions
        $scope.doSelectAll = function(idx) {
          if ($scope.table === undefined) {
            return;
          }
          for (var i in $scope.selected) {
            $scope.selected[i] = true;
          }
          //jscs:disable
          $scope.update_selected();
          //jscs:enable
        };
        $scope.doDeselectAll = function(idx) {
          if ($scope.table === undefined) {
            return;
          }
          for (var i in $scope.selected) {
            $scope.selected[i] = false;
          }
          //jscs:disable
          $scope.update_selected();
          //jscs:enable
        };
        $scope.doReverseSelection = function(idx) {
          if ($scope.table === undefined) {
            return;
          }
          for (var i in $scope.selected) {
            $scope.selected[i] = !$scope.selected[i];
          }
          //jscs:disable
          $scope.update_selected();
          //jscs:enable
        };
        $scope.doCopyToClipboard = function(idx) {
          var queryCommandEnabled = true;
          try {
            document.execCommand('Copy');
          } catch (e) {
            queryCommandEnabled = false;
          }
          if (!bkUtils.isElectron && queryCommandEnabled) {
            var getTableData = function() {
              var isFiltered = function (index) {
                return $scope.table.settings()[0].aiDisplay.indexOf(index) > -1;
              };
              var rows = $scope.table.rows(function(index, data, node) {
                return isFiltered(index) && $scope.selected[index];
              });
              if (rows === undefined || rows.indexes().length === 0) {
                rows = $scope.table.rows(isFiltered);
              }
              var out = $scope.exportTo(rows, 'tabs');
              return out;
            };
            var executeCopy = function (text) {
              var input = document.createElement('textarea');
              document.body.appendChild(input);
              input.value = text;
              input.select();
              document.execCommand('Copy');
              input.remove();
            };
            var data = getTableData();
            executeCopy(data);
          }
        };

        $scope.isEmbedded = window.beakerRegister.isEmbedded ? true : false;
        $scope.isPublication = window.beakerRegister.isPublication ? true : false;
        $scope.isIFrame = (window.location != window.parent.location) ? true : false;

        $scope.getCellIdx      =  [];
        $scope.getCellNam      =  [];
        $scope.getCellSho      =  [];
        $scope.getCellAlign    =  [];
        $scope.getCellDisp     =  [];
        $scope.getCellDispOpts =  [];

        $scope.getCellDispOptsF = function(i) {
          return $scope.getCellDispOpts[i];
        };

        $scope.toggleColumnsVisibility = function(visible) {
          if (!$scope.table) {
            return;
          }

          var table = $scope.table;
          var cLength = [];
          for (var i = 1; i < $scope.columns.length; i++) {
            cLength.push(i);
          }
          table.columns(cLength).visible(visible);
        };

        $scope.getColumnIndexByColName = function (columnName) { // takes into account colorder and index column
          var initInd = $scope.columnNames.indexOf(columnName) + 1;
          return !_.isEmpty($scope.colorder) ? $scope.colorder.indexOf(initInd) : initInd;
        };

        $scope.getColumnByInitialIndex = function(index){
          if (!$scope.table) { return null; }
          if ($scope.colorder){
            index = $scope.colorder.indexOf(index);
          }
          return $scope.table.column(index);
        };

        $scope.showColumn = function (initialIndex, event) {
          var column = $scope.getColumnByInitialIndex(initialIndex);
          column.visible(!column.visible());
          if(event){
            event.stopPropagation();
          }
        };
        $scope.isColumnVisible = function (initialIndex) {
          var column = $scope.getColumnByInitialIndex(initialIndex);
          return column && column.visible();
        };

        $scope.doUsePagination = function () {
          $scope.pagination.use = !$scope.pagination.use;
          if(!$scope.pagination.use){
            $scope.pagination.rowsToDisplay = $scope.table.settings()[0]._iDisplayLength;
          }
          // reorder the table data
          $scope.applyChanges();
        };

        $scope.refreshCells = function() {
          $scope.getCellIdx      =  [];
          $scope.getCellNam      =  [];
          $scope.getCellSho      =  [];
          $scope.getCellAlign    =  [];
          $scope.getCellDisp     =  [];
          $scope.getCellDispOpts =  [];

          if ($scope.table === undefined) {
            return;
          }

          var i;
          for (i = 1; i < $scope.columns.length; i++) {
            $scope.getCellIdx.push(i - 1);
            var order = $scope.colorder[i];
            $scope.getCellNam.push($scope.columns[order].title);
            $scope.getCellSho.push($scope.getColumnByInitialIndex(i).visible());
            $scope.getCellDisp.push($scope.actualtype[order - 1]);
            $scope.getCellAlign.push($scope.actualalign[order - 1]);
            if ($scope.types) {
              if ($scope.types[order - 1] === 'string') {
                $scope.getCellDispOpts.push($scope.allStringTypes);
              } else if ($scope.types[order - 1] === 'double') {
                $scope.getCellDispOpts.push($scope.allDoubleTypes);
              } else if ($scope.types[order - 1] === 'integer') {
                $scope.getCellDispOpts.push($scope.allIntTypes);
              } else if ($scope.types[order - 1] === 'time' || $scope.types[order - 1] === 'datetime') {
                $scope.getCellDispOpts.push($scope.allTimeTypes);
              } else if ($scope.types[order - 1] === 'boolean') {
                $scope.getCellDispOpts.push($scope.allBoolTypes);
              } else {
                $scope.getCellDispOpts.push($scope.allStringTypes);
              }
            } else {
              $scope.getCellDispOpts.push($scope.allTypes);
            }
          }
          $($scope.table.table().header()).find("th").each(function(i){
            var events = jQuery._data(this, 'events');
            if (events && events.click) {
              var click = events.click[0].handler;
              $(this).unbind('click.DT');
              $(this).bind('click.DT', function (e) {
                if(!$(e.target).hasClass('bko-column-header-menu')){
                  click(e);
                  setTimeout(function(){
                    $scope.tableOrder = [];
                    var order = $scope.table.order();
                    for(var i = 0; i < order.length; i++){
                      $scope.tableOrder.push([$scope.colorder[order[i][0]], order[i][1]]);
                    }
                  }, 0);
                }
                $(this).blur(); //outline is not removed for fixed columns so remove it manually
              });
            }
          });
          $.each($scope.colreorg.s.dt.aoColumns, function (i, column) {
            var filter = $scope.getColumnFilter($scope.table.column(column.idx + ":visible"));
            if (filter) {
              filter.closest('th').attr('data-column-index', i);
            }
          });
        };

        $scope.getColumnFilter = function(column){
          return findFilterInput($scope.table.settings()[0], column.index());
        };

        $scope.tableHasFocus = function(){
          var dtContainer = $($scope.table.table().container());
          return dtContainer.hasClass("focus") || dtContainer.has(':focus').length;
        };

        $scope.removeFilterListeners = function () {
          var filterInputSelector = '.filterRow .filter-input';
          var clearFilterSelector = '.filterRow .clear-filter';
          $($scope.table.table().container()).off('keyup.column-filter change.column-filter keydown.column-filter ' +
            'blur.column-filter focus.column-filter', filterInputSelector);
          $($scope.table.table().container()).off('mousedown.column-filter', clearFilterSelector);
        };

        $scope.getColumn = function(filterNode){
          return $scope.table.column($scope.getColumnIndexByCellNode(filterNode) + ':visible');
        };

        $scope.columnFilterFn = function (e) {
          if (e.keyCode === 27 || e.keyCode === 13) { return; }
          if ($(this).hasClass('table-filter')) {
            $scope.tableFilter = this.value;
            if ($scope.columnSearchActive) {
              $scope.table.search($scope.tableFilter).draw();
            } else {
              $scope.table.draw();
            }
          } else {
            var column = $scope.getColumn(this);
            var colIdx = $(this).parents('th').index();
            if ($scope.columnSearchActive) {
              column.search(this.value);
            }
            $scope.columnFilter[$scope.colorder[colIdx] - 1] = this.value;
            column.draw();
            $scope.updateFilterWidth($(this), column);
          }
        };

        // Apply filters
        $scope.applyFilters = function (){
          if (!$scope.table) { return; }
          $scope.removeFilterListeners();
          var filterInputSelector = '.filterRow .filter-input';
          var clearFilterSelector = '.filterRow .clear-filter';
          $($scope.table.table().container())
            .on('keyup.column-filter change.column-filter', filterInputSelector,
              $scope.columnSearchActive ? $scope.columnFilterFn : $.debounce(500, $scope.columnFilterFn))
            .on('focus.column-filter', filterInputSelector, function (event) {
              if($scope.keyTable){
                $scope.keyTable.blur();
              }
            })
            .on('blur.column-filter', filterInputSelector, function (event) {
              $scope.onFilterBlur($(this));
            })
            .on('keydown.column-filter', filterInputSelector, function (event) {
              var key = event.which;
              var column = $scope.getColumn(this);
              switch (key) {
                case 13: //enter key
                  $scope.onFilterBlur($(this), this);
                  break;
                case 27: //esc
                  event.preventDefault();
                  $scope.clearFilter(column, $(this));
                  $scope.updateFilterWidth($(this), column);
                  break;
                default:
                  $scope.onFilterEditing($(this), column);
              }
            })
            .on('mousedown.column-filter', clearFilterSelector, function (event) {
              var column = $scope.getColumn(this);
              var jqFilterInput = $(this).siblings('.filter-input');
              if(jqFilterInput.is(':focus')){
                event.preventDefault();
              }
              $scope.clearFilter(column, jqFilterInput);
              $scope.updateFilterWidth(jqFilterInput, column);
            });
        };

        $scope.updateFixedColumnsSeparator = function () {
          if ($scope.table) {
            var getHeader = function (thIndex) {
              return $($scope.table.header()).find('tr').find('th:eq(' + thIndex + ')');
            };
            var updateColumn = function (columnIndex, cssClass) {
              var column = $scope.table.column(columnIndex);
              if (!column.visible()) { return; }
              var columnHeader = getHeader($(column.header()).index());
              $(column.nodes()).addClass(cssClass);
              columnHeader.addClass(cssClass);
            };
            updateColumn($scope.pagination.fixLeft, FC_LEFT_SEPARATOR_CLASS);
            if ($scope.pagination.fixRight) {
              updateColumn($scope.columns.length - $scope.pagination.fixRight, FC_RIGHT_SEPARATOR_CLASS);
            }
          }
        };

        $scope.renderMenu = false;

        var chr = {
          '"': '&quot;', '&': '&amp;', '\'': '&#39;',
          '/': '&#47;',  '<': '&lt;',  '>': '&gt;'
        };

        $scope.escapeHTML = function(text) {
          if ($.type(text) === 'string') {
            return text.replace(/[\'&'\/<>]/g, function(a) { return chr[a]; });
          }
          return text;
        };

        $scope.allTypes = [{type: 0, name: 'string'},
        {type: 1, name: 'integer'},
        {type: 2, name: 'formatted integer'},
        {type: 3, name: 'double'},
        {type: 4, name: 'double with precision'},
        {type: 6, name: 'exponential 5'},
        {type: 7, name: 'exponential 15'},
        {type: 8, name: 'datetime'},
        {type: 9, name: 'boolean'},
        {type: 10, name: 'html'}];
        $scope.allConverters = {
          // string
          0: function(value, type, full, meta) {
            if (_.isObject(value) && value.type === 'Date') {
              value = moment(value.timestamp).format('YYYYMMDD HH:mm:ss.SSS ZZ');
            }
            if (type === 'display' && value !== null && value !== undefined) {
              return $scope.escapeHTML(value);
            }
            return value;
          },
          // integer
          1: function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              return parseInt(value);
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // formatted integer
          2: function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              var x = parseInt(value);
              if (!isNaN(x)) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              }
              return x;
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // double
          3: function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              var doubleValue = parseFloat(value);
              var colFormat = $scope.stringFormatForColumn[$(meta.settings.aoColumns[meta.col].sTitle).text()];
              var typeFormat = $scope.stringFormatForType.double;
              var format = colFormat && colFormat.type === 'decimal' ? colFormat : typeFormat;
              if (format && format.type === 'decimal') {
                var precision = doubleValue.toString().split('.')[1];
                if (precision && precision.length >= format.maxDecimals){
                  return doubleValue.toFixed(format.maxDecimals);
                } else {
                  return doubleValue.toFixed(format.minDecimals);
                }
              } else {
                return doubleValue;
              }
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // exponential 5
          6: function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              return parseFloat(value).toExponential(5);
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // exponential 15
          7: function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              return parseFloat(value).toExponential(15);
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // datetime
          8: function(value, type, full, meta) {
            var time;
            var tz;
            if ($scope.timeStrings) {
              return $scope.timeStrings[meta.row];
            }
            if (type === 'display' || type === 'csv') {
              var format = _.isEmpty($scope.formatForTimes) ?
                TIME_UNIT_FORMATS.DATETIME.format : TIME_UNIT_FORMATS[$scope.formatForTimes].format;
              if (_.isObject(value) && value.type === 'Date') {
                return bkUtils.formatTimestamp(value.timestamp, $scope.tz, format);
              }
              var milli = value / 1000 / 1000;
              return bkUtils.formatTimestamp(milli, $scope.tz, format);
            }
            return value;
          },
          // boolean
          9: function(value, type, full, meta) {
            if (value !== undefined && value !== null && (value.toLowerCase() === 'true' || value === 1)) {
              return 'true';
            }
            return 'false';
          },
          // html
          10: function(value, type, full, meta) {
            return value;
          }
        };
        $scope.valueFormatter = function(value, type, full, meta) {
          var columnName = $scope.columnNames[meta.col - 1];
          return $scope.stringFormatForColumn[columnName].values[columnName][meta.row];
        };
        $scope.isDoubleWithPrecision = function(type){
          var parts = type.toString().split(".");
          return parts.length > 1 && parts[0] === '4';
        };
        $scope.getDoublePrecision = function(type){
          return $scope.isDoubleWithPrecision(type) ? type.toString().split(".")[1] : null;
        };
        $scope.getActualTypeByPrecision = function(precision){
          return '4.' + precision;
        };
        $scope.doubleWithPrecisionConverters = {}; //map: precision -> convert function
        for (var precision = 1; precision < 10; precision++) {
          $scope.doubleWithPrecisionConverters[precision] = function(precision, value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              return parseFloat(value).toFixed(precision);
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          }.bind({}, precision);
        }
        $scope.allStringTypes = [{type: 0, name: 'string'}, {type: 10, name: 'html'}];
        $scope.allTimeTypes   = [{type: 8, name: 'datetime'},
                                 {type: 0, name: 'string'}];
        $scope.allIntTypes    = [{type: 0, name: 'string'},
        {type: 1, name: 'integer'},
        {type: 2, name: 'formatted integer'},
        {type: 8, name: 'datetime'}];
        $scope.allDoubleTypes = [{type: 0, name: 'string'},
        {type: 3, name: 'double'},
        {type: 4, name: 'double with precision'},
        {type: 6, name: 'exponential 5'},
        {type: 7, name: 'exponential 15'}];
        $scope.allBoolTypes = [{type: 0, name: 'string'},
        {type: 9, name: 'boolean'}];

        $scope.applyChanges = function() {
          $scope.doDestroy(false);
          $scope.update = true;
          // reorder the table data
          var model = $scope.model.getCellModel();
          $scope.doCreateData(model);
          $scope.doCreateTable(model);
        };

        $scope.getScrollY = function () {
          var rowHeight = bkHelper.getBkNotebookViewModel().isAdvancedMode() ? ROW_HEIGHT_ADVANCED_MODE : ROW_HEIGHT;
          var rowsNumber = $scope.pagination.rowsToDisplay > 0 ? $scope.pagination.rowsToDisplay : $scope.data.length;
          return rowsNumber * rowHeight;
        };

        $scope.changePageLength = function (len) {
          $scope.pagination.rowsToDisplay = len;
          if ($scope.pagination.use) {
            $scope.table.page.len(len).draw();
          } else {
            var scrollBody = $('#' + $scope.id).parent();
            scrollBody.css('max-height', $scope.getScrollY());
            $scope.update_size();
          }
        };
      },
      link: function(scope, element) {

        var cellModel;

        var unregisterOutputExpandEventListener = angular.noop; // used for deregistering listener

        var redrawTable = function(){
          if (scope.table !== undefined && tableChanged) {
            $timeout(function () {
              _.defer(function(){ scope.table.draw(false);});
              tableChanged = false;
            }, 0);
          }
        };

        scope.getScrollBarWidth = function () {
          var sizer = $('<p/>').css({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 150,
              padding: 0,
              overflow: 'scroll',
              visibility: 'hidden'
            })
            .appendTo('body');
          var width = sizer[0].offsetWidth - sizer[0].clientWidth;
          sizer.remove();
          return width;
        };
        scope.scrollbarWidth = scope.getScrollBarWidth();

        scope.getTheme = function () {
          return bkHelper.getTheme();
        };
        scope.$watch('getTheme()', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            if (scope.table) {
              scope.scrollbarWidth = scope.getScrollBarWidth();
              scope.table.settings()[0].oScroll.iBarWidth = scope.scrollbarWidth;
              scope.update_size();
            }
          }
        });

        scope.containerClickFunction = function(e){
          if (scope.table) {
            if ($(scope.table.table().container()).has(e.target).length) {
              scope.addInteractionListeners();
            } else {
              scope.removeInteractionListeners();
            }
          }
        };

        scope.doDestroy = function(all) {
          if (scope.table) {
            //jscs:disable
            clearTimeout(scope.refresh_size);
            //jscs:enable
            $(window).unbind('resize.' + scope.id);
            $('#' + scope.id + ' tbody').off('click');
            $('#' + scope.id + ' tbody').off('dblclick');
            scope.removeOnKeyListeners();
            $('#' + scope.id + ' tbody').off('mouseleave.bko-dt-highlight');
            $('#' + scope.id + ' tbody').off('mouseenter.bko-dt-highlight');
            scope.removeInteractionListeners();
            scope.table.off('key');
            scope.table.off('column-visibility.dt');
            scope.removeFilterListeners();
            $(scope.table.table().container()).find('.dataTables_scrollHead').off('scroll');
            $(element).find(".bko-table-use-pagination").remove();

            $.contextMenu('destroy', {
              selector: '#' + scope.id + ' tbody td'
            });
            $.contextMenu('destroy', {
              selector: '#' + scope.id +'_wrapper thead'
            });
            $(document).off('contextmenu.bko-dt-header', '#' + scope.id +'_wrapper thead th');

            if (all) {
              scope.table.destroy(true);
            }

            delete scope.keyTable;
            delete scope.table;
            delete scope.colreorg;
            if (scope.clipclient !== undefined) {
              scope.clipclient.destroy();
              delete scope.clipclient;
            }
            delete scope.fixcols;
            scope.fixcreated = false;
            scope.renderMenu = false;
          }
          if (all) {
            delete scope.timeStrings;
            delete scope.tz;
            delete scope.columnNames;
            delete scope.types;
            delete scope.actualtype;
            delete scope.actualalign;
            delete scope.data;
            delete scope.update;
            delete scope.tableOrder;
            $(document.body).off('click.bko-dt-container', scope.containerClickFunction);
          }
          unregisterOutputExpandEventListener();

          scope.$on(GLOBALS.EVENTS.CELL_OUTPUT_LM_SHOWED, function() {
            var parents = element.parents();
            var cyclingContainer =  _.find(parents, function (parent) {
              return parent.id.indexOf("lm-cycling-panel") !== -1;
            });
            if (cyclingContainer && cyclingContainer.style.display !== 'none'){
              redrawTable();
            }
            var tabContainer =  _.find(parents, function (parent) {
              return parent.id.indexOf("lm-tab-panel") !== -1;
            });
            if (tabContainer && tabContainer.classList.contains("active")){
              redrawTable();
            }
          });
        };
        scope.init = function(model, destroy) {
          scope.doDestroy(destroy);

          unregisterOutputExpandEventListener = scope.$on(GLOBALS.EVENTS.CELL_OUTPUT_EXPANDED, function() {
            var parents = element.parents();
            var cyclingContainer =  _.find(parents, function (parent) {
              return parent.id.indexOf("lm-cycling-panel") !== -1;
            });
            if (cyclingContainer && cyclingContainer.style.display === 'none'){
              return;
            }
            var tabContainer =  _.find(parents, function (parent) {
              return parent.id.indexOf("lm-tab-panel") !== -1;
            });

            if (tabContainer && !tabContainer.classList.contains("active")){
              return;
            }
            redrawTable();
          });

          var i;

          // validate saved state (if any) by using column \Names
          var modelColumnNames;
          if (model.columnNames) {
            modelColumnNames = model.columnNames.slice(0);
            if (model.hasIndex === 'true') {
              modelColumnNames.shift();
            }
          }
          if (scope.savedstate !== undefined) {
            if (scope.savedstate.columnNames === undefined) {
              scope.savedstate = undefined;
            } else if (scope.savedstate.columnNames.length !== modelColumnNames.length) {
              scope.savedstate = undefined;
            } else {
              for (i = 0; i < scope.savedstate.columnNames.length; i++) {
                if (modelColumnNames[i] !== scope.savedstate.columnNames[i]) {
                  scope.savedstate = undefined;
                  break;
                }
              }
            }
          }

          scope.hasIndex = model.hasIndex === 'true';

          // copy basic data
          if (model.columnNames !== undefined)
            scope.columnNames = model.columnNames.slice(0);
          else
            scope.columnNames = undefined;
          scope.timeStrings = model.timeStrings;
          scope.tz          = model.timeZone;
          if (model.types !== undefined)
            scope.types = model.types.slice(0);
          else
            scope.types = undefined;

          if (scope.hasIndex) {
            if (scope.columnNames !== undefined) {
              scope.indexName = scope.columnNames[0];
              scope.columnNames.shift();
            } else {
              scope.indexName = '     ';
            }
            if (scope.types !== undefined) {
              scope.indexType = scope.types[0];
              scope.types.shift();
            } else {
              scope.indexType = 'index';
            }
          }

          // compute how to display columns (remind: dummy column to keep server ordering)
          if (scope.savedstate !== undefined) {
            // we have a display state to recover
            scope.actualtype  = scope.savedstate.actualtype;
            scope.actualalign = scope.savedstate.actualalign;
            scope.colorder    = scope.savedstate.colorder;
            scope.getCellSho  = scope.savedstate.getCellSho;
            scope.pagination  = scope.savedstate.pagination;
            //fix saved pagination values to be numbers
            if (typeof scope.pagination.fixLeft === 'boolean') {
              scope.pagination.fixLeft = 0;
            }
            if (typeof scope.pagination.fixRight === 'boolean') {
              scope.pagination.fixRight = 0;
            }
            scope.barsOnColumn          = scope.savedstate.barsOnColumn || {};
            scope.cellHighlightersData  = scope.savedstate.cellHighlightersData || {};
            scope.tableFilter           = scope.savedstate.tableFilter || '';
            scope.columnFilter          = scope.savedstate.columnFilter || [];
            scope.showFilter            = scope.savedstate.showFilter;
            scope.columnSearchActive    = scope.savedstate.columnSearchActive;
            scope.columnWidth           = scope.savedstate.columnWidth || [];
            scope.tableOrder            = scope.savedstate.tableOrder;
            scope.formatForTimes        = scope.savedstate.formatForTimes;
            scope.stringFormatForType   = scope.savedstate.stringFormatForType || {};
            scope.stringFormatForColumn = scope.savedstate.stringFormatForColumn || {};
            scope.tooltips = scope.savedstate.tooltips || [];
            scope.dataFontSize = scope.savedstate.dataFontSize;
            scope.headerFontSize = scope.savedstate.headerFontSize;
            scope.fontColor = scope.savedstate.fontColor;
            scope.headersVertical = scope.savedstate.headersVertical;

            scope.savedstate  = undefined;
          } else {
            if (!_.isEmpty(model.columnsVisible) && _.isEmpty(model.columnOrder)) {
              scope.getCellSho = [];
              _.forEach(scope.columnNames, function(columnName){
                var visible = model.columnsVisible.hasOwnProperty(columnName) ? model.columnsVisible[columnName] : true;
                scope.getCellSho.push(visible);
              });
            } else {
              scope.getCellSho = undefined;
            }

            if (!_.isEmpty(model.columnOrder)) {
              scope.colorder = [0];
              scope.getCellSho = [];
              _.forEach(model.columnOrder, function (columnName) {
                scope.colorder.push(scope.columnNames.indexOf(columnName) + 1);
              });
              _.forEach(scope.columnNames, function (columnName) {
                var colIndex = model.columnOrder.indexOf(columnName);
                var visible = colIndex > -1;
                scope.getCellSho.push(visible);
                if (!visible) {
                  scope.colorder.push(scope.columnNames.indexOf(columnName) + 1);
                }
              });
            } else {
              scope.colorder = undefined;
            }

            scope.barsOnColumn = {}; //map: col index -> show bars
            if (!_.isEmpty(model.rendererForType)) {
              _.forEach(scope.types, function (type, index) {
                var renderer = model.rendererForType[type];
                if (renderer) {
                  scope.applyColumnRenderer(index, renderer);
                }
              });
            }
            _.forOwn(model.rendererForColumn, function (renderer, columnName) {
              scope.applyColumnRenderer(scope.getColumnIndexByColName(columnName) - 1, renderer);
            });

            scope.cellHighlightersData = model.cellHighlighters ? _.map(model.cellHighlighters, function(highlighter){
              return _.extend({colInd: scope.getColumnIndexByColName(highlighter.colName)}, highlighter);
            }) : {};
            scope.tableFilter       = '';
            scope.columnFilter      = [];
            scope.showFilter        = false;
            scope.columnSearchActive = false;
            scope.columnWidth       = [];
            scope.tableOrder        = undefined;
            var columnsFrozen = [];
            _.forOwn(model.columnsFrozen, function (frozen, columnName) {
              if (frozen) {
                columnsFrozen.push(scope.getColumnIndexByColName(columnName));
              }
            });
            var columnsFrozenRight = [];
            _.forOwn(model.columnsFrozenRight, function (frozen, columnName) {
              if (frozen) {
                columnsFrozenRight.push(scope.getColumnIndexByColName(columnName));
              }
            });
            scope.pagination = {
              'use' : true,
              'rowsToDisplay' : DEFAULT_PAGE_LENGTH,
              'fixLeft' : !_.isEmpty(columnsFrozen) ? Math.max.apply(null, columnsFrozen) : 0,
              'fixRight' : !_.isEmpty(columnsFrozenRight) ? scope.columnNames.length - Math.min.apply(null, columnsFrozenRight) + 1 : 0,
            };
            scope.formatForTimes        = model.stringFormatForTimes || {};
            scope.stringFormatForType   = model.stringFormatForType || {};
            scope.stringFormatForColumn = model.stringFormatForColumn || {};
            scope.tooltips              = model.tooltips || [];
            scope.dataFontSize          = model.dataFontSize;
            scope.headerFontSize        = model.headerFontSize;
            scope.fontColor             = model.fontColor;
            scope.headersVertical       = model.headersVertical;
          }
          // auto compute types
          if (scope.actualtype === undefined || scope.actualtype.length === 0) {
            scope.actualtype = [];
            scope.actualalign = [];
            for (i = 0; i < scope.columnNames.length; i++) {
              if (scope.types !== undefined) {
                var stringFormatForColumn =  scope.stringFormatForColumn[scope.columnNames[i]];
                if (stringFormatForColumn && stringFormatForColumn.type === 'value'){
                  scope.actualtype.push(0);
                  scope.actualalign.push('L');
                } else if (scope.types[i] === 'time' || scope.types[i] === 'datetime') {
                  scope.actualtype.push(8);
                  scope.actualalign.push('C');
                } else if (scope.types[i] === 'integer') {
                  scope.actualtype.push(2);
                  scope.actualalign.push('R');
                } else if (scope.types[i] === 'double') {
                  if (scope.stringFormatForType.double || stringFormatForColumn) {
                    scope.actualtype.push(3);
                  } else {
                    scope.actualtype.push('4.4');
                  }
                  scope.actualalign.push('R');
                } else {
                  scope.actualtype.push(0);
                  scope.actualalign.push('L');
                }
              } else {
                scope.actualtype.push(0);
                scope.actualalign.push('L');
              }
            }

            if (!_.isEmpty(model.alignmentForType)) {
              _.forEach(model.types, function (type, index) {
                var alignment = model.alignmentForType[type];
                if(alignment){
                  scope.actualalign[index] = alignment;
                }
              });
            }

            _.forOwn(model.alignmentForColumn, function (alignment, columnName) {
              scope.actualalign[scope.columnNames.indexOf(columnName)] = alignment;
            });
          }

          // cell highlighters
          scope.cellHighlighters = {}; //map: col index -> highlighter
          _.forEachRight(scope.cellHighlightersData, function (highlighter) {
            if (!highlighter) { return; }
            if(_.isEmpty(scope.cellHighlighters[highlighter.colInd])){
              var jsHighlighter = cellHighlighters.createHighlighter(highlighter.type, highlighter);
              if (jsHighlighter) {
                scope.cellHighlighters[highlighter.colInd] = jsHighlighter;
              }
            }
          });

          scope.contextMenuItems = {};
          if (!_.isEmpty(model.contextMenuItems)) {
            _.forEach(model.contextMenuItems, function (item) {
              scope.contextMenuItems[item] = {
                name: item,
                callback: function (itemKey, options) {
                  var index = scope.table.cell(options.$trigger.get(0)).index();
                  tableService.onContextMenu(model['update_id'],
                    itemKey,
                    index.row,
                    index.column - 1,
                    scope.model.getEvaluatorId()).then(function () {
                    scope.update = true;
                  });
                }
              }
            });
          }

          if (!_.isEmpty(model.contextMenuTags)) {
            _.forOwn(model.contextMenuTags, function (tag, name) {
              scope.contextMenuItems[name] = {
                name: name,
                callback: function (itemKey, options) {
                  var index = scope.table.cell(options.$trigger.get(0)).index();
                  var params = {
                    actionType: 'CONTEXT_MENU_CLICK',
                    contextMenuItem: itemKey,
                    row: index.row,
                    col: index.column - 1
                  };
                  tableService.setActionDetails(model['update_id'],
                                                scope.model.getEvaluatorId(),
                                                params).then(function () {
                    scope.evaluateTagCell(tag);
                  });
                }
              }
            });
          }

          scope.doCreateData(model);
          scope.doCreateTable(model);
          $(document.body).off('click.bko-dt-container', scope.containerClickFunction);
          $(document.body).on('click.bko-dt-container', scope.containerClickFunction);
        };

        scope.doCreateData = function(model) {
          // create a dummy column to keep server ordering if not already present
          var values = model.hasOwnProperty('filteredValues') ? model.filteredValues : model.values;
          if (!scope.hasIndex) {
            var data = [];
            var r;
            var selected = [];
            for (r = 0; r < values.length; r++) {
              var row = [];
              row.push(r);
              data.push(row.concat(values[r]));
              selected.push(false);
            }
            scope.data = data;
            scope.selected = selected;
          } else {
            var data = [];
            var r;
            var selected = [];
            for (r = 0; r < values.length; r++) {
              var row = [];
              data.push(row.concat(values[r]));
              selected.push(false);
            }
            scope.data = data;
            scope.selected = selected;
          }
        };
        //jscs:disable
        scope.update_size = function() {
        //jscs:enable
          var me = $('#' + scope.id);
          // this is dataTables_scrollBody
          var pp = me.parent();
          var tableWidth = me.width();
          var scrollWidth = scope.scrollbarWidth;
          if (pp.width() > tableWidth + scrollWidth) {
            if(pp.height() < me.height()){
              tableWidth += scrollWidth;
            }
            pp.width(tableWidth);
          }
          if (scope.fixcols) { //do not need data update
            scope.fixcols._fnColCalc();
            scope.fixcols._fnGridLayout()
          }
        };
        scope.selectFixedColumnRow = function (dtRowIndex, select) {
          if (scope.fixcols) {
            var doSelect = function(row){
              var cells = row.find('td');
              if (select) {
                row.addClass('selected');
              } else {
                row.removeClass('selected');
                cells.removeClass('selected');
              }
            };
            var row = scope.table.row(dtRowIndex).node();
            if (!row) { return; }
            var fixRowIndex = row.rowIndex;
            var fixedColumns = scope.fixcols.dom.clone;
            if(fixedColumns.left.body){
              doSelect($(fixedColumns.left.body.rows[fixRowIndex]));
            }
            if(fixedColumns.right.body){
              doSelect($(fixedColumns.right.body.rows[fixRowIndex]));
            }
          }
        };
        scope.selectFixedColumnCell = function (jqFixedCell, select) {
          if (jqFixedCell) {
            if (select) {
              jqFixedCell.addClass('selected');
            } else {
              jqFixedCell.removeClass('selected');
            }
          }
        };
        scope.highlightFixedColumnRow = function (dtRowIndex, highlight) {
          if (scope.fixcols) {
            var doHighlight = function(row){
              if (highlight) {
                row.addClass('hover');
              } else {
                row.removeClass('hover');
              }
            };
            var row = scope.table.row(dtRowIndex).node();
            if (!row) { return; }
            var fixRowIndex = scope.table.row(dtRowIndex).node().rowIndex;
            var fixedColumns = scope.fixcols.dom.clone;
            if(fixedColumns.left.body){
              doHighlight($(fixedColumns.left.body.rows[fixRowIndex]));
            }
            if(fixedColumns.right.body){
              doHighlight($(fixedColumns.right.body.rows[fixRowIndex]));
            }
          }
        };
        //jscs:disable
        scope.update_selected = function() {
        //jscs:enable
          if (scope.table === undefined) {
            return;
          }
          scope.table.rows().eq(0).each(function(index) {
            var row = scope.table.row(index);
            var tr = row.node();
            if (tr !== undefined) {
              var iPos = row.index();
              if (!scope.selected[iPos]) {
                $(tr).removeClass('selected');
                scope.selectFixedColumnRow(iPos, false);
              } else {
                $(tr).addClass('selected');
                scope.selectFixedColumnRow(iPos, true);
              }
            }
          });
        };

        scope.updateBackground = function () {
          if (scope.table === undefined) {
            return;
          }
          for (var colInd = 0; colInd < scope.columns.length; colInd++) {

            var max = Math.max(scope.table.column(colInd).data().max(), Math.abs(scope.table.column(colInd).data().min()));

            scope.table.column(colInd).nodes().each(function (td) {
              var value = $(td).text();
              if ($.isNumeric(value)) {
                $(td).empty();
                var barsRenderer = scope.barsOnColumn[scope.colorder[colInd]];
                if (barsRenderer) {
                  var cellDiv = $("<div></div>", {
                    "class": "dt-cell-div"
                  });
                  var textSpan = $("<div></div>", {
                    "class": "dt-cell-text"
                  }).text(value);

                  var barsBkg = $("<div></div>", {
                    "class": "dt-bar-data-cell"
                  });

                  var barsBkgPositiveValueCell = $("<div></div>", {
                    "class": "dt-bar-data-value-cell"
                  });

                  var barsBkgNegativeValueCell = $("<div></div>", {
                    "class": "dt-bar-data-value-cell"
                  });

                  var percent = (parseFloat(Math.abs(value)) / max) * 100;

                  if(value>0){
                    var barsBkgPositiveValues = $("<div></div>", {
                      "class": "dt-bar-data "
                    }).css({
                      "width": percent + "%"
                    });

                    barsBkgPositiveValueCell.append(barsBkgPositiveValues);

                  }else if(value<0){
                    var barsBkgNegativeValues = $("<div></div>", {
                      "class": "dt-bar-data-negative "
                    }).css({
                      "width": percent + "%"
                    });

                    barsBkgNegativeValueCell.append(barsBkgNegativeValues)
                  }

                  barsBkg.append(barsBkgNegativeValueCell);
                  barsBkg.append(barsBkgPositiveValueCell);

                  cellDiv.append(barsBkg);
                  if (!barsRenderer.includeText) {
                    textSpan.hide();
                  }
                  cellDiv.append(textSpan);
                  $(td).append(cellDiv);
                } else {
                  $(td).text(value);
                }
              }
            });
            var cellHighlighter = scope.cellHighlighters[colInd];
            if (cellHighlighter) {
              cellHighlighter.doHighlight(scope.table);
            }
          }
        };
        scope.addInteractionListeners = function () {
          if (!scope.interactionListeners) {
            $(scope.table.table().container())
              .on("mouseenter.bko-dt-interaction", 'td, th', function (e) {
                if (scope.tableHasFocus()) {
                  return; //ignore mouse over for key events if there is focus on table's cell
                }
                var column = scope.getColumnIndexByCellNode(this);
                if (!scope.onKeyListeners[column]) {
                  scope.onKeyListeners[column] = function (onKeyEvent) {
                    if (scope.tableHasFocus()) {
                      return; //ignore mouse over for key events if there is focus on table's cell
                    }
                    if (!onKeyEvent.isDefaultPrevented()) {
                      scope.onKeyAction(column, onKeyEvent);
                    }
                  };
                  $(document).on("keydown.bko-datatable", scope.onKeyListeners[column]);
                }
              })
              .on("mouseleave.bko-dt-interaction", 'td, th', function (e) {
                var column = scope.getColumnIndexByCellNode(this);
                var listener = scope.onKeyListeners[column];
                if (listener) {
                  delete scope.onKeyListeners[column];
                  $(document).off("keydown.bko-datatable", listener);
                }
              });
            scope.interactionListeners = true;
          }
        };
        scope.removeInteractionListeners = function () {
          if (scope.interactionListeners) {
            $(scope.table.table().container()).off('mouseenter.bko-dt-interaction', 'td, th');
            $(scope.table.table().container()).off('mouseleave.bko-dt-interaction', 'td, th');
            scope.interactionListeners = false;
          }
        };

        scope.showHideBars = function (column) {
          if (scope.barsOnColumn[column]) {
            delete scope.barsOnColumn[column];
          } else {
            scope.barsOnColumn[column] = {includeText: true};
          }
          _.defer(function () { scope.table.draw(false);  });
        };

        scope.showHideHighlighter = function(column, highlighterType){
          var highlighter = scope.cellHighlighters[column];
          if (!highlighter || !(highlighter instanceof highlighterType)) {
            if (highlighter) {
              highlighter.removeHighlight(scope.table);
            }
            scope.cellHighlighters[column] = new highlighterType({colInd: column});
          } else {
            highlighter.removeHighlight(scope.table);
            delete scope.cellHighlighters[column];
          }
          _.defer(function () { scope.table.draw(false);  });
        };

        scope.showHideHeatmap = function (column) {
          scope.showHideHighlighter(column, cellHighlighters.HeatmapHighlighter);
        };

        scope.columnHasFormat = function (column, format) {
          for (var i = 0; i < scope.types.length; i++) {
            if(scope.types[column] === format){
              return true;
            }
          }
          return false;
        };
        scope.changePrecision = function (column, precision) {
          if(scope.columnHasFormat(column, 'double')){
            scope.actualtype[column] = scope.getActualTypeByPrecision(precision);
            scope.applyChanges();
          }
        };
        scope.changeAllPrecision = function (precision) {
          for (var i = 0; i < scope.columns.length - 1; i++) {
            if(scope.columnHasFormat(i, 'double')){
              scope.actualtype[i] = scope.getActualTypeByPrecision(precision);
            }
          }
          scope.applyChanges();
        };

        scope.changeTimeFormat = function (timeUnit) {
          scope.formatForTimes = timeUnit;
          scope.applyChanges();
        };

        scope.doShowFilter = function (column, isSearch) {
          var jqContainer = $(scope.table.table().container());
          var filterInputs = jqContainer.find('.filter-input');
          var filterIcons = jqContainer.find('.filter-icon');
          var redrawFixCols = false;
          if (isSearch) {
            filterInputs.addClass('search-active');
            filterInputs.attr('title', 'search this column for a substring');
            $(filterInputs.get(0)).attr('title', 'search the whole table for a substring');
            filterIcons.removeClass('fa-filter');
            filterIcons.addClass('fa-search');
          } else {
            filterInputs.removeClass('search-active');
            filterInputs.attr('title', 'filter with an expression with a variable defined for each column and $ means the current column.  eg "$ > 5"');
            $(filterInputs.get(0)).attr('title', 'filter with an expression with a variable defined for each column');
            filterIcons.removeClass('fa-search');
            filterIcons.addClass('fa-filter');
          }
          if (scope.showFilter) {
            if(scope.columnSearchActive !== isSearch){
              scope.clearFilters();
              redrawFixCols = true;
            }
          } else {
            scope.showFilter = true;
            redrawFixCols = true;
          }
          scope.columnSearchActive = isSearch;

          var filterInputSelector = '.filterRow .filter-input';
          jqContainer.off('keyup.column-filter change.column-filter');
          jqContainer.on('keyup.column-filter change.column-filter', filterInputSelector,
            scope.columnSearchActive ? scope.columnFilterFn : $.debounce(500, scope.columnFilterFn));

          if (!(scope.$$phase || $rootScope.$$phase)) {
            scope.$apply();
          }

          setTimeout(function () {
            scope.table.draw(false);
            if (scope.fixcols && redrawFixCols) {
              scope.fixcols.fnRedrawLayout();
            }
            if(column){
              scope.getColumnFilter(column).focus();
            }
          }, 0);
        };
        scope.hideFilter = function () {
          scope.clearFilters();
          scope.showFilter = false;
          if (!(scope.$$phase || $rootScope.$$phase)) {
            scope.$apply();
          }
          setTimeout(function(){
            if (scope.fixcols){
              scope.fixcols.fnRedrawLayout();
            }
          }, 0);
        };
        scope.clearFilters = function () {
          var hasNotEmptyFilter = false;
          scope.table.columns().every(function (index) {
            var column = this;
            var jqInput = scope.getColumnFilter(column);
            var filterValue = jqInput.val();
            if (!_.isEmpty(filterValue)) {
              hasNotEmptyFilter = true;
              jqInput.val('');
              if (index === 0) {
                scope.table.search('');
              } else {
                column.search('');
              }
            }
          });
          if (hasNotEmptyFilter) {
            scope.table.draw();
          }
          scope.columnFilter = [];
          scope.tableFilter = '';
        };
        scope.clearFilter = function (column, jqInput) {
          if (column) {
            var filterValue = jqInput.val();
            if (!_.isEmpty(filterValue)) {
              jqInput.val('');
              if (column.index() === 0) {
                if (scope.columnSearchActive) {
                  scope.table.search('');
                }
                scope.table.draw();
                scope.tableFilter = '';
              } else {
                if (scope.columnSearchActive) {
                  column.search('');
                }
                column.draw();
                scope.columnFilter[scope.colorder[column.index()] - 1] = '';
              }
              if (!jqInput.is(':focus')) {
                scope.checkFilter();
              }
              scope.stopFilterEditing(jqInput);
            }
          }
        };
        scope.stopFilterEditing = function (jqInputEl) {
          jqInputEl.css('width', '');
          jqInputEl.parent().removeClass('editing');
          jqInputEl.parent().siblings('.hidden-filter').addClass('hidden-filter-input');
        };
        scope.onFilterBlur = function (jqInputEl) {
          scope.stopFilterEditing(jqInputEl);
          setTimeout(function () {
            var filtersInFocus = $(scope.table.table().container()).find('.filter-input:focus');
            if (!filtersInFocus.length) {
              //focus wasn't moved to another filter input
              scope.checkFilter();
            }
          }, 0);
        };
        scope.checkFilter = function () {
          var hasNotEmptyFilter = false;

          $(scope.table.table().container()).find('.filter-input').each(function(i, filterInput){
            if(!_.isEmpty(filterInput.value)){
              hasNotEmptyFilter = true;
            }
          });

          if(!hasNotEmptyFilter){
            scope.hideFilter();
          }
        };
        scope.onFilterEditing = function(jqInputEl, column){
          scope.updateFilterWidth(jqInputEl, column);
          jqInputEl.parent().addClass('editing');
          jqInputEl.parent().siblings('.hidden-filter').removeClass('hidden-filter-input');
        };
        scope.updateFilterWidth = function(jqInput, column){
          var iconsWidth = 30;
          var padding = 15;
          var textWidth = jqInput.parent().siblings('.hidden-length').text(jqInput.val()).width() + iconsWidth;
          var headerWidth = $(column.header()).width();
          if(textWidth > headerWidth && jqInput.parent().hasClass('editing')){
            jqInput.css('width', textWidth + padding);
          } else {
            jqInput.css('width', '');
          }
        };

        scope.onKeyAction = function (column, onKeyEvent) {
          var key = onKeyEvent.keyCode;
          var charCode = String.fromCharCode(key);
          if (charCode) {
            switch(charCode.toUpperCase()){
              case 'B':
                scope.showHideBars(scope.colorder[column]);
                break;
              case 'H':
                scope.showHideHeatmap(scope.colorder[column]);
                break;
            }
            if (key >= 48 && key <= 57){ //numbers 1..9
              if(onKeyEvent.shiftKey){
                scope.changePrecision(scope.colorder[column] - 1, parseInt(charCode));
              }else{
                scope.changeAllPrecision(parseInt(charCode));
              }
            }
          }
        };

        scope.getColumnIndexByCellNode = function (cellNode) {
          return findDTColumnIndex(scope.table.settings()[0], cellNode);
        };
        scope.removeOnKeyListeners = function () {
          for (var f in scope.onKeyListeners) {
            if (scope.onKeyListeners.hasOwnProperty(f)) {
              $(document).off("keydown.bko-datatable", scope.onKeyListeners[f]);
            }
          }
          scope.onKeyListeners = {};//map: col index -> listener function
        };

        scope.applyColumnRenderer = function(colIndex, renderer){
          switch (renderer.type) {
            case 'DataBars':
              scope.barsOnColumn[colIndex + 1] = {includeText: renderer.includeText};
              break;
            //other renderers here
          }
        };

        scope.updateHeaderLayout = function () {
          if (scope.table) {
            scope.updateHeaderFontSize();
            scope.rotateHeader();
          }
        };

        scope.updateHeaderFontSize = function () {
          if (scope.headerFontSize) {
            $(scope.table.table().container()).find('thead tr:not(".filterRow") th').css({'font-size': scope.headerFontSize});
          }
        };

        scope.rotateHeader = function () {
          var headerRows = $(scope.table.table().container())
            .find('.DTFC_LeftHeadWrapper, .DTFC_RightHeadWrapper, .dataTables_scrollHead')
            .find('thead tr:not(".filterRow")');
          var headerCols = headerRows.find('th');
          var headerTexts = headerCols.find('span.header-text');
          var headerTextMaxWidth = Math.max.apply(null, headerTexts.map(function () {
            return $(this).width();
          }).get());
          var lineHeight = parseFloat(headerTexts.css('line-height'));
          if (scope.headersVertical) {
            headerTexts.addClass('rotate');
            var padding = 10;
            headerTexts.css('transform', 'rotate(270deg) translateX(-' + (lineHeight - padding) + 'px)');
            headerCols.css({
              'height': headerTextMaxWidth + padding + 'px',
              'max-width': lineHeight,
              'vertical-align': 'bottom'
            });
          } else {
            headerTexts.removeClass('rotate');
            headerTexts.css('transform', '');
            headerCols.css({
              'height': '',
              'max-width': '',
              'vertical-align': ''
            });
            headerRows.css({'height': ''});
          }
        };

        scope.evaluateTagCell = function (tag) {
          var cellOp = bkSessionManager.getNotebookCellOp();
          var result;
          if (cellOp.hasUserTag(tag)) {
            result = cellOp.getCellsWithUserTag(tag);
            bkCoreManager.getBkApp().evaluateRoot(result)
              .catch(function () {
                console.log('Evaluation failed: ' + tag);
              });
          }
        };

        scope.doCreateTable = function(model) {
          var cols = [];
          var i;

          var getFormatSubitems = function(container) {
            var colIdx = container.data('columnIndex');
            var types = scope.getCellDispOptsF(colIdx - 1);
            var items = [];

            _.each(types, function(obj) {
              if (obj.type === 8) { //datetime
                items = items.concat(getTimeSubitems());
                return;
              }
              var item = {
                title: obj.name,
                isChecked: function(container) {
                  var colIdx = container.data('columnIndex');
                  return scope.actualtype[scope.colorder[colIdx] - 1] === obj.type;
                }
              };
              if (obj.type === 4) { //double with precision
                item.items = getPrecisionSubitems;
              } else {
                item.action = function(el) {
                    var container = el.closest('.bko-header-menu');
                    var colIdx = container.data('columnIndex');

                    scope.getCellDisp[scope.colorder[colIdx] - 1] = obj.type;
                    scope.actualtype[scope.colorder[colIdx] - 1] = obj.type;
                    scope.applyChanges();
                  }
                };
              items.push(item);
            });

            return items;
          };

          var getPrecisionSubitems = function(container) {
            var items = [];

            _.each(scope.doubleWithPrecisionConverters, function(func, precision) {
              var item = {
                title: precision,
                isChecked: function(container) {
                  var colIdx = container.data('columnIndex');
                  return scope.actualtype[scope.colorder[colIdx] - 1] == scope.getActualTypeByPrecision(precision);
                },
                action: function(el) {
                  var container = el.closest('.bko-header-menu');
                  var colIdx = container.data('columnIndex');
                  scope.changePrecision(scope.colorder[colIdx] - 1, precision);
                }
              };

              items.push(item);
            });

            return items;
          };

          var getTimeSubitems = function() {
            var items = [];

            _.forOwn(TIME_UNIT_FORMATS, function(value, unit) {
              var item = {
                title: value.title,
                isChecked: function(container) {
                  var colIdx = container.data('columnIndex');
                  return scope.actualtype[scope.colorder[colIdx] - 1] === 8 &&
                    (unit === scope.formatForTimes || unit == 'DATETIME' && _.isEmpty(scope.formatForTimes));
                },
                action: function(el) {
                  scope.changeTimeFormat(unit);
                }
              };

              items.push(item);
            });

            return items;
          };

          var menuHelper = {
            doAlignment: function(el, key) {
              var container = el.closest('.bko-header-menu');
              var colIdx = container.data('columnIndex');

              //table variables
              var table = $('#' + scope.id).DataTable();
              var bodyColumn = table.column(colIdx).nodes().to$();
              var headerColumn = $(table.column(colIdx).header());
              //remove align class
              bodyColumn.removeClass('dtleft').removeClass('dtcenter').removeClass('dtright');
              headerColumn.removeClass('dtleft').removeClass('dtcenter').removeClass('dtright');

              //add align class
              switch (key){
                case 'L':
                  bodyColumn.addClass('dtleft');
                  headerColumn.addClass('dtleft');
                  break;
                case 'C':
                  bodyColumn.addClass('dtcenter');
                  headerColumn.addClass('dtcenter');
                  break;
                case 'R':
                  bodyColumn.addClass('dtright');
                  headerColumn.addClass('dtright');
                  break;
              }

              //update align
              scope.getCellAlign[scope.colorder[colIdx] - 1] = key;
              scope.actualalign[scope.colorder[colIdx] - 1] = key;
              bkSessionManager.setNotebookModelEdited(true);
            },
            checkAlignment: function(container, key) {
              var colIdx = container.data('columnIndex');
              return scope.actualalign[scope.colorder[colIdx] - 1] === key;
            },
            doSorting: function(el, direction) {
              var container = el.closest('.bko-header-menu');
              var colIdx = container.data('columnIndex');

              if (_.includes(['asc', 'desc'], direction)) {
                scope.table.order([colIdx, direction]).draw();
              }
            },
            checkSorting: function(container, direction) {
              var order = scope.table.order();
              var colIdx = container.data('columnIndex');

              // server ordering
              if (0 === order.length) {
                return false;
              }

              if (_.includes(['asc', 'desc'], direction)) {
                return (order[0][0] == colIdx && order[0][1] == direction);
              } else {
                return (order[0][0] !== colIdx);
              }
            },
            doFixColumnLeft: function (el) {
              var container = el.closest('.bko-header-menu');
              var colIdx = container.data('columnIndex');
              var fixed = this.isFixedLeft(container);
              scope.pagination.fixLeft = fixed ? 0 : colIdx;
              scope.applyChanges();
            },
            doFixColumnRight: function (el) {
              var container = el.closest('.bko-header-menu');
              var colIdx = container.data('columnIndex');
              var fixed = this.isFixedRight(container);
              scope.pagination.fixRight = fixed ? 0 : scope.columns.length - colIdx;
              scope.applyChanges();
            },
            isFixedRight: function (container) {
              var colIdx = container.data('columnIndex');
              return scope.columns.length - colIdx === scope.pagination.fixRight;
            },
            isFixedLeft: function (container) {
              var colIdx = container.data('columnIndex');
              return scope.pagination.fixLeft === colIdx;
            }
          };

          var headerMenuItems = {
            items: [
              {
                title: 'Hide column',
                action: function(el) {
                  var table = scope.table;
                  var container = el.closest('.bko-header-menu');
                  var colIdx = container.data('columnIndex');
                  var column = table.column(colIdx);

                  column.visible(!column.visible());
                }
              },
              {
                title: 'Filter...',
                icon: 'fa fa-filter',
                tooltip: 'filter with an expression with a variable defined for each column and $ means the current column.  eg "$ > 5"',
                action: function(el) {
                  var table = scope.table;
                  var container = el.closest('.bko-header-menu');
                  var colIdx = container.data('columnIndex');
                  var column = table.column(colIdx);

                  scope.doShowFilter(column, false);
                }
              },
              {
                title: 'Search...',
                icon: 'fa fa-search',
                tooltip: 'search this column for a substring',
                action: function(el) {
                  var table = scope.table;
                  var container = el.closest('.bko-header-menu');
                  var colIdx = container.data('columnIndex');
                  var column = table.column(colIdx);

                  scope.doShowFilter(column, true);
                }
              },
              {
                title: 'Format',
                action: null,
                items: getFormatSubitems
              },
              {
                title: 'Sort Ascending',
                separator: true,
                isChecked: function(container) {
                  return menuHelper.checkSorting(container, 'asc');
                },
                action: function(el) {
                  menuHelper.doSorting(el, 'asc');
                }
              },
              {
                title: 'Sort Descending',
                isChecked: function(container) {
                  return menuHelper.checkSorting(container, 'desc');
                },
                action: function(el) {
                  menuHelper.doSorting(el, 'desc');
                }
              },
              {
                title: 'No Sort',
                isChecked: function(container) {
                  return menuHelper.checkSorting(container);
                },
                action: function() {
                  scope.table.order([0, 'asc']).draw();
                }
              },
              {
                title: 'Align Left',
                separator: true,
                isChecked: function(container) {
                  return menuHelper.checkAlignment(container, 'L');
                },
                action: function(el) {
                  menuHelper.doAlignment(el, 'L');
                }
              },
              {
                title: 'Align Center',
                isChecked: function(container) {
                  return menuHelper.checkAlignment(container, 'C');
                },
                action: function(el) {
                  menuHelper.doAlignment(el, 'C');
                }
              },
              {
                title: 'Align Right',
                isChecked: function(container) {
                  return menuHelper.checkAlignment(container, 'R');
                },
                action: function(el) {
                  menuHelper.doAlignment(el, 'R');
                }
              },
              {
                title: 'Heatmap',
                shortcut: 'H',
                separator: true,
                isChecked: function(container) {
                  var colIdx = container.data('columnIndex');
                  var highlighter = scope.cellHighlighters[scope.colorder[colIdx]];
                  return highlighter && highlighter instanceof cellHighlighters.HeatmapHighlighter;
                },
                action: function(el) {
                  var container = el.closest('.bko-header-menu');
                  var colIdx = container.data('columnIndex');
                  scope.showHideHeatmap(scope.colorder[colIdx]);
                }
              },
              {
                title: 'Data Bars',
                shortcut: 'B',
                isChecked: function(container) {
                  var colIdx = container.data('columnIndex');
                  return scope.barsOnColumn[scope.colorder[colIdx]] === true;
                },
                action: function(el) {
                  var container = el.closest('.bko-header-menu');
                  var colIdx = container.data('columnIndex');
                  scope.showHideBars(scope.colorder[colIdx]);
                }
              },
              {
                title: 'Fix Left',
                isChecked: function(container) {
                  return menuHelper.isFixedLeft(container);
                },
                action: function(el) {
                  menuHelper.doFixColumnLeft(el);
                }
              },
              {
                title: 'Fix Right',
                isChecked: function(container) {
                  return menuHelper.isFixedRight(container);
                },
                action: function(el) {
                  menuHelper.doFixColumnRight(el);
                }
              }
            ]
          };

          // build configuration
          var converter = scope.allConverters[1];
          var createdCell = function (td, cellData, rowData, row, col) {
            if (scope.dataFontSize) {
              $(td).css({'font-size': scope.dataFontSize});
            }
          };
          if (scope.hasIndex) {
            for (var i = 0; i < scope.allTypes.length; i++) {
              if (scope.allTypes[i].name === scope.indexType) {
                converter = scope.allConverters[scope.allTypes[i].type];
                break;
              }
            }
            cols.push({'title' : scope.indexName, 'className': 'dtright', 'render': converter, createdCell: createdCell});
          } else {
            cols.push({'title': '    ', 'className': 'dtright', 'render': converter, createdCell: createdCell});
          }

          var beakerObj = bkHelper.getBeakerObject().beakerObj;
          scope.outputColumnLimit = beakerObj.prefs && beakerObj.prefs.outputColumnLimit
            ? beakerObj.prefs.outputColumnLimit : scope.columnNames.length;

          for (i = 0; i < scope.columnNames.length; i++) {
            var type = scope.actualtype[i];
            var al = scope.actualalign[i];
            var col = {
              'title' : '<span class="header-text">' + scope.columnNames[i] +'</span>',
              'header': { 'menu': headerMenuItems },
              'visible': i<scope.outputColumnLimit,
            };
            col.createdCell = function (td, cellData, rowData, row, col) {
              if(!_.isEmpty(scope.tooltips)){
                $(td).attr('title', scope.tooltips[row][col - 1]);
              }
              if (scope.dataFontSize) {
                $(td).css({'font-size': scope.dataFontSize});
              }
              if (!_.isEmpty(scope.fontColor)) {
                var color = scope.fontColor[row][col - 1];
                var color_opacity = parseInt(color.substr(1, 2), 16) / 255;
                $(td).css({
                  'color': "#" + color.substr(3),
                  'opacity': color_opacity
                });
              }
            };

            if (al === 'R') {
              col.className = 'dtright';
            } else if (al === 'C') {
              col.className = 'dtcenter';
            }

            var stringFormatForColumn = scope.stringFormatForColumn[scope.columnNames[i]];
            if (stringFormatForColumn && stringFormatForColumn.type === 'value' && type === 0){
              col.render = scope.valueFormatter;
            } else if (scope.isDoubleWithPrecision(type)) {
              col.render = scope.doubleWithPrecisionConverters[scope.getDoublePrecision(type)];
            } else if (scope.allConverters[type] !== undefined) {
              col.render = scope.allConverters[type];
            }
            if (scope.getCellSho) {
              col.visible = scope.getCellSho[i];
            }
            if (scope.columnWidth) {
              col.sWidth = scope.columnWidth[i] || 0;
            }
            cols.push(col);
          }

          scope.columns = cols;

          var id = '#' + scope.id;
          var init = {
            'destroy' : true,
            'data': scope.data,
            'columns': scope.columns,
            'stateSave': true,
            'processing': true,
            'autoWidth': true,
            'ordering': true,
            'order': scope.tableOrder ? _.cloneDeep(scope.tableOrder) : [],
            'scrollX': '10%',
            'searching': true,
            'deferRender': true,
            'language': {
              'emptyTable': 'empty table'
            },
            'preDrawCallback': function(settings) {
              scope.updateTableWidth();
              if(scope.table){
                //allow cell's text be truncated when column is resized to a very small
                scope.table.columns().every(function(i){
                  var colWidth = settings.aoColumns[i].sWidthOrig;
                  if (colWidth) {
                    settings.aoColumns[i].sWidth = colWidth;
                    $(scope.table.column(i).nodes())
                      .css('max-width', colWidth)
                      .css('min-width', colWidth);
                  }
                });
              }
            },
            'drawCallback': function(settings) {
              //jscs:disable
              scope.update_size();
              scope.update_selected();
              scope.updateBackground();
              scope.updateDTMenu();
              //jscs:enable
            },
            'bSortCellsTop': true,
            'colResize': {
              'tableWidthFixed': false,
              'resizeCallback': function(column){
                scope.columnWidth[scope.colorder[column.idx] - 1] = column.sWidthOrig;
              },
              'exclude': _.range(scope.columns.length - scope.pagination.fixRight, scope.columns.length)
            }
          };

          var domCommon = '<"bko-table"Z' + (scope.data.length > 500 ? 'r' : '') + 't';
          if (!scope.pagination.use) {
            init.paging = false;
            init.scrollY = scope.getScrollY();
            init.scrollCollapse = true;
            init.dom = domCommon + '>';
          } else {
            init.dom = domCommon + '<"bko-table-bottom"<"bko-table-selector"l><"bko-table-pagenum"p><"bko-table-use-pagination">>S>';
            if (scope.data.length > MIN_ROWS_FOR_PAGING) {
              init.pagingType = 'simple_numbers';
              init.pageLength = scope.pagination.rowsToDisplay;
              init.lengthMenu = scope.rowsToDisplayMenu;
            } else {
              init.paging = false;
              init.scrollCollapse = true;
            }
          }
          scope.fixcreated = false;
          if (!_.isEmpty(scope.contextMenuItems)) {
            $.contextMenu({
              selector: id +' tbody td',
              items: scope.contextMenuItems
            });
          }

          var rotateMenuItem = {
            callback: function (itemKey, options) {
              scope.headersVertical = !!!scope.headersVertical;
              scope.rotateHeader();
              scope.table.draw();
            }
          };
          $.contextMenu({
            selector: id +'_wrapper thead',
            zIndex: 3, //to be over fixed headers
            items: {
              verticalHeaders: _.extend({}, rotateMenuItem, {
                name: 'vertical headers',
                visible: function(key, opt){
                  return !!!scope.headersVertical;
                }
              }),
              horizontalHeaders: _.extend({}, rotateMenuItem, {
                name: 'horizontal headers',
                visible: function(key, opt){
                  return !!scope.headersVertical;
                }
              })
            }
          });

          $(document).on('contextmenu.bko-dt-header', id +'_wrapper thead th', function(){
            $(this).blur();
          });

          bkHelper.timeout(function() {
            // we must wait for the DOM elements to appear
            $(id).parents('.dataTables_scroll').find('th, td')
              .removeClass(FC_LEFT_SEPARATOR_CLASS + ' ' + FC_RIGHT_SEPARATOR_CLASS);
            scope.table = $(id).DataTable(init);

            scope.updateHeaderLayout();

            scope.table.settings()[0].oScroll.iBarWidth = scope.scrollbarWidth;
            scope.renderMenu = true;
            if (!scope.colorder) {
              scope.colorder = _.range(scope.columnNames.length + 1);
            }
            scope.colreorg = new $.fn.dataTable.ColReorder($(id), {
              'order': scope.colorder,
              'fnReorderCallback': function() {
                if (scope.colreorg === undefined || scope.colreorg.s == null) {
                  return;
                }
                scope.colorder = scope.colreorg.fnOrder().slice(0);
                scope.refreshCells();
                scope.applyFilters();
                scope.updateBackground();
                scope.$digest();
              },
              'iFixedColumns': scope.pagination.fixLeft + 1,
              'iFixedColumnsRight': scope.pagination.fixRight
            });
            scope.keyTable = new $.fn.dataTable.KeyTable($(id));
            scope.refreshCells();

            if(init.paging !== false){
              var pagination = $(element).find(".bko-table-use-pagination");
              $('<input type="checkbox" checked="true" id=' + scope.id +'usePagination class="beforeCheckbox">')
                .bind('click', function (e) {
                  scope.doUsePagination();
                })
                .appendTo(pagination);
              $('<label for=' + scope.id +'usePagination> use pagination</label>')
                .appendTo(pagination);
            }

            /*
            $(id + ' tbody').off('click');
            */
            $(id + ' tbody').on('dblclick', 'td', function(e) {
              if (!scope.table) { return; }
              var rowIdx;
              var colIdx;
              var iPos = scope.table.cell(this).index();
              if (iPos) { //selected regular cell
                rowIdx = iPos.row;
                colIdx = iPos.column;
              } else { //selected fixed column or index cell
                var position = scope.fixcols.fnGetPosition(this);
                rowIdx = position[0];
                if ($(this).parents().hasClass('DTFC_RightWrapper')) {
                  var order = scope.colorder;
                  var fixRight = scope.pagination.fixRight;
                  var colIdxInRight = position[1];
                  colIdx = order[order.length - fixRight + colIdxInRight];
                } else {
                  colIdx = position[1];
                }
              }

              var currentCell = scope.table.cells(function (idx, data, node) {
                return idx.column === colIdx && idx.row ===  rowIdx;
              });
              var currentCellNodes = $(currentCell.nodes());

              var isCurrentCellSelected = currentCellNodes.hasClass('selected');

              if (scope.selected[rowIdx]) {
                scope.selected[rowIdx] = false;
                $(scope.table.row(rowIdx).node()).removeClass('selected');
                scope.selectFixedColumnRow(rowIdx, false);
              }

              $(scope.table.cells().nodes()).removeClass('selected');
              if (scope.fixcols) {
                _.each(scope.selected, function(selected, index){
                  if(!selected){
                    scope.selectFixedColumnRow(index, false);
                  }
                });
              }
              if (!isCurrentCellSelected) {
                currentCellNodes.addClass('selected');
                if(iPos === undefined) {
                  scope.selectFixedColumnCell($(this), true);
                }
              }

              var index = currentCell.indexes()[0];
              if (model.hasDoubleClickAction) {
                tableService.onDoubleClick(model['update_id'],
                  index.row,
                  index.column - 1,
                  scope.model.getEvaluatorId()).then(function () {
                  scope.update = true;
                });
              }

              if (!_.isEmpty(model.doubleClickTag)) {
                var params = {
                  actionType: 'DOUBLE_CLICK',
                  row: index.row,
                  col: index.column - 1
                };
                tableService.setActionDetails(model['update_id'],
                                              scope.model.getEvaluatorId(),
                                              params).then(function () {
                  scope.evaluateTagCell(model.doubleClickTag);
                });
              }

              e.stopPropagation();
            });

            $(id + ' tbody').on('click', 'tr', function(event) {
              if (!scope.table) { return; }
              var dtTR = scope.getDtRow(this);
              var iPos = scope.table.row(dtTR).index();
              if (scope.selected[iPos]) {
                scope.selected[iPos] = false;
                $(dtTR).removeClass('selected');
                scope.selectFixedColumnRow(iPos, false);
              } else {
                scope.selected[iPos] = true;
                $(dtTR).addClass('selected');
                scope.selectFixedColumnRow(iPos, true);
              }
            });

            $(id + ' tbody')
              .on('mouseenter.bko-dt-highlight', 'tr', function () {
                if (!scope.table) { return; }
                var dtTR = scope.getDtRow(this);
                var rowIndex = scope.table.row(dtTR).index();
                $(dtTR).addClass('hover');
                scope.highlightFixedColumnRow (rowIndex, true);
              })
              .on('mouseleave.bko-dt-highlight', 'tr', function () {
                if (!scope.table) { return; }
                var dtTR = scope.getDtRow(this);
                var rowIndex = scope.table.row(dtTR).index();
                $(dtTR).removeClass('hover');
                scope.highlightFixedColumnRow (rowIndex, false);
              });

            $(scope.table.table().container()).find('.dataTables_scrollHead').on('scroll', function () {
              var filtersInFocus = $(scope.table.table().container()).find('.filter-input:focus');
              if (filtersInFocus.length) {
                scope.stopFilterEditing(filtersInFocus);
              }
            });

            scope.removeOnKeyListeners();

            if (scope.update) {
              scope.addInteractionListeners();
            }

            scope.table
              .on('key', function (e, datatable, key, cell, originalEvent) {
                originalEvent.preventDefault();
                scope.onKeyAction(cell.index().column, originalEvent);
              })
              .on('column-visibility.dt', function (e, settings, column, state) {
                scope.getCellSho[scope.colorder[column] - 1] = state;
                setTimeout(function(){
                  scope.updateHeaderLayout();
                  scope.table.draw(false);
                }, 0);
              })
              .on( 'column-sizing.dt', function ( e, settings ) {
                scope.updateTableWidth();
              });

            function updateSize() {
              clearTimeout(scope.refresh_size);
              scope.refresh_size = setTimeout(function () {
                scope.update_size();
              }, 250);
            }

            $(window).bind('resize.' + scope.id, function () {
              updateSize();
            });

            scope.$on(GLOBALS.EVENTS.ADVANCED_MODE_TOGGLED, function () {
              updateSize();
            });

            var inits = {'heightMatch': 'none'};
            if ((scope.pagination.fixLeft + scope.pagination.fixRight) > (scope.columns.length - 1)) {
              scope.pagination.fixLeft = 0;
              scope.pagination.fixRight = 0;
            }
            if (scope.pagination.fixLeft) {
              inits.leftColumns = 1 + scope.pagination.fixLeft;
            } else {
              inits.leftColumns = 1;
            }
            if (scope.pagination.fixRight) {
              inits.rightColumns = scope.pagination.fixRight;
            } else {
              inits.rightColumns = 0;
            }

            scope.updateFixedColumnsSeparator();

            scope.fixcols = new $.fn.dataTable.FixedColumns($(id), inits);
            scope.fixcols.fnRedrawLayout();
            $rootScope.$emit('beaker.resize');

            setTimeout(function(){
              if (!scope.table) { return; }
              scope.applyFilters();
              if (scope.columnFilter) {
                scope.table.columns().every(function (i) {
                  var column = this;
                  var jqInput = scope.getColumnFilter(column);
                  if (i === 0) {
                    var filterValue = scope.tableFilter;
                    jqInput.val(filterValue);
                    if (scope.columnSearchActive && !_.isEmpty(filterValue)) {
                      scope.table.search(filterValue);
                    }
                  } else {
                    var filterValue = scope.columnFilter[scope.colorder[i] - 1];
                    jqInput.val(filterValue);
                    if (scope.columnSearchActive && !_.isEmpty(filterValue)) {
                      column.search(filterValue);
                    }
                  }
                });
              }
              if (scope.showFilter) {
                scope.doShowFilter(null, scope.columnSearchActive);
              }
              $rootScope.$emit('beaker.resize');

            }, 0);

          }, 0);
        };

        scope.menuToggle = function() {
          var getTableData = function() {
            var rows = scope.table.rows(function(index, data, node) {
              return scope.selected[index];
            });
            if (rows === undefined || rows.indexes().length === 0) {
              rows = scope.table.rows();
            }
            var out = scope.exportTo(rows, 'tabs');
            return out;
          };

          var queryCommandEnabled = true;
          try {
            document.execCommand('Copy');
          } catch (e) {
            queryCommandEnabled = false;
          }

          if (((!bkUtils.isElectron) && (scope.clipclient === undefined) && !queryCommandEnabled)
            || bkHelper.isSafari) {
            scope.clipclient = new ZeroClipboard();
            var d = document.getElementById(scope.id + '_dt_copy');
            scope.clipclient.clip(d);
            scope.clipclient.on('copy', function(event) {
              var clipboard = event.clipboardData;
              clipboard.setData('text/plain', getTableData());
            });
          } else if (bkUtils.isElectron) {
            document.getElementById(scope.id + '_dt_copy').onclick = function() {
              bkElectron.clipboard.writeText(getTableData(), 'text/plain');
            }
          }
        };

        scope.showHeaderMenu = function() {
          $('#' + scope.id + '_modal_dialog').hide();
          bkHelper.timeout(function() {
            $('#' + scope.id + '_dropdown_menu').click();
            $('#' + scope.id + '_show_column > .dropdown-menu').css('display', 'block');
          }, 0);
        };

        scope.hideModal = function(){
          var id = scope.id + '_modal_dialog';
          $('#'+id).hide()
        };

        scope.getDumpState = function() {
          return scope.model.getDumpState();
        };

        var savedstate = scope.model.getDumpState();
        if (savedstate !== undefined && savedstate.datatablestate !== undefined) {
          scope.savedstate = savedstate.datatablestate;
        }

        scope.$on('$destroy', function() {
          scope.doDestroy(true);
        });

        scope.$watch('getDumpState()', function(result) {
          if (result !== undefined && result.datatablestate === undefined) {
            var state = {
              'pagination'  : scope.pagination
            };
            if (scope.columnNames !== undefined) {
              state.columnNames = scope.columnNames.slice(0);
            }
            if (scope.actualtype !== undefined) {
              state.actualtype = scope.actualtype.slice(0);
            }
            if (scope.actualalign !== undefined) {
              state.actualalign = scope.actualalign.slice(0);
            }
            if (scope.colorder !== undefined) {
              state.colorder = scope.colorder.slice(0);
            }
            if (scope.getCellSho !== undefined) {
              state.getCellSho = scope.getCellSho;
            }
            if (scope.barsOnColumn !== undefined) {
              state.barsOnColumn = scope.barsOnColumn;
            }
            if (scope.cellHighlighters !== undefined) {
              state.cellHighlightersData = _.map(scope.cellHighlighters, function(highlighter, colInd){
                return highlighter;
              });
            }
            if (scope.tableFilter !== undefined) {
              state.tableFilter = scope.tableFilter;
            }
            if (scope.showFilter !== undefined) {
              state.showFilter = scope.showFilter;
            }
            if (scope.columnSearchActive !== undefined) {
              state.columnSearchActive = scope.columnSearchActive;
            }
            if (scope.columnFilter !== undefined) {
              state.columnFilter = scope.columnFilter;
            }
            if (scope.columnWidth !== undefined) {
              state.columnWidth = scope.columnWidth;
            }
            if (scope.tableOrder !== undefined) {
              state.tableOrder = scope.tableOrder.slice(0);
            }

            if (scope.formatForTimes !== undefined) {
              state.formatForTimes = scope.formatForTimes;
            }

            if (scope.stringFormatForType !== undefined) {
              state.stringFormatForType = scope.stringFormatForType;
            }

            if (scope.stringFormatForColumn !== undefined) {
              state.stringFormatForColumn = scope.stringFormatForColumn;
            }

            if (scope.tooltips !== undefined) {
              state.tooltips = scope.tooltips;
            }

            if (scope.headerFontSize !== undefined) {
              state.headerFontSize = scope.headerFontSize;
            }

            if (scope.dataFontSize !== undefined) {
              state.dataFontSize = scope.dataFontSize;
            }

            if (scope.fontColor !== undefined) {
              state.fontColor = scope.fontColor;
            }

            if (scope.headersVertical !== undefined) {
              state.headersVertical = scope.headersVertical;
            }

            if (scope.model.setDumpState !== undefined) {
              scope.model.setDumpState({datatablestate: state});
            }
          }
        });

        scope.getCellModel = function() {
          return scope.model.getCellModel();
        };
        scope.isShowOutput = function() {
          return scope.model.isShowOutput();
        };

        var tableChanged = false;

        scope.$watch('getCellModel()', function(m) {
          if(!angular.equals(m, cellModel)){
            cellModel = m;
            if (scope.update) {
              scope.applyChanges();
            } else {
              scope.init(m, true);
            }
            tableChanged = true;
          }
        });

        scope.$on('beaker.section.toggled', function(e, isCollapsed) {
          if (!isCollapsed && scope.table !== undefined) {
            bkHelper.timeout(function() {
              scope.table.draw(false);
            });
          }
        });

        scope.updateDTMenu = function(){
          if(scope.table){
            var orderInfo = scope.table.order()[0];
            if (orderInfo) {
              scope.isIndexColumnDesc = orderInfo[0] === 0 && orderInfo[1] === 'desc';
              if (!(scope.$$phase || $rootScope.$$phase)) {
                scope.$apply();
              }
            }
          }
        };

        scope.getDtRow = function (node) {
          var dtRow;
          var iPos = scope.table.row(node).index();
          if (iPos === undefined) { //node is fixed column
            iPos = scope.fixcols.fnGetPosition(node);
            dtRow = scope.table.row(iPos).node();
          } else { //regular node
            dtRow = node;
          }
          return dtRow;
        };

        scope.updateTableWidth = function () {
          var me = $('#' + scope.id);
          me.css('width', me.outerWidth());
        };

      }
    };
  }]);
})();

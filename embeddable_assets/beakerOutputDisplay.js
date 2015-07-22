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
  //jscs:disable
  beaker.bkoDirective('Table', ['bkCellMenuPluginManager', 'bkUtils', '$interval', function(bkCellMenuPluginManager, bkUtils, $interval) {
  //jscs:enable
    var CELL_TYPE = 'bko-tabledisplay';
    return {
      template: JST['bko-tabledisplay/output-table'],
      controller: function($scope, $modal) {

        $scope.id = 'table_' + bkUtils.generateId(6);

        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch('getShareMenuPlugin()', function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });

        $scope.exportTo = function(data, format) {
          var i;
          var j;
          var order;
          var out = '';
          var eol = '\n';
          var sep = ',';
          var qot = '"';
          var fix = function(s) { return s.replace(/"/g, '""');};

          if (format === 'tabs') {
            sep = '\t';
            qot = '';
            fix = function(s) { return s.replace(/\t/g, ' ');};
          }
          if (navigator.appVersion.indexOf('Win') !== -1) {
            eol = '\r\n';
          }

          for (i = 1; i < $scope.columns.length; i++) {
            order = $scope.colorder[i];
            if (!$scope.table.column(order).visible()) {
              continue;
            }
            if (out !== '') {
              out = out + sep;
            }
            out = out + qot + fix($scope.columns[order].title) + qot;
          }
          out = out + eol;

          for (i = 0; i < data.length; i++) {
            var row = data[i];
            var some = false;
            for (j = 1; j < row.length; j++) {
              order = $scope.colorder[j];
              if (!$scope.table.column(order).visible()) {
                continue;
              }
              if (!some) {
                some = true;
              } else {
                out = out + sep;
              }
              var d = row[j];
              if ($scope.columns[order].render !== undefined) {
                d = $scope.columns[order].render(d, 'display');
              }
              d = d + '';
              out = out + qot + (d !== undefined && d !== null ? fix(d) : '') + qot;
            }
            out = out + eol;
          }
          return out;
        };

        $scope.doCSVExport = function(all) {
          var data;
          if (!all) {
            data = $scope.table.rows().data();
          } else {
            data = $scope.table.rows(function(index, data, node) { return $scope.selected[index]; }).data();
          }
          var out = $scope.exportTo(data, 'csv');
          bkHelper.selectFile(function(n) {
            var suffix = '.csv';
            if (n === undefined) {
              return;
            }
            if (n.indexOf(suffix, n.length - suffix.length) === -1) {
              n = n + suffix;
            }
            // TODO check for error, prompt for overwrite
            return bkHelper.saveFile(n, out, true);
          } , 'Select name for CSV file to save', 'csv', 'Save');
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
          // this is handled by the invisible flash movie
        };

        $scope.getCellIdx      =  [];
        $scope.getCellNam      =  [];
        $scope.getCellSho      =  [];
        $scope.getCellAlign    =  [];
        $scope.getCellDisp     =  [];
        $scope.getCellDispOpts =  [];
        $scope.pagination = {
          'use' : true,
          'rowsToDisplay' : 50,
          'fixLeft' : false,
          'fixRight' : false
        };

        $scope.getCellDispOptsF = function(i) {
          return $scope.getCellDispOpts[i];
        };

        $scope.displayAll = function() {
          var i;
          for (i = 0; i < $scope.getCellSho.length; i++) {
            $scope.getCellSho[i] = true;
          }
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
            $scope.getCellSho.push($scope.table.column(order).visible());
            $scope.getCellDisp.push($scope.actualtype[order - 1]);
            $scope.getCellAlign.push($scope.actualalign[order - 1]);
            if ($scope.types) {
              if ($scope.types[order - 1] === 'string') {
                $scope.getCellDispOpts.push($scope.allStringTypes);
              } else if ($scope.types[order - 1] === 'double') {
                $scope.getCellDispOpts.push($scope.allDoubleTypes);
              } else if ($scope.types[order - 1] === 'integer') {
                $scope.getCellDispOpts.push($scope.allIntTypes);
              } else if ($scope.types[order - 1] === 'time') {
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
        };

        $scope.renderMenu     = false;

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
        {type: 4, name: 'double 2 decimals'},
        {type: 5, name: 'double 4 decimals'},
        {type: 6, name: 'exponential 5'},
        {type: 7, name: 'exponential 15'},
        {type: 8, name: 'datetime'},
        {type: 9, name: 'boolean'},
        {type: 10, name: 'html'},
        {type: 11, name: 'date'},
        {type: 12, name: 'time'}];
        $scope.allConverters = [
          // string
          function(value, type, full, meta) {
            if (_.isObject(value) && value.type === 'Date') {
              value = moment(value.timestamp).format('YYYYMMDD HH:mm:ss.SSS ZZ');
            }
            if (type === 'display' && value !== null && value !== undefined) {
              return $scope.escapeHTML(value);
            }
            return value;
          },
          // integer
          function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              return parseInt(value);
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // formatted integer
          function(value, type, full, meta) {
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
          function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              return parseFloat(value);
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // double 2 decimals
          function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              return parseFloat(value).toFixed(2);
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // double 4 decimals
          function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              return parseFloat(value).toFixed(4);
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // exponential 5
          function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              return parseFloat(value).toExponential(5);
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // exponential 15
          function(value, type, full, meta) {
            if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
              return parseFloat(value).toExponential(15);
            }
            if (type === 'sort') {
              return NaN;
            }
            return value;
          },
          // datetime
          function(value, type, full, meta) {
            var time;
            var tz;
            if ($scope.timeStrings) {
              return $scope.timeStrings[meta.row];
            }
            if (type === 'display') {
              if (_.isObject(value) && value.type === 'Date') {
                time = moment(value.timestamp);
                tz = $scope.tz;
                if (tz) {
                  time.tz(tz);
                }
                return time.format('YYYYMMDD HH:mm:ss.SSS ZZ');
              }
              var nano = value % 1000;
              var micro = (value / 1000) % 1000;
              var milli = value / 1000 / 1000;
              time = moment(milli);
              tz = $scope.tz;
              if (tz) {
                time.tz(tz);
              }
              return time.format('YYYYMMDD HH:mm:ss.SSS ZZ');
            }
            return value;
          },
          // boolean
          function(value, type, full, meta) {
            if (value !== undefined && value !== null && (value.toLowerCase() === 'true' || value === 1)) {
              return 'true';
            }
            return 'false';
          },
          // html
          function(value, type, full, meta) {
            return value;
          },
          // date
          function(value, type, full, meta) {
            var time;
            var tz;
            if ($scope.timeStrings) {
              return $scope.timeStrings[meta.row];
            }
            if (type === 'display') {
              if (_.isObject(value) && value.type === 'Date') {
                time = moment(value.timestamp);
                tz = $scope.tz;
                if (tz) {
                  time.tz(tz);
                }
                return time.format('YYYY-MM-DD');
              }
              var nano = value % 1000;
              var micro = (value / 1000) % 1000;
              var milli = value / 1000 / 1000;
              time = moment(milli);
              tz = $scope.tz;
              if (tz) {
                time.tz(tz);
              }
              return time.format('YYYY-MM-DD');
            }
            return value;
          },
          // time
          function(value, type, full, meta) {
            var time;
            var tz;
            if ($scope.timeStrings) {
              return $scope.timeStrings[meta.row];
            }
            if (_.isObject(value) && value.type === 'Date') {
              time = moment(value.timestamp);
              tz = $scope.tz;
              if (tz) {
                time.tz(tz);
              }
              return time.format('HH:mm:ss.SSS ZZ');
            }
            var nano = value % 1000;
            var micro = (value / 1000) % 1000;
            var milli = value / 1000 / 1000;
            time = moment(milli);
            tz = $scope.tz;
            if (tz) {
              time.tz(tz);
            }
            return time.format('HH:mm:ss.SSS ZZ');
          }
        ];
        $scope.allStringTypes = [{type: 0, name: 'string'}, {type: 10, name: 'html'}];
        $scope.allTimeTypes   = [{type: 8, name: 'datetime'},
                                 {type: 0, name: 'string'},
                                 {type: 11, name: 'date'},
                                 {type: 12, name: 'time'}];
        $scope.allIntTypes    = [{type: 0, name: 'string'},
        {type: 1, name: 'integer'},
        {type: 2, name: 'formatted integer'},
        {type: 8, name: 'time'}];
        $scope.allDoubleTypes = [{type: 0, name: 'string'},
        {type: 3, name: 'double'},
        {type: 4, name: 'double 2 decimals'},
        {type: 5, name: 'double 4 decimals'},
        {type: 6, name: 'exponential 5'},
        {type: 7, name: 'exponential 15'}];
        $scope.allBoolTypes = [{type: 0, name: 'string'},
        {type: 9, name: 'boolean'}];

        $scope.openOptionsDialog = function() {
          var options = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            scope: $scope,
            windowClass: 'output-table-options beaker-sandbox',
            backdropClass: 'beaker-sandbox',
            template: JST['bko-tabledisplay/output-table-options']()
          };
          $scope.getCellShoOld    = $scope.getCellSho.slice(0);
          $scope.getCellDispOld   = $scope.getCellDisp.slice(0);
          $scope.getCellAlignOld  = $scope.getCellAlign.slice(0);
          $scope.usePaginationOld = $scope.pagination.use;
          $scope.rowsToDisplayOld = $scope.pagination.rowsToDisplay;
          $scope.fixLeftOld       = $scope.pagination.fixLeft;
          $scope.fixRightOld      = $scope.pagination.fixRight;
          $scope.modal = $modal.open(options);
        };

        $scope.closeOptionsDialog = function() {
          $scope.modal.close();
          var i;
          var doit = 0;

          for (i = 0; i < $scope.getCellDisp.length; i++) {
            if ($scope.getCellSho[i] !== $scope.getCellShoOld[i]) {
              // refresh only visibility
              doit = 1;
            }
          }
          //jscs:disable
          if (($scope.usePaginationOld !== $scope.pagination.use) || ($scope.rowsToDisplayOld !== $scope.pagination.rowsToDisplay) ||
              ($scope.fixLeftOld !== $scope.pagination.fixLeft) || ($scope.fixRightOld !== $scope.pagination.fixRight)) {
          //jscs:enable
            doit = 2;
          } else {
            for (i = 0; i < $scope.getCellDisp.length; i++) {
              //jscs:disable
              if (($scope.getCellDisp[i] !== $scope.getCellDispOld[i]) || ($scope.getCellAlign[i] !== $scope.getCellAlignOld[i])) {
              //jscs:enable
                doit = 2;
              }
            }
          }
          if (doit == 1) {
            for (i = 0; i < $scope.getCellDisp.length; i++) {
              $scope.table.column(i + 1).visible($scope.getCellSho[i], false);
            }
            $scope.table.columns.adjust().draw(false);
          } else if (doit == 2) {
            $scope.doDestroy(false);
            // update table display
            for (i = 0; i < $scope.getCellDisp.length; i++) {
              $scope.actualtype[$scope.colorder[i + 1] - 1] = $scope.getCellDisp[i];
              $scope.actualalign[$scope.colorder[i + 1] - 1] = $scope.getCellAlign[i];
            }
            // reorder the table data
            var model = $scope.model.getCellModel();
            $scope.doCreateData(model);
            $scope.doCreateTable();
          }
        };

        $scope.cancelOptionsDialog = function() {
          $scope.modal.close();
          $scope.refreshCells();
        };
      },
      link: function(scope, element, attrs) {

        scope.doDestroy = function(all) {
          if (scope.table) {
            //jscs:disable
            clearTimeout(scope.refresh_size);
            //jscs:enable
            $(window).unbind('resize.' + scope.id);
            $('#' + scope.id + ' tbody').off('click');
            $('#' + scope.id).html('');
            scope.table.destroy();
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
          }
        };
        scope.init = function(model) {
          scope.doDestroy(true);

          var i;

          // validate saved state (if any) by using column \Names
          if (scope.savedstate !== undefined) {
            if (scope.savedstate.columnNames === undefined) {
              scope.savedstate = undefined;
            } else if (scope.savedstate.columnNames.length !== model.columnNames.length) {
              scope.savedstate = undefined;
            } else {
              for (i = 0; i < scope.savedstate.columnNames.length; i++) {
                if (model.columnNames[i] !== scope.savedstate.columnNames[i]) {
                  scope.savedstate = undefined;
                  break;
                }
              }
            }
          }

          // copy basic data
          scope.columnNames = model.columnNames;
          scope.timeStrings = model.timeStrings;
          scope.tz          = model.timeZone;
          scope.types       = model.types;

          // compute how to display columns (remind: dummy column to keep server ordering)
          if (scope.savedstate !== undefined) {
            // we have a display state to recover
            scope.actualtype  = scope.savedstate.actualtype;
            scope.actualalign = scope.savedstate.actualalign;
            scope.colorder    = scope.savedstate.colorder;
            scope.getCellSho  = scope.savedstate.getCellSho;
            scope.pagination  = scope.savedstate.pagination;
            scope.savedstate  = undefined;
          }
          // auto compute types
          if (scope.actualtype === undefined || scope.actualtype.length === 0) {
            scope.actualtype = [];
            scope.actualalign = [];
            for (i = 0; i < scope.columnNames.length; i++) {
              if (scope.types !== undefined) {
                if (scope.types[i] === 'time') {
                  scope.actualtype.push(8);
                  scope.actualalign.push('C');
                } else if (scope.types[i] === 'integer') {
                  scope.actualtype.push(2);
                  scope.actualalign.push('R');
                } else if (scope.types[i] === 'double') {
                  scope.actualtype.push(5);
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
          }
          scope.doCreateData(model);
          scope.doCreateTable();
        };

        scope.doCreateData = function(model) {
          // create a dummy column to keep server ordering
          var data = [];
          var r;
          var selected = [];
          for (r = 0; r < model.values.length; r++) {
            var row = [];
            row.push(r);
            data.push(row.concat(model.values[r]));
            selected.push(false);
          }
          scope.data = data;
          scope.selected = selected;
        };
        //jscs:disable
        scope.update_size = function() {
        //jscs:enable
          var me = $('#' + scope.id);
          // this is dataTables_scrollBody
          var pp = me.parent();
          if (pp.width() > me.width() + 16) {
            pp.width(me.width() + 16);
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
              } else {
                $(tr).addClass('selected');
              }
            }
          });
        };

        scope.doCreateTable = function() {
          var cols = [];
          var i;

          // build configuration
          cols.push({'title' : '    ', 'className': 'dtright', 'render': scope.allConverters[1]});
          for (i = 0; i < scope.columnNames.length; i++) {
            var type = scope.actualtype[i];
            var al = scope.actualalign[i];
            var col = {
              'title' : scope.columnNames[i]
            };
            if (al === 'R') {
              col.className = 'dtright';
            } else if (al === 'C') {
              col.className = 'dtcenter';
            }
            if (scope.allConverters[type] !== undefined) {
              col.render = scope.allConverters[type];
            }
            if (scope.getCellSho) {
              col.visible = scope.getCellSho[i];
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
            'order': [[0, 'asc']],
            'scrollX': '10%',
            'searching': false,
            'deferRender': true,
            'drawCallback': function(settings) {
              //jscs:disable
              scope.update_size();
              scope.update_selected();
              //jscs:enable
            }
          };

          if (!scope.pagination.use) {
            init.paging = false;
            init.scrollY = scope.pagination.rowsToDisplay * 27 + 2;
            init.scrollCollapse = true;
            init.dom = '<"bko-table"rt>';
          } else {
            init.dom = '<"bko-table"rt<"bko-table-bottom"<"bko-table-selector"l><"bko-table-pagenum"p>>S>';
            if (scope.data.length > 25) {
              init.pagingType = 'simple_numbers';
              init.pageLength = 25;
              init.lengthMenu = [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']];
            } else {
              init.paging = false;
              init.scrollY = 350;
              init.scrollCollapse = true;
            }
          }
          scope.fixcreated = false;

          bkHelper.timeout(function() {
            // we must wait for the DOM elements to appear
            scope.table = $(id).DataTable(init);
            scope.renderMenu = true;
            scope.colreorg = new $.fn.dataTable.ColReorder($(id), {
              'fnReorderCallback': function() {
                if (scope.colreorg === undefined) {
                  return;
                }
                scope.colorder = scope.colreorg.fnOrder().slice(0);
                scope.refreshCells();
                scope.$digest();
              },
              'iFixedColumns': 1
            });
            if (scope.colorder !== undefined) {
              scope.colreorg.fnOrder(scope.colorder);
            } else {
              scope.colorder = scope.colreorg.fnOrder().slice(0);
            }
            scope.refreshCells();

            $(id + ' tbody').off('click');
            $(id + ' tbody').on('click', 'tr', function(event) {
              var iPos = scope.table.row(this).index();
              if (scope.selected[iPos]) {
                scope.selected[iPos] = false;
                $(this).removeClass('selected');
              } else {
                scope.selected[iPos] = true;
                $(this).addClass('selected');
              }
              event.stopPropagation();
            });

            $(window).bind('resize.' + scope.id, function() {
              //jscs:disable
              clearTimeout(scope.refresh_size);
              scope.refresh_size = setTimeout(function() { scope.update_size(); }, 250);
              //jscs:enable
            });

            var inits = {};
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
              inits.rightColumns = 1;
            } else {
              inits.rightColumns = 0;
            }
            scope.fixcols = new $.fn.dataTable.FixedColumns($(id), inits);
          }, 0);
        };

        scope.menuToggle = function() {
          if (scope.clipclient === undefined) {
            scope.clipclient = new ZeroClipboard();
            var d = document.getElementById(scope.id + '_dt_copy');

            scope.clipclient.clip(d);

            scope.clipclient.on('copy', function(event) {
              var clipboard = event.clipboardData;

              var data = scope.table.rows(function(index, data, node) {
                return scope.selected[index]; }).data();
              if (data === undefined || data.length === 0) {
                data = scope.table.rows().data();
              }
              var out = scope.exportTo(data, 'tabs');

              clipboard.setData('text/plain', out);
            });
          }
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
            if (scope.actualtypes !== undefined) {
              state.actualtypes = scope.actualtypes.slice(0);
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

            scope.model.setDumpState({datatablestate: state});
          }
        });

        scope.getCellModel = function() {
          return scope.model.getCellModel();
        };
        scope.isShowOutput = function() {
          return scope.model.isShowOutput();
        };
        scope.$watch('getCellModel()', function(m) {
          scope.init(m);
        });
        scope.$watch('isShowOutput()', function(oldval, newval) {
          if (scope.table !== undefined && !newval) {
            scope.table.draw(false);
          }
        });

        scope.$on('beaker.section.toggled', function(e, isCollapsed) {
          if (!isCollapsed && scope.table !== undefined) {
            bkHelper.timeout(function() {
              scope.table.draw(false);
            });
          }
        });
      }
    };
  }]);
})();

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
 * bkoImage
 * This is the output display component for displaying images transferred in byte arrays.
 */
(function() {
  'use strict';
  beaker.bkoDirective("Image", function() {
    return {
      template: "<img />",
      link: function(scope, element, attrs) {
        var img = element.find("img").first();
        if (scope.model.getCellModel()) {
          img.attr("src", "data:image/png;base64," +
              scope.model.getCellModel().imageData);
        }
      }
    };
  });
})();

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
 * bkoLatex
 * This is the output display component for displaying results of LaTex code.
 */
(function() {
  'use strict';
  beaker.bkoDirective('Latex', ["bkUtils", function(bkUtils) {

    return {
      link: function(scope, element, attrs) {
        scope.$watch('model.getCellModel()', function(newValue) {
          try {
            katex.render(newValue, element[0]);
          } catch(err) {
            bkHelper.show1ButtonModal(err.message+'<br>See: <a target="_blank" href="http://khan.github.io/KaTeX/">KaTeX website</a> and its <a target="_blank" href="https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX">list of supported functions</a>.', "KaTex error");
          }
        });
      }
    };
  }]);
})();

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
 * bkoProgress
 */
(function() {
  'use strict';
  beaker.bkoDirective("Progress", ["$interval", "$compile", "bkEvaluateJobManager", "bkUtils", "bkOutputDisplayFactory", function(
      $interval, $compile, bkEvaluateJobManager, bkUtils, bkOutputDisplayFactory) {
    return {
      template: JST['mainapp/components/notebook/output-progress'],
      link: function(scope, element, attrs) {
        scope.elapsed = 0;
        var computeElapsed = function() {
          var now = new Date().getTime();
          var start;
          if ( scope.model.getCellModel() !== undefined)
            start = scope.model.getCellModel().startTime;
          else
            start = now;
          scope.elapsed = now - start;
          if (!(scope.$$phase || scope.$root.$$phase)) {
            // we don't execute the $interval within $apply so we have to manually refresh it. This refreshes only this scope.
            scope.$digest();
          }
        };
        var intervalPromise = $interval(function() {
          computeElapsed();
          if (scope.elapsed > 60 * 1000) {
            $interval.cancel(intervalPromise);
            intervalPromise = $interval(function() {
              computeElapsed();
            }, 1000, 0, false);
          }
        }, 100, 0, false);
        scope.getElapsedTime = function() {
          return bkUtils.formatTimeString(scope.elapsed);
        };
        scope.getMessage = function() {
          return scope.model.getCellModel().message;
        };
        scope.hasMessage = function() {
          return scope.model.getCellModel().message !== undefined;
        };
        scope.getProgressBar = function() {
          return scope.model.getCellModel().progressBar;
        };
        scope.hasProgressBar = function() {
          return scope.model.getCellModel().progressBar >= 0;
        };
        scope.hasOutputData = function() {
          return scope.model.getCellModel().outputdata !== undefined && scope.model.getCellModel().outputdata.length > 0;
        };
        scope.hasPayload = function() {
          return scope.model.getCellModel().payload !== undefined;
        };
        scope.getPayloadType = function() {
          if (scope.hasPayload())
            return scope.model.getCellModel().payload.type;
          return undefined;
        };
        scope.getPayload = function() {
          return scope.model.getCellModel().payload;
        };
        scope.cancel = function() {
          bkEvaluateJobManager.cancel();
        };
        scope.isCancellable = function() {
          return bkEvaluateJobManager.isCancellable();
        };
        scope.$on("$destroy", function() {
          $interval.cancel(intervalPromise);
        });
        scope.getOutputResult = function() {
          return scope.model.getCellModel().payload;
        };

        scope.isShowMenu = function() { return false; };
        
        scope.$watch('getPayload()', function() {
          if (scope.hasPayload()) {
            scope.outputDisplayModel = {
                result : scope.getPayload()
            };
          }
        });
      }
    };
  }]);
})();

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
 * bkoResults
 */
(function() {
  'use strict';
  beaker.bkoDirective("Results", ["$interval", "$compile", "bkOutputDisplayFactory", function(
      $interval, $compile, bkOutputDisplayFactory) {
    return {
      template: JST['mainapp/components/notebook/output-results'],
      link: function(scope, element, attrs) {
        scope.hasPayload = function() {
          return scope.model.getCellModel().payload !== undefined;
        };
        scope.getPayload = function() {
          return scope.model.getCellModel().payload;
        };
        scope.getOutputData = function() {
          return scope.model.getCellModel().outputdata;
        };
        scope.hasOutputData = function() {
          return scope.model.getCellModel().outputdata !== undefined && scope.model.getCellModel().outputdata.length>0;
        };
        scope.getOutputResult = function() {
          return scope.model.getCellModel().payload;
        };
        scope.isShowOutput = function() {
          return scope.model.isShowOutput();
        };

        scope.isShowMenu = function() { return false; };
        scope.showoutput = scope.model.isShowOutput();
        
        scope.payload = {
            result : undefined,
            isShowOutput : function() {
              return scope.showoutput;
            }
        }
        
        scope.$watch('getPayload()', function() {
          if (scope.hasPayload()) {
            scope.payload.result = scope.getPayload();
          }
        });

        scope.$watch('isShowOutput()', function(oldval, newval) {
          scope.showoutput = newval;
        });

        scope.$watch('getOutputData()', function() {
          if (scope.hasOutputData()) {
            scope.outputdata =  scope.getOutputData()
          }
        });
      }
    };
  }]);
  beaker.registerOutputDisplay("Results", ["Results", "Text"]);
})();

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
 * bkoVega
 * This is the output display component for displaying vega JSON (http://trifacta.github.io/vega/).
 */
(function() {
  'use strict';
  beaker.bkoDirective('bkoVega', function() {
    return {
      template: "<input type='text' ng-model='model'></input>" +
          "<button ng-click='parse()'>parse</button>" +
          "<div id='vis'></div>",
      controller: function($scope) {
        var parse = function(spec) {

          if (_.isString(spec)) {
            try {
              spec = JSON.parse(spec);
            } catch (err) {
              console.log(err);
            }
          }
          vg.parse.spec(spec, function(chart) {
            var view = chart({el: "#vis"}).update();
          });
        };
        $scope.parse = function() {
          parse($scope.model.getCellModel());
        };
      }
    };
  });
})();


(function() {
    'use strict';
    var retfunc = function(bkUtils) {
    return {
      outsideScr: function(scope, x, y) {
        var W = scope.jqsvg.width(), H = scope.jqsvg.height();
        return x < 0 || x > W || y < 0 || y > H;
      },
      outsideScrBox: function(scope, x, y, w, h) {
        var W = scope.jqsvg.width(), H = scope.jqsvg.height();
        return x > W || x + w < 0 || y > H || y + h < 0;
      },
      updateRange : function(datarange, itemrange) {
        if (itemrange.xl != null) { datarange.xl = Math.min(datarange.xl, itemrange.xl); }
        if (itemrange.xr != null) { datarange.xr = Math.max(datarange.xr, itemrange.xr); }
        if (itemrange.yl != null) { datarange.yl = Math.min(datarange.yl, itemrange.yl); }
        if (itemrange.yr != null) { datarange.yr = Math.max(datarange.yr, itemrange.yr); }
      },
      getDataRange : function(data) { // data range is in [0,1] x [0,1]
        var datarange = {
          xl : Infinity,
          xr : -Infinity,
          yl : Infinity,
          yr : -Infinity
        };
        var visibleItem = 0, legendableItem = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].legend != null && data[i].legend != "") {
            legendableItem++;
          }
          if (data[i].showItem === false) { continue; }
          visibleItem++;
          var itemrange = data[i].getRange();
          this.updateRange(datarange, itemrange);
        }
        if (visibleItem === 0 || datarange.xl === Infinity) {
          datarange.xl = 0;
          datarange.xr = 1;
        }
        if (visibleItem === 0 || datarange.yl === Infinity) {
          datarange.yl = 0;
          datarange.yr = 1;
        }
        datarange.xspan = datarange.xr - datarange.xl;
        datarange.yspan = datarange.yr - datarange.yl;
        return {
          "datarange" : datarange,
          "visibleItem" : visibleItem,
          "legendableItem" : legendableItem
        };
      },
      getDefaultFocus : function(model) {
        var ret = this.getDataRange(model.data);
        var range = ret.datarange, margin = model.margin;
        var focus = {
          xl : model.userFocus.xl,
          xr : model.userFocus.xr,
          yl : model.userFocus.yl,
          yr : model.userFocus.yr
        };
        if (focus.xl == null) {
          focus.xl = range.xl - range.xspan * margin.left;
        }
        if (focus.xr == null) {
          focus.xr = range.xr + range.xspan * margin.right;
        }
        if (focus.yl == null) {
          focus.yl = range.yl - range.yspan * margin.bottom;
        }
        if (focus.yr == null) {
          focus.yr = range.yr + range.yspan * margin.top;
        }
        focus.xspan = focus.xr - focus.xl;
        focus.yspan = focus.yr - focus.yl;
        var result = {};
        result.defaultFocus = focus;
        _(result).extend(_.omit(ret, "datarange"));
        return result;
      },

      plotGridlines: function(scope) {
        var sel = scope.gridg.selectAll("line");
        sel.data(scope.rpipeGridlines, function(d) { return d.id; }).exit().remove();
        sel.data(scope.rpipeGridlines, function(d) { return d.id; }).enter().append("line")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-dasharray", function(d) { return d.stroke_dasharray; });
        sel.data(scope.rpipeGridlines, function(d) { return d.id; })
          .attr("x1", function(d) { return d.x1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.y1; })
          .attr("y2", function(d) { return d.y2; });
      },
      plotLabels: function(scope) {   // redraw
        var pipe = scope.rpipeTexts;
        scope.labelg.selectAll("text").remove();
        scope.labelg.selectAll("text")
          .data(pipe, function(d) { return d.id; }).enter().append("text")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("transform", function(d) { return d.transform; })
          .style("text-anchor", function(d) { return d["text-anchor"]; })
          .style("dominant-baseline", function(d) { return d["dominant-baseline"]; })
          .text(function(d) { return d.text; });
      },
      replotSingleCircle: function(scope, d) {
        scope.svg.selectAll("#" + d.id).remove();
        scope.svg.selectAll("#" + d.id)
          .data([d]).enter().append("circle")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("cx", function(d) { return d.cx; })
          .attr("cy", function(d) { return d.cy; })
          .attr("r", function(d) { return d.r; })
          .style("fill", function(d) { return d.color; })
          .style("stroke", function(d) { return d.stroke; })
          .style("opacity", function(d) { return d.opacity; });
      },
      replotSingleRect: function(svgElement, d) {
        svgElement.selectAll("#" + d.id).remove();
        svgElement.selectAll("#" + d.id)
          .data([d]).enter().append("rect")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("width", function(d) { return d.width; })
          .attr("height", function(d) { return d.height; })
          .style("fill", function(d) { return d.fill; });
      },
      upper_bound: function(a, attr, val) {
        var l = 0, r = a.length - 1;
        while (l <= r) {
          var m = Math.floor((l + r) / 2);
          if (a[m][attr] >= val) r = m - 1;
          else l = m + 1;
        }
        return r;
      },
      randomColor: function() {
        var rhex6 = Math.floor(Math.random() * Math.pow(16, 6));
        var s = rhex6.toString(16);
        while (s.length < 6) s = "0" + s;
        return "#" + s;
      },

      randomString: function(len) {
        var ret = "";
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++ ) {
          ret += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return ret;
      },

      colorToHex: function(color) {

        var colors = {
          "aliceblue" : "#f0f8ff",
          "antiquewhite" : "#faebd7",
          "aqua" : "#00ffff",
          "aquamarine" : "#7fffd4",
          "azure" : "#f0ffff",
          "beige" : "#f5f5dc",
          "bisque" : "#ffe4c4",
          "black" : "#000000",
          "blanchedalmond" : "#ffebcd",
          "blue" : "#0000ff",
          "blueviolet" : "#8a2be2",
          "brown" : "#a52a2a",
          "burlywood" : "#deb887",
          "cadetblue" : "#5f9ea0",
          "chartreuse" : "#7fff00",
          "chocolate" : "#d2691e",
          "coral" : "#ff7f50",
          "cornflowerblue" : "#6495ed",
          "cornsilk" : "#fff8dc",
          "crimson" : "#dc143c",
          "cyan" : "#00ffff",
          "darkblue" : "#00008b",
          "darkcyan" : "#008b8b",
          "darkgoldenrod" : "#b8860b",
          "darkgray" : "#a9a9a9",
          "darkgreen" : "#006400",
          "darkkhaki" : "#bdb76b",
          "darkmagenta" : "#8b008b",
          "darkolivegreen" : "#556b2f",
          "darkorange" : "#ff8c00",
          "darkorchid" : "#9932cc",
          "darkred" : "#8b0000",
          "darksalmon" : "#e9967a",
          "darkseagreen" : "#8fbc8f",
          "darkslateblue" : "#483d8b",
          "darkslategray" : "#2f4f4f",
          "darkturquoise" : "#00ced1",
          "darkviolet" : "#9400d3",
          "deeppink" : "#ff1493",
          "deepskyblue" : "#00bfff",
          "dimgray" : "#696969",
          "dodgerblue" : "#1e90ff",
          "firebrick" : "#b22222",
          "floralwhite" : "#fffaf0",
          "forestgreen" : "#228b22",
          "fuchsia" : "#ff00ff",
          "gainsboro" : "#dcdcdc",
          "ghostwhite" : "#f8f8ff",
          "gold" : "#ffd700",
          "goldenrod" : "#daa520",
          "gray" : "#808080",
          "green" : "#008000",
          "greenyellow" : "#adff2f",
          "honeydew" : "#f0fff0",
          "hotpink" : "#ff69b4",
          "indianred " : "#cd5c5c",
          "indigo" : "#4b0082",
          "ivory" : "#fffff0",
          "khaki" : "#f0e68c",
          "lavender" : "#e6e6fa",
          "lavenderblush" : "#fff0f5",
          "lawngreen" : "#7cfc00",
          "lemonchiffon" : "#fffacd",
          "lightblue" : "#add8e6",
          "lightcoral" : "#f08080",
          "lightcyan" : "#e0ffff",
          "lightgoldenrodyellow" : "#fafad2",
          "lightgrey" : "#d3d3d3",
          "lightgreen" : "#90ee90",
          "lightpink" : "#ffb6c1",
          "lightsalmon" : "#ffa07a",
          "lightseagreen" : "#20b2aa",
          "lightskyblue" : "#87cefa",
          "lightslategray" : "#778899",
          "lightsteelblue" : "#b0c4de",
          "lightyellow" : "#ffffe0",
          "lime" : "#00ff00",
          "limegreen" : "#32cd32",
          "linen" : "#faf0e6",
          "magenta" : "#ff00ff",
          "maroon" : "#800000",
          "mediumaquamarine" : "#66cdaa",
          "mediumblue" : "#0000cd",
          "mediumorchid" : "#ba55d3",
          "mediumpurple" : "#9370d8",
          "mediumseagreen" : "#3cb371",
          "mediumslateblue" : "#7b68ee",
          "mediumspringgreen" : "#00fa9a",
          "mediumturquoise" : "#48d1cc",
          "mediumvioletred" : "#c71585",
          "midnightblue" : "#191970",
          "mintcream" : "#f5fffa",
          "mistyrose" : "#ffe4e1",
          "moccasin" : "#ffe4b5",
          "navajowhite" : "#ffdead",
          "navy" : "#000080",
          "oldlace" : "#fdf5e6",
          "olive" : "#808000",
          "olivedrab" : "#6b8e23",
          "orange" : "#ffa500",
          "orangered" : "#ff4500",
          "orchid" : "#da70d6",
          "palegoldenrod" : "#eee8aa",
          "palegreen" : "#98fb98",
          "paleturquoise" : "#afeeee",
          "palevioletred" : "#d87093",
          "papayawhip" : "#ffefd5",
          "peachpuff" : "#ffdab9",
          "peru" : "#cd853f",
          "pink" : "#ffc0cb",
          "plum" : "#dda0dd",
          "powderblue" : "#b0e0e6",
          "purple" : "#800080",
          "red" : "#ff0000",
          "rosybrown" : "#bc8f8f",
          "royalblue" : "#4169e1",
          "saddlebrown" : "#8b4513",
          "salmon" : "#fa8072",
          "sandybrown" : "#f4a460",
          "seagreen" : "#2e8b57",
          "seashell" : "#fff5ee",
          "sienna" : "#a0522d",
          "silver" : "#c0c0c0",
          "skyblue" : "#87ceeb",
          "slateblue" : "#6a5acd",
          "slategray" : "#708090",
          "snow" : "#fffafa",
          "springgreen" : "#00ff7f",
          "steelblue" : "#4682b4",
          "tan" : "#d2b48c",
          "teal" : "#008080",
          "thistle" : "#d8bfd8",
          "tomato" : "#ff6347",
          "turquoise" : "#40e0d0",
          "violet" : "#ee82ee",
          "wheat" : "#f5deb3",
          "white" : "#ffffff",
          "whitesmoke" : "#f5f5f5",
          "yellow" : "#ffff00",
          "yellowgreen" : "#9acd32"
        };
        if (typeof colors[color.toLowerCase()] != null)
            return colors[color.toLowerCase()];
        return null;
      },

      createColor : function(hexstr, opacity) {
        if (hexstr == null) {
          hexstr = "#000000";
        }
        if (hexstr[0] !== "#") {
          hexstr = this.colorToHex(hexstr);
        }
        if (opacity == null) {
          opacity = 1.0;
        }
        var r = parseInt(hexstr.substr(1,2), 16),
            g = parseInt(hexstr.substr(3,2), 16),
            b = parseInt(hexstr.substr(5,2), 16);
            var str = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";;
        return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
      },

      getTipString : function(val, axis, fixed) {
        if (axis.axisType === "time") {
          return moment(val).tz(axis.axisTimezone).format("YYYY MMM DD ddd, HH:mm:ss .SSS");
        }
        if (typeof(val) === "number") {
          if (fixed === true) {
            // do nothing, keep full val
          } else if (typeof(fixed) === "number"){
            val = val.toFixed(fixed);
          } else {
            val = val.toFixed(axis.axisFixed);
          }
        }
        return "" + val;
      },

      getTipStringPercent : function(pct, axis, fixed) {
        var val = axis.getValue(pct);
        if (axis.axisType === "log") {
          val = axis.axisPow(pct);
          return this.getTipString(val, axis, fixed) + " (" + axis.getString(pct) + ")";
        }
        return this.getTipString(val, axis, fixed);
      },

      createTipString : function(obj) {
        var txt = "";
        _(obj).each(function(value, key) {
          if (key == "title") {
            txt += "<div style='font-weight:bold'>";
          } else {
            txt += "<div>";
            txt += key + ": ";
          }
          txt += value;
          txt += "</div>";
        });
        return txt;
      },

      rangeAssert : function(list) {
        _(list).each(function(e, i){
          if (Math.abs(e) > 1E6) {
            console.error("data not shown due to too large coordinate");
            return true;
          }
        });
        return false;
      }
    };
  };
  beaker.bkoFactory('plotUtils', ["bkUtils", retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotSampler = function(xs, ys, _ys){
      this.xs = xs;
      this.ys = ys;
      this._ys = _ys;
      this.n = xs.length;

      if (this.debug) {
        console.log("data size: ", this.n);
        var t = Date.now();
      }

      this.buildCoordTable();

      if (this.debug) {
        console.log("coord table: ", Date.now() - t, "ms");
        t = Date.now();
      }

      this.buildSegTree();

      if (this.debug) {
        console.log("seg tree: ", Date.now() - t, "ms");
      }
    };

    PlotSampler.prototype.debug = false;  // set time estimation

    PlotSampler.prototype.sample = function(xl, xr, step) {
      if (step <= 0 || xr < xl) {
        console.error("incorrect sample parameters");
        return [];
      }
      var ret = [];
      this.hashes = {};
      var nsl = xl, sl, sr;
      while (nsl < xr) {
        sl = nsl;
        nsl += step;
        sr = sl + step - 1E-12; // [sl,sr) closed open, be ware of precision problem

        var qret = this.query(sl, sr);
        if (qret == null) {
          continue;
        }
        var h = qret.l + "_" + qret.r;
        if (this.hashes[h] != null) {
          continue;
        } else {
          this.hashes[h] = 1;
        }
        // prevent segtree from being modified
        var avg = qret.sum / qret.cnt;
        var ele = {
          min : qret.min,
          max : qret.max,
          _min : qret._min,
          _max : qret._max,
          xl : sl,
          xr : sr,
          avg : avg,
          x : (sl + sr) / 2,
          y : avg,
          hash : h
        };
        ret.push(ele);
      }
      delete this.hashes;
      return ret;
    };

    PlotSampler.prototype.query = function(xl, xr) {
      if (xr < this.xs[0] || xl > this.xs[this.xs.length - 1]) {
        return null;
      }
      var l = this.mapIndex(xl),
          r = this.mapIndex(xr);
      l = Math.max(l, 0);
      r = Math.min(r, this.n - 1);
      if (l > r || r == -1) {
        return null;
      }
      var ret = this.querySegTree(0, 0, this.n - 1, l, r);
      ret.l = l;
      ret.r = r;
      return ret;
    };

    PlotSampler.prototype.buildCoordTable = function() {
      this.x = this.xs.slice(0); // copy xs to x

      if (this.debug) {
        var t = Date.now();
      }

      _.uniq(this.xs, true); // keep unique values in xs

      if (this.debug) {
        console.log("uniq ", Date.now() - t, "ms");
        t = Date.now();
      }

      for (var i = 0; i < this.n; i++) {
        //if (this.x[i] == null || isNaN(this.x[i]) === true) {
        //  console.error("invalid value passed to sampler");
        //}
        this.x[i] = this.mapIndex(this.x[i]);
      }

      if (this.debug) {
        console.log("map ", Date.now() - t, "ms");
      }
    };

    PlotSampler.prototype.buildSegTree = function() {
      this.mins = [];
      this.maxs = [];
      this.sums = [];
      this.cnts = [];
      this._mins = [];
      this._maxs = [];
      this.initSegTree(0, 0, this.n - 1);
    };

    PlotSampler.prototype.initSegTree = function(k, nl, nr) {
      if (nl == nr) {
        this.mins[k] = this.ys[nl];
        this.maxs[k] = this.ys[nl];
        this.sums[k] = this.ys[nl];
        this._mins[k] = this._ys[nl];
        this._maxs[k] = this._ys[nl];
        this.cnts[k] = 1;
        return;
      }
      var nm = Math.floor((nl + nr) / 2),
          kl = 2 * k + 1,
          kr = 2 * k + 2;
      this.initSegTree(kl, nl, nm);
      this.initSegTree(kr, nm + 1, nr);
      this.mins[k] = Math.min(this.mins[kl], this.mins[kr]);
      this.maxs[k] = Math.max(this.maxs[kl], this.maxs[kr]);
      this._mins[k] = Math.min(this._mins[kl], this._mins[kr]);
      this._maxs[k] = Math.max(this._maxs[kl], this._maxs[kr]);
      this.sums[k] = this.sums[kl] + this.sums[kr];
      this.cnts[k] = this.cnts[kl] + this.cnts[kr];
    };

    PlotSampler.prototype.querySegTree = function(k, nl, nr, l, r) {
      if (r < nl || l > nr || l > r) {
        return null;
      }
      if (l <= nl && r >= nr) {
        return {
          min : this.mins[k],
          max : this.maxs[k],
          _min : this._mins[k],
          _max : this._maxs[k],
          sum : this.sums[k],
          cnt : this.cnts[k]
        };
      }
      var nm = Math.floor((nl + nr) / 2),
          kl = 2 * k + 1,
          kr = 2 * k + 2;
      var retl = this.querySegTree(kl, nl, nm, l, r),
          retr = this.querySegTree(kr, nm + 1, nr, l, r);
      if (retl == null && retr == null) {
        return null;
      } else if (retl == null) {
        return retr;
      } else if (retr == null) {
        return retl;
      } else {
        return {
          min : Math.min(retl.min, retr.min),
          max : Math.max(retl.max, retr.max),
          _min : Math.min(retl._min, retr._min),
          _max : Math.max(retl._max, retr._max),
          sum : retl.sum + retr.sum,
          cnt : retl.cnt + retr.cnt
        };
      }
    };

    PlotSampler.prototype.mapIndex = function(x) {
      // find the largest element in xs that is <= x, may return -1 (no such element)
      var l = 0, r = this.xs.length - 1;
      while (l <= r) {
        var m = Math.floor((l + r) / 2);
        if (this.xs[m] <= x) {
          l = m + 1;
        } else {
          r = m - 1;
        }
      }
      return r;
    };

    return PlotSampler;
  };
  beaker.bkoFactory('PlotSampler', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotAuxBox = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotAuxBox.prototype.plotClass = "";

    PlotAuxBox.prototype.format = function() {
      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op": this.color_opacity,
        "st": this.stroke,
        "st_w": this.stroke_width,
        "st_op": this.stroke_opacity
      };
      this.elementProps = [];
      this.widthShrink = 0;
    };

    PlotAuxBox.prototype.setWidthShrink = function(shrink) {
      this.widthShrink = shrink;
    };

    PlotAuxBox.prototype.render = function(scope, elements, gid){
      this.elements = elements;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotAuxBox.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var skipped = false;

      eleprops.length = 0;

      var eles = this.elements;
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        var x = mapX(ele.x), x2 = mapX(ele.x2),
            y = mapY(ele.y), y2 = mapY(ele.y2);

        if (plotUtils.rangeAssert([x, x2, y, y2])) {
          eleprops.length = 0;
          return;
        }

        var id = this.id + "_" + i;
        var prop = {
          "id" : id,
          "x" : x + this.widthShrink,
          "y" : y2,
          "w" : x2 - x - this.widthShrink * 2,
          "h" : y - y2
        };
        eleprops.push(prop);
      }
    };

    PlotAuxBox.prototype.draw = function(scope, gid) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var groupid = this.id + "_" + gid;
      var itemsvg = svg.select("#" + this.id);

      if (itemsvg.select("#" + groupid).empty()) {
        // aux box are ploted as bars with normal coloring
        // if special coloring is needed, it is set from the loader
        itemsvg.selectAll("#" + groupid)
          .data([props]).enter().append("g")
          .attr("id", groupid);
      }
      itemsvg.select("#" + groupid)
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-width", props.st_w);

      var groupsvg = itemsvg.select("#" + groupid);

      // draw boxes
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.plotClass)
        .style("fill", function(d) { return d.fi; })
        .style("fill-opacity", function(d) { return d.fi_op; })
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-width", function(d) { return d.st_w; });

      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.w; })
        .attr("height", function(d) { return d.h; });
    };

    return PlotAuxBox;
  };
  beaker.bkoFactory('PlotAuxBox', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotAuxRiver = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };
    PlotAuxRiver.prototype.plotClass = "";

    PlotAuxRiver.prototype.format = function() {
      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op" : this.color_opacity,
        "st" : this.stroke,
        "st_w" : this.stroke_width,
        "st_op" : this.stroke_opacity,
        "pts" : null
      };
      this.elementProps = [];
    };

    PlotAuxRiver.prototype.render = function(scope, elements, gid){
      if (gid == null) { gid = ""; }
      this.elements = elements;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotAuxRiver.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var pstr = "";

      eleprops.length = 0;

      var eles = this.elements;
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        var x = mapX(ele.x), y = mapY(ele.y), y2 = mapY(ele.y2);

        if (plotUtils.rangeAssert([x, y, y2])) {
          eleprops.length = 0;
          return;
        }
        pstr += x + "," + y + " ";
      }

      for (var i = eles.length - 1; i >= 0; i--) {
        var ele = eles[i];
        var x = mapX(ele.x), y2 = mapY(ele.y2);
        pstr += x + "," + y2 + " ";
      }
      if (pstr.length > 0) {
        this.itemProps.pts = pstr;
      }
    };

    PlotAuxRiver.prototype.draw = function(scope, gid) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var groupid = this.id + "_" + gid;
      var itemsvg = svg.select("#" + this.id);

      if (itemsvg.select("#" + groupid).empty()) {
        // aux box are ploted as bars with normal coloring
        // if special coloring is needed, it is set from the loader
        itemsvg.selectAll("#" + groupid)
          .data([props]).enter().append("g")
          .attr("id", groupid);
      }

      var groupsvg = itemsvg.select("#" + groupid);

      groupsvg.selectAll("polygon")
        .data([props]).enter().append("polygon");
      groupsvg.selectAll("polygon")
        .attr("points", props.pts)
        .attr("class", this.plotClass)
        .style("fill", function(d) { return d.fi; })
        .style("fill-opacity", function(d) { return d.fi_op; })
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-width", function(d) { return d.st_w; });
    };

    return PlotAuxRiver;
  };
  beaker.bkoFactory('PlotAuxRiver', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotAuxStem = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotAuxStem.prototype.plotClass = "";

    PlotAuxStem.prototype.format = function() {
      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op" : this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray
      };
      this.elementProps = [];
    };

    PlotAuxStem.prototype.render = function(scope, elements, gid){
      this.elements = elements;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotAuxStem.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var skipped = false;

      eleprops.length = 0;

      var eles = this.elements;
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        var x = mapX(ele.x),
            y = mapY(ele.y), y2 = mapY(ele.y2);

        if (plotUtils.rangeAssert([x, y, y2])) {
          eleprops.length = 0;
          return;
        }

        var id = this.id + "_" + i;
        var prop = {
          "id" : id,
          "x" : x,
          "y" : y,
          "y2" : y2
        };
        eleprops.push(prop);
      }
    };

    PlotAuxStem.prototype.draw = function(scope, gid) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var groupid = this.id + "_" + gid;
      var itemsvg = svg.select("#" + this.id);

      if (itemsvg.select("#" + groupid).empty()) {
        // aux box are ploted as bars with normal coloring
        // if special coloring is needed, it is set from the loader
        itemsvg.selectAll("#" + groupid)
          .data([props]).enter().append("g")
          .attr("id", groupid);
      }
      itemsvg.select("#" + groupid)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-width", props.st_w)
        .style("stroke-dasharray", props.st_da);

      var groupsvg = itemsvg.select("#" + groupid);

      // draw stems
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).enter().append("line")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.plotClass)
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-width", function(d) { return d.st_w; })
        .style("stroke-dasharray", function(d) { return d.st_da; });
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; })
        .attr("x1", function(d) { return d.x; })
        .attr("x2", function(d) { return d.x; })
        .attr("y1", function(d) { return d.y; })
        .attr("y2", function(d) { return d.y2; });
    };

    return PlotAuxStem;
  };
  beaker.bkoFactory('PlotAuxStem', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotLine = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    // constants
    PlotLine.prototype.respR = 5;
    PlotLine.prototype.plotClass = "plot-line";
    PlotLine.prototype.respClass = "plot-resp plot-respdot";

    PlotLine.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op" : this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray,
        "d" : null
      };
      this.elementProps = [];
    };

    PlotLine.prototype.render = function(scope){
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }
      this.filter(scope);
      this.prepare(scope);
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope);
      }
    };

    PlotLine.prototype.getRange = function() {
      var eles = this.elements;
      var range = {
        xl : Infinity,
        xr : -Infinity,
        yl : Infinity,
        yr : -Infinity,
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        range.xl = Math.min(range.xl, ele.x);
        range.xr = Math.max(range.xr, ele.x);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y);
      }
      return range;
    };

    PlotLine.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
      }
    };

    PlotLine.prototype.filter = function(scope) {
      var eles = this.elements;
      if (this.isUnorderedItem === true) {
        // cannot do truncation on unordered item, force rendering all
        this.vindexL = 0;
        this.vindexR = eles.length - 1;
        this.vlength = eles.length;
        return;
      }
      var l = plotUtils.upper_bound(eles, "x", scope.focus.xl),
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr) + 1;

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x < scope.focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotLine.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps,
          tipids = this.tipIds;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var pstr = "";

      eleprops.length = 0;

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        if (i === this.vindexL) {
          pstr += "M";
        } else if (i === this.vindexL + 1) {
          if (this.interpolation !== "curve") pstr += "L";
          else pstr += "C";
        }
        var x = mapX(ele.x), y = mapY(ele.y);

        if (plotUtils.rangeAssert([x, y])) {
          eleprops.length = 0;
          return;
        }

        var nxtp = x + "," + y + " ";

        if (this.useToolTip === true && focus.yl <= ele.y && ele.y <= focus.yr) {
          var id = this.id + "_" + i;
          var prop = {
            "id" : id,
            "idx" : this.index,
            "ele" : ele,
            "isresp" : true,
            "cx" : x,
            "cy" : y,
            "op" : scope.tips[id] == null ? 0 : 1,
          };
          eleprops.push(prop);
        }

        if (i < this.vindexR) {
          if (this.interpolation === "none") {
            var ele2 = eles[i + 1];
            var x2 = mapX(ele2.x);

            if (plotUtils.rangeAssert([x2])) {
              eleprops.length = 0;
              return;
            }

            nxtp += x + "," +y + " " + x2 + "," + y + " ";

          } else if (this.interpolation === "curve") {
            // TODO curve implementation
          }
        }
        pstr += nxtp;
      }
      if (pstr.length > 0) {
        this.itemProps.d = pstr;
      }
    };

    PlotLine.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var itemsvg = svg.select("#" + this.id);

      itemsvg.selectAll("path")
        .data([props]).enter().append("path")
        .attr("class", this.plotClass)
        .style("stroke", function(d) { return d.st; })
        .style("stroke-dasharray", function(d) { return d.st_da; })
        .style("stroke-width", function(d) { return d.st_w; })
        .style("stroke-opacity", function(d) { return d.st_op; });
      itemsvg.select("path")
        .attr("d", props.d);

      if (this.useToolTip === true) {
        itemsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id; }).exit().remove();
        itemsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id; }).enter().append("circle")
          .attr("id", function(d) { return d.id; })
          .attr("class", this.respClass)
          .style("stroke", this.tip_color);
        itemsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id; })
          .attr("cx", function(d) { return d.cx; })
          .attr("cy", function(d) { return d.cy; })
          .attr("r", this.respR)
          .style("opacity", function(d) { return d.op; });
      }
    };

    PlotLine.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotLine.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    PlotLine.prototype.createTip = function(ele) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var valx = plotUtils.getTipString(ele._x, xAxis, true),
          valy = plotUtils.getTipString(ele._y, yAxis, true);
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend;
      }
      tip.x = valx;
      tip.y = valy;
      return plotUtils.createTipString(tip);
    };

    return PlotLine;
  };
  beaker.bkoFactory('PlotLine', ['plotUtils', 'PlotSampler', retfunc]);
})();


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
  var retfunc = function(plotUtils) {

    var PlotBar = function(data) {
      _(this).extend(data); // copy properties to itself
      this.format();
    };
    PlotBar.prototype.plotClass = "plot-bar";
    PlotBar.prototype.respClass = "plot-resp";

    PlotBar.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op": this.color_opacity,
        "st": this.stroke,
        "st_w": this.stroke_width,
        "st_op": this.stroke_opacity
      };
      this.elementProps = [];
    };

    PlotBar.prototype.render = function(scope) {
      if (this.showItem == false) {
        this.clear(scope);
        return;
      }
      this.filter(scope);
      this.prepare(scope);
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope);
      }
    };

    PlotBar.prototype.getRange = function(){
      var eles = this.elements;
      var range = {
        xl : Infinity,
        xr : -Infinity,
        yl : Infinity,
        yr : -Infinity,
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        range.xl = Math.min(range.xl, ele.x);
        range.xr = Math.max(range.xr, ele.x2);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y2);
      }
      return range;
    };

    PlotBar.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
        ele.x2 = xAxis.getPercent(ele.x2);
        ele.y2 = yAxis.getPercent(ele.y2);
      }
    };

    PlotBar.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x2", scope.focus.xl) + 1,
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr);

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x2 < focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotBar.prototype.prepare = function(scope) {
      var w = this.width, sw;
      var focus = scope.focus;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var eleprops = this.elementProps,
          eles = this.elements;

      eleprops.length = 0;
      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        if (ele.y2 < focus.yl || ele.y > focus.yr) { continue; }

        var x = mapX(ele.x), x2 = mapX(ele.x2);
        if (x2 - x < 1) x2 = x + 1;
        var y = mapY(ele.y), y2 = mapY(ele.y2);
        sw = x2 - x;
        if (y < y2) { continue; } // prevent negative height


        if (plotUtils.rangeAssert([x, x2, y, y2])) {
          eleprops.length = 0;
          return;
        }

        var id = this.id + "_" + i;
        var prop = {
          "id" : id,
          "idx" : this.index,
          "ele" : ele,
          "x" : x,
          "y" : y2,
          "w" : sw,
          "h" : y - y2,
          "fi" : ele.color,
          "fi_op" : ele.color_opacity,
          "st" : ele.stroke,
          "st_w" : ele.stroke_width,
          "st_op" : ele.stroke_opacity
        };
        eleprops.push(prop);
      }
    };

    PlotBar.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }
      svg.select("#" + this.id)
        .attr("class", this.plotClass)
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-width", props.st_w);


      var itemsvg = svg.select("#" + this.id);
      var respClass = this.useToolTip === true ? this.respClass : null;
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", respClass)
        .style("fill", function(d) { return d.fi; })
        .style("fill-opacity", function(d) { return d.fi_op; })
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-width", function(d) { return d.st_w; });
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.w; })
        .attr("height", function(d) { return d.h; });
    };

    PlotBar.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotBar.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    PlotBar.prototype.createTip = function(ele) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend;
      }
      tip.x = plotUtils.getTipString(ele._x, xAxis, true);
      tip.yTop = plotUtils.getTipString(ele._y2, yAxis, true);
      tip.yBtm = plotUtils.getTipString(ele._y, yAxis, true);
      return plotUtils.createTipString(tip);
    };

    return PlotBar;
  };
  beaker.bkoFactory('PlotBar', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotStem = function(data) {
      _(this).extend(data);
      this.format();
    };

    PlotStem.prototype.plotClass = "plot-stem";
    PlotStem.prototype.respClass = "plot-resp";

    PlotStem.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op": this.color_opacity,
        "st_w": this.width,
        "st_da": this.stroke_dasharray
      };
      this.elementProps = [];
    };

    PlotStem.prototype.render = function(scope) {
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }
      this.filter(scope);
      this.prepare(scope);
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope);
      }
    };

    PlotStem.prototype.getRange = function() {
      var eles = this.elements;
      var range = {
        xl : Infinity,
        xr : -Infinity,
        yl : Infinity,
        yr : -Infinity,
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        range.xl = Math.min(range.xl, ele.x);
        range.xr = Math.max(range.xr, ele.x);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y2);
      }
      return range;
    };

    PlotStem.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
        ele.y2 = yAxis.getPercent(ele.y2);
      }
    };

    PlotStem.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x", scope.focus.xl) + 1,
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr);

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x < scope.focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotStem.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;

      eleprops.length = 0;

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        if (ele.y2 < focus.yl || ele.y > focus.yr) { continue; }

        var x = mapX(ele.x), y = mapY(ele.y), y2 = mapY(ele.y2);

        if (plotUtils.rangeAssert([x, y, y2])) {
          eleprops.length = 0;
          return;
        }

        var prop = {
          "id" : this.id + "_" + i,
          "idx" : this.index,
          "ele" : ele,
          "st" : ele.color,
          "st_op": ele.color_opacity,
          "st_w" : ele.width,
          "st_da": ele.stroke_dasharray,
          "x1" : x,
          "y1" : y,
          "x2" : x,
          "y2" : y2
        };
        eleprops.push(prop);
      }
    };

    PlotStem.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }
      svg.select("#" + this.id)
        .attr("class", this.plotClass)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-dasharray", props.st_da)
        .style("stroke-width", props.st_w);

      var respClass = this.useToolTip === true ? this.respClass : null;
      var itemsvg = svg.select("#" + this.id);
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).enter().append("line")
        .attr("id", function(d) { return d.id; })
        .attr("class", respClass)
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-dasharray", function(d) { return d.st_da; })
        .style("stroke-width", function(d) { return d.st_da; });
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; })
        .attr("x1", function(d) { return d.x1; })
        .attr("x2", function(d) { return d.x2; })
        .attr("y1", function(d) { return d.y1; })
        .attr("y2", function(d) { return d.y2; });
    };

    PlotStem.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotStem.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    PlotStem.prototype.createTip = function(ele) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend;
      }
      tip.x = plotUtils.getTipString(ele._x, xAxis, true);
      tip.yTop = plotUtils.getTipString(ele._y2, yAxis, true);
      tip.yBtm = plotUtils.getTipString(ele._y, yAxis, true);
      return plotUtils.createTipString(tip);
    };

    return PlotStem;
  };
  beaker.bkoFactory('PlotStem', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {

    var PlotArea = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotArea.prototype.respWidth = 5;
    PlotArea.prototype.respMinHeight = 5;
    PlotArea.prototype.plotClass = "plot-area";
    PlotArea.prototype.respClass = "plot-resp plot-respstem";

    PlotArea.prototype.format = function(){
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }

      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op": this.color_opacity,
        "st": this.stroke,
        "st_w": this.stroke_width,
        "st_op": this.stroke_opacity,
        "pts" : null
      };
      this.elementProps = [];
    };

    PlotArea.prototype.render = function(scope){
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }
      this.filter(scope);
      this.prepare(scope);
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope);
      }
    };

    PlotArea.prototype.getRange = function(){
      var eles = this.elements;
      var range = {
        xl : Infinity,
        xr : -Infinity,
        yl : Infinity,
        yr : -Infinity,
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        range.xl = Math.min(range.xl, ele.x);
        range.xr = Math.max(range.xr, ele.x);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y2);
      }
      return range;
    };

    PlotArea.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
        ele.y2 = yAxis.getPercent(ele.y2);
      }
    };

    PlotArea.prototype.filter = function(scope) {
      var eles = this.elements;
      if (this.isUnorderedItem === true) {
        // cannot do truncation on unordered item, force rendering all
        this.vindexL = 0;
        this.vindexR = eles.length - 1;
        this.vlength = eles.length;
        return;
      }
      var l = plotUtils.upper_bound(eles, "x", scope.focus.xl),
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr) + 1;

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x < scope.focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotArea.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var pstr = "";

      eleprops.length = 0;

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        var x = mapX(ele.x), y = mapY(ele.y), y2 = mapY(ele.y2);

        if (plotUtils.rangeAssert([x, y, y2])) {
          eleprops.length = 0;
          return;
        }

        if (this.interpolation === "linear") {
          pstr += x + "," + y + " ";
        } else if (this.interpolation === "none" && i < this.vindexR) {
          var ele2 = eles[i + 1];
          var x2 = mapX(ele2.x);
          if (Math.abs(x2) > 1E6) {
            skipped = true;
            break;
          }
          pstr += x + "," + y + " " + x2 + "," + y + " ";
        }

        if (this.useToolTip === true && ele.y <= focus.yr && ele.y2 >= focus.yl) {
          var id = this.id + "_" + i;
          var prop = {
            "id" : id,
            "idx" : this.index,
            "ele" : ele,
            "isresp" : true,
            "x" : x - this.respWidth / 2,
            "y" : y2,
            "h" : Math.max(y - y2, this.respMinHeight),  // min height to be hoverable
            "op" : scope.tips[id] == null ? 0 : 1
          };
          eleprops.push(prop);
        }
      }

      for (var i = this.vindexR; i >= this.vindexL; i--) {
        var ele = eles[i];
        var x = mapX(ele.x), y2 = mapY(ele.y2);

        if (this.interpolation === "linear") {
          pstr += x + "," + y2 + " ";
        } else if (this.interpolation === "none" && i < this.vindexR) {
          var ele2 = eles[i + 1];
          var x2 = mapX(ele2.x);

          if (plotUtils.rangeAssert([x2])) {
            eleprops.length = 0;
            return;
          }

          pstr += x2 + "," + y2 + " " + x + "," + y2 + " ";
        }
      }
      if (pstr.length > 0) {
        this.itemProps.pts = pstr;
      }
    };

    PlotArea.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var itemsvg = svg.select("#" + this.id);

      itemsvg.selectAll("polygon")
        .data([props]).enter().append("polygon")
        .attr("class", this.plotClass)
        .style("fill", function(d) { return d.fi; })
        .style("fill-opacity", function(d) { return d.fi_op; })
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-width", function(d) { return d.st_w; });
      itemsvg.select("polygon")
        .attr("points", props.pts);

      if (this.useToolTip === true) {
        itemsvg.selectAll("rect")
          .data(eleprops, function(d) { return d.id; }).exit().remove();
        itemsvg.selectAll("rect")
          .data(eleprops, function(d) { return d.id; }).enter().append("rect")
          .attr("id", function(d) { return d.id; })
          .attr("class", this.respClass)
          .attr("width", this.respWidth)
          .style("stroke", this.tip_color);

        itemsvg.selectAll("rect")
          .data(eleprops, function(d) { return d.id; })
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("height", function(d) { return d.h; })
          .style("opacity", function(d) { return d.op; });
      }
    };

    PlotArea.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotArea.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    PlotArea.prototype.createTip = function(ele) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend;
      }
      tip.x = plotUtils.getTipString(ele._x, xAxis, true);
      tip.yTop = plotUtils.getTipString(ele._y2, yAxis, true);
      tip.yBtm = plotUtils.getTipString(ele._y, yAxis, true);
      return plotUtils.createTipString(tip);
    };

    return PlotArea;
  };
  beaker.bkoFactory('PlotArea', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotPoint = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotPoint.prototype.plotClass = "plot-point";
    PlotPoint.prototype.respClass = "plot-resp";
    PlotPoint.prototype.shapes = ["rect", "diamond", "circle"];
    PlotPoint.prototype.svgtags = ["rect", "polygon", "circle"];

    PlotPoint.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op": this.color_opacity,
        "st": this.stroke,
        "st_op" : this.stroke_opacity,
        "st_w": this.stroke_width,
        "st_da": this.stroke_dasharray
      };

      this.elementProps = {
        "rect" : [],
        "diamond" : [],
        "circle" : []
      };
    };

    PlotPoint.prototype.render = function(scope) {
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }
      this.filter(scope);
      this.prepare(scope);
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope);
      }
    };

    PlotPoint.prototype.getRange = function() {
      var eles = this.elements;
      var range = {
        xl : Infinity,
        xr : -Infinity,
        yl : Infinity,
        yr : -Infinity,
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        range.xl = Math.min(range.xl, ele.x);
        range.xr = Math.max(range.xr, ele.x);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y);
      }
      return range;
    };

    PlotPoint.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
      }
    };

    PlotPoint.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x", scope.focus.xl) + 1,
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr);

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x < scope.focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotPoint.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;

      _(this.elementProps).each(function(val) {
        val.length = 0;
      });

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        if (ele.y < focus.yl || ele.y > focus.yr) { continue; }
        var x = mapX(ele.x), y = mapY(ele.y), s = ele.size;

        if (plotUtils.rangeAssert([x, y])) {
          _(this.elementProps).each(function(val) {
            val.length = 0;
          });
          return;
        }

        var prop = {
          "id" :  this.id + "_" + i,
          "idx" : this.index,
          "ele" : ele,
          "fi" : ele.color,
          "fi_op" : ele.color_opacity,
          "st" : ele.stroke,
          "st_op" : ele.stroke_opacity,
          "st_w" : ele.stroke_width,
          "st_da" : ele.stroke_dasharray
        };
        var shape = ele.shape == null ? this.shape : ele.shape;
        switch (shape) {
          case "diamond":
            var pstr = "";
            pstr += (x - s) + "," + (y    ) + " ";
            pstr += (x    ) + "," + (y - s) + " ";
            pstr += (x + s) + "," + (y    ) + " ";
            pstr += (x    ) + "," + (y + s) + " ";
            _(prop).extend({
              "pts" : pstr
            });
            break;
          case "circle":
            _(prop).extend({
              "cx" : x,
              "cy" : y,
              "r" : s
            });
            break;
          default:    // rects
            _(prop).extend({
              "x" : x - s / 2,
              "y" : y - s / 2,
              "w" : s,
              "h" : s
            });
        }
        this.elementProps[shape].push(prop);
      }
    };

    PlotPoint.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }
      svg.select("#" + this.id)
        .attr("class", this.plotClass)
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-dasharray", props.st_da)
        .style("stroke-width", props.st_w);

      var itemsvg = svg.select("#" + this.id);
      var respClass = this.useToolTip === true ? this.respClass : null;

      for (var i = 0; i < this.shapes.length; i++) {
        var shape = this.shapes[i],
            tag = this.svgtags[i],
            eleprops = this.elementProps[shape];

        var shapesvg = itemsvg.select("#" + shape);

        if (shapesvg.empty()) {
          shapesvg = itemsvg.selectAll("#" + shape)
            .data([{}]).enter().append("g")
            .attr("id", shape);
        }

        shapesvg.selectAll(tag)
          .data(eleprops, function(d) { return d.id; }).exit().remove();
        shapesvg.selectAll(tag)
          .data(eleprops, function(d) { return d.id; }).enter().append(tag)
          .attr("id", function(d) { return d.id; })
          .attr("class", respClass)
          .style("fill", function(d) { return d.fi; })
          .style("fill-opacity", function(d) { return d.fi_op; })
          .style("stroke", function(d) { return d.st; })
          .style("stroke-opacity", function(d) { return d.st_op; })
          .style("stroke-dasharray", function(d) { return d.st_da; })
          .style("stroke-width", function(d) { return d.st_w; });

        switch (shape) {
          case "circle":
            shapesvg.selectAll(tag)
              .data(eleprops, function(d) { return d.id; })
              .attr("cx", function(d) { return d.cx; })
              .attr("cy", function(d) { return d.cy; })
              .attr("r", function(d) { return d.r; });
            break;
          case "diamond":
            shapesvg.selectAll(tag)
              .data(eleprops, function(d) { return d.id; })
              .attr("points", function(d) { return d.pts; });
            break;
          default:  // rect
            shapesvg.selectAll(tag)
              .data(eleprops, function(d) { return d.id; })
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; })
              .attr("width", function(d) { return d.w; })
              .attr("height", function(d) { return d.h; });
        }
      }
    };

    PlotPoint.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotPoint.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    PlotPoint.prototype.createTip = function(ele) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend;
      }
      tip.x = plotUtils.getTipString(ele._x, xAxis, true);
      tip.y = plotUtils.getTipString(ele._y, yAxis, true);
      return plotUtils.createTipString(tip);
    };

    return PlotPoint;
  };
  beaker.bkoFactory('PlotPoint', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotConstline = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotConstline.prototype.plotClass = "plot-constline";

    PlotConstline.prototype.format = function(){
      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op": this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray
      };

      this.elementProps = [];
      this.labelpipe = [];
      this.rmlabelpipe = [];
    };

    PlotConstline.prototype.render = function(scope){
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }
      this.filter(scope);
      this.prepare(scope);
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope);
      }
    };

    PlotConstline.prototype.getRange = function() {
      var eles = this.elements;
      var range = {
        xl : Infinity,
        xr : -Infinity,
        yl : Infinity,
        yr : -Infinity,
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        if (ele.type === "x") {
          range.xl = Math.min(range.xl, ele.x);
          range.xr = Math.max(range.xr, ele.x);
        } else if (ele.type === "y") {
          range.yl = Math.min(range.yl, ele.y);
          range.yr = Math.max(range.yr, ele.y);
        }
      }
      return range;
    };

    PlotConstline.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        if (ele.type === "x") {
          ele.x = xAxis.getPercent(ele.x);
        } else if (ele.type === "y") {
          ele.y = yAxis.getPercent(ele.y);
        }
      }
    };

    PlotConstline.prototype.filter = function(scope) {
      // do nothing and show everything
      var l = 0, r = this.elements.length - 1;
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };


    PlotConstline.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var lMargin = scope.layout.leftLayoutMargin,
          bMargin = scope.layout.bottomLayoutMargin;
      var W = scope.jqsvg.width(),
          H = scope.jqsvg.height();

      eleprops.length = 0;
      this.labelpipe.length = 0;
      this.rmlabelpipe.length = 0;

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];

        var prop = {
          "id" : this.id + "_" + i,
          "lbid" : this.id + "_" + i + "l",
          "st" : ele.color,
          "st_op" : ele.color_opacity,
          "st_w" : ele.width,
          "st_da" : ele.stroke_dasharray,
          "bg_clr" : ele.color == null ? this.color : ele.color
        };
        eleprops.push(prop);

        // does not need range assert, clipped directly
        if (ele.type === "x") {
          if (ele.x < focus.xl || ele.x > focus.xr) {
            this.rmlabelpipe.push(eleprops[i]);
            continue;
          } else {
            this.labelpipe.push(eleprops[i]);
          }
          var x = mapX(ele.x);
          _(prop).extend({
            "x1" : x,
            "x2" : x,
            "y1" : mapY(focus.yl),
            "y2" : mapY(focus.yr),
          });

          var text = plotUtils.getTipString(ele._x, scope.stdmodel.xAxis);

          _(prop).extend({
            "left" : function(w, h, x) { return x - w / 2; },
            "top" : function(w, h, y) { return H - bMargin - h - scope.labelPadding.y; },
            "lb_txt" : text
          });

        } else if (ele.type === "y") {
          if (ele.y < focus.yl || ele.y > focus.yr) {
            this.rmlabelpipe.push(eleprops[i]);
            continue;
          } else {
            this.labelpipe.push(eleprops[i]);
          }
          var y = mapY(ele.y);
          _(prop).extend({
            "x1" : mapX(focus.xl),
            "x2" : mapX(focus.xr),
            "y1" : y,
            "y2" : y,
          });
          var text = plotUtils.getTipString(ele._y, scope.stdmodel.yAxis);

          _(prop).extend({
            "left" : function(w, h, x) { return lMargin + scope.labelPadding.x; },
            "top" : function(w, h, y) { return y - h / 2; },
            "lb_txt" : text
          });
        }
      }
    };


    PlotConstline.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }
      svg.select("#" + this.id)
        .attr("class", this.plotClass)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-dasharray", props.st_da)
        .style("stroke-width", props.st_w);

      var svgitem = svg.select("#" + this.id);
      svgitem.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      svgitem.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).enter().append("line")
        .attr("id", function(d) { return d.id; })
        //.attr("class", this.respClass) // does not need resp
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-width", function(d) { return d.st_w; })
        .style("stroke-dasharray", function(d) { return d.st_da; });
      svgitem.selectAll("line")
        .data(eleprops, function(d) { return d.id; })
        .attr("x1", function(d) { return d.x1; })
        .attr("x2", function(d) { return d.x2; })
        .attr("y1", function(d) { return d.y1; })
        .attr("y2", function(d) { return d.y2; });

      // add and remove labels
      for (var i = 0; i < this.labelpipe.length; i++) {
        var lb = this.labelpipe[i], lbid = lb.lbid;

        var box = scope.jqcontainer.find("#" + lbid);
        if (box.empty()) {
          box = $("<div></div>")
            .appendTo(scope.jqcontainer)
            .attr("id", lbid)
            .attr("class", "plot-constlabel")
            .css("background-color", lb.bg_clr)
            .text(lb.lb_txt);
        }
        var w = box.outerWidth(), h = box.outerHeight();
        box.css({
          "left" : lb.left(w, h, lb.x1),
          "top" : lb.top(w, h, lb.y1)
        });
      }

      for (var i = 0; i < this.rmlabelpipe.length; i++) {
        scope.jqcontainer.find("#" + this.rmlabelpipe[i].lbid).remove();
      }

    };

    PlotConstline.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
    };

    PlotConstline.prototype.clearTips = function(scope) {
      // do nothing, no tip for this type
    };

    return PlotConstline;
  };
  beaker.bkoFactory('PlotConstline', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotConstband = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotConstband.prototype.plotClass = "plot-constband";

    PlotConstband.prototype.format = function(){
      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op": this.color_opacity,
        "st" : this.stroke,
        "st_op": this.stroke_opacity,
        "st_w" : this.stroke_width,
        "st_da" : this.stroke_dasharray
      };

      this.elementProps = [];
    };

    PlotConstband.prototype.render = function(scope){
      if (this.shotItem === false) {
        this.clear(scope);
        return;
      }
      this.filter(scope);
      this.prepare(scope);
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope);
      }
    };

    PlotConstband.prototype.getRange = function() {
      var eles = this.elements;
      var range = {
        xl : Infinity,
        xr : -Infinity,
        yl : Infinity,
        yr : -Infinity,
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        if (ele.type === "x") {
          range.xl = Math.min(range.xl, ele.x);
          range.xr = Math.max(range.xr, ele.x2);
        } else if (ele.type === "y") {
          range.yl = Math.min(range.yl, ele.y);
          range.yr = Math.max(range.yr, ele.y2);
        }
      }
      return range;
    };

    PlotConstband.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        if (ele.type === "x") {
          ele.x = xAxis.getPercent(ele.x);
          ele.x2 = xAxis.getPercent(ele.x2);
        } else if (ele.type === "y") {
          ele.y = yAxis.getPercent(ele.y);
          ele.y2 = yAxis.getPercent(ele.y2);
        }
      }
    };

    PlotConstband.prototype.filter = function(scope) {
      // do nothing and show everything
      var l = 0, r = this.elements.length - 1;
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };


    PlotConstband.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var lMargin = scope.layout.leftLayoutMargin,
          bMargin = scope.layout.bottomLayoutMargin,
          tMargin = scope.layout.topLayoutMargin,
          rMargin = scope.layout.rightLayoutMargin;
      var W = scope.jqsvg.width(),
          H = scope.jqsvg.height();

      eleprops.length = 0;

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];

        var prop = {
          "id" : this.id + "_" + i,
          "fi" : ele.color,
          "fi_op" : ele.color_opacity,
          "st" : ele.stroke,
          "st_op" : ele.storke_opacity,
          "st_w" : ele.stroke_width,
          "st_da" : ele.stroke_dasharray
        };

        // does not need range assert, clipped directly
        if (ele.type === "x") {
          if (ele.x > focus.xr || ele.x2 < focus.xl) {
            continue;
          } else {
            eleprops.push(prop);
          }

          var x = mapX(ele.x),
              x2 = mapX(ele.x2);
          x = Math.max(x, lMargin);
          x2 = Math.min(x2, W - rMargin);

          _(prop).extend({
            "x" : x,
            "w" : x2 - x,
            "y" : tMargin,
            "h" : H - bMargin - tMargin
          });
        } else if (ele.type === "y") {
          if (ele.y > focus.yr || ele.y2 < focus.yl) {
            continue;
          } else {
            eleprops.push(prop);
          }

          var y = mapY(ele.y),
              y2 = mapY(ele.y2);
          y = Math.min(y, H - bMargin);
          y2 = Math.max(y2, tMargin);

          _(prop).extend({
            "x" : lMargin,
            "w" : W - lMargin - rMargin,
            "y" : y2,
            "h" : y - y2
          });
        }
      }
    };


    PlotConstband.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }
      svg.select("#" + this.id)
        .attr("class", this.plotClass)
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-width", props.st_w)
        .style("stroke-dasharray", props.st_da);

      var itemsvg = svg.select("#" + this.id);

      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        // does not need resp class
        .style("fill", function(d) { return d.fi; })
        .style("fill-opacity", function(d) { return d.fi_op; })
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-width", function(d) { return d.st_wi; });
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.w; })
        .attr("height", function(d) { return d.h; });
    };

    PlotConstband.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
    };

    PlotConstband.prototype.clearTips = function(scope) {
      // do nothing, no tip for this type
    };

    return PlotConstband;
  };
  beaker.bkoFactory('PlotConstband', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotText = function(data){
      _(this).extend(data);
      this.format();
    };

    PlotText.prototype.plotClass = "plot-text";
    PlotText.prototype.respClass = "plot-resp";

    PlotText.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op" : this.color_opacity
      };
      this.elementProps = [];
    };

    PlotText.prototype.render = function(scope) {
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }
      this.filter(scope);
      this.prepare(scope);
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope);
      }
    };

    PlotText.prototype.getRange = function() {
      var eles = this.elements;
      var range = {
        xl : Infinity,
        xr : -Infinity,
        yl : Infinity,
        yr : -Infinity,
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        range.xl = Math.min(range.xl, ele.x);
        range.xr = Math.max(range.xr, ele.x);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y);
      }
      return range;
    };

    PlotText.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
      }
    };

    PlotText.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x", scope.focus.xl) + 1,
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr);

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x < scope.focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotText.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;

      eleprops.length = 0;
      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        if (ele.y < focus.yl || ele.y > focus.yr ) { continue; }
        var x = mapX(ele.x), y = mapY(ele.y);

        if (plotUtils.rangeAssert([x, y])) {
          eleprops.length = 0;
          return;
        }

        var tf = "", rot = null;
        if (ele.rotate != null) {
          rot = ele.rotate;
        } else if (this.rotate != null) {
          rot = this.rotate;
        }
        if (rot != null) {
          tf = "rotate(" + rot + " " + x + " " + y + ")";
        }
        tf += "translate(" + x + "," + y + ")";

        var prop = {
          "id" : this.id + "_" + i,
          "idx" : this.index,
          "ele" : ele,
          "tf" : tf,
          "txt" : ele.text,
          "fi" : ele.color,
          "fi_op" : ele.opacity
        };
        eleprops.push(prop);
      }
    };

    PlotText.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }
      svg.select("#" + this.id)
        .attr("class", this.plotClass)
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op);

      var respClass = this.useToolTip === true ? this.respClass : null;
      var itemsvg = svg.select("#" + this.id);
      itemsvg.selectAll("text")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("text")
        .data(eleprops, function(d) { return d.id; }).enter().append("text")
        .attr("id", function(d) { return d.id; })
        .attr("class", respClass)
        .style("fill", function(d) { return d.fi; })
        .style("fill_opacity", function(d) { return d.fi_op; })
        .text(function(d) { return d.txt; });
      itemsvg.selectAll("text")
        .data(eleprops, function(d) { return d.id; })
        .attr("transform", function(d) { return d.tf; });
    };

    PlotText.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotText.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    PlotText.prototype.createTip = function(ele) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend;
      }
      tip.x = plotUtils.getTipString(ele._x, xAxis, true);
      tip.y = plotUtils.getTipString(ele._y, yAxis, true);
      return plotUtils.createTipString(tip);
    };

    return PlotText;
  };
  beaker.bkoFactory('PlotText', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotLodLine = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };
    PlotLodLine.prototype.respR = 5;
    PlotLodLine.prototype.plotClass = "plot-line";
    PlotLodLine.prototype.respClass = "plot-resp plot-respdot";

    PlotLodLine.prototype.render = function(scope, samples, gid){
      if (gid == null) { gid = ""; }
      this.elementSamples = samples;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotLodLine.prototype.setZoomHash = function(hash) {
      this.zoomHash = hash;
    };

    PlotLodLine.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op" : this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray,
        "d" : ""
      };
      this.elementProps = [];
    };

    PlotLodLine.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var pstr = "", skipped = false;

      eleprops.length = 0;

      var samples = this.elementSamples;
      for (var i = 0; i < samples.length; i++) {
        var ele = samples[i];
        if (i === 0) {
          pstr += "M";
        } else if (i === 1) {
          pstr += "L";
        }
        var x = mapX(ele.x), y = mapY(ele.y);
        if (Math.abs(x) > 1E6 || Math.abs(y) > 1E6) {
          skipped = true;
          break;
        }

        var nxtp = x + "," + y + " ";

        if (focus.yl <= ele.y && ele.y <= focus.yr) {
          var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash + gid;

          var prop = {
            "id" : hashid,
            "idx" : this.index,
            "ele" : ele,
            "g" : gid,
            "isresp" : true,
            "cx" : x,
            "cy" : y,
            "op" : scope.tips[hashid] == null ? 0 : 1
          };
          eleprops.push(prop);
        }

        if (i < samples.length - 1) {
          if (this.interpolation === "none") {
            var ele2 = samples[i + 1];
            var x2 = mapX(ele2.x);
            nxtp += x + "," + y + " " + x2 + "," + y + " ";
          } else if (this.interpolation === "curve") {
            // TODO curve implementation
          }
        }

        pstr += nxtp;
      }

      if (skipped === true) {
        console.error("data not shown due to too large coordinate");
      }
      if (pstr.length > 0) {
        this.itemProps.d = pstr;
      }
    };

    PlotLodLine.prototype.draw = function(scope, gid) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var groupid = this.id + "_" + gid;
      var itemsvg = svg.select("#" + this.id);

      if (itemsvg.select("#" + groupid).empty()) {
        itemsvg.selectAll("#" + groupid)
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", groupid);
      }

      itemsvg.selectAll("path")
        .data([props]).enter().append("path")
        .attr("class", this.plotClass)
        .style("stroke", function(d) { return d.st; })
        .style("stroke-dasharray", function(d) { return d.st_da; })
        .style("stroke-width", function(d) { return d.st_w; })
        .style("stroke-opacity", function(d) { return d.st_op; });
      itemsvg.select("path")
        .attr("d", props.d);

      if (scope.stdmodel.useToolTip === true) {
        itemsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id; }).exit().remove();
        itemsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id; }).enter().append("circle")
          .attr("id", function(d) { return d.id; })
          .attr("class", this.respClass)
          .style("stroke", this.tip_color)
          .attr("r", this.respR);
        itemsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id; })
          .attr("cx", function(d) { return d.cx; })
          .attr("cy", function(d) { return d.cy; })
          .style("opacity", function(d) { return d.op; });
      }
    };

    PlotLodLine.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    return PlotLodLine;
  };
  beaker.bkoFactory('PlotLodLine', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotLodRiver = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };
    PlotLodRiver.prototype.respWidth = 5;
    PlotLodRiver.prototype.respMinHeight = 5;
    PlotLodRiver.prototype.plotClass = "";
    PlotLodRiver.prototype.respClass = "plot-resp plot-respstem";
    PlotLodRiver.prototype.plotClassAvgLine = "plot-lodavgline";

    PlotLodRiver.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op" : this.color_opacity,
        "st" : this.stroke,
        "st_w" : this.stroke_width,
        "st_op" : this.stroke_opacity,
        "pts" : null
      };
      this.elementProps = [];
    };

    PlotLodRiver.prototype.setZoomHash = function(hash) {
      this.zoomHash = hash;
    };

    PlotLodRiver.prototype.render = function(scope, elements, gid){
      if (gid == null) { gid = ""; }
      this.elements = elements;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotLodRiver.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var pstr = "", pd = "";

      eleprops.length = 0;

      this.avgOn = true;

      var eles = this.elements;
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        var x = mapX(ele.x), y = mapY(ele.min), y2 = mapY(ele.max);

        if (ele.avg == null) {
          this.avgOn = false;
        }

        if (this.avgOn === true) {
          var ym = mapY(ele.avg);
        }

        if (plotUtils.rangeAssert([x, y, y2])) {  // no need to put ym here
          eleprops.length = 0;
          return;
        }

        pstr += x + "," + y + " ";
        if (i === 0) {
          pd += "M";
        } else if (i === 1) {
          pd += "L";
        }

        pd += x + "," + ym + " ";

        if (ele.min <= focus.yr && ele.max >= focus.yl) {
          var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash + gid;
          var prop = {
            "id" : hashid,
            "idx" : this.index,
            "ele" : ele,
            "g" : gid,
            "isresp" : true,
            "x" : x - this.respWidth / 2,
            "y" : y2,
            "h" : Math.max(y - y2, this.respMinHeight),  // min height to be hoverable
            "op" : scope.tips[hashid] == null ? 0 : 1
          };
          eleprops.push(prop);
        }
      }

      for (var i = eles.length - 1; i >= 0; i--) {
        var ele = eles[i];
        var x = mapX(ele.x), y2 = mapY(ele.max);
        pstr += x + "," + y2 + " ";
      }
      if (pstr.length > 0) {
        this.itemProps.pts = pstr;
      }
      if (this.avgOn === true && pd.length > 0) {
        this.itemProps.d = pd;
      }
    };

    PlotLodRiver.prototype.draw = function(scope, gid) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var groupid = this.id + "_" + gid;
      var itemsvg = svg.select("#" + this.id);

      if (itemsvg.select("#" + groupid).empty()) {
        // aux box are ploted as bars with normal coloring
        // if special coloring is needed, it is set from the loader
        itemsvg.selectAll("#" + groupid)
          .data([props]).enter().append("g")
          .attr("id", groupid);
      }

      var groupsvg = itemsvg.select("#" + groupid);

      // draw the river
      groupsvg.selectAll("polygon")
        .data([props]).enter().append("polygon");
      groupsvg.select("polygon")
        .attr("points", props.pts)
        .attr("class", this.plotClass)
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-width", props.st_w);

      if (this.avgOn === true) {
        // draw the middle line
        var clr = props.st == null ? "black" : props.st;
        groupsvg.selectAll("path")
          .data([props]).enter().append("path");
        groupsvg.select("path")
          .attr("d", props.d)
          .attr("class", this.plotClassAvgLine)
          .style("stroke", clr)
          .style("stroke-opacity", props.st_op);
      }


      if (scope.stdmodel.useToolTip === true) {
        groupsvg.selectAll("rect")
          .data(eleprops, function(d) { return d.id; }).exit().remove();
        groupsvg.selectAll("rect")
          .data(eleprops, function(d) { return d.id; }).enter().append("rect")
          .attr("id", function(d) { return d.id; })
          .attr("class", this.respClass)
          .attr("width", this.respWidth)
          .style("stroke", this.tip_color);

        groupsvg.selectAll("rect")
          .data(eleprops, function(d) { return d.id; })
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("height", function(d) { return d.h; })
          .style("opacity", function(d) { return d.op; });
      }
    };

    PlotLodRiver.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    return PlotLodRiver;
  };
  beaker.bkoFactory('PlotLodRiver', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotLodBox = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotLodBox.prototype.plotClass = "plot-lodbox";
    PlotLodBox.prototype.respClass = "plot-resp";
    PlotLodBox.prototype.plotClassAvgLine = "plot-lodavgline";

    PlotLodBox.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.widthShrink = 0;
      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op" : this.color_opacity,
        "st" : this.stroke,
        "st_op" : this.stroke_opacity,
        "st_da" : this.stroke_dasharray
      };
      this.elementProps = [];
    };

    PlotLodBox.prototype.setWidthShrink = function(shrink) {
      this.widthShrink = shrink;
    };

    PlotLodBox.prototype.render = function(scope, samples, gid){
      if (gid == null) { gid = ""; }
      this.elementSamples = samples;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotLodBox.prototype.setZoomHash = function(hash) {
      this.zoomHash = hash;
    };

    PlotLodBox.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var fixed = scope.renderFixed;

      eleprops.length = 0;

      this.avgOn = true;

      var samples = this.elementSamples;
      for (var i = 0; i < samples.length; i++) {
        var ele = samples[i];
        if (ele.max < focus.yl || ele.min > focus.yr) { continue; }
        var x = mapX(ele.xl), x2 = mapX(ele.xr),
            y = mapY(ele.max), y2 = mapY(ele.min);

        if (ele.avg == null) {
          this.avgOn = false;
        }

        if (plotUtils.rangeAssert([x, x2, y, y2])) {
          eleprops.length = 0;
          return false;
        }

        var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash + gid;
        var prop = {
          "id" : hashid,
          "idx" : this.index,
          "ele" : ele,
          "g" : gid,
          "x" : x + this.widthShrink,
          "y" : y,
          "w" : Number((x2 - x - this.widthShrink * 2).toFixed(fixed)),
          "h" : Number((y2 - y).toFixed(fixed)),
          "x2" : Number((x2 - this.widthShrink).toFixed(fixed))
        };
        if (this.avgOn === true) {
          var y3 = mapY(ele.avg);
          prop.ym = y3;
        }
        eleprops.push(prop);
      }
    };

    PlotLodBox.prototype.draw = function(scope, gid) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var groupid = this.id + "_" + gid;
      var itemsvg = svg.select("#" + this.id);

      if (itemsvg.select("#" + groupid).empty()) {
        itemsvg.selectAll("#" + groupid)
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", groupid);
      }
      itemsvg.selectAll("#" + groupid)
        .attr("class", this.plotClass)
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op);

      var groupsvg = itemsvg.select("#" + groupid);

      // draw boxes
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.respClass);
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.w; })
        .attr("height", function(d) { return d.h; });

      if (this.avgOn === true) {
        var clr = props.st == null ? "black" : props.st;
        // draw avg lines
        groupsvg.selectAll("line")
          .data(eleprops, function(d) { return d.id + "l"; }).exit().remove();
        groupsvg.selectAll("line")
          .data(eleprops, function(d) { return d.id + "l"; }).enter().append("line")
          .attr("id", function(d) { return d.id + "l"; })
          .attr("class", this.plotClassAvgLine)
          .style("stroke", clr)
          .style("stroke-opacity", props.st_op);
        groupsvg.selectAll("line")
          .data(eleprops, function(d) { return d.id + "l"; })
          .attr("x1", function(d) { return d.x; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.ym; })
          .attr("y2", function(d) { return d.ym; });
      }
    };

    PlotLodBox.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    return PlotLodBox;
  };
  beaker.bkoFactory('PlotLodBox', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotLodPoint = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotLodPoint.prototype.plotClass = "plot-point";
    PlotLodPoint.prototype.respClass = "plot-resp";
    PlotLodPoint.prototype.shapes = ["rect", "diamond", "circle"];
    PlotLodPoint.prototype.svgtags = ["rect", "polygon", "circle"];

    PlotLodPoint.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op": this.color_opacity,
        "st": this.stroke,
        "st_op" : this.stroke_opacity,
        "st_w": this.stroke_width,
        "st_da": this.stroke_dasharray
      };

      this.elementProps = [];
    };

    PlotLodPoint.prototype.render = function(scope, samples, samplesSize, gid){
      if (gid == null) { gid = ""; }
      this.elementSamples = samples;
      this.sizeSamples = samplesSize;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotLodPoint.prototype.setZoomHash = function(hash) {
      this.zoomHash = hash;
    };

    PlotLodPoint.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elementSamples,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var fixed = scope.renderFixed;

      eleprops.length = 0;

      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        if (ele.y < focus.yl || ele.y > focus.yr) { continue; }
        var x = mapX(ele.x), y = mapY(ele.avg);
        var s = this.sizeSamples[i].avg;

        if (plotUtils.rangeAssert([x, y])) {
          eleprops.length = 0;
          return;
        }

        var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash + gid;
        var prop = {
          "id" :  hashid,
          "idx" : this.index,
          "ele" : ele,
          "g" : gid,
          "fi" : ele.color,
          "fi_op" : ele.color_opacity,
          "st" : ele.stroke,
          "st_op" : ele.stroke_opacity,
          "st_w" : ele.stroke_width,
          "st_da" : ele.stroke_dasharray
        };
        // lod point does not accept shape for individual element
        switch (this.shape) {
          case "diamond":
            var pstr = "";
            pstr += (x - s) + "," + (y    ) + " ";
            pstr += (x    ) + "," + (y - s) + " ";
            pstr += (x + s) + "," + (y    ) + " ";
            pstr += (x    ) + "," + (y + s) + " ";
            _(prop).extend({
              "pts" : pstr
            });
            break;
          case "circle":
            _(prop).extend({
              "cx" : x,
              "cy" : y,
              "r" : s
            });
            break;
          default:    // rect
            _(prop).extend({
              "x" : x - s / 2,
              "y" : y - s / 2,
              "w" : s,
              "h" : s
            });
        }
        eleprops.push(prop);
      }
    };

    PlotLodPoint.prototype.draw = function(scope, gid) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;
      var shape = this.shape;
      var tag = this.svgtags[this.shapes.indexOf(shape)];

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var groupid = this.id + "_" + gid;
      var itemsvg = svg.select("#" + this.id);

      if (itemsvg.select("#" + groupid).empty()) {
        itemsvg.selectAll("#" + groupid)
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", groupid);
      }
      itemsvg.select("#" + groupid)
        .attr("class", this.plotClass)
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-dasharray", props.st_da)
        .style("stroke-width", props.st_w);

      var groupsvg = itemsvg.select("#" + groupid);

      if (groupsvg.empty()) {
        groupsvg = itemsvg.selectAll("#" + shape)
          .data([{}]).enter().append("g")
          .attr("id", shape);
      }

      groupsvg.selectAll(tag)
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      groupsvg.selectAll(tag)
        .data(eleprops, function(d) { return d.id; }).enter().append(tag)
        .attr("id", function(d) { return d.id; })
        .attr("class", this.respClass);

      switch (shape) {
        case "circle":
          groupsvg.selectAll(tag)
            .data(eleprops, function(d) { return d.id; })
            .attr("cx", function(d) { return d.cx; })
            .attr("cy", function(d) { return d.cy; })
            .attr("r", function(d) { return d.r; });
          break;
        case "diamond":
          groupsvg.selectAll(tag)
            .data(eleprops, function(d) { return d.id; })
            .attr("points", function(d) { return d.pts; });
          break;
        default:  // rect
          groupsvg.selectAll(tag)
            .data(eleprops, function(d) { return d.id; })
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("width", function(d) { return d.w; })
            .attr("height", function(d) { return d.h; });
      }
    };

    PlotLodPoint.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    return PlotLodPoint;
  };
  beaker.bkoFactory('PlotLodPoint', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils) {
    var PlotLodStem = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotLodStem.prototype.plotClass = "";
    PlotLodStem.prototype.respClass = "plot-resp";
    PlotLodStem.prototype.plotClassAvgCircle = "plot-lodavg";
    PlotLodStem.prototype.plotAvgCircleR = 2;

    PlotLodStem.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.widthShrink = 0;
      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_w" : this.width,
        "st_op" : this.color_opacity,
        "st_da" : this.stroke_dasharray
      };
      this.elementProps = [];
    };

    PlotLodStem.prototype.setWidthShrink = function(shrink) {
      this.widthShrink = shrink;
    };

    PlotLodStem.prototype.render = function(scope, samples, gid){
      if (gid == null) { gid = ""; }
      this.elementSamples = samples;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotLodStem.prototype.setZoomHash = function(hash) {
      this.zoomHash = hash;
    };

    PlotLodStem.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var fixed = scope.renderFixed;

      eleprops.length = 0;

      this.avgOn = true;

      var samples = this.elementSamples;
      for (var i = 0; i < samples.length; i++) {
        var ele = samples[i];
        if (ele.max < focus.yl || ele.min > focus.yr) { continue; }
        var x = mapX(ele.x),
            y = mapY(ele.max), y2 = mapY(ele.min);

        if (ele.avg == null) {
          this.avgOn = false;
        }

        if (plotUtils.rangeAssert([x, y, y2])) {
          eleprops.length = 0;
          return false;
        }

        var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash + gid;
        var prop = {
          "id" : hashid,
          "idx" : this.index,
          "ele" : ele,
          "g" : gid,
          "x" : x,
          "y" : y,
          "y2" : y2
        };
        if (this.avgOn === true) {
          var y3 = mapY(ele.avg);
          prop.ym = y3;
        }
        eleprops.push(prop);
      }
    };

    PlotLodStem.prototype.draw = function(scope, gid) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var groupid = this.id + "_" + gid;
      var itemsvg = svg.select("#" + this.id);

      if (itemsvg.select("#" + groupid).empty()) {
        itemsvg.selectAll("#" + groupid)
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", groupid);
      }
      itemsvg.select("#" + groupid)
        .style("class", this.plotClass)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-dasharray", props.st_da)
        .style("stroke-width", props.st_w);

      var groupsvg = itemsvg.select("#" + groupid);

      // draw stems
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).enter().append("line")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.respClass);
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; })
        .attr("x1", function(d) { return d.x; })
        .attr("x2", function(d) { return d.x; })
        .attr("y1", function(d) { return d.y; })
        .attr("y2", function(d) { return d.y2; });

      if (this.avgOn === true) {
        var clr = props.st == null ? "gray" : props.st;
        // draw avg lines
        groupsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id + "l"; }).exit().remove();
        groupsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id + "l"; }).enter().append("circle")
          .attr("id", function(d) { return d.id + "l"; })
          .attr("class", this.plotClassAvgCircle)
          .attr("r", this.plotAvgCircleR)
          .style("stroke", clr)
          .style("stroke-opacity", props.st_op);
        groupsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id + "l"; })
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.ym; });
      }
    };

    PlotLodStem.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    return PlotLodStem;
  };
  beaker.bkoFactory('PlotLodStem', ['plotUtils', retfunc]);
})();

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
  var retfunc = function(plotUtils, PlotSampler, PlotLine, PlotLodLine, PlotLodBox, PlotLodRiver) {
    var PlotLineLodLoader = function(data, lodthresh){
      this.datacopy = {};
      _(this.datacopy).extend(data);  // save for later use
      _(this).extend(data); // copy properties to itself
      this.lodthresh = lodthresh;
      this.format(lodthresh);
    };
    // class constants
    PlotLineLodLoader.prototype.lodTypes = ["line", "box", "river"];
    PlotLineLodLoader.prototype.lodSteps = [5, 10, 5];

    PlotLineLodLoader.prototype.format = function() {
      // create plot type index
      this.lodTypeIndex = 0;
      this.lodType = this.lodTypes[this.lodTypeIndex];

      // create the plotters
      this.zoomHash = plotUtils.randomString(3);
      this.plotter = new PlotLine(this.datacopy);
      this.createLodPlotter();

      // a few switches and constants
      this.isLodItem = true;
      this.lodOn = false;
      this.lodAuto = true;
      this.sampleStep = -1;
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }

      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op" : this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray,
        "d" : ""
      };
      this.elementProps = [];
    };

    PlotLineLodLoader.prototype.zoomLevelChanged = function(scope) {
      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(3);
      if (this.lodOn === false) { return; }
      this.lodplotter.setZoomHash(this.zoomHash);
      this.lodplotter.clearTips(scope);
    };

    PlotLineLodLoader.prototype.applyZoomHash = function(hash) {
      this.zoomHash = hash;
      this.lodplotter.setZoomHash(hash);
    };

    PlotLineLodLoader.prototype.switchLodType = function(scope) {
      this.clear(scope);  // must clear first before changing lodType
      this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
      this.lodType = this.lodTypes[this.lodTypeIndex];
      this.createLodPlotter();
    };

    PlotLineLodLoader.prototype.applyLodType = function(type) {
      this.lodType = type;
      this.lodTypeIndex = this.lodTypes.indexOf(type);  // maybe -1
      if (this.lodTypeIndex === -1) { this.lodTypeIndex = 0; }
      this.createLodPlotter();
    };

    PlotLineLodLoader.prototype.createLodPlotter = function() {
      var data = {};
      _(data).extend(this.datacopy);
      if (this.lodType === "line") {
        this.lodplotter = new PlotLodLine(data);
        this.lodplotter.setZoomHash(this.zoomHash);
      } else if (this.lodType === "box") {
        data.stroke = data.color;
        data.color_opacity *= .25;
        data.stroke_opacity = 1.0;
        this.lodplotter = new PlotLodBox(data);
        this.lodplotter.setWidthShrink(1);
        this.lodplotter.setZoomHash(this.zoomHash);
      } else if (this.lodType === "river") {
        data.stroke = data.color;  // assume the user has no way to set outline for line
        data.color_opacity *= .25;
        data.stroke_opacity = 1.0;
        this.lodplotter = new PlotLodRiver(data);
        this.lodplotter.setZoomHash(this.zoomHash);
      }
    };

    PlotLineLodLoader.prototype.toggleLodAuto = function(scope) {
      this.lodAuto = !this.lodAuto;
      this.clear(scope);
    };

    PlotLineLodLoader.prototype.applyLodAuto = function(auto) {
      this.lodAuto = auto;
    };

    PlotLineLodLoader.prototype.toggleLod = function(scope) {
      if (this.lodType === "off") {
        this.lodType = this.lodTypes[this.lodTypeIndex];
      } else {
        this.lodType = "off";
      }
      this.clear(scope);
    };

    PlotLineLodLoader.prototype.render = function(scope){
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }

      this.filter(scope);

      var lod = false;
      if (this.lodType !== "off") {
        if ( (this.lodAuto === true && this.vlength > this.lodthresh) || this.lodAuto === false) {
          lod = true;
        }
      }

      if (this.lodOn != lod) {
        scope.legendDone = false;
        this.clear(scope);
      }
      this.lodOn = lod;

      if (this.lodOn === true) {
        this.sample(scope);
        this.lodplotter.render(scope, this.elementSamples);
      } else {
        this.plotter.render(scope);
      }
    };

    PlotLineLodLoader.prototype.getRange = function() {
      return this.plotter.getRange();
    };

    PlotLineLodLoader.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      this.plotter.applyAxis(xAxis, yAxis);
      // sampler is created AFTER coordinate axis remapping
      this.createSampler();
    };

    PlotLineLodLoader.prototype.createSampler = function() {
      var xs = [], ys = [], _ys = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        xs.push(ele.x);
        ys.push(ele.y);
        _ys.push(ele._y);
      }
      this.sampler = new PlotSampler(xs, ys, _ys);
    };


    PlotLineLodLoader.prototype.filter = function(scope) {
      this.plotter.filter(scope);
      this.vindexL = this.plotter.vindexL;
      this.vindexR = this.plotter.vindexR;
      this.vlength = this.plotter.vlength;
    };

    PlotLineLodLoader.prototype.sample = function(scope) {

      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var xl = scope.focus.xl, xr = scope.focus.xr;

      if (this.sampleStep === -1) {
        var pixelWidth = scope.plotSize.width;
        var count = Math.ceil(pixelWidth / this.lodSteps[this.lodTypeIndex]);
        var s = (xr - xl) / count;
        this.sampleStep = s;
      }

      var step = this.sampleStep;
      xl = Math.floor(xl / step) * step;
      xr = Math.ceil(xr / step) * step;

      this.elementSamples = this.sampler.sample(xl, xr, this.sampleStep);
    };

    PlotLineLodLoader.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotLineLodLoader.prototype.clearTips = function(scope) {
      if (this.lodOn === false) {
        this.plotter.clearTips(scope);
        return;
      }
      this.lodplotter.clearTips(scope);
    };

    PlotLineLodLoader.prototype.createTip = function(ele) {
      if (this.lodOn === false) {
        return this.plotter.createTip(ele);
      }
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend + " (sample)";
      }
      var eles = this.elements;
      tip.xl = plotUtils.getTipStringPercent(ele.xl, xAxis, 6);
      tip.xr = plotUtils.getTipStringPercent(ele.xr, xAxis, 6);
      tip.max = plotUtils.getTipString(ele._max, yAxis, true);
      tip.min = plotUtils.getTipString(ele._min, yAxis, true);
      tip.avg = plotUtils.getTipStringPercent(ele.avg, yAxis, 6);
      return plotUtils.createTipString(tip);
    };

    return PlotLineLodLoader;
  };
  beaker.bkoFactory('PlotLineLodLoader',
    ['plotUtils', 'PlotSampler', 'PlotLine', 'PlotLodLine', 'PlotLodBox', 'PlotLodRiver',
    retfunc]);
})();

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
  var retfunc = function(plotUtils, PlotSampler, PlotArea, PlotLodLine, PlotLodRiver,
    PlotAuxRiver) {
    var PlotAreaLodLoader = function(data, lodthresh){
      this.datacopy = {};
      _(this.datacopy).extend(data);  // save for later use
      _(this).extend(data); // copy properties to itself
      this.lodthresh = lodthresh;
      this.format(lodthresh);
    };
    // class constants
    PlotAreaLodLoader.prototype.lodTypes = ["area", "river"];
    PlotAreaLodLoader.prototype.lodSteps = [5, 5];

    PlotAreaLodLoader.prototype.format = function() {
      // create plot type index
      this.lodTypeIndex = 0;
      this.lodType = this.lodTypes[this.lodTypeIndex]; // line, box

      // create the plotters
      this.zoomHash = plotUtils.randomString(3);
      this.plotter = new PlotArea(this.datacopy);
      this.createLodPlotter();

      // a few switches and constants
      this.isLodItem = true;
      this.lodOn = false;
      this.lodAuto = true;
      this.sampleStep = -1;
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }

      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op" : this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray,
        "d" : ""
      };
      this.elementProps = [];
    };

    PlotAreaLodLoader.prototype.zoomLevelChanged = function(scope) {
      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(3);
      if (this.lodOn === false) { return; }
      if (this.lodType === "area") {
        this.lodplotter.setZoomHash(this.zoomHash);
        this.lodplotter.clearTips(scope);
      } else if (this.lodType === "river"){
        this.lodplotter.setZoomHash(this.zoomHash);
        this.lodplotter2.setZoomHash(this.zoomHash);
        this.lodplotter.clearTips(scope);
        this.lodplotter2.clearTips(scope);
      }
    };

    PlotAreaLodLoader.prototype.applyZoomHash = function(hash) {
      this.zoomHash = hash;
      if (this.lodType === "area") {
        this.lodplotter.setZoomHash(hash);
      } else if (this.lodType === "river") {
        this.lodplotter.setZoomHash(hash);
        this.lodplotter2.setZoomHash(hash);
      }
    };

    PlotAreaLodLoader.prototype.switchLodType = function(scope) {
      this.clear(scope);
      this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
      this.lodType = this.lodTypes[this.lodTypeIndex];
      this.createLodPlotter();
    };

    PlotAreaLodLoader.prototype.applyLodType = function(type) {
      this.lodType = type;
      this.lodTypeIndex = this.lodTypes.indexOf(type);  // maybe -1
      if (this.lodTypeIndex === -1) { this.lodTypeIndex = 0; }
      this.createLodPlotter();
    };

    PlotAreaLodLoader.prototype.createLodPlotter = function() {
      var data = {};
      _(data).extend(this.datacopy);
      if (this.lodType === "area") {
        this.lodplotter = new PlotLodRiver(data);
        this.lodplotter.setZoomHash(this.zoomHash);
      } else if (this.lodType === "river") {
        data.stroke = data.color;  // assume the user has no way to set outline for area
        data.color_opacity *= .25;
        data.stroke_opacity = 1.0;
        this.lodplotter = new PlotLodRiver(data);
        this.lodplotter2 = new PlotLodRiver(data);
        this.lodplotter.setZoomHash(this.zoomHash);
        this.lodplotter2.setZoomHash(this.zoomHash);

        _(data).extend(this.datacopy);
        this.auxplotter = new PlotAuxRiver(data);
      }
    };

    PlotAreaLodLoader.prototype.toggleLodAuto = function(scope) {
      this.lodAuto = !this.lodAuto;
      this.clear(scope);
    };

    PlotAreaLodLoader.prototype.applyLodAuto = function(auto) {
      this.lodAuto = auto;
    };

    PlotAreaLodLoader.prototype.toggleLod = function(scope) {
      if (this.lodType === "off") {
        this.lodType = this.lodTypes[this.lodTypeIndex];
      } else {
        this.lodType = "off";
      }
      this.clear(scope);
    };

    PlotAreaLodLoader.prototype.render = function(scope){
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }

      this.filter(scope);

      var lod = false;
      if (this.lodType !== "off") {
        if ( (this.lodAuto === true && this.vlength > this.lodthresh) || this.lodAuto === false) {
          lod = true;
        }
      }

      if (this.lodOn != lod) {
        scope.legendDone = false;
        this.clear(scope);
      }
      this.lodOn = lod;

      if (this.lodOn === false) {
        this.plotter.render(scope);
        return;
      }

      this.sample(scope);
      if (this.lodType === "area") {
        this.lodplotter.render(scope, this.elementSamples);
      } else if (this.lodType === "river") {
        this.auxplotter.render(scope, this.elementAuxes, "a");
        this.lodplotter.render(scope, this.elementSamples, "yBtm");
        this.lodplotter2.render(scope, this.elementSamples2, "yTop");
      }
    };

    PlotAreaLodLoader.prototype.getRange = function(){
      return this.plotter.getRange();
    };

    PlotAreaLodLoader.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      this.plotter.applyAxis(xAxis, yAxis);
      // sampler is created AFTER coordinate axis remapping
      this.createSampler();
    };

    PlotAreaLodLoader.prototype.createSampler = function() {
      var xs = [], ys = [], y2s = [], _ys = [], _y2s = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        xs.push(ele.x);
        ys.push(ele.y);
        y2s.push(ele.y2);
        _ys.push(ele._y);
        _y2s.push(ele._y2);
      }
      this.sampler = new PlotSampler(xs, ys, _ys);
      this.sampler2 = new PlotSampler(xs, y2s, _y2s);
    };

    PlotAreaLodLoader.prototype.filter = function(scope) {
      this.plotter.filter(scope);
      this.vindexL = this.plotter.vindexL;
      this.vindexR = this.plotter.vindexR;
      this.vlength = this.plotter.vlength;
    };

    PlotAreaLodLoader.prototype.sample = function(scope) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var xl = scope.focus.xl, xr = scope.focus.xr;

      if (this.sampleStep === -1) {
        var pixelWidth = scope.plotSize.width;
        var count = Math.ceil(pixelWidth / this.lodSteps[this.lodTypeIndex]);
        var s = (xr - xl) / count;
        this.sampleStep = s;
      }

      var step = this.sampleStep;
      xl = Math.floor(xl / step) * step;
      xr = Math.ceil(xr / step) * step;

      this.elementSamples = this.sampler.sample(xl, xr, this.sampleStep);
      this.elementSamples2 = this.sampler2.sample(xl, xr, this.sampleStep);
      var count = this.elementSamples.length;

      if (this.lodType === "area") {
        var elements = [];
        for (var i = 0; i < count; i++) {
          elements.push({
            x : this.elementSamples[i].x,
            min : this.elementSamples[i].avg,
            max : this.elementSamples2[i].avg,
            hash : this.elementSamples[i].hash,
            xl : this.elementSamples[i].xl,
            xr : this.elementSamples[i].xr
          });
        }
        this.elementSamples = elements;
      } else if (this.lodType === "river") {
        this.elementAuxes = [];
        // prepare the aux river in between
        for (var i = 0; i < count; i++) {
          this.elementAuxes.push({
            x : this.elementSamples[i].x,
            y : this.elementSamples[i].max,
            y2 : this.elementSamples2[i].min
          });
        }
      }

    };

    PlotAreaLodLoader.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotAreaLodLoader.prototype.clearTips = function(scope) {
      if (this.lodOn === false) {
        this.plotter.clearTips(scope);
        return;
      }
      if (this.lodType === "area") {
        this.lodplotter.clearTips(scope);
      } else if (this.lodType === "river") {
        this.lodplotter.clearTips(scope);
        this.lodplotter2.clearTips(scope);
      }
    };

    PlotAreaLodLoader.prototype.createTip = function(ele, g) {
      if (this.lodOn === false) {
        return this.plotter.createTip(ele);
      }
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      var sub = "sample" + (g !== "" ? (" " + g) : "");
      if (this.legend != null) {
        tip.title = this.legend + " (" + sub + ")";
      }
      var eles = this.elements;
      tip.xl = plotUtils.getTipStringPercent(ele.xl, xAxis, 6);
      tip.xr = plotUtils.getTipStringPercent(ele.xr, xAxis, 6);
      if (this.lodType === "area") {
        tip.avg_yTop = plotUtils.getTipStringPercent(ele.max, yAxis, 6);
        tip.avg_yBtm = plotUtils.getTipStringPercent(ele.min, yAxis, 6);
      } else if (this.lodType === "river") {
        tip.max = plotUtils.getTipString(ele._max, yAxis, true);
        tip.min = plotUtils.getTipString(ele._min, yAxis, true);
        tip.avg = plotUtils.getTipStringPercent(ele.avg, yAxis, 6);
      }
      return plotUtils.createTipString(tip);
    };

    return PlotAreaLodLoader;
  };
  beaker.bkoFactory('PlotAreaLodLoader',
    ['plotUtils', 'PlotSampler', 'PlotArea', 'PlotLodLine', 'PlotLodRiver', 'PlotAuxRiver',
    retfunc]);
})();

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
  var retfunc = function(plotUtils, PlotSampler, PlotBar, PlotLodBox, PlotAuxBox) {
    var PlotBarLodLoader = function(data, lodthresh){
      this.datacopy = {};
      _(this.datacopy).extend(data);  // save for later use
      _(this).extend(data); // copy properties to itself
      this.lodthresh = lodthresh;
      this.format(lodthresh);
    };
    // class constants
    PlotBarLodLoader.prototype.lodTypes = ["bar", "box"];
    PlotBarLodLoader.prototype.lodSteps = [5, 10];

    PlotBarLodLoader.prototype.format = function() {
      // create plot type index
      this.lodTypeIndex = 0;
      this.lodType = this.lodTypes[this.lodTypeIndex]; // line, box

      // create the plotters
      this.zoomHash = plotUtils.randomString(3);
      this.plotter = new PlotBar(this.datacopy);
      this.createLodPlotter();

      // a few switches and constants
      this.isLodItem = true;
      this.lodOn = false;
      this.lodAuto = true;
      this.sampleStep = -1;
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }

      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op" : this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray,
        "d" : ""
      };
      this.elementProps = [];
    };

    PlotBarLodLoader.prototype.zoomLevelChanged = function(scope) {
      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(3);
      if (this.lodOn === false) { return; }
      if (this.lodType === "bar") {
        this.lodplotter.setZoomHash(this.zoomHash);
        this.lodplotter.clearTips(scope);
      } else if (this.lodType === "box") {
        this.lodplotter.setZoomHash(this.zoomHash);
        this.lodplotter2.setZoomHash(this.zoomHash);
        this.lodplotter.clearTips(scope);
        this.lodplotter2.clearTips(scope);
      }
    };

    PlotBarLodLoader.prototype.applyZoomHash = function(hash) {
      this.zoomHash = hash;
      if (this.lodType === "bar") {
        this.lodplotter.setZoomHash(hash);
      } else if (this.lodType === "box") {
        this.lodplotter.setZoomHash(hash);
        this.lodplotter2.setZoomHash(hash);
      }
    };

    PlotBarLodLoader.prototype.switchLodType = function(scope) {
      this.clear(scope);  // must clear first before changing lodType
      this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
      this.lodType = this.lodTypes[this.lodTypeIndex];
      this.createLodPlotter();
    };

    PlotBarLodLoader.prototype.applyLodType = function(type) {
      this.lodType = type;
      this.lodTypeIndex = this.lodTypes.indexOf(type);  // maybe -1
      if (this.lodTypeIndex === -1) { this.lodTypeIndex = 0; }
      this.createLodPlotter();
    };

    PlotBarLodLoader.prototype.createLodPlotter = function() {
      var data = {};
      _(data).extend(this.datacopy);
      if (this.lodType === "bar") {
        this.lodplotter = new PlotLodBox(data);
        this.lodplotter.setWidthShrink(1);
        this.lodplotter.setZoomHash(this.zoomHash);
      } else if (this.lodType === "box") {
        // lod boxes are plotted with special coloring (inversed color)
        // user can set outline for bar
        data.stroke_opacity = 1.0;
        data.color_opacity *= .25;  // set box to be transparent
        this.lodplotter = new PlotLodBox(data);
        this.lodplotter2 = new PlotLodBox(data);
        this.lodplotter.setWidthShrink(1);
        this.lodplotter2.setWidthShrink(1);
        this.lodplotter.setZoomHash(this.zoomHash);
        this.lodplotter2.setZoomHash(this.zoomHash);

        _(data).extend(this.datacopy); // normal color for aux box
        this.auxplotter = new PlotAuxBox(data);
        this.auxplotter.setWidthShrink(1);  // reduce box width by 1px (left and right)
      }
    };

    PlotBarLodLoader.prototype.toggleLodAuto = function(scope) {
      this.lodAuto = !this.lodAuto;
      this.clear(scope);
    };

    PlotBarLodLoader.prototype.applyLodAuto = function(auto) {
      this.lodAuto = auto;
    };

    PlotBarLodLoader.prototype.toggleLod = function(scope) {
      if (this.lodType === "off") {
        this.lodType = this.lodTypes[this.lodTypeIndex];
      } else {
        this.lodType = "off";
      }
      this.clear(scope);
    };

    PlotBarLodLoader.prototype.render = function(scope){
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }

      this.filter(scope);

      var lod = false;
      if (this.lodType !== "off") {
        if ( (this.lodAuto === true && this.vlength > this.lodthresh) || this.lodAuto === false) {
          lod = true;
        }
      }

      if (this.lodOn != lod) {
        scope.legendDone = false;
        this.clear(scope);
      }
      this.lodOn = lod;

      if (this.lodOn === true) {
        this.sample(scope);
        if (this.lodType === "bar") {
          this.lodplotter.render(scope, this.elementSamples);
        } else if (this.lodType === "box") {
          this.auxplotter.render(scope, this.elementAuxes, "a");
          this.lodplotter.render(scope, this.elementSamples, "yBtm");
          this.lodplotter2.render(scope, this.elementSamples2, "yTop");
        }
      } else {
        this.plotter.render(scope);
      }
    };

    PlotBarLodLoader.prototype.getRange = function(){
      return this.plotter.getRange();
    };

    PlotBarLodLoader.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      this.plotter.applyAxis(xAxis, yAxis);
      // sampler is created AFTER coordinate axis remapping
      this.createSampler();
    };

    PlotBarLodLoader.prototype.createSampler = function() {
      var xs = [], ys = [], y2s = [], _ys = [], _y2s = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        xs.push( (ele.x + ele.x2) / 2 );
        ys.push(ele.y);
        y2s.push(ele.y2);
        _ys.push(ele._y);
        _y2s.push(ele._y2);
      }
      this.sampler = new PlotSampler(xs, ys, _ys);
      this.sampler2 = new PlotSampler(xs, y2s, _y2s);
    };

    PlotBarLodLoader.prototype.filter = function(scope) {
      this.plotter.filter(scope);
      this.vindexL = this.plotter.vindexL;
      this.vindexR = this.plotter.vindexR;
      this.vlength = this.plotter.vlength;
    };

    PlotBarLodLoader.prototype.sample = function(scope) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var xl = scope.focus.xl, xr = scope.focus.xr;

      if (this.sampleStep === -1) {
        var pixelWidth = scope.plotSize.width;
        var count = Math.ceil(pixelWidth / this.lodSteps[this.lodTypeIndex]);
        var s = (xr - xl) / count;
        this.sampleStep = s;
      }

      var step = this.sampleStep;
      xl = Math.floor(xl / step) * step;
      xr = Math.ceil(xr / step) * step;

      this.elementSamples = this.sampler.sample(xl, xr, this.sampleStep);
      this.elementSamples2 = this.sampler2.sample(xl, xr, this.sampleStep);
      var count = this.elementSamples.length;

      if (this.lodType === "bar") {
        var elements = [];
        for (var i = 0; i < count; i++) {
          elements.push({
            x : this.elementSamples[i].xl,
            x2 : this.elementSamples[i].xr,
            min : this.elementSamples[i].avg,
            max : this.elementSamples2[i].avg,
            hash: this.elementSamples[i].hash,
            xl : this.elementSamples[i].xl,
            xr : this.elementSamples[i].xr
          });
        }
        this.elementSamples = elements;
      } else if (this.lodType === "box") {
        this.elementAuxes = [];
        // prepare the aux box in between
        for (var i = 0; i < count; i++) {
          this.elementAuxes.push({
            x : this.elementSamples[i].xl,
            x2 : this.elementSamples[i].xr,
            y : this.elementSamples[i].max,
            y2 : this.elementSamples2[i].min
          });
        }
      }
    };

    PlotBarLodLoader.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotBarLodLoader.prototype.clearTips = function(scope) {
      if (this.lodOn === false) {
        this.plotter.clearTips(scope);
        return;
      }
      if (this.lodType === "bar") {
        this.lodplotter.clearTips(scope);
      } else if (this.lodType === "box") {
        this.lodplotter.clearTips(scope);
        this.lodplotter2.clearTips(scope);
      }
    };

    PlotBarLodLoader.prototype.createTip = function(ele, g) {
      if (this.lodOn === false) {
        return this.plotter.createTip(ele);
      }
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      var sub = "sample" + (g !== "" ? (" " + g) : "");
      if (this.legend != null) {
        tip.title = this.legend + " (" + sub + ")";
      }
      tip.xl = plotUtils.getTipStringPercent(ele.xl, xAxis, 6);
      tip.xr = plotUtils.getTipStringPercent(ele.xr, xAxis, 6);
      if (this.lodType === "bar") {
        tip.avg_yTop = plotUtils.getTipStringPercent(ele.max, yAxis, 6);
        tip.avg_yBtm = plotUtils.getTipStringPercent(ele.min, yAxis, 6);
      } else if (this.lodType === "box") {
        tip.max = plotUtils.getTipString(ele._max, yAxis, true);
        tip.min = plotUtils.getTipString(ele._min, yAxis, true);
        tip.avg = plotUtils.getTipStringPercent(ele.avg, yAxis, 6);
      }
      return plotUtils.createTipString(tip);
    };

    return PlotBarLodLoader;
  };
  beaker.bkoFactory('PlotBarLodLoader',
    ['plotUtils', 'PlotSampler', 'PlotBar', 'PlotLodBox', 'PlotAuxBox', retfunc]);
})();

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
  var retfunc = function(plotUtils, PlotSampler, PlotStem,
    PlotLodStem, PlotAuxStem, PlotLodBox, PlotAuxBox) {
    var PlotStemLodLoader = function(data, lodthresh){
      this.datacopy = {};
      _(this.datacopy).extend(data);  // save for later use
      _(this).extend(data); // copy properties to itself
      this.lodthresh = lodthresh;
      this.format(lodthresh);
    };
    // class constants
    PlotStemLodLoader.prototype.lodTypes = ["stem", "stem+", "box"];
    PlotStemLodLoader.prototype.lodSteps = [5, 10, 10];

    PlotStemLodLoader.prototype.format = function() {
      // create plot type index
      this.lodTypeIndex = 0;
      this.lodType = this.lodTypes[this.lodTypeIndex]; // line, box

      // create the plotters
      this.zoomHash = plotUtils.randomString(3);
      this.plotter = new PlotStem(this.datacopy);
      this.createLodPlotter();

      // a few switches and constants
      this.isLodItem = true;
      this.lodOn = false;
      this.lodAuto = true;
      this.sampleStep = -1;
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }

      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op" : this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray,
        "d" : ""
      };
      this.elementProps = [];
    };

    PlotStemLodLoader.prototype.zoomLevelChanged = function(scope) {
      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(3);
      if (this.lodOn === false) { return; }
      if (this.lodType === "stem") {
        this.lodplotter.setZoomHash(this.zoomHash);
        this.lodplotter.clearTips(scope);
      } else if (this.lodType === "stem+" || this.lodType === "box") {
        this.lodplotter.setZoomHash(this.zoomHash);
        this.lodplotter2.setZoomHash(this.zoomHash2);
        this.lodplotter.clearTips(scope);
        this.lodplotter2.clearTips(scope);
      }
    };

    PlotStemLodLoader.prototype.applyZoomHash = function(hash) {
      this.zoomHash = hash;
      if (this.lodType === "stem") {
        this.lodplotter.setZoomHash(hash);
      } else if (this.lodType === "stem+" ||  this.lodType === "box") {
        this.lodplotter.setZoomHash(hash);
        this.lodplotter2.setZoomHash(hash);
      }
    };

    PlotStemLodLoader.prototype.switchLodType = function(scope) {
      this.clear(scope);  // must clear first before changing lodType
      this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
      this.lodType = this.lodTypes[this.lodTypeIndex];
      this.createLodPlotter();
    };

    PlotStemLodLoader.prototype.applyLodType = function(type) {
      this.lodType = type;
      this.lodTypeIndex = this.lodTypes.indexOf(type);  // maybe -1
      if (this.lodTypeIndex === -1) { this.lodTypeIndex = 0; }
      this.createLodPlotter();
    };

    PlotStemLodLoader.prototype.createLodPlotter = function() {
      var data = {};
      _(data).extend(this.datacopy);
      if (this.lodType === "stem") {
        this.lodplotter = new PlotLodStem(data);
        this.lodplotter.setZoomHash(this.zoomHash);
      } else if (this.lodType === "stem+") {
        data.width += 1.5;
        data.color_opacity *= .5;
        this.lodplotter = new PlotLodStem(data);
        this.lodplotter2 = new PlotLodStem(data);
        this.lodplotter.setZoomHash(this.zoomHash);
        this.lodplotter2.setZoomHash(this.zoomHash);

        _(data).extend(this.datacopy);
        this.auxplotter = new PlotAuxStem(data);
      } else if (this.lodType === "box") {
        // lod boxes are plotted with special coloring (inversed color)
        data.stroke = data.color; // assume the user has no way to set outline for stem
        data.color_opacity *= .25;
        data.stroke_opacity = 1.0;
        this.lodplotter = new PlotLodBox(data);
        this.lodplotter2 = new PlotLodBox(data);
        this.lodplotter.setWidthShrink(1);
        this.lodplotter2.setWidthShrink(1);
        this.lodplotter.setZoomHash(this.zoomHash);
        this.lodplotter2.setZoomHash(this.zoomHash);

        _(data).extend(this.datacopy); // normal color for aux box
        this.auxplotter = new PlotAuxBox(data);
        this.auxplotter.setWidthShrink(1);  // reduce box width by 1px (left and right)
      }
    };

    PlotStemLodLoader.prototype.toggleLodAuto = function(scope) {
      this.lodAuto = !this.lodAuto;
      this.clear(scope);
    };

    PlotStemLodLoader.prototype.applyLodAuto = function(auto) {
      this.lodAuto = auto;
    };

    PlotStemLodLoader.prototype.toggleLod = function(scope) {
      if (this.lodType === "off") {
        this.lodType = this.lodTypes[this.lodTypeIndex];
      } else {
        this.lodType = "off";
      }
      this.clear(scope);
    };

    PlotStemLodLoader.prototype.render = function(scope){
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }

      this.filter(scope);

      var lod = false;
      if (this.lodType !== "off") {
        if ( (this.lodAuto === true && this.vlength > this.lodthresh) || this.lodAuto === false) {
          lod = true;
        }
      }

      if (this.lodOn != lod) {
        scope.legendDone = false;
        this.clear(scope);
      }
      this.lodOn = lod;

      if (this.lodOn === true) {
        this.sample(scope);
        if (this.lodType === "stem") {
          this.lodplotter.render(scope, this.elementSamples);
        } else if (this.lodType === "stem+" || this.lodType === "box") {
          this.auxplotter.render(scope, this.elementAuxes, "a");
          this.lodplotter.render(scope, this.elementSamples, "yBtm");
          this.lodplotter2.render(scope, this.elementSamples2, "yTop");
        }
      } else {
        this.plotter.render(scope);
      }
    };

    PlotStemLodLoader.prototype.getRange = function(){
      return this.plotter.getRange();
    };

    PlotStemLodLoader.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      this.plotter.applyAxis(xAxis, yAxis);
      // sampler is created AFTER coordinate axis remapping
      this.createSampler();
    };

    PlotStemLodLoader.prototype.createSampler = function() {
      var xs = [], ys = [], y2s = [], _ys = [], _y2s = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        xs.push(ele.x);
        ys.push(ele.y);
        y2s.push(ele.y2);
        _ys.push(ele._y);
        _y2s.push(ele._y2);
      }
      this.sampler = new PlotSampler(xs, ys, _ys);
      this.sampler2 = new PlotSampler(xs, y2s, _y2s);
    };

    PlotStemLodLoader.prototype.filter = function(scope) {
      this.plotter.filter(scope);
      this.vindexL = this.plotter.vindexL;
      this.vindexR = this.plotter.vindexR;
      this.vlength = this.plotter.vlength;
    };

    PlotStemLodLoader.prototype.sample = function(scope) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var xl = scope.focus.xl, xr = scope.focus.xr;

      if (this.sampleStep === -1) {
        var pixelWidth = scope.plotSize.width;
        var count = Math.ceil(pixelWidth / this.lodSteps[this.lodTypeIndex]);
        var s = (xr - xl) / count;
        this.sampleStep = s;
      }

      var step = this.sampleStep;
      xl = Math.floor(xl / step) * step;
      xr = Math.ceil(xr / step) * step;

      this.elementSamples = this.sampler.sample(xl, xr, this.sampleStep);
      this.elementSamples2 = this.sampler2.sample(xl, xr, this.sampleStep);
      var count = this.elementSamples.length;

      if (this.lodType === "stem") {
        var elements = [];
        for (var i = 0; i < count; i++) {
          elements.push({
            x : this.elementSamples[i].x,
            min : this.elementSamples[i].avg,
            max : this.elementSamples2[i].avg,
            hash: this.elementSamples[i].hash,
            xl : this.elementSamples[i].xl,
            xr : this.elementSamples[i].xr
          });
        }
        this.elementSamples = elements;
      } else if (this.lodType === "stem+") {
        this.elementAuxes = [];
        // prepare the aux box in between
        for (var i = 0; i < count; i++) {
          this.elementAuxes.push({
            x : this.elementSamples[i].x,
            y : this.elementSamples[i].max,
            y2 : this.elementSamples2[i].min
          });
        }
      } else if (this.lodType === "box") {
        this.elementAuxes = [];
        // prepare the aux box in between
        for (var i = 0; i < count; i++) {
          this.elementAuxes.push({
            x : this.elementSamples[i].xl,
            x2 : this.elementSamples[i].xr,
            y : this.elementSamples[i].max,
            y2 : this.elementSamples2[i].min
          });
        }
      }
    };

    PlotStemLodLoader.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotStemLodLoader.prototype.clearTips = function(scope) {
      if (this.lodOn === false) {
        this.plotter.clearTips(scope);
        return;
      }
      if (this.lodType === "bar") {
        this.lodplotter.clearTips(scope);
      } else if (this.lodType === "box") {
        this.lodplotter.clearTips(scope);
        this.lodplotter2.clearTips(scope);
      }
    };

    PlotStemLodLoader.prototype.createTip = function(ele, g) {
      if (this.lodOn === false) {
        return this.plotter.createTip(ele);
      }
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      var sub = "sample" + (g !== "" ? (" " + g) : "");
      if (this.legend != null) {
        tip.title = this.legend + " (" + sub + ")";
      }
      tip.xl = plotUtils.getTipStringPercent(ele.xl, xAxis, 6);
      tip.xr = plotUtils.getTipStringPercent(ele.xr, xAxis, 6);
      if (this.lodType === "stem") {
        tip.avg_yTop = plotUtils.getTipStringPercent(ele.max, yAxis, 6);
        tip.avg_yBtm = plotUtils.getTipStringPercent(ele.min, yAxis, 6);
      } else if (this.lodType === "stem+" || this.lodType === "box") {
        tip.max = plotUtils.getTipString(ele._max, yAxis, true);
        tip.min = plotUtils.getTipString(ele._min, yAxis, true);
        tip.avg = plotUtils.getTipStringPercent(ele.avg, yAxis, 6);
      }
      return plotUtils.createTipString(tip);
    };

    return PlotStemLodLoader;
  };
  beaker.bkoFactory('PlotStemLodLoader',
    ['plotUtils', 'PlotSampler', 'PlotStem',
    'PlotLodStem', 'PlotAuxStem', 'PlotLodBox', 'PlotAuxBox', retfunc]);
})();

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
  var retfunc = function(plotUtils, PlotSampler, PlotPoint, PlotLodPoint, PlotLodBox) {
    var PlotPointLodLoader = function(data, lodthresh){
      this.datacopy = {};
      _(this.datacopy).extend(data);  // save for later use
      _(this).extend(data); // copy properties to itself
      this.lodthresh = lodthresh;
      this.format(lodthresh);
    };
    // class constants
    PlotPointLodLoader.prototype.lodTypes = ["point", "box"];
    PlotPointLodLoader.prototype.lodSteps = [5, 10];

    PlotPointLodLoader.prototype.format = function() {
      // create plot type index
      this.lodTypeIndex = 0;
      this.lodType = this.lodTypes[this.lodTypeIndex]; // line, box

      // create the plotters
      this.zoomHash = plotUtils.randomString(3);
      this.plotter = new PlotPoint(this.datacopy);
      this.createLodPlotter();

      // a few switches and constants
      this.isLodItem = true;
      this.lodOn = false;
      this.lodAuto = true;
      this.sampleStep = -1;
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }

      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op" : this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray,
        "d" : ""
      };
      this.elementProps = [];
    };

    PlotPointLodLoader.prototype.zoomLevelChanged = function(scope) {
      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(3);
      if (this.lodOn === false) { return; }
      this.lodplotter.setZoomHash(this.zoomHash);
      this.lodplotter.clearTips(scope);
    };

    PlotPointLodLoader.prototype.applyZoomHash = function(hash) {
      this.zoomHash = hash;
      this.lodplotter.setZoomHash(hash);
    };

    PlotPointLodLoader.prototype.switchLodType = function(scope) {
      this.clear(scope);  // must clear first before changing lodType
      this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
      this.lodType = this.lodTypes[this.lodTypeIndex];
      this.createLodPlotter();
    };

    PlotPointLodLoader.prototype.createLodPlotter = function() {
      var data = {};
      _(data).extend(this.datacopy);
      if (this.lodType === "point") {
        this.lodplotter = new PlotLodPoint(data);
        this.lodplotter.setZoomHash(this.zoomHash);
      } else if (this.lodType === "box") {
        // user can set outline for point
        data.color_opacity *= .25;
        data.stroke_opacity = 1.0;
        this.lodplotter = new PlotLodBox(data);
        this.lodplotter.setWidthShrink(1);
        this.lodplotter.setZoomHash(this.zoomHash);
      }
    };

    PlotPointLodLoader.prototype.toggleLodAuto = function(scope) {
      this.lodAuto = !this.lodAuto;
      this.clear(scope);
    };

    PlotPointLodLoader.prototype.applyLodAuto = function(auto) {
      this.lodAuto = auto;
    };

    PlotPointLodLoader.prototype.toggleLod = function(scope) {
      if (this.lodType === "off") {
        this.lodType = this.lodTypes[this.lodTypeIndex];
      } else {
        this.lodType = "off";
      }
      this.clear(scope);
    };

    PlotPointLodLoader.prototype.render = function(scope){
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }

      this.filter(scope);

      var lod = false;
      if (this.lodType !== "off") {
        if ( (this.lodAuto === true && this.vlength > this.lodthresh) || this.lodAuto === false) {
          lod = true;
        }
      }

      if (this.lodOn != lod) {
        scope.legendDone = false;
        this.clear(scope);
      }
      this.lodOn = lod;

      if (this.lodOn === true) {
        this.sample(scope);
        if (this.lodType === "point") {
          // lod point plotter needs size information
          this.lodplotter.render(scope, this.elementSamples, this.sizeSamples);
        } else if (this.lodType === "box") {
          this.lodplotter.render(scope, this.elementSamples);
        }
      } else {
        this.plotter.render(scope);
      }
    };

    PlotPointLodLoader.prototype.getRange = function(){
      return this.plotter.getRange();
    };

    PlotPointLodLoader.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      this.plotter.applyAxis(xAxis, yAxis);
      // sampler is created AFTER coordinate axis remapping
      this.createSampler();
    };

    PlotPointLodLoader.prototype.switchLodType = function(scope) {
      this.clear(scope);  // must clear first before changing lodType
      this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
      this.lodType = this.lodTypes[this.lodTypeIndex];
      this.createLodPlotter();
    };

    PlotPointLodLoader.prototype.applyLodType = function(type) {
      this.lodType = type;
      this.lodTypeIndex = this.lodTypes.indexOf(type);  // maybe -1
      if (this.lodTypeIndex === -1) { this.lodTypeIndex = 0; }
      this.createLodPlotter();
    };

    PlotPointLodLoader.prototype.createSampler = function() {
      var xs = [], ys = [], ss = [], _ys = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        xs.push(ele.x);
        ys.push(ele.y);
        _ys.push(ele._y);
        ss.push(ele.size != null ? ele.size : this.size);
      }
      this.sampler = new PlotSampler(xs, ys, _ys);
      this.samplerSize = new PlotSampler(xs, ss, ss);
    };

    PlotPointLodLoader.prototype.filter = function(scope) {
      this.plotter.filter(scope);
      this.vindexL = this.plotter.vindexL;
      this.vindexR = this.plotter.vindexR;
      this.vlength = this.plotter.vlength;
    };

    PlotPointLodLoader.prototype.sample = function(scope) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var xl = scope.focus.xl, xr = scope.focus.xr;

      if (this.sampleStep === -1) {
        var pixelWidth = scope.plotSize.width;
        var count = Math.ceil(pixelWidth / this.lodSteps[this.lodTypeIndex]);
        var s = (xr - xl) / count;
        this.sampleStep = s;
      }

      var step = this.sampleStep;
      xl = Math.floor(xl / step) * step;
      xr = Math.ceil(xr / step) * step;

      this.elementSamples = this.sampler.sample(xl, xr, this.sampleStep);
      this.sizeSamples = this.samplerSize.sample(xl, xr, this.sampleStep);
    };

    PlotPointLodLoader.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotPointLodLoader.prototype.clearTips = function(scope) {
      if (this.lodOn === false) {
        this.plotter.clearTips(scope);
        return;
      }
      this.lodplotter.clearTips(scope);
    };

    PlotPointLodLoader.prototype.createTip = function(ele, g) {
      if (this.lodOn === false) {
        return this.plotter.createTip(ele);
      }
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      var sub = "sample" + (g !== "" ? (" " + g) : "");
      if (this.legend != null) {
        tip.title = this.legend + " (" + sub + ")";
      }
      tip.xl = plotUtils.getTipStringPercent(ele.xl, xAxis, 6);
      tip.xr = plotUtils.getTipStringPercent(ele.xr, xAxis, 6);
      tip.max = plotUtils.getTipString(ele._max, yAxis, true);
      tip.min = plotUtils.getTipString(ele._min, yAxis, true);
      tip.avg = plotUtils.getTipStringPercent(ele.avg, yAxis, 6);
      return plotUtils.createTipString(tip);
    };

    return PlotPointLodLoader;
  };
  beaker.bkoFactory('PlotPointLodLoader',
    ['plotUtils', 'PlotSampler', 'PlotPoint', 'PlotLodPoint', 'PlotLodBox', retfunc]);
})();

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
  var retfunc = function() {
    var PlotAxis = function(type) {
      this.type = "axis";
      this.axisType = type == null ? "linear" : type; // linear, log, time, [nanotime, category]
      this.axisBase = 10;
      this.axisTime = 0;
      this.axisTimezone = "America/New_York";
      this.axisValL = 0;
      this.axisValR = 1;
      this.axisValSpan = 1;
      this.axisPctL = 0;
      this.axisPctR = 1;
      this.axisPctSpan = 1;
      this.axisLabel = "";
      this.axisGridlines = [];
      this.axisGridlineLabels = [];
      this.axisStep = 1;
      this.axisFixed = 0;
    };
    var dateIntws = [
      // milliseconds
      1, 5, 10, 50, 100, 500,
      // 1, 5, 10, 30, 60 seconds
      1000, 5000, 10000, 30000, 60000,
      // 5, 10, 30, 60 minutes
      300000, 600000, 1800000, 3600000,
      // 3, 6, 12, 24 hours
      3600000 * 3, 3600000 * 6, 3600000 * 12, 3600000 * 24,
      // 7, 30, 90, 180, 360 days
      86400000 * 7, 86400000 * 30, 86400000 * 90, 86400000 * 180, 86400000 * 360,
      // 5, 10, 25, 50, 100 years
      31104000000 * 5, 31104000000 * 10, 31104000000 * 25, 31104000000 * 50, 31104000000 * 100
    ];
    var numIntws = [], numFixs = [];
    var bs = 1E-6;
    for (var i = 0; i < 18; i++) {
      var f = Math.max(6 - i, 0);
      numIntws = numIntws.concat([1.0 * bs, 2.5 * bs, 5.0 * bs]);  // generate 1s, 5s
      numFixs = numFixs.concat([f, i <= 6 ? f + 1 : f, f]);
      bs *= 10;
    }

    PlotAxis.prototype.dateIntws = dateIntws;
    PlotAxis.prototype.numIntws = numIntws;
    PlotAxis.prototype.numFixs = numFixs;

    PlotAxis.prototype.axisPow = function(pct) {
      return Math.pow(this.axisBase, pct * this.axisValSpan + this.axisValL);
    };
    PlotAxis.prototype.setLabel = function(label) {
      this.axisLabel = label;
    };
    PlotAxis.prototype.setRange = function(vl, vr, para) {
      if (vl != null) { this.axisValL = vl; }
      if (vr != null) { this.axisValR = vr; }
      if (this.axisType === "log") {
        if (para != null ) { this.axisBase = para; }
        if (this.axisBase <= 1) {
          this.axisBase = 10;
          console.error("cannot set base to <= 1");
        }
      } else if (this.axisType === "time"){
        if (para != null) { this.axisTimezone = para; }
      }
      this.axisValSpan = this.axisValR - this.axisValL;
    };
    PlotAxis.prototype.setGridlines = function(pl, pr, count) {
      if (pr < pl) {
        console.error("cannot set right coord < left coord");
        return;
      }
      if (count == null) {
        console.error("missing setCoords count");
        count = 1;
      }
      this.axisPctL = pl;
      this.axisPctR = pr;
      this.axisPctSpan = pr - pl;
      var span = this.axisPctSpan * this.axisValSpan;
      var intws, fixs;
      if (this.axisType === "time") {
        intws = this.dateIntws;
        fixs = {};
      } else {
        intws = this.numIntws;
        fixs = this.numFixs;
      }
      var w, f, mindiff = 1E100;
      for (var i = intws.length - 1; i >= 0; i--) {
        var nowcount = span / intws[i];
        var diff = Math.abs(nowcount - count);
        if (diff < mindiff) {
          mindiff = diff;
          w = intws[i];
          f = fixs[i];
        }
      }
      this.axisStep = w;
      this.axisFixed = f;
      var val = Math.ceil(this.getValue(pl) / w) * w,
          valr = this.getValue(pr);
      var lines = [],
          labels = [];
      while(val < valr) {
        var pct = this.getPercent(val);
        labels.push(this.getString(pct));
        lines.push(pct);
        val += w;
      }
      this.axisGridlines = lines;
      this.axisGridlineLabels = labels;
    };
    PlotAxis.prototype.getGridlines = function() { return _.without(this.axisGridlines); };
    PlotAxis.prototype.getGridlineLabels = function() { return _.without(this.axisGridlineLabels); };
    PlotAxis.prototype.getPercent = function(val) {
      if (val < this.axisValL) { val = this.axisValL; }
      if (val > this.axisValR) { val = this.axisValR; }
      return (val - this.axisValL) / this.axisValSpan;
    };
    PlotAxis.prototype.getValue = function(pct) {
      if (pct < 0) { pct = 0; }
      if (pct > 1) { pct = 1; }
      return this.axisValSpan * pct + this.axisValL;
    };
    PlotAxis.prototype.getString = function(pct) {
      if (this.axisType != "time" && this.axisType != "nanotime") {
        if (this.axisType === "log") {
          return "" + this.axisBase + "^" + this.getValue(pct).toFixed(this.axisFixed);
        } else {
          return "" + this.getValue(pct).toFixed(this.axisFixed);
        }
      }
      var val = this.getValue(pct);
      var span = this.axisValSpan * this.axisPctSpan;

      var d, ret = "";
      if (this.axisType === "time") {
        d = Math.ceil(val * 1000) / 1000;
      }
      else if (this.axisType === "nanotime"){
        var bval = new Big(val).plus(this.axisOffset).div(1000000);
        d = new Date(bval.toFixed(0));
      }

      var padStr = function(val, len) {
        var str = "" + val;
        while (str.length < len) str = "0" + str;
        return str;
      };
      if (span <= 1000) {
        ret = val + "  ";
        ret = moment(d).tz(this.axisTimezone).format(".SSS") + ( (d - Math.floor(d)).toFixed(this.axisFixed));
      } else if (span <= 1000 * 60) {
        ret = moment(d).tz(this.axisTimezone).format("mm:ss.SSS");
      } else if (span <= 1000 * 60 * 60) {
        ret = moment(d).tz(this.axisTimezone).format("HH:mm:ss");
      } else if (span <= 1000) {
        ret = moment(d).tz(this.axisTimeozne).format("MMM DD ddd, HH:mm");
      } else if (span <= 1000 * 60 * 60 * 24 * 30) {
        ret = moment(d).tz(this.axisTimezone).format("MMM DD ddd");
      } else {
        ret = moment(d).tz(this.axisTimezone).format("YYYY MMM");
      }

      /*
      // Nanoplot TODO
      if (this.axisType === "nanotime"  && span < 1000000) {
        var digits = bval.mod(1000000000).toFixed(0);
        if (span < 1000) {
          ret += "." + padStr(Math.floor(digits / 1), 9);
        } else if (span < 1000000) {
          ret += "." + padStr(Math.floor(digits / 1000), 6);
        } else {
          ret += "." + padStr(Math.floor(digits / 1000000), 3);
        }
      }
      */
      return ret;
    };
    return PlotAxis;
  };
  beaker.bkoFactory('PlotAxis', [retfunc]);
})();

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
  var retfunc = function(PlotAxis, PlotLine, PlotBar, PlotStem, PlotArea, PlotPoint,
    PlotConstline, PlotConstband, PlotText,
    PlotLineLodLoader, PlotBarLodLoader, PlotStemLodLoader, PlotAreaLodLoader,
    PlotPointLodLoader) {
    var lodthresh = 1500;
    return {
      createPlotItem : function(item) {
        var size = item.elements.length;
        var plotitem;
        switch (item.type) {
          case "line":
            plotitem = size >= lodthresh ?
              new PlotLineLodLoader(item, lodthresh) : new PlotLine(item);
            break;
          case "bar":
            plotitem = size >= lodthresh ?
              new PlotBarLodLoader(item, lodthresh) : new PlotBar(item);
            break;
          case "stem":
            plotitem = size >= lodthresh ?
              new PlotStemLodLoader(item, lodthresh) : new PlotStem(item);
            break;
          case "area":
            plotitem = size >= lodthresh ?
              new PlotAreaLodLoader(item, lodthresh) : new PlotArea(item);
            break;
          case "point":
            plotitem = size >= lodthresh ?
              new PlotPointLodLoader(item, lodthresh) : new PlotPoint(item);
            break;
          case "constline":
            plotitem = new PlotConstline(item);
            break;
          case "constband":
            plotitem = new PlotConstband(item);
            break;
          case "text":
            plotitem = new PlotText(item);
            break;
          default:
            console.error("no type specified for item creation");
        }
        return plotitem;
      },

      recreatePlotItem : function(item) {
        switch (item.type) {
          case "line":
            if (item.isLodItem === true) {
              item.__proto__ = PlotLineLodLoader.prototype;
            } else {
              item.__proto__ = PlotLine.prototype;
            }
            break;
          case "bar":
            if (item.isLodItem === true) {
              item.__proto__ = PlotBarLodLoader.prototype;
            } else {
              item.__proto__ = PlotBar.prototype;
            }
            break;
          case "stem":
          if (item.isLodItem === true) {
              item.__proto__ = PlotStemLodLoader.prototype;
            } else {
              item.__proto__ = PlotStem.prototype;
            }
            break;
          case "area":
            if (item.isLodItem === true) {
              item.__proto__ = PlotAreaLodLoader.prototype;
            } else {
              item.__proto__ = PlotArea.prototype;
            }
            break;
          case "point":
            if (item.isLodItem === true) {
              item.__proto__ = PlotPointLodLoader.prototype;
            } else {
              item.__proto__ = PlotPoint.prototype;
            }
            break;
          case "constline":
            item.__proto__ = PlotConstline.prototype;
            break;
          case "constband":
            item.__proto__ = PlotConstband.prototype;
            break;
          case "text":
            item.__proto__ = PlotText.prototype;
            break;
          case "axis":
            item.__proto__ = PlotAxis.prototype;
            break;
          default:
            console.error("no type specified for item recreation");
        }
      }
    };
  };
  beaker.bkoFactory('plotFactory',
    ['PlotAxis', 'PlotLine', 'PlotBar', 'PlotStem', 'PlotArea', 'PlotPoint',
     'PlotConstline', 'PlotConstband', 'PlotText',
     'PlotLineLodLoader', 'PlotBarLodLoader', 'PlotStemLodLoader', 'PlotAreaLodLoader',
     'PlotPointLodLoader',
      retfunc]);
})();

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
  var retfunc = function(bkUtils) {
    return {
      dataTypeMap : {
        "Line" : "line",
        "Stems" : "stem",
        "Bars" : "bar",
        "Area" : "area",
        "Text" : "text",
        "Points" : "point",
        "" : ""
      },
      lineStyleMap : {
        "DEFAULT": "solid",
        "SOLID" : "solid",
        "DASH" : "dash",
        "DOT" : "dot",
        "DASHDOT" : "dashdot",
        "LONGDASH" : "longdash",
        "" : "solid"
      },
      pointShapeMap : {
        "DEFAULT" : "rect",
        "CIRCLE" : "circle",
        "DIAMOND" : "diamond",
        "" : "rect"
      },
      interpolationMap : {
        0 : "none",
        1 : "linear",
        2 : "linear", // should be "curve" but right now it is not implemented yet
        "" : "linear"
      },

      convertGroovyData : function(newmodel, model) {
        var yIncludeZero = false;
        var logx = false, logy = false, logxb, logyb;
        if (model.rangeAxes != null) {
          var axis = model.rangeAxes[0];
          if (axis.auto_range_includes_zero === true) {
            yIncludeZero = true;
          }
          if (axis.use_log === true) {
            logy = true;
            logyb = axis.log_base == null ? 10 : axis.log_base;
          }
        }
        if (model.log_x === true) {
          logx = true;
          logxb = model.x_log_base == null ? 10 : model.x_log_base;
        }
        // set margin
        newmodel.margin = {};
        // set axis bound as focus
        if (model.x_auto_range === false) {
          if (model.x_lower_bound != null) {
            newmodel.userFocus.xl = model.x_lower_bound;
          }
          if (model.x_upper_bound != null) {
            newmodel.userFocus.xr = model.x_upper_bound;
          }
        } else {
          if (model.x_lower_margin != null) {
            newmodel.margin.left = model.x_lower_margin;
          }
          if (model.x_upper_margin != null) {
            newmodel.margin.right = model.x_upper_margin;
          }
        }

        if (model.rangeAxes != null) {
          var axis = model.rangeAxes[0];
          if (axis.auto_range === false) {
            if (axis.lower_bound != null) {
              newmodel.userFocus.yl = axis.lower_bound;
            }
            if (axis.upper_bound != null) {
              newmodel.userFocus.yr = axis.upper_bound;
            }
          } else {
            if (axis.lower_margin != null) {
              newmodel.margin.bottom = axis.lower_margin;
            }
            if (axis.upper_margin != null) {
              newmodel.margin.top = axis.upper_margin;
            }
          }
        }

        if (model.crosshair != null) {
          var color = model.crosshair.color;
          newmodel.xCursor = {};
          var cursor = newmodel.xCursor;

          cursor.color_opacity = parseInt(color.substr(1,2), 16) / 255;
          cursor.color = "#" + color.substr(3);

          var style = model.crosshair.style;
          if (style == null) style = "";
          cursor.style = this.lineStyleMap[style];
          cursor.width = model.crosshair.width != null ? model.crosshair.width : 2;

          newmodel.yCursor = {};
          _.extend(newmodel.yCursor, cursor);
        }

        // log scaling
        if (logx) {
          newmodel.xAxis.type = "log";
          newmodel.xAxis.base = logxb;
        } else if (model.type === "TimePlot") {
          newmodel.xAxis.type = "time";
        } else if (model.type === "NanoPlot"){  // TODO
        } else {
          newmodel.xAxis.type = "linear";
        }

        if (logy) {
          newmodel.yAxis.type = "log";
          newmodel.yAxis.base = logyb;
        } else {
          newmodel.yAxis.type = "linear";
        }

        var list = model.graphics_list;
        var numLines = list.length;
        for (var i = 0; i < numLines; i++) {
          var item = list[i];

          item.legend = item.display_name;
          delete item.display_name;

          if (item.use_tool_tip != null) {
            item.useToolTip = item.use_tool_tip;
            delete item.use_tool_tip;
          }

          if (item.color != null) {
            item.color_opacity = parseInt(item.color.substr(1,2), 16) / 255;
            item.color = "#" + item.color.substr(3);
          }
          if (item.fill != null && item.fill === false) {
            item.color = "none";
          }
          if (item.outline_color != null) {
            item.stroke_opacity = parseInt(item.outline_color.substr(1,2), 16) / 255;
            item.stroke = "#" + item.outline_color.substr(3);
            delete item.outline_color;
          }

          if (item.type == null) { item.type = ""; }
          if (item.style == null) { item.style = ""; }
          if (item.stroke_dasharray == null) { item.stroke_dasharray = ""; }
          if (item.interpolation == null) { item.interpolation = ""; }

          item.type = this.dataTypeMap[item.type];

          if(item.type === "bar" || item.type === "area") {
            //newmodel.yPreventNegative = true; // auto range to y = 0
          }

          if(item.type === "line" || item.type === "stem") {
            item.style = this.lineStyleMap[item.style];
          }

          if(item.type === "line" || item.type === "area") {
            item.interpolation = this.interpolationMap[item.interpolation];
          }

          if(item.type === "bar") {
            if (item.width == null) {
              item.width = 1;
            }
          }

          if (item.type === "point") {
            if (item.shape == null) {
              item.shape = "DEFAULT";
            }
            item.shape = this.pointShapeMap[item.shape];
          }

          if (item.base != null && logy) {
            if (item.base === 0) {
              item.base = 1;
            }
          }

          var elements = [];
          for (var j = 0; j < item.x.length; j++) {
            var ele = {};
            ele.x = item.x[j];
            ele.y = item.y[j];

            // discard NaN entries
            if (ele.x === "NaN" || ele.y === "NaN")
              continue;

            if (item.colors != null) {
              ele.color_opacity = parseInt(item.colors[j].substr(1,2), 16) / 255;
              ele.color = "#" + item.colors[j].substr(3);
            }
            if (item.fills != null && item.fills[j] === false) {
              ele.color = "none";
            }
            if (item.outline_colors != null) {
              ele.stroke_opacity = parseInt(item.outline_colors[j].substr(1,2), 16) / 255;
              ele.stroke = "#" + item.outline_colors[j].substr(3);
            }

            if (item.type === "line" || item.type === "stem") {
              if (item.styles != null) {
                var style = item.styles[j];
                if (style == null) {
                  style = "";
                }
                item.style = this.lineStyleMap[style];
              }
            }

            if ((item.type === "stem" || item.type === "bar" || item.type === "area") &&
              ele.y2 == null) {
              if (item.bases != null) {
                ele.y2 = item.bases[j];
              }
            }

            if (item.type === "point") {
              if (item.sizes != null) {
                ele.size = item.sizes[j];
              }
            }

            if (item.type === "bar" && item.widths != null) {
              ele.x -= item.widths[j] / 2;
              ele.x2 = ele.x + item.widths[j];
            }

            elements.push(ele);
          }

          item.elements = elements;

          newmodel.data.push(item);
        }
        if(model.constant_lines != null) {
          for(var i = 0; i < model.constant_lines.length; i++) {
            var line = model.constant_lines[i];
            var item = {
              "type": "constline",
              "width": line.width != null ? line.width : 1,
              "color": "black",
              "elements": []
            };
            if (line.color != null) {
              item.color_opacity = parseInt(line.color.substr(1,2), 16) / 255;
              item.color = "#" + line.color.substr(3);
            }
            var style = line.style;
            if (style == null) { style = ""; }
            item.style = this.lineStyleMap[style];

            if (line.x != null) {
              var ele = {"type": "x", "x": line.x};
            } else if(line.y != null) {
              var y = line.y;
              var ele = {"type": "y", "y": y};
            }
            item.elements.push(ele);
            newmodel.data.push(item);
          }
        }
        if (model.constant_bands != null) {
          for (var i = 0; i < model.constant_bands.length; i++) {
            var band = model.constant_bands[i];
            var item = {
              "type" : "constband",
              "elements" : []
            };
            if (band.color != null) {
              item.color_opacity = parseInt(band.color.substr(1, 2), 16) / 255;
              item.color = "#" + band.color.substr(3);
            }
            if (band.x != null) {
              var ele = {
                "type" : "x",
                "x" : band.x[0],
                "x2" : band.x[1]
              };
            } else if (band.y != null) {
              var ele = {
                "type" : "y"
              };
              var y1 = band.y[0], y2 = band.y[1];
              ele.y = y1;
              ele.y2 = y2;
            }
            item.elements.push(ele);
            newmodel.data.push(item);
          }
        }
        if (model.texts != null) {
          for (var i = 0; i < model.texts.length; i++) {
            var mtext = model.texts[i];
            var item = {
              "type" : "text",
              "color" : mtext.color != null ? mtext.color : "black",
              "elements" : []
            };
            var ele = {
              "x" : mtext.x,
              "y" : mtext.y,
              "text" : mtext.text
            };
            item.elements.push(ele);
            newmodel.data.push(item);
          }
        }
        newmodel.yIncludeZero = yIncludeZero;
      },

      cleanupModel : function(model) {
        for (var i = 0; i < model.data.length; i++) {
          var item = model.data[i];
          if (item.x != null) { delete item.x; }
          if (item.y != null) { delete item.y; }
          if (item.colors) { delete item.colors; }
          if (item.sizes) { delete item.sizes; }
          if (item.bases) { delete item.bases; }
          if (item.outline_colors) { delete item.outline_colors; }
        }
      }
    };
  };
  beaker.bkoFactory('plotConverter', ["bkUtils", retfunc]);
})();

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
  var retfunc = function(bkUtils, plotConverter, PlotAxis, plotFactory, plotUtils) {
    return {
      lineDasharrayMap : {
        "solid" : "",
        "dash" : "9,5",
        "dot" : "2,2",
        "dashdot" : "9,5,2,5",
        "longdash" : "20,5",
        "" : ""
      },

      remapModel : function(model) {
        // map data entrie to [0, 1] of axis range
        var vrange = model.vrange;
        var xAxisLabel = model.xAxis.label,
            yAxisLabel = model.yAxis.label;

        var xAxis = new PlotAxis(model.xAxis.type),
            yAxis = new PlotAxis(model.yAxis.type);

        if (xAxis.axisType !== "time") {
          xAxis.setRange(vrange.xl, vrange.xr, model.xAxis.base);
        } else {
          xAxis.setRange(vrange.xl, vrange.xr, model.timezone);
        }
        if (yAxis.axisType !== "time") {
          yAxis.setRange(vrange.yl, vrange.yr, model.yAxis.base);
        } else {
          yAxis.setRange(vrange.yl, vrange.yr, model.timezone);
        }

        if (xAxisLabel != null) {
          xAxis.setLabel(xAxisLabel);
        }
        if (yAxisLabel != null) {
          yAxis.setLabel(yAxisLabel);
        }
        model.xAxis = xAxis;
        model.yAxis = yAxis;

        var data = model.data;
        for (var i = 0; i < data.length; i++) {
          var item = data[i], eles = item.elements;

          // map coordinates using percentage
          // tooltips are possibly generated at the same time
          item.applyAxis(xAxis, yAxis);
        }
        // map focus region
        var focus = model.userFocus;
        if (focus.xl != null) { focus.xl = xAxis.getPercent(focus.xl); }
        if (focus.xr != null) { focus.xr = xAxis.getPercent(focus.xr); }
        if (focus.yl != null) { focus.yl = yAxis.getPercent(focus.yl); }
        if (focus.yr != null) { focus.yr = yAxis.getPercent(focus.yr); }
      },

      formatModel: function(newmodel) {
        if (newmodel.xCursor != null) {
          var cursor = newmodel.xCursor;
          if (cursor.color == null) { cursor.color = "black"; }
          if (cursor.width == null) { cursor.width = 1; }
          cursor.stroke_dasharray = this.lineDasharrayMap[cursor.style];
        }
        if (newmodel.yCursor != null) {
          var cursor = newmodel.yCursor;
          if (cursor.color == null) { cursor.color = "black"; }
          if (cursor.width == null) { cursor.width = 1; }
          cursor.stroke_dasharray = this.lineDasharrayMap[cursor.style];
        }
        var logx = newmodel.xAxis.type === "log",
            logxb = newmodel.xAxis.base,
            logy = newmodel.yAxis.type === "log",
            logyb = newmodel.yAxis.base;

        if (newmodel.data == null) { newmodel.data = []; }
        var data = newmodel.data;
        for (var i = 0; i < data.length; i++) {
          var item = data[i], eles = item.elements;

          if (eles == null) eles = [];

          item.showItem = true;

          if (item.type == null) {
            item.type = "line";
          }

          if(item.type === "bar" || item.type === "area") {
            //newmodel.yPreventNegative = true; // prevent move to y < 0
          }

          if(item.type === "line" || item.type === "stem") {
            if (item.color == null) {
              item.color = "black";
            }
            if (item.style == null) {
              item.style = "solid";
            }
            item.stroke_dasharray = this.lineDasharrayMap[item.style];
          }

          if(item.type === "line" || item.type === "area") {
            if (item.interpolation === "curve") {
            }
          }

          if (item.type === "line" || item.type === "stem") {
            if (item.width == null) {
              item.width = 2;
            }
          }
          if (item.type === "bar" && item.width == null) {
            item.width = 1;
          }

          if (item.type === "point") {
            if (item.shape == null) {
              item.shape = "rect";
            }
            if (item.size == null) {
              item.size = item.shape === "rect" ? 8 : 5;
            }
          }

          if (item.type === "constline" || item.type === "constband") {
            if (item.color == null) {
              item.color = "black";
            }
          }

          if (item.useToolTip == null) {
            if (newmodel.useToolTip === true) {
              item.useToolTip = true;
            }
          }

          if (item.colorOpacity != null) {
            item.color_opacity = item.colorOpacity;
            delete item.colorOpacity;
          }
          if (item.outlineColor != null) {
            item.stroke = item.outlineColor;
            delete item.outlineColor;
          }
          if (item.outlineWidth != null) {
            item.stroke_width = item.outlineWidth;
            delete item.outlineWidth;
          }
          if (item.outlineOpacity != null) {
            item.stroke_opacity = item.outlineOpacity;
            delete item.outlineOpacity;
          }

          if (item.color_opacity == null) {
            item.color_opacity = 1.0; // default show fully
          }
          if (item.stroke_opacity == null) {
            // default show based on whether stroke is set
            item.stroke_opacity = item.stroke == null ? 0.0 : 1.0;
          }

          for (var j = 0; j < eles.length; j++) {
            var ele = eles[j];

            if (ele.outlineColor != null) {
              ele.stroke = ele.outlineColor;
              delete ele.outlineColor;
            }
            if (ele.outlineWidth != null) {
              ele.stroke_width = ele.outlineWidth;
              delete ele.outlineWidth;
            }
            if (ele.outlineOpacity != null) {
              ele.stroke_opacity = ele.outlineOpacity;
              delete ele.outlineOpacity;
            }

            if (item.type === "bar" && ele.x2 == null) {
              ele.x -= item.width / 2;
              ele.x2 = ele.x + item.width;
            }
            if ((item.type === "area" || item.type === "bar" || item.type === "stem")
              && ele.y2 == null) {
              if (item.height != null) {
                ele.y2 = ele.y + item.height;
              } else if (item.base != null) {
                ele.y2 = item.base;
              } else {
                ele.y2 = logy ? 1 : 0;
              }
            }

            if (item.type === "point" && ele.size == null) {
              if (item.size != null) {
                ele.size = item.size;
              } else {
                ele.size = item.shape === "rect" ? 8 : 5;
              }
            }

            if (item.type === "area") {
              if (item.interpolation == null) {
                item.interpolation = "linear";
              }
            }
            // swap y, y2
            if (ele.y != null && ele.y2 != null && ele.y > ele.y2) {
              var temp = ele.y;
              ele.y = ele.y2;
              ele.y2 = temp;
            }

            if (ele.x != null) {
              ele._x = ele.x;
              if (logx) {
                ele.x = Math.log(ele.x) / Math.log(logxb);
              }
            }
            if (ele.x2 != null) {
              ele._x2 = ele.x2;
              if (logx) {
                ele.x2 = Math.log(ele.x2) / Math.log(logxb);
              }
            }
            if (ele.y != null) {
              ele._y = ele.y;
              if (logy) {
                ele.y = Math.log(ele.y) / Math.log(logyb);
              }
            }
            if (ele.y2 != null) {
              ele._y2 = ele.y2;
              if (logy) {
                ele.y2 = Math.log(ele.y2) / Math.log(logyb);
              }
            }
          }
          // recreate rendering objects
          item.index = i;
          item.id = "i" + i;
          data[i] = plotFactory.createPlotItem(item);
        }

        // apply log to focus
        var focus = newmodel.userFocus;
        if (logx) {
          if (focus.xl != null) {
            focus.xl = Math.log(focus.xl) / Math.log(logxb);
          }
          if (focus.xr != null) {
            focus.xr = Math.log(focus.xr) / Math.log(logxb);
          }
        }
        if (logy) {
          if (focus.yl != null) {
            focus.yl = Math.log(focus.yl) / Math.log(logyb);
          }
          if (focus.yr != null) {
            focus.yr = Math.log(focus.yr) / Math.log(logyb);
          }
        }
      },

      sortModel: function(model) {
        var data = model.data;
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          if (item.type === "constline" || item.type === "constband") { continue; }

          var eles = item.elements;
          var unordered = false;
          for (var j = 1; j < eles.length; j++) {
            if (eles[j].x < eles[j - 1].x) {
              unordered = true;
              break;
            }
          }
          if (unordered === true) {
            if (item.type === "bar" || item.type === "stem" ||
            item.type === "point" || item.type === "text") {
              eles.sort(function(a, b) {
                return a.x - b.x;
              });
            } else {
              item.isUnorderedItem = true;
            }
          }
        }
      },

      standardizeModel : function(_model) {
        var model = {};
        $.extend(true, model, _model); // deep copy model to prevent changing the original JSON

        if (model.graphics_list != null) {
          model.version = "groovy";  // TODO, a hack now to check DS source
        }
        if (model.version === "complete") { // skip standardized model in combined plot
          return model;
        } else if (model.version === "groovy") {
        } else {
          model.version = "direct";
        }
        var newmodel;
        if (model.version === "groovy") {  // model returned from serializer
          newmodel = {
            type : "plot",
            title : model.chart_title != null ? model.chart_title : model.title,
            margin : {},
            userFocus : {},
            xAxis : { label : model.domain_axis_label },
            yAxis : { label : model.y_label },
            showLegend : model.show_legend != null ? model.show_legend : false,
            useToolTip : model.use_tool_tip != null ? model.use_tool_tip : false,
            plotSize : {
              "width" : model.init_width != null ? model.init_width : 1200,
              "height" : model.init_height != null ? model.init_height : 350
            },
            nanoOffset : null,
            timezone : model.timezone
          };
        } else {
          newmodel = {
            showLegend : model.showLegend != null ? model.showLegend : false,
            useToolTip : model.useToolTip != null ? model.useToolTip : false,
            xAxis : model.xAxis != null ? model.xAxis : {},
            yAxis : model.yAxis != null ? model.yAxis : {},
            margin : model.margin != null ? model.margin : {},
            range : model.range != null ? model.range : null,
            userFocus : model.focus != null ? model.focus : {},
            xCursor : model.xCursor,
            yCursor : model.yCursor,
            plotSize : {
              "width" : model.width != null ? model.width : 1200,
              "height": model.height != null ? model.height : 350
            },
            timezone : model.timezone
          };
        }

        newmodel.data = [];

        if (model.version === "groovy") {
          plotConverter.convertGroovyData(newmodel, model);
        } else {  // DS generated directly
          _.extend(newmodel, model);
        }
        this.formatModel(newmodel); // fill in null entries, compute y2, etc.
        this.sortModel(newmodel);

        // at this point, data is in standard format (log is applied as well)

        var range = plotUtils.getDataRange(newmodel.data).datarange;

        var margin = newmodel.margin;
        if (margin.bottom == null) { margin.bottom = .05; }
        if (margin.top == null) { margin.top = .05; }
        if (margin.left == null) { margin.left = .05; }
        if (margin.right == null) { margin.right = .05; }

        if (newmodel.vrange == null) {
          // visible range initially is 10x larger than data range by default
          newmodel.vrange = {
            xl : range.xl - range.xspan * 10.0,
            xr : range.xr + range.xspan * 10.0,
            yl : range.yl - range.yspan * 10.0,
            yr : range.yr + range.yspan * 10.0
          };
          var vrange = newmodel.vrange;

          if (newmodel.yPreventNegative === true) {
            vrange.yl = Math.min(0, range.yl);
          }
          if (newmodel.yIncludeZero === true) {
            if (vrange.yl > 0) {
              vrange.yl = 0;
            }
          }
          var focus = newmodel.userFocus; // allow user to overide vrange
          if (focus.xl != null) { vrange.xl = Math.min(focus.xl, vrange.xl); }
          if (focus.xr != null) { vrange.xr = Math.max(focus.xr, vrange.xr); }
          if (focus.yl != null) { vrange.yl = Math.min(focus.yl, vrange.yl); }
          if (focus.yr != null) { vrange.yr = Math.max(focus.yr, vrange.yr); }

          vrange.xspan = vrange.xr - vrange.xl;
          vrange.yspan = vrange.yr - vrange.yl;
        }

        this.remapModel(newmodel);

        newmodel.version = "complete";
        return newmodel;
      }
    };
  };
  beaker.bkoFactory('plotFormatter',
    ["bkUtils", 'plotConverter', 'PlotAxis', 'plotFactory', 'plotUtils', retfunc]);
})();

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
  var retfunc = function(bkUtils, plotFormatter) {
    return {
      standardizeModel : function(model) {
        var newmodel = {
          title : model.title,
          plots : []
        };
        var version;
        if (model.version === "groovy") {
          version = "groovy";
        } else {
          version = "direct";
        }

        var width, height;
        var showLegend, useToolTip;
        if (version === "groovy") {
          newmodel.xAxisLabel = model.x_label;
          newmodel.yAxisLabel = model.y_label;
          width = model.init_width;
          height = model.init_height;
          showLegend = model.show_legend;
          useToolTip = model.use_tool_tip;
        } else if (version === "direct"){
          width = model.width;
          height = model.height;
          showLegend = model.showLegend;
          useToolTip = model.useToolTip;
        }

        if (width == null) { width = 1200; }
        if (height == null) { height = 600; }

        newmodel.plotSize = {
          "width" : width,
          "height" : height
        };

        var plotType = model.plot_type;
        if (plotType == null) { plotType = "Plot"; }

        var sumweights = 0;
        var weights = model.weights == null ? [] : model.weights;
        for(var i = 0; i < model.plots.length; i++) {
          if(weights[i] == null) {
            weights[i] = 1;
          }
          sumweights += weights[i];
        }
        var plots = model.plots;
        for(var i = 0; i < plots.length; i++) {
          var plotmodel = plots[i];

          if (plotmodel.version == null) { plotmodel.version = version; }
          if (plotmodel.showLegend == null) { plotmodel.showLegend = showLegend; }
          if (plotmodel.useToolTip == null) { plotmodel.useToolTip = useToolTip; }

          plotmodel.type = plotType;
          var newplotmodel = plotFormatter.standardizeModel(plotmodel);

          if (i < plots.length - 1) {  // turn off x coordinate labels
            newplotmodel.xAxis.axisLabel = null;
            newplotmodel.xAxis.showGridlineLabels = false;
          } else {
            newplotmodel.xAxis.axisLabel = newmodel.xAxisLabel;
          }

          newplotmodel.plotSize.width = width;
          newplotmodel.plotSize.height = height * weights[i] / sumweights;

          newmodel.plots.push(newplotmodel);
        }
        return newmodel;
      }
    };
  };
  beaker.bkoFactory('combinedplotFormatter', ["bkUtils", "plotFormatter", retfunc]);
})();

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

/*
 * bkoPlot
 * This is the output display component for displaying xyChart
 */

( function() {
  'use strict';
  var retfunc = function(plotUtils, plotFormatter, plotFactory, bkCellMenuPluginManager) {
    var CELL_TYPE = "bko-plot";
    return {
      template :
          "<div id='plotTitle' class='plot-title'></div>" +
          "<div id='plotContainer' class='plot-plotcontainer' oncontextmenu='return false;'>" +
          "<svg>"  +
          "<defs>" +
            "<filter id='svgfilter'>" +
              "<feGaussianBlur result='blurOut' in='SourceGraphic' stdDeviation='1' />" +
              "<feBlend in='SourceGraphic' in2='blurOut' mode='normal' />" +
            "</filter>" +
          "</defs>" +
          "<g id='gridg'></g>" +
          "<g id='maing'></g>" +
          "<g id='labelg'></g> " +
          "</svg>" +
          "</div>",
      controller : function($scope) {
        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch("getShareMenuPlugin()", function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });
      },
      link : function(scope, element, attrs) {
        // rendering code
        element.find("#plotContainer").resizable({
          maxWidth : element.width(), // no wider than the width of the cell
          minWidth : 450,
          minHeight: 150,
          handles : "e, s, se",
          resize : function(event, ui) {
            scope.width = ui.size.width;
            scope.height = ui.size.height;
            _(scope.plotSize).extend(ui.size);

            scope.jqsvg.css({"width": scope.width, "height": scope.height});
            scope.jqplottitle.css({"width": scope.width });
            scope.numIntervals = {
              x: scope.width / scope.intervalStepHint.x,
              y: scope.height / scope.intervalStepHint.y
            };
            scope.calcRange();
            scope.calcMapping(false);
            scope.emitSizeChange();
            scope.legendDone = false;
            scope.legendResetPosition = true;

            scope.update();
          }
        });
        
        scope.resizeFunction = function() {
          // update resize maxWidth when the browser window resizes
          var width = element.width();
          scope.jqcontainer.resizable({
            maxWidth : width
          });
        };
        
        scope.initLayout = function() {
          var model = scope.stdmodel;

          element.find(".ui-icon-gripsmall-diagonal-se")
            .removeClass("ui-icon ui-icon-gripsmall-diagonal-se"); // remove the ugly handle :D
          // hook container to use jquery interaction
          scope.container = d3.select(element[0]).select("#plotContainer");
          scope.jqcontainer = element.find("#plotContainer");
          scope.svg = d3.select(element[0]).select("#plotContainer svg");
          scope.jqsvg = element.find("svg");

          var plotSize = scope.plotSize;
          scope.jqcontainer.css(plotSize);
          scope.jqsvg.css(plotSize);

          $(window).resize(scope.resizeFunction);

          // set title
          scope.jqplottitle = element.find("#plotTitle");
          scope.jqplottitle.text(model.title).css("width", plotSize.width);

          scope.maing = d3.select(element[0]).select("#maing");
          scope.gridg = d3.select(element[0]).select("#gridg");
          scope.labelg = d3.select(element[0]).select("#labelg");

          // set some constants

          scope.renderFixed = 1;
          scope.layout = {    // TODO, specify space for left/right y-axis, also avoid half-shown labels
            bottomLayoutMargin : 30,
            topLayoutMargin : 0,
            leftLayoutMargin : 80,
            rightLayoutMargin : 0,
            legendMargin : 10,
            legendBoxSize : 10
          };
          scope.fonts = {
            labelWidth : 6,
            labelHeight : 12,
            tooltipWidth : 10
          };
          scope.zoomLevel = {
            minSpanX : 1E-12,
            minSpanY : 1E-12,
            maxScaleX : 1E9,
            maxScaleY : 1E9
          };
          scope.labelPadding = {
            x : 10,
            y : 10
          };
          scope.intervalStepHint = {
            x : 150,
            y : 75
          };
          scope.numIntervals = {
            x: parseInt(plotSize.width) / scope.intervalStepHint.x,
            y: parseInt(plotSize.height) / scope.intervalStepHint.y
          };
          scope.locateBox = null;
          scope.cursor = {
            x : -1,
            y : -1
          };

          var factor = 2.0;
          if (model.xAxis.axisLabel == null) { factor -= 1.0; }
          if (model.xAxis.showGridlineLabels === false) { factor -= 1.0; }
          scope.layout.bottomLayoutMargin += scope.fonts.labelHeight * factor;

          if (model.yAxis.axisLabel != null) {
            scope.layout.leftLayoutMargin += scope.fonts.labelHeight;
          }
          scope.legendResetPosition = true;

          scope.$watch("model.getFocus()", function(newFocus) {
            if (newFocus == null) { return; }
            scope.focus.xl = newFocus.xl;
            scope.focus.xr = newFocus.xr;
            scope.focus.xspan = newFocus.xr - newFocus.xl;
            scope.calcMapping(false);
            scope.update();
          });
          scope.$watch("model.getWidth()", function(newWidth) {
            if (scope.width == newWidth) { return; }
            scope.width = newWidth;
            scope.jqcontainer.css("width", newWidth );
            scope.jqsvg.css("width", newWidth );
            scope.calcMapping(false);
            scope.legendDone = false;
            scope.legendResetPosition = true;
            scope.update();
          });
        };

        scope.emitZoomLevelChange = function() {
          var data = scope.stdmodel.data;
          for (var i = 0; i < data.length; i++) {
            if (data[i].isLodItem === true) {
              data[i].zoomLevelChanged(scope);
            }
          }
        };

        scope.emitSizeChange = function() {
          if (scope.model.updateWidth != null) {
            scope.model.updateWidth(scope.width);
          } // not stdmodel here
        };
        scope.calcRange = function() {
          var ret = plotUtils.getDefaultFocus(scope.stdmodel);
          scope.visibleItem = ret.visibleItem;
          scope.legendableItem = ret.legendableItem;
          scope.defaultFocus = ret.defaultFocus;
          scope.fixFocus(scope.defaultFocus);
        };
        scope.calcGridlines = function() {
          // prepare the gridlines
          var focus = scope.focus, model = scope.stdmodel;
          model.xAxis.setGridlines(focus.xl, focus.xr, scope.numIntervals.x);
          model.yAxis.setGridlines(focus.yl, focus.yr, scope.numIntervals.y);
        };
        scope.renderGridlines = function() {
          var focus = scope.focus, model = scope.stdmodel;
          var mapX = scope.data2scrX, mapY = scope.data2scrY;

          var xGridlines = model.xAxis.getGridlines();
          for (var i = 0; i < xGridlines.length; i++) {
            var x = xGridlines[i];
            scope.rpipeGridlines.push({
              "id" : "gridline_x_" + i,
              "class" : "plot-gridline",
              "x1" : mapX(x),
              "y1" : mapY(focus.yl),
              "x2" : mapX(x),
              "y2" : mapY(focus.yr)
            });
          }
          var yGridlines = model.yAxis.getGridlines();
          for (var i = 0; i < yGridlines.length; i++) {
            var y = yGridlines[i];
            scope.rpipeGridlines.push({
              "id" : "gridline_y_" + i,
              "class" : "plot-gridline",
              "x1" : mapX(focus.xl),
              "y1" : mapY(y),
              "x2" : mapX(focus.xr),
              "y2" : mapY(y)
            });
          }
          scope.rpipeGridlines.push({
            "id" : "gridline_x_base",
            "class" : "plot-gridline-base",
            "x1" : mapX(focus.xl),
            "y1" : mapY(focus.yl),
            "x2" : mapX(focus.xr),
            "y2" : mapY(focus.yl)
          });
          scope.rpipeGridlines.push({
            "id" : "gridline_y_base",
            "class" : "plot-gridline-base",
            "x1" : mapX(focus.xl),
            "y1" : mapY(focus.yl),
            "x2" : mapX(focus.xl),
            "y2" : mapY(focus.yr)
          });
        };
        scope.renderData = function() {
          var data = scope.stdmodel.data;
          for (var i = 0; i < data.length; i++) {
            data[i].render(scope);
            if (data[i].isLodItem === true) {
              scope.hasLodItem = true;
            }
            if (data[i].isUnorderedItem === true) {
              scope.hasUnorderedItem = true;
            }
          }
          if (scope.hasLodItem === true && scope.showLodHint === true) {
            scope.showLodHint = false;
            scope.renderMessage("Level-of-Detail (LOD) is enabled",
              [ "Some data items contain too many elements to be directly plotted.",
              "Level-of-Detail (LOD) rendering is automatically enabled. " +
              "LOD hint is displayed at the right of the item legend.",
              "LOD by default runs in auto mode. In auto mode, " +
              "LOD will be automatically turned off when you reach detailed enough zoom level.",
              "To switch LOD type, left click the LOD hint. " +
              "To turn off LOD, right click the LOD hint." ]);
          }
          if (scope.hasUnorderedItem === true && scope.showUnorderedHint === true) {
            scope.showUnorderedHint = false;
            scope.renderMessage("Unordered line / area detected",
              [ "The plot requires line and area elements to have x-monotonicity in order to apply " +
              "truncation for performance optimization.",
              "Line or area items are found with unordered x coordinates.",
              "Truncation has been disabled to display correct result.",
              "To enable truncation for better performance, please render x-monotonic line and area items." ]);
          }
        };

        scope.prepareInteraction = function() {
          var model = scope.stdmodel;
          if (model.useToolTip === false) {
            return;
          }
          scope.svg.selectAll(".plot-resp")
            .on('mouseenter', function(d) {
              return scope.tooltip(d, d3.mouse(scope.svg[0][0]));
            })
            .on("mouseleave", function(d) {
              return scope.untooltip(d);
            })
            .on("click", function(d) {
              return scope.toggleTooltip(d);
            });
        };

        scope.toggleTooltip = function(d) {
          if (scope.zoomed === true) { return; } // prevent dragging and toggling at the same time

          var id = d.id, nv = !scope.tips[id];
          if (nv === true) {
            scope.tooltip(d, d3.mouse(scope.svg[0][0]));
          } else {
            scope.tips[id].sticking = !scope.tips[id].sticking;
            if (scope.tips[id].sticking === false) {
              scope.untooltip(d);
            }
          }
        };
        scope.tooltip = function(d, mousePos) {

          if (scope.tips[d.id] != null) {
            return;
          }
          if (d.isresp === true) {
            scope.jqsvg.find("#" + d.id).css("opacity", 1);
          }
          scope.tips[d.id] = {};
          _.extend(scope.tips[d.id], d);
          var d = scope.tips[d.id];
          d.sticking = false;
          d.datax = scope.scr2dataX(mousePos[0] + 2);
          d.datay = scope.scr2dataY(mousePos[1] + 2);

          scope.renderTips();
        };

        scope.untooltip = function(d) {
          if (scope.tips[d.id] == null) { return; }
          if (scope.tips[d.id].sticking === false){
            delete scope.tips[d.id];
            scope.jqcontainer.find("#tip_" + d.id).remove();
            if (d.isresp === true) {
              scope.jqsvg.find("#" + d.id).css("opacity", 0);
            } else {
              scope.jqsvg.find("#" + d.id).removeAttr("filter");
            }
            scope.renderTips();
          }
        };

        scope.renderTips = function() {
          var data = scope.stdmodel.data;
          var focus = scope.focus;
          _.each(scope.tips, function(d) {
            var x = scope.data2scrX(d.datax),
                y = scope.data2scrY(d.datay);
            d.scrx = x;
            d.scry = y;
            var tipid = "tip_" + d.id;
            var tipdiv = scope.jqcontainer.find("#" + tipid);

            if (tipdiv.length === 0) {
              var tiptext = data[d.idx].createTip(d.ele, d.g);

              tipdiv = $("<div></div>").appendTo(scope.jqcontainer)
                .attr("id", tipid)
                .attr("class", "plot-tooltip")
                .css("border-color", data[d.idx].tip_color)
                .append(tiptext)
                .on('mouseup', function(e) {
                  if (e.which == 3) {
                    delete scope.tips[d.id];
                    if (d.isresp === true) {  // is interaction responsive element
                      scope.jqsvg.find("#" + d.id).css("opacity", 0);
                    } else {
                      scope.jqsvg.find("#" + d.id).removeAttr("filter");
                    }
                    scope.interactMode = "remove";
                    $(this).remove();
                  }
                });
            }
            var w = tipdiv.outerWidth(), h = tipdiv.outerHeight();
            if (plotUtils.outsideScrBox(scope, x, y, w, h)) {
              tipdiv.remove();
              return;
            }
            tipdiv
              .draggable({
                stop : function(event, ui) {
                  d.scrx = ui.position.left - scope.fonts.tooltipWidth;
                  d.scry = ui.position.top;
                  d.datax = scope.scr2dataX(d.scrx);
                  d.datay = scope.scr2dataY(d.scry);
                }
              });

            tipdiv
              .css("left", x + scope.fonts.tooltipWidth)
              .css("top", y);
            if (d.isresp === true) {
              scope.jqsvg.find("#" + d.id).attr("opacity", 1);
            } else {
              scope.jqsvg.find("#" + d.id)
                .attr("filter", "url(#svgfilter)");
            }
          });
        };

        scope.renderGridlineLabels = function() {
          var mapX = scope.data2scrX, mapY = scope.data2scrY;
          var model = scope.stdmodel, ys = model.yScale;
          if (model.xAxis.showGridlineLabels !== false) {
            var lines = model.xAxis.getGridlines(),
                labels = model.xAxis.getGridlineLabels();
            for (var i = 0; i < labels.length; i++) {
              var x = lines[i];
              scope.rpipeTexts.push({
                "id" : "label_x_" + i,
                "class" : "plot-label",
                "text" : labels[i],
                "x" : mapX(x),
                "y" : mapY(scope.focus.yl) + scope.labelPadding.y,
                "text-anchor" : "middle",
                "dominant-baseline" : "hanging"
              });
            }
          }
          if (model.yAxis.showGridlineLabels !== false) {
            lines = model.yAxis.getGridlines();
            labels = model.yAxis.getGridlineLabels();
            for (var i = 0; i < labels.length; i++) {
              var y = lines[i];
              scope.rpipeTexts.push({
                "id" : "label_y_" + i,
                "class" : "plot-label",
                "text" : labels[i],
                "x" : mapX(scope.focus.xl) - scope.labelPadding.x,
                "y" : mapY(y),
                "text-anchor" : "end",
                "dominant-baseline" : "central"
              });
            }
          }
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
          if (model.xAxis.axisLabel != null) {
            scope.rpipeTexts.push({
              "id" : "xlabel",
              "class" : "plot-xylabel",
              "text" : model.xAxis.axisLabel,
              "x" : lMargin + (scope.jqsvg.width() - lMargin) / 2,
              "y" : scope.jqsvg.height() - scope.fonts.labelHeight
            });
          }
          if (model.yAxis.axisLabel != null) {
            var x = scope.fonts.labelHeight * 2, y = (scope.jqsvg.height() - bMargin) / 2;
            scope.rpipeTexts.push({
              "id" : "ylabel",
              "class" : "plot-xylabel",
              "text" : model.yAxis.axisLabel,
              "x" : x,
              "y" : y,
              "transform" : "rotate(-90 " + x + " " + y + ")"
            });
          }
        };

        scope.renderCursor = function(e) {
          var x = e.offsetX, y = e.offsetY;
          var W = scope.jqsvg.width(), H = scope.jqsvg.height();
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
          if (x < lMargin || y > H - bMargin) {
            scope.svg.selectAll(".plot-cursor").remove();
            scope.jqcontainer.find(".plot-cursorlabel").remove();
            return;
          }
          var model = scope.stdmodel;
          var mapX = scope.scr2dataX, mapY = scope.scr2dataY;
          if (model.xCursor != null) {
            var opt = model.xCursor;
            scope.svg.selectAll("#cursor_x").data([{}]).enter().append("line")
              .attr("id", "cursor_x")
              .attr("class", "plot-cursor")
              .style("stroke", opt.color)
              .style("stroke-opacity", opt.color_opacity)
              .style("stroke-width", opt.width)
              .style("stroke-dasharray", opt.stroke_dasharray);
            scope.svg.select("#cursor_x")
              .attr("x1", x).attr("y1", 0).attr("x2", x).attr("y2", H - bMargin);

            scope.jqcontainer.find("#cursor_xlabel").remove();
            var label = $("<div id='cursor_xlabel' class='plot-cursorlabel'></div>")
              .appendTo(scope.jqcontainer)
              .text(plotUtils.getTipStringPercent(mapX(x), model.xAxis));
            var w = label.outerWidth(), h = label.outerHeight();
            var p = {
              "x" : x - w / 2,
              "y" : H - bMargin - scope.labelPadding.y - h
            };
            label.css({
              "left" : p.x ,
              "top" : p.y ,
              "background-color" : opt.color != null ? opt.color : "black"
            });
          }
          if (model.yCursor != null) {
            var opt = model.yCursor;
            scope.svg.selectAll("#cursor_y").data([{}]).enter().append("line")
              .attr("id", "cursor_y")
              .attr("class", "plot-cursor")
              .style("stroke", opt.color)
              .style("stroke-opacity", opt.color_opacity)
              .style("stroke-width", opt.width)
              .style("stroke-dasharray", opt.stroke_dasharray);
            scope.svg.select("#cursor_y")
              .attr("x1", lMargin)
              .attr("y1", y)
              .attr("x2", W)
              .attr("y2", y);

            scope.jqcontainer.find("#cursor_ylabel").remove();
            var label = $("<div id='cursor_ylabel' class='plot-cursorlabel'></div>")
              .appendTo(scope.jqcontainer)
              .text(plotUtils.getTipStringPercent(mapY(y), model.yAxis));
            var w = label.outerWidth(), h = label.outerHeight();
            var p = {
              "x" : lMargin + scope.labelPadding.x,
              "y" : y - h / 2
            };
            label.css({
              "left" : p.x ,
              "top" : p.y ,
              "background-color" : opt.color != null ? opt.color : "black"
            });
          }
        };

        scope.renderLegends = function() {
          // legend redraw is controlled by legendDone
          if (scope.legendableItem === 0 ||
            scope.stdmodel.showLegend === false || scope.legendDone === true) { return; }

          var data = scope.stdmodel.data;
          var margin = scope.layout.legendMargin;

          scope.jqcontainer.find("#legends").remove();

          scope.legendDone = true;
          var legend = $("<table></table>").appendTo(scope.jqcontainer)
            .attr("id", "legends")
            .attr("class", "plot-legendcontainer")
            .draggable({
              stop : function(event, ui) {
                scope.legendPosition = {
                  "left" : ui.position.left,
                  "top" : ui.position.top
                };
              }
            });

          if (scope.legendResetPosition === true) {
            scope.legendPosition = {
              "left" : scope.jqcontainer.width() + 10,
              "top" : 0
            };
            scope.legendResetPosition = false;
          }
          legend.css(scope.legendPosition);

          if (scope.legendableItem > 1) {  // skip "All" check when there is only one line
            var unit = $("<tr></tr>").appendTo(legend)
              .attr("id", "legend_all");
            $("<input type='checkbox'></input>")
              .attr("id", "legendcheck_all")
              .attr("class", "plot-legendcheckbox")
              .prop("checked", scope.showAllItems)
              .click(function(e) {
                return scope.toggleVisibility(e);
              })
              .appendTo($("<td></td>").appendTo(unit));
            $("<span></span>")
              .attr("id", "legendbox_all")
              .attr("class", "plot-legendbox")
              .css("background-color", "none")
              .appendTo($("<td></td>").appendTo(unit));
            $("<span></span>")
              .attr("id", "legendtext_all")
              .attr("class", "plot-label")
              .text("All")
              .appendTo($("<td></td>").appendTo(unit));
            $("<td></td>").appendTo(unit);
          }

          var content = "";
          for (var i = 0; i < data.length; i++) {
            var dat = data[i];
            if (dat.legend == null || dat.legend === "") { continue; }
            var unit = $("<tr></tr>").appendTo(legend)
              .attr("id", "legend_" + i);
            // checkbox
            $("<input type='checkbox'></input>")
              .attr("id", "legendcheck_" + i)
              .attr("class", "plot-legendcheckbox")
              .prop("checked", dat.showItem)
              .click(function(e) {
                return scope.toggleVisibility(e);
              })
              .appendTo($("<td></td>").appendTo(unit));

            var clr = plotUtils.createColor(dat.color, dat.color_opacity),
                st_clr = plotUtils.createColor(dat.stroke, dat.stroke_opacity);
            var sty = dat.color == null ? "dotted " : "solid ";
            // color box
            $("<span></span>")
              .attr("id", "legendbox_" + i)
              .attr("class", "plot-legendbox")
              .attr("title", dat.color == null ? "Element-based colored item" : "")
              .css("background-color",
                dat.color == null ? "none" : clr)
              .css("border",
                dat.stroke != null ? "1px " + sty + st_clr :
                (dat.color != null ? "1px " + sty + clr : "1px dotted gray"))
              .appendTo($("<td></td>").appendTo(unit));
            // legend text
            $("<td></td>").appendTo(unit)
              .attr("id", "legendtext_" + i)
              .attr("class", "plot-label")
              .text(dat.legend);
            var lodhint = $("<td></td>").appendTo(unit)
                .attr("id", "hint_" + i);

            if (dat.isLodItem === true) {
              var light = $("<span></span>").appendTo(lodhint)
                .attr("id", "light")
                .attr("class", "plot-legendlod");
              var type = $("<span></span>").appendTo(lodhint)
                .attr("id", "type")
                .attr("class", "plot-legendlodhint")
                .css("min-width", "3em");
              var auto = $("<span></span>").appendTo(lodhint)
                .attr("id", "auto")
                .attr("class", "plot-legendlodauto")
                .css("min-width", "2em");
              scope.setLodHint(dat);
              lodhint.on('mousedown', {"dat" : dat}, function(e) {
                var dat = e.data.dat;
                e.stopPropagation();
                if (e.which === 3) {
                  if (dat.lodType === "off") { return; }
                  scope.removePipe.push("msg_lodoff");
                  scope.renderMessage("LOD is being turned off. Are you sure?",
                    [ "You are trying to turning off LOD. Loading full resolution data is " +
                    "going to take time and may potentially crash the browser.",
                    "PROCEED (left click) / CANCEL (right click)"],
                    "msg_lodoff",
                    function() {
                      dat.toggleLod(scope);
                      scope.update();
                      scope.setLodHint(dat);
                    }, null);
                }
              });
              type.on('mousedown', {"dat" : dat}, function(e) {
                if (e.which === 3) { return; }
                var dat = e.data.dat;
                if (dat.lodType === "off") {
                  dat.toggleLod(scope);
                } else {
                  dat.switchLodType(scope);
                }
                dat.zoomLevelChanged(scope);
                scope.update();
                scope.setLodHint(dat);
              });
              auto.on('mousedown', {"dat" : dat}, function(e) {
                if (e.which === 3) { return; }
                var dat = e.data.dat;
                if (dat.lodType === "off") return;
                dat.toggleLodAuto(scope);
                scope.update();
                scope.setLodHint(dat);
              });
            } else {
              $("<td></td>").appendTo(unit);
            }
          }
        };
        scope.setLodHint = function(dat) {
          var legend = scope.jqcontainer.find("#legends");
          var hint = legend.find("#hint_" + dat.index);
          var light = hint.find("#light"),
              type = hint.find("#type"),
              auto = hint.find("#auto");
          // lod hint light
          light.attr("title",
            dat.lodOn === true ? "LOD is on" : "")
          .css("background-color",
            dat.lodOn === true ? "red" : "gray")
          .css("border",
            dat.lodOn === true ? "1px solid red" : "1px solid gray");
          // lod hint text
          type.css("color", dat.lodOn === true ? "red" : "gray")
            .text(dat.lodType);
          // lod auto hint
          auto.css("color", dat.lodOn === true ? "red" : "gray")
            .text(dat.lodType === "off" ? "" : (dat.lodAuto === true ? "auto" : "on"));
        };
        scope.toggleVisibility = function(e) {
          var id = e.target.id.split("_")[1], data = scope.stdmodel.data;
          // id in the format "legendcheck_i"
          if (id == "all") {
            scope.showAllItems = !scope.showAllItems;
            
            for (var i = 0; i < data.length; i++) {
              data[i].showItem = scope.showAllItems;
              if (data[i].showItem === false) {
                data[i].clearTips(scope);
                if (data[i].isLodItem === true) {
                  data[i].lodOn = false;
                  scope.setLodHint(data[i]);
                }
              }
              scope.jqcontainer.find("#legendcheck_" + i).prop("checked", data[i].showItem);
            }
            scope.calcRange();
            scope.update();
            return;
          }
          data[id].showItem = !data[id].showItem;

          if (data[id].showItem === false) {
            data[id].clearTips(scope);
            if (data[id].isLodItem === true) {
              data[id].lodOn = false;
              scope.setLodHint(data[id]);
            }
          }
          scope.calcRange();
          scope.update();
        };

        scope.renderMessage = function(title, msgs, msgid, callbacky, callbackn) {
          var message = $("<div></div>").appendTo(scope.jqcontainer)
            .attr("id", msgid)
            .attr("class", "plot-message")
            .on('mousedown', function(e) {
              if (e.which === 3) {
                if (callbackn != null) {
                  callbackn();
                }
              } else {
                if (callbacky != null) {
                  callbacky();
                }
              }
              $(this).remove();
            });

          if (title != null && title != "") {
            $("<div></div>").appendTo(message)
              .attr("class", "plot-message-title")
              .text(title);
          }

          var content = $("<div></div>").appendTo(message)
              .attr("class", "plot-message-content");
          if (typeof(msgs) === "string") {
            msgs = [ msgs ];
          }
          for (var i = 0; i < msgs.length; i++) {
            $("<div></div>").appendTo(content)
              .text(msgs[i]);
          }

          var w = message.outerWidth(), h = message.outerHeight();
          var lMargin = scope.layout.leftLayoutMargin,
              bMargin = scope.layout.bottomLayoutMargin;
          message.css({
            "left" : (scope.jqcontainer.width() - lMargin) / 2 - w / 2 + lMargin,
            "top" : (scope.jqcontainer.height() - bMargin) / 2 - h / 2,
          });
        };

        scope.renderCoverBox = function() {
          var W = scope.jqsvg.width(), H = scope.jqsvg.height();
          plotUtils.replotSingleRect(scope.labelg, {
            "id" : "coverboxYr",
            "class" : "plot-coverbox",
            "x" : 0,
            "y" : H - scope.layout.bottomLayoutMargin,
            "width" : W,
            "height" : scope.layout.bottomLayoutMargin
          });
          plotUtils.replotSingleRect(scope.labelg, {
            "id" : "coverboxYl",
            "class" : "plot-coverbox",
            "x" : 0,
            "y" : 0,
            "width" : W,
            "height" : scope.layout.topLayoutMargin
          });
          plotUtils.replotSingleRect(scope.labelg, {
            "id" : "coverboxXl",
            "class" : "plot-coverbox",
            "x" : 0,
            "y" : 0,
            "width" : scope.layout.leftLayoutMargin,
            "height" : H
          });
          plotUtils.replotSingleRect(scope.labelg, {
            "id" : "coverboxXr",
            "class" : "plot-coverbox",
            "x" : W - scope.layout.rightLayoutMargin,
            "y" : 0,
            "width" : scope.layout.rightLayoutMargin,
            "height" : H
          });

        };
        scope.renderLocateBox = function() {
          scope.svg.selectAll("#locatebox").remove();
          if (scope.locateBox != null) {
            var box = scope.locateBox;
            scope.svg.selectAll("#locatebox").data([{}]).enter().append("rect")
              .attr("id", "locatebox")
              .attr("class", "plot-locatebox")
              .attr("x", box.x)
              .attr("y", box.y)
              .attr("width", box.w)
              .attr("height", box.h);
          }
        };
        scope.calcLocateBox = function() {
          var p1 = scope.mousep1, p2 = scope.mousep2;
          var xl = Math.min(p1.x, p2.x), xr = Math.max(p1.x, p2.x),
              yl = Math.min(p1.y, p2.y), yr = Math.max(p1.y, p2.y);
          if (xr === xl) { xr = xl + 1; }
          if (yr === yl) { yr = yl + 1; }
          scope.locateBox = {
            "x" : xl,
            "y" : yl,
            "w" : xr - xl,
            "h" : yr - yl
          };
        };
        scope.mouseDown = function() {
          if (scope.interactMode === "other") {
            return;
          }
          if (d3.event.target.nodeName.toLowerCase() === "div") {
            scope.interactMode = "other";
            scope.disableZoom();
            return;
          }
          scope.interactMode = d3.event.button == 0 ? "zoom" : "locate";
        };
        scope.mouseUp = function() {
          if (scope.interactMode === "remove") {
            scope.interactMode = "other";
            return;
          }
          if (scope.interactMode === "other") {
            scope.interactMode = "zoom";
          }
          scope.enableZoom();
        };
        scope.zoomStart = function(d) {
          if (scope.interactMode === "other") { return; }
          scope.zoomed = false;
          scope.lastx = scope.lasty = 0;
          scope.lastscale = 1.0;
          scope.zoomObj.scale(1.0);
          scope.zoomObj.translate([0, 0]);
          scope.mousep1 = {
            "x" : d3.mouse(scope.svg[0][0])[0],
            "y" : d3.mouse(scope.svg[0][0])[1]
          };
          scope.mousep2 = {};
          _.extend(scope.mousep2, scope.mousep1);
        };
        scope.zooming = function(d) {
          if (scope.interactMode === "other") { return; }
          if (scope.interactMode === "zoom") {
            // left click zoom
            var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
            var W = scope.jqsvg.width() - lMargin, H = scope.jqsvg.height() - bMargin;
            var d3trans = d3.event.translate, d3scale = d3.event.scale;
            var dx = d3trans[0] - scope.lastx, dy = d3trans[1] - scope.lasty,
                ds = this.lastscale / d3scale;
            scope.lastx = d3trans[0];
            scope.lasty = d3trans[1];
            scope.lastscale = d3scale;

            var focus = scope.focus;
            var mx = d3.mouse(scope.svg[0][0])[0], my = d3.mouse(scope.svg[0][0])[1];
            if (Math.abs(mx - scope.mousep1.x) > 0 || Math.abs(my - scope.mousep1.y) > 0) {
              scope.zoomed = true;
            }
            if (ds == 1.0) {
              // translate only
              var tx = -dx / W * focus.xspan, ty = dy / H * focus.yspan;
              if (focus.xl + tx >= 0 && focus.xr + tx <= 1) {
                focus.xl += tx;
                focus.xr += tx;
              } else {
                if (focus.xl + tx < 0) {
                  focus.xl = 0;
                  focus.xr = focus.xl + focus.xspan;
                } else if (focus.xr + tx > 1) {
                  focus.xr = 1;
                  focus.xl = focus.xr - focus.xspan;
                }
              }
              if (focus.yl + ty >= 0 && focus.yr + ty <= 1) {
                focus.yl += ty;
                focus.yr += ty;
              } else {
                if (focus.yl + ty < 0) {
                  focus.yl = 0;
                  focus.yr = focus.yl + focus.yspan;
                } else if (focus.yr + ty > 1) {
                  focus.yr = 1;
                  focus.yl = focus.yr - focus.yspan;
                }
              }
              scope.jqsvg.css("cursor", "move");
            } else {
              // scale only
              var level = scope.zoomLevel;
              if (my <= scope.jqsvg.height() - scope.layout.bottomLayoutMargin) {
                // scale y
                var ym = focus.yl + scope.scr2dataYp(my) * focus.yspan;
                var nyl = ym - ds * (ym - focus.yl), nyr = ym + ds * (focus.yr - ym),
                    nyspan = nyr - nyl;

                if (nyspan >= level.minSpanY && nyspan <= level.maxScaleY) {
                  focus.yl = nyl;
                  focus.yr = nyr;
                  focus.yspan = nyspan;
                } else {
                  if (nyspan > level.maxScaleY) {
                    focus.yr = focus.yl + level.maxScaleY;
                  } else if (nyspan < level.minSpanY) {
                    focus.yr = focus.yl + level.minSpanY;
                  }
                  focus.yspan = focus.yr - focus.yl;
                }
              }
              if (mx >= scope.layout.leftLayoutMargin) {
                // scale x
                var xm = focus.xl + scope.scr2dataXp(mx) * focus.xspan;
                var nxl = xm - ds * (xm - focus.xl), nxr = xm + ds * (focus.xr - xm),
                    nxspan = nxr - nxl;
                if (nxspan >= level.minSpanX && nxspan <= level.maxScaleX) {
                  focus.xl = nxl;
                  focus.xr = nxr;
                  focus.xspan = nxspan;
                } else {
                  if (nxspan > level.maxScaleX) {
                    focus.xr = focus.xl + level.maxScaleX;
                  } else if (nxspan < level.minSpanX) {
                    focus.xr = focus.xl + level.minSpanX;
                  }
                  focus.xspan = focus.xr - focus.xl;
                }
              }
              scope.emitZoomLevelChange();
              scope.fixFocus(focus);
            }
            scope.calcMapping(true);
            scope.renderCursor({
              offsetX : mx,
              offsetY : my
            });
            scope.update();
          } else if (scope.interactMode === "locate") {
            // right click zoom
            scope.mousep2 = {
              "x" : d3.mouse(scope.svg[0][0])[0],
              "y" : d3.mouse(scope.svg[0][0])[1]
            };
            scope.calcLocateBox();
            scope.rpipeRects = [];
            scope.renderLocateBox();
          }
        };
        scope.zoomEnd = function(d) {
          scope.zoomObj.scale(1.0);
          scope.zoomObj.translate([0, 0]);
          if (scope.interactMode === "locate") {
            scope.locateFocus();
            scope.locateBox = null;
            scope.update();
            scope.interactMode = "zoom";
          }
          scope.jqsvg.css("cursor", "auto");
        };
        scope.fixFocus = function(focus) {
          focus.xl = focus.xl < 0 ? 0 : focus.xl;
          focus.xr = focus.xr > 1 ? 1 : focus.xr;
          focus.yl = focus.yl < 0 ? 0 : focus.yl;
          focus.yr = focus.yr > 1 ? 1 : focus.yr;
          focus.xspan = focus.xr - focus.xl;
          focus.yspan = focus.yr - focus.yl;

          if (focus.xl > focus.xr || focus.yl > focus.yr) {
            console.error("visible range specified does not match data range, " +
                "enforcing visible range");
            _.extend(focus, scope.defaultFocus);
          }
        };
        scope.resetFocus = function() {
          var mx = d3.mouse(scope.svg[0][0])[0], my = d3.mouse(scope.svg[0][0])[1];
          var lMargin = scope.layout.leftLayoutMargin, bMargin = scope.layout.bottomLayoutMargin;
          var W = scope.jqsvg.width(), H = scope.jqsvg.height();
          if (mx < lMargin && my < H - bMargin) {
            _.extend(scope.focus, _.pick(scope.defaultFocus, "yl", "yr", "yspan"));
          } else if (my > H - bMargin && mx > lMargin) {
            _.extend(scope.focus, _.pick(scope.defaultFocus, "xl", "xr", "xspan"));
          } else {
            _.extend(scope.focus, scope.defaultFocus);
          }
          scope.fixFocus(scope.focus);
          scope.calcMapping(true);
          scope.emitZoomLevelChange();
          scope.update();
        };
        scope.locateFocus = function() {
          var box = scope.locateBox;
          if (box == null) {
            return;
          }
          var p1 = {
            "x" : scope.scr2dataXp(box.x),
            "y" : scope.scr2dataYp(box.y)
          };
          var p2 = {
            "x" : scope.scr2dataXp(box.x + box.w),
            "y" : scope.scr2dataYp(box.y + box.h)
          };
          p1.x = Math.max(0, p1.x);
          p1.y = Math.max(0, p1.y);
          p2.x = Math.min(1, p2.x);
          p2.y = Math.min(1, p2.y);

          var focus = scope.focus, ofocus = {};
          _.extend(ofocus, scope.focus);
          focus.xl = ofocus.xl + ofocus.xspan * p1.x;
          focus.xr = ofocus.xl + ofocus.xspan * p2.x;
          focus.yl = ofocus.yl + ofocus.yspan * p2.y;
          focus.yr = ofocus.yl + ofocus.yspan * p1.y;
          focus.xspan = focus.xr - focus.xl;
          focus.yspan = focus.yr - focus.yl;
          scope.calcMapping(true);
          scope.emitZoomLevelChange();
        };
        scope.resetSvg = function() {
          scope.jqcontainer.find(".plot-constlabel").remove();

          scope.rpipeGridlines = [];
          scope.rpipeTexts = [];
        };
        scope.enableZoom = function() {
          scope.svg.call(scope.zoomObj.on("zoomstart", function(d) {
            return scope.zoomStart(d);
          }).on("zoom", function(d) {
            return scope.zooming(d);
          }).on("zoomend", function(d) {
            return scope.zoomEnd(d);
          }));
          scope.svg.on("dblclick.zoom", function() {
            return scope.resetFocus();
          });
        };
        scope.disableZoom = function() {
          scope.svg.call(scope.zoomObj.on("zoomstart", null).on("zoom", null).on("zoomend", null));
        };

        scope.mouseleaveClear = function() {
          scope.svg.selectAll(".plot-cursor").remove();
          scope.jqcontainer.find(".plot-cursorlabel").remove();
        };

        scope.calcMapping = function(emitFocusUpdate) {
          // called every time after the focus is changed
          var focus = scope.focus;
          var lMargin = scope.layout.leftLayoutMargin,
              bMargin = scope.layout.bottomLayoutMargin,
              tMargin = scope.layout.topLayoutMargin,
              rMargin = scope.layout.rightLayoutMargin;
          var model = scope.stdmodel;
          var W = scope.jqsvg.width(), H = scope.jqsvg.height();
          if (emitFocusUpdate == true && scope.model.updateFocus != null) {
            scope.model.updateFocus({
              "xl" : focus.xl,
              "xr" : focus.xr
            });
          }
          scope.data2scrY =
            d3.scale.linear().domain([focus.yl, focus.yr]).range([H - bMargin, tMargin]);
          scope.data2scrYp =
            d3.scale.linear().domain([focus.yl, focus.yr]).range([1, 0]);
          scope.scr2dataY =
            d3.scale.linear().domain([tMargin, H - bMargin]).range([focus.yr, focus.yl]);
          scope.scr2dataYp =
            d3.scale.linear().domain([tMargin, H - bMargin]).range([1, 0]);
          scope.data2scrX =
            d3.scale.linear().domain([focus.xl, focus.xr]).range([lMargin, W - rMargin]);
          scope.data2scrXp =
            d3.scale.linear().domain([focus.xl, focus.xr]).range([0, 1]);
          scope.scr2dataX =
            d3.scale.linear().domain([lMargin, W-rMargin]).range([focus.xl, focus.xr]);
          scope.scr2dataXp =
            d3.scale.linear().domain([lMargin, W-rMargin]).range([0, 1]);

          scope.data2scrXi = function(val) {
            return Number(scope.data2scrX(val).toFixed(scope.renderFixed));
          };
          scope.data2scrYi = function(val) {
            return Number(scope.data2scrY(val).toFixed(scope.renderFixed));
          };
        };

        scope.standardizeData = function() {
          var model = scope.model.getCellModel();
          scope.stdmodel = plotFormatter.standardizeModel(model);
        };

        scope.dumpState = function() {
          var state = {};

          state.showAllItems = scope.showAllItems;
          state.plotSize = scope.plotSize;
          state.zoomed = scope.zoomed;
          state.focus = scope.focus;
          
          state.lodOn = [];
          state.lodType = [];
          state.lodAuto = [];
          state.zoomHash = [];
          state.showItem = [];
          var data = scope.stdmodel.data;
          for (var i = 0; i < data.length; i++) {
            state.lodOn[i] = data[i].lodType;
            state.lodType[i] = data[i].lodType;
            state.lodAuto[i] = data[i].lodAuto;
            state.zoomHash[i] = data[i].zoomHash;
            state.showItem[i] = data[i].showItem;
          }
          state.visibleItem = scope.visibleItem;
          state.legendableItem = scope.legendableItem;
          state.defaultFocus = scope.defaultFocus;
          return state;
        };

        scope.loadState = function(state) {
          scope.showAllItems = state.showAllItems;
          scope.plotSize = state.plotSize;
          scope.zoomed = state.zoomed;
          scope.focus = state.focus;
          var data = scope.stdmodel.data;
          for (var i = 0; i < data.length; i++) {
            data[i].lodOn = state.lodOn[i];
            if (state.lodOn[i]) {
              data[i].applyLodType(state.lodType[i]);
              data[i].applyLodAuto(state.lodAuto[i]);
              data[i].applyZoomHash(state.zoomHash[i]);
            }
            data[i].showItem = state.showItem[i];
          }
          scope.visibleItem = state.visibleItem;
          scope.legendableItem = state.legendableItem;
          scope.defaultFocus = state.defaultFocus;
          scope.fixFocus(scope.defaultFocus);
        };

        scope.initFlags = function() {
          scope.showAllItems = true;
          scope.showLodHint = true;
          scope.showUnorderedHint = true;
        };

        scope.clearRemovePipe = function() {
          // some hints are set to be removed at the end of the next rendering cycle
          for (var i = 0; i < scope.removePipe.length; i++) {
            var id = scope.removePipe[i];
            scope.jqcontainer.find("#" + id).remove();
          }
          scope.removePipe.length = 0;
        };

        scope.init = function() {

          // first standardize data
          scope.standardizeData();
          // init flags
          scope.initFlags();
          
          // see if previous state can be applied
          scope.focus = {};
          scope.tips = {};
          scope.plotSize = {};
          
          _(scope.plotSize).extend(scope.stdmodel.plotSize);

          // create layout elements
          scope.initLayout();

          scope.resetSvg();
          scope.zoomObj = d3.behavior.zoom();

          // set zoom object
          scope.svg.on("mousedown", function() {
            return scope.mouseDown();
          }).on("mouseup", function() {
            return scope.mouseUp();
          });
          scope.jqsvg.mousemove(function(e) {
            return scope.renderCursor(e);
          }).mouseleave(function(e) {
            return scope.mouseleaveClear(e);
          });
          scope.enableZoom();
          scope.calcRange();
          
          // init copies focus to defaultFocus, called only once
          _(scope.focus).extend(scope.defaultFocus);

          // init remove pipe
          scope.removePipe = [];

          if (scope.model.getDumpState !== undefined) {
            var savedstate = scope.model.getDumpState();
            if (savedstate !== undefined && savedstate.plotSize !== undefined) {
              scope.loadState(savedstate);
            } else {
              scope.model.setDumpState(scope.dumpState());
            }
          }
          scope.calcMapping();
          scope.update();
        };

        scope.update = function(first) {
          scope.resetSvg();
          scope.calcGridlines();
          scope.renderGridlines();
          plotUtils.plotGridlines(scope);

          scope.renderData();
          scope.renderGridlineLabels();
          scope.renderCoverBox(); // redraw
          plotUtils.plotLabels(scope); // redraw

          scope.renderTips();
          scope.renderLocateBox(); // redraw
          scope.renderLegends(); // redraw

          scope.prepareInteraction();

          scope.clearRemovePipe();
        };
        
        if (scope.model.getDumpState !== undefined) {
          scope.getDumpState = function() {
            return scope.model.getDumpState();
          };
        }

        scope.init(); // initialize

        if (scope.model.getDumpState !== undefined) {
          scope.$watch('getDumpState()', function(result) {
            if (result !== undefined && result.plotSize === undefined) {
              scope.model.setDumpState(scope.dumpState());
            }
          });
        }
        
        scope.getCellModel = function() {
          return scope.model.getCellModel();
        };
        scope.$watch('getCellModel()', function() {
          scope.init();
        });
        
        scope.$on('$destroy', function() {     
          $(window).off('resize',scope.resizeFunction);
          scope.svg.selectAll("*").remove();
        });
        
      }
    };
  };
  beaker.bkoDirective("Plot", ["plotUtils", "plotFormatter", "plotFactory", "bkCellMenuPluginManager", retfunc]);
})();

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

/*
 * bkoCombinedPlot
 * This is the output display component for displaying multiple Plots
 */

(function() {
  'use strict';
  var retfunc = function(plotUtils, combinedplotFormatter, bkCellMenuPluginManager) {
    var CELL_TYPE = "bko-combinedplot";
    return {
      template :  "<div id='combplotTitle' class='plot-title'></div>" +
          "<div id='combplotContainer' class='combplot-plotcontainer'>" +
          "<bk-output-display type='Plot' ng-repeat='m in models' model='m'></bk-output-display>" +
          "</div>",
      controller : function($scope) {
        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch("getShareMenuPlugin()", function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });
      },
      link : function(scope, element, attrs) {
        scope.initLayout = function() {
          var model = scope.stdmodel;
          if (model.title != null) {
            element.find("#combplotTitle").text(model.title).css("width", scope.width);
          }
        };

        scope.standardizeData = function() {
          var model = scope.model.getCellModel();
          scope.stdmodel = combinedplotFormatter.standardizeModel(model);
        };

        scope.prepareSavedState = function(state) {
          state.focus = scope.calcRange();
          scope.width = scope.stdmodel.plotSize.width;
        };

        scope.applySavedState = function(state) {
          scope.state = state;
          scope.width = state.width;
        };

        scope.preparePlotModels = function() {
          var models = [];
          var plots = scope.stdmodel.plots;
          
          // create a plot model and a saved state for each plot
          for (var i = 0; i < plots.length; i++) {

            var plotmodel = plots[i];
            plotmodel.plotIndex = i;
            var pl = {
              model : plotmodel,
              state : { },
              getCellModel : function() {
                return this.model;
              },
              getDumpState: function() {
                return this.state;
              },
              setDumpState: function(s) {
                this.state = s;
                if (scope.model.setDumpState !== undefined) {
                  scope.model.setDumpState(scope.dumpState());
                }
              },
              resetShareMenuItems : function() {
              },
              getFocus : function() {
                return scope.focus;
              },
              updateFocus : function(focus) {
                scope.focus = {};
                _(scope.focus).extend(focus);
                scope.$apply();
              },
              updateWidth : function(width) {
                scope.width = width;
                element.find("#combplotTitle").css("width", width);
                scope.$apply();
              },
              getWidth : function() {
                return scope.width;
              }
            };
            models.push(pl);
          }
          scope.models = models;
        };

        scope.calcRange = function() {
          var xl = 1E100, xr = 0;
          var plots = scope.stdmodel.plots;
          for (var i = 0; i < plots.length; i++) {
            var plotmodel = plots[i]; // models are already standardized at this point
            var ret = plotUtils.getDefaultFocus(plotmodel);
            xl = Math.min(xl, ret.defaultFocus.xl);
            xr = Math.max(xr, ret.defaultFocus.xr);
          }
          return {
            "xl" : xl,
            "xr" : xr
          };
        };

        scope.dumpState = function() {
          var ret = { };
          ret.focus = scope.focus;
          ret.width = scope.width;
          ret.subplots = [];
          for (var i = 0; i < scope.models.length; i++) {
            ret.subplots.push(scope.models[i].state);
          }
          return ret;
        };
        
        scope.init = function() {
          scope.standardizeData();
          scope.preparePlotModels();
          scope.initLayout();
          scope.calcRange();

          if (scope.model.getDumpState !== undefined) {
            var savedstate = scope.model.getDumpState();
            if (savedstate !== undefined && savedstate.subplots !== undefined) {
              for (var i = 0; i < scope.models.length; i++) {
                scope.models[i].state = savedstate.subplots[i];
              }
              scope.width = savedstate.width;
              scope.focus = savedstate.focus;
            } else if (scope.models !== undefined) {
              scope.focus = scope.calcRange();
              for (var i = 0; i < scope.models.length; i++) {
                scope.models[i].state = { };
              }
              scope.model.setDumpState(scope.dumpState());
            }
          }
        };

        if (scope.model.getDumpState !== undefined) {
          scope.getDumpState = function() {
            return scope.model.getDumpState();
          };
        }

        scope.init();

        if (scope.model.getDumpState !== undefined) {
          scope.$watch('getDumpState()', function(result) {
            if (result !== undefined && result.subplots === undefined && scope.models !== undefined) {
              for (var i = 0; i < scope.models.length; i++) {
                scope.models[i].state = { };
              }
              scope.model.setDumpState(scope.dumpState());
            }
          });
        }

        scope.getCellModel = function() {
          return scope.model.getCellModel();
        };
        scope.$watch('getCellModel()', function() {
          scope.init();
        });

      }
    };
  };
  beaker.bkoDirective("CombinedPlot",
      ["plotUtils", "combinedplotFormatter", "bkCellMenuPluginManager", retfunc]);
})();

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

(function () {
  'use strict';
  beaker.bkoDirective("BeakerDashboard", [ "$timeout", "bkEvaluatorManager", function ($timeout, bkEvaluatorManager) {
    return {
      template:
        '<script type="text/ng-template" id="rowrender.html">' +
        '  <div ng-repeat="c in r.cols" class="col-md-{{c.width}}" ng-class="c.theclass" style="{{c.thestyle}}">'+
        '    <div ng-repeat="p in c.payload">' +
        '      <div class="row" ng-class="p.theclass" style="{{p.thestyle}}" ng-if="p.rows !== undefined" ng-model="p" ng-include="\'rowrender.html\'"></div>'+
        '      <div><bk-code-cell-output ng-if="p.rows === undefined" model="p"></bk-code-cell-output></div>'+
        '    <div>' +
        '  </div>'+
        '</script>' +
        '<div>' +
        '  <button ng-click="fullscreen()">Go FullScreen</button>'+
        '  <div id="{{theid}}" class="html5-fullscreen-api" ng-class="theclass" style="{{data.thestyle}}">'+
        '    <div class="row" ng-class="r.theclass" style="{{r.thestyle}}" ng-repeat="r in data.rows" ng-include="\'rowrender.html\'">'+
        '    </div>'+
        '  </div>'+
        '</div>',

      scope : {
        model: '=model'
      },

      controller: function ($scope) {
        $scope.content = [];

        $scope.theid = Math.random().toString(36).substring(7);

        $scope.wrapCol = function(r) {
          var ret = { };
          ret.payload = [];
          ret.theclass = r.theclass;
          ret.thestyle = r.thestyle;
          ret.width    = r.width;

          var i;
          for (i=0; i<r.payload.length; i++) {
            if (r.payload[i].rows !== undefined)
              ret.payload.push($scope.wrapRow(r.payload[i]));
            else {
              var o = {
                result: r.payload[i],
                cellmodel: {
                  output: {
                    hidden: false
                  }
                }
              };
              ret.payload.push(o);
            }
          }
          return ret;
        };

        $scope.wrapRow = function(r) {
          var ret = { };
          ret.cols = [];
          ret.theclass = r.theclass;
          ret.thestyle = r.thestyle;
          var i;
          for (i=0; i<r.cols.length; i++)
            ret.cols.push($scope.wrapCol(r.cols[i]));
          return ret;
        };

        $scope.getUpdateService = function() {
          if (window !== undefined && window.languageUpdateService !== undefined && bkEvaluatorManager.getEvaluator($scope.model.getEvaluatorId())!==undefined)
            return window.languageUpdateService[$scope.model.getEvaluatorId()];
          return undefined;
        };

        $scope.ingestUpdate = function(data) {
          $scope.data = { };
          $scope.data.rows = [];

          if (data.rows !== undefined) {
            var i;
            for (i=0; i<data.rows.length; i++)
              $scope.data.rows.push($scope.wrapRow(data.rows[i]));
          }

          $scope.cellmodel = $scope.model.getCellModel();
          if ($scope.cellmodel.output === undefined) {
            $scope.cellmodel.output = {
              hidden: false
            };
          }
          $scope.data.theclass  = data.theclass;
          $scope.data.thestyle  = data.thestyle;
          $scope.update_id = data.update_id;

          var srv = $scope.getUpdateService();
          if ($scope.subscribedId && $scope.subscribedId !== $scope.update_id) {
            if (srv !== undefined)
              srv.unsubscribe($scope.subscribedId);
            $scope.subscribedId = null;
          }
          if (!$scope.subscribedId && $scope.update_id && srv !== undefined) {
            var onUpdate = function(update) {
              $scope.ingestUpdate(update);
              $scope.$digest();
            };
            srv.subscribe($scope.update_id, onUpdate);
            $scope.subscribedId = $scope.update_id;
          }
        };

        $scope.$on('$destroy', function () {
          if ($scope.subscribedId) {
            var srv = $scope.getUpdateService();
            if (srv !== undefined) {
              srv.unsubscribe($scope.subscribedId);
            }
          }
        });

        $scope.fullscreen = function() {
          var elem = document.getElementById($scope.theid);
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
          }
        };

        $scope.isShowMenu = function() {
          return false;
        };

      },
      link: function (scope, element, attrs) {
        scope.getState = function() {
          return scope.model.getCellModel();
        };

        scope.$watch('getState()', function(result) {
          if (result == void 0) {
            return ;
          }
          scope.ingestUpdate(result);
        });

      }
    };
  }]);
  beaker.registerOutputDisplay("BeakerDashboard", ["BeakerDashboard", "Text"]);
})();

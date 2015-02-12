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
    $.fn.dataTable.moment = function ( format, locale ) {
        var types = $.fn.dataTable.ext.type;
        // Add type detection
        types.detect.unshift( function ( d ) {
            // Null and empty values are acceptable
            if ( d === '' || d === null ) {
                return 'moment-'+format;
            }
            return moment( d, format, locale, true ).isValid() ?
                'moment-'+format :
                null;
        } );
        // Add sorting method - use an integer for the sorting
        types.order[ 'moment-'+format+'-pre' ] = function ( d ) {
            return d === '' || d === null ?
                -Infinity :
                parseInt( moment( d, format, locale, true ).format( 'x' ), 10 );
        };
    };
  }(jQuery));
  
  $.fn.dataTable.moment( 'YYYYMMDD HH:mm:ss' );
  $.fn.dataTable.moment( 'YYYYMMDD' );
  $.fn.dataTable.moment( 'DD/MM/YYYY' );

  // detect and sort by file size
  jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "file-size-pre": function ( a ) {
        var x = a.substring(0,a.length - 2);
        var x_unit = (a.substring(a.length - 2, a.length).toLowerCase() == "mb" ?
            1000 : (a.substring(a.length - 2, a.length).toLowerCase() == "gb" ? 1000000 : 1));
        return parseInt( x * x_unit, 10 );
    },
    "file-size-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "file-size-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
  } );
  
  jQuery.fn.dataTableExt.aTypes.unshift( function ( sData ) {
    if (typeof sData !== 'string')
      return;
        
    var sValidChars = "0123456789";
    var Char;
   
    /* Check the numeric part */
    for ( var i=0 ; i<(sData.length - 3) ; i++ ) {
      Char = sData.charAt(i);
      if (sValidChars.indexOf(Char) == -1) {
        return null;
      }
    }
    /* Check for size unit KB, MB or GB */
    if ( sData.substring(sData.length - 2, sData.length).toLowerCase() == "kb"
      || sData.substring(sData.length - 2, sData.length).toLowerCase() == "mb"
        || sData.substring(sData.length - 2, sData.length).toLowerCase() == "gb" ) {
      return 'file-size';
    }
    return null;
  } );
  
  // detect and sort by IP addresses
  jQuery.fn.dataTableExt.aTypes.unshift( function ( sData ) {
    if (/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(sData)) {
      return 'ip-address';
    }
    return null;
  } );
  
  jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "ip-address-pre": function ( a ) {
      var m = a.split("."), x = "";
      for(var i = 0; i < m.length; i++) {
        var item = m[i];
        if(item.length == 1) {
          x += "00" + item;
        } else if(item.length == 2) {
          x += "0" + item;
        } else {
          x += item;
        }
      }
      return x;
    },
    "ip-address-asc": function ( a, b ) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "ip-address-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
  } );
  
  beaker.bkoDirective('Table', ["bkCellMenuPluginManager", "bkUtils", '$interval', function(bkCellMenuPluginManager, bkUtils, $interval) {
    var CELL_TYPE = "bko-tabledisplay";
    return {
      template: '<div style="float: right; width: 50px;">&nbsp;</div>' +
                '<div class="dropdown dtmenu" ng-if="renderMenu()">' +
                '  <a class=" dropdown-toggle dtmenu" data-toggle="dropdown">' +
                '  Edit ' +
                '  </a>' +
                '  <ul class="dropdown-menu" role="menu" submenu-classes="drop-left" aria-labelledby="dLabel">' +
                '    <li ng-repeat="menuidx in getEditMenuIdx">' +
                '      <a tabindex="-1" href="#" ng-click="doEditMenu(menuidx)" id="edit-{{menuidx}}-menuitem" eat-click>' +
                '        {{ getEditMenuNam[menuidx] }}' +
                '      </a>' +
                '    </li>' +
                '  </ul>' +
                '</div>' +
                '<div class="dropdown dtmenu" ng-if="renderMenu()">' +
                '  <a class=" dropdown-toggle dtmenu" data-toggle="dropdown">' +
                '  Show/Hide ' +
                '  </a>' +
                '  <ul class="dropdown-menu" role="menu" submenu-classes="drop-left" aria-labelledby="dLabel2">' +
                '    <li ng-repeat="menuidx in getCellMenuIdx">' +
                '      <a tabindex="-1" href="#" ng-click="doCellMenu(menuidx)" id="show-{{menuidx}}-menuitem" eat-click>' +
                '        {{ getCellMenuNam[menuidx] }}' +
                '        <i class="fa fa-check" ng-show="getCellMenuSho[menuidx]"></i>' +
                '      </a>' +
                '    </li>' +
                '  </ul>' +
                '</div>' +
                '<div class="dropdown dtmenu" ng-if="renderMenu()">' +
                '  <a class=" dropdown-toggle dtmenu" data-toggle="dropdown">' +
                '  Display as ' +
                '  </a>' +
                '  <ul class="dropdown-menu" role="menu" submenu-classes="drop-left" aria-labelledby="dLabel3">' +
                '    <li ng-repeat="menuidx in getDisplayMenuIdx">' +
                '      <a tabindex="-1" href="#" ng-click="doDisplayMenu(menuidx)" id="display-{{menuidx}}-menuitem" eat-click>' +
                '        {{ getDisplayMenuNam[menuidx] }}' +
               // '    <select ng-model="getDisplayMenuVal[menuidx]" ng-change="updateDisplay(menuidx)"><option ng-repeat="item in getDisplayMenuOpt[menuidx]" value="item.type">{{ item.name }}</option></select>' +
                '    <select ng-model="getDisplayMenuVal[menuidx]" ng-change="updateDisplay(menuidx)" ng-options="item.type as item.name for item in getDisplayMenuOpt[menuidx]"></select>' +
                '      </a>' +
                '    </li>' +
                '  </ul>' +
                '</div>' +
                '<div class="dropdown dtmenu" ng-if="renderMenu()">' +
                '  <a class=" dropdown-toggle dtmenu" data-toggle="dropdown">' +
                '  Sort ' +
                '  </a>' +
                '  <ul class="dropdown-menu" role="menu" submenu-classes="drop-left" aria-labelledby="dLabel4">' +
                '    <li>' +
                '      <a tabindex="-1" href="#" ng-click="doClearSort()" id="clrsort-menuitem" eat-click>' +
                '        Reset Sort' +
                '      </a>' +
                '    </li>' +
                '  </ul>' +
                '</div>' +
                '<div class="dropdown dtmenu" ng-if="renderMenu()">' +
                '  <a class=" dropdown-toggle dtmenu" data-toggle="dropdown">' +
                '  Export ' +
                '  </a>' +
                '  <ul class="dropdown-menu" role="menu" submenu-classes="drop-left" aria-labelledby="dLabel5">' +
                '    <li>' +
                '      <a tabindex="-1" href="#" ng-click="doCSVExport(false)" id="export-menuitem" eat-click>' +
                '        All as CSV' +
                '      </a>' +
                '      <a tabindex="-1" href="#" ng-click="doCSVExport(true)" id="export-menuitem" eat-click>' +
                '        Selected as CSV' +
                '      </a>' +
                '    </li>' +
                '  </ul>' +
                '</div>' +
                '<table cellpadding="0" class="display" border="0" cellspacing="0" id="{{id}}"></table>',
      controller: function($scope) {

        $scope.id = "table_" + bkUtils.generateId(6);

        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch("getShareMenuPlugin()", function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });
        $scope.convertToCSV = function(data) {
          var i, j;
          var out = "";
          
          for(j=1; j<$scope.columns.length; j++) {
            if (j>1)
              out = out + '\t';
            out = out + '"' + $scope.columns[j].title.replace(/"/g, '""') + '"';
          }          
          out = out + '\n';

          for(i=0; i<data.length; i++) {
            var row = data[i];
            for(j=1; j<row.length; j++) {
              if (j>1)
                out = out + '\t';
              out = out + '"' + row[j].replace(/"/g, '""') + '"';
            }
            out = out + '\n';
          }
          return out;
        };

        $scope.renderMenu = function() {
          return $scope.table !== undefined;
        };
        
        $scope.getEditMenuIdx =  [0, 1, 2, 3];
        $scope.getEditMenuNam =  ['Select All', 'Deselect All', 'Reverse Selection', 'Copy to Clipboard'];
        $scope.doEditMenu = function(idx) {
          if ($scope.table === undefined)
            return;
          
          if (idx==0) {
            $scope.table.rows().nodes().to$().removeClass("selected");
            $scope.table.rows().nodes().to$().addClass("selected");
          } else if(idx==1) {
            $scope.table.rows().nodes().to$().removeClass("selected");   
          } else if(idx==2) {
            $scope.table.rows().nodes().to$().toggleClass("selected");   
          } else if(idx==3) {
            var data = $scope.table.rows(".selected").data();
            var out = $scope.convertToCSV(data);
            // WARNING: the only good solution is to use flash
            window.prompt("Copy to clipboard:", out);
          }
          console.log(idx);
        };

        $scope.getCellMenuIdx =  [];
        $scope.getCellMenuNam =  [];
        $scope.getCellMenuSho =  [];
        $scope.refreshCellMenu = function() {
          $scope.getCellMenuIdx =  [0];
          $scope.getCellMenuNam =  ['Show all'];
          $scope.getCellMenuSho =  [true];
          if ($scope.table === undefined)
            return;
          var i;
          var order = $scope.colreorg.fnOrder();
          for(i=1; i<$scope.columns.length; i++) {
            $scope.getCellMenuIdx.push(i);
            $scope.getCellMenuNam.push('Show col '+$scope.columns[order[i]].title);
            $scope.getCellMenuSho.push($scope.table.column(order[i]).visible());
            if (!$scope.table.column(order[i]).visible()) {
              $scope.getCellMenuSho[0] = false;
            }
          }
        };
        $scope.doCellMenu = function(idx) {
          if ($scope.table === undefined)
            return;
          
          if (idx==0) {
            for(idx = 1; idx<$scope.getCellMenuSho.length; idx++) {
              $scope.table.column(idx).visible( true, false );
              $scope.getCellMenuSho[idx] = true;
            }
            $scope.getCellMenuSho[0] = true;
            $scope.table.columns.adjust().draw( false );
            return;
          }
          var order = $scope.colreorg.fnOrder();
          if ($scope.getCellMenuSho[idx]) {
            $scope.table.column(idx).visible( false );
            $scope.getCellMenuSho[idx] = false;
            $scope.getCellMenuSho[0] = false;
          } else {
            $scope.table.column(idx).visible( true );
            $scope.getCellMenuSho[idx] = true;
            $scope.getCellMenuSho[0] = true;
            for (idx=1; idx<$scope.getCellMenuSho.length; idx++) {
              if (!$scope.getCellMenuSho[idx]) {
                $scope.getCellMenuSho[0] = false;
                break;
              }
            }
          }
        };
        
        $scope.doClearSort = function() {
          if ($scope.table === undefined)
            return;
          $scope.table.order( [ 0, 'asc' ] ).draw();
        };
        
        $scope.doCSVExport = function(all) {
          var data;
          if (!all)
            data = $scope.table.rows().data();
          else
            data = $scope.table.rows(".selected").data();
          var out = $scope.convertToCSV(data);
          bkHelper.selectFile(function(n) {
            var suffix = ".csv";
            if(n === undefined)
              return;
            if (n.indexOf(suffix,n.length-suffix.length) === -1)
              n = n + suffix;
            // TODO check for error
            return bkHelper.saveFile(n,out);
          } , "Select name for CSV file to save", "csv");
        };
        
        $scope.getDisplayMenuIdx =  [];
        $scope.getDisplayMenuNam =  [];
        $scope.getDisplayMenuVal =  [];
        $scope.getDisplayMenuOpt =  [];
        $scope.allTypes = [ { type: 0, name: 'string'},
                            { type: 1, name: 'integer'},
                            { type: 2, name: 'formatted integer'},
                            { type: 3, name: 'double'},
                            { type: 4, name: 'double 2 decimals'},
                            { type: 5, name: 'double 4 decimals'},
                            { type: 6, name: 'scientific'},
                            { type: 7, name: 'time'},
                            { type: 8, name: 'boolean'} ];
        $scope.allConverters = [
                                // string
                                undefined,
                                // integer
                                function(value,type,full,meta) {
                                  return parseInt(value);
                                },
                                // formatted integer
                                function(value,type,full,meta) {
                                  var x = parseInt(value);
                                  if (x !== 'NaN')
                                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                  return x;
                                },
                                // double
                                function(value,type,full,meta) {
                                  return parseFloat(value);
                                },
                                // double 2 decimals
                                function(value,type,full,meta) {
                                  return parseFloat(value).toFixed(2);
                                },
                                // double 4 decimals
                                function(value,type,full,meta) {
                                  return parseFloat(value).toFixed(4);
                                },
                                // scientific
                                function(value,type,full,meta) {
                                  return parseFloat(value).toExponential();
                                },
                                // time
                                function(value,type,full,meta) {
                                  if ($scope.timeStrings)
                                    return $scope.timeStrings[meta.row];
                                  var nano = value % 1000;
                                  var micro = (value / 1000) % 1000;
                                  var milli = value / 1000 / 1000;
                                  var time = moment(milli);
                                  var tz = $scope.tz;
                                  if (tz)
                                    time.tz(tz);
                                  return time.format("YYYYMMDD HH:mm:ss.SSS");
                                },
                                // boolean
                                function(value,type,full,meta) {
                                  if (value.toLowerCase() === 'true' || value === '1')
                                    return 'true';
                                  return 'false';
                                }
                                ];
        $scope.allStringTypes = [ { type: 0, name: 'string'} ];
        $scope.allIntTypes = [ { type: 0, name: 'string'},
                               { type: 1, name: 'integer'},
                               { type: 2, name: 'formatted integer'},
                               { type: 7, name: 'time'} ];
        $scope.allDoubleTypes = [ { type: 0, name: 'string'},
                                  { type: 3, name: 'double'},
                                  { type: 4, name: 'double 2 decimals'},
                                  { type: 5, name: 'double 4 decimals'},
                                  { type: 6, name: 'scientific'} ];
        $scope.allBoolTypes = [ { type: 0, name: 'string'},
                                { type: 8, name: 'boolean'} ];
        
        
        $scope.refreshDisplayMenu = function() {
          $scope.getDisplayMenuIdx =  [];
          $scope.getDisplayMenuNam =  [];
          $scope.getDisplayMenuVal =  [];
          $scope.getDisplayMenuOpt =  [];
          if ($scope.table === undefined)
            return;
          var i;
          var order = $scope.colreorg.fnOrder();
          for(i=1; i<$scope.columns.length; i++) {
            $scope.getDisplayMenuIdx.push(i-1);
            $scope.getDisplayMenuVal.push($scope.actualtype[order[i]]);
            $scope.getDisplayMenuNam.push($scope.columns[order[i]].title +' as ');
            if ($scope.types) {
              if ($scope.types[order[i]-1] === 'string') {
                $scope.getDisplayMenuOpt.push($scope.allStringTypes);
              } else if ($scope.types[order[i]-1] === 'double') {
                $scope.getDisplayMenuOpt.push($scope.allDoubleTypes);
              } else if ($scope.types[order[i]-1] === 'integer') {
                $scope.getDisplayMenuOpt.push($scope.allIntTypes);
              } else if ($scope.types[order[i]-1] === 'boolean') {
                $scope.getDisplayMenuOpt.push($scope.allBoolTypes);
              } else {
                $scope.getDisplayMenuOpt.push($scope.allStringTypes);
              }
            } else {
              $scope.getDisplayMenuOpt.push($scope.allTypes);
            }
          }
        };
        $scope.updateDisplay = function(idx) {
          var order = $scope.colreorg.fnOrder();
          $scope.doDestroy(false);
          $scope.actualtype[order[idx+1]] = $scope.getDisplayMenuVal[idx];
          $scope.doCreateTable();
        }

      },
      link: function(scope, element, attrs) {
        scope.doDestroy = function(all) {
          if (scope.table) {
            scope.table.destroy();
            delete scope.table;
            delete scope.colreorg;
          }
          if (all) {
            delete scope.timeStrings;
            delete scope.tz;
            delete scope.columnNames;
            delete scope.types;
            delete scope.actualtype;
            delete scope.data;
          }
        };
        scope.init = function(model) {
          scope.doDestroy(true);
        
          var i;

          // validate saved state (if any)
          if (scope.colstate !== undefined) {
            if (scope.colstate.length !== model.columnNames.length)
              scope.colstate = undefined;
            else {
              for(i=0; i<scope.colstate.length; i++) {
                if (model.columnNames[i] !== scope.colstate[i]) {
                  scope.colstate = undefined;
                  break;
                }
              }
            }
            if (scope.colstate === undefined) {
              scope.state = undefined;
              scope.typestate = undefined;
            }
          }
                  
          // copy basic data
          scope.columnNames = model.columnNames;
          scope.timeStrings = model.timeStrings;
          scope.tz          = model.timeZone;
          scope.types       = model.types;
          scope.actualtype  = [];
        
          // compute how to display columns (remind: dummy column to keep server ordering)
          if (scope.typestate !== undefined) {
            // we have a display state to recover
            // TODO
            scope.actualtype = scope.typestate;
            scope.typestate  = undefined;
          }
          if (scope.actualtype.length === 0) {
            scope.actualtype.push(0);
            for (i=0; i<scope.columnNames.length; i++) {
              if (scope.columnNames[i] === "time" || (scope.types !== undefined && scope.types[i] === 'time')) {
                scope.actualtype(7);
              } else {
                if (scope.types !== undefined) {
                  if (scope.types[i] === 'integer') {
                    scope.actualtype.push(2);
                  } else if (scope.types[i] === 'double') {
                    scope.actualtype.push(3);
                  } else {
                    scope.actualtype.push(0);
                  }
                } else {
                  scope.actualtype.push(0);
                }
              }
            }
          }
          // create a dummy column to keep server ordering
          var data = [];
          var r, c;
          for (r=0; r<model.values.length; r++) {
            var row = [];
            row.push(r);
            data.push(row.concat(model.values[r]));
          }
          scope.data = data;
          scope.doCreateTable();
        };
        scope.doCreateTable = function() {
          var cols = [];
          var i;

          // build configuration
          cols.push({ "title" : scope.id, "visible" : false });
          for (i=0; i<scope.columnNames.length; i++) {
            var type = scope.actualtype[i+1];
            var col = {
                "title" : scope.columnNames[i]
            };
            if (scope.allConverters[type] !== undefined) {
              col.render = scope.allConverters[type];
            }
            cols.push(col);
          }
          scope.columns = cols;
          
          var id = '#' + scope.id;
          var init = {
              "data": scope.data,
              "columns": scope.columns,
              "stateSave": true,
              "processing": true,
              "order": [[ 0, "asc" ]],
              "scrollX": true,
              "dom":  'rt<"bko-table-bottom"<"bko-table-selector"l><"bko-table-pagenum"p>>S',
              "searching": false,
              "deferRender": true,
              "stateSaveCallback": function (settings, data) {
                scope.state = data;
              },
              "stateLoadCallback": function (settings) {
                return scope.state;
              }
            };
        
          if (scope.data.length > 25) {
            init.pagingType = 'simple_numbers';
            init.pageLength = 25
            init.lengthMenu = [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]];
          } else {
            init.paging = false;
            init.scrollY = 350;
            init.scrollCollapse = true;
          }

          bkHelper.timeout(function() {
            // we must wait for the DOM elements to appear
            scope.table = $(id).DataTable(init);
            scope.colreorg = new $.fn.dataTable.ColReorder( scope.table, {
              "fnReorderCallback": function () {
                scope.refreshCellMenu();
                scope.refreshDisplayMenu();
                scope.$digest();
              },
              "iFixedColumns": 1
             } );
            scope.refreshCellMenu();
            scope.refreshDisplayMenu();

            $(id + ' tbody').on( 'click', 'tr', function () {
              $(this).toggleClass('selected');
            } );
          },0);                  
        }
        
        scope.getDumpState = function() {
          return scope.model.getDumpState();
        };

        scope.state = {};
        var savedstate = scope.model.getDumpState();
        if (savedstate !== undefined && savedstate.datatablestate !== undefined ) {
          console.log('restoring state');
          scope.state = savedstate.datatablestate.datatable;
          scope.typestate = savedstate.datatablestate.typestate;
          scope.colstate = savedstate.datatablestate.colstate;
        }
        
        scope.$on("$destroy", function() {
          scope.doDestroy(true);
        });

        scope.$watch('getDumpState()', function(result) {
          if (result !== undefined && result.tablestate === undefined) {
            scope.model.setDumpState({ datatablestate: { datatable : scope.state, typestate : scope.actualtypes, colstate : scope.columnNames } });
          }
        });

        scope.getCellModel = function() {
          return scope.model.getCellModel();
        };
        scope.$watch('getCellModel()', function(m) {
          scope.init(m);
        });

      }
    };
  }]);
})();

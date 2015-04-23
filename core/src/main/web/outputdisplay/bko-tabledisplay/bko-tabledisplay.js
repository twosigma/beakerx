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
      template: JST['bko-tabledisplay/output-table'],
      controller: function($scope, $modal) {

        $scope.id = "table_" + bkUtils.generateId(6);

        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch("getShareMenuPlugin()", function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });

        // CSV support functions
        $scope.convertToCSV = function(data) {
          var i, j;
          var out = '';
          var eol = '\n';
          
          if (navigator.appVersion.indexOf("Win")!=-1)
            eol = '\r\n';
          
          for(i=1; i<$scope.columns.length; i++) {
            var order = $scope.colorder[i];
            if (!$scope.table.column(order).visible())
              continue;
            if (out !== '')
              out = out + ',';
            out = out + '"' + $scope.columns[order].title.replace(/"/g, '""') + '"';
          }
          out = out + eol;

          for(i=0; i<data.length; i++) {
            var row = data[i];
            var some = false;
            for(j=1; j<row.length; j++) {
              var order = $scope.colorder[j];
              if (!$scope.table.column(order).visible())
                continue;
              if (!some)
                some = true;
              else
                out = out + ',';
              var d = row[j];
              if ($scope.columns[order].render !== undefined )
                d = $scope.columns[order].render(d, "display");
              out = out + '"' + (d !== undefined && d !== null ? d.replace(/"/g, '""') : '') + '"';
            }
            out = out + eol;
          }
          return out;
        };

        $scope.doCSVExport = function(all) {
          var data;
          if (!all)
            data = $scope.table.rows().data();
          else
            data = $scope.table.rows(function(index, data, node) { return $scope.selected[index]; }).data();
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
        
        // these are the menu actions
        $scope.doResetSort = function() {
          if ($scope.table === undefined)
            return;
          $scope.table.order( [ 0, 'asc' ] ).draw();
        };
        $scope.doSelectAll = function(idx) {
          if ($scope.table === undefined)
            return;
          for (var i in $scope.selected) {
            $scope.selected[i] = true;
          }
          $scope.update_selected();
        }
        $scope.doDeselectAll = function(idx) {
          if ($scope.table === undefined)
            return;
          for (var i in $scope.selected) {
            $scope.selected[i] = true;
          }
          $scope.update_selected();
        }
        $scope.doReverseSelection = function(idx) {
          if ($scope.table === undefined)
            return;
          for (var i in $scope.selected) {
            $scope.selected[i] = !$scope.selected[i];
          }
          $scope.update_selected();
        }
        $scope.doCopyToClipboard = function(idx) {
          // this is handled by the invisible flash movie
        }
                
        $scope.getCellIdx      =  [];
        $scope.getCellNam      =  [];
        $scope.getCellSho      =  [];
        $scope.getCellAlign    =  [];
        $scope.getCellDisp     =  [];
        $scope.getCellDispOpts =  [];
        $scope.pagination = {
            'use' : true,
            'rowsToDisplay' : 50
//            'fixLeft' : false,
//            'fixRight' : false
        };
        
        $scope.getCellDispOptsF = function(i) {
          return $scope.getCellDispOpts[i];
        };
                
        $scope.displayAll = function() {
          var i;
          for(i=0; i<$scope.getCellSho.length; i++) {
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
          
          if ($scope.table === undefined)
            return;
          
          var i;
          for(i=1; i<$scope.columns.length; i++) {
            $scope.getCellIdx.push(i-1);
            var order = $scope.colorder[i];
            $scope.getCellNam.push($scope.columns[order].title);
            $scope.getCellSho.push($scope.table.column(order).visible());
            $scope.getCellDisp.push($scope.actualtype[order-1]);
            $scope.getCellAlign.push($scope.actualalign[order-1]);
            if ($scope.types) {
              if ($scope.types[order-1] === 'string') {
                $scope.getCellDispOpts.push($scope.allStringTypes);
              } else if ($scope.types[order-1] === 'double') {
                $scope.getCellDispOpts.push($scope.allDoubleTypes);
              } else if ($scope.types[order-1] === 'integer') {
                $scope.getCellDispOpts.push($scope.allIntTypes);
              } else if ($scope.types[order-1] === 'time') {
                $scope.getCellDispOpts.push($scope.allTimeTypes);
              } else if ($scope.types[order-1] === 'boolean') {
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
            '"': '&quot;', '&': '&amp;', "'": '&#39;',
            '/': '&#47;',  '<': '&lt;',  '>': '&gt;'
        };
        
        $scope.escapeHTML = function (text) {
          if ($.type(text) === "string")
            return text.replace(/[\"&'\/<>]/g, function (a) { return chr[a]; });
          return text;
        },
        
        $scope.allTypes = [ { type: 0, name: 'string'},
                            { type: 1, name: 'integer'},
                            { type: 2, name: 'formatted integer'},
                            { type: 3, name: 'double'},
                            { type: 4, name: 'double 2 decimals'},
                            { type: 5, name: 'double 4 decimals'},
                            { type: 6, name: 'exponential 5'},
                            { type: 7, name: 'exponential 15'},
                            { type: 8, name: 'time'},
                            { type: 9, name: 'boolean'},
                            { type: 10, name: 'html'}];
        $scope.allConverters = [
                                // string
                                function(value,type,full,meta) {
                                  if (_.isObject(value) && value.type === 'Date') {
                                    value = moment.utc(value.timestamp).local().format("YYYYMMDD HH:mm:ss.SSS ZZ");
                                  }
                                  if (type === 'display' && value !== null && value !== undefined)
                                    return $scope.escapeHTML(value);
                                  return value;
                                },
                                // integer
                                function(value,type,full,meta) {
                                  if (value !== undefined && value !== '' && value !== null)
                                    return parseInt(value);
                                  if (type === 'sort')
                                    return NaN;
                                  return '';
                                },
                                // formatted integer
                                function(value,type,full,meta) {
                                  if (value !== undefined && value !== '' && value !== null) {
                                    var x = parseInt(value);
                                    if (x !== NaN)
                                      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    return x;
                                  }
                                  if (type === 'sort')
                                    return NaN;
                                  return '';
                                },
                                // double
                                function(value,type,full,meta) {
                                  if (value !== undefined && value !== '' && value !== null)
                                    return parseFloat(value);
                                  if (type === 'sort')
                                    return NaN;
                                  return '';
                                },
                                // double 2 decimals
                                function(value,type,full,meta) {
                                  if (value !== undefined && value !== '' && value !== null)
                                    return parseFloat(value).toFixed(2);
                                  if (type === 'sort')
                                    return NaN;
                                  return '';
                                },
                                // double 4 decimals
                                function(value,type,full,meta) {
                                  if (value !== undefined && value !== '' && value !== null)
                                    return parseFloat(value).toFixed(4);
                                  if (type === 'sort')
                                    return NaN;
                                  return '';
                                },
                                // exponential 5
                                function(value,type,full,meta) {
                                  if (value !== undefined && value !== '' && value !== null)
                                    return parseFloat(value).toExponential(5);
                                  if (type === 'sort')
                                    return NaN;
                                  return '';
                                },
                                // exponential 15
                                function(value,type,full,meta) {
                                  if (value !== undefined && value !== '' && value !== null)
                                    return parseFloat(value).toExponential(15);
                                  if (type === 'sort')
                                    return NaN;
                                  return '';
                                },
                                // time
                                function(value,type,full,meta) {
                                  if ($scope.timeStrings)
                                    return $scope.timeStrings[meta.row];

                                  if (type === 'display') {
                                    if (_.isObject(value) && value.type === 'Date') {
                                      return moment.utc(value.timestamp).local().format("YYYYMMDD HH:mm:ss.SSS ZZ");
                                    }
                                    var nano = value % 1000;
                                    var micro = (value / 1000) % 1000;
                                    var milli = value / 1000 / 1000;
                                    var time = moment(milli);
                                    var tz = $scope.tz;
                                    if (tz)
                                      time.tz(tz);
                                    return time.format("YYYYMMDD HH:mm:ss.SSS");
                                  }
                                  return value;
                                },
                                // boolean
                                function(value,type,full,meta) {
                                  if (value !== undefined && value !== null && (value.toLowerCase() === 'true' || value === 1))
                                    return 'true';
                                  return 'false';
                                },
                                // html
                                function(value,type,full,meta) {
                                  return value;
                                }
                                ];
        $scope.allStringTypes = [ { type: 0, name: 'string'}, { type: 10, name: 'html'} ];
        $scope.allTimeTypes   = [ { type: 8, name: 'time'}, { type: 0, name: 'string'}, { type: 10, name: 'html'} ];
        $scope.allIntTypes    = [ { type: 0, name: 'string'},
                               { type: 1, name: 'integer'},
                               { type: 2, name: 'formatted integer'},
                               { type: 8, name: 'time'} ];
        $scope.allDoubleTypes = [ { type: 0, name: 'string'},
                                  { type: 3, name: 'double'},
                                  { type: 4, name: 'double 2 decimals'},
                                  { type: 5, name: 'double 4 decimals'},
                                  { type: 6, name: 'exponential 5'},
                                  { type: 7, name: 'exponential 15'} ];
        $scope.allBoolTypes = [ { type: 0, name: 'string'},
                                { type: 9, name: 'boolean'} ];

        $scope.openOptionsDialog = function() {
          var options = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            scope: $scope,
            windowClass: 'output-table-options',
            template: JST['bko-tabledisplay/output-table-options']()
          }
          $scope.getCellShoOld    = $scope.getCellSho.slice(0);
          $scope.getCellDispOld   = $scope.getCellDisp.slice(0);
          $scope.getCellAlignOld  = $scope.getCellAlign.slice(0);
          $scope.usePaginationOld = $scope.pagination.use;
          $scope.rowsToDisplayOld = $scope.pagination.rowsToDisplay;
//          $scope.fixLeftOld = $scope.pagination.fixLeft;
//          $scope.fixRightOld = $scope.pagination.fixRight;
          $scope.modal = $modal.open(options);
        };
        
        $scope.closeOptionsDialog = function() {
          $scope.modal.close();
          var i;
          var doit = 0;

          for (i=0; i<$scope.getCellDisp.length; i++) {
            if ($scope.getCellSho[i] !== $scope.getCellShoOld[i]) {
              // refresh only visibility
              doit = 1;
            }
          }

          if (($scope.usePaginationOld !== $scope.pagination.use) || ($scope.rowsToDisplayOld !== $scope.pagination.rowsToDisplay) /* ||
              ($scope.fixLeftOld !== $scope.pagination.fixLeft) || ($scope.fixRightOld !== $scope.pagination.fixRight)*/ ) {
            doit = 2;
          } else {
           for (i=0; i<$scope.getCellDisp.length; i++) {
              if (($scope.getCellDisp[i] !== $scope.getCellDispOld[i]) || ($scope.getCellAlign[i] !== $scope.getCellAlignOld[i])) {            
                doit = 2;
              }
            }
          }
          if (doit == 1) {
            for (i=0; i<$scope.getCellDisp.length; i++) {
              $scope.table.column(i+1).visible( $scope.getCellSho[i], false );
            }
            $scope.table.columns.adjust().draw( false );
          }
          else if (doit == 2) {
            $scope.doDestroy(false);
            // update table display
            for (i=0; i<$scope.getCellDisp.length; i++) {
              $scope.actualtype[$scope.colorder[i+1]-1] = $scope.getCellDisp[i];
              $scope.actualalign[$scope.colorder[i+1]-1] = $scope.getCellAlign[i];
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
            clearTimeout(scope.refresh_size);
            $(window).unbind('resize.'+scope.id);
            $('#' + scope.id + ' tbody').off('click');
            $('#' + scope.id).html('');
            scope.table.destroy();
            delete scope.table;
            delete scope.colreorg;
            if (scope.clipclient !== undefined) {
              scope.clipclient.destroy();
              delete scope.clipclient;
            }
//            delete scope.fixcols;
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
            if (scope.savedstate.columnNames === undefined)
              scope.savedstate = undefined;
            else if (scope.savedstate.columnNames.length !== model.columnNames.length)
              scope.savedstate = undefined;
            else {
              for(i=0; i<scope.savedstate.columnNames.length; i++) {
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
            for (i=0; i<scope.columnNames.length; i++) {
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
          var data = [], r;
          var selected = [];
          for (r=0; r<model.values.length; r++) {
            var row = [];
            row.push(r);
            data.push(row.concat(model.values[r]));
            selected.push(false);
          }
          scope.data = data;
          scope.selected = selected;
        };
        
        scope.update_size = function() {
          var me = $('#' + scope.id);
          // this is dataTables_scrollBody
          var pp = me.parent();
          if (pp.width() > me.width() + 16) {
            pp.width( me.width() + 16);
          }
        };

        scope.update_selected = function() {
          
          if (scope.table === undefined)
            return;

          scope.table.rows().eq(0).each( function (index) {
            var row = scope.table.row(index);
            var tr = row.node();
            if (tr !== undefined) {
              var iPos =row.index();
              if (!scope.selected[iPos]) {
                $(tr).removeClass('selected');
              } else {
                $(tr).addClass('selected');
              }
            }
          } );
          
        }
        
        scope.doCreateTable = function() {
          var cols = [];
          var i;

          // build configuration
          cols.push({ "title" : scope.id, "visible" : false });
          
          for (i=0; i<scope.columnNames.length; i++) {
            var type = scope.actualtype[i];
            var al = scope.actualalign[i];
            var col = {
                "title" : scope.columnNames[i]
            };
            if (al === 'R')
              col.className = 'dtright';
            else if (al === 'C')
              col.className = 'dtcenter';
            if (scope.allConverters[type] !== undefined) {
              col.render = scope.allConverters[type];
            }
            if (scope.getCellSho)
              col.visible = scope.getCellSho[i];
            cols.push(col);
          }
          scope.columns = cols;

          var id = '#' + scope.id;
          var init = {
              "destroy" : true,
              "data": scope.data,
              "columns": scope.columns,
              "stateSave": true,
              "processing": true,
              "autoWidth": true,
              "order": [[ 0, "asc" ]],
              "scrollX": '10%',
              "searching": false,
              "deferRender": true,
              "drawCallback": function( settings ) {
                scope.update_size();
                scope.update_selected();
              }
            };
          
          if (!scope.pagination.use) {
            init.paging = false;
            init.scrollY = scope.pagination.rowsToDisplay*27;
            init.scrollCollapse = true;
            init.dom = 'rt';
          } else {          
            init.dom = 'rt<"bko-table-bottom"<"bko-table-selector"l><"bko-table-pagenum"p>>S';
            if (scope.data.length > 25) {
              init.pagingType = 'simple_numbers';
              init.pageLength = 25
              init.lengthMenu = [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]];
            } else {
              init.paging = false;
              init.scrollY = 350;
              init.scrollCollapse = true;
            }
          }
          
          bkHelper.timeout(function() {
            // we must wait for the DOM elements to appear
            scope.table = $(id).DataTable(init);
            scope.renderMenu = true;
            scope.colreorg = new $.fn.dataTable.ColReorder( $(id), {
              "fnReorderCallback": function () {
                scope.colorder = scope.colreorg.fnOrder().slice(0);
                scope.refreshCells();
                scope.$digest();
              },
              "iFixedColumns": 1
             } );
            if (scope.colorder !== undefined)
              scope.colreorg.fnOrder(scope.colorder);
            else
              scope.colorder = scope.colreorg.fnOrder().slice(0);
            /*
            if (scope.pagination.fixLeft || scope.pagination.fixRight) {
              var inits = {};
              if (scope.pagination.fixLeft)
                inits.leftColumns = 1;
              else
                inits.leftColumns = 0;
              if (scope.pagination.fixRight)
                inits.rightColumns = 1;
              else
                inits.rightColumns = 0;
              scope.fixcols = new $.fn.dataTable.FixedColumns( $(id), inits);
            }
            */
            scope.refreshCells();

            $(id + ' tbody').off( 'click');
            $(id + ' tbody').on( 'click', 'tr', function (event) {
              var iPos = scope.table.row( this ).index();              
              if (scope.selected[iPos]) {
                scope.selected[iPos] = false;
                $(this).removeClass('selected');
              } else {
                scope.selected[iPos] = true;
                $(this).addClass('selected');
              }
              event.stopPropagation();
            } );
            
            $(window).bind('resize.'+scope.id, function() {
              clearTimeout(scope.refresh_size);
              scope.refresh_size = setTimeout(function() { scope.update_size(); }, 250);
            });
            
          },0);
        };

        scope.menuToggle = function() {
          if (scope.clipclient === undefined) {
              scope.clipclient = new ZeroClipboard( );
              var d = document.getElementById(scope.id + '_dt_copy');
              
              scope.clipclient.clip( d );
              
              scope.clipclient.on( "copy", function (event) {
                var clipboard = event.clipboardData;

                var data = scope.table.rows(function(index, data, node) { return scope.selected[index]; }).data();
                if (data === undefined || data.length === 0) {
                  data = scope.table.rows().data();
                }
                var out = scope.convertToCSV(data);
  
                clipboard.setData( "text/plain", out );
              });
          }
        }
        
        scope.getDumpState = function() {
          return scope.model.getDumpState();
        };

        var savedstate = scope.model.getDumpState();
        if (savedstate !== undefined && savedstate.datatablestate !== undefined ) {
          scope.savedstate = savedstate.datatablestate;
        }

        scope.$on("$destroy", function() {
          scope.doDestroy(true);
        });

        scope.$watch('getDumpState()', function(result) {
          if (result !== undefined && result.datatablestate === undefined) {
            var state = {
                'pagination'  : scope.pagination
            };
            if (scope.columnNames !== undefined)
              state.columnNames = scope.columnNames.slice(0);
            if (scope.actualtypes !== undefined)
              state.actualtypes = scope.actualtypes.slice(0);
            if (scope.actualalign !== undefined)
              state.actualalign = scope.actualalign.slice(0);
            if (scope.colorder !== undefined)
              state.colorder = scope.colorder.slice(0);
            if (scope.getCellSho !== undefined)
              state.getCellSho = scope.getCellSho;
            
            scope.model.setDumpState({ datatablestate: state });
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

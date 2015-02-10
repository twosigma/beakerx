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
  
  jQuery.fn.dataTableExt.aTypes.unshift(
      function ( sData )
      {
          var sValidChars = "0123456789";
          var Char;
   
          /* Check the numeric part */
          for ( var i=0 ; i<(sData.length - 3) ; i++ )
          {
              Char = sData.charAt(i);
              if (sValidChars.indexOf(Char) == -1)
              {
                  return null;
              }
          }
   
          /* Check for size unit KB, MB or GB */
          if ( sData.substring(sData.length - 2, sData.length).toLowerCase() == "kb"
              || sData.substring(sData.length - 2, sData.length).toLowerCase() == "mb"
              || sData.substring(sData.length - 2, sData.length).toLowerCase() == "gb" )
          {
              return 'file-size';
          }
          return null;
      }
  );
  
  // detect and sort by IP addresses
  jQuery.fn.dataTableExt.aTypes.unshift(
      function ( sData )
      {
          if (/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(sData)) {
              return 'ip-address';
          }
          return null;
      }
  );
  
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
      template: '<table cellpadding="0" cellspacing="0" border="0" class="display" id="{{id}}"></table>',
      controller: function($scope) {
        $scope.id = "table_" + bkUtils.generateId(6);
        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch("getShareMenuPlugin()", function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });
      },
      link: function(scope, element, attrs) {
        scope.init = function(model) {
          if (scope.table) {
            scope.table.destroy();
            delete scope.table;
            delete scope.colreorg;
            delete scope.timeStrings;
            delete scope.tz;
          }
          
          var data = model.values;
          var columns = model.columnNames;
          var cols = [];
          var i;
        
          scope.timeStrings = model.timeStrings;
          scope.tz          = model.timeZone;
        
          for (i=0; i<columns.length; i++) {
            if (columns[i] === "time") {
              if (scope.timeStrings) {
                cols.push({
                  "title" : columns[i],
                  "render" : function(data, type, full, meta) {
                    return scope.timeStrings[meta.row];
                  }
                });
              } else {
                cols.push({
                  "title" : columns[i],
                  "render" : function(value,type,full,meta) {
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
                  }
                });
              }
            } else
              cols.push({ "title" : columns[i] });        
          }
          var id = '#' + scope.id;
          var init = {
              "data": data,
              "columns": cols,
              "stateSave": true,
              "processing": true,
              "stateSaveCallback": function (settings, data) {
                scope.state = data;
              },
              "stateLoadCallback": function (settings) {
                return scope.state;
              }
            };
        
          if (data.length > 25) {
            init.pagingType = 'simple_numbers';
            init.pageLength = 25
            init.lengthMenu = [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]];
          } else {
            init.paging = false;
            init.scrollY = 350;
            init.scrollCollapse = true;
          }

          init.scrollX = true;
          init.dom  = 'rt<"bko-table-bottom"<"bko-table-selector"l><"bko-table-pagenum"p><"bko-table-buttons"TC>>S';
          init.searching = false;
          init.deferRender= true;
          init.tableTools= {
            "sSwfPath": "vendor/DataTables-1.10.5/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
            "sRowSelect": "os",
            "aButtons" : [
                      'select_all',
                      'select_none',
                      'copy',
                      {
                        'sExtends': 'collection',
                        'sButtonText': 'Save',
                        'aButtons': ['csv', 'xls', 'pdf']
                      }
                    ]
          };
        
        
          bkHelper.timeout(function() {
            // we must wait for the DOM elements to appear
            scope.table = $(id).DataTable(init);
            scope.colreorg = new $.fn.dataTable.ColReorder( scope.table );
          },0);                  
        }
        
        scope.getDumpState = function() {
          return scope.model.getDumpState();
        };

        scope.state = {};
        var savedstate = scope.model.getDumpState();
        if (savedstate !== undefined && savedstate.tablestate !== undefined) {
          scope.state = savedstate.tablestate;
        }
        
        scope.$on("$destroy", function() {
          console.log('destroy');
          scope.table.destroy();
          delete scope.table;
          delete scope.colreorg;
        });

        scope.$watch('getDumpState()', function(result) {
          if (result !== undefined && result.tablestate === undefined) {
            scope.model.setDumpState({ tablestate : scope.state});
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

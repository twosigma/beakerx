/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

define([
  'underscore',
  'jquery',
  'datatables.net',
  'datatables.net-colreorder',
  'datatables.net-fixedcolumns',
  'datatables.net-keytable',
  'datatables.net-select',
  'datatables.net-buttons',
  './../shared/libs/datatables-colresize/dataTables.colResize',
  'moment-timezone/builds/moment-timezone-with-data',
  './../shared/bkUtils',
  './cellHighlighters',
  './../shared/bkHelper',
  './consts',
  'jquery-contextmenu',
  'jquery-ui/ui/widgets/tooltip',
  './tableUtils'
], function(
  _,
  $,
  dataTables,
  dataTablesColReorder,
  dataTablesFixedColumns,
  dataTablesKeyTable,
  dataTablesColResize,
  dataTablesSelect,
  dataTablesButtons,
  moment,
  bkUtils,
  cellHighlighters,
  bkHelper,
  tableConsts,
  contextMenu,
  tooltip,
  tableUtils
) {

  var jQuery = $;
  var updateTableEventListener;

  tableUtils.setJqExtentions();

  function TableScope(wrapperId) {
    this.wrapperId = wrapperId;
    this.id = null;
    this.element = null;
    this.renderMenu = false;
    this.tableElementsCreated = false;
    this.id = 'table_' + bkUtils.generateId(6);
    this.scrollbarWidth = this.getScrollBarWidth();
    this.tableChanged = false;
    this.doubleWithPrecisionConverters = {}; //map: precision -> convert function
    this.getCellIdx      =  [];
    this.getCellNam      =  [];
    this.getCellSho      =  [];
    this.getCellAlign    =  [];
    this.getCellDisp     =  [];
    this.getCellDispOpts =  [];
    this.allConverters = {};
    this.tableDisplayModel = null;
    this.tableDisplayView = null;
    this.cellHighlighters = {};

    this.model = {
        model: {},
        getCellModel: function() {
          return this.model;
        }
      };

    // attach additional data from consts
    _.extend(this, tableConsts.scopeData);

    this.debouncedColumnFilterFn = this.getDebouncedColumnFilterFn();

    this.bindAllConverters();
    this.prepareDoubleWithPrecisionConverters();
    this.prepareValueFormatter();
    this.setJqExtensions();
    this.linkMoment();
  }

  // ---------

  TableScope.prototype.setWidgetModel = function(tableDisplayModel) {
  	this.tableDisplayModel = tableDisplayModel;
  };

  TableScope.prototype.setWidgetView = function(tableDisplayView) {
    this.tableDisplayView = tableDisplayView;
  };

  
  TableScope.prototype.linkMoment = function() {
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
  };

  TableScope.prototype.setJqExtensions = function() {
  };

  TableScope.prototype.bindAllConverters = function() {
    var self = this;
    this.allConverters = {
      // string
      0: function(value, type, full, meta) {
        var objectValue = _.isObject(value);

        if (objectValue && value.type === 'Date') {
          value = moment(value.timestamp).format('YYYYMMDD HH:mm:ss.SSS ZZ');
        } else if (objectValue) {
          value = JSON.stringify(value);
        }

        if (type === 'display' && value !== null && value !== undefined) {
          var escapedText = self.escapeHTML(value);
          var limitedText = self.truncateString(escapedText);
          value = limitedText;
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
          var colFormat = self.stringFormatForColumn[$(meta.settings.aoColumns[meta.col].sTitle).text()];
          var typeFormat = self.stringFormatForType.double;
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
        if (self.timeStrings) {
          return self.timeStrings[meta.row];
        }
        if (type === 'display' || type === 'csv') {
          var format = _.isEmpty(self.formatForTimes) ?
            tableConsts.TIME_UNIT_FORMATS.DATETIME.format : tableConsts.TIME_UNIT_FORMATS[self.formatForTimes].format;
          if (_.isObject(value) && value.type === 'Date') {
            return bkUtils.formatTimestamp(value.timestamp, self.tz, format);
          }
          var milli = value * 1000;
          return bkUtils.formatTimestamp(milli, self.tz, format);
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
  };

  TableScope.prototype.getScrollBarWidth = function() {
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

  TableScope.prototype.getTheme = function() {
    return bkHelper.getTheme();
  };

  // self.$watch('getTheme()', function(newValue, oldValue) {
  //   if (newValue !== oldValue) {
  //     if (self.table) {
  //       self.scrollbarWidth = self.getScrollBarWidth();
  //       self.table.settings()[0].oScroll.iBarWidth = self.scrollbarWidth;
  //       self.update_size();
  //     }
  //   }
  // });

  TableScope.prototype.containerClickFunction = function(e){
    var self = this;
    if (self.table) {
      if ($(self.table.table().container()).has(e.target).length) {
        self.addInteractionListeners();
      } else {
        self.removeInteractionListeners();
      }
    }
  };

  TableScope.prototype.doDestroy = function(all) {
    var self = this;
    var $body = $(document.body);

    if (self.table) {
      var $tableContainer = $(self.table.table().container());
      var $document = $(document);
      var $tBody = $('#' + self.id + ' tbody');
      //jscs:disable
      clearTimeout(self.refresh_size);
      //jscs:enable
      $(window).unbind('resize.' + self.id);
      $tBody
        .off('click')
        .off('dblclick')
        .off('mouseenter.bko-dt-highlight')
        .off('mouseleave.bko-dt-highlight');
      self.table
        .off('key')
        .off('draw.dt')
        .off('column-reorder')
        .off('column-sizing.dt')
        .off('column-visibility.dt');

      self.removeOnKeyListeners();
      self.removeInteractionListeners();
      self.removeFilterListeners();
      self.destroyTableSelect();
      self.doDestroyMenus();
      self.element[0].removeEventListener('update.bko-table', updateTableEventListener);
      self.element.find(".bko-table-use-pagination").remove();
      $body.tooltip('instance') && $body.tooltip('destroy');

      $.contextMenu('destroy', '#' + self.id + ' tbody td');
      $.contextMenu('destroy', '#' + self.id +'_wrapper thead');
      $body.off('click.bko-dt-container');
      $document.off('contextmenu.bko-dt-header');
      $tableContainer.find('.dataTables_scrollHead').off('scroll');
      $tableContainer
        .off('keyup.column-filter change.column-filter')
        .off("mouseenter.bko-dt-interaction")
        .off("mouseleave.bko-dt-interaction")
        .off('click');

      self.columnLimitModal && self.columnLimitModal.remove();
      self.clipclient && self.clipclient.destroy();
      self.clipclient = undefined;
      self.table.off('');
      self.table.clear();


      if (all) {
        self.table.state.clear();
        self.table.destroy(true);
        self.element.remove();
        self.keyTable = undefined;
        self.table = undefined;
        self.colreorg = undefined;
      }
    }

    if (all) {
      self.actualtype = [];
      self.timeStrings = undefined;
      self.tz = undefined;
      self.types = undefined;
      self.actualalign = undefined;
      self.data = undefined;
      self.update = undefined;
      self.tableOrder = undefined;
      self.fixcols = undefined;
      self.fixcreated = false;
      self.renderMenu = false;
      self.element = undefined;
      updateTableEventListener = undefined;
    }

    // self.$on(GLOBALS.EVENTS.CELL_OUTPUT_LM_SHOWED, function() {
    //   var parents = self.element.parents();
    //   var cyclingContainer =  _.find(parents, function(parent) {
    //     return parent.id.indexOf("lm-cycling-panel") !== -1;
    //   });
    //   if (cyclingContainer && cyclingContainer.style.display !== 'none'){
    //     redrawTable();
    //   }
    //   var tabContainer =  _.find(parents, function(parent) {
    //     return parent.id.indexOf("lm-tab-panel") !== -1;
    //   });
    //   if (tabContainer && tabContainer.classList.contains("active")){
    //     redrawTable();
    //   }
    // });
  };

  TableScope.prototype.init = function(model) {
    var self = this;

    // unregisterOutputExpandEventListener = self.$on(GLOBALS.EVENTS.CELL_OUTPUT_EXPANDED, function() {
    //   var parents = self.element.parents();
    //   var cyclingContainer =  _.find(parents, function(parent) {
    //     return parent.id.indexOf("lm-cycling-panel") !== -1;
    //   });
    //   if (cyclingContainer && cyclingContainer.style.display === 'none'){
    //     return;
    //   }
    //   var tabContainer =  _.find(parents, function(parent) {
    //     return parent.id.indexOf("lm-tab-panel") !== -1;
    //   });
    //
    //   if (tabContainer && !tabContainer.classList.contains("active")){
    //     return;
    //   }
    //   redrawTable();
    // });

    var i;

    // validate saved state (if any) by using column \Names
    var modelColumnNames;
    if (model.columnNames) {
      modelColumnNames = model.columnNames.slice(0);
      if (model.hasIndex === 'true') {
        modelColumnNames.shift();
      }
    }
    if (self.savedstate !== undefined) {
      if (self.savedstate.columnNames === undefined) {
        self.savedstate = undefined;
      } else if (self.savedstate.columnNames.length !== modelColumnNames.length) {
        self.savedstate = undefined;
      } else {
        for (i = 0; i < self.savedstate.columnNames.length; i++) {
          if (modelColumnNames[i] !== self.savedstate.columnNames[i]) {
            self.savedstate = undefined;
            break;
          }
        }
      }
    }

    self.hasIndex = model.hasIndex === 'true';

    // copy basic data
    if (model.columnNames !== undefined)
      self.columnNames = model.columnNames.slice(0);
    else
      self.columnNames = [];
    self.timeStrings = model.timeStrings;
    self.tz          = model.timeZone;
    if (model.types !== undefined)
      self.types = model.types.slice(0);
    else
      self.types = [];

    if (self.hasIndex) {
      if (self.columnNames !== undefined) {
        self.indexName = self.columnNames.shift();
      } else {
        self.indexName = '     ';
      }
      if (self.types !== undefined) {
        self.indexType = self.types[0];
        self.indexActualType = self.getTypeAndAlignmentByTypeString(self.types[0]).actualtype;
        self.types.shift();
      } else {
        self.indexType = 'index';
      }
    }

    // compute how to display columns (remind: dummy column to keep server ordering)
    if (self.savedstate !== undefined) {
      // we have a display state to recover
      self.actualtype  = self.savedstate.actualtype;
      self.actualalign = self.savedstate.actualalign;
      self.colorder    = self.savedstate.colorder;
      self.getCellSho  = self.savedstate.getCellSho;
      self.pagination  = self.savedstate.pagination;
      //fix saved pagination values to be numbers
      if (typeof self.pagination.fixLeft === 'boolean') {
        self.pagination.fixLeft = 0;
      }
      if (typeof self.pagination.fixRight === 'boolean') {
        self.pagination.fixRight = 0;
      }
      self.barsOnColumn          = self.savedstate.barsOnColumn || {};
      self.cellHighlightersData  = self.savedstate.cellHighlightersData || [];
      self.tableFilter           = self.savedstate.tableFilter || '';
      self.columnFilter          = self.savedstate.columnFilter || [];
      self.showFilter            = self.savedstate.showFilter;
      self.columnSearchActive    = self.savedstate.columnSearchActive;
      self.columnWidth           = self.savedstate.columnWidth || [];
      self.tableOrder            = self.savedstate.tableOrder;
      self.formatForTimes        = self.savedstate.formatForTimes;
      self.stringFormatForType   = self.savedstate.stringFormatForType || {};
      self.stringFormatForColumn = self.savedstate.stringFormatForColumn || {};
      self.tooltips = self.savedstate.tooltips || [];
      self.dataFontSize = self.savedstate.dataFontSize;
      self.headerFontSize = self.savedstate.headerFontSize;
      self.fontColor = self.savedstate.fontColor;
      self.headersVertical = self.savedstate.headersVertical;

      self.savedstate  = undefined;
    } else {
      if (!_.isEmpty(model.columnsVisible) && _.isEmpty(model.columnOrder)) {
        self.getCellSho = [];
        _.forEach(self.columnNames, function(columnName){
          var visible = model.columnsVisible.hasOwnProperty(columnName) ? model.columnsVisible[columnName] : true;
          self.getCellSho.push(visible);
        });
      } else {
        self.getCellSho = undefined;
      }

      if (!_.isEmpty(model.columnOrder)) {
        self.colorder = [0];
        self.getCellSho = [];
        _.forEach(model.columnOrder, function(columnName) {
          self.colorder.push(self.columnNames.indexOf(columnName) + 1);
        });
        _.forEach(self.columnNames, function(columnName) {
          var colIndex = model.columnOrder.indexOf(columnName);
          var visible = colIndex > -1;
          self.getCellSho.push(visible);
          if (!visible) {
            self.colorder.push(self.columnNames.indexOf(columnName) + 1);
          }
        });
      } else {
        self.colorder = undefined;
      }

      self.barsOnColumn = {}; //map: col index -> show bars
      if (!_.isEmpty(model.rendererForType)) {
        _.forEach(self.types, function(type, index) {
          var renderer = model.rendererForType[type];
          if (renderer) {
            self.applyColumnRenderer(index, renderer);
          }
        });
      }
      _.forEach(model.rendererForColumn, function(renderer, columnName) {
        if (model.rendererForColumn.hasOwnProperty(columnName)) {
          self.applyColumnRenderer(self.getColumnIndexByColName(columnName) - 1, renderer);
        }
      });

      self.cellHighlightersData = model.cellHighlighters ? _.map(model.cellHighlighters, function(highlighter){
        return _.extend({ colInd: self.getColumnIndexByColName(highlighter.colName) }, highlighter);
      }) : [];
      self.tableFilter       = '';
      self.columnFilter      = [];
      self.showFilter        = false;
      self.columnSearchActive = false;
      self.columnWidth       = [];
      self.tableOrder        = undefined;
      var columnsFrozen = [];
      _.forEach(model.columnsFrozen, function(frozen, columnName) {
        if (model.columnsFrozen.hasOwnProperty(columnName) && frozen) {
          columnsFrozen.push(self.getColumnIndexByColName(columnName));
        }
      });
      var columnsFrozenRight = [];
      _.forEach(model.columnsFrozenRight, function(frozen, columnName) {
        if (model.columnsFrozenRight.hasOwnProperty(columnName) && frozen) {
          columnsFrozenRight.push(self.getColumnIndexByColName(columnName));
        }
      });
      self.pagination = {
        'use' : true,
        'rowsToDisplay' : tableConsts.DEFAULT_PAGE_LENGTH,
        'fixLeft' : !_.isEmpty(columnsFrozen) ? Math.max.apply(null, columnsFrozen) : 0,
        'fixRight' : !_.isEmpty(columnsFrozenRight) ? self.columnNames.length - Math.min.apply(null, columnsFrozenRight) + 1 : 0,
      };
      self.formatForTimes        = model.stringFormatForTimes || {};
      self.stringFormatForType   = model.stringFormatForType || {};
      self.stringFormatForColumn = model.stringFormatForColumn || {};
      self.tooltips              = model.tooltips || [];
      self.dataFontSize          = model.dataFontSize;
      self.headerFontSize        = model.headerFontSize;
      self.fontColor             = model.fontColor;
      self.headersVertical       = model.headersVertical;
    }
    // auto compute types
    if (self.actualtype === undefined || self.actualtype.length === 0) {
      var typesAndAlignments;

      self.actualtype = [];
      self.actualalign = [];

      _.forEach(self.columnNames, function(column, index) {
        typesAndAlignments = self.getColumnTypeAndAlignment(index + 1);

        self.actualtype.push(typesAndAlignments.actualtype);
        self.actualalign.push(typesAndAlignments.actualalign);
      });

      if (!_.isEmpty(model.alignmentForType)) {
        _.forEach(model.types, function(type, index) {
          var alignment = model.alignmentForType[type];
          if(alignment){
            self.actualalign[index] = alignment;
          }
        });
      }

      _.forEach(model.alignmentForColumn, function(alignment, columnName) {
        if (model.alignmentForColumn.hasOwnProperty(columnName)) {
          self.actualalign[self.columnNames.indexOf(columnName)] = alignment;
        }
      });
    }

    self.setCellHighlighters();

    self.contextMenuItems = {};
    if (!_.isEmpty(model.contextMenuItems)) {
      _.forEach(model.contextMenuItems, function(item) {
        self.contextMenuItems[item] = {
          name: item,
          callback: function(itemKey, options) {
            var index = self.table.cell(options.$trigger.get(0)).index();
            self.tableDisplayModel.send({event: 'CONTEXT_MENU_CLICK', itemKey : itemKey, row : index.row, column : index.column - 1}, self.tableDisplayView.callbacks());
          }
        }
      });
    }

    if (!_.isEmpty(model.contextMenuTags)) {
      _.forEach(model.contextMenuTags, function(tag, name) {
        if (model.contextMenuTags.hasOwnProperty(name)) {
          self.contextMenuItems[name] = {
            name: name,
            callback: function(itemKey, options) {
              var index = self.table.cell(options.$trigger.get(0)).index();
              var params = {
                actionType: 'CONTEXT_MENU_CLICK',
                contextMenuItem: itemKey,
                row: index.row,
                col: index.column - 1
              };
              self.tableDisplayModel.send({event: 'actiondetails', params: params}, self.tableDisplayView.callbacks());
            }
          }
        }
      });
    }

    self.doCreateData(model);
    self.doCreateTable(model);
    var $body = $(document.body);

    $body.off('click.bko-dt-container', self.containerClickFunction);
    $body.on('click.bko-dt-container', self.containerClickFunction);
    $body.tooltip({
      items: '.bko-tooltip',
      show: { delay: 300, duration: 300 },
      position: { my: 'left bottom', at: 'center top' }
    });

    updateTableEventListener = self.applyChanges.bind(self);

    self.element[0].removeEventListener('update.bko-table', updateTableEventListener);
    self.element[0].addEventListener('update.bko-table', updateTableEventListener);
  };

  TableScope.prototype.getColumnTypeAndAlignment = function(colIdx) {
    var self = this;
    var index = colIdx - 1;
    var defaultResult = {
      actualtype: 0,
      actualalign: 'L'
    };

    if (!self.types) {
      return defaultResult;
    }

    var stringFormatForColumn =  self.stringFormatForColumn[self.columnNames[index]];
    if (stringFormatForColumn && stringFormatForColumn.type === 'value'){
      return defaultResult;
    }

    return self.getTypeAndAlignmentByTypeString(self.types[index], stringFormatForColumn);
  };

  TableScope.prototype.getTypeAndAlignmentByTypeString = function(type, stringFormatForColumn) {
    if (type === 'time' || type === 'datetime') {
      return {
        actualtype: 8,
        actualalign: 'C'
      };
    }

    if (type === 'integer') {
      return {
        actualtype: 2,
        actualalign: 'R'
      };
    }

    if (type === 'int64') {
      return {
        actualtype: 0,
        actualalign: 'R'
      };
    }

    if (type === 'double') {
      if (this.stringFormatForType && this.stringFormatForType.double || stringFormatForColumn) {
        return {
          actualtype: 3,
          actualalign: 'R'
        };
      }

      return {
        actualtype: '4.3',
        actualalign: 'R'
      };
    }

    return {
      actualtype: 0,
      actualalign: 'L'
    };
  };

  TableScope.prototype.setCellHighlighters = function() {
    var self = this;
    // cell highlighters
    self.cellHighlighters = {}; //map: col index -> highlighter
    var cellHighlightersDataRev = self.cellHighlightersData.slice().reverse();
    _.forEach(cellHighlightersDataRev, function(highlighter) {
      if (!highlighter) { return; }
      if(_.isEmpty(self.cellHighlighters[highlighter.colInd])){
        var jsHighlighter = cellHighlighters.createHighlighter(highlighter.type, highlighter);
        if (jsHighlighter) {
          self.cellHighlighters[highlighter.colInd] = jsHighlighter;
        }
      }
    });
  };

  TableScope.prototype.doCreateData = function(model) {
    var self = this;
    // create a dummy column to keep server ordering if not already present
    var values = model.hasOwnProperty('filteredValues') ? model.filteredValues : model.values || [];
    if (!self.hasIndex) {
      var data = [];
      var r;
      for (r = 0; r < values.length; r++) {
        var row = [];
        row.push(r);
        data.push(row.concat(values[r]));
      }
      self.data = data;
    } else {
      var data = [];
      var r;
      for (r = 0; r < values.length; r++) {
        var row = [];
        data.push(row.concat(values[r]));
      }
      self.data = data;
    }
  };

  //jscs:disable
  TableScope.prototype.update_size = function() {
    //jscs:enable
    var self = this;
    var me = $('#' + self.id);
    // this is dataTables_scrollBody
    var pp = me.parent();
    var tableWidth = me.width();
    var scrollWidth = self.scrollbarWidth;
    if (pp.width() > tableWidth + scrollWidth) {
      if(pp.height() < me.height()){
        tableWidth += scrollWidth;
      }
      pp.width(tableWidth);
    }
    if (self.fixcols) { //do not need data update
      self.fixcols._fnColCalc();
      self.fixcols._fnGridLayout()
    }
  };

  TableScope.prototype.highlightFixedColumnRow = function(dtRowIndex, highlight) {
    var self = this;
    if (self.fixcols) {
      var doHighlight = function(row){
        if (highlight) {
          row.addClass('hover');
        } else {
          row.removeClass('hover');
        }
      };
      var row = self.table.row(dtRowIndex).node();
      if (!row) { return; }
      var fixRowIndex = self.table.row(dtRowIndex).node().rowIndex;
      var fixedColumns = self.fixcols.dom.clone;
      if(fixedColumns.left.body){
        doHighlight($(fixedColumns.left.body.rows[fixRowIndex]));
      }
      if(fixedColumns.right.body){
        doHighlight($(fixedColumns.right.body.rows[fixRowIndex]));
      }
    }
  };

  TableScope.prototype.updateBackground = function() {
    var self = this;
    if (self.table === undefined) {
      return;
    }
    for (var colInd = 0; colInd < self.columns.length; colInd++) {

      var max = Math.max(self.table.column(colInd).data().max(), Math.abs(self.table.column(colInd).data().min()));

      self.table.column(colInd).nodes().each(function(td) {
        var value = $(td).text();
        if ($.isNumeric(value)) {
          $(td).empty();
          var barsRenderer = self.colorder ? self.barsOnColumn[self.colorder[colInd]] : undefined;
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
      var cellHighlighter = self.cellHighlighters[colInd];
      if (cellHighlighter) {
        cellHighlighter.doHighlight(self);
      }
    }
  };

  TableScope.prototype.addInteractionListeners = function() {
    var self = this;
    if (!self.interactionListeners) {
      $(self.table.table().container())
        .on("mouseenter.bko-dt-interaction", 'td, th', function(e) {
          if (self.tableHasFocus()) {
            return; //ignore mouse over for key events if there is focus on table's cell
          }
          var column = self.getColumnIndexByCellNode(this);
          if (!self.onKeyListeners[column]) {
            self.onKeyListeners[column] = function(onKeyEvent) {
              if (self.tableHasFocus()) {
                return; //ignore mouse over for key events if there is focus on table's cell
              }
              if (!onKeyEvent.isDefaultPrevented()) {
                self.onKeyAction(column, onKeyEvent);
              }
            };
            $(document).on("keydown.bko-datatable", self.onKeyListeners[column]);
          }
        })
        .on("mouseleave.bko-dt-interaction", 'td, th', function(e) {
          var column = self.getColumnIndexByCellNode(this);
          var listener = self.onKeyListeners[column];
          if (listener) {
            self.onKeyListeners[column] = undefined;
            $(document).off("keydown.bko-datatable", listener);
          }
        });
      self.interactionListeners = true;
    }
  };

  TableScope.prototype.removeInteractionListeners = function() {
    var self = this;
    if (self.interactionListeners) {
      $(self.table.table().container()).off('mouseenter.bko-dt-interaction', 'td, th');
      $(self.table.table().container()).off('mouseleave.bko-dt-interaction', 'td, th');
      self.interactionListeners = false;
    }
  };

  TableScope.prototype.showHideBars = function(column) {
    var self = this;
    if (self.barsOnColumn[column]) {
      self.barsOnColumn[column] = undefined;
    } else {
      self.barsOnColumn[column] = {includeText: true};
    }
    _.defer(function() { self.table.draw(false);  });
  };

  TableScope.prototype.showHideHighlighter = function(columnIndex, highlighterType){
    var self = this;
    var highlighter = self.cellHighlighters[columnIndex];
    if (!highlighter || !(highlighter instanceof highlighterType)) {
      if (highlighter) {
        highlighter.removeHighlight(self);
      }
      self.cellHighlighters[columnIndex] = new highlighterType({ colInd: columnIndex });
    } else {
      highlighter.removeHighlight(self);
      self.cellHighlighters[columnIndex] = undefined;
    }
    _.defer(function() { self.table.draw(false);  });
  };

  TableScope.prototype.showHideHeatmap = function(columnIndex) {
    this.showHideHighlighter(columnIndex, cellHighlighters.HeatmapHighlighter);
  };

  TableScope.prototype.haColumnUniqueEntriesHighlighted = function(columnIndex) {
    var highlighter = this.cellHighlighters[this.colorder[columnIndex]];
    return highlighter && highlighter instanceof cellHighlighters.UniqueEntriesHighlighter;
  };

  TableScope.prototype.showHideUniqueEntries = function(columnIndex) {
    this.showHideHighlighter(columnIndex, cellHighlighters.UniqueEntriesHighlighter);
  };

  TableScope.prototype.columnHasFormat = function(column, format) {
    var self = this;
    for (var i = 0; i < self.types.length; i++) {
      if(self.types[column] === format){
        return true;
      }
    }
    return false;
  };

  TableScope.prototype.changePrecision = function(column, precision) {
    var self = this;
    if(self.columnHasFormat(column, 'double')){
      self.actualtype[column] = self.getActualTypeByPrecision(precision);
      self.applyChanges();
    }
  };

  TableScope.prototype.changeAllPrecision = function(precision) {
    var self = this;
    for (var i = 0; i < self.columns.length - 1; i++) {
      if(self.columnHasFormat(i, 'double')){
        self.actualtype[i] = self.getActualTypeByPrecision(precision);
      }
    }
    self.applyChanges();
  };

  TableScope.prototype.changeTimeFormat = function(timeUnit) {
    this.formatForTimes = timeUnit;
    this.applyChanges();
  };

  TableScope.prototype.doShowFilter = function(column, isSearch) {
    var self = this;
    var jqContainer = $(self.table.table().container());
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
    if (self.showFilter) {
      if(self.columnSearchActive !== isSearch){
        self.clearFilters();
        redrawFixCols = true;
      }
    } else {
      self.showFilter = true;
      self.showFilterElements();
      redrawFixCols = true;
    }
    self.columnSearchActive = isSearch;

    var filterInputSelector = '.filterRow .filter-input';
    jqContainer.off('keyup.column-filter change.column-filter');
    jqContainer.on('keyup.column-filter change.column-filter', filterInputSelector, function(e) {
      var element = this;
      if (self.columnSearchActive) {
        self.columnFilterFn(e, element);
      } else {
        self.debouncedColumnFilterFn(e, element);
      }
    });

    setTimeout(function() {
      self.table.draw(false);
      if (self.fixcols && redrawFixCols) {
        self.fixcols.fnRedrawLayout();
      }
      if(column){
        self.getColumnFilter(column).focus();
      }
    }, 0);
  };

  TableScope.prototype.hideFilter = function() {
    var self = this;
    self.clearFilters();
    self.showFilter = false;
    self.hideFilterElements();
    // if (!(self.$$phase || $rootScope.$$phase)) {
    //   self.$apply();
    // }
    setTimeout(function(){
      if (self.fixcols){
        self.fixcols.fnRedrawLayout();
      }
    }, 0);
  };

  TableScope.prototype.clearFilters = function() {
    var self = this;
    var hasNotEmptyFilter = false;
    self.table.columns().every(function(index) {
      var column = this;
      var jqInput = self.getColumnFilter(column);
      var filterValue = jqInput.val();
      if (!_.isEmpty(filterValue)) {
        hasNotEmptyFilter = true;
        jqInput.val('');
        if (index === 0) {
          self.table.search('');
        } else {
          column.search('');
        }
      }
    });
    if (hasNotEmptyFilter) {
      self.table.draw();
    }
    self.columnFilter = [];
    self.tableFilter = '';
  };

  TableScope.prototype.clearFilter = function(column, jqInput) {
    var self = this;
    if (column) {
      var filterValue = jqInput.val();
      if (!_.isEmpty(filterValue)) {
        jqInput.val('');
        if (column.index() === 0) {
          if (self.columnSearchActive) {
            self.table.search('');
          }
          self.table.draw();
          self.tableFilter = '';
        } else {
          if (self.columnSearchActive) {
            column.search('');
          }
          column.draw();
          self.columnFilter[self.colorder[column.index()] - 1] = '';
        }
        if (!jqInput.is(':focus')) {
          self.checkFilter();
        }
        self.stopFilterEditing(jqInput);
      }
    }
  };

  TableScope.prototype.stopFilterEditing = function(jqInputEl) {
    jqInputEl.css('width', '');
    jqInputEl.parent().removeClass('editing');
    jqInputEl.parent().siblings('.hidden-filter').addClass('hidden-filter-input');
  };

  TableScope.prototype.onFilterBlur = function(jqInputEl) {
    var self = this;
    self.stopFilterEditing(jqInputEl);
    setTimeout(function() {
      var filtersInFocus = $(self.table.table().container()).find('.filter-input:focus');
      if (!filtersInFocus.length) {
        //focus wasn't moved to another filter input
        self.checkFilter();
      }
    }, 0);
  };

  TableScope.prototype.checkFilter = function() {
    var self = this;
    var hasNotEmptyFilter = false;

    $(self.table.table().container()).find('.filter-input').each(function(i, filterInput){
      if(!_.isEmpty(filterInput.value)){
        hasNotEmptyFilter = true;
      }
    });

    if(!hasNotEmptyFilter){
      self.hideFilter();
    }
  };

  TableScope.prototype.onFilterEditing = function(jqInputEl, column){
    var self = this;
    self.updateFilterWidth(jqInputEl, column);
    jqInputEl.parent().addClass('editing');
    jqInputEl.parent().siblings('.hidden-filter').removeClass('hidden-filter-input');
  };

  TableScope.prototype.updateFilterWidth = function(jqInput, column){
    var self = this;
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

  TableScope.prototype.onKeyAction = function(column, onKeyEvent) {
    var self = this;
    var key = onKeyEvent.keyCode;
    var charCode = String.fromCharCode(key);

    if (charCode) {
      switch(charCode.toUpperCase()){
        case 'B':
          self.showHideBars(self.colorder[column]);
          break;
        case 'H':
          self.showHideHeatmap(column);
          break;
        case 'U':
          self.showHideUniqueEntries(column);
          break;
      }
      if (key >= 48 && key <= 57){ //numbers 1..9
        if(onKeyEvent.shiftKey){
          self.changePrecision(self.colorder[column] - 1, parseInt(charCode));
        }else{
          self.changeAllPrecision(parseInt(charCode));
        }
      }
    }
  };

  TableScope.prototype.getColumnIndexByCellNode = function(cellNode) {
    var self = this;
    return tableUtils.findDTColumnIndex(self.table.settings()[0], cellNode);
  };

  TableScope.prototype.removeOnKeyListeners = function() {
    var self = this;
    for (var f in self.onKeyListeners) {
      if (self.onKeyListeners.hasOwnProperty(f)) {
        $(document).off("keydown.bko-datatable", self.onKeyListeners[f]);
      }
    }
    self.onKeyListeners = {};//map: col index -> listener function
  };

  TableScope.prototype.applyColumnRenderer = function(colIndex, renderer){
    var self = this;
    switch (renderer.type) {
      case 'DataBars':
        self.barsOnColumn[colIndex + 1] = {includeText: renderer.includeText};
        break;
      //other renderers here
    }
  };

  TableScope.prototype.updateHeaderLayout = function() {
    var self = this;
    if (self.table) {
      self.updateHeaderFontSize();
      self.rotateHeader();
    }
  };

  TableScope.prototype.updateHeaderFontSize = function() {
    var self = this;
    if (self.headerFontSize) {
      $(self.table.table().container()).find('thead tr:not(".filterRow") th').css({
        'font-size': self.headerFontSize,
        'line-height': self.headerFontSize + 'px'
      });
    }
  };

  TableScope.prototype.rotateHeader = function() {
    var self = this;
    var headerRows = $(self.table.table().container())
      .find('.DTFC_LeftHeadWrapper, .DTFC_RightHeadWrapper, .dataTables_scrollHead')
      .find('thead tr:not(".filterRow")');
    var headerCols = headerRows.find('th');
    var headerTexts = headerCols.find('span.header-text');
    var headerTextMaxWidth = Math.max.apply(null, headerTexts.map(function() {
      return $(this).width();
    }).get());
    var lineHeight = parseFloat(headerTexts.css('font-size'));
    if (self.headersVertical) {
      headerTexts.addClass('rotate');
      var padding = 10;
      headerTexts.css({
        'line-height': lineHeight + 'px',
        'transform': 'rotate(270deg) translateX(-' + (lineHeight - padding) + 'px)',
        'width': (headerTextMaxWidth - padding) + 'px'
      });
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

  TableScope.prototype.doCreateTable = function(model) {
    var self = this;
    var cols = [];
    var i;

    var createColumnMenuItems = require('./tableHeaderMenu/createColumnMenuItems').default;
    var headerMenuItems = createColumnMenuItems.call(self, cellHighlighters);

    // build configuration
    var converter = self.allConverters[1];
    var createdCell = function(td, cellData, rowData, row, col) {
      if (self.dataFontSize) {
        $(td).css({'font-size': self.dataFontSize});
      }
    };
    if (self.hasIndex) {
      for (i = 0; i < self.allTypes.length; i++) {
        if (self.allTypes[i].type !== self.indexActualType) {
          continue;
        }

        converter = self.allConverters[self.allTypes[i].type];
        if (!self.indexActualType) {
          break;
        }

        if (self.isDoubleWithPrecision(self.indexActualType)) {
          converter = self.doubleWithPrecisionConverters[self.getDoublePrecision(self.indexActualType)];
        } else if (self.allConverters[self.indexActualType] !== undefined) {
          converter = self.allConverters[self.indexActualType];
        }

        break;
      }
      cols.push({'title' : self.indexName, 'className': 'dtright', 'render': converter, createdCell: createdCell});
    } else {
      cols.push({'title': '    ', 'className': 'dtright', 'render': converter, createdCell: createdCell});
    }

    var beakerObj = bkHelper.getBeakerObject().beakerObj;
    self.outputColumnLimit = beakerObj.prefs && beakerObj.prefs.outputColumnLimit ?
      beakerObj.prefs.outputColumnLimit : self.columnNames.length;

    for (i = 0; i < self.columnNames.length; i++) {
      var type = self.actualtype[i];
      var al = self.actualalign[i];
      var col = {
        'title' : '<span class="header-text">' + self.columnNames[i] +'</span>',
        'header': { 'menu': headerMenuItems },
        'visible': i<self.outputColumnLimit
      };
      col.createdCell = function(td, cellData, rowData, row, col) {
        if(!_.isEmpty(self.tooltips)){
          $(td).attr('title', self.tooltips[row][col - 1]);
        }
        if (self.dataFontSize) {
          $(td).css({'font-size': self.dataFontSize});
        }
        if (!_.isEmpty(self.fontColor)) {
          var color = self.fontColor[row][col - 1];
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

      var stringFormatForColumn = self.stringFormatForColumn[self.columnNames[i]];
      if (stringFormatForColumn && stringFormatForColumn.type === 'value' && type === 0){
        col.render = self.valueFormatter;
      } else if (self.isDoubleWithPrecision(type)) {
        col.render = self.doubleWithPrecisionConverters[self.getDoublePrecision(type)];
      } else if (self.allConverters[type] !== undefined) {
        col.render = self.allConverters[type];
      }
      if (self.getCellSho) {
        col.visible = self.getCellSho[i];
      }
      if (self.columnWidth) {
        col.sWidth = self.columnWidth[i] || 0;
      }
      cols.push(col);
    }

    self.columns = cols;

    if (self.tableElementsCreated === false) {
      self.createTableElements();
      self.tableElementsCreated = true;
    }

    var id = '#' + self.id;
    var init = {
      'keys': self.focussedCell || true,
      'destroy' : true,
      'data': self.data,
      'columns': self.columns,
      'stateSave': true,
      'processing': true,
      'autoWidth': true,
      'ordering': true,
      'order': self.tableOrder ? _.clone(self.tableOrder) : [],
      'scrollX': '10%',
      'searching': true,
      'deferRender': true,
      'select': {
        items: 'cells',
        info: false
      },
      'language': {
        'emptyTable': 'empty table'
      },
      'preDrawCallback': function(settings) {
        self.updateTableWidth();
        if(self.table){
          //allow cell's text be truncated when column is resized to a very small
          self.table.columns().every(function(i){
            var colWidth = settings.aoColumns[i].sWidthOrig;
            if (colWidth) {
              settings.aoColumns[i].sWidth = colWidth;
              $(self.table.column(i).nodes())
                .css('max-width', colWidth)
                .css('min-width', colWidth);
            }
          });
        }
      },
      'headerCallback': function(thead) {
        if (!self.table) {
          return;
        }

        var cells = $(thead).find('th');
        _.forEach(cells, function(cell) {
          var $cell = $(cell);
          var columnIndex = $cell.data('columnIndex');

          $cell
            .attr('title', self.types[columnIndex - 1])
            .addClass('bko-tooltip');
        });
      },
      'drawCallback': function(settings) {
        //jscs:disable
        self.update_size();
        self.updateBackground();
        //jscs:enable
      },
      'bSortCellsTop': true,
      'colResize': {
        'tableWidthFixed': false,
        'resizeCallback': function(column){
          self.columnWidth[self.colorder[column.idx] - 1] = column.sWidthOrig;
        },
        'exclude': _.range(self.columns.length - self.pagination.fixRight, self.columns.length)
      }
    };

    var domCommon = '<"bko-table"Z' + (self.data.length > 500 ? 'r' : '') + 't';
    if (!self.pagination.use) {
      init.paging = false;
      init.scrollY = self.getScrollY();
      init.scrollCollapse = true;
      init.dom = domCommon + '>';
    } else {
      init.dom = domCommon + '<"bko-table-bottom"<"bko-table-selector"l><"bko-table-pagenum"p><"bko-table-use-pagination">>S>';
      if (self.data.length > tableConsts.MIN_ROWS_FOR_PAGING) {
        init.pagingType = 'simple_numbers';
        init.pageLength = self.pagination.rowsToDisplay;
        init.lengthMenu = self.rowsToDisplayMenu;
      } else {
        init.paging = false;
        init.scrollCollapse = true;
      }
    }
    self.fixcreated = false;
    if (!_.isEmpty(self.contextMenuItems)) {
      $.contextMenu({
        selector: id +' tbody td',
        items: self.contextMenuItems
      });
    }

    var rotateMenuItem = {
      callback: function(itemKey, options) {
        self.headersVertical = !!!self.headersVertical;
        self.rotateHeader();
        self.table.draw();
      }
    };
    $.contextMenu({
      selector: id +'_wrapper thead',
      zIndex: 3, //to be over fixed headers
      items: {
        verticalHeaders: _.extend({}, rotateMenuItem, {
          name: 'vertical headers',
          visible: function(key, opt){
            return !!!self.headersVertical;
          }
        }),
        horizontalHeaders: _.extend({}, rotateMenuItem, {
          name: 'horizontal headers',
          visible: function(key, opt){
            return !!self.headersVertical;
          }
        })
      }
    });

    $(document).on('contextmenu.bko-dt-header', id +'_wrapper thead th', function(){
      $(this).blur();
    });

    $(id).parents('.dataTables_scroll').find('th, td')
      .removeClass(tableConsts.FC_LEFT_SEPARATOR_CLASS + ' ' + tableConsts.FC_RIGHT_SEPARATOR_CLASS);
    self.table = $(id).DataTable(init);

    self.updateHeaderLayout();

    self.table.settings()[0].oScroll.iBarWidth = self.scrollbarWidth;
    self.renderMenu = true;
    if (!self.colorder) {
      self.colorder = _.range(self.columnNames.length + 1);
    }
    self.colreorg = new dataTablesColReorder($(id), {
      'order': self.colorder,
      'fnReorderCallback': function() {
        if (self.colreorg === undefined || self.colreorg.s == null) {
          return;
        }
        self.colorder = self.colreorg.fnOrder().slice(0);
        self.refreshCells();
        self.applyFilters();
        self.updateBackground();
      },
      'iFixedColumns': self.pagination.fixLeft + 1,
      'iFixedColumnsRight': self.pagination.fixRight
    });

    if(init.paging !== false){
      var pagination = $(self.element).find(".bko-table-use-pagination");
      $('<input type="checkbox" checked="true" id=' + self.id +'usePagination class="beforeCheckbox">')
        .bind('click', function(e) {
          self.doUsePagination();
        })
        .appendTo(pagination);
      $('<label for=' + self.id +'usePagination> use pagination</label>')
        .appendTo(pagination);
    }

    self.bindEvents();

    var inits = {'heightMatch': 'none'};
    if ((self.pagination.fixLeft + self.pagination.fixRight) > (self.columns.length - 1)) {
      self.pagination.fixLeft = 0;
      self.pagination.fixRight = 0;
    }
    if (self.pagination.fixLeft) {
      inits.leftColumns = 1 + self.pagination.fixLeft;
    } else {
      inits.leftColumns = 1;
    }
    if (self.pagination.fixRight) {
      inits.rightColumns = self.pagination.fixRight;
    } else {
      inits.rightColumns = 0;
    }

    self.keyTable = self.table.settings()[0].keytable;
    self.fixcols = new dataTablesFixedColumns(self.table, inits);
    self.refreshCells();

    var createColumnMenus = require('./tableHeaderMenu/createColumnMenus').default;
    self.columnMenus = createColumnMenus(self);

    // $rootScope.$emit('beaker.resize'); //TODO check - handle resize?
    self.fixcols.fnRedrawLayout();
    self.updateFixedColumnsSeparator();

    setTimeout(function(){
      if (!self.table) { return; }

      self.createTableMenuElements();
      self.applyFilters();

      if (self.columnFilter) {
        self.table.columns().every(function(i) {
          var column = this;
          var jqInput = self.getColumnFilter(column);
          if (i === 0) {
            var filterValue = self.tableFilter;
            jqInput.val(filterValue);
            if (self.columnSearchActive && !_.isEmpty(filterValue)) {
              self.table.search(filterValue);
            }
          } else {
            var filterValue = self.columnFilter[self.colorder[i] - 1];
            jqInput.val(filterValue);
            if (self.columnSearchActive && !_.isEmpty(filterValue)) {
              column.search(filterValue);
            }
          }
        });
      }
      if (self.showFilter) {
        self.doShowFilter(null, self.columnSearchActive);
      }
      // $rootScope.$emit('beaker.resize'); //TODO check - handle resize?

      self.adjustRedraw();
    }, 0);

    self.initTableSelect();
  };

  TableScope.prototype.bindEvents = function() {
    var self = this;
    var id = '#' + self.id;

    $(id + ' tbody').on('dblclick', 'td', function(e) {
      if (!self.table) { return; }
      var rowIdx;
      var colIdx;
      var iPos = self.table.cell(this).index();
      if (iPos) { //selected regular cell
        rowIdx = iPos.row;
        colIdx = iPos.column;
      } else { //selected fixed column or index cell
        var position = self.fixcols.fnGetPosition(this);
        rowIdx = position[0];
        if ($(this).parents().hasClass('DTFC_RightWrapper')) {
          var order = self.colorder;
          var fixRight = self.pagination.fixRight;
          var colIdxInRight = position[1];
          colIdx = order[order.length - fixRight + colIdxInRight];
        } else {
          colIdx = position[1];
        }
      }

      var currentCell = self.table.cells(function(idx, data, node) {
        return idx.column === colIdx && idx.row ===  rowIdx;
      });

      var index = currentCell.indexes()[0];

      var model = self.model.getCellModel();

      if (model && model.hasDoubleClickAction) {
        self.tableDisplayModel.send(
          {event: 'DOUBLE_CLICK', row : index.row, column : index.column - 1},
          self.tableDisplayView.callbacks()
        );
      }

      if (!_.isEmpty(model && model.doubleClickTag)) {
        var params = {
          actionType: 'DOUBLE_CLICK',
          row: index.row,
          col: index.column - 1
        };
        self.tableDisplayModel.send({event: 'actiondetails', params: params}, self.tableDisplayView.callbacks());
      }

      e.stopPropagation();
    });

    $(id + ' tbody')
      .on('mouseenter.bko-dt-highlight', 'tr', function() {
        if (!self.table) { return; }
        var dtTR = self.getDtRow(this);
        var rowIndex = self.table.row(dtTR).index();
        $(dtTR).addClass('hover');
        self.highlightFixedColumnRow (rowIndex, true);
      })
      .on('mouseleave.bko-dt-highlight', 'tr', function() {
        if (!self.table) { return; }
        var dtTR = self.getDtRow(this);
        var rowIndex = self.table.row(dtTR).index();
        $(dtTR).removeClass('hover');
        self.highlightFixedColumnRow (rowIndex, false);
      })
      .on('click', function() {
        self.element.focus();
      });

    $(self.table.table().container()).find('.dataTables_scrollHead').on('scroll', function() {
      var filtersInFocus = $(self.table.table().container()).find('.filter-input:focus');
      if (filtersInFocus.length) {
        self.stopFilterEditing(filtersInFocus);
      }
    });

    self.removeOnKeyListeners();

    if (self.update) {
      self.addInteractionListeners();
    }

    self.table
      .on('key', function(e, datatable, key, cell, originalEvent) {
        originalEvent.preventDefault();
        self.onKeyAction(cell.index().column, originalEvent);
      })
      .on('column-visibility.dt', _.debounce(function(e, settings, column, state) {
        self.getCellSho[self.colorder[column] - 1] = state;

        setTimeout(function(){
          self.updateHeaderLayout();
          self.table.draw(false);
        }, 0);
      }, 100))
      .on( 'column-sizing.dt', function( e, settings ) {
        self.updateTableWidth();
      })
      .on('column-reorder', function(e, settings, details) {
        var selectedCells = self.table.cells({ selected: true });
        var indexes = selectedCells.indexes();
        var columnIndexes = indexes.pluck('column').unique();
        var rowIndexes;

        if (_.contains(columnIndexes, details.to)) {
          return;
        }

        rowIndexes = indexes.pluck('row').unique();

        self.deselectCells(self.table.cells(rowIndexes, details.to));
        self.table.cells(
          rowIndexes,
          columnIndexes
        ).select();
      });

    function updateSize() {
      clearTimeout(self.refresh_size);
      self.refresh_size = setTimeout(function() {
        self.update_size();
      }, 250);
    }

    $(window).bind('resize.' + self.id, function() {
      updateSize();
    });
  };

  TableScope.prototype.doDestroyMenus = function() {
    var self = this;

    this.element.off('click.headermenu');
    this.columnMenus && this.columnMenus.forEach(function(menu) {
      menu.destroy();
      setTimeout(function() { menu = undefined; });
    });

    this.indexMenu && this.indexMenu.destroy();
    setTimeout(function() {
      self.columnMenus = undefined;
      self.indexMenu = undefined;
    });
  };

  TableScope.prototype.enableJupyterKeyHandler = function() {
    this.element
      .on('focusin', this.elementFocusIn.bind(this))
      .on('focusout', this.elementFocusOut.bind(this));
  };

  TableScope.prototype.elementFocusIn = function(e) {
    this.setJupyterEditMode();
  };

  TableScope.prototype.elementFocusOut = function(e) {
    this.setJupyterCommandMode();
  };

  TableScope.prototype.setJupyterEditMode = function() {
    try {
      Jupyter.keyboard_manager.edit_mode();
    } catch (e) {}
  };

  TableScope.prototype.setJupyterCommandMode = function() {
    try {
      Jupyter.keyboard_manager.command_mode();
    } catch (e) {}
  };

  TableScope.prototype.getDumpState = function() {
    return this.model.getDumpState();
  };

  TableScope.prototype.getCellModel = function() {
    return this.model.getCellModel();
  };

  TableScope.prototype.isShowOutput = function() {
    return this.model.isShowOutput();
  };

  TableScope.prototype.getDtRow = function(node) {
    var self = this;
    var dtRow;
    var iPos = self.table.row(node).index();
    if (iPos === undefined) { //node is fixed column
      iPos = self.fixcols.fnGetPosition(node);
      dtRow = self.table.row(iPos).node();
    } else { //regular node
      dtRow = node;
    }
    return dtRow;
  };

  TableScope.prototype.updateTableWidth = function() {
    var me = $('#' + this.id);
    me.css('width', me.outerWidth());
  };

  TableScope.prototype.getColumnIndexByColName = function(columnName) { // takes into account colorder and index column
    var self = this;
    var initInd = self.columnNames.indexOf(columnName) + 1;
    return !_.isEmpty(self.colorder) ? self.colorder.indexOf(initInd) : initInd;
  };

  TableScope.prototype.isDoubleWithPrecision = function(type){
    var parts = type.toString().split(".");
    return parts.length > 1 && parts[0] === '4';
  };

  TableScope.prototype.getDoublePrecision = function(type){
    return this.isDoubleWithPrecision(type) ? type.toString().split(".")[1] : null;
  };

  TableScope.prototype.prepareDoubleWithPrecisionConverters = function() {
    var self = this;
    for (var precision = 1; precision < 10; precision++) {
      self.doubleWithPrecisionConverters[precision] = function(precision, value, type, full, meta) {
        if (value !== undefined && value !== '' && value !== 'null' && value !== null) {
          return parseFloat(value).toFixed(precision);
        }
        if (type === 'sort') {
          return NaN;
        }
        return value;
      }.bind({}, precision);
    }
  };

  TableScope.prototype.getAllowedTypesByType = function(type) {
    if (!this.types) {
      return this.allTypes;
    }

    if (type === 'string') {
      return this.allStringTypes;
    }

    if (type === 'double') {
      return this.allDoubleTypes;
    }

    if (type === 'integer' || type === 'int64') {
      return this.allIntTypes;
    }

    if (type === 'time' || type === 'datetime') {
      return this.allTimeTypes;
    }

    if (type === 'boolean') {
      return this.allBoolTypes;
    }

    return this.allStringTypes;
  };

  TableScope.prototype.refreshCells = function() {
    var self = this;
    self.getCellIdx      =  [];
    self.getCellNam      =  [];
    self.getCellSho      =  [];
    self.getCellAlign    =  [];
    self.getCellDisp     =  [];
    self.getCellDispOpts =  [];

    if (self.table === undefined) {
      return;
    }

    var i;
    for (i = 1; i < self.columns.length; i++) {
      self.getCellIdx.push(i - 1);
      var order = self.colorder[i];
      self.getCellNam.push(self.columns[order].title);
      self.getCellSho.push(self.getColumnByInitialIndex(i).visible());
      self.getCellDisp.push(self.actualtype[order - 1]);
      self.getCellAlign.push(self.actualalign[order - 1]);
      self.getCellDispOpts.push(self.getAllowedTypesByType(self.types && self.types[order - 1]));
    }
    $(self.table.table().header()).find("th").each(function(i){
      var events = jQuery._data(this, 'events');
      if (events && events.click) {
        var click = events.click[0].handler;
        $(this).unbind('click.DT');
        $(this).bind('click.DT', function(e) {
          if(!$(e.target).hasClass('bko-column-header-menu')){
            click(e);
            setTimeout(function(){
              self.tableOrder = [];
              var order = self.table.order();
              for(var i = 0; i < order.length; i++){
                self.tableOrder.push([self.colorder[order[i][0]], order[i][1]]);
              }
            }, 0);
          }
          $(this).blur(); //outline is not removed for fixed columns so remove it manually
        });
      }
    });
    $.each(self.colreorg.s.dt.aoColumns, function(i, column) {
      var filter = self.getColumnFilter(self.table.column(column.idx + ":visible"));
      if (filter) {
        filter.closest('th').attr('data-column-index', i);
      }
    });
  };

  TableScope.prototype.getColumnByInitialIndex = function(index){
    var self = this;
    if (!self.table) { return null; }
    if (self.colorder){
      index = self.colorder.indexOf(index);
    }
    return self.table.column(index);
  };

  TableScope.prototype.getColumnFilter = function(column){
    return tableUtils.findFilterInput(this.table.settings()[0], column.index());
  };

  TableScope.prototype.updateFixedColumnsSeparator = function() {
    var self = this;
    if (self.table) {
      var getHeader = function(thIndex) {
        return $(self.table.header()).find('tr').find('th:eq(' + thIndex + ')');
      };
      var updateColumn = function(columnIndex, cssClass) {
        var column = self.table.column(columnIndex);
        if (!column.visible()) { return; }
        var columnHeader = getHeader($(column.header()).index());
        $(column.nodes()).addClass(cssClass);
        columnHeader.addClass(cssClass);
      };
      var addClassToColumnsNodes = function(columnIndexList) {
        columnIndexList.forEach(function(columnIndex) {
          var nodes = self.table.column(columnIndex).nodes();
          $(nodes).addClass(tableConsts.FC_COL_FIXED_CLASS);
        });
      };
      var updateFixesCols = function(index, side) {
        var indexList = [];
        var startIndex = side === 'left' ? 0 : index;
        var endIndex = side === 'left' ? index : self.columns.length-1;
        for (var i=startIndex; i<=endIndex; i++) {indexList.push(i)}
        addClassToColumnsNodes(indexList);
      };
      updateColumn(self.pagination.fixLeft, tableConsts.FC_LEFT_SEPARATOR_CLASS);
      updateFixesCols(self.pagination.fixLeft, 'left');
      if (self.pagination.fixRight) {
        updateColumn(self.columns.length - self.pagination.fixRight, tableConsts.FC_RIGHT_SEPARATOR_CLASS);
        updateFixesCols(self.columns.length - self.pagination.fixRight, 'right');
      }
    }
  };

  TableScope.prototype.applyFilters = function(){
    var self = this;
    if (!self.table) { return; }
    self.removeFilterListeners();
    var filterInputSelector = '.filterRow .filter-input';
    var clearFilterSelector = '.filterRow .clear-filter';

    $(self.table.table().container())
      .on('keyup.column-filter change.column-filter', filterInputSelector, function(e) {
        var element = this;
        if (self.columnSearchActive) {
          self.columnFilterFn(e, element);
        } else {
          self.debouncedColumnFilterFn(e, element);
        }
      })
      .on('focus.column-filter', filterInputSelector, function(event) {
        if(self.keyTable){
          self.keyTable.blur();
        }
      })
      .on('blur.column-filter', filterInputSelector, function(event) {
        self.onFilterBlur($(this));
      })
      .on('keydown.column-filter', filterInputSelector, function(event) {
        var key = event.which;
        var column = self.getColumn(this);
        switch (key) {
          case 13: //enter key
            self.onFilterBlur($(this), this);
            break;
          case 27: //esc
            event.preventDefault();
            self.clearFilter(column, $(this));
            self.updateFilterWidth($(this), column);
            break;
          default:
            self.onFilterEditing($(this), column);
        }
      })
      .on('mousedown.column-filter', clearFilterSelector, function(event) {
        var column = self.getColumn(this);
        var jqFilterInput = $(this).siblings('.filter-input');
        if(jqFilterInput.is(':focus')){
          event.preventDefault();
        }
        self.clearFilter(column, jqFilterInput);
        self.updateFilterWidth(jqFilterInput, column);
      });
  };

  TableScope.prototype.removeFilterListeners = function() {
    $(this.table.table().container()).off(
      'mousedown.column-filter keyup.column-filter change.column-filter keydown.column-filter blur.column-filter focus.column-filter'
    );
  };

  TableScope.prototype.getColumn = function(filterNode){
    var self = this;
    return self.table.column(self.getColumnIndexByCellNode(filterNode) + ':visible');
  };

  TableScope.prototype.columnFilterFn = function(e, element) {
    var self = this;
    if (e.keyCode === 27 || e.keyCode === 13) { return; }
    if ($(element).hasClass('table-filter')) {
      self.tableFilter = element.value;
      if (self.columnSearchActive) {
        self.table.search(self.tableFilter).draw();
      } else {
        self.table.draw();
      }
    } else {
      var column = self.getColumn(element);
      var colIdx = $(element).parents('th').index();
      if (self.columnSearchActive) {
        column.search(element.value);
      }
      self.columnFilter[self.colorder[colIdx] - 1] = this.value;
      column.draw();
      self.updateFilterWidth($(element), column);
    }
  };

  TableScope.prototype.getDebouncedColumnFilterFn = function() {
    var self = this;
    return _.debounce(function(e, element) {
      self.columnFilterFn(e, element);
    }, 500);
  };

  TableScope.prototype.tableHasFocus = function(){
    var self = this;
    var dtContainer = $(self.table.table().container());
    return dtContainer.hasClass("focus") || dtContainer.has(':focus').length;
  };

  TableScope.prototype.escapeHTML = function(text) {
    if ($.type(text) === 'string') {
      return text.replace(/[\'&'\/<>]/g, function(a) { return chr[a]; });
    }
    return text;
  };

  TableScope.prototype.truncateString = function(text, limit) {
    limit = limit !== undefined ? limit : 1000;
    if (text && text.length > limit) {
      text = text.substring(0, limit);
      text += '...';
    }
    return text;
  };

  TableScope.prototype.applyChanges = function() {
    var self = this;
    self.doDestroy(false);
    self.update = true;
    // reorder the table data
    var model = self.model.getCellModel();
    self.doCreateData(model);
    self.doCreateTable(model);
  };

  TableScope.prototype.getScrollY = function() {
    var self = this;
    var notebookViewModel = bkHelper.getBkNotebookViewModel() || {};
    var rowHeight = notebookViewModel.isAdvancedMode && notebookViewModel.isAdvancedMode() ? tableConsts.ROW_HEIGHT_ADVANCED_MODE : tableConsts.ROW_HEIGHT;
    var rowsNumber = self.pagination.rowsToDisplay > 0 ? self.pagination.rowsToDisplay : self.data.length;
    return rowsNumber * rowHeight;
  };

  TableScope.prototype.getCSV = function(selectedOnly) {
    if (selectedOnly) {
      return this.exportCellsTo(this.table.cells({ selected: true }), 'csv');
    }

    return this.exportCellsTo(this.table.cells(), 'csv');
  };

  TableScope.prototype.exportCellsTo = function(cells, format, excludeHeaders) {
    var self = this;
    var i;
    var j;
    var len;
    var data;
    var columnTitle;
    var fix = function(s) { return s.replace(/"/g, '""');};
    var model = self.model.getCellModel();
    var hasIndex = model.hasIndex === "true";
    var exportOptions = {
      sep: ',',
      qot: '"',
      eol: '\n',
      excludeHeaders: excludeHeaders
    };

    function getExportOptions() {
      var cellIndexes = cells.indexes();
      var columnIndexes = cellIndexes.pluck('column').unique();

      if (!columnIndexes.length) {
        columnIndexes = self.table.columns().indexes();
      }

      if (!hasIndex) {
        columnIndexes[0] === 0 && columnIndexes.shift();
      }

      if (!cellIndexes.length) {
        return { columns: columnIndexes };
      }

      return {
        rows: cellIndexes.pluck('row').unique(),
        columns: columnIndexes
      }
    }

    function exportColumnHeaders(data, exportOptions) {
      var out = '';

      if (exportOptions.excludeHeaders) {
        return out;
      }

      for (i = 0, len = data.header.length; i < len; i++) {
        if (out !== '') {
          out = out + exportOptions.sep;
        }
        columnTitle = (hasIndex && i === 0 && !data.header[i]) ? "Index" : fix(data.header[i]);
        out = out + exportOptions.qot + columnTitle + exportOptions.qot;
      }

      return out + exportOptions.eol;
    }

    function exportCells(data, exportOptions) {
      var out = '';

      for (i = 0; i < data.body.length; i++) {
        var row = data.body[i];

        for (j = 0; j < row.length; j++) {
          if (j !== 0) {
            out = out + exportOptions.sep;
          }

          var cellData = row[j];
          if (cellData == null) {
            cellData = '';
          }
          cellData = cellData + '';
          out = [
            out,
            exportOptions.qot,
            (cellData !== undefined && cellData !== null ? fix(cellData) : ''),
            exportOptions.qot
          ].join('');
        }

        if (!exportOptions.excludeHeaders) {
          out = out + exportOptions.eol;
        }
      }

      return out;
    }

    data = self.table.buttons.exportData(getExportOptions());

    if (format === 'tabs') {
      exportOptions.sep = '\t';
      exportOptions.qot = '';
      fix = function(s) { return s.replace(/\t/g, ' ');};
    }

    if (navigator.appVersion.indexOf('Win') !== -1) {
      exportOptions.eol = '\r\n';
    }

    return  exportColumnHeaders(data, exportOptions) + exportCells(data, exportOptions);
  };

  TableScope.prototype.showFilterElements = function() {
    this.element.find('tr.filterRow').show();
  };

  TableScope.prototype.hideFilterElements = function() {
    this.element.find('tr.filterRow').hide();
  };

  TableScope.prototype.showColumn = function(initialIndex, event) {
    var self = this;
    var column = self.getColumnByInitialIndex(initialIndex);
    var visible = !column.visible();
    column.visible(visible);
    if (event){
      event.stopPropagation();
    }

    if (column.visible()){
      var el = $('#' + self.id);
      var table = el.DataTable();
      el.parent().scrollLeft(0);
      window.setTimeout(function() {
        var distance = $(table.column(initialIndex).header()).offset().left;
        var width = el.parent().width() / 2;
        el.parent().scrollLeft(distance - width);
      }, 0)
    }
  };

  TableScope.prototype.isColumnVisible = function(initialIndex) {
    var self = this;
    var column = self.getColumnByInitialIndex(initialIndex);
    return column && column.visible();
  };

  TableScope.prototype.changePageLength = function(len) {
    var self = this;
    self.pagination.rowsToDisplay = len;
    if (self.pagination.use) {
      self.table.page.len(len).draw();
    } else {
      var scrollBody = $('#' + self.id).parent();
      scrollBody.css('max-height', self.getScrollY());
      self.update_size();
    }
  };

  TableScope.prototype.getCellDispOptsF = function(i) {
    return this.getCellDispOpts[i];
  };

  TableScope.prototype.getActualTypeByPrecision = function(precision){
    return '4.' + precision;
  };

  TableScope.prototype.toggleColumnsVisibility = function(visible) {
    var self = this;
    if (!self.table) {
      return;
    }

    var table = self.table;
    var cLength = [];
    for (var i = 1; i < self.columns.length; i++) {
      cLength.push(i);
    }

    table.columns(cLength).visible(visible, false);
    table.columns.adjust();
  };

  TableScope.prototype.doUsePagination = function() {
    var self = this;
    self.pagination.use = !self.pagination.use;
    if(!self.pagination.use){
      self.pagination.rowsToDisplay = self.table.settings()[0]._iDisplayLength;
    }
    // reorder the table data
    self.applyChanges();
  };

  TableScope.prototype.doDeselectAll = function() {
    if (this.table === undefined) {
      return;
    }

    this.deselectCells(this.table.cells({ selected: true }));
  };

  TableScope.prototype.doCopyToClipboard = function() {
    var self = this;
    var queryCommandEnabled = true;
    try {
      document.execCommand('Copy');
    } catch (e) {
      queryCommandEnabled = false;
    }

    if (bkUtils.isElectron || !queryCommandEnabled) {
      return;
    }

    var executeCopy = function(text) {
      var input = document.createElement('textarea');

      document.body.appendChild(input);
      input.value = text;
      input.select();

      try {
        Jupyter.keyboard_manager.enabled = false;
        document.execCommand('Copy');
        Jupyter.keyboard_manager.enabled = true;
      } catch(error) {
        document.execCommand('Copy');
      }

      input.remove();
    };

    var cells = self.table.cells({ selected: true });
    var cellsData = self.exportCellsTo(cells, 'tabs', cells.indexes().length === 1);

    executeCopy(cellsData);
  };

  TableScope.prototype.doCSVExport = function(selectedOnly) {
    var self = this;
    bkHelper.showFileSaveDialog({
      extension: "csv",
      title: 'Select name for CSV file to save',
      saveButtonTitle : 'Save'
    }).then(function(ret) {
      if (ret.uri) {
        return bkHelper.saveFile(ret.uri, self.getCSV(selectedOnly), true);
      }
    });
  };

  TableScope.prototype.doCSVDownload = function(selectedOnly) {
    var self = this;
    var href = 'data:attachment/csv;charset=utf-8,' + encodeURI(self.getCSV(selectedOnly));
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

  TableScope.prototype.doResetAll = function() {
    this.doDestroy(true);
    this.tableDisplayView.render();
  };

  TableScope.prototype.adjustRedraw = function() {
    this.table.columns.adjust().draw();
  };

  TableScope.prototype.prepareValueFormatter = function() {
    var self = this;

    self.valueFormatter = function(value, type, full, meta) {
      var columnName = self.columnNames[meta.col - 1];
      return self.stringFormatForColumn[columnName].values[columnName][meta.row];
    };
  };

  TableScope.prototype.run = function() {
    var self = this;
    self.init(this.model.getCellModel());
    self.tableChanged = true;
  };

  TableScope.prototype.setModelData = function(data) {
    var self = this;

    // TODO quick hack -> standardize all input data
    if (data.getCellModel) {
      self.model = data;
    } else {
      self.model.model = data;
    }
  };

  // update model with partial model data
  TableScope.prototype.updateModelData = function(data) {
    if (this.model && this.model.model && data) {
      this.model.model = _.extend(this.model.model, data);
    }
  };

  TableScope.prototype.buildTemplate = function() {
    var templateString = require('./table.html');
    var compiled = _.template(templateString);

    return compiled({
      scopeId: this.id,
      wrapperId: this.wrapperId
    });
  };

  TableScope.prototype.setElement = function(el) {
    this.element = el;
  };

  TableScope.prototype.createTableElements = function() {
    var self = this;
    if (self.columns) {
      var trs = self.element.find('table thead tr');

      trs.eq(0).empty();

      var filterTd =
        '<th>' +
        '<div class="input-clear-growing">' +
        '<div class="input-clear">' +
        '<span class="fa filter-icon"></span>' +
        '<input class="filter-input" type="text">' +
        '<span class="fa fa-times clear-filter"></span>' +
        '</div>' +
        '<input tabindex="-1" class="hidden-filter hidden-filter-input">' +
        '<span class="hidden-length"></span>' +
        '</div>' +
        '</th>';

      self.columns.forEach(function(col) {
        trs.eq(0).append('<th />');
        trs.eq(1).append(filterTd);
      });

    }
  };

  TableScope.prototype.createTableMenuElements = function() {
    if (this.columnNames) {
      var triggerId = '#' + this.id + '_dropdown_menu';
      var $trigger = this.element.find(triggerId);

      this.indexMenu = new (require('./tableHeaderMenu/IndexMenu').default)(this, $trigger);
    }
  };

  // ---------

  var chr = {
    '"': '&quot;', '&': '&amp;', '\'': '&#39;',
    '/': '&#47;',  '<': '&lt;',  '>': '&gt;'
  };


  // ---------
  // Add column reset methods
  require('./columnReset').default(TableScope);
  require('./tableModal')(TableScope);
  require('./tableSelect')(TableScope);

  return TableScope;

});

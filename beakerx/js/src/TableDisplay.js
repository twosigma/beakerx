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

var widgets = require('jupyter-js-widgets');
var _ = require('underscore');
var $ = require('jquery');

var TableScope = require('./tableDisplay/tableScope');

require('datatables.net-dt/css/jquery.dataTables.css');
require('datatables.net-colreorder-dt/css/colReorder.dataTables.css');
require('datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.css');
require('datatables.net-keytable-dt/css/keyTable.dataTables.css');
require('jquery-contextmenu/dist/jquery.contextMenu.css');
require('./tableDisplay/css/datatables.scss');

var TableDisplayModel = widgets.DOMWidgetModel.extend({
  defaults: function() {
    return _.extend({}, widgets.DOMWidgetModel.prototype.defaults.apply(this), {
      _model_name: 'TableDisplayModel',
      _view_name: 'TableDisplayView',
      _model_module: 'beakerx',
      _view_module: 'beakerx'
    });
  }
});


// Custom View. Renders the widget model.
var TableDisplayView = widgets.DOMWidgetView.extend({
  render: function() {
    var that = this;

    this._currentScope = null;

    this.$el.addClass('beaker-table-display');

    this.displayed.then(function() {
      var tableModel = that.model.get('model');
      if (tableModel.tooManyRows) {
        that.showWarning(tableModel);
      }
      that.initTableDisplay(tableModel);
    });
  },

  update: function() {
    TableDisplayView.__super__.update.apply(this);

    var tableModel = this.model.get('model');

    this._currentScope.setModelData(tableModel);
    this._currentScope.doResetAll();
  },

  initTableDisplay: function(data) {
    this._currentScope = new TableScope('wrap_'+this.id);
    var tmpl = this._currentScope.buildTemplate();
    var tmplElement = $(tmpl);

    tmplElement.appendTo(this.$el);

    this._currentScope.setModelData(data);
    this._currentScope.setElement(tmplElement.children('.dtcontainer'));
    this._currentScope.enableJupyterKeyHandler();
    this.contextMenu(tmplElement, this._currentScope , this.model);
    this._currentScope.run();
    this.dblclick(tmplElement, this._currentScope, this.model);
  },

  showWarning: function(data) {
    var rowLength = data.rowLength;
    var columnLength = data.columnNames.length;
    var rowLimit = data.rowLimit;
    var tmpl = '<div id="' + this.wrapperId + '">' +
      '<p class="ansired">Error: table is too big to display. ' +
      'The limit is ' + rowLimit + ' rows, but this table has ' + rowLength + ' rows. ' +
      'The first 1000 rows are displayed as a preview.</p></div>';
    var tmplElement = $(tmpl);
    tmplElement.appendTo(this.$el);
  },

  /**
   * Moved from tableScope.js to access Comm messaging.
   */
  contextMenu: function(tmplElement, currentScope, tableDisplayModel){

  	currentScope.contextMenuItems = {};
    if (!_.isEmpty(currentScope.model.model.contextMenuItems)) {
      _.forEach(currentScope.model.model.contextMenuItems, function(item) {
      	currentScope.contextMenuItems[item] = {
          name: item,
          callback: function(itemKey, options) {
            var index = currentScope.table.cell(options.$trigger.get(0)).index();
          	tableDisplayModel.send({event: 'oncontextmenu', itemKey : itemKey, row : index.row, column : index.column - 1});
          }
        }
      });
    }

    if (!_.isEmpty(currentScope.model.model.contextMenuTags)) {
      _.forEach(currentScope.model.model.contextMenuTags, function(tag, name) {
        if (currentScope.model.model.contextMenuTags.hasOwnProperty(name)) {
        	currentScope.contextMenuItems[name] = {
            name: name,
            callback: function(itemKey, options) {
              var index = currentScope.table.cell(options.$trigger.get(0)).index();
              var params = {
                actionType: 'CONTEXT_MENU_CLICK',
                contextMenuItem: itemKey,
                row: index.row,
                col: index.column - 1,
                tag: tag
              };
            	tableDisplayModel.send({event: 'actiondetails', params});
            }
          }
        }
      });
    }

  },

  /**
   * Moved from tableScope.js to access Comm messaging.
   */
  dblclick: function(tmplElement, currentScope, tableDisplayModel){
    tmplElement.on('dblclick', 'td', function(e) {
      var rowIdx;
      var colIdx;
      var iPos = currentScope.table.cell(this).index();
      if (iPos) { //selected regular cell
        rowIdx = iPos.row;
        colIdx = iPos.column;
      } else { //selected fixed column or index cell
        var position = currentScope.fixcols.fnGetPosition(this);
        rowIdx = position[0];
        if ($(this).parents().hasClass('DTFC_RightWrapper')) {
          var order = currentScope.colorder;
          var fixRight = currentScope.pagination.fixRight;
          var colIdxInRight = position[1];
          colIdx = order[order.length - fixRight + colIdxInRight];
        } else {
          colIdx = position[1];
        }
      }

      var currentCell = currentScope.table.cells(function(idx, data, node) {
        return idx.column === colIdx && idx.row ===  rowIdx;
      });

      var currentCellNodes = $(currentCell.nodes());

      var isCurrentCellSelected = currentCellNodes.hasClass('selected');

      if (currentScope.selected[rowIdx]) {
      	currentScope.selected[rowIdx] = false;
        $(currentScope.table.row(rowIdx).node()).removeClass('selected');
        currentScope.selectFixedColumnRow(rowIdx, false);
      }

      $(currentScope.table.cells().nodes()).removeClass('selected');
      if (currentScope.fixcols) {
        _.each(currentScope.selected, function(selected, index){
          if(!selected){
          	currentScope.selectFixedColumnRow(index, false);
          }
        });
      }
      if (!isCurrentCellSelected) {
        currentCellNodes.addClass('selected');
        if(iPos === undefined) {
        	currentScope.selectFixedColumnCell($(this), true);
        }
      }

      var index = currentCell.indexes()[0];
      if (currentScope.model.model.hasDoubleClickAction) {
      	tableDisplayModel.send({event: 'ondoubleclick', row : index.row, column : index.column - 1});
      }

      if (!_.isEmpty(currentScope.model.model.doubleClickTag)) {
        var params = {
          actionType: 'DOUBLE_CLICK',
          row: index.row,
          col: index.column - 1,
          tag: currentScope.model.model.doubleClickTag
        };
      	tableDisplayModel.send({event: 'actiondetails', params});
      }

      e.stopPropagation();
    })
  }

});


module.exports = {
  TableDisplayModel: TableDisplayModel,
  TableDisplayView: TableDisplayView
};

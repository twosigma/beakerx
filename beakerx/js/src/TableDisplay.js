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

var currentScope = undefined;

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

    this.$el.addClass('beaker-table-display');

    this.displayed.then(function() {
      var tableModel = that.model.get('model');
      if (tableModel.tooManyRows) {
        that.showWarning(tableModel);
      }
      that.initTableDisplay(tableModel);
    });
  },

  initTableDisplay: function(data) {
    var currentScope = new TableScope('wrap_'+this.id);
    var tmpl = currentScope.buildTemplate();
    var tmplElement = $(tmpl);
    var that = this;

    tmplElement.appendTo(this.$el);

    currentScope.setModelData(data);
    currentScope.setElement(tmplElement.children('.dtcontainer'));
    currentScope.enableJupyterKeyHandler();
    currentScope.run();
    that.dblclick(tmplElement, currentScope, this.model);
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
          col: index.column - 1
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

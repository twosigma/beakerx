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

var TableScope = require('./tableDisplay/tableScope');

require('./../bower_components/datatables.net-dt/css/jquery.dataTables.min.css');
require('./../bower_components/datatables.net-colreorder-dt/css/colReorder.dataTables.min.css');
require('./../bower_components/datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.min.css');
require('./../bower_components/datatables.net-keytable-dt/css/keyTable.dataTables.min.css');
require('./../bower_components/jQuery-contextMenu/dist/jquery.contextMenu.min.css');
require('./tableDisplay/css/datatables.css');

var TableDisplayModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
    _model_name : 'TableDisplayModel',
    _view_name : 'TableDisplayView',
    _model_module : 'beakerx',
    _view_module : 'beakerx'
  })
});


// Custom View. Renders the widget model.
var TableDisplayView = widgets.DOMWidgetView.extend({
  render: function() {
    var that = this;

    this.displayed.then(function() {
      var tableModel = JSON.parse(that.model.get('model'));
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

    tmplElement.appendTo(this.$el);

    currentScope.setModelData(data);
    currentScope.setElement(tmplElement.children('.dtcontainer'));
    currentScope.run();
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
  }
});


module.exports = {
  TableDisplayModel: TableDisplayModel,
  TableDisplayView: TableDisplayView
};

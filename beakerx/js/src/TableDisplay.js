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
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_VERSION,
      _view_module_version: BEAKERX_VERSION
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

      that.listenTo(that.model, 'beakerx-tabSelected', function() {
        that._currentScope && that._currentScope.adjustRedraw();
      });

      that.listenTo(that.model, 'change:updateData', that.handleUpdateData);
      that.listenTo(that.model, 'change:model', that.handleModellUpdate);
    });

    this.on('remove', function() {
      if (that._currentScope) {
        that._currentScope.doDestroy(true);
        that._currentScope = null;
      }
    });
  },

  handleModellUpdate: function() {
    var newModel = this.model.get('model');
    this._currentScope.updateModelData(newModel);
    this._currentScope.doResetAll();
  },

  handleUpdateData: function() {
    var change = this.model.get('updateData');
    var currentModel = this.model.get('model');
    var updatedModel = _.extend(currentModel, change);
    this.model.set('model', updatedModel, {updated_view: this});
    this.handleModellUpdate();
  },

  initTableDisplay: function(data) {
    this._currentScope = new TableScope('wrap_'+this.id);
    var tmpl = this._currentScope.buildTemplate();
    var tmplElement = $(tmpl);

    tmplElement.appendTo(this.$el);

    this._currentScope.setWidgetModel(this.model);
    this._currentScope.setModelData(data);
    this._currentScope.setElement(tmplElement.children('.dtcontainer'));
    this._currentScope.enableJupyterKeyHandler();
    this._currentScope.run();
    this._currentScope.initColumLimitModal();
    this._currentScope.setWidgetView(this);
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

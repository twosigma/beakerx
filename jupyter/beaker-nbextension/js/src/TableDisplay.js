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
    _model_module : 'beaker-nbextension',
    _view_module : 'beaker-nbextension'
  })
});


// Custom View. Renders the widget model.
var TableDisplayView = widgets.DOMWidgetView.extend({
  render: function() {
    var that = this;

    this.displayed.then(function() {
      var tableModel = JSON.parse(that.model.get('model'));
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
  }
});


module.exports = {
  TableDisplayModel: TableDisplayModel,
  TableDisplayView: TableDisplayView
};

var widgets = require('jupyter-js-widgets');
var _ = require('underscore');

var EasyFormScope = require('./easyForm/easyFormScope');

require('./easyForm/css/bko-easyform.css');

var EasyFormModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
    _model_name : 'EasyFormModel',
    _view_name : 'EasyFormView',
    _model_module : 'beaker-nbextension',
    _view_module : 'beaker-nbextension'
  })
});


// Custom View. Renders the widget model.
var EasyFormView = widgets.DOMWidgetView.extend({
  render: function() {
    var that = this;

    this.displayed.then(function() {
      var formModel = JSON.parse(that.model.get('model'));

      that.initStandardForm(formModel);
    });
  },

  initStandardForm: function (data) {
    var currentScope = new EasyFormScope('wrap_'+this.id);
    var tmpl = currentScope.buildTemplate();
    var tmplElement = $(tmpl);

    tmplElement.appendTo(this.$el);

    console.log(data);
    // debugger


    currentScope.setModelData(data);
    currentScope.setElement(tmplElement);
    currentScope.init();
  }
});


module.exports = {
  EasyFormModel: EasyFormModel,
  EasyFormView: EasyFormView
};

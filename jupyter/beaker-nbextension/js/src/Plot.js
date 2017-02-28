var widgets = require('jupyter-js-widgets');
var _ = require('underscore');
var d3 = require('./../bower_components/d3/d3.min');

var PlotScope = require('./plot/plotScope');
var CombinedPlotScope = require('./plot/combinedPlotScope');

window.d3 = d3;

require('./plot/bko-combinedplot.css');
require('./plot/bko-plot.css');
require('./../bower_components/jQuery-contextMenu/dist/jquery.contextMenu.min.css');

var PlotModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
    _model_name : 'PlotModel',
    _view_name : 'PlotView',
    _model_module : 'beaker-nbextension',
    _view_module : 'beaker-nbextension'
  })
});


// Custom View. Renders the widget model.
var PlotView = widgets.DOMWidgetView.extend({
  render: function() {
    var that = this;

    this.displayed.then(function() {
      var plotModel = JSON.parse(that.model.get('model'));

      var type = plotModel.type || 'Text';

      switch (type) {
        case 'CombinedPlot':
          that.initCombinedPlot(plotModel);
          break;
        default:
          that.initStandardPlot(plotModel);
          break;
      }
    });
  },

  initStandardPlot: function (data) {
    var currentScope = new PlotScope('wrap_'+this.id);
    var tmpl = currentScope.buildTemplate();
    var tmplElement = $(tmpl);

    tmplElement.appendTo(this.$el);

    currentScope.setModelData(data);
    currentScope.setElement(tmplElement.children('.dtcontainer'));
    currentScope.init();
  },

  initCombinedPlot: function(data) {
    var currentScope = new CombinedPlotScope('wrap_'+this.id);
    var tmpl = currentScope.buildTemplate();
    var tmplElement = $(tmpl);

    tmplElement.appendTo(this.$el);

    currentScope.setModelData(data);
    currentScope.setElement(tmplElement);
    currentScope.init();
  }
});


module.exports = {
  PlotModel: PlotModel,
  PlotView: PlotView
};

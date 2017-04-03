var widgets = require('jupyter-js-widgets');
var _ = require('underscore');

// console.log('widgets', widgets);

var EasyFormScope = require('./easyForm/easyFormScope');
var buttonWidget = require('./buttonWidget');

require('./easyForm/css/jupyter-easyform.css');

// var EasyFormModel = widgets.DOMWidgetModel.extend({
//   defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
//     _model_name : 'EasyFormModel',
//     _view_name : 'EasyFormView',
//     _model_module : 'beakerx',
//     _view_module : 'beakerx'
//   })
// });

var EasyFormModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
    _model_name : 'EasyFormModel',
    _view_name : 'EasyFormView',
    _model_module : 'beakerx',
    _view_module : 'beakerx',
    children: []
  }),
}, {
  serializers: _.extend({
    children: {deserialize: widgets.unpack_models},
  }, widgets.DOMWidgetModel.serializers)
});


// Custom View. Renders the widget model.
var EasyFormView = widgets.DOMWidgetView.extend({
  initialize: function() {
    /**
     * Public constructor
     */
    EasyFormView.__super__.initialize.apply(this, arguments);
    this.children_views = new widgets.ViewList(this.add_child_model, null, this);
    this.listenTo(this.model, 'change:children', function(model, value) {
      this.children_views.update(value);
    }, this);
  },
  add_child_model: function(model) {
    /**
     * Called when a model is added to the children list.
     */
    var that = this;
    var dummy = $('<div/>');
    that.$box.append(dummy);
    return this.create_child_view(model).then(function(view) {
      dummy.replaceWith(view.el);

      // Trigger the displayed event of the child view.
      that.displayed.then(function() {
        view.trigger('displayed', that);
      });
      return view;
    }).catch(widgets.reject("Couldn't add child view to box", true));
  },

  remove: function() {
    /**
     * We remove this widget before removing the children as an optimization
     * we want to remove the entire container from the DOM first before
     * removing each individual child separately.
     */
    EasyFormView.__super__.remove.apply(this, arguments);
    this.children_views.remove();
  },
  render: function() {
    /**
     * Called when view is rendered.
     */
    this.$el.addClass("jupyter-widgets widget-container widget-vbox beaker-easyform-container");
    this.$box = this.$el;
    this.children_views.update(this.model.get('children'));
    // this.update_overflow_x();
    // this.update_overflow_y();
    // this.update_box_style();
  },

  initStandardForm: function (data) {
    var currentScope = new EasyFormScope('wrap_'+this.id);
    var tmpl = currentScope.buildTemplate();
    var tmplElement = $(tmpl);

    tmplElement.appendTo(this.$el);

    currentScope.setModelData(data);
    currentScope.setElement(tmplElement);
    currentScope.init();
  }
});

module.exports = {
  EasyFormModel: EasyFormModel,
  EasyFormView: EasyFormView,
  ButtonModel: buttonWidget.ButtonModel,
  ButtonView: buttonWidget.ButtonView
};

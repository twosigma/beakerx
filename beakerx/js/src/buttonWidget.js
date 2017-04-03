var widgets = require('jupyter-js-widgets');
var _ = require('underscore');

var ButtonModel = widgets.ButtonModel.extend({
  defaults: _.extend({}, widgets.ButtonModel.prototype.defaults, {
    _view_name: "ButtonView1",
    _model_name: "ButtonModel1"
  })
});

var ButtonView = widgets.ButtonView.extend({
  events: {
    'click': function(e) {
      var tagName = this.model.get('tag');

      if (tagName) {
        this.rerunByTag(tagName);
      }

      this._handle_click(e);
    }
  },
  rerunByTag: function(tagName) {
    var notebook = this.options.cell.notebook;
    var cells = notebook.get_cells();
    var indexList = cells.reduce(function(acc, cell, index) {
      if (cell._metadata.tag === tagName) {
        acc.push(index);
      }
      return acc;
    }, []);

    notebook.execute_cells(indexList);
  }
});

module.exports = {
  ButtonModel: ButtonModel,
  ButtonView: ButtonView
};

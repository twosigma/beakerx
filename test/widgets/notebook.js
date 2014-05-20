module.exports = function() {
  this.Widgets.Notebook = this.Widget.extend({
    root: 'bk-notebook',

    getPluginManager: function() {
      return this.find('bk-plugin-manager');
    }
  });
}

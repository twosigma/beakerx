module.exports = function() {
  this.Widgets.Dashboard = this.Widget.extend({
    root: 'bk-control-panel',
    createNotebook: function() {
      this.find(".new-notebook").click()
    }
  });
};

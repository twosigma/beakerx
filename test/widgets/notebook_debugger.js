module.exports = function() {
  var World = this;
  this.Widgets.NotebookDebugger = this.Widget.extend({
    root: '.outputlogcontainer',
    close: function() {
      var _this = this;

      return this.isVisible().then(function(vis) {
        if (vis) {
          return World.W.click(".hide-output");
        }

        return true
      })
    }
  })
}

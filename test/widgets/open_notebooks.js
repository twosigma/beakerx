module.exports = function() {
  this.Widgets.NotebookSessionRow = this.Widget.extend({
    root: '.session',
    close: function() {
      return this.find(".close-session").click();
    },
    toObject: function() {
      return $.all([
        this.read('.id'),
        this.read('.open-date'),
        this.read('.caption'),
        this.read('.description'),
        this.read('.edited'),
      ]).then(function(data) {
        return {
          "ID": data[0],
          "Open Date": data[1],
          "Name": data[2],
          "Path": data[3],
          "Edited": data[4],
          "Operation": data[5],
        }
      });
    }
  });

  this.Widgets.OpenNotebooks = this.Widget.List.extend({
    root: '.open-notebooks table',
    itemSelector: ".session",
    itemClass: this.Widgets.NotebookSessionRow,
    toHash: function() {
      return $.map(this.items(), function(item) {
        return item.toObject();
      });
    }
  })
}

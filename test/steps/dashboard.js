module.exports = function() {
  this.When(/^I close all the open notebooks$/, function() {
    return $.map(new this.Widgets.OpenNotebooks().items(), function(item) {
      return item.close();
    });
  });

  this.Then(/^I should see the following notebooks:$/, function(table) {
    return (new this.Widgets.OpenNotebooks().toHash())
    .should.eventually.eql(table.hashes())
  });
}

module.exports = function() {
  this.Given(/^I create a notebook$/, function() {
    return new this.Widgets.Dashboard().createNotebook();
  });

  this.Then(/^I should see a new notebook$/, function() {
    return new this.Widgets.Notebook().isPresent()
    .should.eventually.equal(true);
  });
}

module.exports = function() {
  this.Then(/^I see the the user dashboard$/, function() {
    return new this.Widgets.Dashboard().isPresent()
    .should.eventually.equal(true);
  });
}

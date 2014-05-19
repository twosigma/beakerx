module.exports = function() {
  this.Then(/^I see the first notebook prompt$/, function() {
    return new this.Widgets.EmptyNotebooks().isPresent()
    .should.eventually.equal(true);
  });

  this.Given(/^I am viewing beaker$/, function() {
    return this.driver.get("http://127.0.0.1:8801/beaker/#/control");
  });
}

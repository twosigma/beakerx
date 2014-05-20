function gotoDashboard() {
  return this.driver.get(this.Routes.Dashboard);
}

module.exports = function() {
  this.When(/^I visit the user dashboard$/, gotoDashboard);
  this.Given(/^I am viewing beaker$/, gotoDashboard);
}

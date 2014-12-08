// http://stackoverflow.com/questions/24232511/how-can-i-set-up-common-functions-that-are-available-for-my-test-suites-with-pro

describe('ipython test', function() {
  it('should load', function() {
    browser.get('http://localhost:8801/');
    browser.waitForAngular();
  });
  it('open a new notebook', function() {
    element(by.id('new-empty-notebook')).click();
    expect(browser.getTitle()).toEqual('New Notebook');
  });
  it('open language manager', function() {
    element(by.id('notebook-menu')).click();
    element(by.id('language-manager-menuitem')).click();
    expect(element(by.className('plugin-manager')).isDisplayed()).toBe(true);
  });
  
  
});

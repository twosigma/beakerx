// http://stackoverflow.com/questions/24232511/how-can-i-set-up-common-functions-that-are-available-for-my-test-suites-with-pro

describe('ipython test', function() {
  var mainmenu = element.all(by.repeater('m in getMenus()'));
  var submenu = element.all(by.repeater('item in getMenuItems() | isHidden')).filter(function(e,i) { return e.isDisplayed(); });
  it('should load', function() {
    browser.get('http://localhost:8801/');
    browser.waitForAngular();
  });
  it('open on new notebook', function() {
    element(by.id('new-empty-notebook')).click();
    expect(browser.getTitle()).toEqual('New Notebook');
  });
  it('open language manager1', function() {
    mainmenu.get(2).click();
    browser.actions().mouseDown().mouseUp().perform();
  });
  it('open language manager2', function() {
    submenu.get(0).click();
    browser.actions().mouseDown().mouseUp().perform();
  });

});

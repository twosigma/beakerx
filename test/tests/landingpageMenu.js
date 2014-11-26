describe('beaker landing menu test', function() {
  var mainmenu = element.all(by.repeater('m in getMenus()'));
  var submenu = element.all(by.repeater('item in getMenuItems() | isHidden')).filter(function(e,i) { return e.isDisplayed(); });
  
  it('should load', function() {
    browser.get('http://localhost:8801/');
    browser.waitForAngular();
  });

  it('should have title and menu', function() {
    expect(browser.getTitle()).toEqual('Beaker');
    expect(mainmenu.count()).toEqual(3);
    expect(mainmenu.getText()).toEqual(['File', 'Settings', 'Help']);
  });
  
  it('should have no menu displayed', function () {
    expect(submenu.count()).toEqual(0);
  });

  it('File menu should have 3 items', function () {
    mainmenu.get(0).click();
    browser.actions().mouseDown().mouseUp().perform();
    expect(submenu.count()).toEqual(3);
  });

  it('Settings menu should have 1 item', function () {
    mainmenu.get(1).click();
    browser.actions().mouseDown().mouseUp().perform();
    expect(submenu.count()).toEqual(1);
  });

  it('Help menu should have 4 items', function () {
    mainmenu.get(2).click();
    browser.actions().mouseDown().mouseUp().perform();
    expect(submenu.count()).toEqual(4);
  });

});

/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var BeakerPageObject = require('./beaker.po.js');
describe('beaker landing menu test', function() {
  var beakerPO = new BeakerPageObject();
  
  it('should load', function() {
    browser.get(beakerPO.baseURL);
    browser.waitForAngular();
  });

  it('should have title and menu', function() {
    expect(browser.getTitle()).toEqual('Beaker');
    expect(beakerPO.mainmenu.count()).toEqual(3);
    expect(beakerPO.mainmenu.getText()).toEqual(['File', 'Settings', 'Help']);
  });
  
  it('should have no menu displayed', function () {
    expect(beakerPO.submenu.count()).toEqual(0);
  });

  it('File menu should have 3 items', function () {
    beakerPO.mainmenu.get(0).click();
    beakerPO.sync();
    expect(beakerPO.submenu.count()).toEqual(3);
  });

  it('Settings menu should have 1 item', function () {
    beakerPO.mainmenu.get(1).click();
    beakerPO.sync();
    expect(beakerPO.submenu.count()).toEqual(1);
  });

  it('Help menu should have 4 items', function () {
    beakerPO.mainmenu.get(2).click();
    beakerPO.sync();
    expect(beakerPO.submenu.count()).toEqual(4);
  });

});

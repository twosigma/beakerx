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
describe('beaker landing page', function() {
  var beakerPO = new BeakerPageObject();

  it('can load', function() {
    var start = new Date().getTime();
    browser.get(beakerPO.baseURL);
    browser.waitForAngular().then(function() {
      var stop = new Date().getTime();
      var len = stop - start;
      console.log('Loading time: ' + len + ' milliSeconds');
    });
  });

  it('has a title and menu', function() {
    expect(browser.getTitle()).toEqual('Beaker');
    expect(beakerPO.mainmenu.count()).toEqual(3);
    expect(beakerPO.mainmenu.getText()).toEqual(['File', 'Settings', 'Help']);
  });

  it('has no menu displayed', function () {
    expect(beakerPO.submenu.count()).toEqual(0);
  });

  it('has a file menu with 4 items', function () {
    beakerPO.openMenuAtIndex(0);
    expect(beakerPO.submenu.count()).toEqual(4);
  });

  it('has a settings menu with 1 item', function () {
    beakerPO.openMenuAtIndex(1);
    expect(beakerPO.submenu.count()).toEqual(1);
  });

  it('has a help menu with 4 items', function () {
    beakerPO.openMenuAtIndex(2);
    expect(beakerPO.submenu.count()).toEqual(4);
  });

});

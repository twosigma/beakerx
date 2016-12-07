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
var path = require('path');

describe('Cell Menu', function() {
  beforeEach(function(done) {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL);
    beakerPO.newEmptyNotebookClick();
    beakerPO.insertNewCell()
    .then(done);
  });

  afterEach(function(done) {
    beakerPO.closeNotebook()
    .then(done);
  });

  it('closes when another menu is opened', function(done) {
    beakerPO.insertNewCell();
    beakerPO.toggleCellMenu({cellIndex: 0});
    beakerPO.toggleCellMenu({cellIndex: 2})
    .then(done);
  });

  it('closes by clicking outside', function(done) {
    beakerPO.toggleCellMenu({cellIndex: 0});
    element(by.css('body')).click();

    beakerPO.isCellMenuOpen({cellIndex: 0})
    .then(function(isOpen) {
      expect(isOpen).toEqual(false);
      done();
    });
  });

  it('opens', function(done) {
    beakerPO.toggleCellMenu({cellIndex: 0});
    browser.wait(beakerPO.EC.presenceOf(element.all(by.css('.bkcell .open.toggle-menu-items.bkr')).get(0)), 10000);
    beakerPO.isCellMenuOpen({cellIndex: 0})
    .then(function(isOpen) {
      expect(isOpen).toEqual(true);
      done();
    });
  });

  it('closes', function(done) {
    beakerPO.toggleCellMenu({cellIndex: 0});
    beakerPO.toggleCellMenu({cellIndex: 0});

    beakerPO.isCellMenuOpen({cellIndex: 0})
    .then(function(isOpen) {
      expect(isOpen).toEqual(false);
      done();
    });
  });
});
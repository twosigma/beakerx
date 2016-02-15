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
var beakerPO;

describe('Edit Mode', function() {

  beforeEach(function() {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL);
    browser.waitForAngular();

    beakerPO.newEmptyNotebook.click();
  });

  afterEach(function() {
    beakerPO.closeNotebook();
  });

  it('test Vim toggle between insert and movement modes.', function() {
    beakerPO.setVimEditMode();
    beakerPO.insertNewCell();
    expect(element(by.css('.CodeMirror.cm-fat-cursor div.CodeMirror-cursors')).isPresent()).toBe(true);

    //click 'i' character - switch to insert mode
    browser.actions().sendKeys('i').perform();
    expect(element(by.css('.CodeMirror.cm-fat-cursor div.CodeMirror-cursors')).isPresent()).toBe(false);

    //click 'Esc' character - switch to movement mode
    browser.actions().sendKeys('\uE00C').perform();
    expect(element(by.css('.CodeMirror.cm-fat-cursor div.CodeMirror-cursors')).isPresent()).toBe(true);

    beakerPO.setNormalEditMode();
    expect(element(by.css('.CodeMirror.cm-fat-cursor div.CodeMirror-cursors')).isPresent()).toBe(false);
  });

});
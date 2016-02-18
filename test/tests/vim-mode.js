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

describe('Vim mode', function() {

  beforeEach(function() {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL);
    browser.waitForAngular();

    beakerPO.newEmptyNotebook.click();
  });

  afterEach(function() {
    beakerPO.closeNotebook();
  });

  it('Toggles between normal and insert modes', function() {
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

  it('Insert', function() {
    beakerPO.setVimEditMode();
    beakerPO.insertNewCell();
    //click 'i' character - switch to insert mode
    browser.actions().sendKeys('i').perform();

    browser.actions().sendKeys('test').perform();
    beakerPO.getCellInput().then(function (result) {
      expect(result).toBe('test')
    });

    beakerPO.setNormalEditMode();
  });

  it('R command replaces characters', function() {
    beakerPO.setVimEditMode();
    beakerPO.insertNewCell();

    beakerPO.setCellInput("meeting");

    //click 'R' character - switch to overwrite mode
    browser.actions().sendKeys('R').perform();
    browser.actions().sendKeys('session').perform();


    beakerPO.getCellInput().then(function (result) {
      expect(result).toBe('session')
    });

    beakerPO.setNormalEditMode();
  });


  it('~ command switches character case', function() {
    beakerPO.setVimEditMode();
    beakerPO.insertNewCell();

    beakerPO.setCellInput("meeting");

    browser.actions().sendKeys('~~~~~~~').perform();

    beakerPO.getCellInput().then(function (result) {
      expect(result).toBe('MEETING');
    });

    beakerPO.setNormalEditMode();
  });

  it('$ and 0 commands go to the beginning and end of line', function() {
    beakerPO.setVimEditMode();
    beakerPO.insertNewCell();

    beakerPO.setCellInput("meeting");

    browser.actions().sendKeys('$').perform();
    beakerPO.getCellInputCursor().then(function (pos) {
      expect(pos.ch).toBe(6);
    });

    browser.actions().sendKeys('0').perform();
    beakerPO.getCellInputCursor().then(function (pos) {
      expect(pos.ch).toBe(0);
    });

    beakerPO.setNormalEditMode();
  });


});
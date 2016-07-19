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

function activateLanguage(language) {
    beakerPO.activateLanguageInManager(language);
    beakerPO.waitForPlugin(language);
    beakerPO.languageManagerCloseButton.click();
};

function insertCellOfType(language) {
    browser.wait(beakerPO.EC.presenceOf(beakerPO.cellEvaluatorMenu), 10000);
    beakerPO.cellEvaluatorMenu.click();
    beakerPO.cellEvaluatorMenuItem(language).click();
}

describe('Autocomplete', function() {
    beforeAll(function(done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL).then(done);
        beakerPO.newEmptyNotebook.click();
    });

    afterAll(function() {
        beakerPO.closeNotebook();
    });

    beforeEach(function(){
        beakerPO.insertCellButton.click();       // first button 'Insert ### cell'
        beakerPO.notebookMenu.click();          // menu 'Notebook'
        beakerPO.languageManagerMenuItem.click();   //submenu 'Notebook' -> 'Language manager'
    });

    it('Autocomplete in JavaScript cell', function() {
        var language = 'JavaScript';
        activateLanguage(language);
        insertCellOfType(language);
        browser.sleep(5000);
    });

    it('Autocomplete in HTML cell', function() {
        var language = 'HTML';
        activateLanguage(language);
        insertCellOfType(language);
        browser.sleep(5000);
    });

    it('Autocomplete in Groovy cell', function() {
        var language = 'Groovy';
        activateLanguage(language);
        insertCellOfType(language);
        browser.sleep(5000);
    });
});
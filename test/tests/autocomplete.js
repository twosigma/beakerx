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

function checkAutotranslate(nameHint) {
    browser.actions().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, protractor.Key.SPACE)).perform().then(function(){
        expect(element(by.cssContainingText('li.CodeMirror-hint', nameHint)).isPresent()).toBe(true);
    });
};

function insertNewCell(language){
    beakerPO.activateLanguage(language);
    beakerPO.insertCellOfType(language);
    var bkcell = element.all(by.css('bk-cell')).get(0);
    bkcell.element(by.css('div.CodeMirror-code')).click();
    return bkcell;
}

describe('Autocomplete', function() {
    beforeAll(function(done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL).then(done);
        beakerPO.newEmptyNotebook.click();
    });

    afterAll(function() {
        beakerPO.createScreenshot('autocomplete');
        beakerPO.closeNotebook();
    });

    beforeEach(function(){
        beakerPO.insertCellButton.click();
        beakerPO.notebookMenu.click();
        beakerPO.languageManagerMenuItem.click();
    });

    it('JavaScript cell', function() {
        insertNewCell('JavaScript');
        browser.actions().sendKeys("\'test\'.").perform();
        checkAutotranslate('toUpperCase');
    });

    it('HTML cell', function() {
        insertNewCell('HTML');
        browser.actions().sendKeys("<h").perform();
        checkAutotranslate('<html');
    });

    it('Groovy cell', function() {
        insertNewCell('Groovy');
        browser.actions().sendKeys("String str = \'test\';\nstr.to").perform();
        checkAutotranslate('toUpperCase()');
    });

    it('IPython cell', function() {
        insertNewCell('IPython');
        browser.actions().sendKeys("p").perform();
        checkAutotranslate('pi');
    });

    it('R cell', function() {
        insertNewCell('R');
        browser.actions().sendKeys("rn").perform();
        checkAutotranslate('rnorm');
    });

    it('SQL cell', function() {
        insertNewCell('SQL');
        browser.actions().sendKeys("se").perform();
        checkAutotranslate('SELECT');
    });

    it('Java cell', function() {
        insertNewCell('Java');
        browser.actions().sendKeys("p").perform();
        checkAutotranslate('package');
    });

    it('Clojure cell', function() {
        var bkcell = insertNewCell('Clojure');
        browser.actions().sendKeys("de").perform();
        checkAutotranslate('defn');
    });

});
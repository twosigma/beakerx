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


var BeakerPageObject = require('../../beaker.po.js');
var path = require('path');
var beakerPO;

describe('Clojure Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fclojure-examples.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('clojureTutorial');
        done();
    });

    describe('Autocomplete', function(){
        it('Should hint "declare" ', function() {
            beakerPO.insertNewDefaultCell('Clojure');
            browser.actions().sendKeys("de").perform();
            beakerPO.checkAutocomplete('declare');
            beakerPO.selectItem('declare');
        });
    });

    it('Clojure Examples', function () {
        var idCell = "codejnXAl6";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, '[0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181]');

        idCell = "codextC4q9";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, 'Will print');

        idCell = "codeHnlYry";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
        beakerPO.waitForCellOutput();
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('bk-output-display pre')).get(0).getText())
            .toBe('([0 1 2 3 4 5] [6 7 8 9 10 11] [12 13 14 15 16 17] [18 19 20 21 22 23] [24 25 26 27 28 29] [30 31 32 33 34 35])\nDistinct: 36');

        idCell = "codepKxxJX";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'c0\nc1');
        beakerPO.checkDataTableBodyByIdCell(idCell, 16, '0 0000 0');

        idCell = "codeEg02vp";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'firstName\nlastName\nage');
        beakerPO.checkDataTableBodyByIdCell(idCell, 2, '0 John Doe 46.0000');

        idCell = "codevrWKiV";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, 'Amanda');

        idCell = "codehipCQw";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'firstName\nlastName\nage');
        beakerPO.checkDataTableBodyByIdCell(idCell, 2, '0 John Doe 46');

        idCell = "codeDTkrHj";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, '["clojure.core/println","clojure.core/println-str"]');
    });

});

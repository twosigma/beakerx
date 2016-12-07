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

describe('R Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fr-examples.bkr&readOnly=true").then(done)
        beakerPO.waitUntilLoadingCellOutput();
        browser.driver.manage().window().maximize();

        var start = new Date().getTime();
        beakerPO.waitUntilLoadingFinished().then(function() {
            var stop = new Date().getTime();
            var len = stop - start;
            console.log('Starting R language: ' + len + ' milliSeconds');
        });
    });

    afterAll(function(done){
        beakerPO.createScreenshot('rTutorial');
        done();
    })

    it('R can load', function () {
        element(by.css('div.modal-body')).isPresent().then(function(present){
            if(present){
                expect(element.all(by.css('div.modal-body > p')).get(0).getText()).toBe('R have loaded');
            }
        });
    });

    describe('Autocomplete', function(){
        it('Should hint "rnorm" ', function() {
            beakerPO.insertNewDefaultCell('R');
            browser.actions().sendKeys("rn").perform();
            beakerPO.checkAutocomplete('rnorm');
            beakerPO.selectItem('rnorm');
        });
    });

    describe('R Examples', function () {

        it('Histogram', function () {
            var idCell = "code2uVtKX";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Html');
            expect(beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('svg > g')).count()).toBe(1);
        });

        it('Box plot', function () {
            var idCell = "codeG6bqsQ";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Html');
            expect(beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('svg > g')).count()).toBe(1);
        });

        it('Spreadsheet', function () {
            var idCell = "codezB5I5w";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table', 'RSpreadsheet');
            beakerPO.checkDtContainerByIdCell(idCell);
            beakerPO.checkDtContainerByIdCell(idCell);
            var arrStrHead = beakerPO.getDataTablesTHeadByIdCell(idCell).get(0).all(by.css('th'));
            expect(arrStrHead.count()).toBe(12);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(0), 'Index', 0, 5);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(1), 'manufacturer', 0, 12);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(2), 'model', 0, 5);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(3), 'displ', 0, 5);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(4), 'year', 0, 4);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(5), 'cyl', 0, 3);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(6), 'trans', 0, 5);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(7), 'drv', 0, 3);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(8), 'cty', 0, 3);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(9), 'hwy', 0, 3);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(10), 'fl', 0, 2);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(11), 'class', 0, 5);

            var tBody = beakerPO.getDataTablesTBodyByIdCell(idCell);
            expect(tBody.count()).toBe(25);
            var arrStr = tBody.get(0).all(by.css('td'));
            expect(arrStr.count()).toBe(12);
            beakerPO.checkSubString(arrStr.get(0), '1', 0, 1);
            beakerPO.checkSubString(arrStr.get(1), 'audi', 0, 4);
            beakerPO.checkSubString(arrStr.get(2), 'a4', 0, 2);
            beakerPO.checkSubString(arrStr.get(3), '1.800', 0, 5);
            beakerPO.checkSubString(arrStr.get(4), '1,99', 0, 4);
            beakerPO.checkSubString(arrStr.get(5), '4', 0, 1);
            beakerPO.checkSubString(arrStr.get(6), 'auto(l5)', 0, 8);
            beakerPO.checkSubString(arrStr.get(7), 'f', 0, 1);
            beakerPO.checkSubString(arrStr.get(8), '18', 0, 2);
            beakerPO.checkSubString(arrStr.get(9), '29', 0, 2);
            beakerPO.checkSubString(arrStr.get(10), 'p', 0, 1);
            beakerPO.checkSubString(arrStr.get(11), 'compact', 0, 7);
        });

        //it('Google map', function () {
        //    var idCell = "codePI1mwS";
        //    beakerPO.scrollToBkCellByIdCell(idCell);
        //    beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Image', 'RGoogleMap');
        //    beakerPO.checkImageByIdCell(idCell);
        //});

        it('Library(MASS)', function () {
            var idCell = "codebUFdM3";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Image', 'RLibMASS', 60000);
            beakerPO.checkImageByIdCell(idCell);
        });

        it('Modeling and linear regression', function () {
            var idCell = "code8D0EwG";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Image');
            beakerPO.checkImageByIdCell(idCell);
        });

        it('Analysis of Variance Table', function () {
            var idCell = "code4JWGX8";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDtContainerByIdCell(idCell);
            var arrStrHead = beakerPO.getDataTablesTHeadByIdCell(idCell).get(0).all(by.css('th'));
            expect(arrStrHead.count()).toBe(6);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(0), 'Index', 0, 5);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(1), 'Df', 0, 2);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(2), 'Sum Sq', 0, 6);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(3), 'Mean Sq', 0, 7);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(4), 'F value', 0, 7);
            beakerPO.checkSubStringIfDisplayed(arrStrHead.get(5), 'Pr(>F)', 0, 6);

            idCell = "codeW7oCy6";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputSubTextByIdCell(idCell, "Call:\nlm(formula = weight ~ group - 1)\n\nResiduals:" , 0, 50);
        });

        it('Display image', function () {
            var idCell = "codew89omS";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Image');
            beakerPO.checkImageByIdCell(idCell);
        });

    });
});
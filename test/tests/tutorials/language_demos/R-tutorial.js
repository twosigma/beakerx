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

describe('R Tutorial', function (done) {

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

    it('R can load', function () {
        element(by.css('div.modal-body')).isPresent().then(function(present){
            if(present){
                expect(element.all(by.css('div.modal-body > p')).get(0).getText()).toBe('R have loaded');
            }
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
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text', 'RSpreadsheet');
            expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(By.css('pre')).isPresent()).toBe(true);
            beakerPO.getCodeCellOutputByIdCell(idCell).element(By.css('pre')).getText()
                .then(function(value){
                    var str = value.substring(0, 200);
                    expect(str.indexOf('manufacturer')).not.toBe(-1);
                    expect(str.indexOf('model')).not.toBe(-1);
                    expect(str.indexOf('displ')).not.toBe(-1);
                    expect(str.indexOf('year')).not.toBe(-1);
                    expect(str.indexOf('cyl')).not.toBe(-1);
                    expect(str.indexOf('trans')).not.toBe(-1);
                    expect(str.indexOf('drv')).not.toBe(-1);
                    expect(str.indexOf('cty')).not.toBe(-1);
                    expect(str.indexOf('hwy')).not.toBe(-1);
                });
        });

        it('Google map', function () {
            var idCell = "codePI1mwS";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Image', 'RGoogleMap');
            beakerPO.checkImageByIdCell(idCell);
        });

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
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputSubTextByIdCell(idCell, "Analysis of Variance Table\n\nResponse: weight\n     ", 0, 50);

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
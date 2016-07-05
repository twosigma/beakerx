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

describe('Groovy Tutorial', function () {

    beforeAll(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fgroovy-examples.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('groovyTutorial');
        done();
    });

    describe('Groovy examples', function () {

        it('Initializing variable', function () {
            var idCell = "codelwaUwX";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "2");

            idCell = "codeiXI4Hu";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Error');
            beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('.out_error')).getText()
                .then(function (value) {
                    expect(value.substring(1, 38)).toBe('groovy.lang.MissingPropertyException:');
                });

            idCell = "codeZsp72T";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "2");
        });

        it('Closure examples', function () {
            var idCell = "codeyiu160";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputSubTextByIdCell(idCell, "script", 0, 6);

            idCell = "code0SVic5";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "8");

            idCell = "codexiOErG";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "Multiplying Strings!Multiplying Strings!");
        });

        it('Math', function () {
            var idCell = "code8ND55A";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputSubTextByIdCell(idCell, "0.000092653589660490", 0, 20);
        });

    });

    describe('Cell output', function () {
        it('Default output', function () {
            var idCell = "codeKIMiDC";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
            beakerPO.checkCellOutputTextByIdCell(idCell, "standard\noutput");
        });

        it("Limit cell output", function () {
            var idCell = "codeUAzxIm";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "2");

            idCell = "codeKIMiDC";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
            beakerPO.checkCellOutputTextByIdCell(idCell, "standard\noutput");
        });

        it("Use output panel", function () {
            var idCell = "codehp1B5U";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "true");

            idCell = "codeKIMiDC";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.runBkCellDefaultButtonByIdCell(idCell);
            browser.wait(beakerPO.EC.presenceOf($('div.outputlogcontainer')), 10000)
                .then(function(isPresent){
                        expect(isPresent).toBe(true);
                    });
        });
    });

});
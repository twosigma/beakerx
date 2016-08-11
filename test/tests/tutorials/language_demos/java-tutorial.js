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

describe('Java Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FjavaTutorial.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('javaTutorial');
        done();
    });

    describe('Autocomplete', function(){
        it('Should hint "package"', function() {
            beakerPO.insertNewDefaultCell('Java');
            browser.actions().sendKeys("p").perform();
            beakerPO.checkAutocomplete('package');
            beakerPO.selectItem('package');
        });
    });

    describe('Java Examles', function () {

        it('Define java class', function () {
            var idCell = "codeYv6rtU";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');

            idCell = "codesvwb39";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            var dateStr = new Date().toISOString().substring(0, 10);
            beakerPO.checkCellOutputSubTextByIdCell(idCell, 'Today:' + dateStr, 0, 16);

            idCell = "codeWRR4u2";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputSubTextByIdCell(idCell, 'TODAY:' + dateStr, 0, 16);
        });

        it('Autotranslation', function () {
            var idCell = "codeHPHfmV";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');

            idCell = "codegJFKLk";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            beakerPO.checkCellOutputTextByIdCell(idCell, 'test for autotranslation');
        });

        it('Plot', function () {
            var idCell = "codeRd3d1I";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);
            beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
            expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("this is a Java plot");
        });

        it('Support interface', function () {
            var idCell = "codep7qbeI";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            beakerPO.checkCellOutputTextByIdCell(idCell, 'test.beaker.DateGetter');

            idCell = "code6YBzOU";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            beakerPO.checkCellOutputTextByIdCell(idCell, 'test.beaker.DG2');
        });
    });
});

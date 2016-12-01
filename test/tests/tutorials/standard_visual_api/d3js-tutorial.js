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

describe('Working with d3.js', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fd3.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
        browser.driver.manage().window().maximize();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('d3jsTutorial');
        done();
    });

    it('Should generate a random graph', function () {
        var idCell = "codejwoVEJ";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.runCellWithoutDisplayResultByIdCell(idCell);
    });

    it('Should show graph', function () {
        var idCell = "codegxgnTN";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Html');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('div#fdg > svg')).isPresent()).not.toBe(true);

        idCell = "codeIVmT2r";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');

        idCell = "codegxgnTN";
        browser.wait(beakerPO.EC.presenceOf($('bk-code-cell-output[cell-id=' + idCell + ']'), 20000));
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('div#fdg > svg')).isPresent()).toBe(true);
    });

});
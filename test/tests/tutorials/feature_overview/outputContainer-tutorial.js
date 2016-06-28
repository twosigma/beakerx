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
var beakerPO;

describe('Output containers Tutorial', function (done) {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Foutput_container_cell.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('outputContainerTutorial');
        done();
    });

    it('new OutputContainer()', function () {
        var idCell = "codeCsEU6N";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
        var liElem = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('li.outputcontainer-li'));
        expect(liElem.get(0).element(by.css('pre')).getText()).toBe('simplest example');
        expect(liElem.get(1).element(by.css('pre')).getText()).toBe('[2,3,5,7]');
    });

    it('Initialise data', function () {
        beakerPO.collapseCellMenuByIdCell("sectionSi2g9h");
        var idCell = "codesfxnTH";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        idCell = "codemeYIHG";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('pre')).getText()).toBe('ok');
    });

});
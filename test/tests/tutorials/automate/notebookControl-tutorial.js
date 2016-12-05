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

describe('Notebook Control API', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FnotebookControl.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('notebookControlTutorial');
        done();
    });

    function checkTagOption(idCell, tagValue){
        beakerPO.clickElementWithHandlingError(beakerPO.getBkCellByIdCell(idCell).$$('.cell-menu-item.cell-dropdown.dropdown-toggle').first(), 'dropdownTougle');
        browser.wait(beakerPO.EC.presenceOf(element.all(by.css('bk-notebook > ul.dropdown-menu')).get(0)), 10000);
        element.all(by.css('bk-notebook > ul.dropdown-menu')).get(0).element(by.cssContainingText('a', 'Options...')).click();
        browser.wait(beakerPO.EC.visibilityOf(element(by.css('div.modal-body'))), 10000);
        var tagInput = element(by.model('cellTags'));
        expect(tagInput.getAttribute('value')).toBe(tagValue);
        element(by.cssContainingText('button', 'Cancel')).click();
    }

    it('Should display "FINISHED finally"', function () {
        var idCell = "codetdETS1";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        beakerPO.checkCellOutputTextByIdCell(idCell, "FINISHED finally");
    });
    it('Should display "30" (JavaScript)', function () {
        var idCell = "codeaZA46g";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        beakerPO.checkEvaluatorByIdCell(idCell, "JavaScript");
    });
    it('Should display "15129" (Groovy)', function () {
        var idCell = "codesHGHnD";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        beakerPO.checkEvaluatorByIdCell(idCell, "Groovy");
    });
    it("Should display every cell with the tag 'mytag'", function () {
        var idCell = "codezSGiYV";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        beakerPO.checkCellOutputTextByIdCell(idCell, "got 2 results: AAA this cell is also evaluated,CCC this cell is evaluated");
    });
    it("AAA cell is evaluated", function () {
        var idCell = "codePLMc93";
        beakerPO.scrollToBkCellByIdCell(idCell);
        checkTagOption(idCell, 'mytag');
        beakerPO.checkCellOutputTextByIdCell(idCell, "AAA this cell is also evaluated");
    });
    it("BBB cell is not evaluated", function () {
        var idCell = "codeQSVv2P";
        beakerPO.scrollToBkCellByIdCell(idCell);
        checkTagOption(idCell, '');
        expect(element(by.css('bk-code-cell-output[cell-id=' + idCell + ']')).isPresent()).toBe(false);
    });
    it("CCC cell is evaluated", function () {
        var idCell = "code3FNleS";
        beakerPO.scrollToBkCellByIdCell(idCell);
        checkTagOption(idCell, 'mytag');
        beakerPO.checkCellOutputTextByIdCell(idCell, "CCC this cell is evaluated");
    });
});
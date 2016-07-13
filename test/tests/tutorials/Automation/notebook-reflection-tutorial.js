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

describe('Notebook Reflection API', function (done) {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FnotebookReflection.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('notebookReflectionTutorial');
        done();
    });

    describe('Settings the code and running other cells', function(){
        var idCellToChange = "celltochange";

        it('Change to the new content', function () {
            var idCell = "code8FSM5W";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.runBkCellDefaultButtonByIdCell(idCell);

            beakerPO.scrollToBkCellByIdCell(idCellToChange);
            expect(element(by.css('bk-code-cell-output[cell-id=' + idCellToChange + '] bk-output-display[type="Html"]')).isPresent()).toBe(true);
            expect(beakerPO.getCodeCellOutputByIdCell(idCellToChange).element(By.css('h2')).getText()).toBe('This is the new content');
        });
        it("beaker.getCodeCells('mytag') should contains 'This is the new content'", function () {
            var idCell = "codeQi2Ect";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.getCodeCellOutputByIdCell(idCell).element(By.css('pre')).getText().then(function(value){
                expect(value.lastIndexOf('<h2>This is the new content</h2>')).toBeGreaterThan(-1);
            });
        });
        it('Change to the old content', function () {
            var idCell = "codehkOSaq";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.runBkCellDefaultButtonByIdCell(idCell);

            beakerPO.scrollToBkCellByIdCell(idCellToChange);
            expect(element(by.css('bk-code-cell-output[cell-id=' + idCellToChange + '] bk-output-display[type="Text"]')).isPresent()).toBe(true);
            beakerPO.checkCellOutputTextByIdCell(idCellToChange, 'This is the old content');
        });
        it("beaker.getCodeCells('mytag') should contains 'This is the old content'", function () {
            var idCell = "codeQi2Ect";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.getCodeCellOutputByIdCell(idCell).element(By.css('pre')).getText().then(function(value){
                expect(value.lastIndexOf('"output":"This is the old content"')).toBeGreaterThan(-1);;
            });
        });
    });

});
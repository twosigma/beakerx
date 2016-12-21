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

describe('C++ Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fcpp-examples.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('cppTutorial');
        done();
    });

    describe('C++ Examples', function () {
        describe('Define a beaker_main function', function(){
            it('should display "Hello world!"', function(){
                var idCell = "code5XX0in";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
                beakerPO.checkCellOutputSubTextByIdCell(idCell, 'Hello world!', 0);
            });
        });
        describe('Call functions defined in other C++ cells', function() {
            it('should display "This is far away"', function(){
                var idCell = "codey0EVnd";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.runCellWithoutDisplayResultByIdCell(idCell);

                idCell = "codevYfhgq";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
                beakerPO.checkCellOutputSubTextByIdCell(idCell, 'This is far away', 0);
            });
        });
        describe('Store data in the Beaker Object', function() {
            it('should display 1', function(){
                var idCell = "code2wlBSW";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
                beakerPO.checkCellOutputSubTextByIdCell(idCell, '1', 0);
            });
        });
        describe('Read objects from the beaker namespace', function () {
            it('should display array values', function () {
                var idCell = "codeB3Dqi0";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
                beakerPO.checkCellOutputSubTextByIdCell(idCell, '{"a":[1],"b":[2,2],"c":[3,3,3,3]}', 0);
            });
        });
        it('should display table', function(){
            var idCell = "codeqDLV1T";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDataTableHeadByIdCell(idCell, 'Key\nValue');
            beakerPO.checkDataTableBodyByIdCell(idCell, 3, '0 a Alpha');
        });
        describe('Autotranslation (javascript)', function () {
            it('should display array values', function(){
                var idCell = "code4UVEpX";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
                beakerPO.checkCellOutputSubTextByIdCell(idCell, '{"a":[1],"b":[2,2],"c":[3,3,3,3]}', 0);
            });
        });
    });
});

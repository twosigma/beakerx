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

describe('Large Integers in Tables and Autotranslation', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FbigIntegerTables.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('bigIntegerTablesTutorial');
        done();
    });

    var valueLong = "";
    it('Should display 64-bit Longs', function () {
        var idCell = "codeaOmhaj";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.getDataTablesColumnByIdCell(idCell, 1).getText().then(function(value){
            valueLong = value;
            expect(value.length).toBe(19);
            for(var i = 0; i < value.length; i++){
                expect(isFinite(value.substring(i, i+1))).toBe(true);
            }
        });
    });

    var valueBigNum = "";
    it('Should display BigNums', function () {
        var idCell = "codeoVvVNi";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.getDataTablesColumnByIdCell(idCell, 1).getText().then(function(value){
            valueBigNum = value;
            expect(value.length).toBe(19);
            for(var i = 0; i < value.length; i++){
                expect(isFinite(value.substring(i, i+1))).toBe(true);
            }
        });
    });

    it('Autotranslation of 64-bit Longs', function () {
        var idCell = "codelBVsT5";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.getDataTablesColumnByIdCell(idCell, 3).getText().then(function(value){
            expect(value).toBe(valueLong);
        });
    });

    it('Autotranslation of BigNums', function () {
        var idCell = "codeWmOT3I";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.getDataTablesColumnByIdCell(idCell, 3).getText().then(function(value){
            expect(value).toBe(valueBigNum);
        });
    });

});
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

describe('SQL Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fsql-examples.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('sqlTutorial');
        done();
    });

    it('Basic Query', function () {
        var idCell = "codef4U7zn";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.checkDataTableHeadByIdCell(idCell, 'ID\nNAME\nCODE');
        beakerPO.checkDataTableBodyByIdCell(idCell, 5, '0 1001 AliceBlue #F0F8FF');
    });

    it('Autotranslate Input to Query', function(){
        var idCell = "codeRXzfau";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(By.css('pre')).getText()).toBe('1003');

        idCell = "code3jTM1a";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.checkDataTableHeadByIdCell(idCell, 'Key\nValue');
        beakerPO.checkDataTableBodyByIdCell(idCell, 3, '0 ID 1003');
    });

    it('Autotranslate Output of Query', function(){
        var idCell = "codeYmDlEC";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.runBkCellDefaultButtonByIdCell(idCell);

        idCell = "codeDbiIzh";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.checkDataTableHeadByIdCell(idCell, 'ID\nNAME\nCODE');
        beakerPO.checkDataTableBodyByIdCell(idCell, 8, '0 1001 AliceBlue #F0F8FF');
    });

    it('Multiple Databases', function(){
        var idCell = "code506tI8";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        browser.wait(beakerPO.EC.presenceOf(beakerPO.getDataTablesScrollHeadByIdCell(idCell)), 10000);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'NAME\nBORN');
        beakerPO.checkDataTableBodyByIdCell(idCell, 4, '0 Jacob Berzelius 1779');

        idCell = "codeVDv9Mf";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.checkDataTableHeadByIdCell(idCell, 'NAME\nMOLARMASS');
        beakerPO.checkDataTableBodyByIdCell(idCell, 4, '0 Water 18.01');
    });

});
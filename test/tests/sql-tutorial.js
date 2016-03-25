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


var BeakerPageObject = require('./beaker.po.js');
var path = require('path');
var beakerPO;

describe('SQL Tutorial', function () {

    beforeEach(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fsql-examples.bkr&readOnly=true").then(done);

        beakerPO.waitUntilLoadingIndicator();
    });

    afterEach(function (done) {
        beakerPO.closeNotebook()
            .then(done);
    });

    it('Basic Query', function () {
        var idxCell = 0;
        beakerPO.checkDtContainer(idxCell);
        beakerPO.checkDataTableHead(idxCell, 'ID\nNAME\nCODE');
        beakerPO.checkDataTableBody(idxCell, 5, '0 1001 AliceBlue #F0F8FF');

    });

    it('Autotranslate Input to Query', function(){
        var idxCell = 1;
        beakerPO.scrollToCodeCellOutput(idxCell);
        expect(beakerPO.getCodeCellOutputByIndex(idxCell).element(By.css('pre')).getText()).toBe('1003');

        idxCell++;
        beakerPO.checkDtContainer(idxCell);
        beakerPO.checkDataTableHead(idxCell, 'Key\nValue');
        beakerPO.checkDataTableBody(idxCell, 3, '0 ID 1003');
    });

    it('Autotranslate Output of Query', function(){
        var idxCell = 3;
        beakerPO.checkDtContainer(idxCell);
        beakerPO.checkDataTableHead(idxCell, 'ID\nNAME\nCODE');
        beakerPO.checkDataTableBody(idxCell, 8, '0 1001 AliceBlue #F0F8FF');
    });

    it('Multiple Databases', function(){
        var idxCell = 4;
        beakerPO.checkDtContainer(idxCell);
        beakerPO.checkDataTableHead(idxCell, 'NAME\nBORN');
        beakerPO.checkDataTableBody(idxCell, 4, '0 Jacob Berzelius 1779');

        idxCell++;
        beakerPO.checkDtContainer(idxCell);
        beakerPO.checkDataTableHead(idxCell, 'NAME\nMOLARMASS');
        beakerPO.checkDataTableBody(idxCell, 4, '0 Water 18.01');
    });

});
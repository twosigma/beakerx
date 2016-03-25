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

describe('Clojure Tutorial', function () {

    beforeEach(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fclojure-examples.bkr&readOnly=true").then(done);

        beakerPO.waitUntilLoadingCellOutput();
    });

    it('Clojure Examples', function () {
        var idxCell = 1;
        beakerPO.scrollToCodeCellOutput(idxCell);
        beakerPO.checkCellOutputText(idxCell, '[0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181]');

        idxCell = 2;
        beakerPO.scrollToCodeCellOutput(idxCell);
        beakerPO.checkCellOutputText(idxCell, 'Will print');

        idxCell = 3;
        beakerPO.scrollToCodeCellOutput(idxCell);
        var listOutput = beakerPO.getCodeCellOutputByIndex(idxCell).all(By.css('pre'));
        expect(listOutput.get(0).getText()).toBe('([0 1 2 3 4 5] [6 7 8 9 10 11] [12 13 14 15 16 17] [18 19 20 21 22 23] [24 25 26 27 28 29] [30 31 32 33 34 35])\nDistinct: 36');
        expect(listOutput.get(1).getText()).toBe('([11 20 5 32 34 33] [2 26 23 12 22 24] [17 21 28 4 35 18] [30 27 15 9 31 1] [14 19 16 7 8 3] [10 0 13 29 6 25])\nDistinct: 36');

        idxCell = 4;
        beakerPO.checkDtContainer(idxCell);
        beakerPO.checkDataTableHead(idxCell, 'c0\nc1');
        beakerPO.checkDataTableBody(idxCell, 16, '0 0000 0');

        idxCell = 5;
        beakerPO.checkDtContainer(idxCell);
        beakerPO.checkDataTableHead(idxCell, 'firstName\nlastName\nage');
        beakerPO.checkDataTableBody(idxCell, 2, '0 John Doe 46.0000');

        idxCell = 6;
        beakerPO.scrollToCodeCellOutput(idxCell);
        beakerPO.checkCellOutputText(idxCell, 'Amanda');

        idxCell = 7;
        beakerPO.checkDtContainer(idxCell);
        beakerPO.checkDataTableHead(idxCell, 'firstName\nlastName\nage');
        beakerPO.checkDataTableBody(idxCell, 2, '0 John Doe 46');

        idxCell = 8;
        beakerPO.scrollToCodeCellOutput(idxCell);
        beakerPO.checkCellOutputText(idxCell, '["clojure.core/println","clojure.core/println-str"]');
    });

});

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

describe('JavaScript Tutorial', function () {

    beforeEach(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fjs-examples.bkr&readOnly=true").then(done);

        beakerPO.waitUntilLoadingCellOutput();
    });

    it('JavaScript examples', function () {
        var idCell = "code31H2LG";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        var lifeElem = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.id('life'));
        expect(lifeElem.count()).toBe(1);
        expect(lifeElem.get(0).all(by.css('div')).count()).toBe(1020);
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.id('stop')).isPresent()).toBe(true);

        idCell = "codeace4aM";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "ratio = 0.112");

        idCell = "codeKLDfkl";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "Use 'beaker.print()' to log output to the 'cell output' area below.");

        idCell = "codeq2N3Fu";
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'name\nmass\ncharge3');
        beakerPO.checkDataTableBodyByIdCell(idCell, 5, '0 up 2300000.0000 2');

        idCell = "codebUXwTB";
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'name mass\ncharge3');
        beakerPO.checkDataTableBodyByIdCell(idCell, 6, 'bottom 4180000000.0000 -1');

        idCell = "codeezzeV4";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "DataFrame:  Rows: 6\n  Data columns (total 3 columns):\n    name   string *Index*\n    mass   double\n    charge3   integer");

        idCell = "codelXtcIc";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "[\"name\",\"mass\",\"charge3\"]");

        idCell = "codexbWnLA";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "[\"string\",\"double\",\"integer\"]");

        idCell = "codeu1BYGo";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "[\"up\",\"charm\",\"top\",\"down\",\"strange\",\"bottom\"]");

        idCell = "codeSpYbEt";
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'Key\nValue');
        beakerPO.checkDataTableBodyByIdCell(idCell, 3, '0 name up');

        idCell = "codePTuKaA";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "6");

        idCell = "codeczvMqm";
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'name mass');
        beakerPO.checkDataTableBodyByIdCell(idCell, 6, 'bottom 4180000000.0000');

        idCell = "codeVBGmAc";
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'c0\nc1');
        beakerPO.checkDataTableBodyByIdCell(idCell, 3, '0 matrices are automatically');

        idCell = "codeNtnrk8";
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'Key\nValue');
        beakerPO.checkDataTableBodyByIdCell(idCell, 3, '0 first Berzelius');
    });
});
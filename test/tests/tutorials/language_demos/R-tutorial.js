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

describe('R Tutorial', function () {

    beforeEach(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fr-examples.bkr&readOnly=true").then(done);

        beakerPO.waitUntilLoadingCellOutput();
    });

    it('R Examples', function () {
        var idCell = "code2uVtKX";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        var svgElem = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('svg > g'));
        expect(svgElem.count()).toBe(1);
        expect(svgElem.get(0).all(by.css('g')).count()).toBe(78);
        expect(svgElem.get(0).all(by.css('path')).count()).toBe(108);

        idCell = "codeG6bqsQ";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        svgElem = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('svg > g'));
        expect(svgElem.count()).toBe(1);
        expect(svgElem.get(0).all(by.css('g')).count()).toBe(111);
        expect(svgElem.get(0).all(by.css('path')).count()).toBe(206);

        idCell = "codezB5I5w";
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'Index manufacturer\nmodel\ndispl\nyear\ncyl\ntrans\ndrv\ncty\nhwy\nfl');
        beakerPO.checkDataTableBodyByIdCell(idCell, 25, '1 audi a4 1.8000 1,999 4 auto(l5) f 18 29 p compact');

        idCell = "codePI1mwS";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkImageByIdCell(idCell);

        idCell = "codebUFdM3";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkImageByIdCell(idCell);

        idCell = "code8D0EwG";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkImageByIdCell(idCell);

        idCell = "code4JWGX8";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputSubTextByIdCell(idCell, "Analysis of Variance Table\n\nResponse: weight\n     ", 0, 50);

        idCell = "codeW7oCy6";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputSubTextByIdCell(idCell, "Call:\nlm(formula = weight ~ group - 1)\n\nResiduals:" , 0, 50);

        idCell = "codew89omS";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkImageByIdCell(idCell);
    });


});
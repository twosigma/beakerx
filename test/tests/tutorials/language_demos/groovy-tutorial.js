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

describe('Groovy Tutorial', function () {

    beforeEach(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fgroovy-examples.bkr&readOnly=true").then(done);

        beakerPO.waitUntilLoadingCellOutput();
    });

    it('Groovy examples', function () {
        var idCell = "codelwaUwX";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "2");

        idCell = "codeiXI4Hu";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('.out_error')).getText()).toBe('+groovy.lang.MissingPropertyException: No such property: a for class: Script18');

        idCell = "codeZsp72T";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "2");

        idCell = "codeyiu160";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell,"Script20$_run_closure1@4db975cd");

        idCell = "code0SVic5";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "8");

        idCell = "codexiOErG";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "Multiplying Strings!Multiplying Strings!");

        idCell = "code8ND55A";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "0.00009265358966049026");

        idCell = "codeKIMiDC";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "standard output");

        idCell = "codehp1B5U";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "");

        idCell = "codeUAzxIm";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell, "10000");

    });
});
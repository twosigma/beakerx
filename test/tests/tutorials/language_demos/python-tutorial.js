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

describe('Python Tutorial', function () {

    beforeEach(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fipython-examples.bkr&readOnly=true").then(done);

        beakerPO.waitUntilLoadingCellOutput();
    });

    it('IPython Examples', function () {
        var idCell = "codeK0EmdK";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('simple-layout')).isPresent()).toBe(true);
        beakerPO.checkCellOutputSubTextByIdCell(idCell, '[<matplotlib.lines.Line2D', 0, 25);
        beakerPO.checkImageByIdCell(idCell);

        idCell = "codeqPMAfv";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'Index 3 mo\n6 mo\n1 yr\n2 yr\n3 yr\n5 yr\n7 yr\n10 yr\n30 yr');

        var tBody = beakerPO.getDataTablesTBodyByIdCell(idCell);
        expect(tBody.count()).toBe(5);
        var arrStr = tBody.get(0).all(by.css('td'));
        beakerPO.checkSubString(arrStr.get(0), '19900130', 0, 8);
        beakerPO.checkSubString(arrStr.get(1), '7.898', 0, 5);
        beakerPO.checkSubString(arrStr.get(2), '7.956', 0, 5);
        beakerPO.checkSubString(arrStr.get(3), '7.921', 0, 5);
        beakerPO.checkSubString(arrStr.get(4), '8.085', 0, 5);
        beakerPO.checkSubString(arrStr.get(5), '8.132', 0, 5);
        beakerPO.checkSubString(arrStr.get(6), '8.119', 0, 5);
        beakerPO.checkSubString(arrStr.get(7), '8.196', 0, 5);
        beakerPO.checkSubString(arrStr.get(8), '8.206', 0, 5);
        beakerPO.checkSubString(arrStr.get(9), '8.258', 0, 5);

        idCell = "codeZxPm5k";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkImageByIdCell(idCell);
    });


});
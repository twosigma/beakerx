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
        beakerPO.checkCellOutputTextByIdCell(idCell, '[<matplotlib.lines.Line2D at 0x106f04350>]');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(By.css('.output_png > img')).isPresent()).toBe(true);

        idCell = "codeqPMAfv";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkDataTableHeadByIdCell(idCell, 'Index 3 mo\n6 mo\n1 yr\n2 yr\n3 yr\n5 yr\n7 yr\n10 yr');
        beakerPO.checkDataTableBodyByIdCell(idCell, 5, '19900130 22:00:00.000 +0300 7.8981 7.9562 7.9210 8.0852 8.1324 8.1195 8.1962 8.2067 8.2586');


        idCell = "codeZxPm5k";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(By.css('.output_png > img')).isPresent()).toBe(true);
    });


});
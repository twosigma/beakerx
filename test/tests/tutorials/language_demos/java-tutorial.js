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

describe('Java Tutorial', function (done) {

    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FjavaTutorial.bkr&readOnly=true")
        .then(done)
        .then(beakerPO.waitUntilLoadingCellOutput());


    it('Java Examples', function () {
        var idCell = "codesvwb39";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell,'Thu Jan 14 21:39:32 EST 2016');

        idCell = "codeWRR4u2";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell,'THU JAN 14 21:39:36 EST 2016');

        idCell = "codegJFKLk";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkCellOutputTextByIdCell(idCell,'test for autotranslation');

        idCell = "codeRd3d1I";
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
        expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("this is a Java plot");
    });

});

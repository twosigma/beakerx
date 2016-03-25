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

describe('Java Tutorial', function () {

    beforeEach(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FjavaTutorial.bkr&readOnly=true").then(done);

        beakerPO.waitUntilLoadingCellOutput();
    });

    it('Java Examples', function () {
        var idxCell = 1;
        beakerPO.scrollToCodeCellOutput(idxCell);
        beakerPO.checkCellOutputText(idxCell,'Thu Jan 14 21:39:32 EST 2016');

        idxCell=2;
        beakerPO.scrollToCodeCellOutput(idxCell);
        beakerPO.checkCellOutputText(idxCell,'THU JAN 14 21:39:36 EST 2016');

        idxCell=4;
        beakerPO.scrollToCodeCellOutput(idxCell);
        beakerPO.checkCellOutputText(idxCell,'test for autotranslation');

        idxCell = 5;
        beakerPO.checkPlotIsPresent(idxCell);
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0), 'plot-bar');
        expect(beakerPO.getCodeCellOutputContainerTitle(idxCell)).toBe("this is a Java plot");
    });

});

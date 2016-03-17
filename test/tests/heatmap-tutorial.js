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

describe('HeatMap Tutorial', function () {

    function checkPlotIsPresent(codeCellOutputIdx, containerIdx){
        if (!containerIdx)
            containerIdx = 0;
        beakerPO.scrollToCodeCellOutput(codeCellOutputIdx);
        expect(beakerPO.getPlotMaing(codeCellOutputIdx, containerIdx).isPresent()).toBe(true);
    }


    function checkLegendIsPresent(codeCellOutputIdx, containerIdx) {
        if (!containerIdx)
            containerIdx = 0;
        expect(beakerPO.getPlotLegendContainer(codeCellOutputIdx, containerIdx).element(By.css('.plot-legend')).isPresent()).toBe(true);
    };

    beforeEach(function () {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fheatmap.bkr&readOnly=true");

        browser.waitForAngular();
        beakerPO.waitUntilLoadingIndicator();

    });

    afterEach(function (done) {
        beakerPO.closeNotebook()
            .then(done);
    });


    it('Basic HeatMap Example', function () {
        checkPlotIsPresent(1);
        checkLegendIsPresent(1);
    });

    it('Title, Labels, and Legend', function () {
        checkPlotIsPresent(2);
        //expect(beakerPO.getCodeCellOutputContainerYLabel(2)).toBe("Y Label");
        //expect(beakerPO.getCodeCellOutputContainerXLabel(2)).toBe("X Label");
        expect(beakerPO.getCodeCellOutputContainerTitle(2)).toBe("Heatmap Second Example");
        checkLegendIsPresent(2);
    });

    it('Hiding the legend', function () {
        checkPlotIsPresent(3);
        var nonexistent = beakerPO.getPlotLegendContainer(3, 0).all(By.css('.plot-legend'));
        expect(nonexistent.getText()).toEqual([ ]);
    });


    it('Setting colors', function () {
        checkPlotIsPresent(3);
        expect(beakerPO.getPlotSvg(3, 0).all(by.css("#maing > g > rect")).get(0).getAttribute('style')).toBe('fill: rgb(45, 185, 0);');

        checkPlotIsPresent(4);
        expect(beakerPO.getPlotSvg(4, 0).all(by.css("#maing > g > rect")).get(0).getAttribute('style')).toBe('fill: rgb(93, 93, 0);');
    });


});
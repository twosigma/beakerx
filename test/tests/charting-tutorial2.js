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

describe('Charting Tutorial', function () {

    beforeEach(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FchartingTutorial.bkr&readOnly=true").then(done);

        browser.waitForAngular();
        beakerPO.waitUntilLoadingIndicator();

    });

    afterEach(function (done) {
        beakerPO.closeNotebook()
            .then(done);
    });


    /**
     *  - ConstantLine
     *  - ConstantBand
     */
    it('Constant Lines', function() {
        var idxCell = 15;
        beakerPO.checkPlotIsPresent(idxCell);

        expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-constline');
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 2), 'plot-constline');
    });

    it('Constant Bands', function() {
        var idxCell = 16;
        beakerPO.checkPlotIsPresent(idxCell);

        expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-constband');
    });

    it('Text', function() {
        var idxCell = 18;
        beakerPO.checkPlotIsPresent(idxCell);

        expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-point');

        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 2), 'plot-text');
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 3), 'plot-text');
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 4), 'plot-text');
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 5), 'plot-text');
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 6), 'plot-text');
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 7), 'plot-text');
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 8), 'plot-text');
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 9), 'plot-text');
    });

    it('Simple Time Plot', function() {
        var idxCell = 20;
        beakerPO.checkPlotIsPresent(idxCell);
        beakerPO.checkLegendIsPresent(idxCell);

        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0), 'plot-point');
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-point');

        expect(beakerPO.getCodeCellOutputContainerYLabel(idxCell)).toBe("Price");
        expect(beakerPO.getCodeCellOutputContainerXLabel(idxCell)).toBe("Time");

    });

    it('Second Y Axis', function () {
        var idxCell = 21;
        beakerPO.checkPlotIsPresent(idxCell);
        beakerPO.checkLegendIsPresent(idxCell);

        expect(beakerPO.getCodeCellOutputContainerYLabel(idxCell)).toBe("Interest Rates");
        expect(beakerPO.getCodeCellOutputContainerXLabel(idxCell)).toBe("Time");
        expect(beakerPO.getCodeCellOutputContainerYRLabel(idxCell)).toBe("Spread");
    });

    it('Logarithmic Scale', function() {
        var idxCell = 22;
        beakerPO.checkPlotIsPresent(idxCell, 0);
        beakerPO.checkPlotIsPresent(idxCell, 1);
        beakerPO.checkLegendIsPresent(idxCell, 0);
        beakerPO.checkLegendIsPresent(idxCell, 1);

        expect(beakerPO.getCodeCellOutputContainerTitle(idxCell, 0)).toBe("Linear x, Log y");
        expect(beakerPO.getCodeCellOutputContainerTitle(idxCell, 1)).toBe("Linear x, Linear y");

        expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
        expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
        expect(beakerPO.getPlotSvgElementByIndex(idxCell, 1, 0).element(by.tagName('circle')).isPresent()).toBe(true);
        expect(beakerPO.getPlotSvgElementByIndex(idxCell, 1, 1).element(by.tagName('circle')).isPresent()).toBe(true);
    });

    it('Date Objects for the Time Coordinate', function() {
        var idxCell = 24;
        beakerPO.checkPlotIsPresent(idxCell);
        beakerPO.checkLegendIsPresent(idxCell);
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0), 'plot-point');
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-point');
    });

    it('Nanosecond Resolution', function() {
        var idxCell = 25;
        beakerPO.checkPlotIsPresent(idxCell);
        beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0), 'plot-point');
    });

});
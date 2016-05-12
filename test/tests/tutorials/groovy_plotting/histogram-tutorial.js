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

describe('Histogram Tutorial', function() {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fhistogram.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('histogramTutorial');
        done();
    });

    it('Random Demo Data', function () {
        element(by.css('bk-cell[cellid="section912gtQ"] span.bksectiontoggleplus')).click();
        var idCell = "codeQ4eHXa";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
    });

    it('Histogram of single data set', function () {
        var idCell = "codesp4ayU";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        expect(beakerPO.getPlotMaingByIdCell(idCell).all(by.css('rect')).count()).toBe(25);
    });

    it('Wide Histogram with Manual Parameters', function () {
        var idCell = "codeZrnKVR";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        expect(beakerPO.getPlotMaingByIdCell(idCell).all(by.css('rect')).count()).toBe(99);
        expect(beakerPO.getCodeCellOutputContainerYLabelByIdCell(idCell)).toBe("Count");
        expect(beakerPO.getCodeCellOutputContainerXLabelByIdCell(idCell)).toBe("Size");
        expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Wide Histogram with Manual Parameters");
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0')).getCssValue('fill')).toBe('rgb(0, 154, 166)');
        expect(beakerPO.getPlotContainerByIdCell(idCell).getCssValue('height')).toBe('200px');
        expect(beakerPO.getPlotContainerByIdCell(idCell).getCssValue('width')).toBe('800px');
    });

});
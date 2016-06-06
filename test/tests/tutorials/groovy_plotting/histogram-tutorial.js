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
        beakerPO.checkSaveAsSvgPngByIdCell(idCell, "plot");
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

    describe('Multiple Data Sets', function(){
        it('Wide Histogram with Manual Parameters', function () {
            var idCell = "code46dBKX";
            beakerPO.scrollToBkCellByIdCell(idCell);
            //beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);
            expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Default is Overlap");
            var i0Elem = beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0'));
            expect(i0Elem.all(by.css('rect')).count()).toBe(99);
            expect(i0Elem.getCssValue('fill')).toBe('rgb(0, 154, 166)');
            expect(i0Elem.getCssValue('fill-opacity')).toEqual('1');
            var i1Elem = beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i1'));
            expect(i1Elem.all(by.css('rect')).count()).toBe(99);
            expect(i1Elem.getCssValue('fill')).toBe('rgb(230, 50, 50)');
            expect(i1Elem.getCssValue('fill-opacity')).toBeLessThan(1);
        });

        it('Histogram.DisplayMode.STACK', function() {
            var idCell = "codeN7OH4t";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);
            expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Stack");
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0')).all(by.css('rect')).count()).toBe(99);
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i1')).all(by.css('rect')).count()).toBe(99);
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('x').then(function(x00){
                beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_0')).getAttribute('x').then(function(x10){
                    expect(x00).toBe(x10);
                });
            });
        });

        it('Histogram.DisplayMode.SIDE_BY_SIDE', function(){
            var idCell = "codeZKTiKo";
            beakerPO.scrollToBkCellByIdCell(idCell);
            //beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);
            expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Side by Side");
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0')).all(by.css('rect')).count()).toBe(55);
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i1')).all(by.css('rect')).count()).toBe(55);
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('x').then(function(x00){
                beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_0')).getAttribute('x').then(function(x10){
                    expect(x00).toBeLessThan(x10);
                });
            });
        });
    });

    it('Cumulative', function(){
        var idCell = "codeEqROmJ";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Cumulative");
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0')).all(by.css('rect')).count()).toBe(55);
    });

    it('Normed', function(){
        var idCell = "codeGKqGpx";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Normed, Area = 1.0");
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0')).all(by.css('rect')).count()).toBe(55);
    });

    it('Log scale y-axis', function(){
        var idCell = "codeoj0bOm";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

});
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

describe('Plot actions Tutorial', function() {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fplot-actions.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('plotActionsTutorial');
        done();
    });

    describe('onClick action', function(){
        it('Should change legend name', function () {
            var idCell = "code6YRkpO";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);
            beakerPO.checkLegendIsPresentByIdCell(idCell);

            expect(beakerPO.getPlotLegendContainerByIdCell(idCell).$$('#plotLegend label').get(1).getText()).toBe('line 1');
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0 > path')).click();
            browser.sleep(1000);
            expect(beakerPO.getPlotLegendContainerByIdCell(idCell).$$('#plotLegend label').get(1).getText()).toBe('new name');
        });
        it('Should change opacity', function () {
            var idCell = "codepCGwVI";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);

            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill')).toBe('rgb(255, 0, 0)');
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill-opacity')).toBe('1');
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).click();
            browser.sleep(1000);
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill')).toBe('rgb(255, 0, 0)');
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill-opacity')).not.toBe('1');
        });
        it('Random Demo Data', function () {
            var idCell = "codehjGu00";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.collapseCellMenuByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        });
        it('LOD plots actions', function () {
            var idCell = "code7FW6Gt";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);
        });
    });

    it('Run tag on click', function () {
        var idCell = "codemgwFTf";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        beakerPO.clickElementWithHandlingError(beakerPO.getPlotSvgByIdCell(idCell).$('rect#i0_0'), 'rectPlot');
        browser.sleep(1000);
        beakerPO.waitUntilLoadingFinished();
    });

    it('Should display coordinates', function () {
        var idCell = "codexI1Q85";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
        beakerPO.checkSubString( beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('pre')), 'You clicked on orange Points (element with coordinates [1,1])');
    });

    describe('onClick action for CategoryPlot', function(){
        it('Should increase value', function () {
            var idCell = "code2wKXRr";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);
            var y1 = beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('y');
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).click().then(function(){
                browser.sleep(1000);
                expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('y')).toBeLessThan(y1);
            });
        });
        it('Should display label', function () {
            var idCell = "codezALzhI";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_0')).isPresent()).not.toBe(true);
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).click().then(function(){
                browser.sleep(1000);
                expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_0')).isPresent()).toBe(true);
            });
        });
        it('Should display centerSeries', function () {
            var idCell = "codeEmfz0T";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);
            var rect0_0 = beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0'));
            var yBase0_0 = rect0_0.getAttribute('y') + rect0_0.getAttribute('height');
            var rect1_0 = beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_0'));
            var yBase1_0 = rect1_0.getAttribute('y') + rect1_0.getAttribute('height');
            expect(yBase0_0).toBe(yBase1_0);
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).click().then(function(){
                browser.sleep(1000);
                rect0_0 = beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0'));
                yBase0_0 = rect0_0.getAttribute('y') + rect0_0.getAttribute('height');
                rect1_0 = beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_0'));
                yBase1_0 = rect1_0.getAttribute('y') + rect1_0.getAttribute('height');
                expect(yBase0_0).toBe(yBase1_0);
            });
        });
    });

    it('CombinedPlot', function () {
        var idCell = "codeWk9LjT";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell, 0);
        beakerPO.checkPlotIsPresentByIdCell(idCell, 1);
    });

    describe('OnKey action', function(){
        it('UP_ARROW, DOWN_ARROW, tag to run', function () {
            var idCell = "codeDdKmZN";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).click();
            var y1 = beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('y');
            element(by.css('body')).sendKeys(protractor.Key.ARROW_DOWN).then(function(){
                browser.sleep(1000);
                expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('y')).toBeGreaterThan(y1);
            });
            element(by.css('body')).sendKeys(protractor.Key.ARROW_UP).then(function(){
                browser.sleep(1000);
                expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('y')).toBe(y1);
            });
            element(by.css('body')).sendKeys("T").then(function(){
                browser.sleep(1000);
                beakerPO.waitUntilLoadingFinished();
            });
        });

        it('Should display coordinates', function () {
            var idCell = "codeZjj3Kf";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
            beakerPO.checkSubString( beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('pre')), 'Key action on Bars (element with coordinates [1,5])');
        });
    });

});
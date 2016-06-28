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

describe('HeatMap Tutorial', function () {

    beforeAll(function(done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fheatmap.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
        browser.driver.manage().window().maximize();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('heatmapTutorial1');
        done();
    });

    it('Basic HeatMap Example', function () {
        var idCell = "codeFh3TtJ";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        beakerPO.checkLegendIsPresentByIdCell(idCell);
        beakerPO.getPlotLegendContainerByIdCell(idCell).element(by.css('#plotLegend')).getCssValue('top').then(function(legendTop){
            beakerPO.getPlotLegendContainerByIdCell(idCell).element(by.css('#plotContainer')).getCssValue('top').then(function(plotTop){
                expect(parseInt(plotTop)).toBeLessThan(parseInt(legendTop));
            });
        });
        beakerPO.checkSaveAsSvgPngByIdCell(idCell, "plot");
    });

    it('Title, Labels and Legend', function () {
        var idCell = "code4GJtht";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        beakerPO.checkLegendIsPresentByIdCell(idCell);
        expect(beakerPO.getCodeCellOutputContainerXLabelByIdCell(idCell)).toBe("X Label");
        expect(beakerPO.getCodeCellOutputContainerYLabelByIdCell(idCell)).toBe("Y Label");
        expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Heatmap Second Example");
        beakerPO.getPlotLegendContainerByIdCell(idCell).element(by.css('#plotLegend')).getCssValue('top').then(function(legendTop){
            beakerPO.getPlotLegendContainerByIdCell(idCell).element(by.css('#plotContainer')).getCssValue('top').then(function(plotTop){
                expect(parseInt(legendTop)).toBeLessThan(parseInt(plotTop));
            });
        });
    });

    it('Setting colors, hiding the legend', function () {
        var idCell = "codeVDjdY4";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        expect(beakerPO.getPlotLegendContainerByIdCell(idCell).element(by.css('#plotLegend')).isPresent()).toBe(false);
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill')).toBe('rgb(45, 185, 0)');
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_1')).getCssValue('fill')).toBe('rgb(50, 187, 0)');

        idCell = "codehVlhId";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill')).toBe('rgb(93, 93, 0)');
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_1')).getCssValue('fill')).toBe('rgb(179, 179, 0)');
        expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Custom Gradient Example");
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('filter')).toBeNull();
        beakerPO.createScreenshot('heatmapTooltip');
        browser.actions().mouseMove(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0'))).perform().then(function(){
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('filter')).not.toBeNull();
        });
    });

    it('Custom size, no tooltips', function () {
        var idCell = "codebYcLcg";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        beakerPO.checkSize(beakerPO.getPlotSvgByIdCell(idCell), 900, 300);
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('filter')).toBeNull();
        browser.actions().mouseMove(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0'))).perform().then(function(){
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('filter')).toBeNull();
        });
    });

});
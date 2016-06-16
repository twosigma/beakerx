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

            browser.wait(beakerPO.EC.textToBePresentInElement(beakerPO.getPlotLegendContainerByIdCell(idCell).all(By.css('#plotLegend label')).get(1), 'line 1'), 10000);
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0 > path')).click().then(function(){
                browser.wait(beakerPO.EC.textToBePresentInElement(beakerPO.getPlotLegendContainerByIdCell(idCell).all(By.css('#plotLegend label')).get(1), 'new name'), 10000);
            });

        });

        it('Should change opacity', function () {
            var idCell = "codepCGwVI";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
            beakerPO.checkPlotIsPresentByIdCell(idCell);

            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill')).toBe('rgb(255, 0, 0)');
            expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill-opacity')).toBe('1');
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).click().then(function(){
                expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill')).toBe('rgb(255, 0, 0)');
                expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill-opacity')).not.toBe('1');
            });
        });

        it('Random Demo Data', function () {
            var idCell = "codehjGu00";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.getBkCellByIdCell(idCell).element(by.css('div[ng-click="toggleCellInput()"]')).click();
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        });

        it('LOD plots actions', function () {
            var idCell = "code7FW6Gt";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        });
    });

    it('Run tag on click', function () {
        var idCell = "codemgwFTf";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).click().then(function(){
            beakerPO.waitUntilLoadingFinished();
        });
    });

    it('Should display coordinates', function () {
        var idCell = "codexI1Q85";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
        beakerPO.checkSubString( beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('pre')), 'You clicked on orange Points (element with coordinates [1,1])');
    });

});
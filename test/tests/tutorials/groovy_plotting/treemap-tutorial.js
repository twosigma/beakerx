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

describe('TreeMap Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Ftreemap.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('treemapTutorial');
        done();
    });

    it('Data', function () {
        var idCell = "codeaE1Bj6";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        beakerPO.runCellWithoutDisplayResultByIdCell("codeFNV2Y7");
        beakerPO.runCellWithoutDisplayResultByIdCell("codewJl8JV");
        beakerPO.runCellWithoutDisplayResultByIdCell("codeCVL8NL");
    });

    it('Simple TreeMap', function(){
        var idCell = "codeFWGBPN";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.id("plotTitle")).getText()).toBe("Simple TreeChart");
        beakerPO.checkSaveAsSvgPngByIdCell(idCell, "Simple TreeChart");
    });

    it('Mode.SQUARIFY', function(){
        var idCell = "coderKNBZk";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('Mode.SLICE', function(){
        var idCell = "codeLVi4Il";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('Mode.DICE', function(){
        var idCell = "codeLSJtGt";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('Mode.SLICE_DIC', function(){
        var idCell = "code2duu3M";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('Ratio Property', function(){
        var idCell = "code2duu3M";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('ValueAccessor.VALUE', function(){
        var idCell = "codeNHpOEN";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('ValueAccessor.WEIGHT', function(){
        var idCell = "codeqbZpFM";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('ToolTipBuilder', function(){
        var idCell = "codeRJR152";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('RandomColorProvider', function(){
        var idCell = "codeUgqWVP";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('RandomColorProvider with different colours', function(){
        var idCell = "codeU78bF2";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('GradientColorProvider with default colours', function(){
        var idCell = "codeiWaUEK";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('GradientColorProvider with overrides colours', function(){
        var idCell = "codeEhXTHH";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('Example of big TreeMap', function(){
        var idCell = "code86osu2";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot', 'bigTreeMap', 60000);
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

    it('Example of Tree Map for Flare', function(){
        var idCell = "codeE5N0oI";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);
    });

});

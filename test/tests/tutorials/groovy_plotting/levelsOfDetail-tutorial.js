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

describe('Groovy Plotting', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FlevelsOfDetail.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('levelsOfDetailTutorial');
        done();
    });

    it('Levels of Detail', function () {
        var idCell = "coden9MEmJ";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.collapseCellMenuByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');

        idCell = "codeDyDWm8";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        expect(beakerPO.getPlotMaingByIdCell(idCell).isPresent()).toBe(true);

        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.id("plotTitle")).getText()).toBe("Drunken Sailor Walks");
        beakerPO.checkSaveAsSvgPngByIdCell(idCell, "Drunken Sailor Walks");
    });

});
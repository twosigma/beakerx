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
var beakerPO;

describe('Processing with p5.js', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fp5.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
        browser.driver.manage().window().maximize();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('p5jsTutorial');
        done();
    });

    it('Should display p5.js example', function () {
        var idCell = "codexJibGW";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.collapseCellMenuByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Html');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('div#sketch > canvas')).isPresent()).not.toBe(true);

        beakerPO.scrollToBkCellByIdCell("codeJMbuKV");
        beakerPO.runBkCellDefaultButtonByIdCell("codeJMbuKV");

        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('div#sketch > canvas')).isPresent()).toBe(true);
        beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('div#sketch > canvas')).click();
    });


});
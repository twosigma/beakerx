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

describe('Node.js Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fnode-examples.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('nodejsTutorial');
        done();
    });

    describe('Node Server and JavaScript Client', function () {

        it('Start server', function () {
            var idCell = "codeuBtnh9";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text', 'nodejsStart', 60000);
            beakerPO.checkCellOutputSubTextByIdCell(idCell, '"server started"', 0, 16);
        });

        it('Check client', function(){
            var idCell = "codeYLvzUk";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Html');

            idCell = "code5aRHZP";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text', 'nodejsClient', 60000);
            beakerPO.getCodeCellOutputByIdCell(idCell).element(By.css('pre')).getText()
                .then(function(value){
                    expect(value.indexOf('per HTTP call')).not.toBe(-1);
                });

            idCell = "codeYLvzUk";
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            beakerPO.getCodeCellOutputByIdCell(idCell).element(By.css('#message')).getText()
                .then(function(value){
                    expect(value.indexOf('Hello from Node')).not.toBe(-1);
                });
        });

    });
});

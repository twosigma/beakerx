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

describe('Progress Reporting API', function (done) {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FprogressUpdate.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('progressAPITutorial');
        done();
    });

    function checkProgressBar(idCell, label){
        browser.wait(beakerPO.EC.presenceOf(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.cssContainingText('div.progress-bar', label))), 5000).then(
            function(result){return true;},
            function(error){
                expect(error).toBe('progress bar should display ' + label);
            });
    };

    function checkProgressMessage(idCell, label){
        browser.wait(beakerPO.EC.presenceOf(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.cssContainingText('div[ng-if="hasMessage()"]', label))), 5000).then(
            function(result){return true;},
            function(error){
                expect(error).toBe('progress message should display ' + label);
            });
    };

    it('Display progress by Groovy', function () {
        var idCell = "codeXnQmyX";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Progress');
        var printElem = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('li > pre'));
        checkProgressMessage(idCell, 'starting');
        checkProgressBar(idCell, '20 %');
        checkProgressMessage(idCell, 'started');
        checkProgressBar(idCell, '40 %');
        checkProgressMessage(idCell, 'begin');
        checkProgressBar(idCell, '60 %');
        checkProgressMessage(idCell, 'middle');
        checkProgressBar(idCell, '80 %');
        checkProgressMessage(idCell, 'about to finish');
        browser.wait(beakerPO.EC.presenceOf(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.cssContainingText('pre', 'finished'))), 5000);
    });

});
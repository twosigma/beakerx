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

describe('Progress Reporting API', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FprogressUpdate.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('progressAPITutorial');
        done();
    });

    function checkProgressBar(idCell, label){
        return browser.wait(beakerPO.EC.presenceOf(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.cssContainingText('div.progress-bar', label))), 30000).then(
            function(result){return true;},
            function(error){
                beakerPO.createScreenshot('progressBar' + label);
                expect(error).toBe('progress bar should display ' + label);
            });
    };

    function checkProgressMessage(idCell, label){
        return browser.wait(beakerPO.EC.presenceOf(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.cssContainingText('div[ng-if="hasMessage()"]', label))), 30000).then(
            function(result){return true;},
            function(error){
                beakerPO.createScreenshot('progressMsg' + label);
                expect(error).toBe('progress message should display ' + label);
            });
    };

    function checkProgressTopBar(idCell, label){
        return browser.wait(beakerPO.EC.presenceOf(element(by.cssContainingText('div.navbar-text', label))), 30000).then(
            function(result){return true;},
            function(error){
                expect(error).toBe('progress top Beaker bar should display ' + label);
            });
    };

    it('Display progress by Groovy', function () {
        var idCell = "codeXnQmyX";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.runBkCellDefaultButtonByIdCell(idCell);
        checkProgressMessage(idCell, 'starting')
            .then(checkProgressBar.bind(this, idCell, '20 %'))
            .then(checkProgressMessage.bind(this, idCell, 'about to finish'));
        browser.wait(beakerPO.EC.presenceOf(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.cssContainingText('pre', 'finished'))), 20000);
    });

    it('Display progress by Java', function () {
        var idCell = "codefgkSlJ";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.runBkCellDefaultButtonByIdCell(idCell);
        checkProgressMessage(idCell, 'starting')
            .then(checkProgressBar.bind(this, idCell, '20 %'))
            .then(checkProgressMessage.bind(this, idCell, 'about to finish'));
    });

    it('Display progress by JavaScript', function () {
        var idCell = "codeOw6722";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        /*
         Skip check because protractor waiting for the end of progress bar. (The check works well with code 'setTimeout(operation,1500)')
        checkProgressMessage(idCell, 'working');
        checkProgressBar(idCell, '20 %');
        checkProgressMessage(idCell, 'working');
        checkProgressBar(idCell, '40 %');
        checkProgressMessage(idCell, 'still working');
        checkProgressBar(idCell, '60 %');
        checkProgressMessage(idCell, 'still working');
        checkProgressBar(idCell, '80 %');
        */
        browser.wait(beakerPO.EC.presenceOf(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.cssContainingText('pre', 'FINISHED (finally)'))), 25000);
    });

    it('Display progress on top Beaker bar', function () {
        var idCell = "codeJg1qDx";
        beakerPO.scrollToBkCellByIdCell(idCell);

        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        /*
         Skip check because protractor waiting for the end of progress bar. (The check works well with code 'setTimeout(operation,1500)')
         checkProgressTopBar(idCell, 'working at 20');
         checkProgressTopBar(idCell, 'working at 40');
         checkProgressTopBar(idCell, 'still working at 60');
         checkProgressTopBar(idCell, 'still working at 80');
         */
        browser.wait(beakerPO.EC.presenceOf(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.cssContainingText('pre', 'FINISHED (finally)'))), 50000);
    });

});
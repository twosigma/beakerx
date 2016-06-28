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

describe('Combining Python and R', function (done) {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fauto-arima.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('pythonRTutorial');
        done();
    });

    it('Initialise DataFrame (Python3)', function () {
        var idCell = "codeZ6BixR";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table', 'pythonRInit', 60000);
        beakerPO.checkDtContainerByIdCell(idCell);
        beakerPO.checkEvaluatorByIdCell(idCell, "Python3");
    });
    it('Should display Forecast Plot (R)', function () {
        var idCell = "codeOsePKN";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results', 'pythonRForecast', 60000);
        browser.wait(beakerPO.EC.presenceOf(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('svg > g')), 30000))
            .then(
                function(isPresent){
                    expect(isPresent).toBe(true);
                });
        beakerPO.checkEvaluatorByIdCell(idCell, "R");
    });
});
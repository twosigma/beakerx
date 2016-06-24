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

describe('Simultaneous Python2 and Python3', function (done) {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fpython23.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('python23Tutorial');
        done();
    });

    it('Using the "mechanize" package (IPython)', function () {
        var idCell = "codeE3gRhU";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Html');
        beakerPO.checkSubString(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('pre')), "u'<!DOCTYPE html>\\n<html class=\"google mmfb\"", 0, 44);
        beakerPO.checkEvaluatorByIdCell(idCell, "IPython");
    });
    it('Should display Table (Python3)', function () {
        var idCell = "codeH4pCp3";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        beakerPO.checkEvaluatorByIdCell(idCell, "Python3");
    });
});
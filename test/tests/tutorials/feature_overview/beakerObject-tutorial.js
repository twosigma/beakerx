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

describe('Working with d3.js', function (done) {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fbeaker.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('beakerObjectTutorial');
        done();
    });

    describe('Autotranslation', function(){
        it('Initialise beaker.x (IPython)', function () {
            var idCell = "codeT8xywV";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.runCellWithoutDisplayResultByIdCell(idCell);
            beakerPO.checkEvaluatorByIdCell(idCell, "IPython");
        });
        it('Should display 11 (JavaScript)', function () {
            var idCell = "codef0D32m";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "11");
            beakerPO.checkEvaluatorByIdCell(idCell, "JavaScript");
        });
        it('Should display 12 (Groovy)', function () {
            var idCell = "code3PEiph";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "12");
            beakerPO.checkEvaluatorByIdCell(idCell, "Groovy");
        });
    });

});
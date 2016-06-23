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

describe('Autotranslation Tutorial', function (done) {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fautotranslation.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('autotranslationTutorial');
        done();
    });

    describe('Basic Examples', function(){
        it('Initialise beaker.x (IPython)', function () {
            var idCell = "codeMXyZnW";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.runCellWithoutDisplayResultByIdCell(idCell);
            //beakerPO.checkEvaluatorByIdCell(idCell, "IPython");
        });
        it('Should display "Strings work fine" (JavaScript)', function () {
            var idCell = "codeGNNbIg";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "Strings work fine");
            //beakerPO.checkEvaluatorByIdCell(idCell, "JavaScript");
        });
        it('Should display "Strings work fine" (R)', function () {
            var idCell = "code4NkMTF";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, '[1] "Strings work fine"');
            //beakerPO.checkEvaluatorByIdCell(idCell, "R");
        });
        it('Should display "Strings work fineStrings work fine" (Groovy)', function () {
            var idCell = "codeL7598T";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "Strings work fineStrings work fine");
            //beakerPO.checkEvaluatorByIdCell(idCell, "Groovy");
        });
        it('Should display {"a":1,"b":2.2,"c":"three","d":[4,5,6]} (JavaScript)', function () {
            var idCell = "codeuP2kh6";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, '{"a":1,"b":2.2,"c":"three","d":[4,5,6]}');
            //beakerPO.checkEvaluatorByIdCell(idCell, "JavaScript");
        });
        it('Should display {"a":1,"b":2.2,"c":"three","d":[4,5,6]} (Groovy)', function () {
            var idCell = "codeeLdoVF";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, '{"a":1,"b":2.2,"c":"three","d":[4,5,6]}');
            //beakerPO.checkEvaluatorByIdCell(idCell, "Groovy");
        });
    });


});
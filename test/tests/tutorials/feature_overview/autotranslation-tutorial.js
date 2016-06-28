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
            beakerPO.checkEvaluatorByIdCell(idCell, "IPython");
        });
        it('Should display "Strings work fine" (JavaScript)', function () {
            var idCell = "codeGNNbIg";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "Strings work fine");
            beakerPO.checkEvaluatorByIdCell(idCell, "JavaScript");
        });
        it('Should display [1]"Strings work fine" (R)', function () {
            var idCell = "code4NkMTF";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, '[1] "Strings work fine"');
            beakerPO.checkEvaluatorByIdCell(idCell, "R");
        });
        it('Should display "Strings work fineStrings work fine" (Groovy)', function () {
            var idCell = "codeL7598T";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "Strings work fineStrings work fine");
            beakerPO.checkEvaluatorByIdCell(idCell, "Groovy");
        });
        it('Should display {"a":1,"b":2.2,"c":"three","d":[4,5,6]} (JavaScript)', function () {
            var idCell = "codeuP2kh6";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, '{"a":1,"b":2.2,"c":"three","d":[4,5,6]}');
            beakerPO.checkEvaluatorByIdCell(idCell, "JavaScript");
        });
        it('Should display {"a":1,"b":2.2,"c":"three","d":[4,5,6]} (Groovy)', function () {
            var idCell = "codeeLdoVF";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, '{"a":1,"b":2.2,"c":"three","d":[4,5,6]}');
            beakerPO.checkEvaluatorByIdCell(idCell, "Groovy");
        });
    });

    describe('Scalars in R', function(){
        it('Should display [1] 12 (R)', function () {
            var idCell = "codeEh6ibk";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, '[1] 12');
            beakerPO.checkEvaluatorByIdCell(idCell, "R");
        });
        it('Should display [12] (IPython)', function () {
            var idCell = "codeNydW3I";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Html');
            beakerPO.checkCellOutputTextByIdCell(idCell, '[12]');
            beakerPO.checkEvaluatorByIdCell(idCell, "IPython");
        });
        it('Should display 24 (Groovy)', function () {
            var idCell = "code3eQahz";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, '24');
            beakerPO.checkEvaluatorByIdCell(idCell, "Groovy");
        });
        it('Should display 13 (Groovy)', function () {
            var idCell = "codeKBVTUw";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, '13');
            beakerPO.checkEvaluatorByIdCell(idCell, "Groovy");
        });
        it('Should display [1] 13 (R)', function () {
            var idCell = "codeOU5Hsk";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, '[1] 13');
            beakerPO.checkEvaluatorByIdCell(idCell, "R");
        });
    });

    describe('Data Frames', function(){
        it('Initialise data frame (IPython)', function () {
            var idCell = "codetsCQ0F";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.runCellWithoutDisplayResultByIdCell(idCell);
            beakerPO.checkEvaluatorByIdCell(idCell, "IPython");
        });
        it('Should display table (Groovy)', function () {
            var idCell = "codeKUuJGm";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
            beakerPO.checkEvaluatorByIdCell(idCell, "Groovy");
            expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('bk-output-display[type="Table"]')).isPresent()).toBe(true);
            beakerPO.checkDtContainerByIdCell(idCell);
        });
        it('Should display table (R)', function () {
            var idCell = "codej0d66h";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDtContainerByIdCell(idCell);
            beakerPO.checkEvaluatorByIdCell(idCell, "R");

            idCell = "codeIkZtDp";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDtContainerByIdCell(idCell);
            beakerPO.checkEvaluatorByIdCell(idCell, "R");
        });
        it('Should display table (IPython)', function () {
            var idCell = "codeNYJvKz";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDtContainerByIdCell(idCell);
            beakerPO.checkEvaluatorByIdCell(idCell, "IPython");
        });
        it('dataFrame.toString() (JavaScript)', function () {
            var idCell = "codeMVbQlE";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkEvaluatorByIdCell(idCell, "JavaScript");
            beakerPO.checkSubString(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('pre')), "DataFrame:  Rows: 10", 0, 20);
        });
    });

    describe('Autotranslated types', function(){
        it('Initialise table, image, matrix (Groovy)', function () {
            var idCell = "code16S3aP";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkEvaluatorByIdCell(idCell, "Groovy");
        });
        it('Should display table (JavaScript)', function () {
            var idCell = "codeXtRVUM";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDtContainerByIdCell(idCell);
            beakerPO.checkEvaluatorByIdCell(idCell, "JavaScript");
        });
        it('Should display image (JavaScript)', function () {
            var idCell = "codeEMqWcS";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Image');
            expect(beakerPO.checkImageByIdCell(idCell));
            beakerPO.checkEvaluatorByIdCell(idCell, "JavaScript");
        });
        it('Should display matrix (JavaScript)', function () {
            var idCell = "codewMaJxB";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDtContainerByIdCell(idCell);
            beakerPO.checkEvaluatorByIdCell(idCell, "JavaScript");
        });
    });

});
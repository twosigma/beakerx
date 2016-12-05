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

describe('The Beaker Object Tutorial', function () {

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

    it('Storage and Sharing', function () {
        var idCell = "codeaINahj";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        beakerPO.checkCellOutputTextByIdCell(idCell, "[1,1,2,3,5,8]");
    });

    describe('Viewing and Removing', function(){
        it('Should display x, y values ', function () {
            var idCell = "coderACA1q";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
            var liVar = beakerPO.getLiOutputcontainerByIdCell(idCell);
            expect(liVar.count()).toBe(2);
            expect(liVar.get(0).element(by.css('b')).getText()).toBe("y");
            expect(liVar.get(0).element(by.css('pre')).getText()).toBe("[1,1,2,3,5,8]");
            expect(liVar.get(1).element(by.css('b')).getText()).toBe("x");
            expect(liVar.get(1).element(by.css('pre')).getText()).toBe("11");
        });
        it('Should delete x (by run cell)', function () {
            var idCell = "codeAgGQzI";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
            beakerPO.checkCellOutputTextByIdCell(idCell, "true");

            idCell = "coderACA1q";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
            var liVar = beakerPO.getLiOutputcontainerByIdCell(idCell);
            expect(liVar.count()).toBe(1);
            expect(liVar.get(0).element(by.css('b')).getText()).toBe("y");
        });
        it('Should rename y to z (by menu)', function () {
            var idCell = "coderACA1q";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
            var liVar = beakerPO.getLiOutputcontainerByIdCell(idCell);
            expect(liVar.get(0).element(by.css('b')).getText()).toBe("y");

            liVar.get(0).element(by.css('a.dropdown-toggle')).click();
            var renameElem =  liVar.get(0).element(by.cssContainingText('a', 'Rename'));
            browser.actions().mouseMove(renameElem).perform();
            renameElem.click();
            browser.wait(beakerPO.EC.visibilityOf(element(by.css('div.modal-body'))), 10000).then(function(){
                element(by.css('input#property-name')).sendKeys('z');
                element(by.css('div.modal-footer button[ng-click="save()"]')).click();
            });
            expect(beakerPO.getLiOutputcontainerByIdCell(idCell).get(0).element(by.css('b')).getText()).toBe("z");
        });
        it('Should delete z (by menu)', function () {
            idCell = "coderACA1q";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
            var liVar = beakerPO.getLiOutputcontainerByIdCell(idCell);
            expect(liVar.get(0).element(by.css('b')).getText()).toBe("z");

            liVar.get(0).element(by.css('a.dropdown-toggle')).click();
            var deleteElem =  liVar.get(0).all(by.cssContainingText('a', 'Delete')).get(0);
            browser.actions().mouseMove(deleteElem).perform();
            deleteElem.click().then(function(){
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
                expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('li.outputcontainer-li')).isPresent()).toBe(false);
            });
        });
    });

    it('Beaker API Calls', function () {
        var idCell = "codeLRsgl6";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
        var printElem = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('li > pre'));
        beakerPO.checkSubString(printElem.get(0), 'stdout for JavaScript:');
        beakerPO.checkSubString(printElem.get(1), 'useful for debugging,');
        beakerPO.checkSubString(printElem.get(2), 'different from');
        beakerPO.checkSubString(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('div.output-padding > pre')), 'a returned value');
    });

});
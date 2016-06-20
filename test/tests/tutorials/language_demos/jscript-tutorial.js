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

describe('JavaScript Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fjs-examples.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('javaScriptTutorial');
        done();
    });

    describe('JavaScript Examples', function () {

        it('The Game of Life', function () {
            var idCell = "code31H2LG";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Html');

            idCell = "codeace4aM";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.runBkCellDefaultButtonByIdCell(idCell);

            idCell = "code31H2LG";
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            browser.executeScript("$('#stop').click();");

            idCell = "codeace4aM";
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            beakerPO.checkCellOutputSubTextByIdCell(idCell, 'ratio', 0, 5);
        });
        it('Printing', function(){
            var idCell = "codeKLDfkl";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            var preElements = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('pre'));
            beakerPO.checkSubString(preElements.get(0), 'Use', 0, 3);
            beakerPO.checkSubString(preElements.get(1), 'It gets saved', 0, 13);
            beakerPO.checkSubString(preElements.get(2), 'Errors too', 0, 10);
            beakerPO.checkSubString(preElements.get(3), 'returns a regular value: three', 0, 30);
        });
        describe('Data Frames', function(){
            it('should display table', function(){
                var idCell = "codeq2N3Fu";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
                beakerPO.checkTablesRowsByIdCell(idCell, 5);
            });
            it('should add row', function(){
                var idCell = "codebUXwTB";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
                beakerPO.checkTablesRowsByIdCell(idCell, 6);
            })
            it('DataFrame.toString()', function(){
                var idCell = "codeezzeV4";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
                beakerPO.checkCellOutputSubTextByIdCell(idCell, 'DataFrame:  Rows: 6', 0, 19);
            });
            it('DataFrame.columns()', function(){
                var idCell = "codelXtcIc";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
                beakerPO.checkCellOutputSubTextByIdCell(idCell, '["name","mass","charge3"]', 0, 25);
            });
            it('DataFrame.dtypes()', function(){
                var idCell = "codexbWnLA";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
                beakerPO.checkCellOutputSubTextByIdCell(idCell, '["string","double","integer"]', 0, 29);
            });
            it('DataFrame.getColumn("name")', function(){
                var idCell = "codeu1BYGo";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
                beakerPO.checkCellOutputSubTextByIdCell(idCell, '["up","charm","top","down","strange","bottom"]', 0, 46);
            });
            it('DataFrame.getRow(0)', function(){
                var idCell = "codeSpYbEt";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
                beakerPO.checkTablesRowsByIdCell(idCell, 3);
            });
            it('DataFrame.lenght()', function(){
                var idCell = "codePTuKaA";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
                beakerPO.checkCellOutputSubTextByIdCell(idCell, '6', 0, 1);
            });
            it('DataFrame.removeColumn("charge3")', function(){
                var idCell = "codeczvMqm";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
                beakerPO.checkTablesColumnsByIdCell(idCell, 2);
            });
            it('Matrices to DataFrame', function(){
                var idCell = "codeVBGmAc";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
                beakerPO.checkTablesColumnsByIdCell(idCell, 3);
                beakerPO.checkTablesRowsByIdCell(idCell, 3);
            });
            it('Map to DataFrame', function(){
                var idCell = "codeNtnrk8";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
                beakerPO.checkTablesColumnsByIdCell(idCell, 3);
                beakerPO.checkTablesRowsByIdCell(idCell, 3);
            });
        });
    });
});

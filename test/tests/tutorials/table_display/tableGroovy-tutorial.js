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

describe('Table Display (Groovy API)', function (done) {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Ftable-api.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
        browser.driver.manage().window().maximize();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('tableGroovyTutorial');
        done();
    });

    function getArrayTdElements(idCell, indx){
        return beakerPO.getDataTablesTBodyByIdCell(idCell).get(indx).all(by.css('td'));
    }

    describe('Programmatic control of visual formatting', function(){
        it('Built-in formatters', function () {
            var idCell = "codeaWwWKg";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table', 'tableGroovyBuiltInFormatters', 60000);
            beakerPO.checkDtContainerByIdCell(idCell);
            beakerPO.checkDataTableHeadByIdCell(idCell, 'm3\ny30\ny1\nm6\ny2\ny10\ny3\ntime\ny5\ny7');
            beakerPO.checkDataTableBodyByIdCell(idCell, 25, '0 8 8.258571 7.920952 7.956190 8.085238 8.206667 :) 1990-01-31 8.119524 8.196190');
        });
        it('Save as csv', function () {
            var idCell = "codeaWwWKg";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.checkSaveAsCsvByIdCell(idCell, 'tableGroovy');
        });
        it('Cell renderer', function () {
            var idCell = "codeROe5NG";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDtContainerByIdCell(idCell);

            var arrTd = getArrayTdElements(idCell, 0);
            expect(arrTd.count()).toBe(11);
            beakerPO.checkSubString(arrTd.get(1), '7.8981', 0, 6);
            expect(arrTd.get(1).element(by.css('.dt-bar-data')).isPresent()).toBe(true);
            expect(arrTd.get(1).element(by.css('.dt-cell-text')).isPresent()).toBe(true);
        });
        it('Controlling column display', function () {
            var idCell = "codenPyPvP";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDtContainerByIdCell(idCell);
            beakerPO.checkDataTableHeadByIdCell(idCell, 'm3\ny1\ny5\ntime\ny2');
            var arrTd = getArrayTdElements(idCell, 0);
            expect(arrTd.count()).toBe(6);
            beakerPO.checkSubString(arrTd.get(1), '7.898095', 0, 8);
            beakerPO.checkSubString(arrTd.get(2), '7.92095', 0, 7);
            beakerPO.checkSubString(arrTd.get(3), '8.11952', 0, 7);
            beakerPO.checkSubString(arrTd.get(5), '8.085238', 0, 8);
        });
        describe('Сell highlighters', function() {
            it('Color the entire table like a heatmap based on column value', function () {
                var idCell = "codeWyrMwb";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
                beakerPO.checkDtContainerByIdCell(idCell);

                var arrTd = getArrayTdElements(idCell, 0);
                expect(arrTd.count()).toBe(11);
                beakerPO.checkSubString(arrTd.get(1), '7.8981', 0, 6);
                expect(arrTd.get(1).getCssValue('background-color')).toBe('rgba(236, 91, 88, 1)');

                var arrTd20 = getArrayTdElements(idCell, 20);
                expect(arrTd20.count()).toBe(11);
                beakerPO.checkSubString(arrTd20.get(1), '5.3735', 0, 6);
                expect(arrTd20.get(1).getCssValue('background-color')).toBe('rgba(190, 114, 130, 1)');
            });
            it('Use a closure to highlight specific values', function () {
                var idCell = "code7zZ3sT";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
                beakerPO.checkDtContainerByIdCell(idCell);

                var arrTd = getArrayTdElements(idCell, 0);
                expect(arrTd.count()).toBe(4);
                beakerPO.checkSubString(arrTd.get(3), '3', 0, 1);
                expect(arrTd.get(3).getCssValue('background-color')).toBe('rgba(255, 0, 0, 1)');

                var arrTd1 = getArrayTdElements(idCell, 1);
                expect(arrTd1.count()).toBe(4);
                beakerPO.checkSubString(arrTd1.get(3), '6', 0, 1);
                expect(arrTd1.get(3).getCssValue('background-color')).toBe('rgba(0, 255, 0, 1)');
            });
            it('Heatmap with custom min/max values and colors', function () {
                var idCell = "codetHTtD2";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
                beakerPO.checkDtContainerByIdCell(idCell);

                var arrTd = getArrayTdElements(idCell, 0);
                expect(arrTd.count()).toBe(11);
                beakerPO.checkSubString(arrTd.get(3), '7.9210', 0, 6);
                expect(arrTd.get(3).getCssValue('background-color')).toBe('rgba(105, 190, 120, 1)');
                beakerPO.checkSubString(arrTd.get(4), '7.9562', 0, 6);
                expect(arrTd.get(4).getCssValue('background-color')).toBe('rgba(249, 171, 171, 1)');

                var arrTd20 = getArrayTdElements(idCell, 20);
                expect(arrTd20.count()).toBe(11);
                beakerPO.checkSubString(arrTd20.get(3), '5.5725', 0, 6);
                expect(arrTd20.get(3).getCssValue('background-color')).toBe('rgba(241, 194, 87, 1)');
                beakerPO.checkSubString(arrTd20.get(4), '5.4790', 0, 6);
                expect(arrTd20.get(4).getCssValue('background-color')).toBe('rgba(0, 0, 0, 1)');
            });
            it('UniqueEntriesHighlighter', function () {
                var idCell = "code2KwSKV";
                beakerPO.scrollToBkCellByIdCell(idCell);
                beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
                beakerPO.checkDtContainerByIdCell(idCell);

                var rgb0 = 'rgba(245, 188, 188, 1)'
                var arrTd0 = getArrayTdElements(idCell, 0);
                expect(arrTd0.count()).toBe(4);
                beakerPO.checkSubString(arrTd0.get(1), '1', 0, 1);
                expect(arrTd0.get(1).getCssValue('background-color')).toBe(rgb0);
                beakerPO.checkSubString(arrTd0.get(2), '2', 0, 1);
                expect(arrTd0.get(2).getCssValue('background-color')).toBe(rgb0);

                var rgb1 = 'rgba(188, 245, 188, 1)';
                var arrTd1 = getArrayTdElements(idCell, 1);
                expect(arrTd1.count()).toBe(4);
                beakerPO.checkSubString(arrTd1.get(1), '3', 0, 1);
                expect(arrTd1.get(1).getCssValue('background-color')).toBe(rgb1);
                beakerPO.checkSubString(arrTd1.get(2), '4', 0, 1);
                expect(arrTd1.get(2).getCssValue('background-color')).toBe(rgb1);
            });
        });
        it('Adding custom actions', function () {
            var idCell = "codex9hziv";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.scrollHeaderElement();
            beakerPO.checkDtContainerByIdCell(idCell);

            var arrTd0 = getArrayTdElements(idCell, 0);
            expect(arrTd0.count()).toBe(4);
            beakerPO.checkSubString(arrTd0.get(1), '1', 0, 1);
            browser.actions().doubleClick(arrTd0.get(1)).perform();
            beakerPO.checkSubString(arrTd0.get(1), '6', 0, 1);

            browser.actions().mouseMove(arrTd0.get(1)).perform();
            browser.actions().click(protractor.Button.RIGHT).perform();
            var contextMenu =  element(by.css('ul.context-menu-list[style*="z-index: 2"]'));
            var negate = contextMenu.element(by.cssContainingText('span', 'negate'));
            browser.actions().mouseMove(negate).perform();
            negate.click();
            beakerPO.checkSubString(arrTd0.get(1), '-6', 0, 2);

            browser.actions().mouseMove(arrTd0.get(1)).perform();
            browser.actions().click(protractor.Button.RIGHT).perform();
            var run_misc_formatting = contextMenu.element(by.cssContainingText('span', 'run misc_formatting'));
            browser.actions().mouseMove(run_misc_formatting).perform();
            run_misc_formatting.click().then(function(){
                beakerPO.waitUntilLoadingFinished();
            });
        });
        it('Misc formatting', function () {
            var idCell = "code0Xkn1E";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDtContainerByIdCell(idCell);
            var arrTd = getArrayTdElements(idCell, 0);
            expect(arrTd.count()).toBe(4);
            beakerPO.checkSubString(arrTd.get(1), '1', 0, 1);
            expect(arrTd.get(1).getCssValue('color')).toBe('rgba(192, 192, 192, 1)');
            expect(arrTd.get(1).getCssValue('font-size')).toBe('15px');
            expect(arrTd.get(1).getAttribute('title')).toBe('The value is: 1');

            var thHeader = beakerPO.getDataTablesTHeadByIdCell(idCell).get(0).all(by.css('th'));
            expect(thHeader.get(1).getCssValue('vertical-align')).toBe('bottom');
            expect(thHeader.get(1).getCssValue('font-size')).toBe('30px');
        });
        it('Run tags', function () {
            var idCell = "codeYEb1OS";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
            beakerPO.checkDtContainerByIdCell(idCell);
            var arrTd0 = getArrayTdElements(idCell, 0);
            expect(arrTd0.count()).toBe(4);
            beakerPO.checkSubString(arrTd0.get(2), '2', 0, 1);
            browser.actions().doubleClick(arrTd0.get(2)).perform().then(function(){
                beakerPO.waitUntilLoadingFinished();
            });

            idCell = "codeC8S3M3";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Results');
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            beakerPO.checkCellOutputTextByIdCell(idCell, 'You clicked on the cell [0, 1]');
        });
    });
});
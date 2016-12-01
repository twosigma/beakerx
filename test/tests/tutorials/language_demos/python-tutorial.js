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

describe('Python Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fipython-examples.bkr&readOnly=true").then(done);
        browser.driver.manage().window().maximize();

        var start = new Date().getTime();
        beakerPO.waitUntilLoadingFinished().then(function() {
            var stop = new Date().getTime();
            var len = stop - start;
            console.log('Starting IPython language: ' + len + ' milliSeconds');
        });
    });

    afterAll(function(done){
        beakerPO.createScreenshot('pythonTutorial');
        done();
    })

    it('IPython can load', function () {
        var self = this;
        element(by.css('div.modal-body')).isPresent().then(function(present){
            if(present){
                self.createScreenshot('pythonLoad');
                expect(element.all(by.css('div.modal-body > p')).get(0).getText()).toBe('IPython have loaded');
            }
        });
    });

    describe('Autocomplete', function(){
        it('Should hint "infty" ', function() {
            beakerPO.scrollHeaderElement();
            beakerPO.insertNewDefaultCell('IPython');
            browser.actions().sendKeys("in").perform();
            beakerPO.checkAutocomplete('infty');
            browser.sleep(1000);
            beakerPO.selectItem('infty');
        });
    });

    describe('IPython Examples', function(){

        it('should graph a math function', function () {
            var idCell = "codeK0EmdK";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Html', 'pythonGraphMath');
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('simple-layout')).isPresent()).toBe(true);
            beakerPO.checkImageByIdCell(idCell);
        });

        it('should display a table', function () {
            idCell = "codeqPMAfv";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table', 'pythonTable');
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            beakerPO.checkDtContainerByIdCell(idCell);
            expect(beakerPO.getDataTablesTHeadByIdCell(idCell).get(0).all(by.css('th')).count()).toBe(10);

            var tBody = beakerPO.getDataTablesTBodyByIdCell(idCell);
            expect(tBody.count()).toBe(5);
            expect(tBody.get(0).all(by.css('td')).count()).toBe(10);
        });

        it('should display a plot', function () {
            idCell = "codeZxPm5k";
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Html', 'pythonPlot');
            beakerPO.scrollToCodeCellOutputByIdCell(idCell);
            beakerPO.checkImageByIdCell(idCell);
        });

    });
});
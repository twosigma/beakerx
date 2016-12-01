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

describe('Output containers Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Foutput_container_cell.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('outputContainerTutorial');
        done();
    });

    it('new OutputContainer()', function () {
        var idCell = "codeCsEU6N";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
        var liElem = beakerPO.getLiOutputcontainerByIdCell(idCell);
        expect(liElem.get(0).element(by.css('pre')).getText()).toBe('simplest example');
        expect(liElem.get(1).element(by.css('pre')).getText()).toBe('[2,3,5,7]');
    });

    it('Initialise data', function () {
        beakerPO.collapseCellMenuByIdCell("sectionSi2g9h");
        var idCell = "codesfxnTH";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');
        idCell = "codemeYIHG";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('pre')).getText()).toBe('ok');
    });

    it('Hidden Output', function () {
        var idCell = "codetJfc7K";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Hidden');
    });

    function getOutputContainer(liElement, type){
        return liElement.element(by.css('bk-output-display[type="'+ type +'"]'))
    }

    it('Should display stacked layout', function () {
        var idCell = "codeAWzsGO";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('simple-layout')).isPresent()).toBe(true);
        var liElem = beakerPO.getLiOutputcontainerByIdCell(idCell);
        expect(getOutputContainer(liElem.get(0), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(liElem.get(1), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(liElem.get(2), "Table").element(by.css('.dtcontainer')).isPresent()).toBe(true);
    });

    it('Should display tabbed layout', function (){
        var idCell = "codeE22mjD";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('tabbed-output-container-layout')).isPresent()).toBe(true);
        var tabContent = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('div.tab-content bk-code-cell-output'));
        expect(getOutputContainer(tabContent.get(0), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(tabContent.get(1), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(tabContent.get(2), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(tabContent.get(3), "Table").element(by.css('.dtcontainer')).isPresent()).toBe(true);
    });

    it('Should display grid layout', function (){
        var idCell = "codeyKNHIl";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('grid-output-container-layout')).isPresent()).toBe(true);
        var trContent = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('grid-output-container-layout > table > tbody > tr'));
        expect(getOutputContainer(trContent.get(0).all(by.css('td')).get(0), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(trContent.get(0).all(by.css('td')).get(1), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(trContent.get(1).all(by.css('td')).get(0), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(trContent.get(1).all(by.css('td')).get(1), "Table").element(by.css('.dtcontainer')).isPresent()).toBe(true);
    });

    it('Should display dashboard layout', function (){
        var idCell = "codeM1HPqS";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('dashboard-layout')).isPresent()).toBe(true);
        var trContent = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('dashboard-layout > table > tbody > tr'));
        expect(getOutputContainer(trContent.get(0).all(by.css('td')).get(0), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(trContent.get(0).all(by.css('td')).get(1), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(trContent.get(1).all(by.css('td')).get(0), "Table").element(by.css('.dtcontainer')).isPresent()).toBe(true);
    });

    it('Should display cycling layout', function (){
        var idCell = "codei7XKpd";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'OutputContainer');
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('cycling-output-container-layout')).isPresent()).toBe(true);
        var divContent = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('cycling-output-container-layout > div'));
        expect(getOutputContainer(divContent.get(0), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(divContent.get(1), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(divContent.get(2), "Plot").element(by.css('#plotLegendContainer')).isPresent()).toBe(true);
        expect(getOutputContainer(divContent.get(3), "Table").element(by.css('.dtcontainer')).isPresent()).toBe(true);
    });

});
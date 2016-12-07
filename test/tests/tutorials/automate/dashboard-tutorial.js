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

describe('Dashboard API', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fdashboards.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingCellOutput();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('dashboardsTutorial');
        done();
    });

    it('Generate data', function () {
        var idCell = "codeWZqKpe";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text');
    });
    var idCellDash = "code4cQqUL";
    it('Create dashboard', function () {
        beakerPO.scrollToBkCellByIdCell(idCellDash);
        beakerPO.clickCodeCellInputButtonByIdCell(idCellDash, 'BeakerDashboard');
        var row1 = beakerPO.getCodeCellOutputByIdCell(idCellDash).all(by.css('.row')).get(1);
        expect(row1.all(by.css('bk-output-display[type="Plot"]')).count()).toBe(3);
    });
    it('Change dashboard', function () {
        var row0 = beakerPO.getCodeCellOutputByIdCell(idCellDash).$$('.row').first();
        expect(row0.$('bk-output-display[type="Html"]').getText()).toBe('Updating Random Dashboard');
        var idCell = "codeAiNo4j";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.runBkCellDefaultButtonByIdCell(idCell);
        browser.sleep(5000);
        beakerPO.scrollToCodeCellOutputByIdCell(idCellDash);
        expect(row0.$('bk-output-display[type="Html"]').getText()).toBe('this is the changed test');
    });
});
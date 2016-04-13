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

describe('Text, Formatting, and Equations tutorial', function (done) {

    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Ftext.bkr&readOnly=true").then(done);

    it('Text Cell Edit Mode', function () {
        var idCell = "markdown8nMuAN";
        beakerPO.checkBkCellByIdCell(idCell);
        var elemPreviw = beakerPO.getBkCellByIdCell(idCell).element(by.css('div[ng-show="mode==\'preview\'"]'));
        var elemEdit = beakerPO.getBkCellByIdCell(idCell).element(by.css('div[ng-show="mode==\'edit\'"]'));

        expect(elemPreviw.isDisplayed()).toBe(true);
        expect(elemEdit.isDisplayed()).toBe(false);

        beakerPO.getBkCellByIdCell(idCell).click();
        expect(elemPreviw.isDisplayed()).toBe(false);
        expect(elemEdit.isDisplayed()).toBe(true);
    });

});
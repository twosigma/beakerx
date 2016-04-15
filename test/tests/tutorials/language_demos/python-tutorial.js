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

describe('Python Tutorial', function (done) {

    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fipython-examples.bkr&readOnly=true").then(done);

    var start = new Date().getTime();
    beakerPO.waitUntilLoadingFinished().then(function() {
        var stop = new Date().getTime();
        var len = stop - start;
        console.log('Starting IPython language: ' + len + ' milliSeconds');
    });

    it('IPython can load', function () {
        element(by.css('div.modal-body')).isPresent().then(function(present){
            if(present){
                expect(element.all(by.css('div.modal-body > p')).get(0).getText()).toBe('IPython have loaded');
            }
        });
    });

    it('IPython Examples', function () {
        var idCell = "codeK0EmdK";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('simple-layout')).isPresent()).toBe(true);
        beakerPO.checkCellOutputSubTextByIdCell(idCell, '[<matplotlib.lines.Line2D', 0, 25);
        beakerPO.checkImageByIdCell(idCell);

        idCell = "codeqPMAfv";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkDtContainerByIdCell(idCell);
        var arrStrHead = beakerPO.getDataTablesTHeadByIdCell(idCell).get(0).all(by.css('th'));
        expect(arrStrHead.count()).toBe(10);
        beakerPO.checkSubString(arrStrHead.get(0), 'Index', 0, 5);
        beakerPO.checkSubString(arrStrHead.get(1), '3 mo', 0, 4);
        beakerPO.checkSubString(arrStrHead.get(2), '6 mo', 0, 4);
        beakerPO.checkSubString(arrStrHead.get(3), '1 yr', 0, 4);
        beakerPO.checkSubString(arrStrHead.get(4), '2 yr', 0, 4);
        beakerPO.checkSubString(arrStrHead.get(5), '3 yr', 0, 4);
        beakerPO.checkSubString(arrStrHead.get(6), '5 yr', 0, 4);
        beakerPO.checkSubString(arrStrHead.get(7), '7 yr', 0, 4);
        beakerPO.checkSubString(arrStrHead.get(8), '10 yr', 0, 5);
        beakerPO.checkSubString(arrStrHead.get(9), '30 yr', 0, 5);

        var tBody = beakerPO.getDataTablesTBodyByIdCell(idCell);
        expect(tBody.count()).toBe(5);
        var arrStr = tBody.get(0).all(by.css('td'));
        expect(arrStr.count()).toBe(10);
        beakerPO.checkSubString(arrStr.get(0), '19900130', 0, 8);
        beakerPO.checkSubString(arrStr.get(1), '7.898', 0, 5);
        beakerPO.checkSubString(arrStr.get(2), '7.956', 0, 5);
        beakerPO.checkSubString(arrStr.get(3), '7.921', 0, 5);
        beakerPO.checkSubString(arrStr.get(4), '8.085', 0, 5);
        beakerPO.checkSubString(arrStr.get(5), '8.132', 0, 5);
        beakerPO.checkSubString(arrStr.get(6), '8.119', 0, 5);
        beakerPO.checkSubString(arrStr.get(7), '8.196', 0, 5);
        beakerPO.checkSubString(arrStr.get(8), '8.206', 0, 5);
        beakerPO.checkSubString(arrStr.get(9), '8.258', 0, 5);

        idCell = "codeZxPm5k";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);
        beakerPO.checkImageByIdCell(idCell);
    });


});
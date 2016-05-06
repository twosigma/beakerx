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

describe('Spark with Scala Tutorial', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fscala-spark.bkr&readOnly=true").then(done);
    });

    it('Scala can load', function(){
        beakerPO.notebookMenu.click();
        beakerPO.languageManagerMenuItem.click();
        element(by.css('li[heading="Scala"] > div')).click();
        var activePane = element(by.css('div.tab-pane.active'));
        var langOptElem = activePane.element(by.cssContainingText('div.language-option', 'Class path'));
        expect(langOptElem.element(by.css('button')).getText()).toBe('Set');
    });

    it('SparkContext', function () {
        var idCell = "codeWDegFP";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text', 'SparkTutorialSparkContext');
        beakerPO.checkCellOutputSubTextByIdCell(idCell, 'org.apache.spark.SparkContext', 0, 29);
    });

});
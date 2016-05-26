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

    afterAll(function(done){
        beakerPO.createScreenshot('sparkScalaTutorial');
        done();
    });

    function getUserHome() {
        return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    }

    it('SparkContext', function () {
        beakerPO.notebookMenu.click();
        beakerPO.languageManagerMenuItem.click();
        element(by.css('li[heading="Scala"] > div')).click();
        var langOptElem = element(by.css('div.tab-pane.active')).element(by.cssContainingText('div.language-option', 'Class path'));
        browser.executeScript('arguments[0].scrollIntoView();', langOptElem.getWebElement());

        var textAreaElem = langOptElem.element(by.css('textarea'));
        textAreaElem.clear();
        var jarPath = path.join(getUserHome() ,"libs/spark-assembly-1.5.0-hadoop2.4.0.jar");
        textAreaElem.sendKeys(jarPath);
        langOptElem.element(by.css('button')).click();
        browser.wait(beakerPO.EC.presenceOf($('div.navbar-text.loadingmsg.ng-hide')), 30000).then(function(){
            element(by.css('div.navbar-text.loadingmsg')).getInnerHtml().then(function(value){
                expect(value.indexOf('Starting Scala... done')).not.toBe(-1);
            });
        });
        beakerPO.languageManagerCloseButton.click();

        var idCell = "codeWDegFP";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text', 'sparkScalaTutorialContext', 45000);
        beakerPO.getCodeCellOutputByIdCell(idCell).element(By.css('pre')).getText()
            .then(function(value){
                expect(value.indexOf('sc: org.apache.spark.SparkContext = org.apache.spark.SparkContext')).not.toBe(-1);
            });
    });

    it('Approximate Pi', function () {
        var idCell = "codefgeZRo";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Text', 'sparkScalaTutorialPi');
        beakerPO.checkCellOutputSubTextByIdCell(idCell, 'Pi is roughly 3.14', 0, 18);
    });
});

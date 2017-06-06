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

var BeakerPageObject = require('./beaker.po.js');
var beakerPO;

describe('plotDemo', function() {
    beforeEach(function(done) {
        //browser.driver.waitForAngularEnabled(false);
        browser.driver.ignoreSynchronization = true;
        beakerPO = new BeakerPageObject();
        browser.driver.get(beakerPO.baseURL);
        var e = browser.driver.findElement(by.css('#password_input'));
        e.sendKeys('beakerx');
        browser.driver.findElement(by.css('#login_submit')).click();
        browser.driver.sleep(3000);
        done();
    });

    it('can run Groovy cell', function(done) {
        browser.driver.findElement(By.linkText('plotDemo.ipynb')).click();
        browser.driver.sleep(1000);
        browser.driver.getAllWindowHandles().then(function(handles){
            browser.driver.switchTo().window(handles[1]).then(function(){
                browser.driver.wait(function() {
                    return browser.driver.findElement(By.css('i.kernel_idle_icon'))
                        .then(function() { return true; }, function() { return false; });
                }, 10000).then(done);
                browser.driver.findElement(By.css('div.code_cell')).click();
                browser.driver.findElement(By.css('button[data-jupyter-action="jupyter-notebook:run-cell-and-select-next"]')).click();
                browser.driver.wait(function() {
                    return browser.driver.findElement(By.css('i.kernel_idle_icon'))
                        .then(function() { return true; }, function() { return false; });
                }, 10000).then(done);
                browser.driver.sleep(1000);
            });
        });
        done();
    });

});
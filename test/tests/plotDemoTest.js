/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

    beforeAll(function(done) {
        browser.driver.ignoreSynchronization = true;
        beakerPO = new BeakerPageObject();
        browser.driver.get(beakerPO.baseURL);
        beakerPO.loginJupyter();
        browser.driver.findElement(By.linkText('plotDemo.ipynb')).click();
        browser.driver.sleep(1000);
        browser.driver.getAllWindowHandles().then(function(handles){
            browser.driver.switchTo().window(handles[1]);
        });
        done();
    });

    it('can run Groovy cell', function(done) {
        beakerPO.waitKernelIdleIcon();
        browser.driver.findElement(By.css('div.code_cell')).click();
        beakerPO.clickRunCell();
        beakerPO.waitKernelIdleIcon();
        done();
    });

});
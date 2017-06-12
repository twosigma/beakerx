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

var BeakerXPageObject = function() {

    this.baseURL = 'http://127.0.0.1:8888/tree/demoFiles';

    this.loginJupyter = function(){
        browser.setValue('#password_input', 'beakerx');
        browser.click('#login_submit');
        browser.waitForEnabled('=plotDemo.ipynb', 30000);
    }

    this.clickRunCell = function(){
        var cssRunCell = 'button[data-jupyter-action="jupyter-notebook:run-cell-and-select-next"]';
        browser.waitForEnabled(cssRunCell, 30000);
        browser.click(cssRunCell);
        browser.waitForEnabled('i.kernel_idle_icon', 30000);
    }

};
module.exports = BeakerXPageObject;

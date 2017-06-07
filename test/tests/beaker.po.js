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

var BeakerPageObject = function() {

  this.baseURL = 'http://127.0.0.1:8888/tree/demoFiles';

  this.loginJupyter = function(){
    browser.driver.findElement(by.css('#password_input')).sendKeys('beakerx');
    browser.driver.findElement(by.css('#login_submit')).click();
    browser.driver.sleep(3000);
  }

  this.waitElementByCss = function(selector, timeOut){
    if(!timeOut){
      timeOut = 60000;
    }
    browser.driver.wait(function() {
        return browser.driver.findElement(By.css(selector))
            .then(function() { return true; }, function() { return false; });
    }, timeOut);
  }

  this.waitKernelIdleIcon = function(timeOut){
    if(!timeOut){
      timeOut = 60000;
    }
    this.waitElementByCss('i.kernel_idle_icon', timeOut);
  }

  this.clickRunCell = function(){
    var self = this;
    this.waitKernelIdleIcon();
    browser.driver.findElement(By.css('button[data-jupyter-action="jupyter-notebook:run-cell-and-select-next"]')).click();
  }

};
module.exports = BeakerPageObject;

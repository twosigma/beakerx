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

var NotebookPageObject = function () {

  this.kernelIdleIcon = $('i.kernel_idle_icon');
  this.outputResultCss = 'div.output_subarea.output_text.output_result';
  this.outputStderrCss = 'div.output_subarea.output_text.output_stderr';
  this.outputStdoutCss = 'div.output_subarea.output_text.output_stdout';
  this.allOutputTextCss = 'div.output_subarea.output_text';

  this.runNotebookByUrl = function(url){
    console.log('----------notebook')
    browser.url('http://127.0.0.1:8888/notebooks' + url);
    this.kernelIdleIcon.waitForEnabled();
  };

  this.closeAndHaltNotebook = function () {
    this.clickCellAllOutputClear();
    browser.click('=File');
    browser.waitForEnabled('=Close and Halt');
    browser.click('=Close and Halt');
    browser.endAll();
  };

  this.clickCellAllOutputClear = function () {
    browser.click('=Cell');
    browser.waitForEnabled('=All Output');
    browser.moveToObject('=All Output');
    browser.moveToObject('=Toggle');
    browser.moveToObject('=Clear');
    browser.click('=Clear')
  };

};
module.exports = NotebookPageObject;

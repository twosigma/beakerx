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

  this.runNotebookByUrl = function (url) {
    console.log('jupyter notebook application')
    browser.url('http://127.0.0.1:8888/notebooks' + url);
    this.kernelIdleIcon.waitForEnabled();
  };

  this.clickSaveNotebook = function () {
    browser.click('button[data-jupyter-action="jupyter-notebook:save-notebook"]');
  };

  this.closeAndHaltNotebook = function () {
    this.clickCellAllOutputClear();
    browser.click('=File');
    browser.waitForEnabled('=Close and Halt');
    browser.click('=Close and Halt');
    browser.endAll();
  };

  this.saveAndCloseNotebook = function () {
    this.clickCellAllOutputClear();
    this.clickSaveNotebook();
    browser.waitUntil(function () {
      var autosaveStatus = $('span.autosave_status').getText();

      return autosaveStatus === '(autosaved)';
    }, 4000);
    browser.click('=File');
    browser.waitForEnabled('=Close and Halt');
    browser.click('=Close and Halt');
  };

  this.clickCellAllOutputClear = function () {
    browser.click('=Cell');
    browser.waitForEnabled('=All Output');
    browser.moveToObject('=All Output');
    browser.moveToObject('=Toggle');
    browser.moveToObject('=Clear');
    browser.click('=Clear')
  };

  this.getCodeCellByIndex = function (index) {
    return $$('div.code_cell')[index];
  };

  this.clickRunCell = function () {
    var buttonRunCell = browser.$('button[data-jupyter-action="jupyter-notebook:run-cell-and-select-next"]');
    buttonRunCell.waitForEnabled();
    buttonRunCell.click();
    this.kernelIdleIcon.waitForEnabled();
  };

  this.clickRunCellWithoutWaiting = function () {
    browser.$('button[data-jupyter-action="jupyter-notebook:run-cell-and-select-next"]').click();
  };

  this.clickRunAllCells = function () {
    browser.click('=Cell');
    browser.waitForEnabled('=Run All');
    browser.click('=Run All')
  };

  this.clickDialogPublishButton = function () {
    browser.$('button.btn.btn-default.btn-sm.btn-primary').click();
  };

  this.clickInterruptKernel = function () {
    browser.$('button[data-jupyter-action="jupyter-notebook:interrupt-kernel"]').click();
  };

  this.getAllOutputAreaChildren = function (codeCell) {
    return codeCell.$$('div.output_area');
  };

  this.getAllOutputsExecuteResult = function (codeCell) {
    return codeCell.$$('div.output_subarea.output_result');
  };

  this.getAllOutputsStdout = function (codeCell) {
    return codeCell.$$('div.output_subarea.output_stdout');
  };

  this.getAllOutputsStderr = function (codeCell) {
    return codeCell.$$('div.output_subarea.output_error');
  };

  this.getAllOutputsWidget = function (codeCell) {
    return codeCell.$$('div.output_subarea.jupyter-widgets-view');
  };

  this.getAllOutputsHtmlType = function (codeCell) {
    return codeCell.$$('div.output_subarea.output_html');
  };

  this.callAutocompleteAndGetItsList = function (codeCell, codeStr) {
    codeCell.scroll();
    codeCell.click('div.CodeMirror-code[role="presentation"]');
    codeCell.keys(codeStr);
    browser.keys("Tab");
    browser.keys('\uE000');
    browser.waitUntil(function () {
      return browser.isVisible('#complete');
    }, 10000, 'autocomplete list is not visible');
    return $$('#complete > select > option');
  };

  this.callDocAndGetItsTooltip = function (codeCell, codeStr) {
    codeCell.scroll();
    codeCell.click('div.CodeMirror-code[role="presentation"]');
    codeCell.keys(codeStr);
    browser.keys('Shift');
    browser.keys('Tab');
    browser.keys('\uE000');
    browser.waitUntil(function () {
      return browser.isVisible('#tooltip');
    }, 10000, 'doc tooltip is not visible');
    return $('div#tooltip div.tooltiptext.smalltooltip');
  };

  this.openUIWindow = function(){
    browser.newWindow('http://127.0.0.1:8888/tree');
    browser.pause(1000);
    browser.window(browser.windowHandles().value[0]);
  };

  this.setJVMProperties = function (heapSize, key, value, url) {
    this.openUIWindow();
    browser.window(browser.windowHandles().value[1]);
    browser.pause(1000);
    browser.waitForEnabled('a#beakerx_tab');
    browser.click('a#beakerx_tab');
    browser.$$('li.p-TabBar-tab')[0].click();

    browser.$('input#heap_GB').waitForEnabled();
    this.setHeapSize(heapSize);
    if(key == null){
      this.removeProperty();
    }
    else {
      this.addPropertyPair();
      this.setProperty(key, value);
    }

    browser.pause(2000);
    browser.window();
    browser.window(browser.windowHandles().value[0]);
  }

};
module.exports = NotebookPageObject;

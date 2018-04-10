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

  this.runJupyterRoot = function () {
    browser.url('http://127.0.0.1:8888/tree/');
    browser.pause(2000);
    $$('ul#tabs > li')[3].waitForEnabled();
  };

  this.goToJVMOptions = function () {
    $$('ul#tabs > li')[3].click();
    $('ul.p-TabBar-content').waitForEnabled();
  }

  this.setHeapSize = function (value) {
    var heapSizeInput = $('input#heap_GB');
    var heapSizeResult = $('span.result-text');

    heapSizeInput.setValue(value);
    heapSizeResult.waitForExist();
    browser.pause(2500);
  };

  this.getPropertyFormGroupByIndex = function (index) {
    var formGroups = $$('div.form-inline');
    return formGroups[index];
  };

  this.addPropertyPair = function () {
    var addPropertyButton = $('button#add_property_jvm_sett');
    addPropertyButton.click();
  };

  this.removeProperty = function () {
    var deleteButton = $('button > i.fa-times');
    deleteButton.click();
    browser.pause(2000);
  }

  this.setProperty = function (key, value) {
    $('div.form-group > input[placeholder="name"]').setValue(key);
    $('div.form-group > input[placeholder="value"]').setValue(value);
    browser.pause(2000);
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

  this.getCodeCellByIndex = function (index) {
    return $$('div.code_cell')[index];
  };

  this.clickRunCell = function () {
    var buttonRunCell = browser.$('button[data-jupyter-action="jupyter-notebook:run-cell-and-select-next"]');
    buttonRunCell.waitForEnabled();
    buttonRunCell.click();
    this.kernelIdleIcon.waitForEnabled();
  };

  this.clickRunAllCells = function () {
    browser.click('=Cell');
    browser.waitForEnabled('=Run All');
    browser.click('=Run All')
  };

  this.clickDialogPublishButton = function () {
    browser.$('button.btn.btn-default.btn-sm.btn-primary').click();
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
    browser.window(browser.windowHandles().value[0]);
  };

  this.setDataGridForTable = function(isDataGrid, closeUIWindow){
    browser.window(browser.windowHandles().value[1]);
    browser.waitForEnabled('a#beakerx_tab');
    browser.click('a#beakerx_tab');
    browser.$$('li.p-TabBar-tab')[1].click();
    var checkBox = browser.$('input#use_data_grid');
    if(checkBox.isSelected() ? !isDataGrid : isDataGrid){
      browser.click('input#use_data_grid');
    }
    if(closeUIWindow){
      browser.window();
    }
    browser.window(browser.windowHandles().value[0]);
  };


};
module.exports = NotebookPageObject;

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

  this.kernelIdleIcon = browser.$('i.kernel_idle_icon');

  this.runNotebookByUrl = function (url) {
    console.log('jupyter notebook application')
    browser.url('http://127.0.0.1:8888/notebooks' + url);
    this.kernelIdleIcon.waitForEnabled();
    this.increaseWindowWidth(200);
  };

  this.increaseWindowWidth = function (addWidth) {
    var curSize = browser.getWindowSize();
    browser.setWindowSize(curSize.width + addWidth, curSize.height);
  };

  this.clickSaveNotebook = function () {
    browser.$('button[data-jupyter-action="jupyter-notebook:save-notebook"]').click();
  };

  this.closeAndHaltNotebook = function () {
    this.clickCellAllOutputClear();
    browser.$('=File').click();
    browser.$('=Close and Halt').waitForEnabled();
    browser.$('=Close and Halt').click();
  };

  this.saveAndCloseNotebook = function () {
    this.clickCellAllOutputClear();
    this.clickSaveNotebook();
    browser.waitUntil(function () {
      var autosaveStatus = $('span.autosave_status').getText();
      return autosaveStatus === '(autosaved)';
    }, 4000);
    browser.$('=File').click();
    browser.$('=Close and Halt').waitForEnabled();
    browser.$('=Close and Halt').click();
  };

  this.clickCellAllOutputClear = function () {
    browser.$('=Cell').click();
    browser.$('=All Output').waitForEnabled();
    browser.$('=All Output').moveTo();
    browser.$('=Toggle').moveTo();
    browser.$('=Clear').moveTo();
    browser.$('=Clear').click();
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
    browser.$('=Cell').click();
    browser.$('=Run All').waitForEnabled();
    browser.$('=Run All').click()
  };

  this.clickDialogPublishButton = function () {
    browser.$('button.btn.btn-default.btn-sm.btn-primary').click();
  };

  this.clickInterruptKernel = function () {
    browser.$('button[data-jupyter-action="jupyter-notebook:interrupt-kernel"]').click();
  };

  this.getAllOutputAreaChildren = function (codeCell, isWait) {
    if(isWait){
      browser.waitUntil(function () {
        return (codeCell.$$('div.output_area').length > 0);
      });
    }
    return codeCell.$$('div.output_area');
  };

  this.getAllOutputsExecuteResult = function (codeCell) {
    browser.waitUntil(function () {
      return codeCell.$$('div.output_subarea.output_result').length > 0;
    });
    browser.pause(500);
    return codeCell.$$('div.output_subarea.output_result');
  };

  this.getAllOutputsStdout = function (codeCell) {
    browser.waitUntil(function () {
      return codeCell.$$('div.output_subarea.output_stdout').length > 0;
    });
    browser.pause(500);
    return codeCell.$$('div.output_subarea.output_stdout');
  };

  this.getAllOutputsStderr = function (codeCell) {
    browser.waitUntil(function(){
      return codeCell.$$('div.output_subarea.output_error').length > 0;
    });
    browser.pause(500);
    return codeCell.$$('div.output_subarea.output_error');
  };

  this.getAllOutputsWidget = function (codeCell) {
    browser.waitUntil(function () {
      return (codeCell.$$('div.output_subarea.jupyter-widgets-view').length > 0);
    });
    return codeCell.$$('div.output_subarea.jupyter-widgets-view');
  };

  this.getAllOutputsHtmlType = function (codeCell) {
    browser.waitUntil(function () {
      return codeCell.$$('div.output_subarea.output_html').length > 0;
    });
    browser.pause(1000);
    return codeCell.$$('div.output_subarea.output_html');
  };

  this.callAutocompleteAndGetItsList = function (codeCell, codeStr) {
    codeCell.scrollIntoView();
    codeCell.$('div.CodeMirror-code[role="presentation"]').click();
    browser.keys(codeStr);
    browser.keys("Tab");
    browser.keys('\uE000');
    browser.waitUntil(function () {
      return browser.$('#complete').isDisplayed();
    }, 10000, 'autocomplete list is not visible');
    return $$('#complete > select > option');
  };

  this.callDocAndGetItsTooltip = function (codeCell, codeStr) {
    codeCell.scrollIntoView();
    codeCell.$('div.CodeMirror-code[role="presentation"]').click();
    browser.keys(codeStr);
    browser.keys(["Shift", "Tab"]);
    browser.keys('\uE000');
    browser.waitUntil(function () {
      return browser.$('#tooltip').isDisplayed();
    }, 10000, 'doc tooltip is not visible');
    return $('div#tooltip div.tooltiptext.smalltooltip');
  };

  this.openUIWindow = function(){
    browser.newWindow('http://127.0.0.1:8888/tree');
    browser.newWindow('http://127.0.0.1:8888/tree');
    browser.pause(1000);
    browser.switchWindow('http://127.0.0.1:8888/tree');
  };

  this.setJVMProperties = function (heapSize, key, value, url) {
    this.openUIWindow();
    browser.$('a#beakerx_tab').waitForEnabled();
    browser.$('a#beakerx_tab').click();
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
  }

};
module.exports = NotebookPageObject;

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

var BeakerXPageObject = function () {

  this.baseDocURL = 'http://127.0.0.1:8888/tree/doc/contents';
  this.baseTestURL = 'http://127.0.0.1:8888/tree/test/notebooks';
  this.kernelIdleIcon = $('i.kernel_idle_icon');

  this.loginJupyter = function () {
    browser.waitForEnabled('#password_input');
    browser.setValue('#password_input', 'beakerx');
    browser.click('#login_submit');
  }

  this.runNotebookByName = function(name, done, subDir){
    browser
      .url(subDir === undefined ? this.baseDocURL : this.baseDocURL + '/' + subDir)
      .call(done);
    this.loginJupyter();
    browser.waitForEnabled('=' + name);
    browser.click('=' + name);
    browser.window(browser.windowHandles().value[1]);
  }

  this.runNotebookByUrl = function(url){
    browser.url('http://127.0.0.1:8888' + url);
    this.loginJupyter();
    this.kernelIdleIcon.waitForEnabled();
  }

  this.clickRunCell = function () {
    var cssRunCell = 'button[data-jupyter-action="jupyter-notebook:run-cell-and-select-next"]';
    browser.waitForEnabled(cssRunCell);
    browser.click(cssRunCell);
    this.kernelIdleIcon.waitForEnabled();
  }

  this.clickSaveNotebook = function () {
    browser.click('button[data-jupyter-action="jupyter-notebook:save-notebook"]');
  }

  this.closeAndHaltNotebook = function () {
    this.clickSaveNotebook();
    browser.click('=File');
    browser.waitForVisible('=Close and Halt');
    browser.click('=Close and Halt');
    browser.endAll();
  }

  this.getCodeCellByIndex = function (index) {
    return $$('div.code_cell')[index];
  }

  this.runCodeCellByIndex = function (index) {
    var codeCell = this.getCodeCellByIndex(index);
    codeCell.scroll();
    codeCell.click();
    this.clickRunCell();
    return codeCell;
  }

  this.runCellToGetDtContainer = function(index){
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.dtcontainer');
  }

  this.runCellToGetSvgElement = function(index){
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('#svgg');
  }

  this.runCallAndCheckOutputText = function(index, expectedText){
    var codeCell = this.runCodeCellByIndex(index);
    var outputText = codeCell.$('.output_subarea.output_text');
    outputText.waitForExist();
    outputText.waitForEnabled();
    expect(outputText.getText()).toMatch(expectedText);
  }

  this.plotLegendContainerIsEnabled = function(dtcontainer){
    var plotLegendContainer = dtcontainer.$('#plotLegendContainer');
    plotLegendContainer.waitForEnabled();
  }

  this.dataTablesIsEnabled = function(dtcontainer){
    var dataTables = dtcontainer.$('.dataTables_scroll');
    dataTables.waitForEnabled();
  }

  this.runCellToGetWidgetElement = function(index){
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.jupyter-widgets');
  }

  this.runCellToGetEasyForm = function(index){
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.beaker-easyform-container');
  }

};
module.exports = BeakerXPageObject;

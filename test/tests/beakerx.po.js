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
  this.outputResultCss = 'div.output_subarea.output_text.output_result';
  this.outputStderrCss = 'div.output_subarea.output_text.output_stderr';
  this.outputStdoutCss = 'div.output_subarea.output_text.output_stdout';
  this.allOutputTextCss = 'div.output_subarea.output_text';

  this.runNotebookByName = function(name, done, subDir){
    browser
      .url(subDir === undefined ? this.baseDocURL : this.baseDocURL + '/' + subDir)
      .call(done);
    browser.waitForEnabled('=' + name);
    browser.click('=' + name);
    browser.window(browser.windowHandles().value[1]);
  };

  this.runNotebookByUrl = function(url){
    browser.url('http://127.0.0.1:8888' + url);
    this.kernelIdleIcon.waitForEnabled();
  };

  this.clickRunCell = function () {
    var cssRunCell = 'button[data-jupyter-action="jupyter-notebook:run-cell-and-select-next"]';
    browser.waitForEnabled(cssRunCell);
    browser.click(cssRunCell);
    this.kernelIdleIcon.waitForEnabled();
  };

  this.clickSaveNotebook = function () {
    browser.click('button[data-jupyter-action="jupyter-notebook:save-notebook"]');
  };

  this.clickCellAllOutputClear = function () {
    browser.click('=Cell');
    browser.waitForEnabled('=All Output');
    browser.moveToObject('=All Output');
    browser.moveToObject('=Toggle');
    browser.moveToObject('=Clear');
    browser.click('=Clear')
  };

  this.clickPublish = function(){
    browser.$('button[title="Publish..."]').click();
  };

  this.publishAndOpenNbviewerWindow = function() {
    this.clickPublish();
    browser.pause(1000);
    browser.$('button.btn.btn-default.btn-sm.btn-primary').click();
    browser.waitUntil(function () {
      var windowHandles = browser.windowHandles();
      return windowHandles.value.length === 2;
    }, 60000, 'expected browser.windowHandles().length === 2');
    browser.pause(1000);
    browser.window(browser.windowHandles().value[1]);
    console.log(browser.getUrl());
  };

  this.closeAndHaltNotebook = function () {
    this.clickCellAllOutputClear();
    browser.click('=File');
    browser.waitForEnabled('=Close and Halt');
    browser.click('=Close and Halt');
    browser.endAll();
  };

  this.clickCellRunAll = function () {
    browser.click('=Cell');
    browser.waitForEnabled('=Run All');
    browser.click('=Run All')
  };

  this.getCodeCellByIndex = function (index) {
    return $$('div.code_cell')[index];
  };

  this.getDtContainerByIndex = function (index) {
    return this.getCodeCellByIndex(index).$('div.dtcontainer');
  };

  this.getSvgElementByIndex = function (index) {
    var codeCell = this.getCodeCellByIndex(index);
    codeCell.scroll();
    codeCell.click();
    return codeCell.$('#svgg');
  };

  this.runCodeCellByIndex = function (index) {
    var codeCell = this.getCodeCellByIndex(index);
    codeCell.scroll();
    codeCell.click();
    this.clickRunCell();
    this.kernelIdleIcon.waitForEnabled();
    return codeCell;
  };

  this.runCellToGetDtContainer = function(index){
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.dtcontainer');
  };

  this.runCellToGetDtContainers = function(index){
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$$('div.dtcontainer');
  };

  this.runCellToGetSvgElement = function(index){
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('#svgg');
  };

  this.runCellAndCheckOutputText = function(index, expectedText){
    var resultTest;
    try{
      resultTest = this.runCellToGetOutputTextElement(index).getText();
    }catch(e){
      console.log(expectedText + ' --- ' + e.toString());
      resultTest = this.runCellToGetOutputTextElement(index).getText();
    }
    expect(resultTest).toMatch(expectedText);
  };

  this.runCellToGetOutputTextElement = function(index){
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$(this.allOutputTextCss);
  };

  this.plotLegendContainerIsEnabled = function(dtcontainer){
    var plotLegendContainer = dtcontainer.$('#plotLegendContainer');
    plotLegendContainer.waitForEnabled();
  };

  this.runCellToGetWidgetElement = function(index){
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.jupyter-widgets');
  };

  this.runCellToGetEasyForm = function(index){
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.beaker-easyform-container');
  };

  this.runCellToGetTableElement = function(index){
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.dataTables_scrollBody');
  };

  this.checkCellOutputText = function(index, expectedText){
    var codeCell = this.getCodeCellByIndex(index);
    codeCell.scroll();
    var resultTest;
    try{
      resultTest = codeCell.$(this.allOutputTextCss).getText();
    }catch(e){
      console.log(expectedText + ' --- ' + e.toString());
      resultTest = this.runCellToGetOutputTextElement(index).getText();
    }
    expect(resultTest).toMatch(expectedText);
  };

  this.getTabLabel = function(tabIndex) {
    var tab = $$("div.p-TabBar-tabLabel")[tabIndex];
    return tab;
  };

  this.switchTab = function(tabIndex) {
    var tab = this.getTabLabel(tabIndex);
    return tab.click();
  }
  this.waitAndCheckCellOutputStderrText = function(index, expectedText){
    this.waitAndCheckCellOutputText(index, expectedText, this.outputStderrCss);
  };

  this.waitAndCheckCellOutputStdoutText = function(index, expectedText){
    this.waitAndCheckCellOutputText(index, expectedText, this.outputStdoutCss);
  };

  this.waitAndCheckCellOutputResultText = function(index, expectedText){
    this.waitAndCheckCellOutputText(index, expectedText, this.outputResultCss);
  };

  this.waitAndCheckCellOutputText = function(index, expectedText, selector){
    var codeCell = this.getCodeCellByIndex(index);
    codeCell.scroll();
    browser.waitUntil(function () {
      var output = codeCell.$(selector);
      return output.isEnabled() && expectedText.test(output.getText());
    }, 50000, 'expected output toMatch ' + expectedText);
  };

  this.getTableColumnLabel = function(tableIndex, columnIndex){
    var table = $$("div.dataTables_scrollHead") [tableIndex];
    var tableColumnLabels = table.$$("span.header-text");
    return tableColumnLabels[columnIndex];
  };

  this.getTableCell = function(tableIndex, rowIndex, columnIndex){
    var table = $$("div.dataTables_scrollBody") [tableIndex];
    var tableRows = table.$$("tbody tr");
    var rowCells = tableRows[rowIndex].$$("td");
  return rowCells[columnIndex];
  };

};
module.exports = BeakerXPageObject;

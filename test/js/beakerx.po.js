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

var NotebookPageObject = require('./notebook.po.js').prototype;
var LabPageObject = require('./lab.po.js').prototype;

var env = require('../tmp.config.js');

function BeakerXPageObject() {
  if ('lab' == env.config.cur_app) {
    LabPageObject.constructor.apply(this, arguments);
    BeakerXPageObject.prototype = Object.create(LabPageObject);
  }
  else if ('notebook' == env.config.cur_app) {
    NotebookPageObject.constructor.apply(this, arguments);
    BeakerXPageObject.prototype = Object.create(NotebookPageObject);
  }

  this.clickSaveNotebook = function () {
    browser.click('button[data-jupyter-action="jupyter-notebook:save-notebook"]');
  };

  this.clickPublish = function () {
    browser.$('button[title="Publish..."]').click();
  };

  this.publishAndOpenNbviewerWindow = function () {
    this.clickPublish();
    browser.pause(1000);
    this.clickDialogPublishButton();
    browser.waitUntil(function () {
      var windowHandles = browser.windowHandles();
      return windowHandles.value.length === 2;
    }, 60000, 'expected browser.windowHandles().length === 2');
    browser.pause(1000);
    browser.window(browser.windowHandles().value[1]);
    console.log(browser.getUrl());
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

  this.runCellToGetDtContainer = function (index) {
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.dtcontainer');
  };

  this.runCellToGetSvgElement = function (index) {
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('#svgg');
  };

  this.runCellToGetSvgElements = function (index) {
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$$('#svgg');
  };

  this.runAndCheckOutputTextOfExecuteResult = function (cellIndex, expectedText) {
    this.runCellAndCheckTextHandleError(cellIndex, expectedText, this.getAllOutputsExecuteResult);
  };

  this.runAndCheckOutputTextOfStdout = function (cellIndex, expectedText) {
    this.runCellAndCheckTextHandleError(cellIndex, expectedText, this.getAllOutputsStdout);
  };

  this.runAndCheckOutputTextOfStderr = function (cellIndex, expectedText) {
    this.runCellAndCheckTextHandleError(cellIndex, expectedText, this.getAllOutputsStderr);
  };

  this.runCellAndCheckTextHandleError = function(cellIndex, expectedText, getTextElements){
    var resultTest;
    var codeCell;
    var attempt = 3;
    while(attempt > 0){
      try {
        codeCell = this.runCodeCellByIndex(cellIndex);
        this.kernelIdleIcon.waitForEnabled();
        resultTest = getTextElements(codeCell)[0].getText();
        attempt = 0;
      } catch (e) {
        attempt -= 1;
      }
    }
    expect(resultTest).toMatch(expectedText);
  };

  this.waitAndCheckOutputTextOfExecuteResult = function (cellIndex, expectedText, outputIndex) {
    this.waitAndCheckOutputText(cellIndex, expectedText, this.getAllOutputsExecuteResult, outputIndex);
  };

  this.waitAndCheckOutputTextOfStdout = function (cellIndex, expectedText, outputIndex) {
    this.waitAndCheckOutputText(cellIndex, expectedText, this.getAllOutputsStdout, outputIndex);
  };

  this.waitAndCheckOutputTextOfStderr = function (cellIndex, expectedText, outputIndex) {
    this.waitAndCheckOutputText(cellIndex, expectedText, this.getAllOutputsStderr, outputIndex);
  };

  this.waitAndCheckOutputText = function (index, expectedText, getTextElements, outputIndex) {
    if(!outputIndex){
      outputIndex = 0;
    }
    var codeCell = this.getCodeCellByIndex(index);
    codeCell.scroll();
    browser.waitUntil(function () {
      var output = getTextElements(codeCell)[outputIndex];
      return output.isEnabled() && expectedText.test(output.getText());
    }, 50000, 'expected output toMatch ' + expectedText);
  };

  this.plotLegendContainerIsEnabled = function (dtcontainer) {
    var plotLegendContainer = dtcontainer.$('#plotLegendContainer');
    plotLegendContainer.waitForEnabled();
  };

  this.runCellToGetWidgetElement = function (index) {
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.jupyter-widgets');
  };

  this.runCellToGetEasyForm = function (index) {
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.beaker-easyform-container');
  };

};

module.exports = BeakerXPageObject;

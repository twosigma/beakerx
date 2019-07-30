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
var path = require('path');
var fs = require('fs');
var resemble = require("resemblejs");

function BeakerXPageObject() {
  if ('lab' == env.config.cur_app) {
    LabPageObject.constructor.apply(this, arguments);
    BeakerXPageObject.prototype = Object.create(LabPageObject);
  } else if ('notebook' == env.config.cur_app) {
    NotebookPageObject.constructor.apply(this, arguments);
    BeakerXPageObject.prototype = Object.create(NotebookPageObject);
  }

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
    codeCell.scrollIntoView();
    codeCell.click();
    return codeCell.$('#svgg');
  };

  this.getSvgElementsByIndex = function (index) {
    var codeCell = this.getCodeCellByIndex(index);
    codeCell.scrollIntoView();
    return codeCell.$$('#svgg');
  };

  this.getTableDisplayByIndex = function (index) {
    return this.getCodeCellByIndex(index).$('div.beaker-table-display');
  };

  this.getDataGridCssPropertyByIndex = function (index, cssProperty) {
    var tblDisplay = this.getTableDisplayByIndex(index);
    return tblDisplay.$('div.p-DataGrid-viewport').getCSSProperty(cssProperty).value;
  };

  this.runCodeCellByIndex = function (index) {
    var codeCell = this.getCodeCellByIndex(index);
    codeCell.scrollIntoView();
    codeCell.click();
    this.clickRunCell();
    this.kernelIdleIcon.waitForEnabled(120000);
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

  this.runCellToGetCanvas = function (index) {
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    browser.waitUntil(function () {
      return codeCell.$$('canvas').length > 0;
    });
    return codeCell.$('canvas');
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

  this.runAndCheckOutputTextOfWidget = function (cellIndex, expectedText) {
    this.runCellAndCheckTextHandleError(cellIndex, expectedText, this.getAllOutputsWidget);
  };

  this.runCellAndCheckTextHandleError = function (cellIndex, expectedText, getTextElements) {
    var resultTest;
    var codeCell;
    var attempt = 3;
    while (attempt > 0) {
      try {
        codeCell = this.runCodeCellByIndex(cellIndex);
        this.kernelIdleIcon.waitForEnabled();
        browser.pause(1000);
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

  this.waitAndCheckOutputTextOfWidget = function (cellIndex, expectedText, outputIndex) {
    this.waitAndCheckOutputText(cellIndex, expectedText, this.getAllOutputsWidget, outputIndex);
  };

  this.waitAndCheckOutputTextOfHtmlType = function (cellIndex, expectedText, outputIndex) {
    this.waitAndCheckOutputText(cellIndex, expectedText, this.getAllOutputsHtmlType, outputIndex);
  };

  this.waitAndCheckOutputText = function (index, expectedText, getTextElements, outputIndex) {
    if (!outputIndex) {
      outputIndex = 0;
    }
    var codeCell = this.getCodeCellByIndex(index);
    codeCell.scrollIntoView();
    browser.waitUntil(function () {
      var output = getTextElements(codeCell)[outputIndex];
      return output != null && output.isEnabled() && expectedText.test(output.getText());
    }, 50000, 'expected output toMatch ' + expectedText);
  };

  this.plotLegendContainerIsEnabled = function (dtcontainer) {
    var plotLegendContainer = dtcontainer.$('#plotLegendContainer');
    plotLegendContainer.waitForEnabled();
  };

  this.runCellToGetWidgetElement = function (index) {
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    browser.waitUntil(function () {
      return codeCell.$$('div.jupyter-widgets').length > 0;
    });
    return codeCell.$('div.jupyter-widgets');
  };

  this.runCellToGetEasyForm = function (index) {
    this.kernelIdleIcon.waitForEnabled();
    var codeCell = this.runCodeCellByIndex(index);
    return codeCell.$('div.beaker-easyform-container');
  };

  this.getTableIndexMenu = function (dtContainer) {
    dtContainer.$('span.bko-column-header-menu').click();
    browser.waitUntil(function () {
      var menu = browser.$('div.bko-header-menu.bko-table-menu');
      return menu != null && menu.isDisplayed();
    }, 10000, 'index menu is not visible');
    return browser.$('div.bko-header-menu.bko-table-menu');
  };

  this.getTableIndexSubMenu = function (tblMenu, index) {
    tblMenu.$$('[data-type="submenu"]')[index].click();
    browser.waitUntil(function () {
      var menu = browser.$('div.dropdown-submenu.bko-table-menu');
      return menu != null && menu.isDisplayed();
    }, 10000, 'index sub menu is not visible');
    return browser.$$('div.dropdown-submenu.bko-table-menu');
  };

  this.checkBrowserLogError = function (log_level) {
    var i = 0;
    var logMsgs = browser.log('browser').value;
    while (i < logMsgs.length) {
      if (logMsgs[i].level == log_level) {
        expect(logMsgs[i].message).not.toMatch(/./);
      }
      i += 1;
    }
  };

  this.checkKernelIdle = function () {
    return this.kernelIdleIcon.waitForEnabled();
  };

  this.createTableImage = function (imageDataStr, imgDir, fileName) {
    var dirPath = path.join(__dirname, '../resources/img', imgDir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    };
    var absFileName = path.join(dirPath, fileName);
    var stream = fs.createWriteStream(absFileName);
    stream.write(new Buffer(imageDataStr, 'base64'));
    stream.end();
  };

  this.getCanvasImageData = function (canvas, width, height, x, y) {
    // if (canvas == null || canvas.value == null) {
    if (canvas == null) {
      return {
        value: 'null'
      };
    }
    var sx = (x !== undefined) ? x : 0;
    var sy = (y !== undefined) ? y : 0;
    browser.pause(1000);
    var result = browser.execute(function (cnv, sx, sy, width, height) {
      var ctx = cnv.getContext("2d");
      var imgData = ctx.getImageData(sx, sy, width, height);
      var bufferCanvas = document.createElement('canvas');
      bufferCanvas.width = width;
      bufferCanvas.height = height;
      bufferCanvas.getContext('2d').putImageData(imgData, 0, 0);
      return bufferCanvas.toDataURL('image/png').replace(/data:image\/png;base64,/, "");
    }, canvas, sx, sy, width, height);
    return result;
  };

  this.checkImageData = function (imageData, imgDir, fileName) {
    var mismatchPercentage = 1;
    var absFileName = path.join(__dirname, '../resources/img', imgDir, fileName);
    var file1 = fs.readFileSync(absFileName);
    var file2 = new Buffer(imageData, 'base64');
    resemble(file1).compareTo(file2).onComplete(function (data) {
      console.log(fileName + ': misMatch=' + data.misMatchPercentage);
      if(data.misMatchPercentage > mismatchPercentage){
        var stream = fs.createWriteStream(absFileName.replace('.png', 'dif.png'));
        stream.write(data.getBuffer());
        stream.end();
        console.log('file with differences are ' + absFileName.replace('.png', 'dif.png'));
      }
      expect(data.misMatchPercentage).toBeLessThan(mismatchPercentage);
    });
  };

  this.checkPlotWithLine = function (codeCell, cellIndex) {
    browser.waitUntil(function () {
      return codeCell.$$('div.dtcontainer').length > 0;
    }, 30000);
    var dtContainer = this.getDtContainerByIndex(cellIndex);
    expect(dtContainer.$('path.plot-line').isDisplayed()).toBeTruthy();
  };

  this.setHeapSize = function (value) {
    var heapSizeInput = browser.$('input#heap_GB');
    heapSizeInput.setValue(value);
    browser.waitUntil(function () {
      var indicator = browser.$('span.saved');
      return indicator.isDisplayed();
    });
  };

  this.addPropertyPair = function () {
    var addPropertyButton = browser.$('button#add_property_jvm_sett');
    addPropertyButton.click();
  };

  this.setProperty = function (key, value) {
    browser.$('div#properties_property input[placeholder="name"]').setValue(key);
    browser.$('div#properties_property input[placeholder="value"]').setValue(value);
    browser.waitUntil(function () {
      var indicator = browser.$('span.saved');
      return indicator.isDisplayed();
    });
  };

  this.removeProperty = function () {
    var deleteButton = $('button > i.fa-times');
    deleteButton.click();
  };

  this.getDataGridTooltip = function(){
    browser.waitUntil(function () {
      return browser.$('div.p-DataGrid-tooltip').isDisplayed();
    }, 10000, 'doc tooltip is not visible');
    return $('div.p-DataGrid-tooltip');
  };

  this.performRightClick = function (elem, x, y) {
    var result = browser.execute(function (webElem, offsetX, offsetY) {
      var datePosition = webElem.getBoundingClientRect();
      var clickEvent = new MouseEvent("contextmenu", {
        "view": window,
        "bubbles": true,
        "cancelable": false,
        'clientX': datePosition.left + offsetX,
        'clientY': datePosition.top + offsetY
      });
      webElem.dispatchEvent(clickEvent);
    }, elem, x, y);
    browser.pause(1000);
    return result;
  };

  this.performMouseMove = function (elem, x, y) {
    var result = browser.execute(function (webElem, offsetX, offsetY) {
      var datePosition = webElem.getBoundingClientRect();
      var clickEvent = new MouseEvent("mousemove", {
        "view": window,
        "bubbles": true,
        "cancelable": false,
        'clientX': datePosition.left + offsetX,
        'clientY': datePosition.top + offsetY
      });
      webElem.dispatchEvent(clickEvent);
    }, elem, x, y);
    browser.pause(1000);
    return result;
  };

};

module.exports = BeakerXPageObject;
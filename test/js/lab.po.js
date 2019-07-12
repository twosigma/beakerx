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

var LabPageObject = function () {

  this.kernelIdleIcon = $('div.jp-Toolbar-kernelStatus.jp-CircleIcon');

  this.runNotebookByUrl = function(url, shortName){
    console.log('jupyter lab application');
    browser.url('http://127.0.0.1:8888/lab');
    browser.waitUntil(function(){
      return browser.$('body').getAttribute('data-left-sidebar-widget') === 'filebrowser';
    });
    browser.$('div.p-Widget.jp-DirListing.jp-FileBrowser-listing').waitForEnabled();
    browser.$('span.jp-HomeIcon').waitForEnabled();
    browser.$('span.jp-HomeIcon').click();
    browser.pause(2000);
    var dirs = (shortName != null)? shortName.split('/') : url.split('/');
    var i = 0;
    while(dirs.length > i){
      var dirName = dirs[i];
      if(dirName.length === 0){
        i+=1;
        continue;
      }
      browser.$('span=' + dirName).doubleClick();
      browser.$('span=' + dirName).waitForEnabled();
      i+=1;
    }
    this.increaseWindowWidth(200);
  };

  this.increaseWindowWidth = function (addWidth) {
    var curSize = browser.windowHandleSize();
    browser.setViewportSize({
      width: curSize.value.width + addWidth,
      height: curSize.value.height
    });
  };

  this.clickSaveNotebook = function () {
    browser.$('div=File').click();
    var saveMenuItem = browser.$$('li[data-command="docmanager:save"]')[1];
    saveMenuItem.waitForEnabled();
    saveMenuItem.click();

  };

  /* Close and Shutdown Notebook */
  this.closeAndHaltNotebook = function () {
    this.clearAllOutputs();
    browser.$('div=File').click();
    var closeAndCleanupMenuItem = browser.$('li[data-command="filemenu:close-and-cleanup"]');
    closeAndCleanupMenuItem.waitForEnabled();
    closeAndCleanupMenuItem.click();
    var acceptDialogButton = browser.$('button.jp-Dialog-button.jp-mod-accept.jp-mod-warn.jp-mod-styled');
    acceptDialogButton.waitForEnabled();
    acceptDialogButton.click();
    browser.waitUntil(function(){
      return browser.$$('li[data-type="document-title"]').length < 1;
    }, 10000);
    browser.pause(5000);
  };

  this.saveAndCloseNotebook = function () {
    this.clearAllOutputs();
    this.clickSaveNotebook();
    browser.$('div=File').click();
    var closeAndCleanupMenuItem = browser.$('li[data-command="filemenu:close-and-cleanup"]');
    closeAndCleanupMenuItem.waitForEnabled();
    closeAndCleanupMenuItem.click();
    var acceptDialogButton = browser.$('button.jp-Dialog-button.jp-mod-accept.jp-mod-warn.jp-mod-styled');
    acceptDialogButton.waitForEnabled();
    acceptDialogButton.click();
  };

  this.clearAllOutputs = function() {
    browser.$('div=Edit').click();
    var clearAllOutputsMenuItem = browser.$('li[data-command="editmenu:clear-all"]');
    clearAllOutputsMenuItem.waitForEnabled();
    clearAllOutputsMenuItem.click();
  };

  this.getCodeCellByIndex = function (index) {
    return $$('div.p-Widget.jp-Cell.jp-CodeCell.jp-Notebook-cell')[index];
  };

  this.clickRunCell = function () {
    var buttonRunCell = browser.$('button.jp-ToolbarButtonComponent > span.jp-RunIcon');
    buttonRunCell.waitForEnabled();
    buttonRunCell.click();
    this.kernelIdleIcon.waitForEnabled();
  };

  this.clickRunCellWithoutWaiting = function () {
    browser.$('button.jp-ToolbarButtonComponent > span.jp-RunIcon').click();
  };

  this.clickRunAllCells = function() {
    browser.$('div=Run').click();
    var runAllCellsMenuItem = browser.$('li[data-command="runmenu:run-all"]');
    runAllCellsMenuItem.waitForEnabled();
    runAllCellsMenuItem.click();
  };

  this.clickDialogPublishButton = function(){
    browser.$('div.jp-Dialog-buttonLabel=Publish').click();
  };

  this.clickInterruptKernel = function () {
    browser.$('button.jp-ToolbarButtonComponent > span.jp-StopIcon').click();
  };

  this.getAllOutputAreaChildren = function (codeCell) {
    return codeCell.$$('div.jp-OutputArea-child');
  };

  this.getAllOutputsExecuteResult = function (codeCell) {
    return codeCell.$$('div.jp-OutputArea-child.jp-OutputArea-executeResult > div.jp-OutputArea-output');
  };

  this.getAllOutputsStdout = function (codeCell) {
    return codeCell.$$('div.jp-OutputArea-child > div.jp-OutputArea-output[data-mime-type="application/vnd.jupyter.stdout"]');
  };

  this.getAllOutputsStderr = function (codeCell) {
    return codeCell.$$('div.jp-OutputArea-child > div.jp-OutputArea-output[data-mime-type="application/vnd.jupyter.stderr"]');
  };

  this.getAllOutputsHtmlType = function (codeCell) {
    return codeCell.$$('div.jp-OutputArea-child > div.jp-OutputArea-output[data-mime-type="text/html"]');
  };

  this.getAllOutputsWidget = function(codeCell){
    return codeCell.$$('div.jp-OutputArea-child > div.jp-OutputArea-output');
  };

  this.callAutocompleteAndGetItsList = function(codeCell, codeStr){
    codeCell.scroll();
    codeCell.$('div.CodeMirror.cm-s-jupyter').click();
    codeCell.keys(codeStr);
    browser.keys("Tab");
    browser.keys('\uE000');
    browser.waitUntil(function() {
      return browser.$('ul.jp-Completer').isDisplayed()
    }, 10000, 'autocomplete list is not visible');
    return $$('li.jp-Completer-item');
  };

  this.callDocAndGetItsTooltip = function(codeCell, codeStr){
    codeCell.scroll();
    codeCell.$('div.CodeMirror.cm-s-jupyter').click();
    codeCell.keys(codeStr);
    browser.keys('Shift');
    browser.keys('Tab');
    browser.keys('\uE000');
    browser.waitUntil(function() {
      return browser.$('div.jp-Tooltip').isDisplayed();
    }, 10000, 'doc tooltip is not visible');
    return $('div.jp-Tooltip-content');
  };

  this.openUIWindow = function(){
    browser.$$('li.p-TabBar-tab')[2].click();
    browser.$('div.p-CommandPalette-itemLabel=BeakerX Options').click();
    browser.$$('li.p-TabBar-tab')[9].click();
  };

  this.setJVMProperties = function (heapSize, key, value, url) {
    if(url != null){
      this.runNotebookByUrl(url);
    }
    this.openUIWindow();
    browser.$('div.p-CommandPalette-itemLabel=BeakerX Options').click();
    var uiPanel = browser.$('div#beakerx-tree-widget');
    uiPanel.$$('li.p-TabBar-tab')[0].click();

    browser.$('input#heap_GB').waitForEnabled();
    this.setHeapSize(heapSize);
    if(key == null){
      this.removeProperty();
    }
    else {
      this.addPropertyPair();
      this.setProperty(key, value);
    }

    browser.$$('li.p-TabBar-tab')[0].click();
    browser.pause(2000);
    if(url != null) {
      browser.$('div.p-DockPanel-tabBar').$('li[data-type="document-title"]').click();

      browser.$('div=File').click();
      var closeAndCleanupMenuItem = browser.$('li[data-command="filemenu:close-and-cleanup"]');
      closeAndCleanupMenuItem.waitForEnabled();
      closeAndCleanupMenuItem.click();
      var acceptDialogButton = browser.$('button.jp-Dialog-button.jp-mod-accept.jp-mod-warn.jp-mod-styled');
      acceptDialogButton.waitForEnabled();
      acceptDialogButton.click();
    }
  }

};
module.exports = LabPageObject;

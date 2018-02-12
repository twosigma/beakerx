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

  this.runNotebookByUrl = function(url){
    console.log('------------labx');
    browser.url('http://127.0.0.1:8888/lab');
    browser.waitUntil(function(){
      return browser.$('body').getAttribute('data-left-sidebar-widget') === 'filebrowser';
    });
    browser.$('div.p-Widget.jp-DirListing.jp-FileBrowser-listing').waitForEnabled();
    var dirs = url.split('/');
    var i = 0;
    while(dirs.length > i){
      var dirName = dirs[i];
      if(dirName.length === 0){
        i+=1;
        continue;
      }
      browser.doubleClick('span=' + dirName);
      browser.$('span=' + dirName).waitForEnabled();
      i+=1;
    }
  };

  /* Close and  Shutdown Notebook */
  this.closeAndHaltNotebook = function () {
    this.clearAllOutputsLab();
    browser.click('div=File');
    browser.pause(3000);
    // browser.$('li[data-command="filemenu:close-and-cleanup"]').waitForEnabled();
    browser.$('li[data-command="filemenu:close-and-cleanup"]').click();
    // browser.$('button.jp-Dialog-button.jp-mod-accept.jp-mod-warn.jp-mod-styled').waitForEnabled();
    browser.pause(3000);
    browser.$('button.jp-Dialog-button.jp-mod-accept.jp-mod-warn.jp-mod-styled').click();
    browser.pause(3000);
  };

  this.clearAllOutputsLab = function() {
    browser.click('div=Edit');
    browser.pause(3000);
    // browser.$('li[data-command="filemenu:editmenu:clear-all"]').waitForEnabled();
    browser.$('li[data-command="notebook:clear-all-cell-outputs"]').moveToObject();
    browser.pause(3000);
    browser.$('li[data-command="notebook:clear-all-cell-outputs"]').click();
    browser.pause(3000);
  }

};
module.exports = LabPageObject;

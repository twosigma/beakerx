/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

var drool = require('drool');
var humanize = require('humanize');
var chalk = require('chalk');
var webdriver = require('./node_modules/drool/node_modules/selenium-webdriver');
var config = {
  chromeOptions: 'no-sandbox'
};

if (typeof process.env.chromeBinaryPath !== 'undefined') {
  config.chromeBinaryPath = process.env.chromeBinaryPath;
}

var driver = drool.start(config);
var snapshot = [];
var retryCount = 5;
var actionCount = 10;

function openNotebook() {
  driver.wait(function() {
    return driver.findElement(webdriver.By.css('.new-empty-notebook')).click()
    .then(function() {
      return true;
    })
    .thenCatch(function() {
      return false;
    });
  }, 5000)
}

function waitForElement(fn) {
  return driver.wait(function() {return fn().then(function() {return true;}).thenCatch(function() {return false;})}, 2500);
}

function openFileMenu() {
  driver.wait(function() {
    return driver.findElement(webdriver.By.css('a.dropdown-toggle')).click()
    .then(function() {
      return true;
    })
    .thenCatch(function() {
      return false;
    });
  }, 5000);
}

function closeNotebook() {
  openFileMenu();
  driver.findElement(webdriver.By.css('#close-menuitem')).click();
  waitForElement(function() {
    return driver.findElement(webdriver.By.css('.btn.no')).click();
  });

  waitForElement(function() {
    return driver.findElement(webdriver.By.css('bk-control-panel')).isDisplayed();
  });
}

function addCell() {
  waitForElement(function() {
    return driver.findElement(webdriver.By.css('button.insert-cell')).click();
  });
}

function addAndRemoveCell() {
  addCell();
  driver.findElement(webdriver.By.css('.delete-cell')).click();
}

function evaluateCell() {
  waitForElement(function() {return driver.findElement(webdriver.By.css('.cell-menu-item.evaluate')).click();});
}

function enterCode() {
  return waitForElement(function() {
    return driver.findElement(webdriver.By.css('.CodeMirror textarea')).sendKeys('1 + 1');
  });
}

function deleteCellOutput() {
  waitForElement(function() {
    return driver.findElement(webdriver.By.css('bk-code-cell-output .cell-dropdown')).click();
  });

  waitForElement(function() {
    return driver.findElement(webdriver.By.xpath('/html/body/ng-view/bk-main-app/div/div[1]/div/bk-notebook/ul/li[4]/a')).click();
  });
}

function evaluateAndRemoveOutputCell() {
  evaluateCell();
  deleteCellOutput();
}

function printChange(original, current) {
  var heapChange = current.jsHeapSizeUsed - original.jsHeapSizeUsed;
  var nodeChange = current.nodes- original.nodes;
  var listenerChange = current.jsEventListeners - original.jsEventListeners;

  console.log('Heap Size Delta:      ' + chalk[heapChange > 0 ? 'red' : 'green'](humanize.filesize(heapChange)));
  console.log('Node Count Delta:     ' + chalk[nodeChange > 0 ? 'red' : 'green'](nodeChange));
  console.log('Event Listener Delta: ' + chalk[listenerChange > 0 ? 'red' : 'green'](listenerChange));
}

for(var k = 0; k < retryCount; ++k) {
  driver.get('http://127.0.0.1:8801');
  openNotebook();

  //prime cache
  addAndRemoveCell();
  driver.sleep(1000);
  drool.getCounts(driver)
  .then(function(v) {
    snapshot.push(v);
    console.log(chalk.bgCyan.bold('Measuring Creating and destroying a code cell ' + actionCount + ' times -- run ' + (this+1)));
  }.bind(k))

  for(var i = 0; i < actionCount; ++i) {
    addAndRemoveCell();
  }

  driver.sleep(1000);
  drool.getCounts(driver)
  .then(function(mem) { printChange(snapshot.pop(), mem); });

  closeNotebook();
}

for(var k = 0; k < retryCount; ++k) {
  driver.get('http://127.0.0.1:8801');

  openNotebook();

  //prime cache
  addCell();
  enterCode();
  evaluateAndRemoveOutputCell();

  driver.sleep(1000);
  drool.getCounts(driver)
  .then(function(v) {
    snapshot.push(v);
    console.log(chalk.bgCyan.bold('Measuring Creating and destroying a output cell ' + actionCount + ' times -- run ' + (this+1)));
  }.bind(k))

  for(var i = 0; i < actionCount; ++i) {
    evaluateAndRemoveOutputCell();
  }

  driver.sleep(1000);
  drool.getCounts(driver)
  .then(function(mem) { printChange(snapshot.pop(), mem); });

  closeNotebook();
}

driver.quit();

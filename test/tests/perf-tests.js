/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

var PR = require('../node_modules/protractor-perf/lib/index.js');
var perfRunner;
var BPO = new require('./beaker.po.js');
var path = require('path');
var startTime;
var results = {};
var allStats;

describe('performance notebook', function() {
  beforeAll(function(done) {
    perfRunner = new PR(protractor, browser);
    beakerPO = new BPO();
    browser.get(beakerPO.baseURL);
    browser.waitForAngular().then(function() {
      beakerPO.openFile(path.join(__dirname, '../', 'notebooks/performance_notebook.bkr')).then(function() {return startTime = Date.now();});
      perfRunner.start();
      perfRunner.stop();
      perfRunner.getStats().then(function(stats) {
        done();
      });
    });
  });

  beforeEach(function() {
    perfRunner = new PR(protractor, browser);
  });

  describe('opening and closing sections', function() {

    it('closes and opens the first section', function() {
      perfRunner.start();
      element(by.css('.bksectiontoggleminus')).click();
      element(by.css('.bksectiontoggleplus')).click();
      perfRunner.stop();
      perfRunner.getStats().then(addRenderingStats.bind(null, 'section manipulation'));
    });

    it('closes and opens the second section', function() {
      perfRunner.start();
      element.all(by.css('.bksectiontoggleminus')).get(1).click();
      element.all(by.css('.bksectiontoggleplus')).get(1).click();
      perfRunner.stop();
      perfRunner.getStats().then(addRenderingStats.bind(null, 'section manipulation'));
    });

    it('closes and opens the third section', function() {
      perfRunner.start();
      element.all(by.css('.bksectiontoggleminus')).get(2).click();
      element.all(by.css('.bksectiontoggleplus')).get(2).click();
      perfRunner.stop();
      perfRunner.getStats().then(addRenderingStats.bind(null, 'section manipulation'));
    });

    it('opens and closes the fourth section', function() {
      perfRunner.start();
      element.all(by.css('.bksectiontoggleplus')).get(3).click();
      element.all(by.css('.bksectiontoggleminus')).get(3).click();
      perfRunner.stop();
      perfRunner.getStats().then(addRenderingStats.bind(null, 'section manipulation'));
    });

    it('opens and closes the fifth section', function() {
      perfRunner.start();
      element.all(by.css('.bksectiontoggleplus')).get(4).click();
      element.all(by.css('.bksectiontoggleminus')).get(4).click();
      perfRunner.stop();
      perfRunner.getStats().then(addRenderingStats.bind(null, 'section manipulation'));
    });

    it('closes and opens the sixth section', function() {
      perfRunner.start();
      element.all(by.css('.bksectiontoggleminus')).get(5).click();
      element.all(by.css('.bksectiontoggleplus')).get(5).click();
      perfRunner.stop();
      perfRunner.getStats().then(addRenderingStats.bind(null, 'section manipulation'));
    });
  });

  describe('loading and first rendering', function() {
    it('reloads the page', function(done) {
      reloadAndSaveStats().then(done);
    });
    it('reloads the page', function(done) {
      reloadAndSaveStats().then(done);
    });
    it('reloads the page', function(done) {
      reloadAndSaveStats().then(done);
    });
    it('reloads the page', function(done) {
      reloadAndSaveStats().then(done);
    });
    it('reloads the page', function(done) {
      reloadAndSaveStats().then(done);
    });
  });

  afterAll(function() {
    console.log(results);
  });
});

function addStat(property, value, descriptor) {
  if (results[descriptor]){
    if (results[descriptor][property]) {
      return results[descriptor][property].push(value);
    }
    return results[descriptor][property] = [value];
  }
  results[descriptor] = {};
  results[descriptor][property] = [value];
}

function addRenderingStats(descriptor, stats) {
  addStat('droppedFrameCount', stats.droppedFrameCount, descriptor);
  addStat('InvalidateLayoutTime', stats.InvalidateLayout, descriptor);
  addStat('UpdateCounters', stats.UpdateCounters, descriptor);
  addStat('meanFrameTime', stats.meanFrameTime_raf, descriptor);
}

function reloadAndSaveStats() {
  var startTime = Date.now();
  browser.driver.navigate().refresh();
  reload();
  perfRunner.start();
  perfRunner.stop();
  return perfRunner.getStats().then(function(stats) {
    addStat('loadAndRenderTime', Date.now() - startTime, 'first render');
    addRenderingStats('first render', stats);
    return true;
  });
}

function reload() {
  try {
    browser.switchTo().alert().accept();
  } catch (e) {
    console.log(e);
  }
}
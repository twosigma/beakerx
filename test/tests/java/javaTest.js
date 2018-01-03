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

var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('JavaTutorial notebook', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/java/JavaTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Run first cell. ', function () {
    it('Output contains "test.beaker.BeakerTest"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(0, 'test.beaker.BeakerTest');
    });
  });

  describe('Run 2nd cell. ', function () {
    it('Output contains "Today:"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(1, 'Today:');
    });
  });

  describe('Run 3rd cell. ', function () {
    it('PlotLegendContainer is enabled', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var dtContainer = beakerxPO.runCellToGetDtContainer(2);
      beakerxPO.plotLegendContainerIsEnabled(dtContainer);
    });
  });

  describe('Run 4th cell. ', function () {
    it('Output contains "DateGetter"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(3, 'DateGetter');
    });
  });

  describe('Run 5th cell. ', function () {
    it('Output contains "DG2"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(4, 'DG2');
    }, 2);
  });

  describe('Run 7th cell. ', function () {
    it('Output contains "beakerx/test/notebooks"', function () {
      beakerxPO.runCodeCellByIndex(5);
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(6, 'beakerx\.test\.notebooks');
    }, 2);
  });

  describe('Run 8th cell. ', function () {
    it('Output contains "static_123 object_123"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(7, '\.*static_123\.*\n*\.*object_123');
    }, 2);
  });

});
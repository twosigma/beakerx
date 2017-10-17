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

describe('Scala notebook', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/scala/ScalaTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Run first cell. ', function () {
    it('Output contains "defined class Greeter"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(0, 'defined class Greeter');
    }, 2);
  });

  describe('Run 2nd cell. ', function () {
    it('Output contains "Hello, Scala developer!"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(1, 'Hello, Scala developer!');
    });
  });

  describe('Run 3rd cell. ', function () {
    it('PlotLegendContainer is enabled', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var dtContainer = beakerxPO.runCellToGetDtContainer(2);
      beakerxPO.plotLegendContainerIsEnabled(dtContainer);
    });
  });

});
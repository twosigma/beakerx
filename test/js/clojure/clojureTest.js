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

describe('ClojureTutorial notebook', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/clojure/ClojureTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Run first cell. ', function () {
    it('Output contains "0, 1, 1, 2, 3, 5"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCellAndCheckOutputText(0, '0, 1, 1, 2, 3, 5');
    });
  });

  describe('Run 2nd cell. ', function () {
    it('Output contains "Will print"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCellAndCheckOutputText(1, 'Will print');
    });
  });

  describe('Run 3rd cell. ', function () {
    it('Output contains "Distinct: 36"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCellAndCheckOutputText(2, 'Distinct: 36');
    });
  });

});
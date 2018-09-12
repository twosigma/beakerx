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

var easyFormBaseObject = require('../easyFormBase.js').prototype;
var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('(Python) Testing of EasyForm', function () {

  easyFormBaseObject.constructor.apply(this, ['Python']);

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/EasyFormPythonTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe("(Python) EasyForm Actions", function () {
    var inputs;

    it('EasyForm has button', function () {
      cellIndex = 35;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      easyForm.$('button=run tag').click();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      easyForm.$('button=actionPerformed').click();
    });

    it('tag should create EasyForm', function () {
      cellIndex += 2;
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell_11 = beakerxPO.getCodeCellByIndex(cellIndex);
      var easyForm = codeCell_11.$('div.beaker-easyform-container');
      expect(easyForm.isEnabled()).toBeTruthy();
      inputs = easyForm.$$('input[type="text"]');
    });

    it('should change text value', function () {
      cellIndex -= 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(inputs[0].getValue()).toBe('test text');
    });

    it('actionPerformed should change text value', function () {
      expect(inputs[1].getValue()).toBe('from actionPerformed');
    });
  });

});
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

var BeakerXPageObject = require('./beakerx.po.js');
var beakerxPO;

describe('Testing of EasyForm', function () {

  beforeAll(function (done) {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/EasyFormTest.ipynb', done);
  }, 2);

  describe('EasyForm widget', function () {
    it('Cell has EasyForm widget', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(0);
      expect(codeCell.$('fieldset').isEnabled()).toBeTruthy();
      expect(codeCell.$('legend').getText()).toBe('Legend name');
      expect(codeCell.$('div.beaker-easyform-container').isEnabled()).toBeTruthy();
    }, 2);

    it('EasyForm has text field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(1);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name');
      expect(easyForm.$('input[type="text"]').isEnabled()).toBeTruthy();
    });

    it('EasyForm has textarea field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(2);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name');
      expect(easyForm.$('textarea').isEnabled()).toBeTruthy();
    });

    it('EasyForm has checkbox field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(3);
      expect(easyForm.$('div.widget-checkbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('span').getText()).toBe('field name');
      expect(easyForm.$('input[type="checkbox"]').isEnabled()).toBeTruthy();
    });

  });


});
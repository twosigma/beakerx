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

describe('(Groovy) Testing of Kernel API', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/KernelAPITest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Groovy) Adding jar file', function () {

    var testValues = {
      loadJarSuccess: 'Added jar: [loadMagicJarDemo.jar]',
      magicCommandSuccess: 'Magic command %showEnvs was successfully added.',
      envs: '{PATH='
    };

    it('Jar file is loaded correctly', function () {
      cellIndex = 0;
      var output = beakerxPO.runCellToGetOutputTextElement(cellIndex);
      expect(output.isEnabled()).toBeTruthy();
      expect(output.getText()).toBe(testValues.loadJarSuccess);
    });

    it('Magic command is added successfully', function () {
      cellIndex += 1;
      var output = beakerxPO.runCellToGetOutputTextElement(cellIndex);
      expect(output.isEnabled()).toBeTruthy();
      expect(output.getText()).toBe(testValues.magicCommandSuccess);
    });

    it('Envs are displayed correctly', function () {
      cellIndex += 1;
      var output = beakerxPO.runCellToGetOutputTextElement(cellIndex);
      expect(output.isEnabled()).toBeTruthy();
      expect(output.getText()).toContain(testValues.envs);
    });
  });

  describe('(Groovy) Show null execution result as true', function() {
    it('Cell displays true output', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result').isEnabled()).toBeTruthy();
      expect(codeCell.$('div.output_result').getText()).toBe('true');
    });
  });

  describe('(Groovy) Show null execution result as null', function() {
    it('Cell displays null output', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result').isEnabled()).toBeTruthy();
      expect(codeCell.$('div.output_result').getText()).toBe('null');
    });
  });

  describe('(Groovy) Do not show null execution result', function() {
    it('Cell displays no output', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output').getText()).toBe('');
    });
  });

  describe('(Groovy) Jvm Repr', function() {
    it('Displayer is properly loaded', function() {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output').getText()).toBe('');
    });

    it('Cell displays proper output', function() {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result').getText()).toBe('2');

    });
  });
});
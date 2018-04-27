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
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/KernelAPITest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Groovy) Adding jar file', function () {
    it('Jar file is loaded correctly ', function () {
      cellIndex = 0;
      beakerxPO.runAndCheckOutputTextOfWidget(cellIndex, /Added jar: .loadMagicJarDemo.jar/);
    });

    it('Magic command is added successfully ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfStdout(cellIndex, /Magic command %showEnvs was successfully added/);
    });

    it('Envs are displayed correctly ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfStdout(cellIndex, /{PATH=/);
    });
  });

  describe('(Groovy) Show null execution result as true', function() {
    it('Cell displays true output', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
    });
  });

  describe('(Groovy) Show null execution result as null', function() {
    it('Cell displays null output', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /null/);
    });
  });

  describe('(Groovy) Do not show null execution result', function() {
    it("Cell doesn't have output", function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(beakerxPO.getAllOutputAreaChildren(codeCell).length).toBe(0);
    });
  });

  describe('(Groovy) Jvm Repr', function() {
    it('Displayer is properly loaded', function() {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(beakerxPO.getAllOutputAreaChildren(codeCell).length).toBe(0);
    });

    it('Cell displays proper output', function() {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /2/);
    });
  });

});
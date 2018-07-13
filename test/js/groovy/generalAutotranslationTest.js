/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

describe('General Autotranslation ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/GeneralAutotranslationTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Groovy) set beakerx.bar value ', function(){
    it("Should output beakerx.bar value ", function(){
      cellIndex = 0;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /a groovy value/);
    });
  });

  describe('%%javascript ', function(){
    it("Js console contains beakerx.bar value ", function(){
      cellIndex += 1;
      browser.log('browser'); // reset log
      beakerxPO.runCodeCellByIndex(cellIndex);
      var logMsgs = browser.log('browser').value;
      expect(logMsgs[0].message).toMatch(/a groovy value/);
    });
  });

  describe('%%javascript changes beakerx.bar value', function(){
    it("Cell doesn't have output ", function() {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText().length).toBe(0);
    });
  });

  describe('Groovy kernel ', function(){
    it("Should display beakerx.bar value after js changes ", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /23, 48, 7, .*from JS.*/);
    });
  });

  describe('%%python ', function(){
    it("Should display beakerx.bar value after js changes ", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /23, 48, 7, .*from JS.*/);
    });
  });

  describe('%%python change beakerx.bar value', function(){
    it("Should display beakerx.bar value after python changes ", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /2, .*python.*, .*value.*/);
    });
  });

  describe('%%scala ', function(){
    it("Should display beakerx.bar value after python changes ", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /2, .*python.*, .*value.*/);
    });
  });

  describe('%%scala change beakerx.bar value', function(){
    it("Should display beakerx.bar value after scala changes ", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /3.14, .*scala.*, .*value.*/);
    });
  });

  describe('Groovy kernel ', function(){
    it("Should display beakerx.bar value after scala changes", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /3.14, .*scala.*, .*value.*/);
    });
  });

  describe('%%clojure ', function(){
    it("Should display beakerx.bar value after scala changes ", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /3.14, .*scala.*, .*value.*/);
    });
  });

  describe('%%clojure change beakerx.bar value', function(){
    it("Should display beakerx.bar value after clojure changes ", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /345, .*clojure.*, .*value.*/);
    });
  });

  describe('Groovy kernel ', function(){
    it("Should display beakerx.bar value after clojure changes", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /345, .*clojure.*, .*value.*/);
    });
  });

  describe('%%java ', function(){
    it("Should display beakerx.bar value after clojure changes ", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /345, .*clojure.*, .*value.*/);
    });
  });

  describe('%%java change beakerx.bar value', function(){
    it("Should display beakerx.bar value after java changes ", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /10, .*java.*, .*value.*/);
    });
  });

  describe('Groovy kernel ', function(){
    it("Should display beakerx.bar value after java changes", function(){
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /10, .*java.*, .*value.*/);
    });
  });

});

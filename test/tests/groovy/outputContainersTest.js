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
var PlotHelperObject = require('../plot.helper');
var beakerxPO;
var plotHelper;

describe('(Groovy) Output Containers Test', function() {
  beforeAll(function() {
    beakerxPO = new BeakerXPageObject();
    plotHelper = new PlotHelperObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/OutputContainersTest.ipynb');
  });

  afterAll(function() {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  var testStrings = {

  };

  describe('(Groovy) Stacked Output Containers', function() {
    it('Cell displays stacked output', function() {
      cellIndex = 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(codeCell.$('div.output').isEnabled()).toBeTruthy();
    });
  });
});

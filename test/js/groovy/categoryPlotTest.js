/*
 *  Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
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

describe('Category Plot ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/CategoryPlotTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Run cell with CategoryBars plot ', function () {
    it('Should display 2 categories with 3 bars ', function () {
      cellIndex = 0;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      expect(dtContainer.$$('g.plot-bar').length).toEqual(2);
      var ct1 = dtContainer.$('g#i0.plot-bar');
      var ct2 = dtContainer.$('g#i1.plot-bar');
      expect(ct1.$$('rect').length).toEqual(3);
      expect(ct2.$$('rect').length).toEqual(3);
    });
  });

  describe('Set width and height ', function () {
    it('CategoryPlot has width=400 and height=200 ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      expect(dtContainer.$('svg#svgg').getAttribute('style')).toMatch(/width: 400px; height: 200px/);
    });
  });

  describe('Set title, x and y axis labels ', function () {
    it('CategoryPlot has title, x and y axis labels ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      expect(dtContainer.$('#plotTitle').getText()).toMatch(/Hello CategoryPlot/);
      expect(dtContainer.$('text#xlabel').getText()).toMatch(/Categories/);
      expect(dtContainer.$('text#ylabel').getText()).toMatch(/Values/);
    });
  });

});


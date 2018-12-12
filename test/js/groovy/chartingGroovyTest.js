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

var chartingBaseObject = require('../chartingBase').prototype;
var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('Charting Groovy tests ', function () {

  chartingBaseObject.constructor.apply(this, ['Groovy']);

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/ChartingTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Groovy) Limit of elements for Heatmap ', function(){
    var dtContainer;

    it('Heatmap shows 5300 items ', function () {
      cellIndex = 22;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var heatmap = dtContainer.$('#maing > g.heatmap');
      expect(heatmap.isEnabled()).toBeTruthy();
      expect(heatmap.$$('rect').length).toEqual(5300);
    });
    it('Should display warning message ', function () {
      var heatmap = dtContainer.$('#maing > g.heatmap');
      expect(heatmap.isEnabled()).toBeTruthy();
      expect(dtContainer.$('div.points-limit-modal').getText()).toMatch(/The limit is 10,000 items/);
    });
  });

  describe('(Groovy) Limit of elements for Histogram ', function(){
    it('Histogram has 10_000 elements ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var histgrm = dtContainer.$('#maing > g#i0');
      expect(histgrm.isEnabled()).toBeTruthy();
      expect(histgrm.$$('g#i0_yTop > rect').length).toEqual(59);
      expect(histgrm.$$('g#i0_yTop > rect')[58].getAttribute('id')).toMatch('_9999yTop');
    });
  });

  describe('(Groovy) Limit of elements for TreeMap ', function () {
    it('TreeMap has 100 elements ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var treemap = dtContainer.$('#maing > g');
      expect(treemap.isEnabled()).toBeTruthy();
      expect(treemap.$$('g.cell').length).toEqual(100);
    });
  });

  describe('(Groovy) TreeMap Menu ', function () {
    var dtContainer;
    it('Hide 1 element by menu ', function () {
      cellIndex += 1;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var treemap = dtContainer.$('#maing > g');
      expect(treemap.isEnabled()).toBeTruthy();
      expect(Math.round(treemap.$('g#i2 > rect').getAttribute('height'))).toBeGreaterThan(0);
      dtContainer.$$('input')[1].click();
      treemap = dtContainer.$('#maing > g');
      expect(Math.round(treemap.$('g#i2 > rect').getAttribute('height'))).toEqual(0);
    });

    it('Hide All elements by menu ', function () {
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var treemap = dtContainer.$('#maing > g');
      expect(treemap.isEnabled()).toBeTruthy();
      expect(treemap.$$('g.cell').length).toEqual(18);
      dtContainer.$$('input')[0].click();
      expect(dtContainer.$$('#maing > g').length).toEqual(0);
    });

    it('Show All elements by menu ', function () {
      dtContainer.$$('input')[0].click();
      var treemap = dtContainer.$('#maing > g');
      expect(treemap.isEnabled()).toBeTruthy();
      expect(treemap.$$('g.cell').length).toEqual(18);
    });
  });

});
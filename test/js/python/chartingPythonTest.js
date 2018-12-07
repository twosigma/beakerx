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

var chartingBaseObject = require('../chartingBase').prototype;
var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('Charting Python tests ', function () {

  chartingBaseObject.constructor.apply(this, ['Python']);

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/ChartingTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('(Python) Limit of elements for Heatmap ', function(){
    it('Heatmap has 10_000 elements ', function () {
      cellIndex = 22;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var heatmap = dtContainer.$('#maing > g.heatmap');
      expect(heatmap.isEnabled()).toBeTruthy();
      expect(heatmap.$$('rect').length).toEqual(10000);
    });
  });

  describe('(Python) Limit of elements for Histogram ', function(){
    it('Histogram has 10_000 elements ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var histgrm = dtContainer.$('#maing > g#i0');
      expect(histgrm.isEnabled()).toBeTruthy();
      expect(histgrm.$$('g#i0_yTop > rect').length).toEqual(59);
      expect(histgrm.$$('g#i0_yTop > rect')[58].getAttribute('id')).toMatch('_9999yTop');
    });
  });

  describe('(Python) Limit of elements for TreeMap ', function () {
    it('TreeMap has 100 elements ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var treemap = dtContainer.$('#maing > g');
      expect(treemap.isEnabled()).toBeTruthy();
      expect(treemap.$$('g.cell').length).toEqual(100);
    });
  });

});
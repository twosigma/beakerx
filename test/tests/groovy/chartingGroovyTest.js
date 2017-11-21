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

describe('Charting groovy tests', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/ChartingTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Histogram', function () {
    it('Widget area has dtcontainer', function () {
      beakerxPO.runCodeCellByIndex(0);
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var dtContainer = beakerxPO.runCellToGetDtContainer(1);
      dtContainer.waitForEnabled();
      dtContainer.$('#maing > g.plot-bar').waitForEnabled();
      expect(dtContainer.$('#maing > g.plot-bar').isEnabled()).toBeTruthy();
    });

    it('Histogram has Title and Axes Labels', function () {
      var dtContainer = beakerxPO.runCellToGetDtContainer(2);
      dtContainer.waitForEnabled();
      dtContainer.$('#plotTitle').waitForEnabled();
      expect(dtContainer.$('#plotTitle').getText()).toEqual('Wide Histogram with Manual Parameters');
      expect(dtContainer.$('#xlabel').getText()).toEqual('Size');
      expect(dtContainer.$('#ylabel').getText()).toEqual('Count');
    });

    it('Plot has two histograms (Overlap)', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(3);
      svgElement.waitForEnabled();
      var g0 = svgElement.$('#maing > g#i0');
      g0.waitForEnabled();
      var g1 = svgElement.$('#maing > g#i1');
      expect(g0.getCssProperty('fill').value).toEqual('rgb(0,154,166)');
      expect(g0.getCssProperty('fill-opacity').value).toEqual(1);
      expect(g1.getCssProperty('fill').value).toEqual('rgb(230,50,50)');
      expect(g1.getCssProperty('fill-opacity').value.toFixed(1)).toEqual('0.5');
    });

    it('Plot has two histograms (Stack)', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(4);
      svgElement.waitForEnabled();
      var g0 = svgElement.$('#maing > g#i0');
      g0.waitForEnabled();
      var g1 = svgElement.$('#maing > g#i1');
      expect(g0.getCssProperty('fill-opacity').value).toEqual(1);
      expect(g1.getCssProperty('fill-opacity').value).toEqual(1);
    });
  });

});
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

  describe('(Groovy) Levels Of Detail', function () {
    it('Plot has two polygon elements', function () {
      cellIndex = 15;
      beakerxPO.runCodeCellByIndex(cellIndex);
      cellIndex +=1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$('#i0 polygon').isVisible()).toBeTruthy();
      expect(svgElement.$('#i1 polygon').isVisible()).toBeTruthy();
    });
  });

  function calculateSquare(rectElement){
    return Math.round(rectElement.getAttribute('height')) * Math.round(rectElement.getAttribute('width'));
  }

  describe('(Groovy) TreeMap', function () {
    it('Plot has TreeMap', function () {
      cellIndex +=1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      cellIndex +=1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$$('g.cell').length).toBe(13);
    });

    var svgElement1;
    it('(Mode.SQUARIFY) 1st and 2nd elements have the same colors and squares', function () {
      cellIndex +=1;
      svgElement1 = beakerxPO.runCellToGetSvgElement(cellIndex);
      var rect2 = svgElement1.$('g#i2.cell > rect');
      var rect3 = svgElement1.$('g#i3.cell > rect');
      expect(rect2.getCssProperty('fill').value).toEqual(rect3.getCssProperty('fill').value);
      expect(calculateSquare(rect2)).toEqual(calculateSquare(rect3));
    });

    it('(Mode.SQUARIFY) 1st and 13th elements have the differents colors and squares', function () {
      var rect2 = svgElement1.$('g#i2.cell > rect');
      var rect16 = svgElement1.$('g#i16.cell > rect');
      expect(rect2.getCssProperty('fill').value).not.toEqual(rect16.getCssProperty('fill').value);
      expect(calculateSquare(rect2)).not.toEqual(calculateSquare(rect16));
    });

    it('(Mode.SLICE) 1st and 13th elements have the same widths', function () {
      cellIndex +=1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      var rect2 = svgElement.$('g#i2.cell > rect');
      var rect16 = svgElement.$('g#i16.cell > rect');
      expect(Math.round(rect2.getAttribute('width'))).toEqual(Math.round(rect16.getAttribute('width')));
    });

    it('(Mode.DICE) 1st and 13th elements have the same heights', function () {
      cellIndex +=1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      var rect2 = svgElement.$('g#i2.cell > rect');
      var rect16 = svgElement.$('g#i16.cell > rect');
      expect(Math.round(rect2.getAttribute('height'))).toEqual(Math.round(rect16.getAttribute('height')));
    });

    it('(Mode.SLICE_DIC) 1st and 13th elements have the differents heights', function () {
      cellIndex +=1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      var rect2 = svgElement.$('g#i2.cell > rect');
      var rect16 = svgElement.$('g#i16.cell > rect');
      var maing = svgElement.$('g#maing');
      expect(Math.round(maing.getElementSize('height'))).toEqual(Math.round(rect16.getElementSize('height')));
      expect(Math.round(rect2.getAttribute('height'))).not.toEqual(Math.round(rect16.getAttribute('height')));
    });
  });

});
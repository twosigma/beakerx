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

describe('2nd Y Axis tests', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/notebooks/groovy/2ndYaxisTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function getAttrFor2ndElement(dtContainer, slctr, index, attr){
    return dtContainer.$('g#i' + index + ' ' +  slctr + '#i' + index + '_1').getAttribute(attr);
  }

  function expectToEqualsElements(dtContainer, slctr, attr, i0, i1){
    var g0_elem2 = getAttrFor2ndElement(dtContainer, slctr, (!i0)?0:i0, attr);
    var g1_elem2 = getAttrFor2ndElement(dtContainer, slctr, (!i1)?1:i1, attr);
    expect(g1_elem2).toEqual(g0_elem2);
  }

  function expect2ndYElementIsHigher(dtContainer, slctr, attr, i0, i1){
    var g0_elem2 = getAttrFor2ndElement(dtContainer, slctr, (!i0)?0:i0, attr);
    var g1_elem2 = getAttrFor2ndElement(dtContainer, slctr, (!i1)?1:i1, attr);
    expect(g1_elem2).toBeLessThan(g0_elem2);
  }

  function expect2ndYElementIsLower(dtContainer, slctr, attr, i0, i1){
    var g0_elem2 = getAttrFor2ndElement(dtContainer, slctr, (!i0)?0:i0, attr);
    var g1_elem2 = getAttrFor2ndElement(dtContainer, slctr, (!i1)?1:i1, attr);
    expect(g1_elem2).toBeGreaterThan(g0_elem2);
  }

  describe('Default scale (lines)', function(){
    var dtContainer;
    it('Plot has 2 lines', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(0);
      expect(dtContainer.$$('g#maing > g').length).toEqual(2);
    });
    it('Line for 2nd Y axis is under Line for 1st Y axis', function(){
      expect2ndYElementIsLower(dtContainer, 'circle', 'cy');
    });
  });

  describe('The same scale (lines)', function(){
    var dtContainer;
    it('Plot has 2 lines', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(1);
      expect(dtContainer.$$('g#maing > g').length).toEqual(2);
    });
    it('Line for 2nd and 1st Y axises have the same 2nd point', function(){
      expectToEqualsElements(dtContainer, 'circle', 'cy');
    });
  });

  describe('2nd YAxis is zoomed (lines)', function(){
    var dtContainer;
    it('Plot has 2 lines', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(2);
      expect(dtContainer.$$('g#maing > g').length).toEqual(2);
    });
    it('Line for 2nd Y axis is over Line for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'circle', 'cy');
    });
  });

  describe('Default scale (category bars)', function(){
    var dtContainer;
    it('Plot has 16 bars', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(3);
      expect(dtContainer.$$('g#maing rect').length).toEqual(16);
    });
    it('Bars for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'rect', 'y', 0, 2);
      expectToEqualsElements(dtContainer, 'rect', 'y', 1, 3);
    });
  });

  describe('The same scale (category bars)', function(){
    var dtContainer;
    it('Plot has 16 bars', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(4);
      expect(dtContainer.$$('g#maing rect').length).toEqual(16);
    });
    it('Bars for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'rect', 'y', 0, 2);
      expectToEqualsElements(dtContainer, 'rect', 'y', 1, 3);
    });
  });

  describe('2nd YAxis is zoomed (category bars)', function(){
    var dtContainer;
    it('Plot has 16 bars', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(5);
      expect(dtContainer.$$('g#maing rect').length).toEqual(16);
    });
    it('Bar for 2nd Y axis is higher than Bar for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'rect', 'y', 0, 2);
      expect2ndYElementIsHigher(dtContainer, 'rect', 'y', 1, 3);
    });
  });

  describe('Default scale (stems)', function(){
    var dtContainer;
    it('Plot has 20 lines', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(6);
      expect(dtContainer.$$('g#maing line').length).toEqual(20);
    });
    it('Stems for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'line', 'y2');
    });
  });

  describe('The same scale (stems)', function(){
    var dtContainer;
    it('Plot has 20 lines', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(7);
      expect(dtContainer.$$('g#maing line').length).toEqual(20);
    });
    it('Stems for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'line', 'y2');
    });
  });

  describe('2nd YAxis is zoomed (stems)', function(){
    var dtContainer;
    it('Plot has 20 lines', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(8);
      expect(dtContainer.$$('g#maing line').length).toEqual(20);
    });
    it('Stem for 2nd Y axis is higher than Stem for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'line', 'y2');
    });
  });

  describe('Default scale (bars)', function(){
    var dtContainer;
    it('Plot has 10 bars', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(9);
      expect(dtContainer.$$('g#maing rect').length).toEqual(10);
    });
    it('Bars for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'rect', 'y');
    });
  });

  describe('The same scale (bars)', function(){
    var dtContainer;
    it('Plot has 10 bars', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(10);
      expect(dtContainer.$$('g#maing rect').length).toEqual(10);
    });
    it('Bars for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'rect', 'y');
    });
  });

  describe('2nd YAxis is zoomed (bars)', function(){
    var dtContainer;
    it('Plot has 10 bars', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(11);
      expect(dtContainer.$$('g#maing rect').length).toEqual(10);
    });
    it('Bar for 2nd Y axis is higher than Bar for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'rect', 'y');
    });
  });

  describe('Default scale (points)', function(){
    var dtContainer;
    it('Plot has 10 points', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(12);
      expect(dtContainer.$$('g#maing circle').length).toEqual(10);
    });
    it('Point for 2nd Y axis is higher than Point for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'circle', 'cy');
    });
  });

  describe('The same scale (points)', function(){
    var dtContainer;
    it('Plot has 10 points', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(13);
      expect(dtContainer.$$('g#maing circle').length).toEqual(10);
    });
    it('Points for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'circle', 'cy');
    });
  });

  describe('2nd YAxis is zoomed (points)', function(){
    var dtContainer;
    it('Plot has 10 points', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(14);
      expect(dtContainer.$$('g#maing circle').length).toEqual(10);
    });
    it('Point for 2nd Y axis is higher than Point for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'circle', 'cy');
    });
  });

  describe('Default scale (areas)', function(){
    var dtContainer;
    it('Plot has 2 areas', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(15);
      expect(dtContainer.$$('g#maing polygon').length).toEqual(2);
    });
    it('Bars for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'rect', 'y');
    });
  });

  describe('The same scale (areas)', function(){
    var dtContainer;
    it('Plot has 2 areas', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(16);
      expect(dtContainer.$$('g#maing polygon').length).toEqual(2);
    });
    it('Bars for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'rect', 'y');
    });
  });

  describe('2nd YAxis is zoomed (areas)', function(){
    var dtContainer;
    it('Plot has 2 areas', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(17);
      expect(dtContainer.$$('g#maing polygon').length).toEqual(2);
    });
    it('Bar for 2nd Y axis is higher than Bar for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'rect', 'y');
    });
  });

  function expectToEqualsAllElements(dtContainer, i0, i1, i2, i3){
    var g0_elem2 = getAttrFor2ndElement(dtContainer, 'circle', i0, 'cy');
    var g1_elem2 = getAttrFor2ndElement(dtContainer, 'circle', i1, 'cy');
    var g2_elem2 = getAttrFor2ndElement(dtContainer, 'rect', i2, 'y');
    var g3_elem2 = getAttrFor2ndElement(dtContainer, 'line', i3, 'y2');
    expect(g0_elem2).toEqual(g1_elem2);
    expect(g0_elem2).toEqual(g2_elem2);
    expect(g0_elem2).toEqual(g3_elem2);
  }

  describe('Default scale (lines, points, bars and stems)', function(){
    var dtContainer;
    it('Plot has lines, points, bars and stems', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(18);
      expect(dtContainer.$$('g#maing path.plot-line').length).toBeGreaterThan(1);
      expect(dtContainer.$$('g#maing g.plot-point').length).toBeGreaterThan(1);
      expect(dtContainer.$$('g#maing g.plot-bar').length).toBeGreaterThan(1);
      expect(dtContainer.$$('g#maing g.plot-stem').length).toBeGreaterThan(1);
    });
    it('Line, Point, Bar and Stem for 1st Y axis have the same y position', function(){
      expectToEqualsAllElements(dtContainer, 0, 1, 2, 3);
    });
    it('Line, Point, Bar and Stem for 2nd Y axis have the same y position', function(){
      expectToEqualsAllElements(dtContainer, 4, 5, 6, 7);
    });
    it('Line for 2nd and 1st Y axises have the same 2nd point', function(){
      expectToEqualsElements(dtContainer, 'circle', 'cy', 0, 4);
    });
    it('Points for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'circle', 'cy', 1, 5);
    });
    it('Bars for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'rect', 'y', 2, 6);
    });
    it('Stems for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'line', 'y2', 3, 7);
    });

  });

  describe('The same scale (lines, points, bars and stems)', function(){
    var dtContainer;
    it('Plot has lines, points, bars and stems', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(19);
      expect(dtContainer.$$('g#maing path.plot-line').length).toBeGreaterThan(1);
      expect(dtContainer.$$('g#maing g.plot-point').length).toBeGreaterThan(1);
      expect(dtContainer.$$('g#maing g.plot-bar').length).toBeGreaterThan(1);
      expect(dtContainer.$$('g#maing g.plot-stem').length).toBeGreaterThan(1);
    });
    it('Line, Point, Bar and Stem for 1st Y axis have the same y position', function(){
      expectToEqualsAllElements(dtContainer, 0, 1, 2, 3);
    });
    it('Line, Point, Bar and Stem for 2nd Y axis have the same y position', function(){
      expectToEqualsAllElements(dtContainer, 4, 5, 6, 7);
    });
    it('Line for 2nd and 1st Y axises have the same 2nd point', function(){
      expectToEqualsElements(dtContainer, 'circle', 'cy', 0, 4);
    });
    it('Points for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'circle', 'cy', 1, 5);
    });
    it('Bars for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'rect', 'y', 2, 6);
    });
    it('Stems for 2nd and 1st Y axises have the same height', function(){
      expectToEqualsElements(dtContainer, 'line', 'y2', 3, 7);
    });
  });

  describe('2nd YAxis is zoomed (lines, points, bars and stems)', function(){
    var dtContainer;
    it('Plot has lines, points, bars and stems', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(20);
      expect(dtContainer.$$('g#maing path.plot-line').length).toBeGreaterThan(1);
      expect(dtContainer.$$('g#maing g.plot-point').length).toBeGreaterThan(1);
      expect(dtContainer.$$('g#maing g.plot-bar').length).toBeGreaterThan(1);
      expect(dtContainer.$$('g#maing g.plot-stem').length).toBeGreaterThan(1);
    });
    it('Line, Point, Bar and Stem for 1st Y axis have the same y position', function(){
      expectToEqualsAllElements(dtContainer, 0, 1, 2, 3);
    });
    it('Line, Point, Bar and Stem for 2nd Y axis have the same y position', function(){
      expectToEqualsAllElements(dtContainer, 4, 5, 6, 7);
    });
    it('Line for 2nd Y axis is over Line for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'circle', 'cy', 0, 4);
    });
    it('Point for 2nd Y axis is higher than Point for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'circle', 'cy', 1, 5);
    });
    it('Bar for 2nd Y axis is higher than Bar for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'rect', 'y', 2, 6);
    });
    it('Stem for 2nd Y axis is higher than Stem for 1st Y axis', function(){
      expect2ndYElementIsHigher(dtContainer, 'line', 'y2', 3, 7);
    });
  });

});

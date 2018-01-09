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
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/2ndYaxisTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function getYPosition(dtContainer, index){
    return dtContainer.$('g#i' + index + ' > circle#i' + index + '_2').getAttribute('cy');
  }

  describe('Default scale (lines)', function(){
    var dtContainer;
    it('Plot has 2 lines', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(0);
      expect(dtContainer.$$('g#maing > g').length).toEqual(2);
    });
    it('Line (2nd Y axis) is under line (1st Y axis)', function(){
      var line1_point3 = getYPosition(dtContainer, 0);
      var line2_point3 = getYPosition(dtContainer, 1);
      expect(line2_point3).toBeGreaterThan(line1_point3);
    });
  });

  describe('The same scale (lines)', function(){
    var dtContainer;
    it('Plot has 2 lines', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(1);
      expect(dtContainer.$$('g#maing > g').length).toEqual(2);
    });
    it('Line (2nd Y axis) and line (1st Y axis) have the same 4th point', function(){
      var line1_point3 = getYPosition(dtContainer, 0);
      var line2_point3 = getYPosition(dtContainer, 1);
      expect(line2_point3).toEqual(line1_point3);
    });
  });

  describe('2nd YAxis is zoomed (lines)', function(){
    var dtContainer;
    it('Plot has 2 lines', function(){
      dtContainer = beakerxPO.runCellToGetDtContainer(2);
      expect(dtContainer.$$('g#maing > g').length).toEqual(2);
    });
    it('Line (2nd Y axis) is over line (1st Y axis)', function(){
      var line1_point3 = getYPosition(dtContainer, 0);
      var line2_point3 = getYPosition(dtContainer, 1);
      expect(line2_point3).toBeLessThan(line1_point3);
    });
  });

  //TODO when will be fixed 2nd Y for categoryBars

  function getAttrFor2ndElement(dtContainer, slctr, index, attr){
    return dtContainer.$('g#i' + index + ' ' +  slctr + '#i' + index + '_1').getAttribute(attr);
  }

  function expectToEqualsElements(dtContainer, slctr, attr){
    var g1_elem2 = getAttrFor2ndElement(dtContainer, slctr, 0, attr);
    var g2_elem2 = getAttrFor2ndElement(dtContainer, slctr, 1, attr);
    expect(g2_elem2).toEqual(g1_elem2);
  }

  function expect2ndYElementIsHigher(dtContainer, slctr, attr){
    var g1_elem2 = getAttrFor2ndElement(dtContainer, slctr, 0, attr);
    var g2_elem2 = getAttrFor2ndElement(dtContainer, slctr, 1, attr);
    expect(g2_elem2).toBeLessThan(g1_elem2);
  }

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

});

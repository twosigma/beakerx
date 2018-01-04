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
    var dtContainer1;
    it('Plot has 2 lines', function(){
      dtContainer1 = beakerxPO.runCellToGetDtContainer(0);
      expect(dtContainer1.$$('g#maing > g').length).toEqual(2);
    });
    it('Second line is under first line', function(){
      var line1 = getYPosition(dtContainer1, 0);
      var line2 = getYPosition(dtContainer1, 1);
      console.log("line1 = " + line1 + " line2 = " + line2);
      expect(line2).toBeGreaterThan(line1);
    });
  });

  describe('The same scale (lines)', function(){
    var dtContainer2;
    it('Plot has 2 lines', function(){
      dtContainer2 = beakerxPO.runCellToGetDtContainer(1);
      expect(dtContainer2.$$('g#maing > g').length).toEqual(2);
    });
    it('Second line and first line have the same 4th point', function(){
      var line1 = getYPosition(dtContainer2, 0);
      var line2 = getYPosition(dtContainer2, 1);
      console.log("line1 = " + line1 + " line2 = " + line2);
      expect(line2).toEqual(line1);
    });
  });

  describe('2nd YAxis is zoomed (lines)', function(){
    var dtContainer3;
    it('Plot has 2 lines', function(){
      dtContainer3 = beakerxPO.runCellToGetDtContainer(2);
      expect(dtContainer3.$$('g#maing > g').length).toEqual(2);
    });
    it('Second line is over first line', function(){
      var line1 = getYPosition(dtContainer3, 0);
      var line2 = getYPosition(dtContainer3, 1);
      console.log("line1 = " + line1 + " line2 = " + line2);
      expect(line2).toBeLessThan(line1);
    });
  });

});

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

var BeakerXPageObject = require('./beakerx.po.js');
var beakerxPO;

describe('Testing of plot Actions', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/PlotActionsTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe("onKey action", function(){
    var svgElement1;

    it('onKey "SHIFT" should change bar value', function () {
      svgElement1 = beakerxPO.runCellToGetSvgElement(0);
      var height1 = Math.round(svgElement1.$('rect#i0_0').getAttribute('height'));
      svgElement1.$('rect#i0_0').click();
      browser.keys("Shift");
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var height2 = Math.round(svgElement1.$('rect#i0_0').getAttribute('height'));
      expect(height2).toBeGreaterThan(height1);
    });

    it('onKey "T" should run tag', function () {
      svgElement1.$('rect#i0_0').click();
      browser.keys("t");
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell = beakerxPO.getCodeCellByIndex(1);
      codeCell.scroll();
      var outputText = codeCell.$('.output_subarea.output_text');
      outputText.waitForExist();
      expect(outputText.getText()).toMatch('1:6');
    });
  });

  // describe("onClick action", function(){
  //   var svgElement2;

    // it('Plot has bars', function () {
    //   svgElement1 = beakerxPO.runCellToGetSvgElement(0);
    //   expect(svgElement1.$('g.plot-bar').isEnabled()).toBeTruthy();
    // });
    //
    // it('onKey "SHIFT" should change bar value', function () {
    //   var height1 = Math.round(svgElement1.$('rect#i0_0').getAttribute('height'));
    //   svgElement1.$('rect#i0_0').click();
    //   browser.keys("Shift");
    //   beakerxPO.kernelIdleIcon.waitForEnabled();
    //   var height2 = Math.round(svgElement1.$('rect#i0_0').getAttribute('height'));
    //   expect(height2).toBeGreaterThan(height1);
    // });
    //
    // it('onKey "T" should run tag', function () {
    //   svgElement1.$('rect#i0_0').click();
    //   browser.keys("t");
    //   beakerxPO.kernelIdleIcon.waitForEnabled();
    //   var codeCell = beakerxPO.getCodeCellByIndex(1);
    //   codeCell.scroll();
    //   var outputText = codeCell.$('.output_subarea.output_text');
    //   outputText.waitForExist();
    //   browser.pause(5000);
    //   expect(outputText.getText()).toMatch('1:6');
    // });
  // });

});
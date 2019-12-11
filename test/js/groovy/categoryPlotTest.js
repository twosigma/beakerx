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

  describe('Set category labels ', function () {
    it('CategoryPlot has 3 category labels ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgg.$$('text.plot-label-x').length).toEqual(3);
      expect(svgg.$('text#label_x_0').getText()).toMatch(/Helium/);
      expect(svgg.$('text#label_x_1').getText()).toMatch(/Neon/);
      expect(svgg.$('text#label_x_2').getText()).toMatch(/Argon/);
    });
  });

  describe('Set series labels ', function () {
    it('CategoryPlot has 2 series labels ', function () {
      cellIndex += 1;
      var dtConteainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var legendLines = dtConteainer.$$('div.plot-legenditeminrow.plot-legendline');
      expect(legendLines.length).toEqual(3);
      expect(legendLines[0].getText()).toMatch(/All/);
      expect(legendLines[1].getText()).toMatch(/Gas/);
      expect(legendLines[2].getText()).toMatch(/Liquid/);
    });
  });

  describe('Show legend ', function () {
    var dtConteainer;
    it('Legend has default names ', function () {
      cellIndex += 1;
      dtConteainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var legendLines = dtConteainer.$$('div.plot-legenditeminrow.plot-legendline');
      expect(legendLines.length).toEqual(3);
      expect(legendLines[0].getText()).toMatch(/All/);
      expect(legendLines[1].getText()).toMatch(/series0/);
      expect(legendLines[2].getText()).toMatch(/series1/);
    });
    it('Hide/show first series ', function () {
      var svgg = beakerxPO.getSvgElementByIndex(cellIndex);
      expect(svgg.$$('g#i0 > rect').length).toEqual(3);
      var legendLines = dtConteainer.$$('div.plot-legenditeminrow.plot-legendline');
      legendLines[0].$('input').click();
      expect(svgg.$$('g#i0 > rect').length).toEqual(0);
      legendLines[0].$('input').click();
      expect(svgg.$$('g#i0 > rect').length).toEqual(3);
    });
  });

  describe('Set horizontal orientation ', function () {
    it('CategoryPlot has horizontal orientation ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      var rect1 = svgg.$('rect#i0_1');
      expect(Math.round(rect1.getAttribute('width'))).toBeGreaterThan(Math.round(rect1.getAttribute('height')));
    });
  });

  describe('Set label orientation ', function () {
    it('CategoryPlot has rotated labels ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgg.$('text#label_x_0').getAttribute('transform')).toMatch(/rotate.45/);
      expect(svgg.$('text#label_x_1').getAttribute('transform')).toMatch(/rotate.45/);
    });
  });

  function getMathAttribute(svgg, selector, attribute){
    return Math.round(svgg.$(selector).getAttribute(attribute));
  }

  describe('Set margin ', function () {
    it('Space between categories is greater than width ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      var rectX_0_1 = getMathAttribute(svgg, 'rect#i0_1', 'x');
      var rectW_0_1 = getMathAttribute(svgg, 'rect#i0_1', 'width');
      var rectX_1_0 = getMathAttribute(svgg, 'rect#i1_0', 'x');
      var rectW_1_0 = getMathAttribute(svgg, 'rect#i1_0', 'width');
      expect(rectW_0_1).toEqual(rectW_1_0);
      expect(rectX_0_1 - (rectX_1_0 + rectW_1_0)).toBeGreaterThan(rectW_1_0)
    });
  });

  describe('Set color by single value ', function () {
    it('All bars have the same color ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgg.$('g#i0').getAttribute('style')).toMatch(/fill: rgb\(255, 175, 175\)/);
      expect(svgg.$('g#i1').getAttribute('style')).toMatch(/fill: rgb\(255, 175, 175\)/);
      expect(svgg.$('g#i2').getAttribute('style')).toMatch(/fill: rgb\(255, 175, 175\)/);
    });
  });

  describe('Set color by list of values ', function () {
    it('Each bar has different color ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgg.$('g#i0').getAttribute('style')).toMatch(/fill: rgb\(255, 175, 175\)/);
      expect(svgg.$('rect#i1_0').getAttribute('style')).toMatch(/fill: rgb\(255, 0, 0\)/);
      expect(svgg.$('rect#i1_1').getAttribute('style')).toMatch(/fill: rgb\(128, 128, 128\)/);
      expect(svgg.$('rect#i1_2').getAttribute('style')).toMatch(/fill: rgb\(0, 0, 255\)/);
    });
  });

  describe('Set base by single value ', function () {
    it('CategoryPlot has base  ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      var tickMin2 = getMathAttribute(svgg, 'line#tick_y_0', 'y1');
      expect(svgg.$('text#label_y_0').getText()).toMatch(/-2/);
      var firstRect = getMathAttribute(svgg, 'rect#i0_0', 'height') + getMathAttribute(svgg, 'rect#i0_0', 'y');
      var secondRect = getMathAttribute(svgg, 'rect#i1_0', 'height') + getMathAttribute(svgg, 'rect#i1_0', 'y');
      expect(secondRect - firstRect).toBeLessThan(2);
      expect(secondRect - tickMin2).toBeLessThan(2);
    });
  });

  describe('Set base by list of values ', function () {
    it('Each bar has different base ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      var tickMin2 = getMathAttribute(svgg, 'line#tick_y_2', 'y1');
      expect(svgg.$('text#label_y_2').getText()).toMatch(/-2/);
      expect(svgg.$('text#label_y_0').getText()).toMatch(/-4/);
      var firstRect = getMathAttribute(svgg, 'rect#i0_0', 'height') + getMathAttribute(svgg, 'rect#i0_0', 'y');
      var secondRect = getMathAttribute(svgg, 'rect#i1_0', 'height') + getMathAttribute(svgg, 'rect#i1_0', 'y');
      expect(secondRect - firstRect).toBeGreaterThan(2);
      expect(secondRect - tickMin2).toBeGreaterThan(2);
    });
  });

  describe('Set the width by single value ', function () {
    it('All bars have the same width ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(getMathAttribute(svgg, 'rect#i1_0', 'width')).toEqual(getMathAttribute(svgg, 'rect#i0_1', 'width'));
      expect(getMathAttribute(svgg, 'rect#i0_2', 'width')).toEqual(getMathAttribute(svgg, 'rect#i1_2', 'width'));
    });
  });

  describe('Set width by list of values ', function () {
    it('Each bar has different width ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(getMathAttribute(svgg, 'rect#i1_0', 'width')).toBeGreaterThan(getMathAttribute(svgg, 'rect#i0_1', 'width'));
      expect(getMathAttribute(svgg, 'rect#i0_2', 'width')).toBeGreaterThan(getMathAttribute(svgg, 'rect#i1_2', 'width'));
    });
  });

  describe('Set the fill by single value ', function () {
    it('All bars have the same fill ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgg.$('g#i0').getAttribute('style')).toMatch(/fill: none/);
      expect(svgg.$('g#i1').getAttribute('style')).toMatch(/fill: none/);
    });
  });

  describe('Set the fill by list of values ', function () {
    it('Each bar has different fill ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgg.$('g#i0').getAttribute('style')).toMatch(/fill: rgb\(./);
      expect(svgg.$('rect#i0_0').getAttribute('style')).toMatch(/fill: none/);
      expect(svgg.$('rect#i0_1').getAttribute('style')).not.toMatch(/fill: none/);
      expect(svgg.$('rect#i0_2').getAttribute('style')).toMatch(/fill: none/);
      expect(svgg.$('rect#i1_1').getAttribute('style')).not.toMatch(/fill: none/);
    });
  });

  describe('Set the outline by single value ', function () {
    it('All bars have the same outline ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgg.$('rect#i0_0').getAttribute('style')).toMatch(/stroke: rgb\(./);
      expect(svgg.$('rect#i1_0').getAttribute('style')).toMatch(/stroke: rgb\(./);
    });
  });

  describe('Set the outline by list of values ', function () {
    it('Each bar has different outline ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgg.$('rect#i0_0').getAttribute('style')).nothing();
      expect(svgg.$('rect#i0_1').getAttribute('style')).toMatch(/stroke: rgb\(./);
      expect(svgg.$('rect#i0_2').getAttribute('style')).nothing();
      expect(svgg.$('rect#i1_1').getAttribute('style')).toMatch(/stroke: rgb\(./);
    });
  });

  describe('Set the outline color by single value ', function () {
    it('All bars have the same outline color ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgg.$('rect#i0_0').getAttribute('style')).toMatch(/stroke: rgb\(./);
      expect(svgg.$('rect#i1_0').getAttribute('style')).toMatch(/stroke: rgb\(./);
    });
  });

  describe('Set the outline color by list of values ', function () {
    it('Each bar has different outline color ', function () {
      cellIndex += 1;
      var svgg = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgg.$('rect#i0_0').getAttribute('style')).toMatch(/stroke: rgb\(0, 255, 0/);
      expect(svgg.$('rect#i1_0').getAttribute('style')).toMatch(/stroke: rgb\(255, 0, 0/);
      expect(svgg.$('rect#i0_1').getAttribute('style')).nothing(/stroke: rgb\(0, 255, 0/);
      expect(svgg.$('rect#i1_1').getAttribute('style')).toMatch(/stroke: rgb\(255, 0, 0/);
    });
  });

});


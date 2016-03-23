/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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


var BeakerPageObject = require('./beaker.po.js');
var path = require('path');
var beakerPO;

describe('Charting Tutorial', function () {

  beforeEach(function () {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FchartingTutorial.bkr&readOnly=true");

    browser.waitForAngular();
    beakerPO.waitUntilLoadingIndicator();

  });

  afterEach(function (done) {
    beakerPO.closeNotebook()
      .then(done);
  });


  /**
   * Testing
   *  - CombinedPlot
   *  - TimePlot
   *  - Line
   *  - Area
   *  - Text
   *  - ConstantLine
   *  - ConstantBand
   */
  it('Custom Plot Example', function () {
    var idxCell = 0;
    beakerPO.checkPlotIsPresent(idxCell, 0);
    beakerPO.checkPlotIsPresent(idxCell, 1);

    beakerPO.checkLegendIsPresent(idxCell, 0);

    expect(beakerPO.getCodeCellOutputCombplotTitle(idxCell)).toBe("US Treasuries");
    expect(beakerPO.getCodeCellOutputContainerYLabel(idxCell, 0)).toBe("Interest Rate");
    expect(beakerPO.getCodeCellOutputContainerYLabel(idxCell, 1)).toBe("Spread");

    /**
     * def p1 = new TimePlot(yLabel: "Interest Rate", crosshair: ch)
     */

    beakerPO.checkCount(beakerPO.getPlotMaing(idxCell, 0).all(by.tagName('g')), 8);
    {
      // The top plot has 2 lines.

      /**
       * p1 << new Line(x: rates.time, y: rates.m3, displayName: "3 month")
       */
      beakerPO.checkCount(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).all(by.tagName('circle')), 313);
      /**
       * p1 << new Line(x: rates.time, y: rates.y10, displayName: "10 year")
       */
      beakerPO.checkCount(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1).all(by.tagName('circle')), 313);

      /**
       * def l1 = new ConstantLine(x: lehmanDate, style: StrokeType.DOT, color: Color.gray)
       * def l2 = new ConstantLine(x: bubbleBottomDate, style: StrokeType.DOT, color: Color.gray)
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 2), 'plot-constline');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 3), 'plot-constline');

      /**
       * def b1 = new ConstantBand(x: inversion1, color: new Color(240, 100, 100, 55))
       * def b2 = new ConstantBand(x: inversion2, color: new Color(240, 100, 100, 55))
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 4), 'plot-constband');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 5), 'plot-constband');

      /**
       * p1 << new Text(x: lehmanDate, y: 7.5, text: "Lehman Brothers Bankruptcy")
       * p1 << new Text(x: bubbleBottomDate, y: 5.75, text: "Stocks Hit Bottom")
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 6), 'plot-text');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 7), 'plot-text');
    }


    /**
     * def p2 = new TimePlot(yLabel: "Spread", crosshair: ch)
     */
    beakerPO.checkCount(beakerPO.getPlotMaing(idxCell, 1).all(by.tagName('g')), 5);

    {
      // The bottom plot has an area filled in.
      /**
       *  p2 << new Area(x: rates.time, y: rates.spread, color: new Color(120, 60, 0))
       */
      expect(beakerPO.getPlotSvgElementByIndex(idxCell, 1, 0).element(by.css('.plot-area')).isPresent()).toBe(true);

      /**
       * def l1 = new ConstantLine(x: lehmanDate, style: StrokeType.DOT, color: Color.gray)
       * def l2 = new ConstantLine(x: bubbleBottomDate, style: StrokeType.DOT, color: Color.gray)
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 1, 1), 'plot-constline');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 1, 2), 'plot-constline');

      /**
       * def b1 = new ConstantBand(x: inversion1, color: new Color(240, 100, 100, 55))
       * def b2 = new ConstantBand(x: inversion2, color: new Color(240, 100, 100, 55))
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 1, 3), 'plot-constband');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 1, 4), 'plot-constband');
    }
  });


  it('Simple Automatic Plot', function() {
    var idxCell = 1;
    beakerPO.checkPlotIsPresent(idxCell);
    beakerPO.checkLegendIsPresent(idxCell);
    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
  });

  it('Scatter Plot', function() {
    var idxCell = 2;
    beakerPO.checkPlotIsPresent(idxCell);
    beakerPO.checkLegendIsPresent(idxCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-point');

    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 2).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 3).element(by.tagName('circle')).isPresent()).toBe(true);
  });


  it('Title and Axis Labels', function() {
    var idxCell = 4;
    beakerPO.checkPlotIsPresent(idxCell);

    expect(beakerPO.getCodeCellOutputContainerTitle(idxCell)).toBe("We Will Control the Title");
    expect(beakerPO.getCodeCellOutputContainerYLabel(idxCell)).toBe("Vertical");
    expect(beakerPO.getCodeCellOutputContainerXLabel(idxCell)).toBe("Horizontal");
  });

  it('Lines', function() {
    var idxCell = 5;
    beakerPO.checkPlotIsPresent(idxCell);
    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
  });

  it('Stems', function() {
    var idxCell = 7;
    beakerPO.checkPlotIsPresent(idxCell);
    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('line')).isPresent()).toBe(true);
  });

  it('Bars', function() {
    var idxCell = 9;
    beakerPO.checkPlotIsPresent(idxCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0), 'plot-bar');
    expect(beakerPO.getCodeCellOutputContainerTitle(idxCell)).toBe("Bars");
  });

  it('Points', function() {
    var idxCell = 10;
    beakerPO.checkPlotIsPresent(idxCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 2), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 3), 'plot-point');
    expect(beakerPO.getCodeCellOutputContainerTitle(idxCell)).toBe("Changing Point Size, Color, Shape");
  });

  it('Areas', function() {
    var idxCell = 12;
    beakerPO.checkPlotIsPresent(idxCell);
    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('polygon')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1).element(by.tagName('polygon')).isPresent()).toBe(true);
  });


  it('Constant Lines', function() {
    var idxCell = 15;
    beakerPO.checkPlotIsPresent(idxCell);

    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-constline');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 2), 'plot-constline');
  });

  it('Constant Bands', function() {
    var idxCell = 16;
    beakerPO.checkPlotIsPresent(idxCell);

    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-constband');
  });

  it('Text', function() {
    var idxCell = 18;
    beakerPO.checkPlotIsPresent(idxCell);

    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-point');

    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 2), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 3), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 4), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 5), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 6), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 7), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 8), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 9), 'plot-text');
  });

  it('Simple Time Plot', function() {
    var idxCell = 20;
    beakerPO.checkPlotIsPresent(idxCell);
    beakerPO.checkLegendIsPresent(idxCell);

    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-point');

    expect(beakerPO.getCodeCellOutputContainerYLabel(idxCell)).toBe("Price");
    expect(beakerPO.getCodeCellOutputContainerXLabel(idxCell)).toBe("Time");

  });

  it('Second Y Axis', function () {
    var idxCell = 21;
    beakerPO.checkPlotIsPresent(idxCell);
    beakerPO.checkLegendIsPresent(idxCell);

    expect(beakerPO.getCodeCellOutputContainerYLabel(idxCell)).toBe("Interest Rates");
    expect(beakerPO.getCodeCellOutputContainerXLabel(idxCell)).toBe("Time");
    expect(beakerPO.getCodeCellOutputContainerYRLabel(idxCell)).toBe("Spread");
  });

  it('Logarithmic Scale', function() {
    var idxCell = 22;
    beakerPO.checkPlotIsPresent(idxCell, 0);
    beakerPO.checkPlotIsPresent(idxCell, 1);
    beakerPO.checkLegendIsPresent(idxCell, 0);
    beakerPO.checkLegendIsPresent(idxCell, 1);

    expect(beakerPO.getCodeCellOutputContainerTitle(idxCell, 0)).toBe("Linear x, Log y");
    expect(beakerPO.getCodeCellOutputContainerTitle(idxCell, 1)).toBe("Linear x, Linear y");

    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 1, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(idxCell, 1, 1).element(by.tagName('circle')).isPresent()).toBe(true);
  });

  it('Date Objects for the Time Coordinate', function() {
    var idxCell = 24;
    beakerPO.checkPlotIsPresent(idxCell);
    beakerPO.checkLegendIsPresent(idxCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 1), 'plot-point');
  });

  it('Nanosecond Resolution', function() {
    var idxCell = 25;
    beakerPO.checkPlotIsPresent(idxCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(idxCell, 0, 0), 'plot-point');
  });

});
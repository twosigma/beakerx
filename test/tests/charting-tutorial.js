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

    beakerPO.checkPlotIsPresent(0, 0);
    beakerPO.checkPlotIsPresent(0, 1);

    beakerPO.checkLegendIsPresent(0, 0);

    expect(beakerPO.getCodeCellOutputCombplotTitle(0)).toBe("US Treasuries");
    expect(beakerPO.getCodeCellOutputContainerYLabel(0, 0)).toBe("Interest Rate");
    expect(beakerPO.getCodeCellOutputContainerYLabel(0, 1)).toBe("Spread");

    /**
     * def p1 = new TimePlot(yLabel: "Interest Rate", crosshair: ch)
     */

    beakerPO.checkCount(beakerPO.getPlotMaing(0, 0).all(by.tagName('g')), 8);
    {
      // The top plot has 2 lines.

      /**
       * p1 << new Line(x: rates.time, y: rates.m3, displayName: "3 month")
       */
      beakerPO.checkCount(beakerPO.getPlotSvgElementByIndex(0, 0, 0).all(by.tagName('circle')), 313);
      /**
       * p1 << new Line(x: rates.time, y: rates.y10, displayName: "10 year")
       */
      beakerPO.checkCount(beakerPO.getPlotSvgElementByIndex(0, 0, 1).all(by.tagName('circle')), 313);

      /**
       * def l1 = new ConstantLine(x: lehmanDate, style: StrokeType.DOT, color: Color.gray)
       * def l2 = new ConstantLine(x: bubbleBottomDate, style: StrokeType.DOT, color: Color.gray)
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 0, 2), 'plot-constline');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 0, 3), 'plot-constline');

      /**
       * def b1 = new ConstantBand(x: inversion1, color: new Color(240, 100, 100, 55))
       * def b2 = new ConstantBand(x: inversion2, color: new Color(240, 100, 100, 55))
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 0, 4), 'plot-constband');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 0, 5), 'plot-constband');

      /**
       * p1 << new Text(x: lehmanDate, y: 7.5, text: "Lehman Brothers Bankruptcy")
       * p1 << new Text(x: bubbleBottomDate, y: 5.75, text: "Stocks Hit Bottom")
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 0, 6), 'plot-text');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 0, 7), 'plot-text');
    }


    /**
     * def p2 = new TimePlot(yLabel: "Spread", crosshair: ch)
     */
    beakerPO.checkCount(beakerPO.getPlotMaing(0, 1).all(by.tagName('g')), 5);

    {
      // The bottom plot has an area filled in.
      /**
       *  p2 << new Area(x: rates.time, y: rates.spread, color: new Color(120, 60, 0))
       */
      expect(beakerPO.getPlotSvgElementByIndex(0, 1, 0).element(by.css('.plot-area')).isPresent()).toBe(true);

      /**
       * def l1 = new ConstantLine(x: lehmanDate, style: StrokeType.DOT, color: Color.gray)
       * def l2 = new ConstantLine(x: bubbleBottomDate, style: StrokeType.DOT, color: Color.gray)
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 1, 1), 'plot-constline');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 1, 2), 'plot-constline');

      /**
       * def b1 = new ConstantBand(x: inversion1, color: new Color(240, 100, 100, 55))
       * def b2 = new ConstantBand(x: inversion2, color: new Color(240, 100, 100, 55))
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 1, 3), 'plot-constband');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 1, 4), 'plot-constband');
    }
  });


  it('Simple Automatic Plot', function() {
    beakerPO.checkPlotIsPresent(4);
    beakerPO.checkLegendIsPresent(4);
    expect(beakerPO.getPlotSvgElementByIndex(4, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(4, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
  });

  it('Scatter Plot', function() {
    beakerPO.checkPlotIsPresent(5);
    beakerPO.checkLegendIsPresent(5);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(5, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(5, 0, 1), 'plot-point');

    expect(beakerPO.getPlotSvgElementByIndex(5, 0, 2).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(5, 0, 3).element(by.tagName('circle')).isPresent()).toBe(true);
  });


  it('Title and Axis Labels', function() {
    beakerPO.checkPlotIsPresent(7);

    expect(beakerPO.getCodeCellOutputContainerTitle(7)).toBe("We Will Control the Title");
    expect(beakerPO.getCodeCellOutputContainerYLabel(7)).toBe("Vertical");
    expect(beakerPO.getCodeCellOutputContainerXLabel(7)).toBe("Horizontal");
  });

  it('Lines', function() {
    beakerPO.checkPlotIsPresent(8);
    expect(beakerPO.getPlotSvgElementByIndex(8, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
  });

  it('Stems', function() {
    beakerPO.checkPlotIsPresent(10);
    expect(beakerPO.getPlotSvgElementByIndex(10, 0, 0).element(by.tagName('line')).isPresent()).toBe(true);
  });

  it('Bars', function() {
    beakerPO.checkPlotIsPresent(12);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(12, 0, 0), 'plot-bar');
    expect(beakerPO.getCodeCellOutputContainerTitle(12)).toBe("Bars");
  });

  it('Points', function() {
    beakerPO.checkPlotIsPresent(13);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(13, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(13, 0, 1), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(13, 0, 2), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(13, 0, 3), 'plot-point');
    expect(beakerPO.getCodeCellOutputContainerTitle(13)).toBe("Changing Point Size, Color, Shape");
  });

  it('Areas', function() {
    beakerPO.checkPlotIsPresent(15);
    expect(beakerPO.getPlotSvgElementByIndex(15, 0, 0).element(by.tagName('polygon')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(15, 0, 1).element(by.tagName('polygon')).isPresent()).toBe(true);
  });


  it('Constant Lines', function() {
    beakerPO.checkPlotIsPresent(18);

    expect(beakerPO.getPlotSvgElementByIndex(18, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(18, 0, 1), 'plot-constline');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(18, 0, 2), 'plot-constline');
  });

  it('Constant Bands', function() {
    beakerPO.checkPlotIsPresent(19);

    expect(beakerPO.getPlotSvgElementByIndex(19, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(19, 0, 1), 'plot-constband');
  });

  it('Text', function() {
    beakerPO.checkPlotIsPresent(21);

    expect(beakerPO.getPlotSvgElementByIndex(21, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 1), 'plot-point');

    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 2), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 3), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 4), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 5), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 6), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 7), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 8), 'plot-text');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 9), 'plot-text');
  });

  it('Simple Time Plot', function() {
    beakerPO.checkPlotIsPresent(23);
    beakerPO.checkLegendIsPresent(23);

    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(23, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(23, 0, 1), 'plot-point');

    expect(beakerPO.getCodeCellOutputContainerYLabel(23)).toBe("Price");
    expect(beakerPO.getCodeCellOutputContainerXLabel(23)).toBe("Time");

  });

  it('Second Y Axis', function () {
    beakerPO.checkPlotIsPresent(24);
    beakerPO.checkLegendIsPresent(24);

    expect(beakerPO.getCodeCellOutputContainerYLabel(24)).toBe("Interest Rates");
    expect(beakerPO.getCodeCellOutputContainerXLabel(24)).toBe("Time");
    expect(beakerPO.getCodeCellOutputContainerYRLabel(24)).toBe("Spread");
  });

  it('Logarithmic Scale', function() {
    beakerPO.checkPlotIsPresent(25, 0);
    beakerPO.checkPlotIsPresent(25, 1);
    beakerPO.checkLegendIsPresent(25, 0);
    beakerPO.checkLegendIsPresent(25, 1);

    expect(beakerPO.getCodeCellOutputContainerTitle(25, 0)).toBe("Linear x, Log y");
    expect(beakerPO.getCodeCellOutputContainerTitle(25, 1)).toBe("Linear x, Linear y");

    expect(beakerPO.getPlotSvgElementByIndex(25, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(25, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(25, 1, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(25, 1, 1).element(by.tagName('circle')).isPresent()).toBe(true);
  });

  it('Date Objects for the Time Coordinate', function() {
    beakerPO.checkPlotIsPresent(27);
    beakerPO.checkLegendIsPresent(27);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(27, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(27, 0, 1), 'plot-point');
  });

  it('Nanosecond Resolution', function() {
    beakerPO.checkPlotIsPresent(28);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(28, 0, 0), 'plot-point');
  });

});
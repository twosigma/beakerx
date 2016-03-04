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

describe('Charting Tutorial', function() {

  beforeEach(function() {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL+"beaker/#/open?uri=file:config%2Ftutorials%2FchartingTutorial.bkr&readOnly=true");

    browser.waitForAngular();
    beakerPO.waitUntilLoadingIndicator();

  });

  afterEach(function(done) {
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
    browser.executeScript("$('.code-cell-output')[0].scrollIntoView();");


    /**
     * def p1 = new TimePlot(yLabel: "Interest Rate", crosshair: ch)
     */

    browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(0) svg #maing g').length").then(function (result) {
      expect(result).toBe(8)
    });

    {
      // The top plot has 2 lines.

      /**
       * p1 << new Line(x: rates.time, y: rates.m3, displayName: "3 month")
       */
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(0) svg #maing g:eq(0) circle').length").then(function (result) {
        expect(result).toBe(313)
      });

      /**
       * p1 << new Line(x: rates.time, y: rates.y10, displayName: "10 year")
       */
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(0) svg #maing g:eq(1) circle').length").then(function (result) {
        expect(result).toBe(313)
      });

      /**
       * def l1 = new ConstantLine(x: lehmanDate, style: StrokeType.DOT, color: Color.gray)
       * def l2 = new ConstantLine(x: bubbleBottomDate, style: StrokeType.DOT, color: Color.gray)
       */
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(0) svg #maing g:eq(2)').attr('class')").then(function (result) {
        expect(result).toBe('plot-constline')
      });
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(0) svg #maing g:eq(3)').attr('class')").then(function (result) {
        expect(result).toBe('plot-constline')
      });

      /**
       * def b1 = new ConstantBand(x: inversion1, color: new Color(240, 100, 100, 55))
       * def b2 = new ConstantBand(x: inversion2, color: new Color(240, 100, 100, 55))
       */
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(0) svg #maing g:eq(4)').attr('class')").then(function (result) {
        expect(result).toBe('plot-constband')
      });
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(0) svg #maing g:eq(5)').attr('class')").then(function (result) {
        expect(result).toBe('plot-constband')
      });

      /**
       * p1 << new Text(x: lehmanDate, y: 7.5, text: "Lehman Brothers Bankruptcy")
       * p1 << new Text(x: bubbleBottomDate, y: 5.75, text: "Stocks Hit Bottom")
       */
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(0) svg #maing g:eq(6)').attr('class')").then(function (result) {
        expect(result).toBe('plot-text')
      });
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(0) svg #maing g:eq(7)').attr('class')").then(function (result) {
        expect(result).toBe('plot-text')
      });
    }


    /**
     * def p2 = new TimePlot(yLabel: "Spread", crosshair: ch)
     */

    browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(1) svg #maing g').length").then(function (result) {
      expect(result).toBe(5)
    });
    {
      // The bottom plot has an area filled in.
      /**
       *  p2 << new Area(x: rates.time, y: rates.spread, color: new Color(120, 60, 0))
       */
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(1) svg #maing g:eq(0) .plot-area').length").then(function (result) {
        expect(result).toBe(1)
      });

      /**
       * def l1 = new ConstantLine(x: lehmanDate, style: StrokeType.DOT, color: Color.gray)
       * def l2 = new ConstantLine(x: bubbleBottomDate, style: StrokeType.DOT, color: Color.gray)
       */
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(1) svg #maing g:eq(1)').attr('class')").then(function (result) {
        expect(result).toBe('plot-constline')
      });
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(1) svg #maing g:eq(2)').attr('class')").then(function (result) {
        expect(result).toBe('plot-constline')
      });

      /**
       * def b1 = new ConstantBand(x: inversion1, color: new Color(240, 100, 100, 55))
       * def b2 = new ConstantBand(x: inversion2, color: new Color(240, 100, 100, 55))
       */
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(1) svg #maing g:eq(3)').attr('class')").then(function (result) {
        expect(result).toBe('plot-constband')
      });
      browser.executeScript("return $('.code-cell-output:eq(0) .plot-plotcontainer:eq(1) svg #maing g:eq(4)').attr('class')").then(function (result) {
        expect(result).toBe('plot-constband')
      });
    }
  });


  //it('Simple Automatic Plot', function() {
  //  browser.executeScript("$('.code-cell-output')[4].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Scatter Plot', function() {
  //  browser.executeScript("$('.code-cell-output')[5].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  ////Creating a Plot
  //
  //it('Title and Axis Labels', function() {
  //  browser.executeScript("$('.code-cell-output')[7].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Lines', function() {
  //  browser.executeScript("$('.code-cell-output')[8].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Stems', function() {
  //  browser.executeScript("$('.code-cell-output')[10].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Bars', function() {
  //  browser.executeScript("$('.code-cell-output')[12].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Points', function() {
  //  browser.executeScript("$('.code-cell-output')[13].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Areas', function() {
  //  browser.executeScript("$('.code-cell-output')[15].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Stacking', function() {
  //  browser.executeScript("$('.code-cell-output')[17].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Constant Lines', function() {
  //  browser.executeScript("$('.code-cell-output')[18].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Constant Bands', function() {
  //  browser.executeScript("$('.code-cell-output')[19].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Text', function() {
  //  browser.executeScript("$('.code-cell-output')[21].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Simple Time Plot', function() {
  //  browser.executeScript("$('.code-cell-output')[23].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Second Y Axis', function() {
  //  browser.executeScript("$('.code-cell-output')[24].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Logarithmic Scale', function() {
  //  browser.executeScript("$('.code-cell-output')[25].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Date Objects for the Time Coordinate', function() {
  //  browser.executeScript("$('.code-cell-output')[27].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});
  //
  //it('Nanosecond Resolution', function() {
  //  browser.executeScript("$('.code-cell-output')[28].scrollIntoView();");
  //  expect(true).toEqual(true);
  //});

});
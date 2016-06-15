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


var BeakerPageObject = require('../../beaker.po.js');
var path = require('path');
var beakerPO;

describe('Charting Tutorial', function () {

  beforeAll(function(done) {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FchartingTutorial.bkr&readOnly=true").then(done);
    beakerPO.waitUntilLoadingCellOutput();
    browser.driver.manage().window().maximize();
  });

  afterAll(function(done){
    beakerPO.createScreenshot('chartingTutorial1');
    done();
  });

  it('Custom Plot Example', function () {
    var idCell = "code42QbvS";
    beakerPO.checkPlotIsPresentByIdCell(idCell, 0);
    beakerPO.checkPlotIsPresentByIdCell(idCell, 1);
    beakerPO.createScreenshot('customPlotExample');
    beakerPO.checkLegendIsPresentByIdCell(idCell, 0);

    expect(beakerPO.getCodeCellOutputCombplotTitleByIdCell(idCell)).toBe("US Treasuries");
    expect(beakerPO.getCodeCellOutputContainerYLabelByIdCell(idCell, 0)).toBe("Interest Rate");
    expect(beakerPO.getCodeCellOutputContainerYLabelByIdCell(idCell, 1)).toBe("Spread");

    beakerPO.checkSaveAsSvgPngByIdCell(idCell, "US Treasuries");

    /**
     * def p1 = new TimePlot(yLabel: "Interest Rate", crosshair: ch)
     */

    beakerPO.checkCount(beakerPO.getPlotMaingByIdCell(idCell, 0).all(by.tagName('g')), 8);
    {
      // The top plot has 2 lines.

      /**
       * p1 << new Line(x: rates.time, y: rates.m3, displayName: "3 month")
       */
      beakerPO.checkCount(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).all(by.tagName('circle')), 313);
      /**
       * p1 << new Line(x: rates.time, y: rates.y10, displayName: "10 year")
       */
      beakerPO.checkCount(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).all(by.tagName('circle')), 313);

      /**
       * def l1 = new ConstantLine(x: lehmanDate, style: StrokeType.DOT, color: Color.gray)
       * def l2 = new ConstantLine(x: bubbleBottomDate, style: StrokeType.DOT, color: Color.gray)
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 2), 'plot-constline');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 3), 'plot-constline');

      /**
       * def b1 = new ConstantBand(x: inversion1, color: new Color(240, 100, 100, 55))
       * def b2 = new ConstantBand(x: inversion2, color: new Color(240, 100, 100, 55))
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 4), 'plot-constband');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 5), 'plot-constband');

      /**
       * p1 << new Text(x: lehmanDate, y: 7.5, text: "Lehman Brothers Bankruptcy")
       * p1 << new Text(x: bubbleBottomDate, y: 5.75, text: "Stocks Hit Bottom")
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 6), 'plot-text');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 7), 'plot-text');
    }


    /**
     * def p2 = new TimePlot(yLabel: "Spread", crosshair: ch)
     */
    beakerPO.checkCount(beakerPO.getPlotMaingByIdCell(idCell, 1).all(by.tagName('g')), 5);

    {
      // The bottom plot has an area filled in.
      /**
       *  p2 << new Area(x: rates.time, y: rates.spread, color: new Color(120, 60, 0))
       */
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 1, 0).element(by.css('.plot-area')).isPresent()).toBe(true);

      /**
       * def l1 = new ConstantLine(x: lehmanDate, style: StrokeType.DOT, color: Color.gray)
       * def l2 = new ConstantLine(x: bubbleBottomDate, style: StrokeType.DOT, color: Color.gray)
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 1, 1), 'plot-constline');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 1, 2), 'plot-constline');

      /**
       * def b1 = new ConstantBand(x: inversion1, color: new Color(240, 100, 100, 55))
       * def b2 = new ConstantBand(x: inversion2, color: new Color(240, 100, 100, 55))
       */
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 1, 3), 'plot-constband');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 1, 4), 'plot-constband');
    }
  });


  it('Simple Automatic Plot', function() {
    var idCell = "codePZwpbQ";
    beakerPO.scrollToBkCellByIdCell(idCell);
    beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    beakerPO.checkLegendIsPresentByIdCell(idCell);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
  });

  it('Scatter Plot', function() {
    var idCell = "code0gsBBt";
    beakerPO.scrollToBkCellByIdCell(idCell);
    beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    beakerPO.checkLegendIsPresentByIdCell(idCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-point');

    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 2).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 3).element(by.tagName('circle')).isPresent()).toBe(true);
  });

});
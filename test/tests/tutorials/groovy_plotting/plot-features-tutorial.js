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

describe('Catalog of Plot APIs and Features', function (done) {

    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Fplot-features.bkr&readOnly=true")
        .then(done)
        .then(beakerPO.waitUntilLoadingCellOutput());

  /**
   * Testing
   *  - CombinedPlot
   *  - TimePlot
   *  - Line
   *  - Area
   *  - Text
   */
  it('Title and Axis Labels', function() {
    var idCell = "codeH2ee1d";
    beakerPO.scrollToBkCellByIdCell(idCell);
    beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
    beakerPO.checkPlotIsPresentByIdCell(idCell);

    expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("We Will Control the Title");
    expect(beakerPO.getCodeCellOutputContainerYLabelByIdCell(idCell)).toBe("Vertical");
    expect(beakerPO.getCodeCellOutputContainerXLabelByIdCell(idCell)).toBe("Horizontal");
  });

  it('Lines', function() {
    var idCell = "codeXtjWnc";
    beakerPO.scrollToBkCellByIdCell(idCell);
    beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
  });

  it('Stems', function() {
    var idCell = "code4NJX5d";
    beakerPO.scrollToBkCellByIdCell(idCell);
    beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).element(by.tagName('line')).isPresent()).toBe(true);
  });

  it('Bars', function() {
    var idCell = "codefbZDMO";
    beakerPO.scrollToBkCellByIdCell(idCell);
    beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
    expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Bars");
  });

  it('Points', function() {
    var idCell = "codeSb2uCM";
    beakerPO.scrollToBkCellByIdCell(idCell);
    beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 2), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 3), 'plot-point');
    expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Changing Point Size, Color, Shape");
  });

  it('Areas', function() {
    var idCell = "codeZ7NCfO";
    beakerPO.scrollToBkCellByIdCell(idCell);
    beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).element(by.tagName('polygon')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).element(by.tagName('polygon')).isPresent()).toBe(true);
  });

});
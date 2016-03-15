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

describe('Category Plots (Bar Charts)', function () {

  beforeEach(function () {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FCategoryPlot.bkr&readOnly=true");

    browser.waitForAngular();
    beakerPO.waitUntilLoadingFinished();

  });

  afterEach(function (done) {
    beakerPO.closeNotebook()
      .then(done);
  });

  it('Input values', function () {
    beakerPO.checkPlotIsPresent(0);

    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 0, 0), 'plot-bar');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(0, 0, 1), 'plot-bar');

    beakerPO.checkCount(beakerPO.getPlotMaing(0, 0).all(by.tagName('rect')), 6);
  });

  it('Size', function () {
    beakerPO.checkPlotIsPresent(1);
    beakerPO.checkSize(beakerPO.getPlotSvg(1, 0), 400, 200);
  });

  it('Title and Axis Labels', function () {
    beakerPO.checkPlotIsPresent(2);

    expect(beakerPO.getCodeCellOutputContainerYLabel(2)).toBe("Values");
    expect(beakerPO.getCodeCellOutputContainerXLabel(2)).toBe("Categories");
    expect(beakerPO.getCodeCellOutputContainerTitle(2)).toBe("Hello CategoryPlot!");
  });

  it('Category Names', function () {
    beakerPO.checkPlotIsPresent(3);

    expect(beakerPO.getPlotLabelg(3).element(By.id('label_x_0')).getText()).toBe('Helium');
    expect(beakerPO.getPlotLabelg(3).element(By.id('label_x_1')).getText()).toBe('Neon');
    expect(beakerPO.getPlotLabelg(3).element(By.id('label_x_2')).getText()).toBe('Argon');
  });

  it('Series Names', function () {
    beakerPO.checkPlotIsPresent(4);

    beakerPO.checkPlotLegentdLabel(4, 0, 1, 'Gas');
    beakerPO.checkPlotLegentdLabel(4, 0, 2, 'Liquid');

  });

  it('Category Label Orientation', function () {
    beakerPO.checkPlotIsPresent(8);

    var label_x_0 = beakerPO.getPlotLabelg(8).element(By.id('label_x_0'));
    var label_x_1 = beakerPO.getPlotLabelg(8).element(By.id('label_x_1'));
    var label_x_2 = beakerPO.getPlotLabelg(8).element(By.id('label_x_2'));

    expect(label_x_0.getText()).toBe('Acid');
    expect(label_x_1.getText()).toBe('Neutral');
    expect(label_x_2.getText()).toBe('Base');

    expect(label_x_0.getAttribute('transform')).toContain('translate(12 -10) rotate(45');
    expect(label_x_1.getAttribute('transform')).toContain('translate(20.5 -10) rotate(45');
    expect(label_x_2.getAttribute('transform')).toContain('translate(13 -10) rotate(45');

  });

  it('Single Color', function () {
    beakerPO.checkPlotIsPresent(11);
    var style = 'fill: rgb(255, 175, 175); fill-opacity: 1; stroke-opacity: 0;';
    expect(beakerPO.getPlotSvgElementByIndex(11, 0, 0).getAttribute('style')).toBe(style);
    expect(beakerPO.getPlotSvgElementByIndex(11, 0, 1).getAttribute('style')).toBe(style);
    expect(beakerPO.getPlotSvgElementByIndex(11, 0, 2).getAttribute('style')).toBe(style);
  });

  it('CategoryStems', function () {
    beakerPO.checkPlotIsPresent(21);

    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 0), 'plot-stem');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(21, 0, 1), 'plot-stem');

  });

  it('CategoryPoints', function () {
    beakerPO.checkPlotIsPresent(22);

    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(22, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(22, 0, 1), 'plot-point');
  });

  it('CategoryLines', function () {
    beakerPO.checkPlotIsPresent(23);

    expect(beakerPO.getPlotSvgElementByIndex(23, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(23, 0, 0).element(by.tagName('path')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(23, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndex(23, 0, 1).element(by.tagName('path')).isPresent()).toBe(true);
  });

  it('From a table (list of Maps)', function () {
    beakerPO.checkPlotIsPresent(33);

    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(33, 0, 0), 'plot-bar');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(33, 0, 1), 'plot-bar');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndex(33, 0, 2), 'plot-bar');

    expect(beakerPO.getPlotLabelg(33).element(By.id('label_x_0')).getText()).toBe('closePrice_mean');
    expect(beakerPO.getPlotLabelg(33).element(By.id('label_x_1')).getText()).toBe('highPrice_mean');
    expect(beakerPO.getPlotLabelg(33).element(By.id('label_x_2')).getText()).toBe('lowPrice_mean');
    expect(beakerPO.getPlotLabelg(33).element(By.id('label_x_3')).getText()).toBe('openPrice_mean');

    beakerPO.checkPlotLegentdLabel(33, 0, 1, 'A');
    beakerPO.checkPlotLegentdLabel(33, 0, 2, 'B');
    beakerPO.checkPlotLegentdLabel(33, 0, 3, 'C');
  });

});
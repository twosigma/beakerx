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

  beforeEach(function (done) {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FCategoryPlot.bkr&readOnly=true")
      .then(done)
      .then(beakerPO.waitUntilLoadingCellOutput());
  });

  it('Category Plots (Bar Charts)', function () {
    /* Input values */
    var idCell = "codegJO0X1";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-bar');


    /* Size */
    idCell = "code7tZ3dr";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    beakerPO.checkSize(beakerPO.getPlotSvgByIdCell(idCell, 0), 400, 200);

    /* Title and Axis Labels */
    idCell = "codedWtzu7";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    expect(beakerPO.getCodeCellOutputContainerYLabelByIdCell(idCell)).toBe("Values");
    expect(beakerPO.getCodeCellOutputContainerXLabelByIdCell(idCell)).toBe("Categories");
    expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Hello CategoryPlot!");

    /* Category Names */
    idCell = "code41YRgl";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_0')).getText()).toBe('Helium');
    expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_1')).getText()).toBe('Neon');
    expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_2')).getText()).toBe('Argon');

    /* Series Names */
    idCell = "code6t65Jt";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 1, 'Gas');
    beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 2, 'Liquid');

    /* Category Label Orientation */
    idCell = "codeaGosEG";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    var label_x_0 = beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_0'));
    var label_x_1 = beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_1'));
    var label_x_2 = beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_2'));

    expect(label_x_0.getText()).toBe('Acid');
    expect(label_x_1.getText()).toBe('Neutral');
    expect(label_x_2.getText()).toBe('Base');

    expect(label_x_0.getAttribute('transform')).toContain('translate');
    expect(label_x_1.getAttribute('transform')).toContain('translate');
    expect(label_x_2.getAttribute('transform')).toContain('translate');

    expect(label_x_0.getAttribute('transform')).toContain('rotate');
    expect(label_x_1.getAttribute('transform')).toContain('rotate');
    expect(label_x_2.getAttribute('transform')).toContain('rotate');

    /* Single Color */
    idCell = "codem4cZE9";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    var style = 'fill: rgb(255, 175, 175); fill-opacity: 1; stroke-opacity: 0;';
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).getAttribute('style')).toBe(style);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).getAttribute('style')).toBe(style);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 2).getAttribute('style')).toBe(style);

    /* CategoryStems */
    idCell = "codeDocK5W";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-stem');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-stem');

    /* CategoryPoints */
    idCell = "code95xQ79";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-point');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-point');

    /* CategoryLines */
    idCell = "codeJcHFBr";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).element(by.tagName('path')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
    expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).element(by.tagName('path')).isPresent()).toBe(true);

    /* From a table (list of Maps) */
    idCell = "codeX3eXQH";
    beakerPO.checkPlotIsPresentByIdCell(idCell);
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-bar');
    beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 2), 'plot-bar');

    expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_0')).getText()).toBe('closePrice_mean');
    expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_1')).getText()).toBe('highPrice_mean');
    expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_2')).getText()).toBe('lowPrice_mean');
    expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_3')).getText()).toBe('openPrice_mean');

    beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 1, 'A');
    beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 2, 'B');
    beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 3, 'C');
  });

});
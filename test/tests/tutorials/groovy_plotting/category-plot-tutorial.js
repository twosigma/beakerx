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

describe('Category Plots (Bar Charts)', function (done) {

  beforeAll(function(done){
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FCategoryPlot.bkr&readOnly=true").then(done);
    beakerPO.waitUntilLoadingFinished();
    browser.driver.manage().window().maximize();
  });

  describe('Category Plots', function(){
    it('Input values', function () {
      var idCell = "codegJO0X1";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-bar');
    });

    it('Size', function () {
      var idCell = "code7tZ3dr";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkSize(beakerPO.getPlotSvgByIdCell(idCell, 0), 400, 200);
    });

    it('Title and Axis Labels', function () {
      var idCell = "codedWtzu7";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getCodeCellOutputContainerYLabelByIdCell(idCell)).toBe("Values");
      expect(beakerPO.getCodeCellOutputContainerXLabelByIdCell(idCell)).toBe("Categories");
      expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Hello CategoryPlot!");
    });

    it('Category Names', function () {
      var idCell = "code41YRgl";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_0')).getText()).toBe('Helium');
      expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_1')).getText()).toBe('Neon');
      expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_2')).getText()).toBe('Argon');
    });

    it('Series Names', function () {
      var idCell = "code6t65Jt";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 0, 'All');
      beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 1, 'Gas');
      beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 2, 'Liquid');
    });

    it('Legend', function () {
      var idCell = "codeKpFl9q";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 0, 'All');
      beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 1, 'Gas');
      beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 2, 'Liquid');

      idCell = "codeYQnjk3";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 0, 'All');
      beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 1, 'series0');
      beakerPO.checkPlotLegentdLabelByIdCell(idCell, 0, 2, 'series1');
    });

    it('Orientation', function () {
      var idCell = "codeF0j809";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_0')).isPresent()).toBe(true);
      expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_5')).isPresent()).toBe(true);
    });

    it('Category Label Orientation', function () {
      var idCell = "codeaGosEG";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
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
    });

      it('Should display 200% Category Margin', function () {
        var idCell = "codeS15uez";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        var rect00 = beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0'));
        rect00.getAttribute('width').then(function(w00){
          rect00.getAttribute('x').then(function(x00){
            beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_1')).getAttribute('x').then(function(x01){
              expect(Math.round((x01-x00)/w00)).toBe(Math.round(4.0));
            });
          });
        });
      });

      it('Single Series (Histogram)', function () {
        var idCell = "codexa39MJ";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(By.id("i0")).isPresent()).toBe(true);
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(By.id("i1")).isPresent()).toBe(false);
      });
  });

  describe('Graphics Properties', function() {
    it('Single Color', function () {
      var idCell = "codem4cZE9";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0')).getCssValue('fill').then(function(rgb){
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i1')).getCssValue('fill')).toBe(rgb);
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i2')).getCssValue('fill')).toBe(rgb);
      });
    });

    it('Color per Series', function () {
      var idCell = "codehZzEja";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0')).getCssValue('fill')).toBe('rgb(255, 0, 0)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i1')).getCssValue('fill')).toBe('rgb(128, 128, 128)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i2')).getCssValue('fill')).toBe('rgb(0, 0, 255)');
    });

    it('Color per Item', function () {
      var idCell = "code0kzOOq";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('fill')).toBe('rgb(255, 0, 0)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_0')).getCssValue('fill')).toBe('rgb(128, 128, 128)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i2_0')).getCssValue('fill')).toBe('rgb(0, 0, 255)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_1')).getCssValue('fill')).toBe('rgb(128, 128, 128)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_1')).getCssValue('fill')).toBe('rgb(128, 128, 128)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i2_1')).getCssValue('fill')).toBe('rgb(255, 175, 175)');
    });

    it('Heterogeneous Lists Work', function () {
      var idCell = "codeHigoVO";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0')).getCssValue('fill')).toBe('rgb(255, 175, 175)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_0')).getCssValue('fill')).toBe('rgb(255, 0, 0)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_1')).getCssValue('fill')).toBe('rgb(128, 128, 128)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_2')).getCssValue('fill')).toBe('rgb(0, 0, 255)');
    });
  });

  describe('CategoryBars', function() {
    it('Base', function () {
      var idCell = "codeH3z2AR";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkSubString(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_y_0')), "-2", 0, 2)

      idCell = "codeJRAwB0";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkSubString(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_y_0')), "-3", 0, 2)

      idCell = "codeth6zHV";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkSubString(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_y_0')), "-5", 0, 2)
    });

    it('Widths', function () {
      var idCell = "code8k1myK";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_0')).getAttribute('width').then(function(value10){
        beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('width').then(function(value03){
          expect(Math.round(0.3 * value10)).toBe(Math.round(value03));
        });
        beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_1')).getAttribute('width').then(function(value06){
          expect(Math.round(0.6 * value10)).toBe(Math.round(value06));
        });
        beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_2')).getAttribute('width').then(function(value17){
          expect(Math.round(1.7 * value10)).toBe(Math.round(value17));
        });
      });
    });

    it('Outline and Fill', function () {
      var idCell = "codeYUInXP";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0')).getCssValue('fill')).toBe('rgb(31, 119, 180)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i1')).getCssValue('fill')).toBe('rgb(255, 127, 14)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getCssValue('stroke')).toBe('rgb(0, 0, 0)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_0')).getCssValue('stroke')).toBe('rgb(255, 0, 0)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_1')).getCssValue('stroke')).toBe('none');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_1')).getCssValue('stroke')).toBe('rgb(255, 0, 0)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_2')).getCssValue('stroke')).toBe('rgb(0, 0, 0)');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_2')).getCssValue('stroke')).toBe('none');
    });

    it('CenterSeries', function () {
      var idCell = "codef0Sk6q";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i0')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i1')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('g#i2')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_0')).getText()).toBe('1');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_1')).getText()).toBe('2');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_2')).getText()).toBe('3');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_0')).getText()).toBe('3');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_1')).getText()).toBe('3');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_2')).getText()).toBe('5');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i2_0')).getText()).toBe('6');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i2_1')).getText()).toBe('4');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i2_2')).getText()).toBe('2');
    });
  });

  describe('Another categories', function(){
    it('CategoryStems', function () {
      var idCell = "codeDocK5W";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-stem');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-stem');
    });

    it('CategoryPoints', function () {
      var idCell = "code95xQ79";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-point');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-point');
    });

    it('CategoryLines', function () {
      var idCell = "codeJcHFBr";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).element(by.tagName('path')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).element(by.tagName('path')).isPresent()).toBe(true);
    });

    it('Combination Lines, Points, Stems', function(){
      var idCell = "codeGH7Gh6";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).element(by.tagName('circle')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0).element(by.tagName('path')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).element(by.tagName('path')).isPresent()).toBe(true);
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 2), 'plot-point');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 3), 'plot-point');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 4), 'plot-stem');
    });

    it('Combination Bars, Stems, Points', function(){
      var idCell = "codehSymU7";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-bar');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 2), 'plot-stem');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 3), 'plot-stem');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 4), 'plot-point');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 5), 'plot-point');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 6), 'plot-point');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 7), 'plot-point');
    });

    it('Multiple Y Axes', function(){
      var idCell = "codehpgzdV";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).element(by.tagName('circle')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1).element(by.tagName('path')).isPresent()).toBe(true);
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 2), 'plot-point');
      expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_x_0')).isPresent()).toBe(true);
      expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_y_0')).isPresent()).toBe(true);
      expect(beakerPO.getPlotLabelgByIdCell(idCell).element(By.id('label_yr_0')).isPresent()).toBe(true);
    });
  });

  describe('Labels', function(){
    it('Item Labels', function () {
      var idCell = "code80ZH0G";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-stem');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-stem');
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_0')), "-3", 0, 2);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_1')), "2", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_2')), "4", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_0')), "4", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_1')), "5", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_2')), "8", 0, 1);
    });

    it('CENTER(default) Label Position', function () {
      var idCell = "code1bWdPW";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-bar');
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_0')), "-5", 0, 2);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_1')), "2", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_2')), "3", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_0')), "1", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_1')), "3", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_2')), "5", 0, 1);
      beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_0')).getAttribute('y').then(function(y00){
        beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_1')).getAttribute('y').then(function(y01){
           expect(y00).toBeGreaterThan(y01);
        });
      });
      beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_2')).getAttribute('y').then(function(y02){
        beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_1')).getAttribute('y').then(function(y11){
          expect(y02).toBe(y11);
        });
      });
    });

    it('BASE_OUTSIDE Label Position', function () {
      var idCell = "codelyikDa";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-bar');
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_0')), "-5", 0, 2);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_1')), "2", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_2')), "3", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_0')), "1", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_1')), "3", 0, 1);
      beakerPO.checkSubString(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_2')), "5", 0, 1);
      beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_0')).getAttribute('y').then(function(y00){
        beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_1')).getAttribute('y').then(function(y01){
          expect(y00).toBeLessThan(y01);
        });
      });
      beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i0_2')).getAttribute('y').then(function(y02){
        beakerPO.getPlotSvgByIdCell(idCell).element(by.css('text#label_i1_0')).getAttribute('y').then(function(y10){
          expect(y02).toBe(y10);
        });
      });

      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('filter')).toBeNull();
      browser.actions().mouseMove(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0'))).perform().then(function(){
        browser.wait(beakerPO.EC.presenceOf(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('filter')), 20000).then(
          function(){
            return true;
          },
          function(error){
            expect(error).toBe('tooltip is displayed');
          });
      });
    });

    it('Disable ToolTips', function () {
      var idCell = "codedXWy9R";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 0), 'plot-bar');
      beakerPO.checkClass(beakerPO.getPlotSvgElementByIndexByIdCell(idCell, 0, 1), 'plot-bar');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('filter')).toBeNull();
      browser.actions().mouseMove(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0'))).perform().then(function(){
        expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).getAttribute('filter')).toBeNull();
      });
    });
  });

  describe('Preparing Input Values', function(){
    it('Swapping row and columns', function () {
      var idCell = "code5wpJyX";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_0')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i0_1')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_0')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i1_1')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i2_0')).isPresent()).toBe(true);
      expect(beakerPO.getPlotSvgByIdCell(idCell).element(by.css('rect#i2_1')).isPresent()).toBe(true);
    });

    it('From a table (list of Maps)', function () {
      var idCell = "codeM916xG";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Table');

      idCell = "codeX3eXQH";
      beakerPO.scrollToBkCellByIdCell(idCell);
      beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');

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

});
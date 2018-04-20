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

var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('(Groovy) Testing of MIME types', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/MimeTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Groovy) Display MIME types', function () {
    var testValues = {
      mathematicalSymbols: 'α2+η',
      headerText: 'Hello, world!',
      markdownTestValue: "It's very easy to do bold and italics:",
      markdownBoldValue: "bold",
      markdownItalicsValue: "italics",
      mathematicalFormula: 'F(k)=∫',
    };

    it('Cell outputs mathematical symbols', function () {
      cellIndex = 0;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      browser.waitUntil(function () {
        return codeCell.$('div.output_result').getText() === testValues.mathematicalSymbols;
      })
    });

    it('Cell displays html code', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      browser.waitUntil(function () {
        return codeCell.$('div.output_result > h1').getText() === testValues.headerText;
      })


    });

    it('Cell displays html code', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result > h2').getText()).toBe(testValues.headerText);
    });

    it('Cell displays html code', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result > h3').getText()).toBe(testValues.headerText);
    });

    it('Cell outputs mathematical symbols', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      browser.waitUntil(function () {
        return codeCell.$('div.output_result').getText() === testValues.mathematicalSymbols;
      })
    });

    it('Cell outputs multiple file links', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      var fileLinks = codeCell.$$('div.output_subarea > a')

      expect(fileLinks.length).toBeGreaterThan(0);
    });

    it('Cell outputs single file link', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_subarea > a').getText()).toBe('GroovyTest.ipynb')
    });

    it('Cell displays markdown', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_subarea > p').getText()).toBe(testValues.markdownTestValue);
      expect(codeCell.$('div.output_subarea > p > strong').getText()).toBe(testValues.markdownBoldValue);
      expect(codeCell.$('div.output_subarea > p > em').getText()).toBe(testValues.markdownItalicsValue);
    });

    it('Cell displays mathematical formula', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_subarea').getText()).toContain(testValues.mathematicalFormula);
    });

    it('Cell displays an iFrame', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$("div.output_subarea > iframe[src='http://jupyter.org/']").isEnabled()).toBeTruthy();
    });

    it('Cell displays a Scribd document', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$("div.output_subarea > iframe[src='https://www.scribd.com/embeds/71048089/content?start_page=5&view_mode=slideshow']").isEnabled()).toBeTruthy();
    });

    it('Cell displays a Vimeo video', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$("div.output_subarea > iframe[src='https://player.vimeo.com/video/139304565']").isEnabled()).toBeTruthy();
    });

    it('Cell displays a YouTube video', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$("div.output_subarea > iframe[src='https://www.youtube.com/embed/gSVvxOchT8Y']").isEnabled()).toBeTruthy();
    });

    it('Cell displays video', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_subarea > video').isEnabled()).toBeTruthy();
    });

    it('Cell displays an SVG element', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_subarea > div > svg').isEnabled()).toBeTruthy();
    });

    it('Cell displays an SVG element from a file', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_subarea > div > svg').isEnabled()).toBeTruthy();
    });

    it('Cell displays an image element', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_subarea > img').isEnabled()).toBeTruthy();
    });

    it('Cell displays an image element from file', function () {
      cellIndex += 1;

      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_subarea > img').isEnabled()).toBeTruthy();
    });
  });
});

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

  function getAndWaitHtmlType(codeCell, index){
    browser.waitUntil(function () {
      var output = beakerxPO.getAllOutputsHtmlType(codeCell)[index];
      return output != null && output.isEnabled();
    }, 10000);
    return beakerxPO.getAllOutputsHtmlType(codeCell)[index];
  }

  function cleanCellOutput(index){
    var codeCell = beakerxPO.getCodeCellByIndex(index + 1);
    codeCell.scrollIntoView();
    codeCell.click();
    beakerxPO.clickCellAllOutputClear();
  }

  describe('(Groovy) Display MIME types ', function () {
    var testValues = {
      headerText: /Hello, world!/,
      markdownTestValue: /It's very easy to do bold and italics:/,
      markdownBoldValue: /bold/,
      markdownItalicsValue: /italics/,
      mathematicalFormula: /F\(k\)=∫f\(x\)2eπikdx/,
      groovyFileName: /GroovyTest.ipynb/
    };

    it('(IFrame) Cell displays an iFrame ', function () {
      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = getAndWaitHtmlType(codeCell, 0);
      expect(result.$('iframe[src="http://jupyter.org/"]').isEnabled()).toBeTruthy();
      cleanCellOutput(cellIndex);
    });

    it('(VimeoVideo) Cell displays a Vimeo video ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = getAndWaitHtmlType(codeCell, 0);
      expect(result.$('iframe[src="https://player.vimeo.com/video/139304565"]').isEnabled()).toBeTruthy();
      cleanCellOutput(cellIndex);
    });

    it('(YoutubeVideo) Cell displays a YouTube video ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = getAndWaitHtmlType(codeCell, 0);
      expect(result.$('iframe[src="https://www.youtube.com/embed/gSVvxOchT8Y"]').isEnabled()).toBeTruthy();
      cleanCellOutput(cellIndex);
    });

    it('(Video) Cell displays video ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = getAndWaitHtmlType(codeCell, 0);
      expect(result.$('video[src="https://archive.org/download/Sita_Sings_the_Blues/Sita_Sings_the_Blues_small.mp4"]').isEnabled()).toBeTruthy();
      cleanCellOutput(cellIndex);
    });

    it('(Latex) Cell outputs mathematical symbols ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result.charCodeAt(1).toString(16)).toEqual('defc');
      expect(result.charCodeAt(2).toString(16)).toEqual('2b');
      expect(result.charCodeAt(4).toString(16)).toEqual('df02');
    });

    it('(HTML) Cell displays html code ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsHtmlType(codeCell)[0];
      expect(result.$('h1').isExisting()).toBeTruthy();
      expect(result.getText()).toMatch(testValues.headerText);
    });

    it('(MIMEContainer) Cell displays html code ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsHtmlType(codeCell)[0];
      result.$('h2').waitForEnabled();
      expect(result.$('h2').isEnabled()).toBeTruthy();
      expect(result.getText()).toMatch(testValues.headerText);
    });

    it('(MIMEContainer.MIME.TEXT_HTML) Cell displays html code ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsHtmlType(codeCell)[0];
      expect(result.$('h3').isExisting()).toBeTruthy();
      expect(result.getText()).toMatch(testValues.headerText);
    });

    it('(MIMEContainer) Cell outputs mathematical symbols ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      browser.pause(1000);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result.charCodeAt(1).toString(16)).toEqual('defc');
      expect(result.charCodeAt(2).toString(16)).toEqual('2b');
      expect(result.charCodeAt(4).toString(16)).toEqual('df02');
    });

    it('(FileLinks) Cell outputs multiple file links ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsHtmlType(codeCell)[0];
      expect(result.$$('a').length).toBeGreaterThan(0);
    });

    it('(File Link) Cell outputs single file link ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsHtmlType(codeCell)[0];
      expect(result.$('a').getText()).toMatch(testValues.groovyFileName);
    });

    it('(Markdown) Cell displays markdown ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0];
      expect(result.getText()).toMatch(testValues.markdownTestValue);
      expect(result.$('strong').getText()).toMatch(testValues.markdownBoldValue);
      expect(result.$('em').getText()).toMatch(testValues.markdownItalicsValue);
    });

    it('(Math) Cell displays mathematical formula ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, testValues.mathematicalFormula);
    });

    it('(SVG) Cell displays an SVG element ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0];
      expect(result.$('svg').isEnabled()).toBeTruthy();
    });

    it('(SVG) Cell displays an SVG element from a file', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0];
      expect(result.$('svg').isEnabled()).toBeTruthy();
    });

    it('(Image) Cell displays an image element', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0];
      expect(result.$('img').isEnabled()).toBeTruthy();
    });

    it('(Image) Cell displays an image element from file', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0];
      expect(result.$('img').isEnabled()).toBeTruthy();
    });

    it('(Image) Cell displays an image element from byte array', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0];
      expect(result.$('img').isEnabled()).toBeTruthy();
    });

    it('(ScribdDocument) Cell displays a Scribd document ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = getAndWaitHtmlType(codeCell, 0);
      expect(result.$('iframe[src="https://www.scribd.com/embeds/71048089/content?start_page=5&view_mode=slideshow"]').isEnabled()).toBeTruthy();
    });
  });

});

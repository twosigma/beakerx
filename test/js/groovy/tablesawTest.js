/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
var PlotHelperObject = require('../plot.helper.js');
var beakerxPO;
var plotHelper;

describe('Tests for tablesaw lib. ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    plotHelper = new PlotHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/TablesawTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;
  var imageDir = 'groovy/tablesaw';

  describe('Import tablesaw jars. ', function () {
    it('Output contains names of jars. ', function () {
      cellIndex = 0;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfWidget(cellIndex, /tablesaw-beakerx/, 1);
    });
  });

  describe('Call tech.tablesaw.beakerx.TablesawDisplayer.register() method. ', function () {
    it('Output displays "null". ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /null/);
    });
  });

  describe('Call table.read() method. ', function () {
    it('Should displays table. ', function () {
      var width = 700, height = 100;
      cellIndex += 1;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell3_case1.png');
    });
  });

  describe('Call table.structure() method. ', function () {
    it('Should displays table structure. ', function () {
      var width = 250, height = 200;
      cellIndex += 2;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell4_case1.png');
    });
  });

  describe('Call table.columnNames() method. ', function () {
    it('Should displays column names. ', function () {
      cellIndex += 2;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex,
        /Date.*Time.*State.*State No.*Scale.*Injuries.*Fatalities.*Start Lat.*Start Lon.*Length.*Width/);
    });
  });

  describe('Call table.shape() method. ', function () {
    it('Should displays the row and column counts. ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /908 rows.*11 cols/);
    });
  });

  describe('Call table.first(10) method. ', function () {
    it('Should displays the first 10 rows. ', function () {
      var width = 700, height = 100;
      cellIndex += 1;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell7_case1.png');
    });
  });

  describe('Call table.summary() method. ', function () {
    it('Should summarize the data in each column. ', function () {
      cellIndex += 2;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /Table summary for: tornadoes_2014.csv/);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /Count.*908/);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /GA.*32 /);
    });
  });

  describe('Mapping operations (add column). ', function () {
    it('Should display new column name. ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex,
        /Date.*Time.*State.*State No.*Scale.*Injuries.*Fatalities.*Start Lat.*Start Lon.*Length.*Width.*Date month/);
    });
  });

  describe('Sorting by column. ', function () {
    it('Should sort "Fatalities" column. ', function () {
      var width = 700, height = 100;
      cellIndex += 1;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell11_case1.png');
    });
  });

  describe('Descriptive statistics. ', function () {
    it('Should display summary statistic. ', function () {
      var width = 160, height = 210;
      cellIndex += 2;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell12_case1.png');
    });
  });

  describe('Performing totals and sub-totals. ', function () {
    it('Should display totals and sub-totals. ', function () {
      var width = 180, height = 140;
      cellIndex += 2;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell13_case1.png');
    });
  });

  describe('Call CrossTab.xCount() method. ', function () {
    it('Should display cross tabs. ', function () {
      var width = 410, height = 200;
      cellIndex += 2;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell14_case1.png');
    });
  });

  describe('K-means clustering. ', function () {
    it('Create table from "whiskey.csv" file. ', function () {
      var width = 250, height = 200;
      cellIndex += 2;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell15_case1.png');

    });

    it('Gets the distortion for our model. ', function () {
      cellIndex += 2;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /K-Means distortion: 387,52701/);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /Clusters of 86 data points of dimension 12/);
    });

    it('Print centroids for each claster. ', function () {
      var width = 500, height = 100;
      cellIndex += 1;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell17_case1.png');
    });
  });

  describe('Play (Money)ball with Linear Regression. ', function () {
    it('Should display points Plot. ', function () {
      cellIndex += 2;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllPointsByGIndexAndType(svgElement, 0, 'rect').length).toBeGreaterThan(0);
    });

    it('Print the “winsModel”. ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex,
        /Residuals:\s*Min\s*1Q\s*Median\s*3Q\s*Max\s*-115,1010\s*-24,7084\s*-0,8748\s*23,9474\s*110,2269/);
    });

    it('Print the “winsModel” for OBP and SLG. ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex,
        /Residuals:\s*Min\s*1Q\s*Median\s*3Q\s*Max\s*-70.8379\s*-17.1810\s*-1.0917\s*16.7812\s*90.0358/);
    });

    it('Should display Histogram. ', function () {
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllGBarRects(svgElement, 0).length).toBeGreaterThan(10);
    });
  });

  describe('Using Quandl and Tablesaw. ', function () {
    it('Should display table. ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);

      var width = 500, height = 100;
      cellIndex += 1;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell34_case1.png');
    });

    it('Should display Plot with stems and line. ', function () {
      cellIndex += 2;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getLineByGIndex(svgElement, 1).getAttribute('d')).not.toBeNull();
      expect(plotHelper.getAllGStemLines(svgElement, 2).length).toBeGreaterThan(10);
    });
  });

});
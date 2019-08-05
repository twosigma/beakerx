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

import { expect } from 'chai';
import modelStateMock from "../mock/modelStateMock";
import cellDataMock from "../mock/cellDataMock";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import CellManager from "../../../../../src/tableDisplay/dataGrid/cell/CellManager";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('CellManager', () => {
  let dataGrid;
  let dataStore;
  let cellManager;
  let cellSelectionManager;

  before(() => {
    dataStore = createStore(modelStateMock);
    dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    cellManager = dataGrid.cellManager;
    cellSelectionManager = dataGrid.cellSelectionManager;
    cellSelectionManager.setStartCell(cellDataMock);
    cellSelectionManager.setEndCell({ ...cellDataMock, column: 1 });
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should be an instance of CellManager', () => {
    expect(cellManager).to.be.an.instanceof(CellManager);
  });

  it('should implement getSelectedCells method', () => {
    expect(cellManager).to.have.property('getSelectedCells');
    expect(cellManager.getSelectedCells).to.be.a('Function');
    expect(cellManager.getSelectedCells()).to.have.length(2);
  });

  it('should implement getAllCells method', () => {
    const allCells = cellManager.getAllCells();

    expect(cellManager).to.have.property('getAllCells');
    expect(cellManager.getAllCells).to.be.a('Function');
    expect(allCells).to.have.length(3);
    expect(allCells[0][0]).to.equal('index');
    expect(allCells[0][1]).to.equal('test');
  });

  it('should implement getCells method', () => {
    expect(cellManager).to.have.property('getCells');
    expect(cellManager.getCells).to.be.a('Function');
    const rowsRange = cellSelectionManager.getRowsRangeCells();
    const columnsRange = cellSelectionManager.getColumnsRangeCells();

    expect(cellManager.getCells(rowsRange, columnsRange)).to.have.length(2);
  });

  it('should implement copyToClipboard method', () => {
    expect(cellManager).to.have.property('copyToClipboard');
    expect(cellManager.copyToClipboard).to.be.a('Function');
  });

  it('should implement CSVDownload method', () => {
    expect(cellManager).to.have.property('CSVDownload');
    expect(cellManager.CSVDownload).to.be.a('Function');
  });

  it('should implement createCellConfig method', () => {
    expect(cellManager).to.have.property('createCellConfig');
    expect(cellManager.createCellConfig).to.be.a('Function');

    const cellConfig = cellManager.createCellConfig({
      row: 1,
      column: 1,
      value: 2,
      region: 'body'
    });

    expect(cellConfig.row).to.equal(1);
    expect(cellConfig.column).to.equal(1);
    expect(cellConfig.value).to.equal(2);
    expect(cellConfig.region).to.equal('body');

    expect(cellConfig).to.have.property('x');
    expect(cellConfig).to.have.property('y');
    expect(cellConfig).to.have.property('width');
    expect(cellConfig).to.have.property('height');
  });

  it('should implement exportCellsTo method', () => {
    expect(cellManager).to.have.property('exportCellsTo');
    expect(cellManager.exportCellsTo).to.be.a('Function');
    const cells = cellManager.getSelectedCells();
    const resultCsv = `"column"\n":)"\n`;
    const resultTabs = `column\n:)\n`;

    expect(cellManager.exportCellsTo(cells, 'csv')).to.equal(resultCsv);
    expect(cellManager.exportCellsTo(cells, 'tabs')).to.equal(resultTabs);
  });

  it('should implement getCSVFromCells method', () => {
    expect(cellManager).to.have.property('getCSVFromCells');
    expect(cellManager.getCSVFromCells).to.be.a('Function');
    const result = `"column"\n":)"\n`;

    expect(cellManager.getCSVFromCells(true)).to.equal(result);
  });
});

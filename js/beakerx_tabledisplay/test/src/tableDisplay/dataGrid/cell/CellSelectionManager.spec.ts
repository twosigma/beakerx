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
import cellConfigMock from "../mock/cellConfigMock";
import cellDataMock from "../mock/cellDataMock";
import {COLUMN_TYPES} from "../../../../../src/tableDisplay/dataGrid/column/enums";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import CellSelectionManager from "../../../../../src/tableDisplay/dataGrid/cell/CellSelectionManager";
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('CellSelectionManager', () => {
  let dataGrid;
  let dataStore;
  let cellSelectionManager;
  let startCell = { ...cellDataMock, type: COLUMN_TYPES.index };
  let endCell = { ...cellDataMock, row: 2, column: 3 };

  before(() => {
    dataStore = createStore(modelStateMock);
    dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    cellSelectionManager = dataGrid.cellSelectionManager;
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should be an instance of CellSelectionManager', () => {
    expect(cellSelectionManager).to.be.an.instanceof(CellSelectionManager);
  });

  it('should implement setStartCell method', () => {
    expect(cellSelectionManager).to.have.property('setStartCell');
    expect(cellSelectionManager.setStartCell).to.be.a('Function');

    cellSelectionManager.setStartCell(startCell);
    expect(cellSelectionManager.startCellData).to.equal(startCell);
  });

  it('should implement setEndCell method', () => {
    expect(cellSelectionManager).to.have.property('setEndCell');
    expect(cellSelectionManager.setEndCell).to.be.a('Function');

    cellSelectionManager.setEndCell(endCell);
    expect(cellSelectionManager.endCellData).to.equal(endCell);
  });

  it('should implement getColumnsRangeCells method', () => {
    expect(cellSelectionManager).to.have.property('getColumnsRangeCells');
    expect(cellSelectionManager.getColumnsRangeCells).to.be.a('Function');

    const columnRange = cellSelectionManager.getColumnsRangeCells();
    expect(columnRange.startCell).to.equal(startCell);
    expect(columnRange.endCell).to.equal(endCell);
  });

  it('should implement getRowsRangeCells method', () => {
    expect(cellSelectionManager).to.have.property('getRowsRangeCells');
    expect(cellSelectionManager.getRowsRangeCells).to.be.a('Function');

    const rowsRange = cellSelectionManager.getRowsRangeCells();
    expect(rowsRange.startCell).to.equal(startCell);
    expect(rowsRange.endCell).to.equal(endCell);
  });

  it('should implement isBetweenRows method', () => {
    expect(cellSelectionManager).to.have.property('isBetweenRows');
    expect(cellSelectionManager.isBetweenRows).to.be.a('Function');

    expect(cellSelectionManager.isBetweenRows(cellConfigMock)).to.be.true;
    expect(cellSelectionManager.isBetweenRows({ ...cellConfigMock, row: 3 })).to.be.false;
  });

  it('should implement isBetweenColumns method', () => {
    expect(cellSelectionManager).to.have.property('isBetweenColumns');
    expect(cellSelectionManager.isBetweenColumns).to.be.a('Function');

    expect(cellSelectionManager.isBetweenColumns(cellConfigMock)).to.be.true;
    expect(cellSelectionManager.isBetweenColumns({ ...cellConfigMock, column: 4 })).to.be.false;
  });

  it('should implement enable method', () => {
    expect(cellSelectionManager).to.have.property('enable');
    expect(cellSelectionManager.enable).to.be.a('Function');

    cellSelectionManager.enable();
    expect(cellSelectionManager.enabled).to.be.true;
  });

  it('should implement isSelected method', () => {
    expect(cellSelectionManager).to.have.property('isSelected');
    expect(cellSelectionManager.isSelected).to.be.a('Function');

    expect(cellSelectionManager.isSelected(cellConfigMock)).to.be.true;
    expect(cellSelectionManager.isSelected({ ...cellConfigMock, column: 4 })).to.be.false;
  });

  it('should implement getBackgroundColor method', () => {
    expect(cellSelectionManager).to.have.property('getBackgroundColor');
    expect(cellSelectionManager.getBackgroundColor).to.be.a('Function');

    expect(cellSelectionManager.getBackgroundColor(cellConfigMock)).to.equal(BeakerXThemeHelper.SELECTED_CELL_BACKGROUND);
    expect(cellSelectionManager.getBackgroundColor({ ...cellConfigMock, column: 4 })).to.equal('');
  });

  it('should implement clear method', () => {
    expect(cellSelectionManager).to.have.property('clear');
    expect(cellSelectionManager.clear).to.be.a('Function');

    cellSelectionManager.clear();
    expect(cellSelectionManager.enabled).to.be.false;
    expect(cellSelectionManager.startCellData).to.be.null;
    expect(cellSelectionManager.endCellData).to.be.null;
  });

});

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
import { BeakerxDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerxDataGrid";
import modelStateMock from "../mock/modelStateMock";
import CellFocusManager from "@beakerx/tableDisplay/dataGrid/cell/CellFocusManager";
import cellDataMock from "../mock/cellDataMock";
import cellConfigMock from "../mock/cellConfigMock";
import {
  DEFAULT_CELL_BACKGROUND,
  FOCUSED_CELL_BACKGROUND
} from "@beakerx/tableDisplay/dataGrid/style/dataGridStyle";
import {COLUMN_TYPES} from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";

describe('CellFocusManager', () => {
  let dataGrid;
  let cellFocusManager;
  let focusedCell = { ...cellDataMock };

  before(() => {
    dataGrid = new BeakerxDataGrid({}, modelStateMock);
    cellFocusManager = dataGrid.cellFocusManager;
  });

  after(() => {
    dataGrid.destroy();
  });

  it('should be an instance of CellFocusManager', () => {
    expect(cellFocusManager).to.be.an.instanceof(CellFocusManager);
  });

  it('should have the focusedCellData property', () => {
    expect(cellFocusManager).to.have.property('focusedCellData');
  });

  it('should implement setFocusedCell method', () => {
    expect(cellFocusManager).to.have.property('setFocusedCell');
    expect(cellFocusManager.setFocusedCell).to.be.a('Function');

    cellFocusManager.setFocusedCell(focusedCell);
    expect(cellFocusManager.focusedCellData).to.equal(focusedCell);
  });

  it('should implement getFocussedCellBackground method', () => {
    expect(cellFocusManager).to.have.property('getFocussedCellBackground');
    expect(cellFocusManager.getFocussedCellBackground).to.be.a('Function');
    expect(cellFocusManager.getFocussedCellBackground(cellConfigMock)).to.equal(FOCUSED_CELL_BACKGROUND);
    expect(cellFocusManager.getFocussedCellBackground({ ...cellConfigMock, column: 1 })).to.equal(DEFAULT_CELL_BACKGROUND);
  });

  it('should implement setFocusedCellByArrowKey method', () => {
    expect(cellFocusManager).to.have.property('setFocusedCellByArrowKey');
    expect(cellFocusManager.setFocusedCellByArrowKey).to.be.a('Function');

    cellFocusManager.setFocusedCellByArrowKey(39); // right arrow
    expect(cellFocusManager.focusedCellData.column).to.equal(1);
    expect(cellFocusManager.focusedCellData.row).to.equal(0);
    expect(cellFocusManager.focusedCellData.type).to.equal(COLUMN_TYPES.body);

    cellFocusManager.setFocusedCellByArrowKey(40); // down arrow
    expect(cellFocusManager.focusedCellData.column).to.equal(1);
    expect(cellFocusManager.focusedCellData.row).to.equal(1);
    expect(cellFocusManager.focusedCellData.type).to.equal(COLUMN_TYPES.body);

    cellFocusManager.setFocusedCellByArrowKey(37); // left arrow
    expect(cellFocusManager.focusedCellData.column).to.equal(0);
    expect(cellFocusManager.focusedCellData.row).to.equal(1);
    expect(cellFocusManager.focusedCellData.type).to.equal(COLUMN_TYPES.body);

    cellFocusManager.setFocusedCellByArrowKey(38); // up arrow
    expect(cellFocusManager.focusedCellData.column).to.equal(0);
    expect(cellFocusManager.focusedCellData.row).to.equal(0);
    expect(cellFocusManager.focusedCellData.type).to.equal(COLUMN_TYPES.body);

    cellFocusManager.setFocusedCellByArrowKey(37); // left arrow
    expect(cellFocusManager.focusedCellData.column).to.equal(0);
    expect(cellFocusManager.focusedCellData.row).to.equal(0);
    expect(cellFocusManager.focusedCellData.type).to.equal(COLUMN_TYPES.index);
  });
});

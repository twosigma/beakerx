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

import {BeakerxDataGrid} from "../BeakerxDataGrid";
import {ICellData} from "../interface/ICell";
import {CellRenderer} from "@phosphor/datagrid";
import {COLUMN_TYPES, default as DataGridColumn} from "../column/DataGridColumn";
import {DEFAULT_CELL_BACKGROUND, FOCUSED_CELL_BACKGROUND} from "../style/dataGridStyle";

export default class CellFocusManager {
  dataGrid: BeakerxDataGrid;
  focusedCellData: ICellData|null;

  constructor(dataGrid: BeakerxDataGrid) {
    this.dataGrid = dataGrid;
  }

  setFocusedCell(cellData: ICellData|null) {
    this.focusedCellData = cellData;
  }

  setFocusedCellByArrowKey(keyCode: number) {
    switch (keyCode) {
      case 37: // left arrow
        this.setLeftFocusedCell();
        break;
      case 38: // up arrow
        this.setUpFocusedCell();
        break;
      case 39: // right arrow
        this.setRightFocusedCell();
        break;
      case 40: // down arrow
        this.setDownFocusedCell();
        break;
    }

    this.dataGrid.repaint();
  }

  getFocussedCellBackground(config: CellRenderer.ICellConfig): string {
    const cellType = DataGridColumn.getColumnTypeByRegion(config.region);

    if (!this.focusedCellData || cellType !== this.focusedCellData.type) {
      return DEFAULT_CELL_BACKGROUND;
    }

    return config.row === this.focusedCellData.row && config.column === this.focusedCellData.column
      ? FOCUSED_CELL_BACKGROUND
      : DEFAULT_CELL_BACKGROUND;
  }

  private setRightFocusedCell() {
    if (!this.focusedCellData) {
      return;
    }

    const nextColumn = this.focusedCellData.type === COLUMN_TYPES.body
      ? this.focusedCellData.column + 1
      : this.focusedCellData.column;
    const lastColumnIndex = this.dataGrid.columnManager.bodyColumnsState.visibility
      .filter(visible => visible).length - 1;

    this.setFocusedCell({
      ...this.focusedCellData,
      type: COLUMN_TYPES.body,
      column: nextColumn > lastColumnIndex ? lastColumnIndex : nextColumn
    });
  }

  private setLeftFocusedCell() {
    if (!this.focusedCellData) {
      return;
    }

    const prevColumn = this.focusedCellData.column - 1;

    this.setFocusedCell({
      ...this.focusedCellData,
      type: prevColumn < 0 ? COLUMN_TYPES.index : COLUMN_TYPES.body,
      column: prevColumn < 0 ? 0 : prevColumn
    });
  }

  private setUpFocusedCell() {
    if (!this.focusedCellData) {
      return;
    }

    const row = this.focusedCellData.row - 1;

    this.setFocusedCell({
      ...this.focusedCellData,
      row: row < 0 ? 0 : row
    });
  }

  private setDownFocusedCell() {
    if (!this.focusedCellData) {
      return;
    }

    const row = this.focusedCellData.row + 1;
    const rowCount = this.dataGrid.model.rowCount('body');

    this.setFocusedCell({
      ...this.focusedCellData,
      row: row > rowCount ? rowCount : row
    });
  }

}

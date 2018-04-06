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
import DataGridColumn from "../column/DataGridColumn";
import {DEFAULT_CELL_BACKGROUND, FOCUSED_CELL_BACKGROUND} from "../style/dataGridStyle";
import {selectVisibleBodyColumns} from "../column/selectors";
import {KEYBOARD_KEYS} from "../event/enums";
import {selectColumnsFrozenNames} from "../model/selectors";

export default class CellFocusManager {
  dataGrid: BeakerxDataGrid;
  focusedCellData: ICellData|null;

  constructor(dataGrid: BeakerxDataGrid) {
    this.dataGrid = dataGrid;
    this.focusedCellData = null;
  }

  setFocusedCell(cellData: ICellData|null) {
    this.focusedCellData = cellData;
  }

  setFocusedCellByArrowKey(keyCode: number) {
    switch (keyCode) {
      case KEYBOARD_KEYS.ArrowLeft:
        this.setLeftFocusedCell();
        break;
      case KEYBOARD_KEYS.ArrowUp:
        this.setUpFocusedCell();
        break;
      case KEYBOARD_KEYS.ArrowRight:
        this.setRightFocusedCell();
        break;
      case KEYBOARD_KEYS.ArrowDown:
        this.setDownFocusedCell();
        break;
    }

    this.dataGrid.repaint();
  }

  getFocussedCellBackground(config: CellRenderer.ICellConfig): string {
    const cellType = DataGridColumn.getColumnTypeByRegion(config.region, config.column);

    if (!this.focusedCellData || cellType !== this.focusedCellData.type) {
      return DEFAULT_CELL_BACKGROUND;
    }

    return (
      config.row === this.focusedCellData.row
      && config.column === this.focusedCellData.column
      && config.region === this.focusedCellData.region
    )
      ? FOCUSED_CELL_BACKGROUND
      : DEFAULT_CELL_BACKGROUND;
  }

  private setRightFocusedCell() {
    if (!this.focusedCellData) {
      return;
    }

    let columnsFrozen = selectColumnsFrozenNames(this.dataGrid.store.state);
    let nextColumn = this.focusedCellData.column + 1;
    let region = this.focusedCellData.region;
    const lastColumnIndex = selectVisibleBodyColumns(this.dataGrid.store.state).length - 1 - columnsFrozen.length;

    if (this.focusedCellData.region === 'row-header' && nextColumn > columnsFrozen.length) {
      region = lastColumnIndex > -1 ? 'body' : 'row-header';
      nextColumn = lastColumnIndex > -1 ? 0 : nextColumn - 1;
    }

    if (nextColumn > lastColumnIndex && region === 'body') {
      nextColumn = lastColumnIndex;
    }

    this.setFocusedCell({
      ...this.focusedCellData,
      region,
      type: DataGridColumn.getColumnTypeByRegion(region, nextColumn),
      column: nextColumn
    });
  }

  private setLeftFocusedCell() {
    if (!this.focusedCellData) {
      return;
    }

    let region = this.focusedCellData.region;
    let prevColumn = this.focusedCellData.column - 1;
    let columnsFrozen = selectColumnsFrozenNames(this.dataGrid.store.state);

    if (prevColumn < 0 && this.focusedCellData.region !== 'row-header') {
      prevColumn = columnsFrozen.length;
      region = 'row-header';
    }

    prevColumn = prevColumn < 0 ? 0 : prevColumn;

    this.setFocusedCell({
      ...this.focusedCellData,
      region,
      type: DataGridColumn.getColumnTypeByRegion(region, prevColumn),
      column: prevColumn
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

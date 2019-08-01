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

import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { ICellData } from "../interface/ICell";
import { CellRenderer } from "@phosphor/datagrid";
import DataGridColumn from "../column/DataGridColumn";
import { selectVisibleBodyColumns } from "../column/selectors";
import { KEYBOARD_KEYS } from "../event/enums";
import { selectColumnsFrozenNames } from "../model/selectors";
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";

export default class CellFocusManager {
  dataGrid: BeakerXDataGrid;
  focusedCellData: ICellData|null;

  constructor(dataGrid: BeakerXDataGrid) {
    this.dataGrid = dataGrid;
    this.focusedCellData = null;
  }

  destroy(): void {
    this.dataGrid = null;
    this.focusedCellData = null;
  }

  setFocusedCell(cellData: ICellData|null) {
    this.focusedCellData = cellData;
  }

  setFocusedCellByNavigationKey(keyCode: number) {
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
      case KEYBOARD_KEYS.PageUp:
        this.setPageUpFocusedCell();
        break;
      case KEYBOARD_KEYS.PageDown:
        this.setPageDownFocusedCell();
        break;
    }

    this.dataGrid.repaint();
  }

  getFocussedCellBackground(config: CellRenderer.ICellConfig): string {
    const cellType = DataGridColumn.getColumnTypeByRegion(config.region, config.column);

    if (!this.focusedCellData || cellType !== this.focusedCellData.type) {
      return BeakerXThemeHelper.DEFAULT_CELL_BACKGROUND;
    }

    return (
      config.row === this.focusedCellData.row
      && config.column === this.focusedCellData.column
      && config.region === this.focusedCellData.region
    )
      ? BeakerXThemeHelper.FOCUSED_CELL_BACKGROUND
      : BeakerXThemeHelper.DEFAULT_CELL_BACKGROUND;
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

    this.scrollIfNeeded("right");
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

    this.scrollIfNeeded("left");
  }

  private setUpFocusedCell(moveBy: number = 1) {
    if (!this.focusedCellData) {
      return;
    }

    const row = this.focusedCellData.row - moveBy;

    this.setFocusedCell({
      ...this.focusedCellData,
      row: row < 0 ? 0 : row
    });

    this.scrollIfNeeded("up");
  }

  private setDownFocusedCell(moveBy: number = 1) {
    if (!this.focusedCellData) {
      return;
    }

    const row = this.focusedCellData.row + moveBy;
    const rowCount = this.dataGrid.model.rowCount('body') - 1;

    this.setFocusedCell({
      ...this.focusedCellData,
      row: row > rowCount ? rowCount : row
    });

    this.scrollIfNeeded("down");
  }

  private setPageUpFocusedCell() {
    this.setUpFocusedCell(this.dataGrid.rowManager.rowsToShow);
  }

  private setPageDownFocusedCell() {
    this.setDownFocusedCell(this.dataGrid.rowManager.rowsToShow);
  }

  private scrollIfNeeded(direction: "up" | "right" | "down" | "left") {
    let rowOffset = this.dataGrid.rowSections.sectionOffset(this.focusedCellData.row);
    let rowSize = this.dataGrid.rowSections.sectionSize(this.focusedCellData.row);
    let columnOffset = this.dataGrid.columnSections.sectionOffset(this.focusedCellData.column);
    let columnSize = this.dataGrid.columnSections.sectionSize(this.focusedCellData.column);

    let scrollToX = this.dataGrid.scrollX;
    let scrollToY = this.dataGrid.scrollY;

    let needsScrolling: boolean = false;

    switch (direction) {
      case "down":
        needsScrolling = rowOffset + rowSize > this.dataGrid.pageHeight + scrollToY;
        scrollToY = rowOffset - this.dataGrid.pageHeight + rowSize;
        break;
      case "up":
        needsScrolling = rowOffset < scrollToY;
        scrollToY = rowOffset;
        break;
      case "right":
        needsScrolling = columnOffset + columnSize > this.dataGrid.pageWidth + scrollToX;
        scrollToX = columnOffset - this.dataGrid.pageWidth + columnSize;
        break;
      case "left":
        needsScrolling = columnOffset < scrollToX;
        scrollToX = columnOffset;
        break;
    }

    if (needsScrolling) {
      this.dataGrid.scrollTo(scrollToX, scrollToY);
    }
  }

}

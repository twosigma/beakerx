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

import {CellRenderer} from "@phosphor/datagrid";
import ICellConfig = CellRenderer.ICellConfig;
import {ICellData} from "../interface/ICell";
import {BeakerXDataGrid} from "../BeakerXDataGrid";
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";

export interface IRangeCells {
  startCell: ICellData,
  endCell: ICellData
}

export default class CellSelectionManager {
  startCellData: ICellData|null;
  endCellData: ICellData|null;
  enabled: boolean;
  dataGrid: BeakerXDataGrid;

  constructor(dataGrid: BeakerXDataGrid) {
    this.enabled = false;
    this.dataGrid = dataGrid;
  }

  destroy(): void {
    this.dataGrid = null;
    this.startCellData = null;
    this.endCellData = null;
  }

  setStartCell(cellData: ICellData) {
    this.startCellData = cellData;
  }

  setEndCell(cellData: ICellData) {
    this.endCellData = cellData;
  }

  getColumnsRangeCells(): IRangeCells|null {
    if(!this.startCellData || !this.endCellData) {
      return null;
    }

    if (this.startCellData.region === 'row-header' && this.endCellData.region !== 'row-header') {
      return {
        startCell: this.startCellData,
        endCell: this.endCellData,
      }
    }

    if (this.startCellData.region !== 'row-header' && this.endCellData.region === 'row-header') {
      return {
        startCell: this.endCellData,
        endCell: this.startCellData,
      }
    }

    let startCell = this.startCellData.column < this.endCellData.column ? this.startCellData : this.endCellData;
    let endCell = this.startCellData.column < this.endCellData.column ? this.endCellData : this.startCellData;

    return {
      startCell,
      endCell
    }
  }

  getRowsRangeCells():IRangeCells|null {
    if(!this.startCellData || !this.endCellData) {
      return null;
    }

    const startCell = this.startCellData.row < this.endCellData.row ? this.startCellData : this.endCellData;
    const endCell = this.startCellData.row < this.endCellData.row ? this.endCellData : this.startCellData;

    return {
      startCell,
      endCell
    }
  }

  isBetweenRows(config: ICellConfig) {
    const rowsRange = this.getRowsRangeCells();

    if(!rowsRange) {
      return false;
    }

    return config.row >= rowsRange.startCell.row && config.row <= rowsRange.endCell.row
  }

  isBetweenColumns(config: ICellConfig) {
    const columnsRange = this.getColumnsRangeCells();

    if(!columnsRange) {
      return false;
    }

    if (
      config.region !== columnsRange.startCell.region && config.region === 'row-header'
      || config.region !== columnsRange.endCell.region && config.region === 'body'
    ) {
      return false;
    }

    if (config.region === columnsRange.startCell.region && config.region !== columnsRange.endCell.region) {
      return config.column >= columnsRange.startCell.column;
    }

    if (config.region === columnsRange.endCell.region && config.region !== columnsRange.startCell.region) {
      return config.column <= columnsRange.endCell.column;
    }

    return (
      config.column >= columnsRange.startCell.column &&
      config.column <= columnsRange.endCell.column
    );
  }

  enable() {
    this.enabled = true;
  }

  clear() {
    this.enabled = false;
    this.startCellData = null;
    this.endCellData = null;
    this.dataGrid.repaint();
  }

  isSelected(config: ICellConfig) {
    if (!this.enabled || !this.startCellData || !this.endCellData) {
      return false;
    }

    return this.isBetweenColumns(config) && this.isBetweenRows(config);
  }

  getBackgroundColor(config) {
    if (!this.startCellData || !this.endCellData) {
      return '';
    }

    return this.isSelected(config) ? BeakerXThemeHelper.SELECTED_CELL_BACKGROUND : '';
  }

  handleMouseDown(event: MouseEvent) {
    if (this.dataGrid.eventManager.isOverHeader(event) || this.dataGrid.columnPosition.isDragging()) {
      return;
    }

    const cellData = this.dataGrid.getCellData(event.clientX, event.clientY);

    if (!cellData) {
      return;
    }

    if (event.shiftKey && this.startCellData) {
      return this.setEndCell(cellData);
    }

    this.dataGrid.cellFocusManager.setFocusedCell(cellData);
    this.setStartCell(cellData);
  }

  handleBodyCellHover(event: MouseEvent) {
    if (
      event.buttons !== 1
      || this.dataGrid.columnPosition.isDragging()
      || this.dataGrid.eventManager.isOverHeader(event)
    ) {
      return;
    }

    const cellData = this.dataGrid.getCellData(event.clientX, event.clientY);

    if (cellData) {
      this.setEndCell(cellData);
      this.enable();
      this.dataGrid.repaint();
    }
  }

  handleMouseUp(event: MouseEvent) {
    if (this.dataGrid.eventManager.isOverHeader(event) || this.dataGrid.columnPosition.isDragging()) {
      return;
    }

    this.handleCellInteraction(this.dataGrid.getCellData(event.clientX, event.clientY));
  }

  handleCellInteraction(data: ICellData) {
    if (!data) {
      return;
    }

    this.setEndCell(data);
    this.enable();
    this.dataGrid.repaint();
  }
}
